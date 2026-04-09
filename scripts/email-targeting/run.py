#!/usr/bin/env python3
"""
Gradeum Email Targeting Script
==============================

Processes a raw contacts CSV through validation, classification, and
warm-signal detection, then outputs:

  send_queue.csv  — verified decision-maker contacts ready for outreach
  review.csv      — rejected contacts with reasons (for manual review)
  sent_log.csv    — feedback-loop file (mark 'responded' after sends)

Usage
-----
    python run.py contacts.csv                          # basic run
    python run.py contacts.csv --prior-sends sent.csv   # with dedup
    python run.py contacts.csv --skip-mx                # offline mode
    python run.py contacts.csv -o ./output              # custom output dir

Input CSV columns (case-insensitive):
    name, title, email, organization, source_url, org_notes (optional)

Environment variables (optional):
    ZEROBOUNCE_API_KEY   — enables ZeroBounce email verification
    NEVERBOUNCE_API_KEY  — enables NeverBounce email verification
"""

from __future__ import annotations

import argparse
import logging
import sys
from pathlib import Path

# Ensure the script directory is on the path so sibling modules import
sys.path.insert(0, str(Path(__file__).resolve().parent))

from pipeline import run_pipeline  # noqa: E402


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Gradeum outreach — email targeting pipeline",
    )
    parser.add_argument(
        "input_csv",
        type=Path,
        help="Path to the raw contacts CSV",
    )
    parser.add_argument(
        "-o", "--output-dir",
        type=Path,
        default=Path(__file__).resolve().parent / "data",
        help="Directory for output CSVs (default: ./data)",
    )
    parser.add_argument(
        "--prior-sends",
        type=Path,
        default=None,
        help="CSV of previously-sent emails (must have an 'email' column)",
    )
    parser.add_argument(
        "--skip-mx",
        action="store_true",
        help="Skip MX record validation (useful for offline runs)",
    )
    parser.add_argument(
        "--skip-verification",
        action="store_true",
        help="Skip third-party email verification even if API keys are set",
    )
    parser.add_argument(
        "-v", "--verbose",
        action="store_true",
        help="Enable debug logging",
    )

    args = parser.parse_args()

    logging.basicConfig(
        level=logging.DEBUG if args.verbose else logging.INFO,
        format="%(levelname)s  %(message)s",
    )

    if not args.input_csv.exists():
        logging.error("Input file not found: %s", args.input_csv)
        sys.exit(1)

    stats = run_pipeline(
        input_csv=args.input_csv,
        output_dir=args.output_dir,
        prior_sends_csv=args.prior_sends,
        skip_mx=args.skip_mx,
        skip_verification=args.skip_verification,
    )

    print()
    print("=" * 50)
    print("  Gradeum Email Targeting — Run Summary")
    print("=" * 50)
    print(f"  Total input contacts : {stats.total_input}")
    print(f"  Send queue (passed)  : {stats.passed}")
    print(f"  Rejected             : {stats.rejected}")
    print(f"  Capped (org limit)   : {stats.capped}")
    print()
    if stats.reasons:
        print("  Rejection breakdown:")
        for reason, count in stats.reasons.most_common():
            print(f"    {reason:30s}  {count}")
    print()
    print(f"  Output: {args.output_dir / 'send_queue.csv'}")
    print(f"  Review: {args.output_dir / 'review.csv'}")
    print(f"  Log:    {args.output_dir / 'sent_log.csv'}")
    print("=" * 50)


if __name__ == "__main__":
    main()
