import { useState, useEffect, useRef } from "react";

const NAVY = "#1B3A5C";
const NAVY_DEEP = "#0F1D36";
const AMBER = "#C4883A";
const AMBER_LIGHT = "#D4A65A";
const PAPER = "#FAF7F2";

const FONTS_LINK = "https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=DM+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap";

const T = {
  dashIn: 0,
  settle: 2.5,
  qStart: 3,
  qDone: 6.5,
  rStart: 7,
  r1: 7.5,
  r2: 9,
  codeRefsIn: 10.5,
  methodStart: 12.5,
  step1: 13,
  step2: 14,
  step3: 15,
  stopMsg: 16.5,
  submitClick: 19,
  qcFlags: 20,
  competency: 21.5,
  hold: 26,
};

export default function PraxisEIT({ active = true }) {
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
  const typeText = (text, startT, endT) => {
    const p = Math.max(0, Math.min(1, (elapsed - startT) / (endT - startT)));
    return text.substring(0, Math.floor(text.length * p));
  };

  const showQ = elapsed >= T.qStart;
  const showR = elapsed >= T.rStart;
  const showCodes = elapsed >= T.codeRefsIn;
  const showMethod = elapsed >= T.methodStart;
  const showStop = elapsed >= T.stopMsg;
  const submitted = elapsed >= T.submitClick;
  const showFlags = elapsed >= T.qcFlags;
  const showComp = elapsed >= T.competency;

  const questionText = "How do I check the wave loading on this bulkhead?";
  const typedQ = showQ ? typeText(questionText, T.qStart, T.qDone) : "";

  const tasks = [
    { name: "Pile Cap Calcs — Bent 7", status: "submitted", active: false },
    { name: "Bulkhead Wave Loading", status: "in progress", active: true },
    { name: "Fender System Review", status: "assigned", active: false },
    { name: "Concrete Mix Design", status: "assigned", active: false },
  ];

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
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>Workspace</span>
        </div>
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          fontSize: 10, color: "rgba(255,255,255,0.35)",
          fontFamily: "'JetBrains Mono', monospace",
        }}>
          <span style={{
            fontSize: 8, letterSpacing: 1, fontWeight: 700,
            color: "#3B82F6",
            background: "rgba(59,130,246,0.1)",
            padding: "2px 6px", borderRadius: 3,
            border: "1px solid rgba(59,130,246,0.3)",
          }}>EIT-2</span>
          A. Santos &nbsp;|&nbsp; Apr 2, 2026
        </div>
      </div>

      <div style={{
        position: "absolute", top: 36, left: 0, right: 0, bottom: 0,
        display: "flex",
      }}>
        {/* Left: Task list */}
        <div style={{
          width: showQ ? 150 : 200,
          transition: "width 0.7s ease",
          background: "rgba(27,58,92,0.3)",
          borderRight: "1px solid rgba(255,255,255,0.06)",
          padding: "12px 0",
          opacity: phase(T.dashIn, 0.8),
          flexShrink: 0,
          overflow: "hidden",
        }}>
          <div style={{
            padding: "0 12px 10px",
            fontSize: 9, letterSpacing: 1.5,
            color: "rgba(255,255,255,0.3)", fontWeight: 600,
            textTransform: "uppercase",
          }}>My Tasks</div>

          {tasks.map((task, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "7px 12px",
              background: task.active ? "rgba(196,136,58,0.08)" : "transparent",
              borderLeft: task.active ? `3px solid ${AMBER}` : "3px solid transparent",
            }}>
              <div style={{
                width: 6, height: 6, borderRadius: "50%",
                background: task.status === "submitted" ? "#4ADE80"
                  : task.status === "in progress" ? AMBER
                  : "rgba(255,255,255,0.15)",
              }} />
              <div>
                <div style={{
                  fontSize: 10,
                  color: task.active ? PAPER : "rgba(255,255,255,0.5)",
                  fontWeight: task.active ? 600 : 400,
                }}>{task.name}</div>
                <div style={{
                  fontSize: 8,
                  color: task.status === "submitted" ? "#4ADE80"
                    : task.status === "in progress" ? "rgba(196,136,58,0.6)"
                    : "rgba(255,255,255,0.2)",
                  textTransform: "uppercase", letterSpacing: 0.5,
                }}>{task.status}</div>
              </div>
            </div>
          ))}

          {/* Competency tracker */}
          <div style={{
            margin: "16px 12px 0", padding: "8px 10px",
            background: "rgba(255,255,255,0.03)",
            borderRadius: 6, border: "1px solid rgba(255,255,255,0.06)",
          }}>
            <div style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", letterSpacing: 1, marginBottom: 6 }}>COMPETENCY</div>
            {[
              { area: "Structural", level: 3, max: 5 },
              { area: "Coastal", level: showComp ? 3 : 2, max: 5, highlight: showComp },
              { area: "Geotech", level: 2, max: 5 },
            ].map((c, i) => (
              <div key={i} style={{ marginBottom: 4 }}>
                <div style={{
                  display: "flex", justifyContent: "space-between",
                  fontSize: 9, marginBottom: 2,
                }}>
                  <span style={{ color: c.highlight ? AMBER : "rgba(255,255,255,0.4)" }}>{c.area}</span>
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 9, color: c.highlight ? AMBER : "rgba(255,255,255,0.3)",
                    fontWeight: c.highlight ? 600 : 400,
                  }}>{c.level}/{c.max}</span>
                </div>
                <div style={{ display: "flex", gap: 2 }}>
                  {Array.from({ length: c.max }, (_, j) => (
                    <div key={j} style={{
                      flex: 1, height: 3, borderRadius: 1,
                      background: j < c.level
                        ? (c.highlight && j === c.level - 1 ? AMBER : "#4ADE80")
                        : "rgba(255,255,255,0.06)",
                      transition: "background 0.5s ease",
                    }} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Chat */}
        {showQ && (
          <div style={{
            flex: 1,
            display: "flex", flexDirection: "column",
            borderLeft: "1px solid rgba(196,136,58,0.12)",
            background: "rgba(15,29,54,0.5)",
            animation: "slideInRight 0.5s ease-out",
            minWidth: 0,
          }}>
            <div style={{
              padding: "8px 14px",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              fontSize: 11, color: "rgba(255,255,255,0.4)",
              display: "flex", alignItems: "center", gap: 6,
            }}>
              <div style={{
                width: 6, height: 6, borderRadius: "50%",
                background: "#4ADE80",
                boxShadow: "0 0 4px rgba(74,222,128,0.5)",
              }} />
              Wharf 7 Rehabilitation — Bulkhead Design
            </div>

            <div style={{
              flex: 1, padding: 14, overflowY: "auto",
              display: "flex", flexDirection: "column", gap: 10,
            }}>
              {/* User question */}
              <div style={{ alignSelf: "flex-end", maxWidth: "85%" }}>
                <div style={{
                  background: "rgba(196,136,58,0.12)",
                  border: "1px solid rgba(196,136,58,0.25)",
                  borderRadius: "12px 12px 2px 12px",
                  padding: "10px 14px",
                }}>
                  <div style={{ fontSize: 14, color: PAPER, lineHeight: 1.4 }}>
                    {typedQ}
                    {typedQ.length < questionText.length && <Cursor />}
                  </div>
                </div>
              </div>

              {/* Reasoning + Response */}
              {showR && (
                <div style={{ alignSelf: "flex-start", maxWidth: "95%" }}>
                  <div style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: "12px 12px 12px 2px",
                    padding: "12px 14px",
                    display: "flex", flexDirection: "column", gap: 8,
                  }}>
                    {elapsed >= T.r1 && (
                      <RStep label="Identifying applicable standards" done={elapsed >= T.r2} fade={phase(T.r1)} />
                    )}
                    {elapsed >= T.r2 && (
                      <RStep label="Loading project design parameters" done={showCodes} fade={phase(T.r2)} loading={!showCodes} />
                    )}

                    {/* Code references */}
                    {showCodes && (
                      <div style={{
                        background: "rgba(59,130,246,0.04)",
                        border: "1px solid rgba(59,130,246,0.15)",
                        borderRadius: 6, padding: "10px 12px",
                        opacity: phase(T.codeRefsIn, 0.5),
                      }}>
                        <div style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: 9, letterSpacing: 1.5,
                          color: "#93C5FD", fontWeight: 600, marginBottom: 6,
                        }}>GOVERNING STANDARDS</div>
                        {[
                          { code: "ASCE 7-22", section: "§6.7 — Wave Loads", note: "Design wave height, breaking criteria" },
                          { code: "UFC 4-152-01", section: "Ch. 5 — Bulkhead Design", note: "Load combinations for waterfront structures" },
                          { code: "USACE EM 1110-2-1614", section: "§3-4 — Sheet Pile Walls", note: "Earth pressure + hydrostatic loading" },
                        ].map((ref, i) => (
                          <div key={i} style={{
                            display: "flex", gap: 8, padding: "4px 0",
                            borderBottom: i < 2 ? "1px solid rgba(59,130,246,0.08)" : "none",
                          }}>
                            <span style={{
                              fontFamily: "'JetBrains Mono', monospace",
                              fontSize: 10, color: "#60A5FA", fontWeight: 600,
                              minWidth: 90,
                            }}>{ref.code}</span>
                            <div>
                              <div style={{ fontSize: 11, color: PAPER }}>{ref.section}</div>
                              <div style={{ fontSize: 9, color: "rgba(255,255,255,0.35)" }}>{ref.note}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Methodology walkthrough */}
                    {showMethod && (
                      <div style={{
                        opacity: phase(T.methodStart, 0.5),
                        display: "flex", flexDirection: "column", gap: 6,
                      }}>
                        <div style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: 9, letterSpacing: 1.5,
                          color: AMBER, fontWeight: 600,
                        }}>METHODOLOGY</div>

                        {[
                          { t: T.step1, num: "1", text: "Determine design wave height from ASCE 7-22 §6.7.1 using your project's exposure category and fetch length. Your BOD specifies a 50-year return period." },
                          { t: T.step2, num: "2", text: "Calculate wave pressure distribution per UFC 4-152-01 Figure 5-3. Apply dynamic wave load at the stillwater level plus wave runup." },
                          { t: T.step3, num: "3", text: "Combine with earth pressure (USACE EM 1110-2-1614 §3-4) and hydrostatic loads. Use ASCE 7-22 §2.3.1 load combinations. Check embedment depth governs stability." },
                        ].map((step, i) => (
                          elapsed >= step.t && (
                            <div key={i} style={{
                              display: "flex", gap: 8,
                              opacity: phase(step.t, 0.4),
                            }}>
                              <div style={{
                                width: 20, height: 20, borderRadius: "50%",
                                background: "rgba(196,136,58,0.12)",
                                border: "1px solid rgba(196,136,58,0.3)",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                fontSize: 10, fontWeight: 600, color: AMBER,
                                flexShrink: 0,
                              }}>{step.num}</div>
                              <div style={{
                                fontSize: 11, color: "rgba(255,255,255,0.6)",
                                lineHeight: 1.5,
                              }}>{step.text}</div>
                            </div>
                          )
                        ))}
                      </div>
                    )}

                    {/* STOP message */}
                    {showStop && !submitted && (
                      <div style={{
                        background: "rgba(196,136,58,0.06)",
                        border: "2px solid rgba(196,136,58,0.3)",
                        borderRadius: 8, padding: "12px 14px",
                        opacity: phase(T.stopMsg, 0.5),
                      }}>
                        <div style={{
                          fontSize: 12, color: AMBER, fontWeight: 600, marginBottom: 6,
                          display: "flex", alignItems: "center", gap: 6,
                        }}>
                          <span style={{ fontSize: 14 }}>▣</span>
                          YOUR TURN
                        </div>
                        <div style={{
                          fontSize: 11.5, color: "rgba(255,255,255,0.65)",
                          lineHeight: 1.55,
                        }}>
                          I've outlined the applicable approach and governing load cases. Complete your calculation using these parameters and submit for PE review. I'll flag any items that need attention.
                        </div>
                        <div style={{
                          marginTop: 10, padding: "10px",
                          background: "rgba(196,136,58,0.08)",
                          border: "1px solid rgba(196,136,58,0.2)",
                          borderRadius: 6, textAlign: "center",
                          animation: "submitPulse 1.5s ease-in-out infinite",
                        }}>
                          <div style={{
                            fontSize: 11, fontWeight: 700, letterSpacing: 2,
                            color: AMBER,
                          }}>SUBMIT FOR PE REVIEW →</div>
                        </div>
                      </div>
                    )}

                    {/* After submit: QC flags + competency */}
                    {submitted && (
                      <div style={{
                        display: "flex", flexDirection: "column", gap: 8,
                        opacity: phase(T.submitClick, 0.5),
                      }}>
                        <div style={{
                          background: "rgba(74,222,128,0.04)",
                          border: "1px solid rgba(74,222,128,0.15)",
                          borderRadius: 6, padding: "8px 10px",
                        }}>
                          <div style={{
                            display: "flex", alignItems: "center", gap: 6,
                            fontSize: 11, fontWeight: 600, color: "#4ADE80",
                          }}>
                            <span>✓</span> Submitted — routed to R. Martinez, PE for review
                          </div>
                        </div>

                        {showFlags && (
                          <div style={{
                            background: "rgba(255,255,255,0.02)",
                            border: "1px solid rgba(255,255,255,0.06)",
                            borderRadius: 6, padding: "10px 12px",
                            opacity: phase(T.qcFlags, 0.4),
                          }}>
                            <div style={{
                              fontFamily: "'JetBrains Mono', monospace",
                              fontSize: 9, letterSpacing: 1.5,
                              color: "rgba(255,255,255,0.3)", fontWeight: 600, marginBottom: 6,
                            }}>AUTO-GENERATED QC FLAGS</div>
                            {[
                              "Verify wave height calculation matches BOD criteria (50-yr return)",
                              "Confirm earth pressure coefficient — active vs. at-rest per soil type",
                              "Check embedment depth exceeds minimum per USACE Table 3-2",
                            ].map((flag, i) => (
                              <div key={i} style={{
                                display: "flex", alignItems: "flex-start", gap: 6,
                                padding: "3px 0",
                                fontSize: 10.5, color: "rgba(255,255,255,0.5)",
                                lineHeight: 1.4,
                              }}>
                                <span style={{ color: "#F59E0B", fontSize: 8, marginTop: 3 }}>▸</span>
                                {flag}
                              </div>
                            ))}
                          </div>
                        )}

                        {showComp && (
                          <div style={{
                            background: "rgba(196,136,58,0.06)",
                            border: "1px solid rgba(196,136,58,0.2)",
                            borderRadius: 6, padding: "10px 12px",
                            opacity: phase(T.competency, 0.5),
                            display: "flex", alignItems: "center", gap: 12,
                          }}>
                            <div>
                              <div style={{
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: 9, letterSpacing: 1.5,
                                color: AMBER, fontWeight: 600, marginBottom: 3,
                              }}>COMPETENCY UPDATED</div>
                              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>
                                Coastal Engineering: <span style={{ color: AMBER, fontWeight: 600 }}>2/5 → 3/5</span>
                              </div>
                              <div style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", marginTop: 2 }}>
                                Wave loading analysis — completed with guidance
                              </div>
                            </div>
                            <div style={{ display: "flex", gap: 2, flexShrink: 0 }}>
                              {[0, 1, 2, 3, 4].map(j => (
                                <div key={j} style={{
                                  width: 16, height: 6, borderRadius: 2,
                                  background: j < 3 ? AMBER : "rgba(255,255,255,0.08)",
                                  transition: "background 0.3s",
                                }} />
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div style={{
              padding: "8px 12px",
              borderTop: "1px solid rgba(255,255,255,0.06)",
              display: "flex", alignItems: "center", gap: 8,
            }}>
              <div style={{
                flex: 1, background: "rgba(255,255,255,0.04)",
                borderRadius: 8, padding: "9px 12px",
                fontSize: 12, color: "rgba(255,255,255,0.25)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}>Ask about codes, calculations, methods...</div>
              <div style={{
                width: 32, height: 32, borderRadius: 8,
                background: "rgba(196,136,58,0.15)",
                border: "1px solid rgba(196,136,58,0.3)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: AMBER, fontSize: 13,
              }}>↑</div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(30px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes dotPulse {
          0%, 80%, 100% { opacity: 0.2; }
          40% { opacity: 1; }
        }
        @keyframes submitPulse {
          0%, 100% { box-shadow: 0 0 8px rgba(196,136,58,0.15); }
          50% { box-shadow: 0 0 16px rgba(196,136,58,0.3); }
        }
      `}</style>
    </div>
  );
}

function Cursor() {
  return (
    <span style={{
      display: "inline-block", width: 2, height: 14,
      background: AMBER, marginLeft: 1,
      verticalAlign: "text-bottom",
      animation: "blink 0.6s step-end infinite",
    }} />
  );
}

function RStep({ label, done, fade, loading }) {
  return (
    <div style={{ opacity: fade }}>
      <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
        <span style={{
          fontSize: 11,
          color: done ? "#4ADE80" : AMBER,
          transition: "color 0.3s",
          animation: loading ? "spin 1.5s linear infinite" : "none",
        }}>{done ? "✓" : loading ? "⟳" : "◎"}</span>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11, color: "rgba(255,255,255,0.5)",
        }}>{label}</span>
        {loading && <LoadingDots />}
      </div>
    </div>
  );
}

function LoadingDots() {
  return (
    <span style={{ display: "inline-flex", gap: 3, marginLeft: 4 }}>
      {[0, 1, 2].map(i => (
        <span key={i} style={{
          width: 4, height: 4, borderRadius: "50%",
          background: "rgba(255,255,255,0.4)",
          animation: `dotPulse 1.4s ease-in-out ${i * 0.2}s infinite`,
        }} />
      ))}
    </span>
  );
}
