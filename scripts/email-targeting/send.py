#!/usr/bin/env python3
"""
Gradeum Send CLI
================

Reads email_drafts.csv and dispatches emails through the configured
provider. Defaults to DRY-RUN — writes dispatched output to
data/dry_run_outbox.txt without actually sending.

Pass --send to actually transmit. You will be asked to confirm.

Usage:
  python send.py                    # dry run (default, safe)
  python send.py --send             # actually send after confirmation
  python send.py --send --yes       # send without interactive prompt
  python send.py --limit 5          # only process first 5 drafts
  python send.py --rate 30          # throttle: 30s between sends

Safety features:
  - Dry-run by default
  - Interactive confirmation before real send
  - Already-sent log prevents double-sending
  - Rate limiting between sends
  - Per-run cap (--limit)
"""

from __future__ import annotations

import argparse
import csv
import logging
import sys
import time
from datetime import datetime
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from sender import SendResult, detect_provider, send_email  # noqa: E402

logger = logging.getLogger(__name__)

DATA_DIR = Path(__file__).resolve().parent / "data"
DRAFTS_PATH = DATA_DIR / "email_drafts.csv"
SENT_LOG_PATH = DATA_DIR / "sent_log.csv"
DRY_RUN_OUTBOX = DATA_DIR / "dry_run_outbox.txt"

SENT_LOG_COLUMNS = [
    "name", "title", "email", "organization", "tier", "contact_role",
    "warm_signal", "template_id", "sent_at", "provider", "message_id",
    "status", "responded",
]


def load_drafts(path: Path) -> list[dict[str, str]]:
    if not path.exists():
        logger.error("No drafts found at %s", path)
        return []
    with open(path, newline="", encoding="utf-8") as fh:
        return list(csv.DictReader(fh))


def load_already_sent(path: Path) -> set[str]:
    """Load set of emails already sent (for dedup)."""
    if not path.exists():
        return set()
    sent: set[str] = set()
    with open(path, newline="", encoding="utf-8") as fh:
        reader = csv.DictReader(fh)
        for row in reader:
            email = row.get("email", "").strip().lower()
            status = row.get("status", "").strip().lower()
            if email and status == "sent":
                sent.add(email)
    return sent


def append_sent_log(
    draft: dict[str, str],
    result: SendResult,
    sent_log_path: Path,
) -> None:
    """Append a row to sent_log.csv — creates header if file is new."""
    write_header = not sent_log_path.exists()
    with open(sent_log_path, "a", newline="", encoding="utf-8") as fh:
        writer = csv.DictWriter(fh, fieldnames=SENT_LOG_COLUMNS)
        if write_header:
            writer.writeheader()
        writer.writerow({
            "name": draft.get("name", ""),
            "title": draft.get("title", ""),
            "email": draft.get("email", ""),
            "organization": draft.get("organization", ""),
            "tier": draft.get("tier", ""),
            "contact_role": draft.get("contact_role", ""),
            "warm_signal": draft.get("warm_signal", ""),
            "template_id": draft.get("template_id", ""),
            "sent_at": datetime.now().isoformat(),
            "provider": result.provider,
            "message_id": result.message_id,
            "status": "sent" if result.success else f"failed: {result.error[:100]}",
            "responded": "",
        })


def dry_run_dispatch(drafts: list[dict[str, str]], outbox: Path) -> int:
    """Write drafts to a local outbox file without sending."""
    outbox.parent.mkdir(parents=True, exist_ok=True)
    with open(outbox, "w", encoding="utf-8") as fh:
        for i, d in enumerate(drafts, 1):
            fh.write(f"{'=' * 70}\n")
            fh.write(f"DRY RUN — Email {i} of {len(drafts)}\n")
            fh.write(f"{'=' * 70}\n")
            fh.write(f"To:       {d.get('name')} <{d.get('email')}>\n")
            fh.write(f"Org:      {d.get('organization')} (Tier {d.get('tier')})\n")
            fh.write(f"Role:     {d.get('contact_role')}\n")
            fh.write(f"Template: {d.get('template_id')}\n")
            if d.get("warm_signal"):
                fh.write(f"Signal:   {d.get('warm_signal')}\n")
            fh.write(f"Subject:  {d.get('subject')}\n")
            fh.write("\n")
            fh.write(d.get("body", ""))
            fh.write("\n\n")
    logger.info("Dry run wrote %d emails to %s", len(drafts), outbox)
    return len(drafts)


