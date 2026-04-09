#!/usr/bin/env python3
"""
Gradeum Advertising Agent
=========================

Reads the daily report from the monitor agent and the send queue from
the targeting pipeline, then generates personalized email drafts for
each contact — selecting the best template based on performance data.

Workflow:
  1. Read latest_report.json (from monitor agent)
  2. Read send_queue.csv (from targeting pipeline)
  3. Load template performance history
  4. For each contact, select the best-performing template for their segment
  5. Render personalized emails
  6. Output email_drafts.csv ready for sending
  7. Update template performance log

Adaptation logic:
  - Templates that get higher response rates are selected more often
  - Templates with low response rates get deprioritized
  - New templates get a "exploration bonus" so they're tried
  - Warm-signal contacts always get warm-signal-specific templates
  - Report recommendations influence product focus and tone

Usage:
  python advertiser.py                              # generate drafts
  python advertiser.py --preview                    # preview without writing
  python advertiser.py --force-template exec_t1_pain  # force specific template
"""

from __future__ import annotations

import argparse
import csv
import json
import logging
import math
import sys
from dataclasses import dataclass, field
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from templates import (  # noqa: E402
    TEMPLATES,
    EmailTemplate,
    get_templates_for_contact,
    render_template,
)

logger = logging.getLogger(__name__)

DATA_DIR = Path(__file__).resolve().parent / "data"
REPORTS_DIR = DATA_DIR / "reports"

DRAFT_COLUMNS = [
    "name", "title", "email", "organization", "tier", "contact_role",
    "warm_signal", "template_id", "subject", "body",
]

PERF_LOG_COLUMNS = [
    "template_id", "times_sent", "times_responded", "response_rate",
    "last_updated",
]


# ── Report & data loading ───────────────────────────────────────────────────

@dataclass
class AgentContext:
    """Everything the advertising agent needs to make decisions."""

    # From daily report
    report: dict = field(default_factory=dict)
    recommendations: list[str] = field(default_factory=list)
    best_tier: str = ""
    best_role: str = ""
    response_rate: float = 0.0
    interest_heavy: int = 0
    interest_lite: int = 0
    interest_both: int = 0

    # From send queue
    contacts: list[dict[str, str]] = field(default_factory=list)

    # Template performance
    template_perf: dict[str, dict] = field(default_factory=dict)


def load_context() -> AgentContext:
    """Load all data the agent needs."""
    ctx = AgentContext()

    # Load latest report
    report_path = REPORTS_DIR / "latest_report.json"
    if report_path.exists():
        with open(report_path, encoding="utf-8") as fh:
            ctx.report = json.load(fh)
        ctx.recommendations = ctx.report.get("recommendations", [])
        ctx.best_tier = ctx.report.get("best_tier", "")
        ctx.best_role = ctx.report.get("best_role", "")
        ctx.response_rate = ctx.report.get("response_rate", 0.0)
        ctx.interest_heavy = ctx.report.get("interest_heavy", 0)
        ctx.interest_lite = ctx.report.get("interest_lite", 0)
        ctx.interest_both = ctx.report.get("interest_both", 0)
        logger.info("Loaded daily report from %s", report_path)
    else:
        logger.warning("No daily report found at %s — using defaults.", report_path)

    # Load send queue
    sq_path = DATA_DIR / "send_queue.csv"
    if sq_path.exists():
        with open(sq_path, newline="", encoding="utf-8") as fh:
            ctx.contacts = list(csv.DictReader(fh))
        logger.info("Loaded %d contacts from send queue.", len(ctx.contacts))
    else:
        logger.warning("No send_queue.csv found.")

    # Load template performance history
    perf_path = DATA_DIR / "template_performance.json"
    if perf_path.exists():
        with open(perf_path, encoding="utf-8") as fh:
            ctx.template_perf = json.load(fh)
        logger.info("Loaded template performance data.")
    else:
        logger.info("No template performance history — starting fresh.")

    return ctx


# ── Template selection with adaptation ───────────────────────────────────────

def _get_product_bias(ctx: AgentContext) -> str:
    """Determine product focus bias from report data."""
    total = ctx.interest_heavy + ctx.interest_lite + ctx.interest_both
    if total == 0:
        return "dual"

    heavy_pct = ctx.interest_heavy / total
    lite_pct = ctx.interest_lite / total

    if heavy_pct > 0.6:
        return "heavy"
    elif lite_pct > 0.6:
        return "lite"
    return "dual"


def _get_tone_bias(ctx: AgentContext) -> str:
    """Determine tone preference from report recommendations."""
    rec_text = " ".join(ctx.recommendations).lower()

    if "pain" in rec_text or "opener" in rec_text:
        return "pain_point"
    if "value" in rec_text or "content" in rec_text:
        return "value_first"
    if "proof" in rec_text or "peer" in rec_text:
        return "social_proof"
    if "urgency" in rec_text or "rfp" in rec_text:
        return "urgency"
    return ""  # no bias


