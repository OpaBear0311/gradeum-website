"""
Email template library for Gradeum outreach.

Templates are segmented by:
  - contact_role: technical / executive
  - tier: 1, 2, 3, Municipal
  - product_focus: heavy, lite, dual
  - tone: pain_point, value_first, social_proof, urgency

Each template has a subject line and body with placeholders:
  {name}          — contact's first name
  {title}         — contact's job title
  {organization}  — org name
  {warm_signal}   — warm signal text (if any)
  {product}       — product name (Gradeum-Heavy / Gradeum-Lite)
"""

from __future__ import annotations

from dataclasses import dataclass, field


@dataclass
class EmailTemplate:
    template_id: str
    name: str
    contact_role: str          # technical / executive / any
    tier: str                  # 1, 2, 3, Municipal, any
    product_focus: str         # heavy, lite, dual
    tone: str                  # pain_point, value_first, social_proof, urgency
    subject: str
    body: str
    tags: list[str] = field(default_factory=list)

    # Performance tracking (updated by advertising agent)
    times_sent: int = 0
    times_responded: int = 0

    @property
    def response_rate(self) -> float:
        return self.times_responded / self.times_sent if self.times_sent > 0 else 0.0


# ── Template Library ─────────────────────────────────────────────────────────

TEMPLATES: list[EmailTemplate] = [

    # ═══════════════════════════════════════════════════════════════════════
    #  EXECUTIVE TEMPLATES
    # ═══════════════════════════════════════════════════════════════════════

    # ── Tier 1 Executive ─────────────────────────────────────────────────
    EmailTemplate(
        template_id="exec_t1_pain",
        name="Tier 1 Executive — Pain Point",
        contact_role="executive",
        tier="1",
        product_focus="dual",
        tone="pain_point",
        subject="The inspection backlog your board doesn't see yet",
        body="""\
{name},

When a port the size of {organization} discovers a structural issue \
during a routine inspection, the question isn't whether you'll fix it — \
it's whether you had documentation proving you were tracking it all along.

Most ports your size manage 10,000+ assets across multiple facilities. \
The ones that get ahead of liability aren't the ones with the biggest \
engineering teams — they're the ones whose inspection data is actually \
connected to their capital planning.

Gradeum does two things:

1. **Gradeum-Heavy** gives your engineering team AI that's governed by PE \
review workflows — every response auditable, every document traceable.

2. **Gradeum-Lite** turns your decades of inspection records into a live \
asset intelligence platform — no more spreadsheets, no more hunting \
through file cabinets.

I'd like to show you what this looks like for a port with your asset base. \
15 minutes — I'll share a demo built on actual infrastructure data.

Worth a look?
""",
        tags=["liability", "compliance", "audit"],
    ),

    EmailTemplate(
        template_id="exec_t1_value",
        name="Tier 1 Executive — Value First",
        contact_role="executive",
        tier="1",
        product_focus="dual",
        tone="value_first",
        subject="{organization} — asset visibility across departments",
        body="""\
{name},

I'm reaching out because we've been building something specifically for \
organizations like {organization} that manage critical infrastructure at scale.

Gradeum is an AI platform purpose-built for infrastructure — two products:

- **Gradeum-Heavy**: AI for professional engineering with PE-governed review \
workflows and complete audit trails. Built for firms where professional \
liability demands data governance.

- **Gradeum-Lite**: Turns inspection records, maintenance histories, and \
condition assessments into actionable intelligence. One dashboard for \
your entire asset portfolio.

The goal is simple: give leadership real-time visibility into asset condition \
without waiting for the next consultant report.

Would 15 minutes be worth it to see how this applies to {organization}?
""",
        tags=["visibility", "efficiency", "scale"],
    ),

    # ── Tier 2 Executive ─────────────────────────────────────────────────
    EmailTemplate(
        template_id="exec_t2_pain",
        name="Tier 2 Executive — Pain Point",
        contact_role="executive",
        tier="2",
        product_focus="lite",
        tone="pain_point",
        subject="What happens when your one inspector retires?",
        body="""\
{name},

Mid-size ports like {organization} have a problem that gets worse every year: \
institutional knowledge walks out the door when key staff leave, and the \
inspection history goes with them.

We built Gradeum-Lite to solve exactly that. It takes your existing inspection \
records — PDFs, spreadsheets, field notes, whatever you've got — and turns \
them into a searchable, queryable asset intelligence platform.

No more digging through file shares. No more "ask Dave, he remembers." \
No more paying a consultant to tell you what your own data already says.

Your team stays in control. The AI just makes the data usable.

Happy to show you a 15-minute demo. When works?
""",
        tags=["knowledge_loss", "efficiency", "consultant_cost"],
    ),

    EmailTemplate(
        template_id="exec_t2_proof",
        name="Tier 2 Executive — Social Proof",
        contact_role="executive",
        tier="2",
        product_focus="dual",
        tone="social_proof",
        subject="How ports like {organization} are planning capital differently",
        body="""\
{name},

Ports similar in size to {organization} are starting to use AI not to \
replace their engineering teams — but to make the data those teams \
already collect actually work for capital planning.

The pattern we're seeing:
- Inspection data sits in disconnected systems
- Capital plans get built on incomplete condition data
- Board decisions rely on stale consultant reports

Gradeum changes that by connecting your inspection records directly to \
asset condition scoring — so your CIP reflects reality, not last year's \
assumptions.

I'd love to show you what this looks like. 15 minutes — no pitch deck, \
just a live walkthrough on real infrastructure data.

Interested?
""",
        tags=["capital_planning", "peer_comparison", "CIP"],
    ),

    # ── Tier 3 Executive ─────────────────────────────────────────────────
    EmailTemplate(
        template_id="exec_t3_pain",
        name="Tier 3 Executive — Pain Point",
        contact_role="executive",
        tier="3",
        product_focus="lite",
        tone="pain_point",
        subject="One platform for the one person doing everything",
        body="""\
{name},

I know at a port like {organization}, you're probably the person \
handling engineering, operations, compliance, and capital planning — \
sometimes all before lunch.

We built Gradeum-Lite for exactly that situation. It's one platform \
that takes all your inspection records, maintenance logs, and asset \
data and makes it searchable and actionable — without needing an IT \
department or a six-figure consultant.

Think of it as the institutional memory you wish you had, available \
24/7, and it doesn't retire.

Worth 15 minutes to see if it fits?
""",
        tags=["small_team", "efficiency", "all_in_one"],
    ),

    # ── Municipal Executive ──────────────────────────────────────────────
    EmailTemplate(
        template_id="exec_muni_pain",
        name="Municipal Executive — FEMA/Grant Compliance",
        contact_role="executive",
        tier="Municipal",
        product_focus="lite",
        tone="pain_point",
        subject="{organization} — grant-ready documentation before the next storm",
        body="""\
{name},

After a storm or disaster event, FEMA reimbursement hinges on one thing: \
documentation. Specifically, proof that you knew what you had, what \
condition it was in, and what you'd been doing to maintain it.

Most municipalities have that information scattered across departments, \
spreadsheets, and filing cabinets. When FEMA asks, the scramble begins.

Gradeum-Lite gives your city a single platform for asset inventory, \
condition assessment, and maintenance history — all searchable, all \
exportable, all audit-ready.

It's the difference between "we think we have those records somewhere" \
and having a documented asset management program that survives scrutiny.

Would 15 minutes be worth it to see how this works for waterfront assets?
""",
        tags=["FEMA", "grants", "compliance", "disaster"],
    ),

    # ── Warm Signal Executive ────────────────────────────────────────────
    EmailTemplate(
        template_id="exec_warm_rfp",
        name="Executive — Active RFP Warm Signal",
        contact_role="executive",
        tier="any",
        product_focus="dual",
        tone="urgency",
        subject="Re: {organization} asset management procurement",
        body="""\
{name},

I noticed {organization} recently posted activity around {warm_signal}.

We've been building Gradeum specifically for this — AI-powered asset \
management for infrastructure organizations. Two products:

- **Gradeum-Heavy**: PE-governed AI for engineering teams (audit trails, \
document traceability, professional liability coverage)
- **Gradeum-Lite**: Asset intelligence platform that turns your inspection \
records into actionable data

If you're evaluating solutions in this space, I'd love to get Gradeum \
in front of your team. We can do a focused 20-minute demo tailored to \
your asset base.

What does your timeline look like?
""",
        tags=["RFP", "procurement", "warm_signal", "urgency"],
    ),

    EmailTemplate(
        template_id="exec_warm_fema",
        name="Executive — FEMA/Storm Warm Signal",
        contact_role="executive",
        tier="any",
        product_focus="lite",
        tone="urgency",
        subject="{organization} — asset documentation for recovery funding",
        body="""\
{name},

Given the recent {warm_signal} at {organization}, I wanted to reach out \
about something that may be relevant to your recovery and documentation \
needs.

Gradeum-Lite is an AI-powered asset management platform built for \
infrastructure organizations. It turns inspection records, condition \
assessments, and maintenance histories into a searchable, audit-ready \
system — which is exactly what FEMA and state agencies ask for when \
processing reimbursement claims.

Organizations that have documented asset management programs \
consistently recover more funding, faster.

Would it be helpful to see a quick demo of how this works?
""",
        tags=["FEMA", "disaster", "recovery", "warm_signal"],
    ),

    # ═══════════════════════════════════════════════════════════════════════
    #  TECHNICAL TEMPLATES
    # ═══════════════════════════════════════════════════════════════════════

    # ── Tier 1 Technical ─────────────────────────────────────────────────
    EmailTemplate(
        template_id="tech_t1_pain",
        name="Tier 1 Technical — Pain Point",
        contact_role="technical",
        tier="1",
        product_focus="heavy",
        tone="pain_point",
        subject="AI that your PE team will actually trust",
        body="""\
{name},

Most AI tools are a non-starter for professional engineering — no audit \
trail, no PE review workflow, no way to trace how a recommendation was \
generated. Your team can't sign off on something they can't verify.

We built Gradeum-Heavy specifically for this problem:

- Every AI response is governed by PE review workflows
- Every document is traceable to its source
- Every decision is logged with full provenance
- Built for organizations where professional liability is non-negotiable

This isn't a chatbot someone stuck an engineering label on. It's \
auditable AI built from the ground up for firms like {organization}.

I'd love to walk your team through a technical demo. 20 minutes — \
we'll show you the review workflow, the audit trail, and how it \
handles real structural data.

When works for you?
""",
        tags=["PE_workflow", "audit", "liability", "engineering"],
    ),

    EmailTemplate(
        template_id="tech_t1_value",
        name="Tier 1 Technical — Value First",
        contact_role="technical",
        tier="1",
        product_focus="dual",
        tone="value_first",
        subject="Connecting {organization}'s inspection data to capital planning",
        body="""\
{name},

Quick question: how much time does your team spend pulling together \
condition data for capital planning or board reports?

We've been building Gradeum to close that gap:

- **Gradeum-Heavy** handles the engineering AI side — PE-governed, \
fully auditable, document-traceable.
- **Gradeum-Lite** turns your existing inspection records and \
maintenance histories into a live asset intelligence dashboard.

The result: your condition data feeds directly into capital planning \
without the manual aggregation step. Your team spends time on \
engineering, not spreadsheets.

Worth a 20-minute technical walkthrough?
""",
        tags=["efficiency", "capital_planning", "data_integration"],
    ),

    # ── Tier 2 Technical ─────────────────────────────────────────────────
    EmailTemplate(
        template_id="tech_t2_pain",
        name="Tier 2 Technical — Pain Point",
        contact_role="technical",
        tier="2",
        product_focus="lite",
        tone="pain_point",
        subject="Your inspection data is more valuable than you think",
        body="""\
{name},

Here's a pattern we see at ports like {organization}: years of inspection \
data — PDFs, field notes, spreadsheets, photos — sitting in disconnected \
systems. Your team collected it. But nobody can easily query it, trend it, \
or use it for capital planning.

Gradeum-Lite changes that. It ingests your existing records and turns \
them into a searchable asset intelligence platform. Ask it a question \
about any asset's history and get an answer with source documents — \
not a guess.

No new hardware. No six-month implementation. Just your data, \
finally made useful.

Want to see a 15-minute demo on real infrastructure data?
""",
        tags=["data_value", "search", "existing_records"],
    ),

    # ── Tier 3 Technical ─────────────────────────────────────────────────
    EmailTemplate(
        template_id="tech_t3_pain",
        name="Tier 3 Technical — Pain Point",
        contact_role="technical",
        tier="3",
        product_focus="lite",
        tone="pain_point",
        subject="Stop re-inspecting what you already documented",
        body="""\
{name},

When your port has a lean team, the last thing you need is to spend \
time re-doing work because someone can't find last year's inspection \
report.

Gradeum-Lite puts all your asset data — inspections, maintenance \
records, condition notes — into one searchable platform. Find anything \
in seconds. See condition trends over time. Generate reports for your \
board without the manual lift.

It's built for teams your size. No IT department required.

Worth 15 minutes to see if it fits?
""",
        tags=["small_team", "efficiency", "search"],
    ),

    # ── Municipal Technical ──────────────────────────────────────────────
    EmailTemplate(
        template_id="tech_muni_pain",
        name="Municipal Technical — Asset Inventory",
        contact_role="technical",
        tier="Municipal",
        product_focus="lite",
        tone="pain_point",
        subject="Does {organization} know what condition its waterfront assets are in?",
        body="""\
{name},

Cities that manage waterfront infrastructure face a common challenge: \
the assets are aging, the inspection records are scattered, and there's \
no single view of what needs attention.

Gradeum-Lite was built for exactly this. It takes your existing records — \
inspection reports, maintenance logs, condition assessments — and turns \
them into a unified asset intelligence platform.

For your engineering department, that means:
- Searchable history for every asset
- Condition trending over time
- Export-ready documentation for grants and FEMA
- No more digging through file shares

15-minute demo — I'll show you how it works on real municipal infrastructure data.

Interested?
""",
        tags=["asset_inventory", "FEMA", "waterfront", "municipal"],
    ),

    # ── Warm Signal Technical ────────────────────────────────────────────
    EmailTemplate(
        template_id="tech_warm_cip",
        name="Technical — Capital Improvement Warm Signal",
        contact_role="technical",
        tier="any",
        product_focus="lite",
        tone="value_first",
        subject="Asset condition data for {organization}'s capital plan",
        body="""\
{name},

I saw that {organization} has {warm_signal} — and I wanted to flag \
something that might be relevant to your engineering team.

Gradeum-Lite connects your inspection and condition data directly to \
asset scoring, which means your CIP is built on current, traceable \
data rather than estimates or outdated consultant reports.

If your team is pulling together condition assessments for capital \
planning, this could save significant time.

Worth a quick technical walkthrough?
""",
        tags=["CIP", "condition_data", "warm_signal"],
    ),
]


