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
  qDone: 5.8,
  rStart: 6.5,
  r1: 7,
  r2: 8.5,
  r3: 10,
  r4: 11.5,
  answerStart: 13,
  card1: 13.5,
  card2: 15,
  card3: 16.5,
  card4: 18,
  summaryIn: 19.5,
  hold: 27,
};

export default function PraxisPrincipal({ active = true }) {
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

  const questionText = "What needs my attention today?";
  const typedQ = showQ ? typeText(questionText, T.qStart, T.qDone) : "";

  const projects = [
    { name: "Wharf 7 Rehab", status: "active", alert: true },
    { name: "Seawall Repair", status: "active" },
    { name: "Bridge Study", status: "active" },
    { name: "Dock Inspection", status: "complete" },
    { name: "Bulkhead Design", status: "active" },
    { name: "Marina Expansion", status: "pending" },
    { name: "Jetty Assessment", status: "active" },
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
            fontFamily: "'Cinzel', serif",
            fontSize: 12, fontWeight: 700,
            color: AMBER, letterSpacing: 2,
          }}>PRAXIS</span>
          <span style={{ fontSize: 10, color: "rgba(255,255,255,0.2)" }}>|</span>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>
            Command Center
          </span>
        </div>
        <div style={{
          fontSize: 10, color: "rgba(255,255,255,0.35)",
          fontFamily: "'JetBrains Mono', monospace",
        }}>
          D. Harmon — Principal, PE &nbsp;|&nbsp; Apr 2, 2026
        </div>
      </div>

      {/* Main layout */}
      <div style={{
        position: "absolute", top: 36, left: 0, right: 0, bottom: 0,
        display: "flex",
      }}>
        {/* Left sidebar - project list */}
        <div style={{
          width: 170,
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
          }}>Active Projects</div>

          {projects.map((item, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "6px 12px",
              cursor: "default",
            }}>
              <div style={{
                width: 6, height: 6, borderRadius: "50%",
                background: item.status === "complete" ? "#4ADE80"
                  : item.status === "pending" ? "rgba(255,255,255,0.2)"
                  : item.alert ? "#F59E0B" : "#4ADE80",
                boxShadow: item.alert ? "0 0 6px rgba(245,158,11,0.5)" : "none",
              }} />
              <span style={{
                fontSize: 11,
                color: item.alert ? PAPER : "rgba(255,255,255,0.5)",
                fontWeight: item.alert ? 600 : 400,
              }}>{item.name}</span>
            </div>
          ))}

          <div style={{ flex: 1 }} />

          <div style={{
            margin: "16px 12px 0", padding: "8px",
            background: "rgba(255,255,255,0.03)",
            borderRadius: 6, border: "1px solid rgba(255,255,255,0.06)",
          }}>
            <div style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", letterSpacing: 1, marginBottom: 4 }}>FIRM SNAPSHOT</div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "rgba(255,255,255,0.5)", padding: "2px 0" }}>
              <span>Active</span><span style={{ color: PAPER, fontWeight: 600 }}>7</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "rgba(255,255,255,0.5)", padding: "2px 0" }}>
              <span>Staff</span><span style={{ color: PAPER, fontWeight: 600 }}>12</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "rgba(255,255,255,0.5)", padding: "2px 0" }}>
              <span>Utilization</span><span style={{ color: "#F59E0B", fontWeight: 600 }}>94%</span>
            </div>
          </div>
        </div>

        {/* Center - summary or compressed when chat opens */}
        <div style={{
          flex: showQ ? "0 0 140px" : "1",
          transition: "flex 0.7s ease",
          padding: 14,
          opacity: phase(T.dashIn, 0.8),
          display: "flex", flexDirection: "column", gap: 8,
          overflow: "hidden",
        }}>
          <div style={{
            fontFamily: "'Cinzel', serif",
            fontSize: 14, fontWeight: 600, color: PAPER,
            marginBottom: 4,
          }}>Firm Overview</div>

          {[
            { label: "PE Reviews", value: "3", color: "#EF4444" },
            { label: "QC Queue", value: "5", color: "#F59E0B" },
            { label: "Deadlines (7d)", value: "4", color: PAPER },
            { label: "Docs Indexed", value: "847", color: "rgba(255,255,255,0.6)" },
            { label: "Open RFIs", value: "8", color: AMBER_LIGHT },
          ].map((row, i) => (
            <div key={i} style={{
              background: "rgba(255,255,255,0.03)",
              borderRadius: 6, padding: "7px 10px",
              display: "flex", justifyContent: "space-between", alignItems: "center",
              border: "1px solid rgba(255,255,255,0.04)",
            }}>
              <span style={{
                fontSize: 10, color: "rgba(255,255,255,0.4)",
                letterSpacing: 0.5,
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
                width: 6, height: 6, borderRadius: "50%",
                background: "#4ADE80",
                boxShadow: "0 0 4px rgba(74,222,128,0.5)",
              }} />
              Custos connected — 847 documents indexed
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
                <div style={{ alignSelf: "flex-start", maxWidth: "92%" }}>
                  <div style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: "12px 12px 12px 2px",
                    padding: "12px 14px",
                    display: "flex", flexDirection: "column", gap: 8,
                  }}>
                    {elapsed >= T.r1 && (
                      <RStep label="Scanning 7 active projects" done={elapsed >= T.r2} fade={phase(T.r1)} />
                    )}
                    {elapsed >= T.r2 && (
                      <RStep label="Cross-referencing deadlines" done={elapsed >= T.r3} fade={phase(T.r2)} />
                    )}
                    {elapsed >= T.r3 && (
                      <RStep label="Checking PE review queue" done={elapsed >= T.r4} fade={phase(T.r3)} />
                    )}
                    {elapsed >= T.r4 && (
                      <RStep
                        label={showAnswer ? "4 items require attention" : "Analyzing resource allocation"}
                        done={showAnswer}
                        fade={phase(T.r4)}
                        loading={!showAnswer}
                      />
                    )}

                    {/* Answer cards */}
                    {showAnswer && (
                      <div style={{
                        marginTop: 4, paddingTop: 8,
                        borderTop: "1px solid rgba(196,136,58,0.2)",
                        display: "flex", flexDirection: "column", gap: 8,
                      }}>
                        {elapsed >= T.card1 && (
                          <BriefCard
                            fade={phase(T.card1, 0.4)}
                            severity="OVERDUE" sevColor="#EF4444"
                            title="2 PE Reviews — No Disposition"
                            detail="Pile Cap calcs (Wharf 7) submitted 5 days ago. Drawing set S-3 submitted 3 days ago. Both awaiting responsible charge declaration."
                          />
                        )}
                        {elapsed >= T.card2 && (
                          <BriefCard
                            fade={phase(T.card2, 0.4)}
                            severity="CONFLICT" sevColor="#F59E0B"
                            title="Resource Collision — T. Kim"
                            detail="T. Kim assigned to Seawall 60% submittal and Bridge Study calcs — both due Apr 8. One will slip without reallocation."
                          />
                        )}
                        {elapsed >= T.card3 && (
                          <BriefCard
                            fade={phase(T.card3, 0.4)}
                            severity="RISK" sevColor="#F59E0B"
                            title="Budget Alert — Seawall Repair"
                            detail="78% of contract burned at 52% completion. Current burn rate reaches contract limit by May 9 — 6 weeks before planned completion."
                          />
                        )}
                        {elapsed >= T.card4 && (
                          <BriefCard
                            fade={phase(T.card4, 0.4)}
                            severity="INFO" sevColor="#3B82F6"
                            title="QC Flag — 5 Days Open"
                            detail="Bearing capacity flag on Pile Driving Analysis returned to A. Santos. No revision submitted. Standard turnaround is 48 hours."
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
                              color: AMBER, fontWeight: 600, marginBottom: 5,
                            }}>RECOMMENDED ACTIONS</div>
                            <div style={{
                              fontSize: 11.5, color: "rgba(255,255,255,0.7)",
                              lineHeight: 1.55,
                            }}>
                              Sign the two PE reviews before noon. Reassign T. Kim's Bridge Study calcs to L. Huang. Schedule a budget review with the Seawall PM this week. Follow up with A. Santos on the open QC flag.
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
              }}>Ask about projects, resources, deadlines...</div>
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

function BriefCard({ fade, severity, sevColor, title, detail }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.02)",
      border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: 6, padding: "8px 10px",
      borderLeft: `3px solid ${sevColor}`,
      opacity: fade,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 8, letterSpacing: 1, fontWeight: 700,
          color: sevColor,
          background: `${sevColor}15`,
          border: `1px solid ${sevColor}35`,
          borderRadius: 3, padding: "2px 5px",
        }}>{severity}</span>
        <span style={{ fontSize: 11.5, fontWeight: 600, color: PAPER }}>{title}</span>
      </div>
      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", lineHeight: 1.5 }}>{detail}</div>
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
