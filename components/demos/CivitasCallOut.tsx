'use client'
import { useState, useEffect, useRef } from "react";

const NAVY_DEEP = "#0F1D36";
const AMBER = "#C4883A";
const AMBER_LIGHT = "#D4A65A";
const PAPER = "#FAF7F2";

const PANEL_IMAGE = "https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=800";

const T = {
  callIn: 0, dispatchPause: 2, cameraSnap: 4, photoAppear: 5,
  questionStart: 7, questionDone: 9, reasoningStart: 9.5,
  reason1: 10, reason2: 11.5, reason3: 13, reason4: 14.5,
  answerStart: 16, holdAnswer: 22,
};

export default function CivitasCallOut({ active }: { active: boolean }) {
  const [elapsed, setElapsed] = useState(0);
  const [started, setStarted] = useState(false);
  const startRef = useRef<number | null>(null);
  const frameRef = useRef<number | null>(null);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setImgLoaded(true);
    img.src = PANEL_IMAGE;
  }, []);

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

  const showDispatch = elapsed >= T.callIn;
  const showPhoto = elapsed >= T.photoAppear;
  const showQuestion = elapsed >= T.questionStart;
  const showReasoning = elapsed >= T.reasoningStart;
  const showAnswer = elapsed >= T.answerStart;

  const questionText = "Do we have this?";
  const typedQuestion = showQuestion ? typeText(questionText, T.questionStart, T.questionDone - T.questionStart) : "";

  const answerLines = [
    { label: "PART IDENTIFIED", color: AMBER },
    { text: "Square D QO130L200PG \u2014 200A Main Lug panel, non-standard configuration. This is a legacy panel discontinued in 2019." },
    { label: "INVENTORY STATUS", color: "#4ADE80" },
    { text: "2 units in Warehouse B, Bin 14-C. Last verified: March 28, 2026. Reserved: 0." },
    { label: "SERVICE HISTORY", color: AMBER },
    { text: "This location (Bldg 9, Panel 3-East) has had 4 emergency call-outs in 18 months. Root cause: corroded bus bar connections from salt air ingress. Recommend full panel replacement in next capital cycle." },
  ];

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      {/* DISPATCH SCENE */}
      {!showPhoto && showDispatch && (
        <div style={{ position: "absolute", inset: 0, background: NAVY_DEEP, display: "flex", flexDirection: "column", opacity: phase(T.callIn, 0.8) }}>
          <div style={{ height: 42, background: "rgba(27,58,92,0.6)", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", padding: "0 16px", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ fontFamily: "'Cinzel', serif", fontSize: 13, fontWeight: 700, color: AMBER, letterSpacing: 3 }}>CIVITAS</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)" }}>|</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>Emergency Dispatch</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 7, height: 7, background: "#EF4444", borderRadius: "50%", animation: "pulse 1s ease-in-out infinite" }} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#EF4444", fontWeight: 600, letterSpacing: 1 }}>PRIORITY</span>
            </div>
          </div>
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
            <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: 24, maxWidth: 380, width: "100%", animation: "woSlideUp 0.6s ease-out" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>{"\u26a1"}</div>
                <div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 600, color: PAPER }}>WO-2026-0412</div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>Emergency Call-Out</div>
                </div>
              </div>
              <div style={{ display: "grid", gap: 10 }}>
                {[
                  { l: "Location", v: "Building 9, Panel 3-East" },
                  { l: "Reported", v: "Dead panel \u2014 no power to east wing" },
                  { l: "Assigned", v: "Martinez, J. \u2014 Licensed Electrician" },
                  { l: "ETA", v: "On site \u2014 assessing now" },
                ].map((row, i) => (
                  <div key={i} style={{ display: "flex", gap: 8 }}>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.35)", minWidth: 70, letterSpacing: 0.5 }}>{row.l}</div>
                    <div style={{ fontSize: 12, color: PAPER, lineHeight: 1.4 }}>{row.v}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 16, padding: "8px 12px", background: "rgba(196,136,58,0.1)", border: "1px solid rgba(196,136,58,0.25)", borderRadius: 6, display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 24, height: 24, borderRadius: 6, background: AMBER, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={NAVY_DEEP} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="12" cy="13" r="3"/><line x1="12" y1="7" x2="12" y2="7.01"/></svg>
                </div>
                <div style={{ fontSize: 11, color: AMBER_LIGHT, fontWeight: 500 }}>Snap photo to identify equipment...</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FIELD VIEW WITH PHOTO + CHAT */}
      {showPhoto && (
        <div style={{ position: "absolute", inset: 0, background: "#111", display: "flex", flexDirection: "column", zIndex: 10, animation: "fadeIn 0.6s ease-out" }}>
          <div style={{ height: 32, background: "rgba(196,136,58,0.15)", borderBottom: `2px solid ${AMBER}`, display: "flex", alignItems: "center", padding: "0 12px", justifyContent: "space-between", flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <div style={{ width: 7, height: 7, background: "#4ADE80", borderRadius: "50%", boxShadow: "0 0 6px rgba(74,222,128,0.6)" }} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 500, color: AMBER, letterSpacing: 2 }}>
                FIELD MODE \u2014 WO-2026-0412
              </span>
            </div>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.35)" }}>{"\u29bf"} REC | Bldg 9</span>
          </div>
          <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
            <div style={{ flex: showQuestion ? "0 0 45%" : "1", transition: "flex 0.8s ease", position: "relative", background: "#0a0a0a" }}>
              <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${PANEL_IMAGE})`, backgroundSize: "cover", backgroundPosition: "center", opacity: imgLoaded ? 1 : 0, transition: "opacity 1s ease" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(0,0,0,0.85))", padding: "36px 12px 10px" }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 500, color: "#fff", textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}>Panel 3-East &mdash; Building 9</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>04/02/2026 10:12 AM CDT</div>
              </div>
            </div>
            {showQuestion && (
              <div style={{ flex: "0 0 55%", background: NAVY_DEEP, display: "flex", flexDirection: "column", borderLeft: "1px solid rgba(196,136,58,0.15)", animation: "slideInRight 0.6s ease-out" }}>
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
                        {elapsed >= T.reason1 && <RStep label="Photo Analysis" detail="Square D QO130L200PG identified" done={elapsed >= T.reason2} fade={phase(T.reason1)} />}
                        {elapsed >= T.reason2 && <RStep label="Part Lookup" detail="Legacy panel \u2014 discontinued 2019" done={elapsed >= T.reason3} fade={phase(T.reason2)} />}
                        {elapsed >= T.reason3 && <RStep label="Inventory Check" detail="Warehouse B, Bin 14-C" done={elapsed >= T.reason4} fade={phase(T.reason3)} />}
                        {elapsed >= T.reason4 && (
                          <div style={{ opacity: phase(T.reason4) }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                              <span style={{ fontSize: 11, color: showAnswer ? "#4ADE80" : AMBER, display: "inline-block", animation: !showAnswer ? "spin 1.5s linear infinite" : "none" }}>{showAnswer ? "\u2713" : "\u27f3"}</span>
                              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.5)" }}>{showAnswer ? "Reviewed 4 call-outs, 18 months" : "Pulling service history..."}</span>
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
                  <div style={{ flex: 1, background: "rgba(255,255,255,0.04)", borderRadius: 8, padding: "9px 12px", fontSize: 12, color: "rgba(255,255,255,0.3)", border: "1px solid rgba(255,255,255,0.08)" }}>Ask about this equipment...</div>
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
