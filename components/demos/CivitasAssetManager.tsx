'use client'
import { useState, useEffect, useRef } from "react";

const NAVY_DEEP = "#0F1D36";
const AMBER = "#C4883A";
const AMBER_LIGHT = "#D4A65A";
const PAPER = "#FAF7F2";

const T = {
  dashboardIn: 0, orientPause: 2, questionStart: 4, questionDone: 7,
  reasoningStart: 7.5, reason1: 8, reason2: 9.5, reason3: 11, reason4: 12.5,
  answerStart: 14, briefSection1: 14.5, briefSection2: 16, briefSection3: 17.5,
  holdAnswer: 23,
};

export default function CivitasAssetManager({ active }: { active: boolean }) {
  const [elapsed, setElapsed] = useState(0);
  const [started, setStarted] = useState(false);
  const startRef = useRef<number | null>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (active) {
      setElapsed(0);
      setStarted(false);
      const t = setTimeout(() => setStarted(true), 300);
      return () => clearTimeout(t);
    } else {
      setStarted(false);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    }
  }, [active]);

  useEffect(() => {
    if (!started) return;
    startRef.current = performance.now();
    const tick = (now: number) => {
      const s = (now - (startRef.current ?? now)) / 1000;
      setElapsed(s);
      if (s < T.holdAnswer + 2) frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => { if (frameRef.current !== null) cancelAnimationFrame(frameRef.current); };
  }, [started]);

  const phase = (start: number, dur = 0.6) => Math.max(0, Math.min(1, (elapsed - start) / dur));
  const typeText = (text: string, startT: number, duration: number) => {
    const p = Math.max(0, Math.min(1, (elapsed - startT) / duration));
    return text.substring(0, Math.floor(text.length * p));
  };

  const showDashboard = elapsed >= T.dashboardIn;
  const showQuestion = elapsed >= T.questionStart;
  const showReasoning = elapsed >= T.reasoningStart;
  const showAnswer = elapsed >= T.answerStart;

  const questionText = "I'm briefing the board tomorrow on Dock 7";
  const typedQuestion = showQuestion ? typeText(questionText, T.questionStart, T.questionDone - T.questionStart) : "";

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      {/* DASHBOARD WITH SIDEBAR */}
      {showDashboard && (
        <div style={{ position: "absolute", inset: 0, display: "flex", opacity: phase(T.dashboardIn, 0.8) }}>
          {/* Sidebar */}
          <div style={{ width: 200, background: "#1B3A5C", borderRight: "1px solid rgba(196,136,58,0.15)", padding: "16px 0", display: "flex", flexDirection: "column" }}>
            <div style={{ padding: "0 14px 14px", borderBottom: "1px solid rgba(255,255,255,0.08)", marginBottom: 10 }}>
              <div style={{ fontFamily: "'Cinzel', serif", fontSize: 13, fontWeight: 700, color: AMBER, letterSpacing: 3, marginBottom: 3 }}>CIVITAS</div>
              <div style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", letterSpacing: 1 }}>BAYSHORE PORT AUTHORITY</div>
            </div>
            {["\u25c9 Dashboard","\u25a6 Assets","\u2691 Inspections","\u25f7 Work Orders","\u25a4 Documents","\u229e Capital Plan"].map((item, i) => (
              <div key={i} style={{ padding: "8px 14px", fontSize: 12, color: i === 5 ? AMBER : "rgba(255,255,255,0.5)", background: i === 5 ? "rgba(196,136,58,0.08)" : "transparent", borderLeft: i === 5 ? `3px solid ${AMBER}` : "3px solid transparent" }}>{item}</div>
            ))}
          </div>

          {/* Main content */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", background: NAVY_DEEP }}>
            <div style={{ height: 42, background: "rgba(27,58,92,0.6)", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", padding: "0 16px", justifyContent: "space-between" }}>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)" }}>Capital Planning &mdash; <span style={{ color: AMBER }}>Executive View</span></div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)" }}>Apr 2, 2026 | 4:15 PM</div>
            </div>

            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              {/* Top metrics row - visible before question takes over */}
              {!showAnswer && (
                <div style={{ padding: "12px 16px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
                  {[
                    { l: "Portfolio Value", v: "$142M", s: "847 tracked assets" },
                    { l: "Deferred Maintenance", v: "$8.2M", s: "12% increase YoY" },
                    { l: "Capital Budget FY26", v: "$4.1M", s: "68% allocated" },
                  ].map((c, i) => (
                    <div key={i} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 8, padding: "10px 12px", border: "1px solid rgba(255,255,255,0.06)" }}>
                      <div style={{ fontSize: 9, letterSpacing: 1.5, textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 4 }}>{c.l}</div>
                      <div style={{ fontSize: 22, fontWeight: 700, fontFamily: "'Cinzel', serif", color: PAPER, marginBottom: 2 }}>{c.v}</div>
                      <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)" }}>{c.s}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Chat area */}
              <div style={{ flex: 1, padding: "8px 16px", overflowY: "auto", display: "flex", flexDirection: "column", gap: 10 }}>
                {showQuestion && (
                  <div style={{ alignSelf: "flex-end", maxWidth: "70%" }}>
                    <div style={{ background: "rgba(196,136,58,0.12)", border: "1px solid rgba(196,136,58,0.25)", borderRadius: "10px 10px 2px 10px", padding: "9px 12px" }}>
                      <div style={{ fontSize: 13, color: PAPER, lineHeight: 1.4 }}>
                        {typedQuestion}
                        {typedQuestion.length < questionText.length && <span style={{ display: "inline-block", width: 2, height: 14, background: AMBER, marginLeft: 1, verticalAlign: "text-bottom", animation: "blink 0.6s step-end infinite" }} />}
                      </div>
                    </div>
                  </div>
                )}

                {showReasoning && (
                  <div style={{ alignSelf: "flex-start", maxWidth: "85%" }}>
                    <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "10px 10px 10px 2px", padding: "12px 14px", display: "flex", flexDirection: "column", gap: 9 }}>
                      {elapsed >= T.reason1 && <RStep label="Asset Located" detail="Cargo Dock 7 \u2014 20 structural elements" done={elapsed >= T.reason2} fade={phase(T.reason1)} />}
                      {elapsed >= T.reason2 && <RStep label="Inspection History" detail="14 inspections, 2024\u20132026" done={elapsed >= T.reason3} fade={phase(T.reason2)} />}
                      {elapsed >= T.reason3 && <RStep label="Work Orders" detail="8 completed, 3 open, 1 overdue" done={elapsed >= T.reason4} fade={phase(T.reason3)} />}
                      {elapsed >= T.reason4 && (
                        <div style={{ opacity: phase(T.reason4) }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                            <span style={{ fontSize: 11, color: showAnswer ? "#4ADE80" : AMBER, display: "inline-block", animation: !showAnswer ? "spin 1.5s linear infinite" : "none" }}>{showAnswer ? "\u2713" : "\u27f3"}</span>
                            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.5)" }}>{showAnswer ? "Brief assembled from 47 records" : "Assembling executive brief..."}</span>
                            {!showAnswer && <LoadingDots />}
                          </div>
                        </div>
                      )}

                      {/* Executive Brief */}
                      {showAnswer && (
                        <div style={{ marginTop: 4, paddingTop: 8, borderTop: "1px solid rgba(196,136,58,0.2)", opacity: phase(T.answerStart) }}>
                          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 600, letterSpacing: 1.5, color: AMBER, marginBottom: 8 }}>EXECUTIVE BRIEF \u2014 CARGO DOCK 7</div>

                          {elapsed >= T.briefSection1 && (
                            <div style={{ marginBottom: 10, opacity: phase(T.briefSection1) }}>
                              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: AMBER_LIGHT, marginBottom: 4, fontWeight: 600 }}>CONDITION SUMMARY</div>
                              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.75)", lineHeight: 1.5 }}>
                                Overall condition: <span style={{ color: "#FBBF24", fontWeight: 600 }}>FAIR (C+)</span>. Primary concern is progressive spalling on Bents 11\u201314 (east face), first documented October 2024. Deterioration accelerating \u2014 now 14 months ahead of projected timeline.
                              </div>
                            </div>
                          )}

                          {elapsed >= T.briefSection2 && (
                            <div style={{ marginBottom: 10, opacity: phase(T.briefSection2) }}>
                              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: AMBER_LIGHT, marginBottom: 4, fontWeight: 600 }}>COST PROJECTION</div>
                              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                                {[
                                  { l: "Deferred maintenance", v: "$340K" },
                                  { l: "Recommended repairs", v: "$520K" },
                                  { l: "Full rehabilitation", v: "$2.1M" },
                                  { l: "Replacement (new)", v: "$8.4M" },
                                ].map((item, i) => (
                                  <div key={i} style={{ background: "rgba(255,255,255,0.03)", borderRadius: 6, padding: "6px 8px" }}>
                                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>{item.l}</div>
                                    <div style={{ fontSize: 14, fontWeight: 600, color: PAPER, fontFamily: "'JetBrains Mono', monospace" }}>{item.v}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {elapsed >= T.briefSection3 && (
                            <div style={{ opacity: phase(T.briefSection3) }}>
                              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: AMBER_LIGHT, marginBottom: 4, fontWeight: 600 }}>RECOMMENDATION</div>
                              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.75)", lineHeight: 1.5 }}>
                                Allocate $520K from FY26 capital reserve for targeted repairs on Bents 11\u201314. Schedule PE structural assessment within 30 days. Defer full rehabilitation to FY27 pending assessment results.
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Input bar */}
              <div style={{ padding: "8px 16px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: 7 }}>
                <div style={{ flex: 1, background: "rgba(255,255,255,0.04)", borderRadius: 8, padding: "9px 12px", fontSize: 12, color: "rgba(255,255,255,0.3)", border: "1px solid rgba(255,255,255,0.08)" }}>Ask about any asset or portfolio...</div>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(196,136,58,0.15)", border: "1px solid rgba(196,136,58,0.3)", display: "flex", alignItems: "center", justifyContent: "center", color: AMBER, fontSize: 13 }}>&uarr;</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function RStep({ label, detail, done, fade }: { label: string; detail: string; done: boolean; fade: number }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 7, opacity: fade }}>
      <span style={{ fontSize: 11, color: done ? "#4ADE80" : "#C4883A", marginTop: 1, transition: "color 0.4s" }}>{done ? "\u2713" : "\u25ce"}</span>
      <div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.5)", marginBottom: 1 }}>{label}</div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: done ? "#FAF7F2" : "#D4A65A", fontWeight: 500 }}>{detail}</div>
      </div>
    </div>
  );
}

function LoadingDots() {
  return (
    <span style={{ display: "inline-flex", gap: 3, marginLeft: 4 }}>
      {[0,1,2].map(i => <span key={i} style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(255,255,255,0.4)", animation: `dotPulse 1.4s ease-in-out ${i*0.2}s infinite` }} />)}
    </span>
  );
}
