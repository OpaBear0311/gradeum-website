#!/usr/bin/env python3
"""
Gradeum Traffic & Lead Monitor Agent
=====================================

Monitors incoming leads (waitlist signups, info requests) and outreach
performance, then generates a daily report consumed by the advertising
agent and other downstream systems.

Data sources:
  1. Supabase leads API  — live signups from gradeum.io
  2. Local leads CSV     — manual lead imports / backup
  3. sent_log.csv        — outreach response tracking
  4. send_queue.csv      — pending outreach contacts

Output:
  - data/reports/daily_report_YYYY-MM-DD.json
  - data/reports/latest_report.json  (symlink / copy)

Usage:
  python monitor.py                           # generate today's report
  python monitor.py --date 2026-04-08         # specific date
  python monitor.py --watch --interval 3600   # continuous (hourly)

Environment variables:
  GRADEUM_API_URL          — API base URL (default: https://api.gradeum.io/api/v1)
  GRADEUM_API_KEY          — API key for authenticated lead retrieval
  SUPABASE_URL             — Supabase project URL (alternative source)
  SUPABASE_SERVICE_KEY     — Supabase service role key
"""

from __future__ import annotations

import argparse
import csv
import json
import logging
import os
import sys
import time
from collections import Counter
from dataclasses import asdict, dataclass, field
from datetime import date, datetime, timedelta
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

logger = logging.getLogger(__name__)

DATA_DIR = Path(__file__).resolve().parent / "data"
REPORTS_DIR = DATA_DIR / "reports"


# ── Data models ──────────────────────────────────────────────────────────────

@dataclass
class Lead:
    name: str = ""
    email: str = ""
    company: str = ""
    interest: str = ""       # Heavy, Lite, Both
    message: str = ""
    source: str = ""         # "website", "outreach_reply", "manual"
    created_at: str = ""     # ISO timestamp


@dataclass
class OutreachRecord:
    name: str = ""
    email: str = ""
    organization: str = ""
    tier: str = ""
    contact_role: str = ""   # technical / executive
    warm_signal: str = ""
    responded: str = ""      # yes / no / blank


@dataclass
class DailyReport:
    report_date: str = ""
    generated_at: str = ""

    # Lead metrics
    total_leads_alltime: int = 0
    new_leads_today: int = 0
    new_leads_7d: int = 0
    new_leads_30d: int = 0

    # Interest breakdown
    interest_heavy: int = 0
    interest_lite: int = 0
    interest_both: int = 0

    # Lead sources
    leads_by_source: dict[str, int] = field(default_factory=dict)

    # Company / org analysis
    top_companies: list[dict[str, int]] = field(default_factory=list)
    unique_companies: int = 0

    # Outreach performance
    total_sent: int = 0
    total_responded: int = 0
    response_rate: float = 0.0

    # Response breakdown by segment
    response_by_tier: dict[str, dict[str, int]] = field(default_factory=dict)
    response_by_role: dict[str, dict[str, int]] = field(default_factory=dict)
    response_by_signal: dict[str, dict[str, int]] = field(default_factory=dict)

    # Top performing segments
    best_tier: str = ""
    best_role: str = ""
    best_signal: str = ""

    # Pipeline status
    send_queue_size: int = 0
    review_queue_size: int = 0

    # Recommendations for advertising agent
    recommendations: list[str] = field(default_factory=list)


# ── Data ingestion ───────────────────────────────────────────────────────────

