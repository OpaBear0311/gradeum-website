"use client";

import { useState, useEffect, useCallback, useRef } from "react";

/* ═══════════════════════════════════════════════════════════════
   GRADEUM — PLATFORM SIMULATION (Principal-Facing)
   Palette: Navy / Warm White / Slate / Amber
   Audience: Firm principals evaluating the platform
   ═══════════════════════════════════════════════════════════════ */

const COLORS = {
  navy: "#1B2A4A",
  navyDeep: "#0F1D36",
  navyLight: "#2A3F66",
  white: "#FFFFFF",
  cream: "#F8F6F1",
  warmGray: "#E8E4DD",
  slate: "#64748B",
  slateDark: "#475569",
  amber: "#D97706",
  amberLight: "#F59E0B",
  amberWarm: "#B45309",
  green: "#16A34A",
  greenLight: "#22C55E",
  red: "#DC2626",
  cyan: "#0891B2",
  border: "#D6D0C4",
  cardBg: "#FFFFFF",
  textPrimary: "#1E293B",
  textSecondary: "#64748B",
  textMuted: "#94A3B8",
};

const SCENES = [
  {
    id: "intro",
    type: "cinematic",
  },
  {
    id: "command-center",
    title: "Firm-Wide Visibility",
    subtitle: "Your entire operation — projects, staff, deadlines — in one view.",
    type: "dashboard",
    caption: {
      how: "When you open Gradeum, you see everything: which projects are active, who's working on what, what's due this week, and what's stuck in review. No more chasing status updates through email threads or waiting for Monday morning meetings to learn what happened last week.",
      why: "Principals typically spend 3–5 hours a week assembling project status from emails, hallway conversations, and spreadsheets. Gradeum gives you a live operational picture — updated as your team works — so you can make staffing and pursuit decisions with current information, not last week's.",
      security: "Every user logs in with multi-factor authentication. Principals see firm-wide data. Project Engineers see only their assigned projects. Staff engineers see only their tasks. No one can see across permission boundaries they haven't been granted.",
    },
  },
  {
    id: "forecasting",
    title: "Resource Forecasting",
    subtitle: "See your team's capacity — and run what-if scenarios before committing.",
    type: "forecasting",
    caption: {
      how: "Ask a plain-English question: 'What if we win the port contract and the marina slips two weeks?' Gradeum models your team's availability across a rolling six-week window, weighted by each person's billing rate. You see exactly where you're overcommitted, where you have capacity, and what the revenue impact looks like — before you make the call.",
      why: "Most firms plan resources in a weekly PM meeting with a whiteboard or a spreadsheet that's already stale. Gradeum gives you a live, scenario-driven view tied to actual project data — so you pursue the right work, staff it correctly, and avoid the expensive surprise of discovering you're overcommitted after you've already signed the contract.",
      security: "Resource forecasting — billing rates, utilization, pipeline projections — is restricted to principals only. No project engineer or staff member can access this view. Rate data is encrypted and never shared with the AI engine.",
    },
  },
  {
    id: "document-production",
    title: "Document Production",
    subtitle: "Your engineers draft reports in hours, not days.",
    type: "document",
    caption: {
      how: "When an engineer starts a new deliverable — a condition assessment, basis of design, permit matrix, or specification — the AI guides them through a structured conversation. It asks the right questions, pulls relevant information from your firm's past projects, cites the applicable codes and standards, and produces a formatted first draft ready for the engineer's professional review.",
      why: "A condition assessment report takes a PE 8–16 hours to write from scratch. Most of that time is spent on lookup, formatting, and assembling standard language — not on engineering judgment. Gradeum handles the mechanical work so your engineers focus on what only a licensed professional can do. Typical draft time drops to 2–4 hours.",
      security: "When the AI assists with drafting, it never sees your firm's raw files. It works only with relevant excerpts retrieved from your local server, assembled into a controlled prompt with professional guardrails. Your complete documents never leave your building.",
    },
  },
  {
    id: "drawing-qa",
    title: "Drawing Q&A",
    subtitle: "Ask a question about any drawing. Get the answer in seconds — with the source.",
    type: "drawing",
    caption: {
      how: "Your engineer asks: 'What's the pile spacing at Bent 14?' Gradeum searches the indexed drawing set on your local server, finds the answer, and returns it with full attribution — sheet number, drawing number, zone location, who sealed the drawing, and when. The answer comes back in seconds, not the 15–30 minutes it takes to flip through a set manually.",
      why: "Engineers spend a significant portion of their day searching through drawing sets — flipping through sheets, cross-referencing details, checking addenda. Over the life of a project, that's dozens of hours of billable time spent on lookup instead of engineering. Gradeum makes your entire drawing library instantly searchable by meaning, not just filename.",
      security: "Drawing files are processed and indexed entirely on your local server. The original files never leave your network. When an engineer asks a question, only the relevant text excerpt is retrieved — with a full audit trail of who asked, when, and what was returned.",
    },
  },
  {
    id: "pe-review",
    title: "Quality Control & PE Approval",
    subtitle: "Every document passes through AI-powered QC and licensed PE review before it leaves your firm.",
    type: "review",
    caption: {
      how: "Before any deliverable reaches a client, it passes through two gates. First, the AI scans for mechanical issues — missing sections, inconsistent code references, formatting deviations, data gaps — and flags each one with a severity level and recommended fix. Second, a licensed PE reviews the document and formally accepts responsible charge. Every AI-generated draft carries an 'UNOFFICIAL' watermark until a PE approves it.",
      why: "QC review is the biggest bottleneck in document production. A senior PE spending three hours checking a 40-page report for formatting and citation issues isn't the best use of their time. The AI catches mechanical problems instantly, so the PE can focus review time on technical accuracy and professional judgment — the work that actually requires a license.",
      security: "Every PE approval creates a permanent, tamper-proof record — timestamped, with the engineer's identity and license number. This approval log cannot be altered or deleted by anyone, including system administrators. It provides a complete chain of custody for every document your firm produces, retained for seven years minimum and exportable on demand.",
    },
  },
  {
    id: "security",
    title: "Your Data Stays on Your Hardware",
    subtitle: "The only AI platform architecturally designed for engineering confidentiality.",
    type: "security",
    caption: {
      how: "Gradeum runs a local service on your firm's own server that indexes your documents — project files, reports, drawings, correspondence. When an engineer asks a question, only the relevant paragraphs are sent to the AI — never entire files, never bulk transfers. Your complete documents never touch a third-party server. The AI works with excerpts, returns an answer, and the excerpts are discarded.",
      why: "Engineering firms handle confidential client data, proprietary designs, and information that may be subject to security clearances or export controls. No responsible firm principal will upload their document library to a third-party cloud. We built Gradeum for firms that take confidentiality seriously — because we're engineers, and we'd never accept that risk either.",
      security: "Multi-factor authentication for every user. Encrypted data at rest and in transit. Complete tenant isolation between firms at the database level. Append-only audit logs retained seven years minimum. All data processing on U.S. soil. Every query logged with full attribution. Zero raw file transfer across your network boundary.",
    },
  },
  {
    id: "closing",
    type: "cinematic",
  },
];

