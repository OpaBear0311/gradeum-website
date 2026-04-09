"""
Warm-signal detection.

Scans provided text (org notes, news snippets, meeting minutes) for
keywords that indicate active buying signals.
"""

from __future__ import annotations

import logging
import re

from config import WARM_SIGNAL_KEYWORDS

logger = logging.getLogger(__name__)


def detect_warm_signals(text: str) -> str:
    """Scan *text* for warm-signal keywords and return a brief summary.

    Returns a comma-separated list of matched signals, or an empty string
    if nothing was found.

    The input ``text`` is expected to be the contents of an ``org_notes``
    column in the input CSV — free-form text that might contain snippets
    from commission agendas, news articles, or CIP documents.
    """
    if not text or not text.strip():
        return ""

    text_lower = text.lower()
    matched: list[str] = []

    for keyword in WARM_SIGNAL_KEYWORDS:
        # Use word-boundary matching so "cip" doesn't match "municipal"
        pattern = rf"\b{re.escape(keyword)}\b"
        if re.search(pattern, text_lower):
            matched.append(keyword)

    # Deduplicate overlapping signals (e.g. "fema grant" and "fema funding")
    unique = _deduplicate_signals(matched)
    return "; ".join(unique)


def _deduplicate_signals(signals: list[str]) -> list[str]:
    """Remove signals that are substrings of other, more specific signals."""
    if not signals:
        return []
    # Sort longest-first so more specific signals take priority
    sorted_signals = sorted(signals, key=len, reverse=True)
    kept: list[str] = []
    for sig in sorted_signals:
        if not any(sig in other and sig != other for other in kept):
            kept.append(sig)
    return kept