def _fetch_leads_from_api() -> list[Lead]:
    """Fetch leads from the Gradeum API or Supabase."""
    import requests

    # Try Gradeum API first
    api_url = os.environ.get("GRADEUM_API_URL", "https://api.gradeum.io/api/v1")
    api_key = os.environ.get("GRADEUM_API_KEY", "")

    if api_key:
        try:
            headers = {"Authorization": f"Bearer {api_key}"}
            resp = requests.get(f"{api_url}/leads", headers=headers, timeout=15)
            resp.raise_for_status()
            data = resp.json()
            leads = []
            for item in (data if isinstance(data, list) else data.get("data", [])):
                leads.append(Lead(
                    name=item.get("name", ""),
                    email=item.get("email", ""),
                    company=item.get("company", ""),
                    interest=item.get("interest", ""),
                    message=item.get("message", ""),
                    source="website",
                    created_at=item.get("created_at", ""),
                ))
            logger.info("Fetched %d leads from API", len(leads))
            return leads
        except Exception as exc:  # noqa: BLE001
            logger.warning("API fetch failed: %s", exc)

    # Try Supabase direct
    sb_url = os.environ.get("SUPABASE_URL", "")
    sb_key = os.environ.get("SUPABASE_SERVICE_KEY", "")

    if sb_url and sb_key:
        try:
            headers = {
                "apikey": sb_key,
                "Authorization": f"Bearer {sb_key}",
            }
            resp = requests.get(
                f"{sb_url}/rest/v1/leads?select=*&order=created_at.desc",
                headers=headers, timeout=15,
            )
            resp.raise_for_status()
            leads = []
            for item in resp.json():
                leads.append(Lead(
                    name=item.get("name", ""),
                    email=item.get("email", ""),
                    company=item.get("company", ""),
                    interest=item.get("interest", ""),
                    message=item.get("message", ""),
                    source="website",
                    created_at=item.get("created_at", ""),
                ))
            logger.info("Fetched %d leads from Supabase", len(leads))
            return leads
        except Exception as exc:  # noqa: BLE001
            logger.warning("Supabase fetch failed: %s", exc)

    return []


def _load_leads_from_csv(path: Path) -> list[Lead]:
    """Load leads from a local CSV file."""
    if not path.exists():
        return []
    leads = []
    with open(path, newline="", encoding="utf-8") as fh:
        reader = csv.DictReader(fh)
        for row in reader:
            leads.append(Lead(
                name=row.get("name", ""),
                email=row.get("email", ""),
                company=row.get("company", ""),
                interest=row.get("interest", ""),
                message=row.get("message", ""),
                source=row.get("source", "manual"),
                created_at=row.get("created_at", ""),
            ))
    logger.info("Loaded %d leads from %s", len(leads), path)
    return leads


def _load_outreach_log(path: Path) -> list[OutreachRecord]:
    """Load the sent_log.csv for outreach performance tracking."""
    if not path.exists():
        return []
    records = []
    with open(path, newline="", encoding="utf-8") as fh:
        reader = csv.DictReader(fh)
        for row in reader:
            records.append(OutreachRecord(
                name=row.get("name", ""),
                email=row.get("email", ""),
                organization=row.get("organization", ""),
                tier=row.get("tier", ""),
                contact_role=row.get("contact_role", ""),
                warm_signal=row.get("warm_signal", ""),
                responded=row.get("responded", "").strip().lower(),
            ))
    logger.info("Loaded %d outreach records from %s", len(records), path)
    return records


def _count_csv_rows(path: Path) -> int:
    """Count rows in a CSV (excluding header)."""
    if not path.exists():
        return 0
    with open(path, newline="", encoding="utf-8") as fh:
        return sum(1 for _ in csv.reader(fh)) - 1


# ── Report generation ────────────────────────────────────────────────────────

