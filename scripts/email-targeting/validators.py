"""
Validation logic for the email targeting pipeline.

Every contact must pass ALL checks before entering the send queue:
  1. Prefix check — email prefix not on reject list
  2. Role confirmation — title matches target role list
  3. Deduplication — email not in prior-sends CSV
  4. MX record check — domain has valid MX records
  5. Email verification (optional) — ZeroBounce / NeverBounce API
"""

from __future__ import annotations

import csv
import logging
import os
import re
from pathlib import Path

import dns.resolver

from config import (
    DEPARTMENT_INBOX_KEYWORDS,
    NEVERBOUNCE_API_KEY_ENV,
    REJECTED_FULL_EMAILS,
    REJECTED_PREFIXES,
    TARGET_ROLE_KEYWORDS,
    ZEROBOUNCE_API_KEY_ENV,
)

# Pre-compile word-boundary patterns for target role keywords
_TARGET_ROLE_PATTERNS = [
    re.compile(rf"\b{re.escape(kw)}\b", re.IGNORECASE)
    for kw in TARGET_ROLE_KEYWORDS
]

logger = logging.getLogger(__name__)

# Cache MX lookups so we don't hammer DNS for the same domain repeatedly
_mx_cache: dict[str, bool] = {}


# ── 1. Prefix check ─────────────────────────────────────────────────────────

def _looks_like_department_inbox(local_part: str) -> bool:
    """Return True if the local part has no plausible person-name component."""
    lp = local_part.lower().strip()

    # Check against known department keywords
    if lp in DEPARTMENT_INBOX_KEYWORDS:
        return True

    # A person's email usually contains a dot, underscore, or multiple alpha
    # segments (j.smith, jsmith, john_smith).  A bare single word with no
    # separators that also matches a department keyword is suspicious.
    has_separator = bool(re.search(r"[._\-]", lp))
    has_digit = bool(re.search(r"\d", lp))

    # If there's a separator it likely encodes first.last or f.last — probably a person
    if has_separator:
        return False

    # If it's a single short token with no digits, check against dept list
    if not has_digit and len(lp) <= 20:
        for kw in DEPARTMENT_INBOX_KEYWORDS:
            if lp == kw:
                return True

    return False


def check_prefix(email: str) -> str | None:
    """Return a rejection reason if the email prefix fails, else None."""
    email_lower = email.lower().strip()

    if email_lower in REJECTED_FULL_EMAILS:
        return "placeholder/example address"

    local_part = email_lower.split("@")[0] if "@" in email_lower else email_lower

    if local_part in REJECTED_PREFIXES:
        return f"rejected prefix: {local_part}@"

    if _looks_like_department_inbox(local_part):
        return f"department inbox: {local_part}@"

    return None


# ── 2. Role confirmation ────────────────────────────────────────────────────

def check_role(title: str) -> str | None:
    """Return a rejection reason if the title doesn't match target roles, else None."""
    if not title or not title.strip():
        return "no title confirmed"

    title_clean = title.strip()
    for pattern in _TARGET_ROLE_PATTERNS:
        if pattern.search(title_clean):
            return None  # passes

    return f"title not in target list: {title}"


# ── 3. Deduplication ────────────────────────────────────────────────────────

def load_prior_sends(filepath: str | Path | None) -> set[str]:
    """Load a set of previously-sent email addresses from a CSV file.

    Expects a column named ``email`` (case-insensitive header).
    Returns an empty set if the file doesn't exist or is empty.
    """
    if filepath is None:
        return set()
    filepath = Path(filepath)
    if not filepath.exists():
        logger.info("Prior sends file %s not found — skipping dedup.", filepath)
        return set()

    emails: set[str] = set()
    with open(filepath, newline="", encoding="utf-8") as fh:
        reader = csv.DictReader(fh)
        # Normalise header names
        if reader.fieldnames is None:
            return emails
        col = None
        for fn in reader.fieldnames:
            if fn.strip().lower() == "email":
                col = fn
                break
        if col is None:
            logger.warning("Prior sends CSV has no 'email' column — skipping dedup.")
            return emails
        for row in reader:
            val = row.get(col, "").strip().lower()
            if val:
                emails.add(val)
    logger.info("Loaded %d prior-send emails for dedup.", len(emails))
    return emails


