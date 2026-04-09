"""
Classification helpers: org tier assignment and contact role tagging.
"""

from __future__ import annotations

import re

from config import (
    DEFAULT_TIER,
    ORG_TIER_MAP,
    TECHNICAL_ROLE_KEYWORDS,
)


def classify_tier(organization: str) -> str:
    """Return the tier string for an organization.

    Performs a case-insensitive lookup against ``ORG_TIER_MAP``.
    Falls back to ``DEFAULT_TIER`` if no match is found.
    """
    org_lower = organization.strip().lower()

    # Exact match
    if org_lower in ORG_TIER_MAP:
        return ORG_TIER_MAP[org_lower]

    # Substring match — handles cases like "The Port of Corpus Christi Authority"
    for key, tier in ORG_TIER_MAP.items():
        if key in org_lower or org_lower in key:
            return tier

    return DEFAULT_TIER


def classify_contact_role(title: str) -> str:
    """Return ``'technical'`` or ``'executive'`` based on the contact's title."""
    if not title:
        return "executive"  # default to executive when title is ambiguous

    title_lower = title.lower().strip()
    for keyword in TECHNICAL_ROLE_KEYWORDS:
        # Use word-boundary matching to prevent false positives
        # (e.g. "cto" matching inside "director")
        if re.search(rf"\b{re.escape(keyword)}\b", title_lower):
            return "technical"

    return "executive"
