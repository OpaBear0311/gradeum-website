'use client'
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
  qStart: 3.2,
  qDone: 5.5,
  rStart: 6.2,
  r1: 6.5,
  r2: 8,
  r3: 9.5,
  answerStart: 11,
  card1: 11.5,
  card2: 13,
  card3: 14.5,
  summaryIn: 16,
  hold: 23,
};

export default function CivitasAssetManager({ active }) {
  const [elapsed, setElapsed] = useState(0);
  const [started, setStarted] = useState(false);
  const startRef = useRef(null);
  const frameRef = useRef(null);

  // Active-driven reset
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

  const phase = (start, dur = 0.5) => Math.max(0, Math.min(1, (elapsed - start) / dur));
  const typeText = (text, startT, endT) => {
    const p = Math.max(0, Math.min(1, (elapsed - startT) / (endT - startT)));
    return text.substring(0, Math.floor(text.length * p));
  };

  const showQ = elapsed >= T.qStart;
  const showR = elapsed >= T.rStart;
  const showAnswer = elapsed >= T.answerStart;

  const questionText = "I'm briefing the board tomorrow on Dock 7. What do they need to know?";
  const typedQ = showQ ? typeText(questionText, T.qStart, T.qDone) : "";

  return (
    <div style={{
      position: "absolute", inset: 0,
      fontFamily: "'DM Sans', system-ui, sans-serif",
      overflow: "hidden",
      background: NAVY_DEEP,
    }}>
      <link rel="stylesheet" href={FONTS_LINK} />

      {/* Top bar - office mode, not field mode */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, zIndex: 20,
        height: 36, background: "rgba(27,58,92,0.7)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        display: "flex", alignItems: "center",
        padding: "0 14px", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{
            fontFamily: "'Cinzel', serif",
            fontSize: 12, fontWeight: 700,
            color: AMBER, letterSpacing: 2,
          }}>CIVITAS</span>
          <span style={{ fontSize: 10, color: "rgba(255,255,255,0.2)" }}>|</span>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>
            Command Center
          </span>
        </div>
        <div style={{
          fontSize: 10, color: "rgba(255,255,255,0.35)",
          fontFamily: "'JetBrains Mono', monospace",
        }}>
          R. Cabrera — Asset Manager &nbsp;|&nbsp; Apr 2, 2026
        </div>
      </div>

      {/* Main layout */}
      <div style={{
        position: "absolute", top: 36, left: 0, right: 0, bottom: 0,
        display: "flex",
      }}>
        {/* Left sidebar - asset list */}
        <div style={{
          width: 200,
          background: "rgba(27,58,92,0.4)",
          borderRight: "1px solid rgba(255,255,255,0.06)",
          padding: "12px 0",
          opacity: phase(T.dashIn, 0.8),
          flexShrink: 0,
        }}>
          <div style={{
            padding: "0 12px 10px",
            fontSize: 9, letterSpacing: 1.5,
            color: "rgba(255,255,255,0.3)", fontWeight: 600,
            textTransform: "uppercase",
          }}>Facilities</div>

          {[
            { name: "Cargo Dock 1–6", status: "good" },
            { name: "Cargo Dock 7", status: "alert", active: true },
            { name: "Cargo Dock 8–12", status: "good" },
            { name: "Bulk Terminal", status: "good" },
            { name: "Grain Elevator 2", status: "warn" },
            { name: "Admin Building", status: "good" },
            { name: "Warehouse A", status: "good" },
            { name: "Warehouse B", status: "alert" },
          ].map((item, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "7px 12px",
              background: item.active ? "rgba(196,136,58,0.08)" : "transparent",
              borderLeft: item.active ? `3px solid ${AMBER}` : "3px solid transparent",
              cursor: "default",
            }}>
              <div style={{
                width: 6, height: 6, borderRadius: "50%",
                background: item.status === "good" ? "#4ADE80"
                  : item.status === "warn" ? "#F59E0B"
                  : "#EF4444",
                boxShadow: item.status === "alert"
                  ? "0 0 6px rgba(239,68,68,0.5)" : "none",
              }} />
              <span style={{
                fontSize: 11,
                color: item.active ? PAPER : "rgba(255,255,255,0.5)",
                fontWeight: item.active ? 600 : 400,
              }}>{item.name}</span>
            </div>
          ))}
        </div>

        {/* Center - summary stats for selected asset */}
        <div style={{
          flex: showQ ? "0 0 200px" : "1",
          transition: "flex 0.7s ease",
          padding: 14,
          opacity: phase(T.dashIn, 0.8),
          display: "flex", flexDirection: "column", gap: 10,
          overflow: "hidden",
        }}>
          <div style={{
            fontFamily: "'Cinzel', serif",
            fontSize: 15, fontWeight: 600, color: PAPER,
            marginBottom: 2,
          }}>Cargo Dock 7</div>

          {[
            { label: "Condition Rating", value: "FAIR", color: "#F59E0B" },
            { label: "Open Work Orders", value: "4", color: PAPER },
            { label: "Last Inspection", value: "Oct 2024", color: "rgba(255,255,255,0.6)" },
            { label: "Next Scheduled", value: "Apr 2026", color: AMBER_LIGHT },
            { label: "Active Alerts", value: "2", color: "#EF4444" },
          ].map((row, i) => (
            <div key={i} style={{
              background: "rgba(255,255,255,0.03)",
              borderRadius: 6, padding: "8px 10px",
              display: "flex", justifyContent: "space-between", alignItems: "center",
              border: "1px solid rgba(255,255,255,0.04)",
            }}>
              <span style={{
                fontSize: 10, color: "rgba(255,255,255,0.4)",
                letterSpacing: 0.5, textTransform: "uppercase",
              }}>{row.label}</span>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 13, color: row.color, fontWeight: 600,
              }}>{row.value}</span>
            </div>
          ))}
        </div>

        {/* Right - chat panel */}
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
                width: 7, height: 7, borderRadius: "50%",
                background: "#4ADE80", boxShadow: "0 0 5px rgba(74,222,128,0.5)",
              }} />
              Cargo Dock 7 — Context loaded
            </div>

            <div style={{
              flex: 1, padding: "12px 14px",
              display: "flex", flexDirection: "column", gap: 10,
              overflowY: "auto",
            }}>
              {/* Question */}
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <div style={{
                  background: "rgba(196,136,58,0.1)",
                  border: "1px solid rgba(196,136,58,0.2)",
                  borderRadius: "10px 10px 2px 10px",
                  padding: "8px 12px", maxWidth: "85%",
                }}>
                  <span style={{ fontSize: 13, color: PAPER }}>
                    {typedQ}
                    {typedQ.length < questionText.length && <Cursor />}
                  </span>
                </div>
              </div>

              {/* Reasoning */}
              {showR && (
                <div style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  borderRadius: "10px 10px 10px 2px",
                  padding: "12px 14px",
                  display: "flex", flexDirection: "column", gap: 8,
                }}>
                  {elapsed >= T.r1 && (
                    <RStep
                      label="Compiling Dock 7 inspection history"
                      detail="4 inspections, 18 condition records"
                      done={elapsed >= T.r2}
                      fade={phase(T.r1)}
                    />
                  )}
                  {elapsed >= T.r2 && (
                    <RStep
                      label="Pulling open work orders and incidents"
                      detail="4 open WOs, 2 active alerts"
                      done={elapsed >= T.r3}
                      fade={phase(T.r2)}
                    />
                  )}
                  {elapsed >= T.r3 && (
                    <div style={{
                      display: "flex", alignItems: "center", gap: 7,
                      opacity: phase(T.r3),
                    }}>
                      <span style={{
                        fontSize: 11,
                        color: showAnswer ? "#4ADE80" : AMBER,
                        display: "inline-block",
                        animation: !showAnswer ? "spin 1.5s linear infinite" : "none",
                      }}>{showAnswer ? "✓" : "⟳"}</span>
                      <span style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 11, color: "rgba(255,255,255,0.5)",
                      }}>
                        {showAnswer ? "Board brief assembled" : "Assembling board brief"}
                      </span>
                      {!showAnswer && <LoadingDots />}
                    </div>
                  )}

                  {/* ——— ANSWER ——— */}
                  {showAnswer && (
                    <div style={{
                      paddingTop: 8, marginTop: 2,
                      borderTop: "1px solid rgba(196,136,58,0.15)",
                      opacity: phase(T.answerStart, 0.6),
                      display: "flex", flexDirection: "column", gap: 8,
                    }}>
                      <div style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 9, letterSpacing: 1.5,
                        color: AMBER, fontWeight: 600,
                      }}>DOCK 7 — BOARD BRIEF</div>

                      {/* Issue card 1: Structural */}
                      {elapsed >= T.card1 && (
                        <IssueCard
                          fade={phase(T.card1, 0.4)}
                          severity="HIGH"
                          sevColor="#EF4444"
                          title="Concrete Spalling — Bent 12 East Face"
                          lines={[
                            "First documented Oct 2024 at 4\"×6\". Current extent 12\"×18\" with exposed aggregate.",
                            "Deterioration rate exceeds forecast by 14 months. PE structural assessment recommended.",
                          ]}
                          cost="$45K–$85K"
                          costLabel="est. repair"
                        />
                      )}

                      {/* Issue card 2: Electrical */}
                      {elapsed >= T.card2 && (
                        <IssueCard
                          fade={phase(T.card2, 0.4)}
                          severity="HIGH"
                          sevColor="#F59E0B"
                          title="Panel 3B — Recurring Overcurrent"
                          lines={[
                            "3 breaker trips in 15 days since reefer bank added to Dock 7 circuit Mar 18.",
                            "Breaker failed today — replacement in stock. Load study needed before restoring full service.",
                          ]}
                          cost="$8K–$15K"
                          costLabel="panel upgrade"
                        />
                      )}

                      {/* Issue card 3: Upcoming */}
                      {elapsed >= T.card3 && (
                        <IssueCard
                          fade={phase(T.card3, 0.4)}
                          severity="DUE"
                          sevColor="#3B82F6"
                          title="Scheduled Inspection — Apr 2026"
                          lines={[
                            "Routine above/below-water structural inspection due this month. Last performed Oct 2024.",
                          ]}
                          cost="$12K–$18K"
                          costLabel="inspection cost"
                        />
                      )}

                      {/* Bottom line */}
                      {elapsed >= T.summaryIn && (
                        <div style={{
                          background: "rgba(196,136,58,0.06)",
                          border: "1px solid rgba(196,136,58,0.2)",
                          borderRadius: 6, padding: "10px 12px",
                          opacity: phase(T.summaryIn, 0.5),
                        }}>
                          <div style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: 9, letterSpacing: 1.5,
                            color: AMBER, fontWeight: 600, marginBottom: 6,
                          }}>BOTTOM LINE</div>
                          <div style={{
                            fontSize: 12, color: "rgba(255,255,255,0.75)",
                            lineHeight: 1.55,
                          }}>
                            Dock 7 has two active issues requiring near-term capital: structural repair at Bent 12 and an electrical capacity upgrade for the reefer circuit. Combined exposure is <span style={{ color: AMBER_LIGHT, fontWeight: 600 }}>$65K–$118K</span>. The structural deterioration is accelerating and should not be deferred past Q3. Recommend the board authorize a PE structural assessment and load study this quarter.
                          </div>
                        </div>
                      )}
                    </div>
                  )}
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
              }}>Ask about budgets, schedules, risk...</div>
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

