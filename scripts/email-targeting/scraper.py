"""
Web scraper and contact extractor.

Fetches HTML pages and extracts structured contact information:
names, titles, emails, and phone numbers from leadership/staff pages.
"""

from __future__ import annotations

import logging
import re
import time
from dataclasses import dataclass, field
from urllib.parse import urljoin

import requests
from bs4 import BeautifulSoup, Tag

logger = logging.getLogger(__name__)

_FETCH_TIMEOUT = 15
_FETCH_DELAY_S = 1.0
_USER_AGENT = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
)

# Regex for email addresses
_EMAIL_RE = re.compile(
    r"[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}",
)

# Common title keywords that indicate a decision-maker
_TITLE_KEYWORDS = [
    "director", "manager", "chief", "president", "vice president",
    "commissioner", "chairman", "chairwoman", "engineer", "ceo",
    "cto", "coo", "superintendent", "administrator", "secretary",
    "executive", "officer", "supervisor", "coordinator", "head",
]

# Patterns to skip (non-person emails)
_SKIP_EMAIL_PREFIXES = {
    "info", "hr", "careers", "jobs", "media", "communications",
    "security", "records", "support", "cruises", "connect", "webmaster",
    "noreply", "no-reply", "admin", "postmaster", "sales", "marketing",
}


@dataclass
class ExtractedContact:
    name: str = ""
    title: str = ""
    email: str = ""
    source_url: str = ""
    confidence: float = 0.0  # 0.0 to 1.0


@dataclass
class PageScrapeResult:
    url: str
    contacts: list[ExtractedContact] = field(default_factory=list)
    page_text: str = ""  # full text for warm signal scanning
    success: bool = False
    error: str = ""


def fetch_page(url: str) -> tuple[str, str]:
    """Fetch a URL and return (html_content, final_url). Raises on failure."""
    resp = requests.get(
        url,
        headers={"User-Agent": _USER_AGENT},
        timeout=_FETCH_TIMEOUT,
        allow_redirects=True,
    )
    resp.raise_for_status()
    time.sleep(_FETCH_DELAY_S)
    return resp.text, resp.url


def scrape_page(url: str) -> PageScrapeResult:
    """Scrape a single page for contact information."""
    result = PageScrapeResult(url=url)
    try:
        html, final_url = fetch_page(url)
        result.url = final_url
    except Exception as exc:  # noqa: BLE001
        result.error = str(exc)
        logger.debug("Failed to fetch %s: %s", url, exc)
        return result

    result.success = True
    soup = BeautifulSoup(html, "lxml")
    result.page_text = soup.get_text(separator=" ", strip=True)

    # Strategy 1: Look for structured staff cards/sections
    contacts = _extract_from_cards(soup, url)

    # Strategy 2: Extract emails from full page and try to associate with names
    if not contacts:
        contacts = _extract_from_text(soup, url)

    # Strategy 3: Look for mailto: links
    if not contacts:
        contacts = _extract_from_mailto(soup, url)

    result.contacts = contacts
    return result


def scrape_org_pages(base_domain: str, staff_paths: list[str]) -> list[PageScrapeResult]:
    """Try known staff directory paths on an org's domain."""
    results: list[PageScrapeResult] = []
    for path in staff_paths:
        for scheme in ["https", "http"]:
            url = f"{scheme}://{base_domain}{path}"
            result = scrape_page(url)
            if result.success:
                results.append(result)
                break  # got it on this scheme, don't try http fallback
    return results


# ── Extraction strategies ────────────────────────────────────────────────────

def _extract_from_cards(soup: BeautifulSoup, source_url: str) -> list[ExtractedContact]:
    """Look for staff 'card' patterns: headings with names + title + email nearby."""
    contacts: list[ExtractedContact] = []

    # Common patterns: divs/articles/sections with class containing
    # "staff", "team", "leadership", "member", "bio", "card", "person"
    card_patterns = [
        {"class_": re.compile(r"staff|team|leader|member|bio|card|person|profile|directory", re.I)},
    ]

    cards: list[Tag] = []
    for pattern in card_patterns:
        found = soup.find_all(["div", "article", "section", "li", "tr"], **pattern)
        cards.extend(found)

    # Also look for heading tags (h2, h3, h4) that might be names followed by titles
    if not cards:
        cards = _find_name_title_blocks(soup)

    seen_emails: set[str] = set()
    for card in cards:
        contact = _parse_card(card, source_url)
        if contact and contact.email and contact.email.lower() not in seen_emails:
            seen_emails.add(contact.email.lower())
            contacts.append(contact)
        elif contact and contact.name and not contact.email:
            # Still useful — name+title without email
            contacts.append(contact)

    return contacts