def live_dispatch(
    drafts: list[dict[str, str]],
    rate_limit_s: float,
    sent_log_path: Path,
) -> tuple[int, int]:
    """Actually send emails. Returns (sent_count, failed_count)."""
    sent = 0
    failed = 0
    for i, d in enumerate(drafts, 1):
        to = d.get("email", "").strip()
        subject = d.get("subject", "")
        body = d.get("body", "")

        if not to or not subject or not body:
            logger.warning("[%d/%d] Skipping incomplete draft for %s",
                          i, len(drafts), d.get("name", "?"))
            failed += 1
            continue

        logger.info("[%d/%d] Sending to %s (%s) ...", i, len(drafts), to,
                    d.get("organization", ""))
        try:
            result = send_email(to, subject, body)
        except Exception as exc:  # noqa: BLE001
            result = SendResult(success=False, provider="unknown", error=str(exc))

        append_sent_log(d, result, sent_log_path)

        if result.success:
            sent += 1
            logger.info("   Sent via %s  id=%s", result.provider, result.message_id)
        else:
            failed += 1
            logger.error("   Failed: %s", result.error)

        if i < len(drafts) and rate_limit_s > 0:
            time.sleep(rate_limit_s)

    return sent, failed


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Gradeum email sender — dispatches drafts via configured provider",
    )
    parser.add_argument(
        "--drafts",
        type=Path,
        default=DRAFTS_PATH,
        help=f"Path to drafts CSV (default: {DRAFTS_PATH})",
    )
    parser.add_argument(
        "--send",
        action="store_true",
        help="Actually send emails (default is dry-run)",
    )
    parser.add_argument(
        "--yes",
        action="store_true",
        help="Skip interactive confirmation prompt",
    )
    parser.add_argument(
        "--limit",
        type=int,
        default=None,
        help="Only process first N drafts",
    )
    parser.add_argument(
        "--rate",
        type=float,
        default=10.0,
        help="Seconds between sends (default: 10.0)",
    )
    parser.add_argument(
        "--skip-dedup",
        action="store_true",
        help="Don't skip emails that are already in sent_log.csv",
    )
    parser.add_argument(
        "-v", "--verbose",
        action="store_true",
    )

    args = parser.parse_args()
    logging.basicConfig(
        level=logging.DEBUG if args.verbose else logging.INFO,
        format="%(levelname)-5s  %(message)s",
    )

    # Load drafts
    drafts = load_drafts(args.drafts)
    if not drafts:
        print("No drafts to send. Run advertiser.py first.")
        sys.exit(1)

    # Dedup against already-sent
    if not args.skip_dedup:
        already_sent = load_already_sent(SENT_LOG_PATH)
        if already_sent:
            before = len(drafts)
            drafts = [d for d in drafts if d.get("email", "").strip().lower() not in already_sent]
            skipped = before - len(drafts)
            if skipped:
                logger.info("Skipped %d drafts already in sent_log.csv", skipped)

    if args.limit:
        drafts = drafts[:args.limit]

    if not drafts:
        print("No new drafts to dispatch (all already sent).")
        sys.exit(0)

    # Show what will happen
    print()
    print("=" * 60)
    if args.send:
        print("  LIVE SEND")
        provider = detect_provider()
        if provider == "none":
            print()
            print("  ERROR: No email provider configured.")
            print("  Set one of these environment variables and retry:")
            print("    SENDGRID_API_KEY")
            print("    POSTMARK_SERVER_TOKEN")
            print("    AWS_ACCESS_KEY_ID (with AWS_REGION)")
            print("    SMTP_HOST")
            sys.exit(1)
        print(f"  Provider: {provider}")
    else:
        print("  DRY RUN (no emails will be sent)")
    print("=" * 60)
    print(f"  Drafts to dispatch : {len(drafts)}")
    if args.send:
        print(f"  Rate limit         : {args.rate}s between sends")
    print()
    print("  First 3 recipients:")
    for d in drafts[:3]:
        print(f"    - {d.get('name'):25s} {d.get('email'):35s} {d.get('organization')}")
    if len(drafts) > 3:
        print(f"    ... and {len(drafts) - 3} more")
    print()

    # Confirmation gate for live sends
    if args.send and not args.yes:
        print("  Type 'SEND' to confirm, anything else to abort:")
        confirm = input("  > ").strip()
        if confirm != "SEND":
            print("  Aborted.")
            sys.exit(0)

    # Dispatch
    if args.send:
        sent, failed = live_dispatch(drafts, args.rate, SENT_LOG_PATH)
        print()
        print("=" * 60)
        print("  Send complete")
        print("=" * 60)
        print(f"  Sent    : {sent}")
        print(f"  Failed  : {failed}")
        print(f"  Log     : {SENT_LOG_PATH}")
        print()
    else:
        count = dry_run_dispatch(drafts, DRY_RUN_OUTBOX)
        print("=" * 60)
        print("  Dry run complete")
        print("=" * 60)
        print(f"  {count} emails written to: {DRY_RUN_OUTBOX}")
        print()
        print("  To actually send, run:")
        print("    python send.py --send")
        print()


if __name__ == "__main__":
    main()