def select_template(
    contact_role: str,
    tier: str,
    has_warm_signal: bool,
    ctx: AgentContext,
    *,
    force_template: str | None = None,
) -> EmailTemplate:
    """Select the best template for a contact using performance data.

    Uses a Thompson Sampling-inspired approach:
      - Templates with high response rates get higher selection probability
      - New/untested templates get an exploration bonus
      - Report recommendations bias toward certain tones/products
    """
    # Forced template override
    if force_template:
        for t in TEMPLATES:
            if t.template_id == force_template:
                return t

    candidates = get_templates_for_contact(contact_role, tier, has_warm_signal)
    if not candidates:
        # Fallback: any template matching the role
        candidates = [t for t in TEMPLATES if t.contact_role in (contact_role, "any")]
    if not candidates:
        candidates = TEMPLATES[:1]  # absolute fallback

    product_bias = _get_product_bias(ctx)
    tone_bias = _get_tone_bias(ctx)

    scored: list[tuple[float, EmailTemplate]] = []
    for t in candidates:
        score = _score_template(t, ctx, product_bias, tone_bias)
        scored.append((score, t))

    scored.sort(key=lambda x: x[0], reverse=True)
    return scored[0][1]


def _score_template(
    t: EmailTemplate,
    ctx: AgentContext,
    product_bias: str,
    tone_bias: str,
) -> float:
    """Score a template combining performance data and contextual biases."""
    score = 50.0  # base score

    # Performance component (0–30 points)
    perf = ctx.template_perf.get(t.template_id, {})
    sent = perf.get("times_sent", 0)
    responded = perf.get("times_responded", 0)

    if sent >= 5:
        # Enough data — use actual response rate
        rate = responded / sent
        score += rate * 30
    elif sent > 0:
        # Some data — blend actual rate with exploration bonus
        rate = responded / sent
        exploration = 10 * (1 - sent / 5)  # decays as we get more data
        score += rate * 20 + exploration
    else:
        # Untested — give exploration bonus
        score += 15

    # Product bias (0–10 points)
    if product_bias == t.product_focus:
        score += 10
    elif t.product_focus == "dual":
        score += 5

    # Tone bias (0–10 points)
    if tone_bias and tone_bias == t.tone:
        score += 10

    # Best-performing segment boost (0–5 points)
    if ctx.best_tier and ctx.best_tier == t.tier:
        score += 5
    if ctx.best_role and ctx.best_role == t.contact_role:
        score += 5

    return score


# ── Draft generation ─────────────────────────────────────────────────────────

@dataclass
class EmailDraft:
    name: str
    title: str
    email: str
    organization: str
    tier: str
    contact_role: str
    warm_signal: str
    template_id: str
    subject: str
    body: str


def generate_drafts(
    ctx: AgentContext,
    *,
    force_template: str | None = None,
) -> list[EmailDraft]:
    """Generate personalized email drafts for every contact in the send queue."""
    drafts: list[EmailDraft] = []
    template_usage: dict[str, int] = {}

    for contact in ctx.contacts:
        role = contact.get("contact_role", "executive")
        tier = contact.get("tier", "any")
        warm = contact.get("warm_signal", "").strip()

        template = select_template(
            role, tier, bool(warm), ctx, force_template=force_template,
        )

        # Determine product name for rendering
        product = "Gradeum"
        if template.product_focus == "heavy":
            product = "Gradeum-Heavy"
        elif template.product_focus == "lite":
            product = "Gradeum-Lite"

        subject, body = render_template(
            template,
            name=contact.get("name", ""),
            title=contact.get("title", ""),
            organization=contact.get("organization", ""),
            warm_signal=warm,
            product=product,
        )

        drafts.append(EmailDraft(
            name=contact.get("name", ""),
            title=contact.get("title", ""),
            email=contact.get("email", ""),
            organization=contact.get("organization", ""),
            tier=tier,
            contact_role=role,
            warm_signal=warm,
            template_id=template.template_id,
            subject=subject,
            body=body,
        ))

        template_usage[template.template_id] = template_usage.get(template.template_id, 0) + 1

    logger.info("Generated %d email drafts.", len(drafts))
    if template_usage:
        logger.info("Template usage:")
        for tid, count in sorted(template_usage.items(), key=lambda x: -x[1]):
            logger.info("  %s: %d emails", tid, count)

    return drafts


# ── Output ───────────────────────────────────────────────────────────────────

