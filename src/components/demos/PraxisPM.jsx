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
  qDone: 6,
  rStart: 6.5,
  r1: 7,
  r2: 8.5,
  r3: 10,
  r4: 11.5,
  answerStart: 13,
  row1: 13.5,
  row2: 15,
  row3: 16.5,
  actionsIn: 18.5,
  hold: 25,
};

export default function PraxisPM({ active = true }) {
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
  const showAnswer = elapsed >= T.answerStart;

  const questionText = "Give me the real status on the wharf project.";
  const typedQ = showQ ? typeText(questionText, T.qStart, T.qDone) : "";

  // Project phases for sidebar
  const phases = [
    { name: "Site Survey", pct: 100 },
    { name: "Geotech", pct: 100 },
    { name: "Design", pct: 65 },
    { name: "QC Review", pct: 40 },
    { name: "PE Review", pct: 15 },
    { name: "Permitting", pct: 0 },
    { name: "Construction", pct: 0 },
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
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>Projects</span>
        </div>
        <div style={{
          fontSize: 10, color: "rgba(255,255,255,0.35)",
          fontFamily: "'JetBrains Mono', monospace",
        }}>
          J. Park — Project Manager &nbsp;|&nbsp; Apr 2, 2026
        </div>
      </div>

      <div style={{
        position: "absolute", top: 36, left: 0, right: 0, bottom: 0,
        display: "flex",
      }}>
        {/* Left: Project phases */}
        <div style={{
          width: showQ ? 160 : 240,
          transition: "width 0.7s ease",
          background: "rgba(27,58,92,0.3)",
          borderRight: "1px solid rgba(255,255,255,0.06)",
          padding: 14,
          opacity: phase(T.dashIn, 0.8),
          flexShrink: 0,
          overflow: "hidden",
        }}>
          <div style={{
            fontFamily: "'Cinzel', serif",
            fontSize: 13, fontWeight: 600, color: PAPER, marginBottom: 4,
          }}>Wharf 7 Rehabilitation</div>
          <div style={{
            fontSize: 10, color: "rgba(255,255,255,0.3)",
            fontFamily: "'JetBrains Mono', monospace",
            marginBottom: 12,
          }}>Contract: $185,000</div>

          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {phases.map((p, i) => (
              <div key={i}>
                <div style={{
                  display: "flex", justifyContent: "space-between",
                  fontSize: 10, marginBottom: 3,
                }}>
                  <span style={{ color: "rgba(255,255,255,0.5)" }}>{p.name}</span>
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    color: p.pct === 100 ? "#4ADE80" : p.pct > 0 ? AMBER_LIGHT : "rgba(255,255,255,0.2)",
                    fontWeight: 600, fontSize: 10,
                  }}>{p.pct}%</span>
                </div>
                <div style={{
                  height: 3, borderRadius: 2,
                  background: "rgba(255,255,255,0.06)",
                }}>
                  <div style={{
                    height: "100%", borderRadius: 2,
                    width: p.pct + "%",
                    background: p.pct === 100 ? "#4ADE80" : p.pct > 0 ? AMBER : "transparent",
                    transition: "width 0.3s",
                  }} />
                </div>
              </div>
            ))}
          </div>

          <div style={{
            marginTop: 14, padding: "8px 10px",
            background: "rgba(255,255,255,0.03)",
            borderRadius: 6,
            border: "1px solid rgba(255,255,255,0.04)",
          }}>
            <div style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", letterSpacing: 1, marginBottom: 4 }}>REPORTED STATUS</div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "rgba(255,255,255,0.5)", padding: "2px 0" }}>
              <span>Design</span><span style={{ color: "#4ADE80", fontWeight: 600 }}>65%</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "rgba(255,255,255,0.5)", padding: "2px 0" }}>
              <span>Budget</span><span style={{ color: "#4ADE80", fontWeight: 600 }}>On Track</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "rgba(255,255,255,0.5)", padding: "2px 0" }}>
              <span>Schedule</span><span style={{ color: "#4ADE80", fontWeight: 600 }}>On Track</span>
            </div>
          </div>
        </div>

        {/* Right: Chat panel */}
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
              Cross-referencing 32 project documents
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

              {/* Reasoning */}
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
                      <RStep label="Scanning submittals and transmittals" done={elapsed >= T.r2} fade={phase(T.r1)} />
                    )}
                    {elapsed >= T.r2 && (
                      <RStep label="Cross-referencing QC review log" done={elapsed >= T.r3} fade={phase(T.r2)} />
                    )}
                    {elapsed >= T.r3 && (
                      <RStep label="Checking RFI register against specs" done={elapsed >= T.r4} fade={phase(T.r3)} />
                    )}
                    {elapsed >= T.r4 && (
                      <RStep
                        label={showAnswer ? "3 discrepancies found" : "Comparing reported vs. actual progress"}
                        done={showAnswer}
                        fade={phase(T.r4)}
                        loading={!showAnswer}
                        warn={showAnswer}
                      />
                    )}

                    {/* Discrepancy reveal */}
                    {showAnswer && (
                      <div style={{
                        marginTop: 4, paddingTop: 8,
                        borderTop: "1px solid rgba(239,68,68,0.2)",
                        display: "flex", flexDirection: "column", gap: 8,
                      }}>
                        <div style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: 9, letterSpacing: 1.5,
                          color: "#EF4444", fontWeight: 600,
                        }}>REPORTED vs. ACTUAL</div>

                        {/* Discrepancy 1: Design progress */}
                        {elapsed >= T.row1 && (
                          <DiscrepancyRow
                            fade={phase(T.row1, 0.4)}
                            icon="▤"
                            title="Design Completion"
                            reported="65%"
                            actual="58%"
                            reportedColor="#4ADE80"
                            actualColor="#F59E0B"
                            detail="QC returned Pile Driving Analysis and Pile Cap 7-9 package. Both need revision — effective design progress is lower than reported."
                            source="QC_Review_Register.xlsx — Rows 12, 14"
                          />
                        )}

                        {/* Discrepancy 2: Spec conflict */}
                        {elapsed >= T.row2 && (
                          <DiscrepancyRow
                            fade={phase(T.row2, 0.4)}
                            icon="⚑"
                            title="Unflagged Spec Conflict"
                            reported="—"
                            actual="FOUND"
                            reportedColor="rgba(255,255,255,0.3)"
                            actualColor="#EF4444"
                            detail="Contractor RFI #47 references a conflict between Section 03300 (Cast-in-Place Concrete) and Drawing S-4 Note 3 on reinforcement cover. Nobody on the team has responded."
                            source="RFI_Log.xlsx — Row 47 · S-4_Structural.pdf — Note 3"
                          />
                        )}

                        {/* Discrepancy 3: Geotech dependency */}
                        {elapsed >= T.row3 && (
                          <DiscrepancyRow
                            fade={phase(T.row3, 0.4)}
                            icon="◷"
                            title="Blocking Dependency"
                            reported="On Track"
                            actual="BLOCKED"
                            reportedColor="#4ADE80"
                            actualColor="#EF4444"
                            detail="Supplemental geotech investigation (Borings B-12 through B-15) has not been received. Pile design for Bents 9-14 cannot be finalized without this data."
                            source="Geotech_Proposal_Supp.pdf · Email: geosolutions@... Mar 14"
                          />
                        )}

                        {/* Auto-generated actions */}
                        {elapsed >= T.actionsIn && (
                          <div style={{
                            background: "rgba(196,136,58,0.06)",
                            border: "1px solid rgba(196,136,58,0.2)",
                            borderRadius: 6, padding: "10px 12px",
                            opacity: phase(T.actionsIn, 0.5),
                          }}>
                            <div style={{
                              fontFamily: "'JetBrains Mono', monospace",
                              fontSize: 9, letterSpacing: 1.5,
                              color: AMBER, fontWeight: 600, marginBottom: 5,
                            }}>RECOMMENDED ACTIONS</div>
                            <div style={{
                              fontSize: 11.5, color: "rgba(255,255,255,0.7)",
                              lineHeight: 1.6,
                            }}>
                              Update design progress to 58% in next status report. Assign RFI #47 to lead structural — spec conflict needs resolution before next submittal. Contact GeoSolutions on supplemental boring schedule — this is the critical path item.
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
              }}>Ask about schedule, budget, submittals...</div>
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
      `}</style>
    </div>
  );
}

function DiscrepancyRow({ fade, icon, title, reported, actual, reportedColor, actualColor, detail, source }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.02)",
      border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: 6, padding: "8px 10px",
      borderLeft: `3px solid ${actualColor}`,
      opacity: fade,
    }}>
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        marginBottom: 5,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 11, color: AMBER }}>{icon}</span>
          <span style={{ fontSize: 11.5, fontWeight: 600, color: PAPER }}>{title}</span>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 7, color: "rgba(255,255,255,0.25)", letterSpacing: 1 }}>REPORTED</div>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12, fontWeight: 600, color: reportedColor,
              textDecoration: "line-through", textDecorationColor: "rgba(239,68,68,0.6)",
            }}>{reported}</div>
          </div>
          <span style={{ color: "rgba(255,255,255,0.15)", fontSize: 12 }}>→</span>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 7, color: "rgba(255,255,255,0.25)", letterSpacing: 1 }}>ACTUAL</div>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12, fontWeight: 600, color: actualColor,
            }}>{actual}</div>
          </div>
        </div>
      </div>
      <div style={{ fontSize: 10.5, color: "rgba(255,255,255,0.5)", lineHeight: 1.5, marginBottom: 4 }}>{detail}</div>
      <div style={{
        fontSize: 9, color: "rgba(255,255,255,0.25)",
        fontFamily: "'JetBrains Mono', monospace",
      }}>{source}</div>
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

function RStep({ label, done, fade, loading, warn }) {
  return (
    <div style={{ opacity: fade }}>
      <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
        <span style={{
          fontSize: 11,
          color: done ? (warn ? "#F59E0B" : "#4ADE80") : AMBER,
          transition: "color 0.3s",
          animation: loading ? "spin 1.5s linear infinite" : "none",
        }}>{done ? (warn ? "⚠" : "✓") : loading ? "⟳" : "◎"}</span>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11, color: done && warn ? "#F59E0B" : "rgba(255,255,255,0.5)",
          fontWeight: done && warn ? 600 : 400,
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
