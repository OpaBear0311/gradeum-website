'use client'
import { useState, useEffect, useRef } from "react";

const NAVY_DEEP = "#0F1D36";
const AMBER = "#C4883A";
const AMBER_LIGHT = "#D4A65A";
const PAPER = "#FAF7F2";

const FONTS_LINK = "https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=DM+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap";

const PANEL_IMAGE = "https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=800";

const T = {
  sceneIn: 0,
  settle: 2.5,
  snapFlash: 2.5,
  snapDone: 2.9,
  qStart: 3.8,
  qDone: 5.2,
  rStart: 5.8,
  r1: 6.2,
  r2: 7.8,
  r3: 9.4,
  r4: 11,
  answerStart: 12.5,
  historyIn: 15,
  hold: 22,
};

export default function CivitasCallOut({ active }) {
  const [elapsed, setElapsed] = useState(0);
  const [started, setStarted] = useState(false);
  const startRef = useRef(null);
  const frameRef = useRef(null);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setImgLoaded(true);
    img.src = PANEL_IMAGE;
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

  const showSnap = elapsed >= T.snapFlash && elapsed < T.snapDone;
  const showQ = elapsed >= T.qStart;
  const showR = elapsed >= T.rStart;
  const showAnswer = elapsed >= T.answerStart;
  const showHistory = elapsed >= T.historyIn;

  const questionText = "Do we have this?";
  const typedQ = showQ ? typeText(questionText, T.qStart, T.qDone) : "";

  return (
    <div style={{
      position: "absolute", inset: 0,
      fontFamily: "'DM Sans', system-ui, sans-serif",
      overflow: "hidden",
      background: "#0a0a0a",
    }}>
      <link rel="stylesheet" href={FONTS_LINK} />

      {/* Field mode bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, zIndex: 20,
        height: 32, background: "rgba(196,136,58,0.12)",
        borderBottom: `2px solid ${AMBER}`,
        display: "flex", alignItems: "center",
        padding: "0 12px", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 7, height: 7, background: "#4ADE80",
            borderRadius: "50%", boxShadow: "0 0 6px rgba(74,222,128,0.6)",
          }} />
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10, fontWeight: 500, color: AMBER, letterSpacing: 2,
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={AMBER} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: -2, marginRight: 5 }}>
              <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/>
              <line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/>
              <line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/>
            </svg>
            FIELD MODE
          </span>
        </div>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 9, color: "rgba(255,255,255,0.35)",
        }}>⦿ REC &nbsp;|&nbsp; GPS LOCKED</span>
      </div>

      {/* Panel photo */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: imgLoaded ? `url(${PANEL_IMAGE})` : "none",
        backgroundSize: "cover", backgroundPosition: "center",
        opacity: phase(T.sceneIn, 0.8),
        filter: showQ ? "brightness(0.35)" : "brightness(0.55)",
        transition: "filter 0.8s ease",
      }} />
      {!imgLoaded && (
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(160deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
        }} />
      )}

      {/* Camera snap flash */}
      {showSnap && (
        <div style={{
          position: "absolute", inset: 0, zIndex: 30,
          background: "white",
          opacity: 1 - ((elapsed - T.snapFlash) / (T.snapDone - T.snapFlash)),
          pointerEvents: "none",
        }} />
      )}

      {/* GPS + timestamp on image */}
      <div style={{
        position: "absolute", bottom: 0, left: 0,
        right: showQ ? "50%" : 0,
        transition: "right 0.7s ease",
        zIndex: 5,
        background: "linear-gradient(transparent, rgba(0,0,0,0.9))",
        padding: "50px 14px 10px",
      }}>
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "flex-end",
          opacity: phase(T.sceneIn, 0.8),
        }}>
          <div>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12, fontWeight: 500, color: "#fff",
              textShadow: "0 1px 4px rgba(0,0,0,0.8)", marginBottom: 2,
            }}>28.4512°N, 96.2183°W</div>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10, color: "rgba(255,255,255,0.6)",
            }}>04/02/2026 &nbsp; 10:14 AM CDT</div>
          </div>
          <div style={{
            fontSize: 9, letterSpacing: 1, color: AMBER, fontWeight: 600,
            background: "rgba(196,136,58,0.15)",
            padding: "3px 7px", borderRadius: 4,
            border: "1px solid rgba(196,136,58,0.3)",
          }}>± 1.2m</div>
        </div>
      </div>

      {/* "Photo captured" badge after snap */}
      {elapsed >= T.snapDone && !showQ && (
        <div style={{
          position: "absolute", top: 44, left: "50%",
          transform: "translateX(-50%)", zIndex: 15,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10, letterSpacing: 2, color: "#4ADE80",
          background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)",
          padding: "6px 14px", borderRadius: 6,
          border: "1px solid rgba(74,222,128,0.3)",
          animation: "fadeIn 0.3s ease-out",
        }}>
          ✓ PHOTO CAPTURED
        </div>
      )}

      {/* Crosshair */}
      {!showQ && (
        <div style={{
          position: "absolute", top: "42%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: 40, height: 40,
          border: "1.5px solid rgba(196,136,58,0.3)",
          borderRadius: "50%", zIndex: 3,
          opacity: phase(T.sceneIn, 1),
          transition: "opacity 0.5s",
        }} />
      )}

      {/* ——— Chat panel slides in from right ——— */}
      {showQ && (
        <div style={{
          position: "absolute", top: 32, right: 0, bottom: 0,
          width: "52%", zIndex: 15,
          background: "rgba(15,29,54,0.96)",
          backdropFilter: "blur(16px)",
          borderLeft: "1px solid rgba(196,136,58,0.15)",
          display: "flex", flexDirection: "column",
          animation: "slideInRight 0.6s ease-out",
        }}>
          {/* Chat header */}
          <div style={{
            padding: "8px 14px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            display: "flex", alignItems: "center", gap: 6,
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/>
            </svg>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>
              Photo attached — Panel 3B
            </span>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1, padding: "12px 14px",
            display: "flex", flexDirection: "column", gap: 10,
            overflowY: "auto",
          }}>
            {/* Question */}
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <div style={{
                background: "rgba(196,136,58,0.12)",
                border: "1px solid rgba(196,136,58,0.25)",
                borderRadius: "10px 10px 2px 10px",
                padding: "8px 12px", maxWidth: "75%",
              }}>
                <span style={{ fontSize: 13.5, color: PAPER, fontWeight: 500 }}>
                  {typedQ}
                  {typedQ.length < questionText.length && <Cursor />}
                </span>
              </div>
            </div>

            {/* System response */}
            {showR && (
              <div style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.05)",
                borderRadius: "10px 10px 10px 2px",
                padding: "12px 14px",
                display: "flex", flexDirection: "column", gap: 8,
              }}>
                {/* Reasoning steps */}
                {elapsed >= T.r1 && (
                  <RStep
                    label="Location matched"
                    detail="Warehouse B — Electrical Room 2"
                    done={elapsed >= T.r2}
                    fade={phase(T.r1)}
                  />
                )}
                {elapsed >= T.r2 && (
                  <RStep
                    label="Panel identified — non-standard"
                    detail="Siemens P1C42ML400ATS (custom order, 2017)"
                    done={elapsed >= T.r3}
                    fade={phase(T.r2)}
                    warn
                  />
                )}
                {elapsed >= T.r3 && (
                  <RStep
                    label="Breaker spec from panel schedule"
                    detail="Siemens QJ23B200 — 200A 3-Pole 240V"
                    done={elapsed >= T.r4}
                    fade={phase(T.r3)}
                  />
                )}
                {elapsed >= T.r4 && (
                  <div style={{
                    display: "flex", alignItems: "center", gap: 7,
                    opacity: phase(T.r4),
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
                      {showAnswer ? "Inventory and history checked" : "Checking inventory and history"}
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
                    display: "flex", flexDirection: "column", gap: 10,
                  }}>
                    {/* Part card */}
                    <div style={{
                      background: "rgba(196,136,58,0.06)",
                      border: "1px solid rgba(196,136,58,0.2)",
                      borderRadius: 7, padding: "10px 12px",
                    }}>
                      <div style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 9, letterSpacing: 1.5,
                        color: AMBER, fontWeight: 600, marginBottom: 6,
                      }}>IDENTIFIED PART</div>
                      <div style={{
                        display: "grid", gridTemplateColumns: "auto 1fr",
                        gap: "4px 12px",
                      }}>
                        {[
                          ["Part #", "SIE-QJ23B200"],
                          ["Desc", "200A 3-Pole 240V QJ-Frame Breaker"],
                          ["Panel", "Siemens P1C42ML400ATS (non-std)"],
                        ].map(([k, v], i) => (
                          <div key={i} style={{ display: "contents" }}>
                            <span style={{
                              fontFamily: "'JetBrains Mono', monospace",
                              fontSize: 9, color: "rgba(255,255,255,0.3)",
                              letterSpacing: 0.5, textTransform: "uppercase",
                            }}>{k}</span>
                            <span style={{
                              fontFamily: "'JetBrains Mono', monospace",
                              fontSize: 11.5, color: i === 0 ? AMBER_LIGHT : PAPER,
                              fontWeight: i === 0 ? 600 : 400,
                            }}>{v}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Stock card */}
                    <div style={{
                      background: "rgba(74,222,128,0.06)",
                      border: "1px solid rgba(74,222,128,0.2)",
                      borderRadius: 7, padding: "10px 12px",
                      display: "flex", gap: 12, alignItems: "center",
                    }}>
                      <div style={{ textAlign: "center", minWidth: 52 }}>
                        <div style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: 26, fontWeight: 700, color: "#4ADE80",
                          lineHeight: 1,
                        }}>2</div>
                        <div style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: 8, letterSpacing: 1.5,
                          color: "#4ADE80", marginTop: 3, fontWeight: 600,
                        }}>IN STOCK</div>
                      </div>
                      <div style={{ borderLeft: "1px solid rgba(74,222,128,0.15)", paddingLeft: 12 }}>
                        <div style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: 11.5, color: PAPER, fontWeight: 500,
                        }}>Electrical Cage — Shelf 9 — Bin S-200</div>
                        <div style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: 9, color: "rgba(255,255,255,0.3)", marginTop: 3,
                        }}>Last ordered Nov 2025 · Lead time 6–8 wks if restocking</div>
                      </div>
                    </div>

                    {/* Recent activity / history */}
                    {showHistory && (
                      <div style={{
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(255,255,255,0.06)",
                        borderRadius: 7, padding: "10px 12px",
                        opacity: phase(T.historyIn, 0.5),
                      }}>
                        <div style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: 9, letterSpacing: 1.5,
                          color: "rgba(255,255,255,0.35)", fontWeight: 600, marginBottom: 8,
                        }}>PANEL 3B — RECENT HISTORY</div>

                        {[
                          { date: "Mar 18", label: "Reefer bank added to Dock 7 circuit", tag: "OPS CHANGE", tagColor: "#F59E0B" },
                          { date: "Mar 22", label: "Breaker tripped — reset successfully", tag: "WO-2026-0791", tagColor: "rgba(255,255,255,0.35)" },
                          { date: "Mar 30", label: "Breaker tripped — reset successfully", tag: "WO-2026-0823", tagColor: "rgba(255,255,255,0.35)" },
                          { date: "Today", label: "Breaker tripped — will not reset", tag: "CURRENT", tagColor: "#EF4444" },
                        ].map((row, i) => (
                          <div key={i} style={{
                            display: "flex", alignItems: "center", gap: 10,
                            padding: "5px 0",
                            borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.03)" : "none",
                          }}>
                            <span style={{
                              fontFamily: "'JetBrains Mono', monospace",
                              fontSize: 10, color: i === 3 ? "#EF4444" : "rgba(255,255,255,0.4)",
                              fontWeight: i === 3 ? 600 : 400,
                              minWidth: 44,
                            }}>{row.date}</span>
                            <span style={{
                              flex: 1, fontSize: 11,
                              color: i === 3 ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.5)",
                              fontWeight: i === 3 ? 500 : 400,
                            }}>{row.label}</span>
                            <span style={{
                              fontFamily: "'JetBrains Mono', monospace",
                              fontSize: 8, letterSpacing: 0.8,
                              color: row.tagColor,
                              background: `${row.tagColor}12`,
                              border: `1px solid ${row.tagColor}30`,
                              borderRadius: 3, padding: "2px 5px",
                              whiteSpace: "nowrap",
                            }}>{row.tag}</span>
                          </div>
                        ))}

                        <div style={{
                          marginTop: 8, paddingTop: 8,
                          borderTop: "1px solid rgba(245,158,11,0.15)",
                          fontSize: 11, color: "#F59E0B",
                          lineHeight: 1.45,
                          display: "flex", gap: 6, alignItems: "flex-start",
                        }}>
                          <span style={{ fontSize: 13, marginTop: -1 }}>⚠</span>
                          <span>Pattern: 3 trips in 15 days since reefer bank was added to this circuit. Recommend load study — this panel may be undersized for current demand.</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Input bar */}
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
            }}>Ask about this asset...</div>
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

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(30px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
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

function RStep({ label, detail, done, fade, warn }) {
  return (
    <div style={{ opacity: fade }}>
      <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
        <span style={{
          fontSize: 11,
          color: done ? "#4ADE80" : AMBER,
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
          fontSize: 11,
          color: warn ? "#F59E0B" : AMBER_LIGHT,
          fontWeight: 500,
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