function IssueCard({ fade, severity, sevColor, title, lines, cost, costLabel }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.02)",
      border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: 6, padding: "10px 12px",
      borderLeft: `3px solid ${sevColor}`,
      opacity: fade,
    }}>
      <div style={{
        display: "flex", justifyContent: "space-between",
        alignItems: "center", marginBottom: 6,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 8, letterSpacing: 1, fontWeight: 700,
            color: sevColor,
            background: `${sevColor}15`,
            border: `1px solid ${sevColor}35`,
            borderRadius: 3, padding: "2px 5px",
          }}>{severity}</span>
          <span style={{
            fontSize: 12, fontWeight: 600, color: PAPER,
          }}>{title}</span>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12, fontWeight: 600, color: AMBER_LIGHT,
          }}>{cost}</div>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 8, color: "rgba(255,255,255,0.3)",
            letterSpacing: 0.5,
          }}>{costLabel}</div>
        </div>
      </div>
      {lines.map((line, i) => (
        <div key={i} style={{
          fontSize: 11, color: "rgba(255,255,255,0.55)",
          lineHeight: 1.5, marginBottom: i < lines.length - 1 ? 4 : 0,
        }}>{line}</div>
      ))}
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

function RStep({ label, detail, done, fade }) {
  return (
    <div style={{ opacity: fade }}>
      <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
        <span style={{
          fontSize: 11, color: done ? "#4ADE80" : AMBER,
          transition: "color 0.3s",
        }}>{done ? "✓" : "◎"}</span>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11, color: "rgba(255,255,255,0.5)",
        }}>{label}</span>
      </div>
      {detail && done && (
        <div style={{
          marginLeft: 18, marginTop: 2,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11, color: AMBER_LIGHT, fontWeight: 500,
        }}>{detail}</div>
      )}
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
