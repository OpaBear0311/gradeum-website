#!/usr/bin/env python3
"""
Gradeum Marketing Agent
=======================

Automatically sources decision-maker contacts for target port authorities,
municipal waterfront organizations, and maritime infrastructure entities.

Sourcing strategy (per org):
  1. Scrape known staff/leadership pages on org website
  2. Web-search for leadership directories and staff pages
  3. Search LinkedIn for decision-maker profiles (name + title, no email)
  4. Search commission meeting minutes for named decision-makers
  5. Scan for warm buying signals (RFPs, FEMA grants, CIP, storm damage)
  6. Attempt email pattern inference for contacts found without emails

Output:
  - data/sourced_contacts.csv   — raw contacts ready for the targeting pipeline
  - data/agent_log.csv          — per-org sourcing log with status

Usage:
  python agent.py                           # source all orgs
  python agent.py --tier 1                  # only Tier 1 orgs
  python agent.py --org "Port of Corpus Christi"  # single org
  python agent.py --limit 5                 # first 5 orgs only
  python agent.py --dry-run                 # search but don't scrape
"""

from __future__ import annotations

import argparse
import csv
import logging
import sys
import time
from dataclasses import dataclass, field
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from orgs import ORGS, TargetOrg  # noqa: E402
from scraper import (  # noqa: E402
    ExtractedContact,
    extract_linkedin_info,
    scrape_org_pages,
    scrape_page,
)
from searcher import (  # noqa: E402
    search_commission_minutes,
    search_leadership_pages,
    search_linkedin_profiles,
)
from signal_scanner import scan_org_signals, scan_page_text_for_signals  # noqa: E402

logger = logging.getLogger(__name__)

OUTPUT_COLUMNS = [
    "name", "title", "email", "organization", "source_url", "org_notes",
]

AGENT_LOG_COLUMNS = [
    "organization", "tier", "pages_scraped", "contacts_found",
    "emails_found", "warm_signal", "status",
]

# Common email patterns at organizations
_EMAIL_PATTERNS = [
    "{first}.{last}",       # john.smith
    "{first_initial}{last}",  # jsmith
    "{first}{last_initial}",  # johns
    "{first}_{last}",       # john_smith
    "{first}{last}",        # johnsmith
    "{last}.{first}",       # smith.john
    "{last}{first_initial}", # smithj
    "{first_initial}.{last}", # j.smith
]


@dataclass
class OrgResult:
    org: TargetOrg
    contacts: list[ExtractedContact] = field(default_factory=list)
    warm_signal: str = ""
    pages_scraped: int = 0
    status: str = "pending"


def source_org(org: TargetOrg, dry_run: bool = False) -> OrgResult:
    """Run the full sourcing pipeline for a single organization."""
    result = OrgResult(org=org)
    all_contacts: list[ExtractedContact] = []
    page_texts: list[str] = []  # for warm signal scanning
    seen_emails: set[str] = set()
    seen_names: set[str] = set()

    logger.info("=" * 60)
    logger.info("Sourcing: %s (Tier %s)", org.name, org.tier)
    logger.info("=" * 60)

    # ── Step 1: Scrape known staff/leadership pages ──────────────────────
    if org.domain and not dry_run:
        logger.info("  [1/5] Scraping known staff pages on %s ...", org.domain)
        page_results = scrape_org_pages(org.domain, org.staff_paths)
        for pr in page_results:
            if pr.success:
                result.pages_scraped += 1
                page_texts.append(pr.page_text)
                for c in pr.contacts:
                    c.source_url = pr.url
                    if _is_new_contact(c, seen_emails, seen_names):
                        all_contacts.append(c)
                        _mark_seen(c, seen_emails, seen_names)
                logger.info("    Found %d contacts on %s", len(pr.contacts), pr.url)

    # ── Step 2: Web-search for leadership pages ──────────────────────────
    logger.info("  [2/5] Searching web for leadership pages ...")
    search_results = search_leadership_pages(org.name, org.domain)
    for sr in search_results:
        # Skip pages we already scraped
        if org.domain and org.domain in sr.url:
            # Might be a different path we didn't try
            pass
        if not dry_run:
            pr = scrape_page(sr.url)
            if pr.success:
                result.pages_scraped += 1
                page_texts.append(pr.page_text)
                for c in pr.contacts:
                    c.source_url = pr.url
                    if _is_new_contact(c, seen_emails, seen_names):
                        all_contacts.append(c)
                        _mark_seen(c, seen_emails, seen_names)
                if pr.contacts:
                    logger.info("    Found %d contacts on %s", len(pr.contacts), sr.url)

    # ── Step 3: LinkedIn search ──────────────────────────────────────────
    logger.info("  [3/5] Searching LinkedIn profiles ...")
    linkedin_results = search_linkedin_profiles(org.name)
    for lr in linkedin_results:
        contact = extract_linkedin_info(lr.title, lr.snippet)
        if contact.name:
            contact.source_url = lr.url
            if _is_new_contact(contact, seen_emails, seen_names):
                all_contacts.append(contact)
                _mark_seen(contact, seen_emails, seen_names)
    if linkedin_results:
        logger.info("    Found %d LinkedIn profiles", len(linkedin_results))

    # ── Step 4: Commission meeting minutes ───────────────────────────────
    logger.info("  [4/5] Searching commission minutes ...")
    minutes_results = search_commission_minutes(org.name, org.domain)
    for mr in minutes_results:
        if not dry_run:
            pr = scrape_page(mr.url)
            if pr.success:
                page_texts.append(pr.page_text)
                # Commission minutes usually don't have emails in card format,
                # but the page text is useful for warm signals
                for c in pr.contacts:
                    c.source_url = pr.url
                    if _is_new_contact(c, seen_emails, seen_names):
                        all_contacts.append(c)
                        _mark_seen(c, seen_emails, seen_names)

    # ── Step 5: Warm signal detection ────────────────────────────────────
    logger.info("  [5/5] Scanning for warm signals ...")
    # Combine signals from already-scraped pages
    page_signal = ""
    for text in page_texts:
        sig = scan_page_text_for_signals(text)
        if sig:
            page_signal = sig
            break

    # Also search the web for warm signals
    web_signal = scan_org_signals(org.name)

    # Merge signals, prefer the more specific one
    if web_signal and page_signal:
        result.warm_signal = web_signal  # web search is usually more targeted
    else:
        result.warm_signal = web_signal or page_signal

    if result.warm_signal:
        logger.info("    Warm signal: %s", result.warm_signal)

    # ── Step 6: Email pattern inference ──────────────────────────────────
    if org.domain:
        known_emails = [c.email for c in all_contacts if c.email]
        pattern = _detect_email_pattern(known_emails, org.domain)
        if pattern:
            logger.info("  [+] Detected email pattern: %s@%s", pattern, org.domain)
            for c in all_contacts:
                if not c.email and c.name:
                    inferred = _apply_email_pattern(c.name, pattern, org.domain)
                    if inferred:
                        c.email = inferred
                        logger.info("    Inferred: %s for %s", inferred, c.name)

    # ── Finalize ─────────────────────────────────────────────────────────
    result.contacts = all_contacts
    email_count = sum(1 for c in all_contacts if c.email)
    result.status = "ok" if all_contacts else "no_contacts"

    logger.info(
        "  Result: %d contacts (%d with email), %d pages scraped",
        len(all_contacts), email_count, result.pages_scraped,
    )

    return result