def _find_name_title_blocks(soup: BeautifulSoup) -> list[Tag]:
    """Find heading elements that look like person names."""
    blocks: list[Tag] = []
    for heading in soup.find_all(["h2", "h3", "h4", "h5"]):
        text = heading.get_text(strip=True)
        # Looks like a person name: 2-4 capitalized words, no common page-heading words
        if _looks_like_person_name(text):
            # Use the parent container as the "card"
            parent = heading.parent
            if parent:
                blocks.append(parent)
    return blocks


def _parse_card(card: Tag, source_url: str) -> ExtractedContact | None:
    """Try to extract name, title, and email from a staff card element."""
    text = card.get_text(separator="\n", strip=True)
    lines = [ln.strip() for ln in text.split("\n") if ln.strip()]

    if not lines:
        return None

    # Find email in the card
    emails = _EMAIL_RE.findall(card.get_text())
    email = ""
    for e in emails:
        prefix = e.split("@")[0].lower()
        if prefix not in _SKIP_EMAIL_PREFIXES:
            email = e
            break

    # Find name and title
    name = ""
    title = ""
    for line in lines:
        if not name and _looks_like_person_name(line):
            name = _clean_name(line)
        elif not title and _looks_like_title(line):
            title = line

    if not name and not email:
        return None

    confidence = 0.3
    if name:
        confidence += 0.2
    if title and _is_target_title(title):
        confidence += 0.3
    if email:
        confidence += 0.2

    return ExtractedContact(
        name=name,
        title=title,
        email=email,
        source_url=source_url,
        confidence=confidence,
    )


def _extract_from_text(soup: BeautifulSoup, source_url: str) -> list[ExtractedContact]:
    """Fallback: extract all emails from page text and try to find nearby names."""
    text = soup.get_text(separator="\n", strip=True)
    emails = _EMAIL_RE.findall(text)
    contacts: list[ExtractedContact] = []
    seen: set[str] = set()

    for email in emails:
        prefix = email.split("@")[0].lower()
        if prefix in _SKIP_EMAIL_PREFIXES:
            continue
        if email.lower() in seen:
            continue
        seen.add(email.lower())

        # Try to find the email in the HTML and look at surrounding context
        name, title = _find_context_for_email(soup, email)

        contacts.append(ExtractedContact(
            name=name,
            title=title,
            email=email,
            source_url=source_url,
            confidence=0.4 if name else 0.2,
        ))

    return contacts


def _extract_from_mailto(soup: BeautifulSoup, source_url: str) -> list[ExtractedContact]:
    """Extract contacts from mailto: links."""
    contacts: list[ExtractedContact] = []
    seen: set[str] = set()

    for a_tag in soup.find_all("a", href=re.compile(r"^mailto:", re.I)):
        href = a_tag.get("href", "")
        email_match = _EMAIL_RE.search(href)
        if not email_match:
            continue
        email = email_match.group(0)
        prefix = email.split("@")[0].lower()
        if prefix in _SKIP_EMAIL_PREFIXES:
            continue
        if email.lower() in seen:
            continue
        seen.add(email.lower())

        # The link text might be the person's name
        link_text = a_tag.get_text(strip=True)
        name = ""
        if _looks_like_person_name(link_text):
            name = _clean_name(link_text)
        elif link_text and "@" not in link_text:
            name = _clean_name(link_text)

        # Look at surrounding elements for title
        title = ""
        parent = a_tag.parent
        if parent:
            sibling_text = parent.get_text(separator="\n", strip=True)
            for line in sibling_text.split("\n"):
                line = line.strip()
                if _looks_like_title(line):
                    title = line
                    break

        contacts.append(ExtractedContact(
            name=name,
            title=title,
            email=email,
            source_url=source_url,
            confidence=0.3 if name else 0.15,
        ))

    return contacts