def generate_report(report_date: date | None = None) -> DailyReport:
    """Generate the daily performance report."""
    if report_date is None:
        report_date = date.today()

    report = DailyReport(
        report_date=report_date.isoformat(),
        generated_at=datetime.now().isoformat(),
    )

    # ── Ingest leads ─────────────────────────────────────────────────────
    leads: list[Lead] = []

    # API leads
    api_leads = _fetch_leads_from_api()
    leads.extend(api_leads)

    # Local CSV leads
    for csv_path in [DATA_DIR / "leads.csv", DATA_DIR / "inbound_leads.csv"]:
        leads.extend(_load_leads_from_csv(csv_path))

    # Dedup by email
    seen_emails: set[str] = set()
    unique_leads: list[Lead] = []
    for lead in leads:
        key = lead.email.lower().strip()
        if key and key not in seen_emails:
            seen_emails.add(key)
            unique_leads.append(lead)
        elif not key:
            unique_leads.append(lead)
    leads = unique_leads

    # ── Lead metrics ─────────────────────────────────────────────────────
    report.total_leads_alltime = len(leads)

    today_str = report_date.isoformat()
    d7_str = (report_date - timedelta(days=7)).isoformat()
    d30_str = (report_date - timedelta(days=30)).isoformat()

    for lead in leads:
        ts = lead.created_at[:10] if lead.created_at else ""
        if ts == today_str:
            report.new_leads_today += 1
        if ts >= d7_str:
            report.new_leads_7d += 1
        if ts >= d30_str:
            report.new_leads_30d += 1

    # Interest breakdown
    for lead in leads:
        interest = lead.interest.strip().lower()
        if interest == "heavy":
            report.interest_heavy += 1
        elif interest == "lite":
            report.interest_lite += 1
        elif interest == "both":
            report.interest_both += 1

    # Lead sources
    source_counts: Counter[str] = Counter()
    for lead in leads:
        source_counts[lead.source or "unknown"] += 1
    report.leads_by_source = dict(source_counts.most_common())

    # Company analysis
    company_counts: Counter[str] = Counter()
    for lead in leads:
        co = lead.company.strip()
        if co:
            company_counts[co] += 1
    report.top_companies = [
        {"company": co, "count": ct}
        for co, ct in company_counts.most_common(20)
    ]
    report.unique_companies = len(company_counts)

    # ── Outreach performance ─────────────────────────────────────────────
    outreach = _load_outreach_log(DATA_DIR / "sent_log.csv")
    report.total_sent = len(outreach)
    responded = [r for r in outreach if r.responded in ("yes", "true", "1")]
    report.total_responded = len(responded)
    report.response_rate = (
        round(len(responded) / len(outreach) * 100, 1) if outreach else 0.0
    )

    # Response by tier
    tier_stats: dict[str, dict[str, int]] = {}
    for r in outreach:
        tier = r.tier or "Unknown"
        if tier not in tier_stats:
            tier_stats[tier] = {"sent": 0, "responded": 0}
        tier_stats[tier]["sent"] += 1
        if r.responded in ("yes", "true", "1"):
            tier_stats[tier]["responded"] += 1
    report.response_by_tier = tier_stats

    # Response by role
    role_stats: dict[str, dict[str, int]] = {}
    for r in outreach:
        role = r.contact_role or "unknown"
        if role not in role_stats:
            role_stats[role] = {"sent": 0, "responded": 0}
        role_stats[role]["sent"] += 1
        if r.responded in ("yes", "true", "1"):
            role_stats[role]["responded"] += 1
    report.response_by_role = role_stats

    # Response by warm signal presence
    signal_stats: dict[str, dict[str, int]] = {"with_signal": {"sent": 0, "responded": 0},
                                                 "no_signal": {"sent": 0, "responded": 0}}
    for r in outreach:
        key = "with_signal" if r.warm_signal.strip() else "no_signal"
        signal_stats[key]["sent"] += 1
        if r.responded in ("yes", "true", "1"):
            signal_stats[key]["responded"] += 1
    report.response_by_signal = signal_stats

    # Best performing segments
    report.best_tier = _best_segment(tier_stats)
    report.best_role = _best_segment(role_stats)
    report.best_signal = _best_segment(signal_stats)

    # Pipeline status
    report.send_queue_size = _count_csv_rows(DATA_DIR / "send_queue.csv")
    report.review_queue_size = _count_csv_rows(DATA_DIR / "review.csv")

    # ── Recommendations ──────────────────────────────────────────────────
    report.recommendations = _generate_recommendations(report)

    return report