/* ─── Utility: Animated Number ──────────────────────────────────── */
function AnimNum({ target, duration = 1200, suffix = "", prefix = "" }: { target: number; duration?: number; suffix?: string; prefix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<number | null>(null);
  useEffect(() => {
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(target * ease));
      if (p < 1) ref.current = requestAnimationFrame(step);
    };
    ref.current = requestAnimationFrame(step);
    return () => { if (ref.current != null) cancelAnimationFrame(ref.current); };
  }, [target, duration]);
  return <>{prefix}{val.toLocaleString()}{suffix}</>;
}

/* ─── Dashboard Snapshot ─────────────────────────────────────────── */
function DashboardSnapshot() {
  const projects = [
    { name: "Pier 7 Rehabilitation", status: "Active", progress: 72, pe: "J. Martinez, PE", due: "Apr 18" },
    { name: "Marina Breakwater Assessment", status: "QC Review", progress: 91, pe: "R. Chen, PE", due: "Apr 4" },
    { name: "Port Terminal Expansion", status: "PE Approval", progress: 85, pe: "K. Williams, PE", due: "Apr 22" },
    { name: "Seawall Condition Survey", status: "Field Work", progress: 34, pe: "J. Martinez, PE", due: "May 10" },
  ];
  const statusColor = (s: string) => s === "Active" ? COLORS.cyan : s === "QC Review" ? COLORS.amber : s === "PE Approval" ? COLORS.navyLight : COLORS.slate;
  const metrics = [
    { label: "Active Projects", value: 12, icon: "📋" },
    { label: "Documents in QC", value: 4, icon: "🔍" },
    { label: "PE Approvals Pending", value: 3, icon: "✍️" },
    { label: "Due This Week", value: 6, icon: "📅" },
  ];
  return (
    <ScreenFrame title="Command Center" role="PRINCIPAL VIEW">
      <div style={{ padding: 20 }}>
        {/* Metric cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
          {metrics.map((m, i) => (
            <div key={i} style={{ background: COLORS.cream, borderRadius: 8, padding: "14px 16px", border: `1px solid ${COLORS.border}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ fontSize: 24, fontWeight: 700, color: COLORS.navy }}><AnimNum target={m.value} duration={800 + i * 200} /></div>
                  <div style={{ fontSize: 11, color: COLORS.slate, marginTop: 2, fontWeight: 500 }}>{m.label}</div>
                </div>
                <span style={{ fontSize: 20 }}>{m.icon}</span>
              </div>
            </div>
          ))}
        </div>
        {/* Project table */}
        <div style={{ background: COLORS.white, borderRadius: 8, border: `1px solid ${COLORS.border}`, overflow: "hidden" }}>
          <div style={{ padding: "10px 16px", borderBottom: `1px solid ${COLORS.border}`, background: COLORS.cream }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: COLORS.navy, letterSpacing: 0.5, textTransform: "uppercase" }}>Active Projects</span>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${COLORS.border}` }}>
                {["Project", "Lead Engineer", "Status", "Progress", "Due"].map((h) => (
                  <th key={h} style={{ padding: "8px 14px", textAlign: "left", color: COLORS.slate, fontWeight: 600, fontSize: 10, textTransform: "uppercase", letterSpacing: 0.5 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {projects.map((p, i) => (
                <tr key={i} style={{ borderBottom: i < projects.length - 1 ? `1px solid ${COLORS.warmGray}` : "none" }}>
                  <td style={{ padding: "10px 14px", fontWeight: 600, color: COLORS.textPrimary }}>{p.name}</td>
                  <td style={{ padding: "10px 14px", color: COLORS.slateDark }}>{p.pe}</td>
                  <td style={{ padding: "10px 14px" }}>
                    <span style={{ padding: "3px 10px", borderRadius: 12, fontSize: 10, fontWeight: 600, color: COLORS.white, background: statusColor(p.status) }}>{p.status}</span>
                  </td>
                  <td style={{ padding: "10px 14px", width: 140 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ flex: 1, height: 6, borderRadius: 3, background: COLORS.warmGray }}>
                        <div style={{ width: `${p.progress}%`, height: "100%", borderRadius: 3, background: p.progress > 80 ? COLORS.green : COLORS.cyan, transition: "width 1s ease" }} />
                      </div>
                      <span style={{ fontSize: 11, fontWeight: 600, color: COLORS.slateDark, minWidth: 30 }}>{p.progress}%</span>
                    </div>
                  </td>
                  <td style={{ padding: "10px 14px", color: COLORS.slateDark }}>{p.due}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </ScreenFrame>
  );
}

/* ─── Forecasting Snapshot ───────────────────────────────────────── */
function ForecastingSnapshot() {
  const staff = [
    { name: "J. Martinez, PE", rate: "$185/hr", weeks: [90, 85, 95, 70, 60, 55], pipeline: [0, 0, 0, 20, 30, 35] },
    { name: "R. Chen, PE", rate: "$175/hr", weeks: [75, 80, 118, 115, 85, 70], pipeline: [0, 0, 0, 0, 10, 15] },
    { name: "A. Patel, EIT", rate: "$95/hr", weeks: [60, 65, 70, 80, 85, 90], pipeline: [0, 0, 0, 0, 0, 5] },
    { name: "K. Williams, PE", rate: "$190/hr", weeks: [40, 45, 50, 55, 60, 65], pipeline: [0, 0, 0, 0, 10, 20] },
  ];
  const weekLabels = ["Wk 1", "Wk 2", "Wk 3", "Wk 4", "Wk 5", "Wk 6"];
  const barH = 18;
  return (
    <ScreenFrame title="Resource Forecasting" role="PRINCIPAL ONLY">
      <div style={{ padding: 20 }}>
        {/* Scenario bar */}
        <div style={{ background: COLORS.cream, borderRadius: 8, padding: "12px 16px", border: `1px solid ${COLORS.border}`, marginBottom: 16, display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: COLORS.amber, textTransform: "uppercase", letterSpacing: 1, whiteSpace: "nowrap" }}>Scenario</span>
          <div style={{ flex: 1, background: COLORS.white, borderRadius: 6, padding: "8px 12px", border: `1px solid ${COLORS.border}`, color: COLORS.textPrimary, fontSize: 13, fontStyle: "italic" }}>
            {"\u201CWhat if we win the Port Authority contract and the marina project slips 2 weeks?\u201D"}
          </div>
        </div>
        {/* Week headers */}
        <div style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: 0, marginBottom: 6 }}>
          <div />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 4 }}>
            {weekLabels.map((w) => (
              <div key={w} style={{ textAlign: "center", fontSize: 9, fontWeight: 600, color: COLORS.slate, textTransform: "uppercase", letterSpacing: 0.5 }}>{w}</div>
            ))}
          </div>
        </div>
        {/* Staff rows */}
        {staff.map((s, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: 0, marginBottom: 8, alignItems: "center" }}>
            <div style={{ paddingRight: 12 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.textPrimary }}>{s.name}</div>
              <div style={{ fontSize: 10, color: COLORS.slate }}>{s.rate}</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 4 }}>
              {s.weeks.map((w, j) => {
                const over = w > 100;
                const pipe = s.pipeline[j];
                return (
                  <div key={j} style={{ position: "relative", height: barH + 8 }}>
                    {/* Committed bar */}
                    <div style={{
                      position: "absolute", bottom: 4, left: 0, right: 0,
                      height: barH,
                      borderRadius: 3,
                      background: COLORS.warmGray,
                      overflow: "hidden",
                    }}>
                      <div style={{
                        width: `${Math.min(w, 100)}%`,
                        height: "100%",
                        borderRadius: 3,
                        background: over ? COLORS.red : w > 85 ? COLORS.amber : COLORS.cyan,
                        transition: "width 0.8s ease",
                      }} />
                    </div>
                    {/* Pipeline overlay (dashed) */}
                    {pipe > 0 && (
                      <div style={{
                        position: "absolute", bottom: 4, left: `${Math.min(w, 100)}%`, right: 0,
                        height: barH,
                        borderRadius: "0 3px 3px 0",
                        background: `repeating-linear-gradient(90deg, rgba(217,119,6,0.25) 0px, rgba(217,119,6,0.25) 4px, transparent 4px, transparent 8px)`,
                        width: `${Math.min(pipe, 100 - Math.min(w, 100))}%`,
                      }} />
                    )}
                    {/* Percentage label */}
                    <div style={{
                      position: "absolute", bottom: 7, left: 0, right: 0,
                      textAlign: "center", fontSize: 9, fontWeight: 700,
                      color: over ? COLORS.white : w > 60 ? COLORS.white : COLORS.slateDark,
                      zIndex: 1,
                    }}>{w + pipe}%</div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        {/* Legend & impact */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12, paddingTop: 12, borderTop: `1px solid ${COLORS.border}` }}>
          <div style={{ display: "flex", gap: 16, fontSize: 10, color: COLORS.slate }}>
            <span><span style={{ display: "inline-block", width: 12, height: 8, borderRadius: 2, background: COLORS.cyan, marginRight: 4, verticalAlign: "middle" }} /> Committed</span>
            <span><span style={{ display: "inline-block", width: 12, height: 8, borderRadius: 2, background: `repeating-linear-gradient(90deg, rgba(217,119,6,0.4) 0px, rgba(217,119,6,0.4) 3px, transparent 3px, transparent 6px)`, marginRight: 4, verticalAlign: "middle" }} /> Pipeline</span>
            <span><span style={{ display: "inline-block", width: 12, height: 8, borderRadius: 2, background: COLORS.red, marginRight: 4, verticalAlign: "middle" }} /> Over 100%</span>
          </div>
          <div style={{ background: "#FEF3C7", border: "1px solid #F59E0B", borderRadius: 6, padding: "6px 12px", fontSize: 11, color: COLORS.amberWarm, fontWeight: 600 }}>
            ⚠ R. Chen overcommitted Weeks 3–4 if Port Authority wins
          </div>
        </div>
      </div>
    </ScreenFrame>
  );
}

/* ─── Document Production Snapshot ───────────────────────────────── */
function DocumentSnapshot() {
  return (
    <ScreenFrame title="Document Command Center" role="PROJECT ENGINEER">
      <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", height: 380 }}>
        {/* Left: AI Conversation */}
        <div style={{ borderRight: `1px solid ${COLORS.border}`, display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "10px 14px", borderBottom: `1px solid ${COLORS.border}`, background: COLORS.cream }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: COLORS.navy, letterSpacing: 0.5 }}>AI ASSISTANT</span>
          </div>
          <div style={{ flex: 1, padding: 12, overflowY: "auto", display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { from: "ai", text: "What type of deliverable are you creating?" },
              { from: "user", text: "Condition assessment for a steel pile-supported wharf." },
              { from: "ai", text: "Which rating system should I use? I found your firm has used both USACE and SNAME on past projects." },
              { from: "user", text: "USACE EM 1110-2-6058 for this one." },
              { from: "ai", text: "Got it. I've pulled your firm's last three wharf assessments for reference. I'll draft element-by-element ratings based on your field observations. What elements were inspected?" },
              { from: "user", text: "Steel H-piles, concrete deck, fender system, and mooring hardware." },
              { from: "ai", text: "Drafting your assessment now — pulling applicable code sections and formatting to your firm's template..." },
            ].map((msg, i) => (
              <div key={i} style={{
                alignSelf: msg.from === "user" ? "flex-end" : "flex-start",
                maxWidth: "90%",
                padding: "8px 11px",
                borderRadius: msg.from === "user" ? "10px 10px 2px 10px" : "10px 10px 10px 2px",
                background: msg.from === "user" ? COLORS.navy : COLORS.cream,
                color: msg.from === "user" ? COLORS.white : COLORS.textPrimary,
                fontSize: 11,
                lineHeight: "16px",
                border: msg.from === "ai" ? `1px solid ${COLORS.border}` : "none",
              }}>{msg.text}</div>
            ))}
          </div>
        </div>
        {/* Right: Document Preview */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "10px 14px", borderBottom: `1px solid ${COLORS.border}`, background: COLORS.cream, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: COLORS.navy, letterSpacing: 0.5 }}>LIVE DOCUMENT PREVIEW</span>
            <span style={{ fontSize: 9, fontWeight: 600, color: COLORS.amber, background: "#FEF3C7", padding: "2px 8px", borderRadius: 4, border: "1px solid #F59E0B" }}>UNOFFICIAL — DRAFT</span>
          </div>
          <div style={{ flex: 1, padding: "16px 20px", background: COLORS.white, fontFamily: "'Georgia', 'Times New Roman', serif", overflowY: "auto" }}>
            <div style={{ textAlign: "center", marginBottom: 16, paddingBottom: 12, borderBottom: `2px solid ${COLORS.navy}` }}>
              <div style={{ fontSize: 9, color: COLORS.slate, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>Your Firm Name · Project No. 2026-047</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.navy }}>Condition Assessment Report</div>
              <div style={{ fontSize: 11, color: COLORS.slateDark, marginTop: 2 }}>Berth 4 — Steel Pile-Supported Wharf</div>
            </div>
            <div style={{ fontSize: 10, color: COLORS.textSecondary, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>3.1 Steel H-Piles (HP 14×73)</div>
            <div style={{ fontSize: 11, color: COLORS.textPrimary, lineHeight: "18px", marginBottom: 10 }}>
              Visual inspection revealed section loss of approximately 10–15% at the mean high water line, consistent with atmospheric corrosion in a marine splash zone environment. Measured remaining flange thickness averaged 0.52 inches against an original thickness of 0.61 inches.
            </div>
            <table style={{ width: "100%", fontSize: 10, borderCollapse: "collapse", marginBottom: 12 }}>
              <thead>
                <tr style={{ background: COLORS.cream }}>
                  {["Element", "Rating", "Standard", "Condition"].map((h) => (
                    <th key={h} style={{ padding: "6px 8px", textAlign: "left", borderBottom: `1px solid ${COLORS.border}`, color: COLORS.navy, fontWeight: 700 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["Steel H-Piles", "5 — Fair", "EM 1110-2-6058 §4.3", "10–15% section loss at MHW"],
                  ["Concrete Deck", "6 — Satisfactory", "EM 1110-2-6058 §4.3", "Minor spalling, no rebar exposure"],
                  ["Fender System", "4 — Poor", "EM 1110-2-6058 §4.3", "2 of 8 fenders damaged"],
                  ["Mooring Hardware", "7 — Good", "EM 1110-2-6058 §4.3", "All bollards functional"],
                ].map((r, i) => (
                  <tr key={i} style={{ borderBottom: `1px solid ${COLORS.warmGray}` }}>
                    {r.map((c, j) => (
                      <td key={j} style={{ padding: "5px 8px", color: j === 1 && r[1].startsWith("4") ? COLORS.amber : COLORS.textPrimary }}>{c}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ fontSize: 10, color: COLORS.slate, fontStyle: "italic" }}>
              Remaining service life estimate: 12–18 years (see Section 4 for methodology per EM 1110-2-6058 §5.2)
            </div>
          </div>
          {/* Time savings bar */}
          <div style={{ padding: "8px 14px", borderTop: `1px solid ${COLORS.border}`, background: COLORS.cream, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", gap: 16, fontSize: 10 }}>
              <span style={{ color: COLORS.slate }}>Traditional: <strong style={{ color: COLORS.red }}>12–16 hrs</strong></span>
              <span style={{ color: COLORS.slate }}>With Gradeum: <strong style={{ color: COLORS.green }}>2–4 hrs</strong></span>
            </div>
            <span style={{ fontSize: 10, fontWeight: 700, color: COLORS.green }}>▼ 70–80% faster</span>
          </div>
        </div>
      </div>
    </ScreenFrame>
  );
}

/* ─── Drawing Q&A Snapshot ───────────────────────────────────────── */
function DrawingSnapshot() {
  return (
    <ScreenFrame title="Drawing Q&A" role="PROJECT ENGINEER">
      <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 16 }}>
        {/* Question */}
        <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: COLORS.navy, color: COLORS.white, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, flexShrink: 0 }}>RC</div>
          <div style={{ background: COLORS.navy, color: COLORS.white, padding: "10px 14px", borderRadius: "2px 12px 12px 12px", fontSize: 13, lineHeight: "20px" }}>
            What is the pile spacing at Bent 14?
          </div>
        </div>
        {/* Answer */}
        <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: COLORS.amber, color: COLORS.white, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800, flexShrink: 0, letterSpacing: -0.5 }}>G</div>
          <div style={{ flex: 1 }}>
            <div style={{ background: COLORS.cream, border: `1px solid ${COLORS.border}`, padding: "14px 16px", borderRadius: "2px 12px 12px 12px", fontSize: 13, lineHeight: "20px", color: COLORS.textPrimary }}>
              <strong>Pile spacing at Bent 14 is 8&apos;-0&quot; on center.</strong>
              <div style={{ marginTop: 10, fontSize: 12, color: COLORS.slateDark, lineHeight: "20px" }}>
                This is shown on the structural pile plan. The spacing is consistent across Bents 12–16. Note that Addendum 3 modified Bents 1–10 but does not affect Bent 14.
              </div>
            </div>
            {/* Source card */}
            <div style={{ marginTop: 10, background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "12px 16px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <div style={{ fontSize: 10, color: COLORS.slate }}>
                <div style={{ fontWeight: 700, color: COLORS.navy, marginBottom: 6, fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5 }}>Source Attribution</div>
                <div style={{ marginBottom: 3 }}><strong>Sheet:</strong> S-4 (Structural Pile Plan)</div>
                <div style={{ marginBottom: 3 }}><strong>Drawing:</strong> C-2018-047, Rev 2</div>
                <div style={{ marginBottom: 3 }}><strong>Zone:</strong> B3 (Bent 12–16 Detail)</div>
              </div>
              <div style={{ fontSize: 10, color: COLORS.slate }}>
                <div style={{ fontWeight: 700, color: COLORS.navy, marginBottom: 6, fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5 }}>Provenance</div>
                <div style={{ marginBottom: 3 }}><strong>Sealed by:</strong> R. Martinez, PE</div>
                <div style={{ marginBottom: 3 }}><strong>Date:</strong> September 14, 2018</div>
                <div style={{ marginBottom: 3 }}><strong>Response time:</strong> <span style={{ color: COLORS.green, fontWeight: 700 }}>1.8 seconds</span></div>
              </div>
            </div>
            <div style={{ marginTop: 8, fontSize: 10, color: COLORS.slate, fontStyle: "italic" }}>
              Compared to manual lookup: typically 15–30 minutes of flipping through the drawing set.
            </div>
          </div>
        </div>
      </div>
    </ScreenFrame>
  );
}

/* ─── QC & PE Review Snapshot ────────────────────────────────────── */
function ReviewSnapshot() {
  return (
    <ScreenFrame title="QC Review & PE Approval" role="PROJECT ENGINEER → PE REVIEWER">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", height: 360 }}>
        {/* Left: QC Flags */}
        <div style={{ borderRight: `1px solid ${COLORS.border}`, display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "10px 14px", borderBottom: `1px solid ${COLORS.border}`, background: COLORS.cream }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: COLORS.navy, letterSpacing: 0.5 }}>AI-GENERATED QC FLAGS</span>
            <span style={{ float: "right", fontSize: 10, color: COLORS.slate }}>Scan time: 4.2 sec</span>
          </div>
          <div style={{ flex: 1, padding: 12, display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { severity: "critical", icon: "●", title: "Code Version Mismatch", desc: "Section 3.2 references ASCE 7-16 but project scope specifies ASCE 7-22.", action: "✓ Fixed — updated to ASCE 7-22", resolved: true },
              { severity: "warning", icon: "●", title: "Missing Units", desc: "Table 4, Column 3 is missing unit labels. Recommend adding 'kips' per firm template.", action: "✓ Fixed — units added", resolved: true },
              { severity: "info", icon: "●", title: "Caption Length", desc: "Figure 7 caption exceeds the firm's 2-line limit.", action: "✕ Rejected — caption is acceptable as written", resolved: true, rejected: true },
            ].map((flag, i) => (
              <div key={i} style={{
                border: `1px solid ${flag.severity === "critical" ? "#FCA5A5" : flag.severity === "warning" ? "#FCD34D" : COLORS.border}`,
                borderRadius: 8,
                padding: "10px 12px",
                background: flag.severity === "critical" ? "#FEF2F2" : flag.severity === "warning" ? "#FFFBEB" : COLORS.white,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                  <span style={{ color: flag.severity === "critical" ? COLORS.red : flag.severity === "warning" ? COLORS.amber : COLORS.slate, fontSize: 8 }}>{flag.icon}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: COLORS.textPrimary }}>{flag.title}</span>
                </div>
                <div style={{ fontSize: 10, color: COLORS.slateDark, lineHeight: "16px", marginBottom: 6 }}>{flag.desc}</div>
                <div style={{ fontSize: 10, fontWeight: 600, color: flag.rejected ? COLORS.slate : COLORS.green }}>{flag.action}</div>
              </div>
            ))}
            <div style={{ marginTop: "auto", padding: "8px 0", borderTop: `1px solid ${COLORS.border}`, fontSize: 10, color: COLORS.slate }}>
              <strong>Result:</strong> 2 of 3 flags accepted and resolved. Ready for PE review.
            </div>
          </div>
        </div>
        {/* Right: PE Approval */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "10px 14px", borderBottom: `1px solid ${COLORS.border}`, background: COLORS.cream }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: COLORS.navy, letterSpacing: 0.5 }}>PE RESPONSIBLE CHARGE</span>
          </div>
          <div style={{ flex: 1, padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ background: COLORS.cream, borderRadius: 8, padding: "12px 14px", border: `1px solid ${COLORS.border}` }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.navy, marginBottom: 8 }}>Document Under Review</div>
              <div style={{ fontSize: 11, color: COLORS.textPrimary, lineHeight: "18px" }}>
                Berth 4 Condition Assessment — Rev A<br />
                34 pages · 12 figures · 8 tables<br />
                QC Status: <span style={{ color: COLORS.green, fontWeight: 600 }}>Passed</span>
              </div>
            </div>
            <div style={{ border: `2px solid ${COLORS.navy}`, borderRadius: 8, padding: "14px 14px", background: "#F0F4FF" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.navy, marginBottom: 10 }}>Approval Declaration</div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 8 }}>
                <div style={{ width: 16, height: 16, borderRadius: 3, border: `2px solid ${COLORS.green}`, background: "#DCFCE7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: COLORS.green, flexShrink: 0, marginTop: 1 }}>✓</div>
                <div style={{ fontSize: 10, color: COLORS.textPrimary, lineHeight: "16px" }}>
                  I have reviewed this document in its entirety and accept responsible charge as the Engineer of Record.
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 11 }}>
                <span style={{ color: COLORS.slateDark, fontWeight: 600 }}>License No:</span>
                <div style={{ padding: "4px 10px", borderRadius: 4, border: `1px solid ${COLORS.border}`, background: COLORS.white, color: COLORS.navy, fontWeight: 600, fontFamily: "monospace" }}>TX-XXXXXX</div>
              </div>
            </div>
            <div style={{ background: "#F0FDF4", border: "1px solid #86EFAC", borderRadius: 8, padding: "10px 12px", fontSize: 10, color: COLORS.green, lineHeight: "16px" }}>
              <strong>Upon approval:</strong> UNOFFICIAL watermark is removed. A permanent, tamper-proof log entry is created. This record cannot be altered or deleted — ever.
            </div>
            <div style={{ marginTop: "auto", textAlign: "center" }}>
              <div style={{ display: "inline-block", padding: "10px 32px", borderRadius: 6, background: COLORS.navy, color: COLORS.white, fontSize: 13, fontWeight: 700, letterSpacing: 0.5, cursor: "default" }}>
                Approve & Sign
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScreenFrame>
  );
}

/* ─── Security Summary ───────────────────────────────────────────── */
function SecuritySnapshot() {
  const layers = [
    { title: "Your Network", desc: "Documents indexed on your server. Files never leave.", items: ["Firm Data Store", "Gradeum Assistant (Local)", "AI Persona (Interface)"], color: COLORS.cyan, bg: "#F0FDFA" },
    { title: "Gradeum Cloud", desc: "Orchestration and validation. No document storage.", items: ["Query routing", "PE guardrail enforcement", "Response validation"], color: COLORS.amber, bg: "#FFFBEB" },
    { title: "AI Engine", desc: "Receives governed excerpts only. No file access.", items: ["No firm data access", "No document storage", "Controlled prompts only"], color: COLORS.navyLight, bg: "#F0F4FF" },
  ];
  const features = [
    { icon: "🔐", text: "Multi-factor authentication for every user" },
    { icon: "🏢", text: "Complete firm isolation — no cross-tenant access" },
    { icon: "🔒", text: "Encrypted at rest and in transit" },
    { icon: "📋", text: "Tamper-proof audit logs — 7-year retention" },
    { icon: "🇺🇸", text: "All data processing on U.S. soil" },
    { icon: "🚫", text: "Zero raw file transfer across your network" },
  ];
  return (
    <ScreenFrame title="Data Security Architecture" role="OVERVIEW">
      <div style={{ padding: 20 }}>
        {/* Architecture layers */}
        <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
          {layers.map((l, i) => (
            <div key={i} style={{ flex: 1, borderRadius: 8, border: `1px solid ${COLORS.border}`, overflow: "hidden" }}>
              <div style={{ background: l.bg, padding: "10px 14px", borderBottom: `1px solid ${COLORS.border}` }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: l.color }}>{l.title}</div>
                <div style={{ fontSize: 10, color: COLORS.slateDark, marginTop: 2 }}>{l.desc}</div>
              </div>
              <div style={{ padding: "10px 14px" }}>
                {l.items.map((item, j) => (
                  <div key={j} style={{ fontSize: 10, color: COLORS.textPrimary, padding: "3px 0", display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ color: l.color, fontSize: 8 }}>●</span> {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        {/* Flow arrow */}
        <div style={{ textAlign: "center", margin: "0 0 16px", fontSize: 10, color: COLORS.slate }}>
          <span style={{ display: "inline-block", padding: "4px 16px", borderRadius: 12, border: `1px solid ${COLORS.border}`, background: COLORS.cream }}>
            Only relevant excerpts cross the boundary — never complete documents
          </span>
        </div>
        {/* Feature grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {features.map((f, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 6, border: `1px solid ${COLORS.border}`, background: COLORS.cream }}>
              <span style={{ fontSize: 18 }}>{f.icon}</span>
              <span style={{ fontSize: 11, color: COLORS.textPrimary, fontWeight: 500 }}>{f.text}</span>
            </div>
          ))}
        </div>
      </div>
    </ScreenFrame>
  );
}

/* ─── Screen Frame ───────────────────────────────────────────────── */
function ScreenFrame({ title, role, children }: { title: string; role: string; children: React.ReactNode }) {
  return (
    <div style={{
      background: COLORS.white,
      borderRadius: 10,
      border: `1px solid ${COLORS.border}`,
      overflow: "hidden",
      width: "100%",
      maxWidth: 820,
      boxShadow: "0 4px 24px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.04)",
    }}>
      <div style={{
        background: COLORS.navy,
        padding: "8px 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ display: "flex", gap: 5 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#EF4444", opacity: 0.8 }} />
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#F59E0B", opacity: 0.8 }} />
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#22C55E", opacity: 0.8 }} />
          </div>
          <span style={{ color: COLORS.white, fontSize: 12, fontWeight: 600, letterSpacing: 0.5 }}>{title}</span>
        </div>
        <span style={{
          color: COLORS.amberLight,
          fontSize: 9,
          fontWeight: 700,
          padding: "2px 10px",
          borderRadius: 4,
          border: "1px solid rgba(245,158,11,0.3)",
          background: "rgba(245,158,11,0.1)",
          letterSpacing: 1,
        }}>{role}</span>
      </div>
      {children}
    </div>
  );
}

/* ─── Caption Panel ──────────────────────────────────────────────── */
function CaptionPanel({ caption, activeTab, setActiveTab }: { caption: Record<string, string> | undefined; activeTab: string; setActiveTab: (tab: string) => void }) {
  if (!caption) return null;
  const tabs = [
    { key: "how", label: "How It Works", color: COLORS.navy },
    { key: "why", label: "Why It's Faster", color: COLORS.amber },
    { key: "security", label: "Data Security", color: COLORS.green },
  ];
  return (
    <div style={{
      background: COLORS.white,
      border: `1px solid ${COLORS.border}`,
      borderRadius: 10,
      overflow: "hidden",
      width: "100%",
      maxWidth: 820,
      boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
    }}>
      <div style={{ display: "flex", borderBottom: `1px solid ${COLORS.border}` }}>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              flex: 1,
              padding: "10px 8px",
              background: activeTab === tab.key ? COLORS.cream : COLORS.white,
              border: "none",
              borderBottom: activeTab === tab.key ? `2px solid ${tab.color}` : "2px solid transparent",
              color: activeTab === tab.key ? tab.color : COLORS.slate,
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              letterSpacing: 0.3,
              transition: "all 0.2s ease",
              fontFamily: "inherit",
            }}
          >{tab.label}</button>
        ))}
      </div>
      <div style={{
        padding: "16px 20px",
        color: COLORS.textPrimary,
        fontSize: 13.5,
        lineHeight: "23px",
        minHeight: 60,
      }}>
        {caption[activeTab]}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN APPLICATION
   ═══════════════════════════════════════════════════════════════ */
export default function GradeumSimulation() {
  const [currentScene, setCurrentScene] = useState(0);
  const [captionTab, setCaptionTab] = useState("how");
  const [transitioning, setTransitioning] = useState(false);

  const scene = SCENES[currentScene];

  const navigate = useCallback((dir: number) => {
    const next = currentScene + dir;
    if (next < 0 || next >= SCENES.length) return;
    setTransitioning(true);
    setTimeout(() => {
      setCurrentScene(next);
      setCaptionTab("how");
      setTransitioning(false);
    }, 280);
  }, [currentScene]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); navigate(1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); navigate(-1); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [navigate]);

  const renderScene = () => {
    switch (scene.id) {
      case "command-center": return <DashboardSnapshot />;
      case "forecasting": return <ForecastingSnapshot />;
      case "document-production": return <DocumentSnapshot />;
      case "drawing-qa": return <DrawingSnapshot />;
      case "pe-review": return <ReviewSnapshot />;
      case "security": return <SecuritySnapshot />;
      default: return null;
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: `linear-gradient(180deg, ${COLORS.cream} 0%, ${COLORS.white} 40%, ${COLORS.cream} 100%)`,
      color: COLORS.textPrimary,
      fontFamily: "'Charter', 'Georgia', 'Cambria', 'Times New Roman', serif",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      position: "relative",
    }}>
      {/* Top accent line */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${COLORS.navy}, ${COLORS.amber})`, zIndex: 100 }} />

      {/* Progress */}
      <div style={{
        position: "fixed", top: 3, left: 0, right: 0, height: 2, background: COLORS.warmGray, zIndex: 100,
      }}>
        <div style={{
          height: "100%",
          width: `${((currentScene + 1) / SCENES.length) * 100}%`,
          background: COLORS.amber,
          transition: "width 0.5s ease",
        }} />
      </div>

      {/* Scene counter */}
      <div style={{
        position: "fixed", top: 16, right: 20,
        color: COLORS.slate, fontSize: 11,
        fontFamily: "'SF Mono', 'Consolas', monospace",
        zIndex: 100, letterSpacing: 1,
      }}>
        {String(currentScene + 1).padStart(2, "0")} / {String(SCENES.length).padStart(2, "0")}
      </div>

      {/* Main content */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: scene.type === "cinematic" ? "center" : "flex-start",
        padding: scene.type === "cinematic" ? "40px 24px 100px" : "28px 24px 100px",
        gap: 20,
        width: "100%",
        maxWidth: 900,
        opacity: transitioning ? 0 : 1,
        transform: transitioning ? "translateY(8px)" : "translateY(0)",
        transition: "opacity 0.28s ease, transform 0.28s ease",
      }}>
        {/* ─── CINEMATIC: INTRO ───────────────────────────────── */}
        {scene.id === "intro" && (
          <div style={{ textAlign: "center" }}>
            <div style={{
              width: 80, height: 80, borderRadius: "50%",
              border: `2px solid ${COLORS.navy}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 28px",
              background: COLORS.white,
              boxShadow: "0 4px 20px rgba(27,42,74,0.1)",
            }}>
              <span style={{ fontSize: 28, color: COLORS.navy, fontWeight: 700, fontFamily: "'SF Mono', monospace" }}>G</span>
            </div>
            <h1 style={{
              fontSize: 44, fontWeight: 700, margin: 0, letterSpacing: 8,
              color: COLORS.navy,
            }}>GRADEUM</h1>
            <p style={{ color: COLORS.slateDark, fontSize: 16, marginTop: 8, letterSpacing: 1.5, fontWeight: 400 }}>
              The Engineering Intelligence Platform
            </p>
            <div style={{ width: 60, height: 2, background: COLORS.amber, margin: "24px auto", borderRadius: 1 }} />
            <p style={{ color: COLORS.slate, fontSize: 14, lineHeight: "24px", maxWidth: 480, margin: "0 auto" }}>
              Built for Professional Engineers. Powered by AI. Governed by Guardrails.
            </p>
            <div style={{ marginTop: 32, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              {["Your Documents Stay Local", "PE-Governed AI", "Built by Engineers"].map((t, i) => (
                <span key={i} style={{
                  padding: "6px 16px", borderRadius: 20,
                  border: `1px solid ${COLORS.border}`,
                  color: COLORS.slateDark, fontSize: 12, fontWeight: 500,
                  background: COLORS.white,
                }}>{t}</span>
              ))}
            </div>
          </div>
        )}

        {/* ─── CINEMATIC: CLOSING ────────────────────────────── */}
        {scene.id === "closing" && (
          <div style={{ textAlign: "center" }}>
            <h1 style={{ fontSize: 40, fontWeight: 700, margin: 0, letterSpacing: 6, color: COLORS.navy }}>GRADEUM</h1>
            <p style={{ color: COLORS.slateDark, fontSize: 15, marginTop: 8, letterSpacing: 1 }}>
              The Engineering Intelligence Platform
            </p>
            <div style={{ width: 60, height: 2, background: COLORS.amber, margin: "24px auto", borderRadius: 1 }} />
            <p style={{ color: COLORS.slate, fontSize: 15, lineHeight: "26px", maxWidth: 460, margin: "0 auto 32px" }}>
              Your documents. Your engineers. Your judgment.<br />
              <strong style={{ color: COLORS.navy }}>Our platform makes it faster.</strong>
            </p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              {[
                { label: "70–80%", desc: "faster document production" },
                { label: "Zero", desc: "raw files leave your network" },
                { label: "100%", desc: "PE-governed AI guardrails" },
              ].map((s, i) => (
                <div key={i} style={{
                  padding: "16px 24px", borderRadius: 8,
                  border: `1px solid ${COLORS.border}`,
                  background: COLORS.white,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  minWidth: 140,
                }}>
                  <div style={{ fontSize: 26, fontWeight: 700, color: COLORS.navy }}>{s.label}</div>
                  <div style={{ fontSize: 11, color: COLORS.slate, marginTop: 4 }}>{s.desc}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 36, fontSize: 14, color: COLORS.navy, fontWeight: 600 }}>
              gradeum.io
            </div>
          </div>
        )}

        {/* ─── SCREEN SCENES ─────────────────────────────────── */}
        {scene.type !== "cinematic" && (
          <>
            <div style={{ textAlign: "center", maxWidth: 640, marginBottom: 4 }}>
              <h2 style={{ fontSize: 26, fontWeight: 700, margin: 0, color: COLORS.navy, letterSpacing: 0.5 }}>{scene.title}</h2>
              <p style={{ color: COLORS.slateDark, fontSize: 14, marginTop: 6, lineHeight: "22px" }}>{scene.subtitle}</p>
            </div>
            {renderScene()}
            <CaptionPanel caption={scene.caption} activeTab={captionTab} setActiveTab={setCaptionTab} />
          </>
        )}
      </div>

      {/* Navigation */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0,
        padding: "14px 24px 18px",
        display: "flex", justifyContent: "center", alignItems: "center", gap: 14,
        background: `linear-gradient(transparent, ${COLORS.cream} 35%)`,
        zIndex: 100,
      }}>
        <button onClick={() => navigate(-1)} disabled={currentScene === 0}
          style={{
            padding: "8px 20px", borderRadius: 6,
            border: `1px solid ${currentScene === 0 ? COLORS.warmGray : COLORS.border}`,
            background: COLORS.white,
            color: currentScene === 0 ? COLORS.warmGray : COLORS.navy,
            fontSize: 13, fontWeight: 600, cursor: currentScene === 0 ? "default" : "pointer",
            fontFamily: "inherit", transition: "all 0.2s ease",
          }}>← Back</button>

        <div style={{ display: "flex", gap: 5 }}>
          {SCENES.map((_, i) => (
            <button key={i}
              onClick={() => {
                setTransitioning(true);
                setTimeout(() => { setCurrentScene(i); setCaptionTab("how"); setTransitioning(false); }, 280);
              }}
              style={{
                width: i === currentScene ? 22 : 7,
                height: 7, borderRadius: 4, border: "none",
                background: i === currentScene ? COLORS.navy : i < currentScene ? COLORS.amber : COLORS.warmGray,
                cursor: "pointer", transition: "all 0.3s ease", padding: 0,
              }} />
          ))}
        </div>

        <button onClick={() => navigate(1)} disabled={currentScene === SCENES.length - 1}
          style={{
            padding: "8px 20px", borderRadius: 6,
            border: `1px solid ${currentScene === SCENES.length - 1 ? COLORS.warmGray : COLORS.navy}`,
            background: currentScene === SCENES.length - 1 ? COLORS.white : COLORS.navy,
            color: currentScene === SCENES.length - 1 ? COLORS.warmGray : COLORS.white,
            fontSize: 13, fontWeight: 600, cursor: currentScene === SCENES.length - 1 ? "default" : "pointer",
            fontFamily: "inherit", transition: "all 0.2s ease",
          }}>Next →</button>
      </div>
    </div>
  );
}