def _find_context_for_email(soup: BeautifulSoup, email: str) -> tuple[str, str]:
    """Find name and title near an email address in the HTML."""
    name = ""
    title = ""

    # Find the element containing this email
    for element in soup.find_all(string=re.compile(re.escape(email))):
        # Walk up to find a containing block
        parent = element.parent
        for _ in range(5):  # walk up to 5 levels
            if parent is None:
                break
            block_text = parent.get_text(separator="\n", strip=True)
            lines = [ln.strip() for ln in block_text.split("\n") if ln.strip()]
            for line in lines:
                if not name and _looks_like_person_name(line):
                    name = _clean_name(line)
                if not title and _looks_like_title(line):
                    title = line
            if name or title:
                break
            parent = parent.parent

    return name, title


# ── Heuristics ───────────────────────────────────────────────────────────────

def _looks_like_person_name(text: str) -> bool:
    """Heuristic: does this text look like a person's full name?"""
    text = text.strip()
    if not text or len(text) > 60 or len(text) < 3:
        return False

    # Should not contain common non-name patterns
    lower = text.lower()
    skip_words = [
        "department", "office", "division", "phone", "fax", "email",
        "address", "contact", "click", "here", "view", "read", "more",
        "home", "about", "news", "port of", "city of", "board of",
        "meeting", "agenda", "minutes", "copyright", "reserved",
        "@", "http", "www", ".com", ".gov", ".org",
    ]
    for w in skip_words:
        if w in lower:
            return False

    # Should be 2-4 words, mostly capitalized
    words = text.split()
    if len(words) < 2 or len(words) > 5:
        return False

    # At least 2 words should start with uppercase
    cap_count = sum(1 for w in words if w[0].isupper())
    return cap_count >= 2


def _looks_like_title(text: str) -> bool:
    """Heuristic: does this text look like a job title?"""
    text = text.strip()
    if not text or len(text) > 80 or len(text) < 3:
        return False
    lower = text.lower()
    return any(kw in lower for kw in _TITLE_KEYWORDS)


def _is_target_title(title: str) -> bool:
    """Check if a title matches our target decision-maker roles."""
    lower = title.lower()
    high_value = [
        "director", "chief", "president", "ceo", "cto", "coo",
        "general manager", "commissioner", "engineer", "asset",
        "maintenance", "facilities", "operations", "infrastructure",
        "capital",
    ]
    return any(kw in lower for kw in high_value)


def _clean_name(text: str) -> str:
    """Clean up a name string."""
    # Remove common suffixes/prefixes
    text = text.strip()
    # Remove trailing punctuation
    text = re.sub(r"[,;:]+$", "", text)
    # Remove title prefixes that got mixed in
    text = re.sub(r"^(Mr\.|Mrs\.|Ms\.|Dr\.|Hon\.)\s*", "", text, flags=re.I)
    return text.strip()


def extract_linkedin_info(search_result_title: str, search_result_snippet: str) -> ExtractedContact:
    """Extract name and title from a LinkedIn search result snippet.

    LinkedIn results typically look like:
      Title: "John Smith - Executive Director - Port of Corpus Christi | LinkedIn"
      Snippet: "John Smith is the Executive Director at Port of Corpus Christi..."
    """
    name = ""
    title = ""

    # Parse LinkedIn title format: "Name - Title - Company | LinkedIn"
    clean_title = search_result_title.replace(" | LinkedIn", "").replace(" - LinkedIn", "")
    parts = [p.strip() for p in clean_title.split(" - ")]

    if len(parts) >= 2:
        if _looks_like_person_name(parts[0]):
            name = _clean_name(parts[0])
        if len(parts) >= 2:
            title = parts[1]

    # Try to get more from snippet
    if not name and search_result_snippet:
        words = search_result_snippet.split()
        # First 2-3 words are often the name
        candidate = " ".join(words[:3])
        if _looks_like_person_name(candidate):
            name = _clean_name(candidate)
        elif len(words) >= 2 and _looks_like_person_name(" ".join(words[:2])):
            name = _clean_name(" ".join(words[:2]))

    return ExtractedContact(
        name=name,
        title=title,
        email="",  # can't get email from LinkedIn search results
        confidence=0.5 if name and title else 0.2,
    )
