'use client'
import { useState, useEffect, useRef } from "react";

const NAVY_DEEP = "#0F1D36";
const AMBER = "#C4883A";
const AMBER_LIGHT = "#D4A65A";
const PAPER = "#FAF7F2";

const SPALLING_IMAGE = "https://images.pexels.com/photos/3122779/pexels-photo-3122779.jpeg?auto=compress&cs=tinysrgb&w=800";

const T = {
  dashboardIn: 0, orientPause: 3.5, buttonPulseStart: 3.5, buttonClick: 6,
  fieldModeFlash: 6.5, photoAppear: 8.5, questionStart: 11, questionDone: 13.5,
  reasoningStart: 14, reason1: 14.5, reason2: 16, reason3: 17.5,
  answerStart: 20, answerDone: 24, holdAnswer: 28,
};

export default function CivitasFieldInspection({ active }: { active: boolean }) {
  const [elapsed, setElapsed] = useState(0);
  const [started, setStarted] = useState(false);
  const startRef = useRef<number | null>(null);
  const frameRef = useRef<number | null>(null);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setImgLoaded(true);
    img.src = SPALLING_IMAGE;
  }, []);

  // Reset and start when active
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

  const pulseButton = elapsed >= T.buttonPulseStart && elapsed < T.buttonClick;
  const buttonClicked = elapsed >= T.buttonClick;
  const fieldModeFlash = elapsed >= T.fieldModeFlash && elapsed < T.photoAppear;
  const showPhoto = elapsed >= T.photoAppear;
  const showQuestion = elapsed >= T.questionStart;
  const showReasoning = elapsed >= T.reasoningStart;
  const showAnswer = elapsed >= T.answerStart;

  const questionText = "Was this here before?";
  const typedQuestion = showQuestion ? typeText(questionText, T.questionStart, T.questionDone - T.questionStart) : "";

  const answerLines = [
    { label: "YES \u2014 PREVIOUSLY DOCUMENTED", color: AMBER },
    { text: "This spalling pattern was first recorded during the October 2024 routine inspection (WO-2024-1847). At that time it was classified as minor surface deterioration, approximately 4\u2033 \u00d7 6\u2033 area." },
    { text: "Current photo shows significant progression \u2014 estimated 12\u2033 \u00d7 18\u2033 with exposed aggregate and possible rebar exposure at the eastern edge." },
    { label: "RECOMMENDATION", color: AMBER },
    { text: "Flag for structural assessment. Escalate to PE review \u2014 deterioration rate exceeds projected timeline by 14 months." },
  ];

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      {/* DASHBOARD SCENE */}
      {!buttonClicked && (
        <div style={{ position: "absolute", inset: 0, display: "flex", opacity: phase(0, 0.8) }}>
          <div style={{ width: 200, background: "#1B3A5C", borderRight: "1px solid rgba(196,136,58,0.15)", padding: "16px 0", display: "flex", flexDirection: "column" }}>
            <div style={{ padding: "0 14px 14px", borderBottom: "1px solid rgba(255,255,255,0.08)", marginBottom: 10 }}>
              <div style={{ fontFamily: "'Cinzel', serif", fontSize: 13, fontWeight: 700, color: AMBER, letterSpacing: 3, marginBottom: 3 }}>CIVITAS</div>
              <div style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", letterSpacing: 1 }}>BAYSHORE PORT AUTHORITY</div>
            </div>
            {["\u25c9 Dashboard","\u25a6 Assets","\u2691 Inspections","\u25f7 Work Orders","\u25a4 Documents","\u229e Capital Plan"].map((item, i) => (
              <div key={i} style={{ padding: "8px 14px", fontSize: 12, color: i === 0 ? AMBER : "rgba(255,255,255,0.5)", background: i === 0 ? "rgba(196,136,58,0.08)" : "transparent", borderLeft: i === 0 ? `3px solid ${AMBER}` : "3px solid transparent" }}>{item}</div>
            ))}
            <div style={{ flex: 1 }} />
            <div style={{ margin: "0 10px 10px", padding: "10px 12px", background: pulseButton ? `linear-gradient(135deg, ${AMBER}, ${AMBER_LIGHT})` : "rgba(196,136,58,0.12)", border: `2px solid ${AMBER}`, borderRadius: 8, textAlign: "center", animation: pulseButton ? "fieldPulse 1.2s ease-in-out infinite" : "none" }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, color: pulseButton ? NAVY_DEEP : AMBER }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={pulseButton ? NAVY_DEEP : AMBER} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: -2, marginRight: 4 }}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/><line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/></svg>
                FIELD MODE
              </div>
            </div>
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <div style={{ height: 42, background: "rgba(27,58,92,0.6)", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", padding: "0 16px", justifyContent: "space-between" }}>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)" }}>Asset Overview &mdash; <span style={{ color: AMBER }}>Cargo Docks 1&ndash;15</span></div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)" }}>Apr 2, 2026 | 9:43 AM</div>
            </div>
            <div style={{ flex: 1, padding: 14, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {[{ l: "Total Assets", v: "847", s: "Tracked elements" },{ l: "Open Work Orders", v: "23", s: "4 overdue" },{ l: "Inspections Due", v: "12", s: "Next 30 days" },{ l: "Condition Alerts", v: "6", s: "2 critical", a: true }].map((c, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 8, padding: "12px 14px", border: c.a ? "1px solid rgba(196,136,58,0.4)" : "1px solid rgba(255,255,255,0.06)" }}>
                  <div style={{ fontSize: 9, letterSpacing: 1.5, textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 5 }}>{c.l}</div>
                  <div style={{ fontSize: 26, fontWeight: 700, fontFamily: "'Cinzel', serif", color: c.a ? AMBER : PAPER, marginBottom: 2 }}>{c.v}</div>
                  <div style={{ fontSize: 10, color: c.a ? AMBER_LIGHT : "rgba(255,255,255,0.35)" }}>{c.s}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* FIELD MODE FLASH */}
      {fieldModeFlash && (
        <div style={{ position: "absolute", inset: 0, background: NAVY_DEEP, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", zIndex: 10, animation: "flashIn 0.3s ease-out" }}>
          <div style={{ width: 44, height: 44, border: `3px solid ${AMBER}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18, animation: "scanPulse 0.8s ease-in-out infinite" }}>
            <div style={{ width: 11, height: 11, background: AMBER, borderRadius: "50%", boxShadow: `0 0 20px ${AMBER}` }} />
          </div>
          <div style={{ fontFamily: "'Cinzel', serif", fontSize: 20, fontWeight: 700, letterSpacing: 8, color: AMBER, textShadow: `0 0 30px rgba(196,136,58,0.5)`, marginBottom: 6 }}>FIELD MODE</div>
          <div style={{ fontSize: 12, letterSpacing: 6, color: AMBER_LIGHT, fontWeight: 600, opacity: 0.8 }}>ENGAGED</div>
        </div>
      )}

      {/* FIELD VIEW */}
      {showPhoto && (
        <div style={{ position: "absolute", inset: 0, background: "#111", display: "flex", flexDirection: "column", zIndex: 10, animation: "fadeIn 0.6s ease-out" }}>
          <div style={{ height: 32, background: "rgba(196,136,58,0.15)", borderBottom: `2px solid ${AMBER}`, display: "flex", alignItems: "center", padding: "0 12px", justifyContent: "space-between", flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <div style={{ width: 7, height: 7, background: "#4ADE80", borderRadius: "50%", boxShadow: "0 0 6px rgba(74,222,128,0.6)" }} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 500, color: AMBER, letterSpacing: 2 }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={AMBER} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: -2, marginRight: 4 }}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/><line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/></svg>
                FIELD MODE
              </span>
            </div>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.35)" }}>{"\u29bf"} REC | GPS LOCKED</span>
          </div>
          <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
            <div style={{ flex: showQuestion ? "0 0 50%" : "1", transition: "flex 0.8s ease", position: "relative", background: "#0a0a0a" }}>
              <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${SPALLING_IMAGE})`, backgroundSize: "cover", backgroundPosition: "center", opacity: imgLoaded ? 1 : 0, transition: "opacity 1s ease" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(0,0,0,0.85))", padding: "36px 12px 10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                  <div>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 500, color: "#fff", textShadow: "0 1px 4px rgba(0,0,0,0.8)", marginBottom: 2 }}>27.8006&deg;N, 97.3964&deg;W</div>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.7)" }}>04/02/2026  09:47 AM CDT</div>
                  </div>
                  <div style={{ fontSize: 9, letterSpacing: 1, color: AMBER, fontWeight: 600, background: "rgba(196,136,58,0.15)", padding: "3px 7px", borderRadius: 4, border: "1px solid rgba(196,136,58,0.3)" }}>&plusmn; 0.8m</div>
                </div>
              </div>
            </div>
            {showQuestion && (
              <div style={{ flex: "0 0 50%", background: NAVY_DEEP, display: "flex", flexDirection: "column", borderLeft: "1px solid rgba(196,136,58,0.15)", animation: "slideInRight 0.6s ease-out" }}>
                <div style={{ flex: 1, padding: 14, overflowY: "auto", display: "flex", flexDirection: "column", gap: 10 }}>
                  <div style={{ alignSelf: "flex-end", maxWidth: "85%" }}>
                    <div style={{ background: "rgba(196,136,58,0.12)", border: "1px solid rgba(196,136,58,0.25)", borderRadius: "10px 10px 2px 10px", padding: "9px 12px" }}>
                      <div style={{ fontSize: 13, color: PAPER, lineHeight: 1.4 }}>
                        {typedQuestion}
                        {typedQuestion.length < questionText.length && <span style={{ display: "inline-block", width: 2, height: 14, background: AMBER, marginLeft: 1, verticalAlign: "text-bottom", animation: "blink 0.6s step-end infinite" }} />}
                      </div>
                    </div>
                  </div>
                  {showReasoning && (
                    <div style={{ alignSelf: "flex-start", maxWidth: "90%" }}>
                      <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "10px 10px 10px 2px", padding: "12px 14px", display: "flex", flexDirection: "column", gap: 9 }}>
                        {elapsed >= T.reason1 && <RStep label="Location Found" detail="27.8006\u00b0N, 97.3964\u00b0W" done={elapsed >= T.reason2} fade={phase(T.reason1)} />}
                        {elapsed >= T.reason2 && <RStep label="Asset Identified" detail="Cargo Dock 7 \u2014 Bent 12, East Face" done={elapsed >= T.reason3} fade={phase(T.reason2)} />}
                        {elapsed >= T.reason3 && (
                          <div style={{ opacity: phase(T.reason3) }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                              <span style={{ fontSize: 11, color: showAnswer ? "#4ADE80" : AMBER, display: "inline-block", animation: !showAnswer ? "spin 1.5s linear infinite" : "none" }}>{showAnswer ? "\u2713" : "\u27f3"}</span>
                              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.5)" }}>{showAnswer ? "Reviewed 3 inspections, 2 work orders" : "Reviewing inspections and work orders"}</span>
                              {!showAnswer && <LoadingDots />}
                            </div>
                          </div>
                        )}
                        {showAnswer && (
                          <div style={{ marginTop: 4, paddingTop: 8, borderTop: "1px solid rgba(196,136,58,0.2)", opacity: phase(T.answerStart) }}>
                            {answerLines.map((line, i) => line.label ? (
                              <div key={i} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 600, letterSpacing: 1.5, color: line.color, marginTop: i > 0 ? 10 : 0, marginBottom: 5 }}>{line.label}</div>
                            ) : (
                              <div key={i} style={{ fontSize: 12, color: "rgba(255,255,255,0.75)", lineHeight: 1.5, marginBottom: 4 }}>{line.text}</div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <div style={{ padding: "8px 12px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: 7 }}>
                  <div style={{ flex: 1, background: "rgba(255,255,255,0.04)", borderRadius: 8, padding: "9px 12px", fontSize: 12, color: "rgba(255,255,255,0.3)", border: "1px solid rgba(255,255,255,0.08)" }}>Ask about this asset...</div>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(196,136,58,0.15)", border: "1px solid rgba(196,136,58,0.3)", display: "flex", alignItems: "center", justifyContent: "center", color: AMBER, fontSize: 13 }}>&uarr;</div>
                </div>
              </div>
            )}
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