# ── Template lookup helpers ──────────────────────────────────────────────────

def get_templates_for_contact(
    contact_role: str,
    tier: str,
    has_warm_signal: bool = False,
) -> list[EmailTemplate]:
    """Return matching templates for a contact, best-fit first."""
    matches: list[tuple[int, EmailTemplate]] = []

    for t in TEMPLATES:
        score = 0

        # Role match
        if t.contact_role == contact_role:
            score += 10
        elif t.contact_role == "any":
            score += 5
        else:
            continue  # wrong role, skip

        # Tier match
        if t.tier == tier:
            score += 10
        elif t.tier == "any":
            score += 5
        else:
            score += 1  # weak match, still usable

        # Warm signal
        if has_warm_signal and "warm_signal" in t.tags:
            score += 15  # strong boost for warm signal templates
        elif not has_warm_signal and "warm_signal" in t.tags:
            score -= 5  # penalize warm templates when no signal

        matches.append((score, t))

    matches.sort(key=lambda x: x[0], reverse=True)
    return [t for _, t in matches]


def render_template(
    template: EmailTemplate,
    name: str,
    title: str,
    organization: str,
    warm_signal: str = "",
    product: str = "Gradeum",
) -> tuple[str, str]:
    """Render a template with contact details. Returns (subject, body)."""
    # Use first name only
    first_name = name.split()[0] if name else "there"

    replacements = {
        "{name}": first_name,
        "{title}": title,
        "{organization}": organization,
        "{warm_signal}": warm_signal or "recent infrastructure activity",
        "{product}": product,
    }

    subject = template.subject
    body = template.body

    for placeholder, value in replacements.items():
        subject = subject.replace(placeholder, value)
        body = body.replace(placeholder, value)

    return subject, body