def check_dedup(email: str, prior_sends: set[str]) -> str | None:
    """Return rejection reason if email was already sent, else None."""
    if email.lower().strip() in prior_sends:
        return "duplicate — already in prior sends"
    return None


# ── 4. MX record validation ─────────────────────────────────────────────────

def check_mx(email: str) -> str | None:
    """Return rejection reason if the domain has no MX records, else None."""
    if "@" not in email:
        return "invalid email format (no @)"

    domain = email.split("@")[1].strip().lower()

    if domain in _mx_cache:
        return None if _mx_cache[domain] else f"MX check failed for {domain}"

    try:
        answers = dns.resolver.resolve(domain, "MX")
        _mx_cache[domain] = len(answers) > 0
    except (dns.resolver.NoAnswer, dns.resolver.NXDOMAIN, dns.resolver.NoNameservers):
        _mx_cache[domain] = False
    except dns.resolver.LifetimeTimeout:
        logger.warning("DNS timeout for %s — treating as failed.", domain)
        _mx_cache[domain] = False
    except Exception as exc:  # noqa: BLE001
        logger.warning("Unexpected DNS error for %s: %s", domain, exc)
        _mx_cache[domain] = False

    return None if _mx_cache[domain] else f"MX check failed for {domain}"


# ── 5. Optional email verification (ZeroBounce / NeverBounce) ───────────────

def _verify_zerobounce(email: str, api_key: str) -> str | None:
    """Call ZeroBounce API. Return rejection reason or None."""
    import requests

    try:
        resp = requests.get(
            "https://api.zerobounce.net/v2/validate",
            params={"api_key": api_key, "email": email},
            timeout=10,
        )
        data = resp.json()
        status = data.get("status", "").lower()
        if status in ("valid", "catch-all"):
            return None
        return f"ZeroBounce: {status} — {data.get('sub_status', '')}"
    except Exception as exc:  # noqa: BLE001
        logger.warning("ZeroBounce API error for %s: %s", email, exc)
        return None  # don't reject on API failure


def _verify_neverbounce(email: str, api_key: str) -> str | None:
    """Call NeverBounce API. Return rejection reason or None."""
    import requests

    try:
        resp = requests.post(
            "https://api.neverbounce.com/v4/single/check",
            json={"key": api_key, "email": email},
            timeout=10,
        )
        data = resp.json()
        result = data.get("result", "").lower()
        if result in ("valid", "catchall"):
            return None
        return f"NeverBounce: {result}"
    except Exception as exc:  # noqa: BLE001
        logger.warning("NeverBounce API error for %s: %s", email, exc)
        return None


def check_email_verification(email: str) -> str | None:
    """Run optional email verification if an API key is configured."""
    zb_key = os.environ.get(ZEROBOUNCE_API_KEY_ENV, "").strip()
    if zb_key:
        return _verify_zerobounce(email, zb_key)

    nb_key = os.environ.get(NEVERBOUNCE_API_KEY_ENV, "").strip()
    if nb_key:
        return _verify_neverbounce(email, nb_key)

    # No verification API configured — pass by default
    return None


# ── Composite validator ──────────────────────────────────────────────────────

def validate_contact(
    email: str,
    title: str,
    prior_sends: set[str],
    *,
    skip_mx: bool = False,
    skip_verification: bool = False,
) -> str | None:
    """Run all validation checks in order. Return first rejection reason or None."""

    reason = check_prefix(email)
    if reason:
        return reason

    reason = check_role(title)
    if reason:
        return reason

    reason = check_dedup(email, prior_sends)
    if reason:
        return reason

    if not skip_mx:
        reason = check_mx(email)
        if reason:
            return reason

    if not skip_verification:
        reason = check_email_verification(email)
        if reason:
            return reason

    return None