def _best_segment(stats: dict[str, dict[str, int]]) -> str:
    """Find the segment with the highest response rate (min 2 sends)."""
    best = ""
    best_rate = 0.0
    for segment, counts in stats.items():
        sent = counts.get("sent", 0)
        resp = counts.get("responded", 0)
        if sent >= 2:
            rate = resp / sent
            if rate > best_rate:
                best_rate = rate
                best = segment
    return best


def _generate_recommendations(report: DailyReport) -> list[str]:
    """Generate actionable recommendations for the advertising agent."""
    recs: list[str] = []

    # Interest-based recommendations
    total_interest = report.interest_heavy + report.interest_lite + report.interest_both
    if total_interest > 0:
        heavy_pct = report.interest_heavy / total_interest * 100
        lite_pct = report.interest_lite / total_interest * 100
        if heavy_pct > 60:
            recs.append(
                f"Heavy product dominates interest ({heavy_pct:.0f}%) — "
                "lean templates toward PE/engineering compliance messaging."
            )
        elif lite_pct > 60:
            recs.append(
                f"Lite product dominates interest ({lite_pct:.0f}%) — "
                "lean templates toward asset management and inspection ROI."
            )
        else:
            recs.append(
                "Interest is split — use dual-product templates that highlight "
                "both engineering compliance and asset management."
            )

    # Response rate recommendations
    if report.total_sent > 0:
        if report.response_rate < 5:
            recs.append(
                f"Response rate is low ({report.response_rate}%) — "
                "try shorter subject lines, stronger pain-point openers, "
                "or switch from cold pitch to value-first content."
            )
        elif report.response_rate > 15:
            recs.append(
                f"Response rate is strong ({report.response_rate}%) — "
                "double down on current template approach."
            )

    # Tier recommendations
    if report.best_tier:
        recs.append(f"Best performing tier: {report.best_tier} — prioritize this segment.")

    # Role recommendations
    if report.best_role:
        recs.append(f"Best performing role: {report.best_role} — invest more sends here.")

    # Warm signal recommendations
    ws = report.response_by_signal
    if ws.get("with_signal", {}).get("sent", 0) >= 2:
        ws_rate = ws["with_signal"]["responded"] / ws["with_signal"]["sent"] * 100
        no_rate = (ws["no_signal"]["responded"] / ws["no_signal"]["sent"] * 100
                   if ws["no_signal"]["sent"] > 0 else 0)
        if ws_rate > no_rate * 1.5:
            recs.append(
                f"Warm-signal contacts convert {ws_rate:.0f}% vs {no_rate:.0f}% — "
                "heavily prioritize orgs with active RFPs, FEMA grants, or CIPs."
            )

    # Pipeline recommendations
    if report.send_queue_size == 0:
        recs.append("Send queue is empty — run the marketing agent to source more contacts.")
    if report.review_queue_size > 50:
        recs.append(
            f"{report.review_queue_size} contacts in review queue — "
            "manual review may recover valid contacts."
        )

    if not recs:
        recs.append("Insufficient data for recommendations — keep sending and tracking responses.")

    return recs


# ── Output ───────────────────────────────────────────────────────────────────

def save_report(report: DailyReport, output_dir: Path | None = None) -> Path:
    """Save the report as JSON."""
    if output_dir is None:
        output_dir = REPORTS_DIR
    output_dir.mkdir(parents=True, exist_ok=True)

    # Dated report
    report_path = output_dir / f"daily_report_{report.report_date}.json"
    report_dict = asdict(report)
    with open(report_path, "w", encoding="utf-8") as fh:
        json.dump(report_dict, fh, indent=2)

    # Latest symlink / copy
    latest_path = output_dir / "latest_report.json"
    with open(latest_path, "w", encoding="utf-8") as fh:
        json.dump(report_dict, fh, indent=2)

    logger.info("Saved report to %s", report_path)
    return report_path


