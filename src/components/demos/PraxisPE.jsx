import { useState, useEffect, useRef } from "react";

const NAVY = "#1B3A5C";
const NAVY_DEEP = "#0F1D36";
const AMBER = "#C4883A";
const AMBER_LIGHT = "#D4A65A";
const PAPER = "#FAF7F2";

const FONTS_LINK = "https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=DM+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap";

const T = {
  dashIn: 0,
  settle: 2,
  btnPulse: 2.5,
  btnClick: 5,
  consiliumFlash: 5.5,
  claudeStart: 6.5,
  claudeDone: 9,
  gptStart: 9.5,
  gptDone: 12,
  resultsIn: 13,
  agree1: 13.5,
  agree2: 14,
  agree3: 14.5,
  agree4: 15,
  disagreeIn: 16,
  peDecision: 19,
  approved: 22,
  logEntry: 23,
  hold: 29,
};

export default function PraxisPE({ active = true }) {
  const [elapsed, setElapsed] = useState(0);
  const [started, setStarted] = useState(false);
  const startRef = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    if (!started) return;
    startRef.current = performance.now();
    const tick = (now) => {
      const s = (now - startRef.current) / 1000;
      setElapsed(s);
      if (s < T.hold + 2) frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [started]);

  useEffect(() => {
    if (active) {
      setElapsed(0);
      setStarted(false);
      const t = setTimeout(() => setStarted(true), 300);
      return () => clearTimeout(t);
    } else {
      setStarted(false);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    }
  }, [active]);

  const phase = (start, dur = 0.5) => Math.max(0, Math.min(1, (elapsed - start) / dur));

  const pulseBtn = elapsed >= T.btnPulse && elapsed < T.btnClick;
  const clicked = elapsed >= T.btnClick;
  const showFlash = elapsed >= T.consiliumFlash && elapsed < T.claudeStart;
  const claudeRunning = elapsed >= T.claudeStart && elapsed < T.claudeDone;
  const claudeDone = elapsed >= T.claudeDone;
  const gptRunning = elapsed >= T.gptStart && elapsed < T.gptDone;
  const gptDone = elapsed >= T.gptDone;
  const showResults = elapsed >= T.resultsIn;
  const showDisagree = elapsed >= T.disagreeIn;
  const showApproveBtn = elapsed >= T.peDecision;
  const approved = elapsed >= T.approved;
  const showLog = elapsed >= T.logEntry;

  return (
    <div style={{
      position: "absolute", inset: 0,
      fontFamily: "'DM Sans', system-ui, sans-serif",
      background: NAVY_DEEP,
      overflow: "hidden",
    }}>
      <link rel="stylesheet" href={FONTS_LINK} />

      {/* Top bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, zIndex: 20,
        height: 36, background: "rgba(27,58,92,0.7)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        display: "flex", alignItems: "center",
        padding: "0 14px", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{
            fontFamily: "'Cinzel', serif", fontSize: 12, fontWeight: 700,
            color: AMBER, letterSpacing: 2,
          }}>PRAXIS</span>
          <span style={{ fontSize: 10, color: "rgba(255,255,255,0.2)" }}>|</span>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>PE Review Queue</span>
        </div>
        <div style={{
          fontSize: 10, color: "rgba(255,255,255,0.35)",
          fontFamily: "'JetBrains Mono', monospace",
        }}>
          R. Martinez, PE (TX-128456) &nbsp;|&nbsp; Apr 2, 2026
        </div>
      </div>

      <div style={{
        position: "absolute", top: 36, left: 0, right: 0, bottom: 0,
        display: "flex",
      }}>
        {/* Left: Calculation package summary */}
        <div style={{
          width: clicked ? 220 : 340,
          transition: "width 0.7s ease",
          background: "rgba(27,58,92,0.3)",
          borderRight: "1px solid rgba(255,255,255,0.06)",
          padding: 16,
          opacity: phase(T.dashIn, 0.8),
          display: "flex", flexDirection: "column", gap: 10,
          flexShrink: 0,
          overflow: "hidden",
        }}>
          <div style={{
            fontFamily: "'Cinzel', serif",
            fontSize: 13, fontWeight: 600, color: PAPER,
          }}>Pile Cap Design Package</div>
          <div style={{
            fontSize: 10, color: "rgba(255,255,255,0.35)",
            fontFamily: "'JetBrains Mono', monospace",
          }}>Submitted by: A. Santos, EIT &nbsp;|&nbsp; Mar 28</div>

          <div style={{
            background: "rgba(255,255,255,0.03)",
            borderRadius: 6, padding: 10,
            border: "1px solid rgba(255,255,255,0.06)",
          }}>
            <div style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", letterSpacing: 1, marginBottom: 6 }}>PACKAGE CONTENTS</div>
            {[
              "Pile Cap Calcs — 7-1 through 7-14",
              "Bearing Capacity Analysis",
              "Pile Driving Analysis (PDA)",
              "Structural Loading Summary",
              "Drawing Set S-1 through S-5",
            ].map((item, i) => (
              <div key={i} style={{
                fontSize: 11, color: "rgba(255,255,255,0.5)",
                padding: "3px 0",
                borderBottom: i < 4 ? "1px solid rgba(255,255,255,0.04)" : "none",
                display: "flex", alignItems: "center", gap: 6,
              }}>
                <span style={{ fontSize: 8, color: "rgba(255,255,255,0.2)" }}>▣</span>
                {item}
              </div>
            ))}
          </div>

          <div style={{
            display: "flex", gap: 6,
          }}>
            <div style={{
              flex: 1, background: "rgba(255,255,255,0.03)",
              borderRadius: 6, padding: "8px 10px",
              border: "1px solid rgba(255,255,255,0.04)",
              textAlign: "center",
            }}>
              <div style={{ fontSize: 9, color: "rgba(255,255,255,0.3)" }}>Pages</div>
              <div style={{ fontSize: 16, fontWeight: 600, color: PAPER, fontFamily: "'JetBrains Mono', monospace" }}>47</div>
            </div>
            <div style={{
              flex: 1, background: "rgba(255,255,255,0.03)",
              borderRadius: 6, padding: "8px 10px",
              border: "1px solid rgba(255,255,255,0.04)",
              textAlign: "center",
            }}>
              <div style={{ fontSize: 9, color: "rgba(255,255,255,0.3)" }}>Drawings</div>
              <div style={{ fontSize: 16, fontWeight: 600, color: PAPER, fontFamily: "'JetBrains Mono', monospace" }}>5</div>
            </div>
            <div style={{
              flex: 1, background: "rgba(255,255,255,0.03)",
              borderRadius: 6, padding: "8px 10px",
              border: "1px solid rgba(255,255,255,0.04)",
              textAlign: "center",
            }}>
              <div style={{ fontSize: 9, color: "rgba(255,255,255,0.3)" }}>QC Status</div>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#4ADE80", fontFamily: "'JetBrains Mono', monospace", marginTop: 2 }}>PASSED</div>
            </div>
          </div>

          {/* Review button */}
          {!clicked && (
            <div style={{
              marginTop: 8,
              padding: "14px",
              background: pulseBtn
                ? `linear-gradient(135deg, rgba(139,92,246,0.3), rgba(139,92,246,0.15))`
                : "rgba(139,92,246,0.08)",
              border: "2px solid rgba(139,92,246,0.5)",
              borderRadius: 8,
              textAlign: "center",
              cursor: "pointer",
              animation: pulseBtn ? "consiliumPulse 1.2s ease-in-out infinite" : "none",
              position: "relative",
            }}>
              <div style={{
                fontSize: 11, fontWeight: 700, letterSpacing: 2,
                color: "#C4B5FD",
              }}>⚡ REVIEW WITH CONSILIUM</div>
              <div style={{
                fontSize: 9, color: "rgba(196,181,253,0.5)", marginTop: 3,
              }}>Dual-model consensus analysis</div>
            </div>
          )}
        </div>

        {/* Right: Consilium analysis */}
        {clicked && (
          <div style={{
            flex: 1,
            display: "flex", flexDirection: "column",
            background: "rgba(15,29,54,0.5)",
            animation: "slideInRight 0.5s ease-out",
            overflow: "hidden",
          }}>
            {/* Consilium header */}
            <div style={{
              padding: "8px 14px",
              borderBottom: "1px solid rgba(139,92,246,0.2)",
              background: "rgba(139,92,246,0.05)",
              display: "flex", alignItems: "center", gap: 8,
            }}>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10, letterSpacing: 2,
                color: "#C4B5FD", fontWeight: 600,
              }}>CONSILIUM</span>
              <span style={{ fontSize: 9, color: "rgba(255,255,255,0.3)" }}>Dual-model consensus engine</span>
            </div>

            <div style={{
              flex: 1, padding: 14, overflowY: "auto",
              display: "flex", flexDirection: "column", gap: 10,
            }}>
              {/* Consilium flash */}
              {showFlash && (
                <div style={{
                  textAlign: "center", padding: "20px 0",
                  opacity: phase(T.consiliumFlash, 0.3),
                }}>
                  <div style={{
                    fontSize: 14, fontWeight: 700, letterSpacing: 4,
                    color: "#C4B5FD",
                  }}>CONSILIUM ACTIVATED</div>
                  <div style={{
                    fontSize: 10, color: "rgba(255,255,255,0.3)", marginTop: 4,
                  }}>Engaging dual reasoning engines</div>
                </div>
              )}

              {/* Model analysis progress */}
              {elapsed >= T.claudeStart && (
                <div style={{
                  display: "flex", gap: 10, opacity: phase(T.claudeStart),
                }}>
                  {/* Claude */}
                  <div style={{
                    flex: 1, background: "rgba(255,255,255,0.03)",
                    borderRadius: 6, padding: "10px 12px",
                    border: claudeDone ? "1px solid rgba(74,222,128,0.2)" : "1px solid rgba(255,255,255,0.06)",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                      <span style={{
                        fontSize: 10, color: claudeDone ? "#4ADE80" : AMBER,
                        animation: claudeRunning ? "spin 1.5s linear infinite" : "none",
                      }}>{claudeDone ? "✓" : "⟳"}</span>
                      <span style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 11, fontWeight: 600, color: PAPER,
                      }}>Claude</span>
                    </div>
                    <div style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 10, color: "rgba(255,255,255,0.4)",
                      lineHeight: 1.5,
                    }}>
                      {claudeRunning && "Analyzing structural calculations..."}
                      {claudeDone && "Analysis complete — 5 findings"}
                    </div>
                  </div>

                  {/* GPT-4o */}
                  {elapsed >= T.gptStart && (
                    <div style={{
                      flex: 1, background: "rgba(255,255,255,0.03)",
                      borderRadius: 6, padding: "10px 12px",
                      border: gptDone ? "1px solid rgba(74,222,128,0.2)" : "1px solid rgba(255,255,255,0.06)",
                      opacity: phase(T.gptStart),
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                        <span style={{
                          fontSize: 10, color: gptDone ? "#4ADE80" : AMBER,
                          animation: gptRunning ? "spin 1.5s linear infinite" : "none",
                        }}>{gptDone ? "✓" : "⟳"}</span>
                        <span style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: 11, fontWeight: 600, color: PAPER,
                        }}>GPT-4o</span>
                      </div>
                      <div style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 10, color: "rgba(255,255,255,0.4)",
                        lineHeight: 1.5,
                      }}>
                        {gptRunning && "Cross-referencing code provisions..."}
                        {gptDone && "Analysis complete — 5 findings"}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Results */}
              {showResults && (
                <div style={{
                  opacity: phase(T.resultsIn, 0.4),
                  display: "flex", flexDirection: "column", gap: 6,
                }}>
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 9, letterSpacing: 1.5,
                    color: "rgba(255,255,255,0.3)", fontWeight: 600,
                    marginBottom: 2,
                  }}>CONSENSUS RESULTS</div>

                  {/* Agree items */}
                  {[
                    { t: T.agree1, label: "Load combinations per ASCE 7-22" },
                    { t: T.agree2, label: "Steel reinforcement — adequate" },
                    { t: T.agree3, label: "Concrete cover — meets ACI 318" },
                    { t: T.agree4, label: "Shear capacity — sufficient" },
                  ].map((item, i) => (
                    elapsed >= item.t && (
                      <div key={i} style={{
                        display: "flex", alignItems: "center", gap: 8,
                        padding: "5px 8px",
                        background: "rgba(74,222,128,0.04)",
                        borderRadius: 4,
                        opacity: phase(item.t, 0.3),
                      }}>
                        <span style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: 8, letterSpacing: 1, fontWeight: 700,
                          color: "#4ADE80",
                          background: "rgba(74,222,128,0.1)",
                          padding: "2px 5px", borderRadius: 3,
                        }}>AGREE</span>
                        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>{item.label}</span>
                      </div>
                    )
                  ))}

                  {/* Disagree item */}
                  {showDisagree && (
                    <div style={{
                      background: "rgba(239,68,68,0.04)",
                      border: "1px solid rgba(239,68,68,0.2)",
                      borderRadius: 6, padding: "10px 12px",
                      borderLeft: "3px solid #EF4444",
                      opacity: phase(T.disagreeIn, 0.5),
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                        <span style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: 8, letterSpacing: 1, fontWeight: 700,
                          color: "#EF4444",
                          background: "rgba(239,68,68,0.1)",
                          padding: "2px 5px", borderRadius: 3,
                        }}>DISAGREE</span>
                        <span style={{ fontSize: 12, fontWeight: 600, color: PAPER }}>
                          Pile Embedment Depth
                        </span>
                      </div>
                      <div style={{ display: "flex", gap: 8, marginBottom: 6 }}>
                        <div style={{
                          flex: 1, background: "rgba(255,255,255,0.03)",
                          borderRadius: 4, padding: "6px 8px",
                        }}>
                          <div style={{ fontSize: 9, color: AMBER, fontWeight: 600, marginBottom: 3 }}>Claude</div>
                          <div style={{ fontSize: 10.5, color: "rgba(255,255,255,0.6)", lineHeight: 1.4 }}>
                            42 ft embedment per Geotech Report §4.2 — bearing stratum at EL -38
                          </div>
                        </div>
                        <div style={{
                          flex: 1, background: "rgba(255,255,255,0.03)",
                          borderRadius: 4, padding: "6px 8px",
                        }}>
                          <div style={{ fontSize: 9, color: "#6EE7B7", fontWeight: 600, marginBottom: 3 }}>GPT-4o</div>
                          <div style={{ fontSize: 10.5, color: "rgba(255,255,255,0.6)", lineHeight: 1.4 }}>
                            38 ft sufficient per Boring B-7 — reinterprets bearing stratum at EL -34
                          </div>
                        </div>
                      </div>
                      <div style={{
                        fontSize: 10, color: "#F59E0B", fontStyle: "italic",
                        display: "flex", alignItems: "center", gap: 5,
                      }}>
                        <span style={{ fontSize: 12 }}>⚠</span>
                        Engineering judgment required — geotech interpretation varies by boring location
                      </div>
                    </div>
                  )}

                  {/* PE Approve button */}
                  {showApproveBtn && !approved && (
                    <div style={{
                      padding: "14px",
                      background: "rgba(196,136,58,0.08)",
                      border: "2px solid rgba(196,136,58,0.4)",
                      borderRadius: 8, textAlign: "center",
                      animation: "consiliumPulse 1.5s ease-in-out infinite",
                      opacity: phase(T.peDecision, 0.5),
                    }}>
                      <div style={{
                        fontSize: 12, fontWeight: 700, letterSpacing: 2,
                        color: AMBER,
                      }}>APPROVE — RESPONSIBLE CHARGE</div>
                      <div style={{
                        fontSize: 9, color: "rgba(255,255,255,0.35)", marginTop: 3,
                      }}>I accept professional responsibility for this work product</div>
                    </div>
                  )}

                  {/* Approved + log entry */}
                  {approved && (
                    <div style={{
                      background: "rgba(74,222,128,0.04)",
                      border: "1px solid rgba(74,222,128,0.2)",
                      borderRadius: 8, padding: "12px 14px",
                      opacity: phase(T.approved, 0.5),
                    }}>
                      <div style={{
                        display: "flex", alignItems: "center", gap: 8, marginBottom: 8,
                      }}>
                        <span style={{ fontSize: 16, color: "#4ADE80" }}>✓</span>
                        <div>
                          <div style={{
                            fontFamily: "'Cinzel', serif",
                            fontSize: 13, fontWeight: 700, color: "#4ADE80",
                            letterSpacing: 1,
                          }}>RESPONSIBLE CHARGE DECLARED</div>
                          <div style={{
                            fontSize: 9, color: "rgba(255,255,255,0.4)", marginTop: 2,
                          }}>PE judgment applied — 42 ft embedment confirmed per §4.2</div>
                        </div>
                      </div>

                      {showLog && (
                        <div style={{
                          background: "rgba(0,0,0,0.3)",
                          borderRadius: 4, padding: "8px 10px",
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: 10, color: "rgba(255,255,255,0.45)",
                          lineHeight: 1.6,
                          opacity: phase(T.logEntry, 0.5),
                        }}>
                          <div style={{ color: "rgba(255,255,255,0.25)", fontSize: 8, letterSpacing: 1.5, marginBottom: 4 }}>IMMUTABLE AUDIT LOG</div>
                          <div><span style={{ color: "rgba(255,255,255,0.3)" }}>timestamp:</span> <span style={{ color: PAPER }}>2026-04-02T14:23:17Z</span></div>
                          <div><span style={{ color: "rgba(255,255,255,0.3)" }}>pe:</span> <span style={{ color: PAPER }}>R. Martinez, PE TX-128456</span></div>
                          <div><span style={{ color: "rgba(255,255,255,0.3)" }}>scope:</span> <span style={{ color: PAPER }}>Pile Cap Design — 7-1 through 7-14</span></div>
                          <div><span style={{ color: "rgba(255,255,255,0.3)" }}>consilium:</span> <span style={{ color: "#C4B5FD" }}>4 AGREE, 1 DISAGREE (resolved)</span></div>
                          <div><span style={{ color: "rgba(255,255,255,0.3)" }}>action:</span> <span style={{ color: "#4ADE80" }}>APPROVED</span></div>
                          <div style={{ marginTop: 4, color: "#F59E0B", fontSize: 9 }}>⊘ UPDATE/DELETE prohibited — compliance trigger active</div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(30px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes consiliumPulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 8px rgba(139,92,246,0.15); }
          50% { transform: scale(1.02); box-shadow: 0 0 20px rgba(139,92,246,0.3); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
