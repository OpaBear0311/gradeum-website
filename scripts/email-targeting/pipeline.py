"""
Main processing pipeline.

Reads an input contacts CSV, runs every contact through validation,
classification, and signal detection, then writes two output CSVs:
  - send_queue.csv   (contacts that passed all checks)
  - review.csv       (contacts that failed at least one check)
"""

from __future__ import annotations

import csv
import logging
from collections import Counter
from dataclasses import dataclass, field
from pathlib import Path

from classifiers import classify_contact_role, classify_tier
from config import MAX_CONTACTS_PER_ORG
from signals import detect_warm_signals
from validators import load_prior_sends, validate_contact

logger = logging.getLogger(__name__)

SEND_QUEUE_COLUMNS = [
    "name",
    "title",
    "email",
    "organization",
    "tier",
    "contact_role",
    "warm_signal",
    "source_url",
]

REVIEW_COLUMNS = SEND_QUEUE_COLUMNS + ["reject_reason"]

SENT_LOG_COLUMNS = SEND_QUEUE_COLUMNS + ["responded"]


@dataclass
class PipelineStats:
    total_input: int = 0
    passed: int = 0
    rejected: int = 0
    capped: int = 0  # passed validation but exceeded per-org limit
    reasons: Counter = field(default_factory=Counter)


def _normalise_row(row: dict[str, str]) -> dict[str, str]:
    """Lowercase and strip all keys, strip all values."""
    return {k.strip().lower(): v.strip() for k, v in row.items()}


def run_pipeline(
    input_csv: Path,
    output_dir: Path,
    *,
    prior_sends_csv: Path | None = None,
    skip_mx: bool = False,
    skip_verification: bool = False,
) -> PipelineStats:
    """Execute the full targeting pipeline.

    Parameters
    ----------
    input_csv:
        Path to the raw contacts CSV.  Expected columns (case-insensitive):
        ``name``, ``title``, ``email``, ``organization``, ``source_url``,
        ``org_notes`` (optional free-text for warm signal detection).
    output_dir:
        Directory to write ``send_queue.csv`` and ``review.csv``.
    prior_sends_csv:
        Optional path to a CSV of previously-sent emails for dedup.
    skip_mx:
        If True, skip MX record validation (useful for offline runs).
    skip_verification:
        If True, skip third-party email verification APIs.
    """
    output_dir.mkdir(parents=True, exist_ok=True)
    stats = PipelineStats()

    prior_sends = load_prior_sends(prior_sends_csv)

    send_queue: list[dict[str, str]] = []
    review_list: list[dict[str, str]] = []

    # Track per-org counts to enforce MAX_CONTACTS_PER_ORG
    org_counts: Counter = Counter()

    with open(input_csv, newline="", encoding="utf-8") as fh:
        reader = csv.DictReader(fh)
        for raw_row in reader:
            stats.total_input += 1
            row = _normalise_row(raw_row)

            name = row.get("name", "")
            title = row.get("title", "")
            email = row.get("email", "")
            organization = row.get("organization", "")
            source_url = row.get("source_url", "")
            org_notes = row.get("org_notes", "")

            if not email:
                review_list.append(
                    _make_record(name, title, email, organization, org_notes, source_url, "missing email")
                )
                stats.rejected += 1
                stats.reasons["missing email"] += 1
                continue

            # Run all validation checks
            reject_reason = validate_contact(
                email,
                title,
                prior_sends,
                skip_mx=skip_mx,
                skip_verification=skip_verification,
            )

            if reject_reason:
                review_list.append(
                    _make_record(name, title, email, organization, org_notes, source_url, reject_reason)
                )
                stats.rejected += 1
                stats.reasons[reject_reason.split(":")[0].strip()] += 1
                continue

            # Classify
            tier = classify_tier(organization)
            contact_role = classify_contact_role(title)
            warm_signal = detect_warm_signals(org_notes)

            org_key = organization.strip().lower()

            # Enforce per-org send limit
            if org_counts[org_key] >= MAX_CONTACTS_PER_ORG:
                review_list.append(
                    _make_record(
                        name, title, email, organization, org_notes, source_url,
                        f"per-org limit exceeded ({MAX_CONTACTS_PER_ORG} max)",
                    )
                )
                stats.capped += 1
                stats.reasons["per-org limit"] += 1
                continue

            org_counts[org_key] += 1

            send_queue.append({
                "name": name,
                "title": title,
                "email": email,
                "organization": organization,
                "tier": tier,
                "contact_role": contact_role,
                "warm_signal": warm_signal,
                "source_url": source_url,
            })
            stats.passed += 1

    # Sort send queue: warm signals first, then by tier (1 < 2 < 3 < Municipal)
    tier_order = {"1": 0, "2": 1, "3": 2, "Municipal": 3, "Unclassified": 4}
    send_queue.sort(key=lambda r: (
        0 if r["warm_signal"] else 1,
        tier_order.get(r["tier"], 5),
        r["organization"].lower(),
    ))

    # Write outputs
    _write_csv(output_dir / "send_queue.csv", SEND_QUEUE_COLUMNS, send_queue)
    _write_csv(output_dir / "review.csv", REVIEW_COLUMNS, review_list)
    _ensure_sent_log(output_dir / "sent_log.csv")

    return stats


def _make_record(
    name: str,
    title: str,
    email: str,
    organization: str,
    org_notes: str,
    source_url: str,
    reject_reason: str,
) -> dict[str, str]:
    """Build a review-row dict with tier/role filled in for context."""
    tier = classify_tier(organization) if organization else ""
    contact_role = classify_contact_role(title) if title else ""
    warm_signal = detect_warm_signals(org_notes)
    return {
        "name": name,
        "title": title,
        "email": email,
        "organization": organization,
        "tier": tier,
        "contact_role": contact_role,
        "warm_signal": warm_signal,
        "source_url": source_url,
        "reject_reason": reject_reason,
    }


def _write_csv(path: Path, columns: list[str], rows: list[dict[str, str]]) -> None:
    with open(path, "w", newline="", encoding="utf-8") as fh:
        writer = csv.DictWriter(fh, fieldnames=columns, extrasaction="ignore")
        writer.writeheader()
        writer.writerows(rows)
    logger.info("Wrote %d rows to %s", len(rows), path)


def _ensure_sent_log(path: Path) -> None:
    """Create the sent_log.csv with headers if it doesn't exist yet.

    This file is the feedback loop (Section 10): after sending, mark
    the ``responded`` column for contacts who reply so future runs can
    learn which titles/tiers/signals correlate with responses.
    """
    if path.exists():
        return
    with open(path, "w", newline="", encoding="utf-8") as fh:
        writer = csv.DictWriter(fh, fieldnames=SENT_LOG_COLUMNS)
        writer.writeheader()
    logger.info("Created empty sent_log.csv at %s", path)