def print_report_summary(report: DailyReport) -> None:
    """Print a human-readable summary to stdout."""
    print()
    print("=" * 60)
    print(f"  Gradeum Daily Report — {report.report_date}")
    print("=" * 60)
    print()
    print("  LEADS")
    print(f"    All-time         : {report.total_leads_alltime}")
    print(f"    New today        : {report.new_leads_today}")
    print(f"    Last 7 days      : {report.new_leads_7d}")
    print(f"    Last 30 days     : {report.new_leads_30d}")
    print()
    print("  INTEREST BREAKDOWN")
    print(f"    Gradeum-Heavy    : {report.interest_heavy}")
    print(f"    Gradeum-Lite     : {report.interest_lite}")
    print(f"    Both             : {report.interest_both}")
    print()
    print(f"  COMPANIES          : {report.unique_companies} unique")
    if report.top_companies:
        for entry in report.top_companies[:5]:
            print(f"    {entry['company']:30s}  {entry['count']} leads")
    print()
    print("  OUTREACH PERFORMANCE")
    print(f"    Total sent       : {report.total_sent}")
    print(f"    Responded        : {report.total_responded}")
    print(f"    Response rate    : {report.response_rate}%")
    if report.response_by_tier:
        print()
        print("    By tier:")
        for tier, counts in report.response_by_tier.items():
            rate = (counts['responded'] / counts['sent'] * 100) if counts['sent'] else 0
            print(f"      {tier:15s}  {counts['sent']} sent, {counts['responded']} replied ({rate:.0f}%)")
    if report.response_by_role:
        print("    By role:")
        for role, counts in report.response_by_role.items():
            rate = (counts['responded'] / counts['sent'] * 100) if counts['sent'] else 0
            print(f"      {role:15s}  {counts['sent']} sent, {counts['responded']} replied ({rate:.0f}%)")
    print()
    print("  PIPELINE")
    print(f"    Send queue       : {report.send_queue_size} contacts")
    print(f"    Review queue     : {report.review_queue_size} contacts")
    print()
    print("  RECOMMENDATIONS")
    for i, rec in enumerate(report.recommendations, 1):
        print(f"    {i}. {rec}")
    print()
    print("=" * 60)


# ── CLI ──────────────────────────────────────────────────────────────────────

def main() -> None:
    parser = argparse.ArgumentParser(
        description="Gradeum traffic & lead monitor — generates daily reports",
    )
    parser.add_argument(
        "--date",
        type=str,
        default=None,
        help="Report date (YYYY-MM-DD, default: today)",
    )
    parser.add_argument(
        "-o", "--output-dir",
        type=Path,
        default=REPORTS_DIR,
        help=f"Reports directory (default: {REPORTS_DIR})",
    )
    parser.add_argument(
        "--watch",
        action="store_true",
        help="Run continuously, regenerating the report on interval",
    )
    parser.add_argument(
        "--interval",
        type=int,
        default=3600,
        help="Watch interval in seconds (default: 3600 = 1 hour)",
    )
    parser.add_argument(
        "-v", "--verbose",
        action="store_true",
        help="Enable debug logging",
    )

    args = parser.parse_args()
    logging.basicConfig(
        level=logging.DEBUG if args.verbose else logging.INFO,
        format="%(levelname)-5s  %(message)s",
    )

    report_date = date.fromisoformat(args.date) if args.date else date.today()

    if args.watch:
        logger.info("Monitor running in watch mode (interval: %ds)", args.interval)
        while True:
            try:
                report = generate_report(report_date=date.today())
                save_report(report, args.output_dir)
                print_report_summary(report)
                logger.info("Next report in %d seconds ...", args.interval)
                time.sleep(args.interval)
            except KeyboardInterrupt:
                logger.info("Stopping monitor.")
                break
    else:
        report = generate_report(report_date=report_date)
        save_report(report, args.output_dir)
        print_report_summary(report)


if __name__ == "__main__":
    main()
