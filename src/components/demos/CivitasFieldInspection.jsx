'use client'
import { useState, useEffect, useRef } from "react";

const NAVY = "#1B3A5C";
const NAVY_DEEP = "#0F1D36";
const AMBER = "#C4883A";
const AMBER_LIGHT = "#D4A65A";
const PAPER = "#FAF7F2";
const WARM_GRAY = "#E8E4DD";

// Spalling photo from Pexels (free, no attribution required)
const SPALLING_IMAGE = "https://images.pexels.com/photos/3122779/pexels-photo-3122779.jpeg?auto=compress&cs=tinysrgb&w=800";

const FONTS_LINK = "https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap";

// Timeline (cumulative seconds)
const T = {
  dashboardIn: 0,
  orientPause: 3.5,
  buttonPulseStart: 3.5,
  buttonClick: 6,
  fieldModeFlash: 6.5,
  photoAppear: 8.5,
  questionStart: 11,
  questionDone: 13.5,
  reasoningStart: 14,
  reason1: 14.5,
  reason2: 16,
  reason3: 17.5,
  answerStart: 20,
  answerDone: 24,
  holdAnswer: 28,
};

export default function CivitasFieldInspection({ active }) {
  const [elapsed, setElapsed] = useState(0);
  const [started, setStarted] = useState(false);
  const startRef = useRef(null);
  const frameRef = useRef(null);
  const [imgLoaded, setImgLoaded] = useState(false);

  // Preload image
  useEffect(() => {
    const img = new Image();
    img.onload = () => setImgLoaded(true);
    img.src = SPALLING_IMAGE;
  }, []);

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

  // Animation loop
  useEffect(() => {
    if (!started) return;
    startRef.current = performance.now();
    const tick = (now) => {
      const s = (now - startRef.current) / 1000;
      setElapsed(s);
      if (s < T.holdAnswer + 2) {
        frameRef.current = requestAnimationFrame(tick);
      }
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [started]);

  const phase = (start) => Math.max(0, Math.min(1, (elapsed - start) / 0.6));
  const typeText = (text, startT, duration) => {
    const p = Math.max(0, Math.min(1, (elapsed - startT) / duration));
    return text.substring(0, Math.floor(text.length * p));
  };

  const showDashboard = elapsed >= T.dashboardIn;
  const pulseButton = elapsed >= T.buttonPulseStart && elapsed < T.buttonClick;
  const buttonClicked = elapsed >= T.buttonClick;
  const fieldModeFlash = elapsed >= T.fieldModeFlash && elapsed < T.photoAppear;
  const showPhoto = elapsed >= T.photoAppear;
  const showQuestion = elapsed >= T.questionStart;
  const showReasoning = elapsed >= T.reasoningStart;
  const showReason1 = elapsed >= T.reason1;
  const showReason2 = elapsed >= T.reason2;
  const showReason3 = elapsed >= T.reason3;
  const showAnswer = elapsed >= T.answerStart;

  // Typing animation for question
  const questionText = "Was this here before?";
  const typedQuestion = showQuestion ? typeText(questionText, T.questionStart, T.questionDone - T.questionStart) : "";

  // Answer text
  const answerLines = [
    { label: "YES — PREVIOUSLY DOCUMENTED", color: AMBER },
    { text: "This spalling pattern was first recorded during the October 2024 routine inspection (WO-2024-1847). At that time it was classified as minor surface deterioration, approximately 4\" × 6\" area." },
    { text: "Current photo shows significant progression — estimated 12\" × 18\" with exposed aggregate and possible rebar exposure at the eastern edge." },
    { label: "RECOMMENDATION", color: AMBER },
    { text: "Flag for structural assessment. Escalate to PE review — deterioration rate exceeds projected timeline by 14 months." },
  ];

  return (
    <div style={{
      position: "absolute",
      inset: 0,
      fontFamily: "'DM Sans', system-ui, sans-serif",
      overflow: "hidden",
      background: NAVY_DEEP,
    }}>
      <link rel="stylesheet" href={FONTS_LINK} />

      {/* ——— SCENE 1: DASHBOARD ——— */}
      {showDashboard && !buttonClicked && (
        <div style={{
          position: "absolute", inset: 0,
          display: "flex",
          opacity: phase(T.dashboardIn),
          transition: "opacity 0.8s ease",
        }}>
          {/* Sidebar */}
          <div style={{
            width: 220,
            background: NAVY,
            borderRight: `1px solid rgba(196,136,58,0.15)`,
            padding: "20px 0",
            display: "flex",
            flexDirection: "column",
          }}>
            <div style={{
              padding: "0 16px 16px",
              borderBottom: `1px solid rgba(255,255,255,0.08)`,
              marginBottom: 12,
            }}>
              <div style={{
                fontFamily: "'Cinzel', serif",
                fontSize: 14,
                fontWeight: 700,
                color: AMBER,
                letterSpacing: 3,
                marginBottom: 4,
              }}>CIVITAS</div>
              <div style={{
                fontSize: 10,
                color: "rgba(255,255,255,0.4)",
                letterSpacing: 1,
              }}>BAYSHORE PORT AUTHORITY</div>
            </div>

            {/* Nav items */}
            {[
              { icon: "◉", label: "Dashboard", active: true },
              { icon: "▦", label: "Assets" },
              { icon: "⚑", label: "Inspections" },
              { icon: "◷", label: "Work Orders" },
              { icon: "▤", label: "Documents" },
              { icon: "⊞", label: "Capital Plan" },
            ].map((item, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "9px 16px",
                fontSize: 13,
                color: item.active ? AMBER : "rgba(255,255,255,0.55)",
                background: item.active ? "rgba(196,136,58,0.08)" : "transparent",
                borderLeft: item.active ? `3px solid ${AMBER}` : "3px solid transparent",
                cursor: "default",
              }}>
                <span style={{ fontSize: 14, width: 18, textAlign: "center" }}>{item.icon}</span>
                {item.label}
              </div>
            ))}

            <div style={{ flex: 1 }} />

            {/* FIELD MODE BUTTON */}
            <div style={{
              margin: "0 12px 12px",
              padding: "12px 14px",
              background: pulseButton
                ? `linear-gradient(135deg, ${AMBER}, ${AMBER_LIGHT})`
                : `rgba(196,136,58,0.12)`,
              border: `2px solid ${AMBER}`,
              borderRadius: 8,
              textAlign: "center",
              cursor: "pointer",
              animation: pulseButton ? "fieldPulse 1.2s ease-in-out infinite" : "none",
              position: "relative",
              overflow: "hidden",
            }}>
              {pulseButton && (
                <div style={{
                  position: "absolute", inset: 0,
                  background: "radial-gradient(circle, rgba(196,136,58,0.3) 0%, transparent 70%)",
                  animation: "fieldGlow 1.2s ease-in-out infinite",
                }} />
              )}
              <div style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: 3,
                color: pulseButton ? NAVY_DEEP : AMBER,
                position: "relative",
                zIndex: 1,
              }}>⦿ FIELD MODE</div>

              {/* Attention arrow */}
              {pulseButton && (
                <div style={{
                  position: "absolute",
                  right: -52,
                  top: "50%",
                  transform: "translateY(-50%)",
                  display: "flex", alignItems: "center", gap: 4,
                  animation: "arrowBounce 1s ease-in-out infinite",
                }}>
                  <span style={{
                    fontSize: 18,
                    color: AMBER,
                    textShadow: `0 0 12px ${AMBER}`,
                  }}>◀</span>
                </div>
              )}
            </div>
          </div>

          {/* Main content area */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            {/* Top bar */}
            <div style={{
              height: 48,
              background: "rgba(27,58,92,0.6)",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              display: "flex", alignItems: "center",
              padding: "0 20px",
              justifyContent: "space-between",
            }}>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)" }}>
                Asset Overview — <span style={{ color: AMBER }}>Cargo Docks 1–15</span>
              </div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>
                Apr 2, 2026 &nbsp;|&nbsp; 9:43 AM
              </div>
            </div>

            {/* Map / grid area */}
            <div style={{ flex: 1, padding: 16, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {/* Summary cards */}
              {[
                { label: "Total Assets", value: "847", sub: "Tracked elements" },
                { label: "Open Work Orders", value: "23", sub: "4 overdue" },
                { label: "Inspections Due", value: "12", sub: "Next 30 days" },
                { label: "Condition Alerts", value: "6", sub: "2 critical", alert: true },
              ].map((card, i) => (
                <div key={i} style={{
                  background: "rgba(255,255,255,0.04)",
                  borderRadius: 8,
                  padding: "14px 16px",
                  border: card.alert
                    ? `1px solid rgba(196,136,58,0.4)`
                    : "1px solid rgba(255,255,255,0.06)",
                }}>
                  <div style={{
                    fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase",
                    color: "rgba(255,255,255,0.4)", marginBottom: 6,
                  }}>{card.label}</div>
                  <div style={{
                    fontSize: 28, fontWeight: 700,
                    fontFamily: "'Cinzel', serif",
                    color: card.alert ? AMBER : PAPER,
                    marginBottom: 2,
                  }}>{card.value}</div>
                  <div style={{
                    fontSize: 11,
                    color: card.alert ? AMBER_LIGHT : "rgba(255,255,255,0.35)",
                  }}>{card.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ——— SCENE 2: FIELD MODE ENGAGED FLASH ——— */}
      {fieldModeFlash && (
        <div style={{
          position: "absolute", inset: 0,
          background: NAVY_DEEP,
          display: "flex", alignItems: "center", justifyContent: "center",
          flexDirection: "column",
          zIndex: 10,
          animation: "flashIn 0.3s ease-out",
        }}>
          <div style={{
            width: 48, height: 48,
            border: `3px solid ${AMBER}`,
            borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            marginBottom: 20,
            animation: "scanPulse 0.8s ease-in-out infinite",
          }}>
            <div style={{
              width: 12, height: 12,
              background: AMBER,
              borderRadius: "50%",
              boxShadow: `0 0 20px ${AMBER}, 0 0 40px rgba(196,136,58,0.3)`,
            }} />
          </div>
          <div style={{
            fontFamily: "'Cinzel', serif",
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: 8,
            color: AMBER,
            textShadow: `0 0 30px rgba(196,136,58,0.5)`,
            marginBottom: 8,
          }}>FIELD MODE</div>
          <div style={{
            fontSize: 13,
            letterSpacing: 6,
            color: AMBER_LIGHT,
            fontWeight: 600,
            opacity: 0.8,
          }}>ENGAGED</div>
        </div>
      )}

      {/* ——— SCENE 3: FIELD VIEW — Photo + Question + Reasoning + Answer ——— */}
      {showPhoto && (
        <div style={{
          position: "absolute", inset: 0,
          background: "#111",
          display: "flex",
          flexDirection: "column",
          zIndex: 10,
          animation: "fadeIn 0.6s ease-out",
        }}>
          {/* Field mode header bar */}
          <div style={{
            height: 36,
            background: "rgba(196,136,58,0.15)",
            borderBottom: `2px solid ${AMBER}`,
            display: "flex", alignItems: "center",
            padding: "0 14px",
            justifyContent: "space-between",
            flexShrink: 0,
          }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 8,
            }}>
              <div style={{
                width: 8, height: 8,
                background: "#4ADE80",
                borderRadius: "50%",
                boxShadow: "0 0 6px rgba(74,222,128,0.6)",
              }} />
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11, fontWeight: 500,
                color: AMBER, letterSpacing: 2,
              }}>FIELD MODE</span>
            </div>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10, color: "rgba(255,255,255,0.4)",
            }}>⦿ REC &nbsp;|&nbsp; GPS LOCKED</div>
          </div>

          {/* Content area: photo + chat */}
          <div style={{
            flex: 1, display: "flex",
            overflow: "hidden",
          }}>
            {/* Photo panel */}
            <div style={{
              flex: showQuestion ? "0 0 50%" : "1",
              transition: "flex 0.8s ease",
              position: "relative",
              background: "#0a0a0a",
            }}>
              {/* The spalling photo */}
              <div style={{
                position: "absolute", inset: 0,
                backgroundImage: `url(${SPALLING_IMAGE})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: imgLoaded ? 1 : 0,
                transition: "opacity 1s ease",
              }} />

              {/* Fallback if image doesn't load */}
              {!imgLoaded && (
                <div style={{
                  position: "absolute", inset: 0,
                  background: `linear-gradient(135deg, #3a3a3a 0%, #2a2a2a 40%, #333 60%, #2a2a2a 100%)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <div style={{
                    fontSize: 12, color: "rgba(255,255,255,0.3)",
                    fontFamily: "'JetBrains Mono', monospace",
                  }}>Loading field photo...</div>
                </div>
              )}

              {/* GPS + Timestamp overlay ON the image */}
              <div style={{
                position: "absolute",
                bottom: 0, left: 0, right: 0,
                background: "linear-gradient(transparent, rgba(0,0,0,0.85))",
                padding: "40px 14px 12px",
              }}>
                <div style={{
                  display: "flex", justifyContent: "space-between", alignItems: "flex-end",
                }}>
                  <div>
                    <div style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 13, fontWeight: 500,
                      color: "#fff",
                      textShadow: "0 1px 4px rgba(0,0,0,0.8)",
                      marginBottom: 3,
                    }}>27.8006°N, 97.3964°W</div>
                    <div style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 11,
                      color: "rgba(255,255,255,0.7)",
                    }}>04/02/2026 &nbsp; 09:47 AM CDT</div>
                  </div>
                  <div style={{
                    display: "flex", flexDirection: "column", alignItems: "flex-end",
                  }}>
                    <div style={{
                      fontSize: 10, letterSpacing: 1,
                      color: AMBER, fontWeight: 600,
                      background: "rgba(196,136,58,0.15)",
                      padding: "3px 8px",
                      borderRadius: 4,
                      border: `1px solid rgba(196,136,58,0.3)`,
                    }}>± 0.8m ACCURACY</div>
                  </div>
                </div>
              </div>

              {/* Crosshair overlay */}
              <div style={{
                position: "absolute",
                top: "50%", left: "50%",
                transform: "translate(-50%, -50%)",
                width: 40, height: 40,
                border: "1.5px solid rgba(196,136,58,0.4)",
                borderRadius: "50%",
                opacity: phase(T.photoAppear),
              }}>
                <div style={{
                  position: "absolute", top: -8, left: "50%", width: 1, height: 8,
                  background: "rgba(196,136,58,0.4)",
                }} />
                <div style={{
                  position: "absolute", bottom: -8, left: "50%", width: 1, height: 8,
                  background: "rgba(196,136,58,0.4)",
                }} />
                <div style={{
                  position: "absolute", left: -8, top: "50%", height: 1, width: 8,
                  background: "rgba(196,136,58,0.4)",
                }} />
                <div style={{
                  position: "absolute", right: -8, top: "50%", height: 1, width: 8,
                  background: "rgba(196,136,58,0.4)",
                }} />
              </div>
            </div>

            {/* Chat / reasoning panel */}
            {showQuestion && (
              <div style={{
                flex: "0 0 50%",
                background: NAVY_DEEP,
                display: "flex", flexDirection: "column",
                borderLeft: `1px solid rgba(196,136,58,0.15)`,
                animation: "slideInRight 0.6s ease-out",
              }}>
                {/* Chat area */}
                <div style={{
                  flex: 1,
                  padding: 16,
                  overflowY: "auto",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}>
                  {/* User question bubble */}
                  <div style={{
                    alignSelf: "flex-end",
                    maxWidth: "85%",
                  }}>
                    <div style={{
                      background: "rgba(196,136,58,0.12)",
                      border: `1px solid rgba(196,136,58,0.25)`,
                      borderRadius: "12px 12px 2px 12px",
                      padding: "10px 14px",
                    }}>
                      <div style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 14,
                        color: PAPER,
                        lineHeight: 1.4,
                      }}>
                        {typedQuestion}
                        {typedQuestion.length < questionText.length && (
                          <span style={{
                            display: "inline-block",
                            width: 2, height: 16,
                            background: AMBER,
                            marginLeft: 1,
                            verticalAlign: "text-bottom",
                            animation: "blink 0.6s step-end infinite",
                          }} />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* System reasoning */}
                  {showReasoning && (
                    <div style={{
                      alignSelf: "flex-start",
                      maxWidth: "90%",
                    }}>
                      <div style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.06)",
                        borderRadius: "12px 12px 12px 2px",
                        padding: "14px 16px",
                        display: "flex", flexDirection: "column", gap: 10,
                      }}>
                        {/* Reasoning steps */}
                        {showReason1 && (
                          <ReasonStep
                            icon="◎"
                            label="Location Found"
                            detail="27.8006°N, 97.3964°W"
                            done={elapsed >= T.reason2}
                            fadeIn={phase(T.reason1)}
                          />
                        )}
                        {showReason2 && (
                          <ReasonStep
                            icon="⊞"
                            label="Asset Identified"
                            detail="Cargo Dock 7 — Bent 12, East Face"
                            done={elapsed >= T.reason3}
                            fadeIn={phase(T.reason2)}
                          />
                        )}
                        {showReason3 && (
                          <div style={{ opacity: phase(T.reason3) }}>
                            <div style={{
                              display: "flex", alignItems: "center", gap: 8,
                              marginBottom: 4,
                            }}>
                              <span style={{
                                fontSize: 12, color: AMBER,
                                animation: !showAnswer ? "spin 1.5s linear infinite" : "none",
                              }}>⟳</span>
                              <span style={{
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: 11, color: "rgba(255,255,255,0.5)",
                              }}>
                                {showAnswer
                                  ? "Reviewed 3 inspections, 2 work orders"
                                  : "Reviewing inspections and work orders"}
                              </span>
                              {!showAnswer && <LoadingDots />}
                            </div>
                            {!showAnswer && (
                              <div style={{
                                marginTop: 6, marginLeft: 20,
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: 10,
                                color: "rgba(255,255,255,0.25)",
                                lineHeight: 1.6,
                              }}>
                                WO-2024-1847 ... WO-2025-0312{"\n"}
                                INS-2024-Q4-CD7 ... INS-2025-Q1-CD7
                              </div>
                            )}
                          </div>
                        )}

                        {/* Answer */}
                        {showAnswer && (
                          <div style={{
                            marginTop: 6,
                            paddingTop: 10,
                            borderTop: `1px solid rgba(196,136,58,0.2)`,
                            opacity: phase(T.answerStart),
                          }}>
                            {answerLines.map((line, i) => {
                              if (line.label) {
                                return (
                                  <div key={i} style={{
                                    fontFamily: "'JetBrains Mono', monospace",
                                    fontSize: 11,
                                    fontWeight: 600,
                                    letterSpacing: 1.5,
                                    color: line.color,
                                    marginTop: i > 0 ? 12 : 0,
                                    marginBottom: 6,
                                  }}>{line.label}</div>
                                );
                              }
                              return (
                                <div key={i} style={{
                                  fontFamily: "'DM Sans', sans-serif",
                                  fontSize: 12.5,
                                  color: "rgba(255,255,255,0.75)",
                                  lineHeight: 1.55,
                                  marginBottom: 6,
                                }}>{line.text}</div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Chat input bar */}
                <div style={{
                  padding: "10px 14px",
                  borderTop: "1px solid rgba(255,255,255,0.06)",
                  display: "flex", alignItems: "center", gap: 8,
                }}>
                  <div style={{
                    flex: 1,
                    background: "rgba(255,255,255,0.04)",
                    borderRadius: 8,
                    padding: "10px 14px",
                    fontSize: 13,
                    color: "rgba(255,255,255,0.3)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}>Ask about this asset...</div>
                  <div style={{
                    width: 36, height: 36,
                    borderRadius: 8,
                    background: `rgba(196,136,58,0.15)`,
                    border: `1px solid rgba(196,136,58,0.3)`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: AMBER,
                    fontSize: 14,
                  }}>↑</div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ——— CSS KEYFRAMES ——— */}
      <style>{`
        @keyframes fieldPulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 12px rgba(196,136,58,0.2); }
          50% { transform: scale(1.03); box-shadow: 0 0 24px rgba(196,136,58,0.5), 0 0 48px rgba(196,136,58,0.15); }
        }
        @keyframes fieldGlow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
        @keyframes arrowBounce {
          0%, 100% { transform: translateY(-50%) translateX(0); }
          50% { transform: translateY(-50%) translateX(-6px); }
        }
        @keyframes flashIn {
          0% { opacity: 0; }
          30% { opacity: 1; }
          100% { opacity: 1; }
        }
        @keyframes scanPulse {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.15); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
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

function ReasonStep({ icon, label, detail, done, fadeIn }) {
  return (
    <div style={{
      display: "flex", alignItems: "flex-start", gap: 8,
      opacity: fadeIn,
    }}>
      <span style={{
        fontSize: 12,
        color: done ? "#4ADE80" : AMBER,
        marginTop: 1,
        transition: "color 0.4s ease",
      }}>{done ? "✓" : icon}</span>
      <div>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          color: done ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.5)",
          marginBottom: 1,
        }}>{label}</div>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 12,
          color: done ? PAPER : AMBER_LIGHT,
          fontWeight: 500,
        }}>{detail}</div>
      </div>
    </div>
  );
}

function LoadingDots() {
  return (
    <span style={{
      display: "inline-flex", gap: 3, marginLeft: 4,
    }}>
      {[0, 1, 2].map(i => (
        <span key={i} style={{
          width: 4, height: 4,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.4)",
          animation: `dotPulse 1.4s ease-in-out ${i * 0.2}s infinite`,
        }} />
      ))}
    </span>
  );
}
