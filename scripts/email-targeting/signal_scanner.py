"""
Warm-signal scanner.

Searches the web for buying signals (RFPs, FEMA grants, CIP documents,
storm damage, inspection backlogs) and scrapes result pages for keyword matches.
Returns a brief summary string for each org.
"""

from __future__ import annotations

import logging
import re

from scraper import fetch_page
from searcher import search_warm_signals

logger = logging.getLogger(__name__)

# Keyword patterns with human-readable labels
_SIGNAL_PATTERNS: list[tuple[str, re.Pattern[str]]] = [
    ("Active RFP/procurement", re.compile(
        r"\b(rfp|rfq|request\s+for\s+(proposal|qualifications?)|procurement\s+notice|solicitation)\b", re.I)),
    ("FEMA grant/disaster recovery", re.compile(
        r"\b(fema\s+(grant|funding|award)|disaster\s+recovery|hazard\s+mitigation\s+grant)\b", re.I)),
    ("Capital improvement plan", re.compile(
        r"\b(capital\s+improvement\s+(plan|program)|cip\s+(publish|approv|adopt|202))\b", re.I)),
    ("Storm/hurricane damage", re.compile(
        r"\b(hurricane|tropical\s+storm|storm\s+damage|flood\s+damage|wind\s+damage)\b", re.I)),
    ("Asset management/inspection backlog", re.compile(
        r"\b(asset\s+management|inspection\s+backlog|deferred\s+maintenance|condition\s+assessment)\b", re.I)),
    ("Consultant contract expiring", re.compile(
        r"\b(consultant\s+contract|contract\s+(expir|renew|review)|professional\s+services\s+contract)\b", re.I)),
    ("Bond issue/infrastructure funding", re.compile(
        r"\b(bond\s+issue|infrastructure\s+(bond|funding|investment)|grant\s+award)\b", re.I)),
]

# Year patterns to extract recency context
_YEAR_RE = re.compile(r"\b(202[3-9]|20[3-9]\d)\b")
_QUARTER_RE = re.compile(r"\b(Q[1-4]\s*202[3-9])\b", re.I)


def scan_org_signals(org_name: str) -> str:
    """Search for warm signals about an organization.

    Returns a brief summary string (e.g. "Active RFP 2026; Hurricane damage 2025")
    or empty string if nothing found.
    """
    search_results = search_warm_signals(org_name)
    if not search_results:
        return ""

    found_signals: list[str] = []
    seen_labels: set[str] = set()

    # First pass: check search result snippets (fast, no extra fetches)
    for result in search_results:
        combined_text = f"{result.title} {result.snippet}"
        for label, pattern in _SIGNAL_PATTERNS:
            if label in seen_labels:
                continue
            if pattern.search(combined_text):
                context = _extract_time_context(combined_text)
                signal = f"{label} {context}".strip() if context else label
                found_signals.append(signal)
                seen_labels.add(label)

    # Second pass: fetch top 3 result pages for deeper scanning (if we haven't
    # found much from snippets alone)
    if len(found_signals) < 2:
        for result in search_results[:3]:
            try:
                html, _ = fetch_page(result.url)
                # Only look at a reasonable chunk of text (first 5000 chars)
                from bs4 import BeautifulSoup
                soup = BeautifulSoup(html, "lxml")
                text = soup.get_text(separator=" ", strip=True)[:5000]

                for label, pattern in _SIGNAL_PATTERNS:
                    if label in seen_labels:
                        continue
                    if pattern.search(text):
                        context = _extract_time_context(text)
                        signal = f"{label} {context}".strip() if context else label
                        found_signals.append(signal)
                        seen_labels.add(label)
            except Exception:  # noqa: BLE001
                continue

    return "; ".join(found_signals)


def scan_page_text_for_signals(text: str) -> str:
    """Scan a block of text (e.g. from a scraped page) for warm signals.

    This is used when we already have the page content and don't need
    to do additional web searches.
    """
    if not text:
        return ""

    found: list[str] = []
    seen: set[str] = set()
    for label, pattern in _SIGNAL_PATTERNS:
        if label in seen:
            continue
        if pattern.search(text):
            context = _extract_time_context(text)
            signal = f"{label} {context}".strip() if context else label
            found.append(signal)
            seen.add(label)

    return "; ".join(found)


def _extract_time_context(text: str) -> str:
    """Try to extract a year or quarter from nearby text."""
    # Look for Q1 2026 style
    match = _QUARTER_RE.search(text)
    if match:
        return match.group(1)

    # Look for just a year
    match = _YEAR_RE.search(text)
    if match:
        return match.group(1)

    return ""