def write_drafts(drafts: list[EmailDraft], output_dir: Path) -> Path:
    """Write drafts to CSV."""
    output_dir.mkdir(parents=True, exist_ok=True)
    path = output_dir / "email_drafts.csv"
    with open(path, "w", newline="", encoding="utf-8") as fh:
        writer = csv.DictWriter(fh, fieldnames=DRAFT_COLUMNS)
        writer.writeheader()
        for d in drafts:
            writer.writerow({
                "name": d.name,
                "title": d.title,
                "email": d.email,
                "organization": d.organization,
                "tier": d.tier,
                "contact_role": d.contact_role,
                "warm_signal": d.warm_signal,
                "template_id": d.template_id,
                "subject": d.subject,
                "body": d.body,
            })
    logger.info("Wrote drafts to %s", path)
    return path


def update_performance_log(
    drafts: list[EmailDraft],
    output_dir: Path,
) -> None:
    """Update the template performance log after generating drafts.

    This increments times_sent for each template used. The times_responded
    counter is updated manually (or by the monitor agent) when replies come in.
    """
    perf_path = output_dir / "template_performance.json"
    perf: dict[str, dict] = {}
    if perf_path.exists():
        with open(perf_path, encoding="utf-8") as fh:
            perf = json.load(fh)

    from datetime import datetime
    now = datetime.now().isoformat()

    for d in drafts:
        tid = d.template_id
        if tid not in perf:
            perf[tid] = {"times_sent": 0, "times_responded": 0, "last_updated": now}
        perf[tid]["times_sent"] += 1
        perf[tid]["last_updated"] = now

    with open(perf_path, "w", encoding="utf-8") as fh:
        json.dump(perf, fh, indent=2)
    logger.info("Updated template performance log.")


def preview_drafts(drafts: list[EmailDraft], limit: int = 3) -> None:
    """Print preview of first N drafts."""
    for i, d in enumerate(drafts[:limit]):
        print()
        print("-" * 60)
        print(f"  Draft {i+1} of {len(drafts)}")
        print(f"  To:       {d.name} <{d.email}>")
        print(f"  Org:      {d.organization} (Tier {d.tier})")
        print(f"  Role:     {d.contact_role}")
        print(f"  Template: {d.template_id}")
        if d.warm_signal:
            print(f"  Signal:   {d.warm_signal}")
        print(f"  Subject:  {d.subject}")
        print("-" * 60)
        print(d.body)
    if len(drafts) > limit:
        print(f"\n  ... and {len(drafts) - limit} more drafts.")


# ── CLI ──────────────────────────────────────────────────────────────────────

def main() -> None:
    parser = argparse.ArgumentParser(
        description="Gradeum advertising agent — generates adaptive email drafts",
    )
    parser.add_argument(
        "-o", "--output-dir",
        type=Path,
        default=DATA_DIR,
        help="Output directory (default: ./data)",
    )
    parser.add_argument(
        "--preview",
        action="store_true",
        help="Preview drafts without writing to disk",
    )
    parser.add_argument(
        "--preview-count",
        type=int,
        default=3,
        help="Number of drafts to preview (default: 3)",
    )
    parser.add_argument(
        "--force-template",
        type=str,
        default=None,
        help="Force a specific template ID for all contacts",
    )
    parser.add_argument(
        "--list-templates",
        action="store_true",
        help="List all available templates and exit",
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

    if args.list_templates:
        print()
        print(f"{'ID':30s} {'Role':12s} {'Tier':10s} {'Tone':15s} {'Product':8s}")
        print("-" * 80)
        for t in TEMPLATES:
            print(f"{t.template_id:30s} {t.contact_role:12s} {t.tier:10s} {t.tone:15s} {t.product_focus:8s}")
        print(f"\n{len(TEMPLATES)} templates available.")
        return

    ctx = load_context()

    if not ctx.contacts:
        print("No contacts in send queue. Run the targeting pipeline first:")
        print("  python run.py <contacts.csv>")
        sys.exit(1)

    drafts = generate_drafts(ctx, force_template=args.force_template)

    if args.preview:
        preview_drafts(drafts, limit=args.preview_count)
    else:
        draft_path = write_drafts(drafts, args.output_dir)
        update_performance_log(drafts, args.output_dir)

        print()
        print("=" * 60)
        print("  Gradeum Advertising Agent — Summary")
        print("=" * 60)
        print(f"  Drafts generated   : {len(drafts)}")
        print(f"  Output             : {draft_path}")
        print()

        # Show template distribution
        usage: dict[str, int] = {}
        for d in drafts:
            usage[d.template_id] = usage.get(d.template_id, 0) + 1
        print("  Template distribution:")
        for tid, count in sorted(usage.items(), key=lambda x: -x[1]):
            print(f"    {tid:30s}  {count} emails")

        # Show adaptation context
        if ctx.recommendations:
            print()
            print("  Report-driven adaptations:")
            for rec in ctx.recommendations[:3]:
                print(f"    - {rec}")
        print()
        print("=" * 60)

    # Preview a couple regardless
    if not args.preview and drafts:
        print("\n  Preview of first 2 drafts:")
        preview_drafts(drafts, limit=2)


if __name__ == "__main__":
    main()