def _is_new_contact(
    contact: ExtractedContact,
    seen_emails: set[str],
    seen_names: set[str],
) -> bool:
    """Check if this contact is new (not already seen)."""
    if contact.email and contact.email.lower() in seen_emails:
        return False
    if contact.name and contact.name.lower() in seen_names:
        return False
    return True


def _mark_seen(
    contact: ExtractedContact,
    seen_emails: set[str],
    seen_names: set[str],
) -> None:
    if contact.email:
        seen_emails.add(contact.email.lower())
    if contact.name:
        seen_names.add(contact.name.lower())


# ── Email pattern detection and inference ────────────────────────────────────

def _detect_email_pattern(emails: list[str], domain: str) -> str:
    """Try to detect the email naming convention from known emails."""
    if not emails:
        return ""

    domain_lower = domain.lower()
    # Filter to emails matching this domain
    local_parts = []
    for e in emails:
        parts = e.lower().split("@")
        if len(parts) == 2 and parts[1] == domain_lower:
            local_parts.append(parts[0])

    if not local_parts:
        return ""

    # Check for common patterns
    has_dot = any("." in lp for lp in local_parts)
    has_underscore = any("_" in lp for lp in local_parts)
    avg_len = sum(len(lp) for lp in local_parts) / len(local_parts)

    if has_dot and avg_len > 5:
        return "{first}.{last}"
    elif has_underscore and avg_len > 5:
        return "{first}_{last}"
    elif avg_len < 7:
        return "{first_initial}{last}"
    else:
        return "{first}{last}"


def _apply_email_pattern(name: str, pattern: str, domain: str) -> str:
    """Generate an email address from a name and pattern."""
    parts = name.strip().split()
    if len(parts) < 2:
        return ""

    first = parts[0].lower()
    last = parts[-1].lower()

    # Clean non-alpha chars
    first = "".join(c for c in first if c.isalpha())
    last = "".join(c for c in last if c.isalpha())

    if not first or not last:
        return ""

    local = (
        pattern
        .replace("{first}", first)
        .replace("{last}", last)
        .replace("{first_initial}", first[0])
        .replace("{last_initial}", last[0])
    )

    return f"{local}@{domain}"


# ── Output ───────────────────────────────────────────────────────────────────

def write_results(
    results: list[OrgResult],
    output_dir: Path,
) -> None:
    """Write sourced contacts CSV and agent log."""
    output_dir.mkdir(parents=True, exist_ok=True)
    contacts_path = output_dir / "sourced_contacts.csv"
    log_path = output_dir / "agent_log.csv"

    # Write contacts
    with open(contacts_path, "w", newline="", encoding="utf-8") as fh:
        writer = csv.DictWriter(fh, fieldnames=OUTPUT_COLUMNS)
        writer.writeheader()
        for r in results:
            for c in r.contacts:
                writer.writerow({
                    "name": c.name,
                    "title": c.title,
                    "email": c.email,
                    "organization": r.org.name,
                    "source_url": c.source_url,
                    "org_notes": r.warm_signal,
                })

    # Write agent log
    with open(log_path, "w", newline="", encoding="utf-8") as fh:
        writer = csv.DictWriter(fh, fieldnames=AGENT_LOG_COLUMNS)
        writer.writeheader()
        for r in results:
            email_count = sum(1 for c in r.contacts if c.email)
            writer.writerow({
                "organization": r.org.name,
                "tier": r.org.tier,
                "pages_scraped": r.pages_scraped,
                "contacts_found": len(r.contacts),
                "emails_found": email_count,
                "warm_signal": r.warm_signal,
                "status": r.status,
            })

    total_contacts = sum(len(r.contacts) for r in results)
    total_emails = sum(1 for r in results for c in r.contacts if c.email)

    logger.info("")
    logger.info("Wrote %d contacts to %s", total_contacts, contacts_path)
    logger.info("Wrote %d org entries to %s", len(results), log_path)

    return total_contacts, total_emails


# ── CLI ──────────────────────────────────────────────────────────────────────

def main() -> None:
    parser = argparse.ArgumentParser(
        description="Gradeum marketing agent — auto-source decision-maker contacts",
    )
    parser.add_argument(
        "-o", "--output-dir",
        type=Path,
        default=Path(__file__).resolve().parent / "data",
        help="Directory for output CSVs (default: ./data)",
    )
    parser.add_argument(
        "--tier",
        type=str,
        default=None,
        help="Only source orgs of this tier (1, 2, 3, or Municipal)",
    )
    parser.add_argument(
        "--org",
        type=str,
        default=None,
        help="Only source a specific org by name (substring match)",
    )
    parser.add_argument(
        "--limit",
        type=int,
        default=None,
        help="Max number of orgs to process",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Search only — don't scrape pages (faster, for testing search logic)",
    )
    parser.add_argument(
        "-v", "--verbose",
        action="store_true",
        help="Enable debug logging",
    )
    parser.add_argument(
        "--delay",
        type=float,
        default=2.0,
        help="Delay in seconds between orgs (default: 2.0)",
    )

    args = parser.parse_args()

    logging.basicConfig(
        level=logging.DEBUG if args.verbose else logging.INFO,
        format="%(levelname)-5s  %(message)s",
    )

    # Filter orgs
    orgs = list(ORGS)
    if args.tier:
        orgs = [o for o in orgs if o.tier == args.tier]
    if args.org:
        search = args.org.lower()
        orgs = [o for o in orgs if search in o.name.lower() or
                any(search in a.lower() for a in o.aliases)]
    if args.limit:
        orgs = orgs[:args.limit]

    if not orgs:
        logger.error("No orgs matched your filters.")
        sys.exit(1)

    logger.info("Gradeum Marketing Agent")
    logger.info("Targeting %d organizations", len(orgs))
    logger.info("")

    results: list[OrgResult] = []
    for i, org in enumerate(orgs):
        if i > 0:
            time.sleep(args.delay)
        try:
            result = source_org(org, dry_run=args.dry_run)
            results.append(result)
        except KeyboardInterrupt:
            logger.warning("Interrupted — saving partial results.")
            break
        except Exception as exc:  # noqa: BLE001
            logger.error("Failed to source %s: %s", org.name, exc)
            results.append(OrgResult(org=org, status=f"error: {exc}"))

    total_contacts, total_emails = write_results(results, args.output_dir)

    print()
    print("=" * 60)
    print("  Gradeum Marketing Agent — Summary")
    print("=" * 60)
    print(f"  Organizations processed : {len(results)}")
    print(f"  Total contacts found    : {total_contacts}")
    print(f"  Contacts with email     : {total_emails}")
    print(f"  Contacts name-only      : {total_contacts - total_emails}")
    print()

    ok = sum(1 for r in results if r.status == "ok")
    no_contacts = sum(1 for r in results if r.status == "no_contacts")
    errors = sum(1 for r in results if r.status.startswith("error"))
    warm = sum(1 for r in results if r.warm_signal)

    print(f"  Orgs with contacts      : {ok}")
    print(f"  Orgs with no contacts   : {no_contacts}")
    print(f"  Orgs with errors        : {errors}")
    print(f"  Orgs with warm signals  : {warm}")
    print()
    print(f"  Output: {args.output_dir / 'sourced_contacts.csv'}")
    print(f"  Log:    {args.output_dir / 'agent_log.csv'}")
    print()
    print("  Next step: run the targeting pipeline on the sourced contacts:")
    print(f"    python run.py {args.output_dir / 'sourced_contacts.csv'}")
    print("=" * 60)


if __name__ == "__main__":
    main()
