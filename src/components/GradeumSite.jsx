import { useState, useEffect, useRef } from "react";

const NAVY = "#1B3A5C";
const AMBER = "#C4883A";
const CREAM = "#FAF7F2";
const DARK_CREAM = "#F0EBE3";
const MARBLE = "#E8E4DC";

// Roman Pillar — Bold Ionic with decorative crown and stepped base
const Pillar = ({ side = "left", opacity = 0.07, inset = "12%" }) => (
  <svg width="70" height="284" viewBox="0 0 80 400" preserveAspectRatio="xMidYMid meet"
    style={{ position: "absolute", [side]: inset, top: "16%", opacity, pointerEvents: "none" }}>
    
    {/* === TOP — Decorative crown === */}
    <rect x="0" y="0" width="80" height="5" fill={NAVY}/>
    <rect x="3" y="5" width="74" height="3" fill={NAVY} opacity="0.7"/>
    {/* Egg-and-dart motif */}
    {[8,18,28,38,48,58,68].map(x => (
      <ellipse key={`eg${x}`} cx={x} cy="12" rx="3.5" ry="4" fill={NAVY} opacity="0.6"/>
    ))}
    <rect x="2" y="17" width="76" height="12" fill={NAVY}/>
    {/* Frieze rosettes */}
    {[16,32,48,64].map(x => (
      <circle key={`fr${x}`} cx={x} cy="23" r="3" fill={CREAM} opacity="0.15"/>
    ))}
    <rect x="6" y="31" width="68" height="4" fill={NAVY}/>
    <rect x="4" y="36" width="72" height="3" fill={NAVY} opacity="0.6"/>

    {/* === Capital — Ionic scrolls === */}
    <rect x="12" y="42" width="56" height="5" fill={NAVY} rx="1"/>
    <path d="M16,52 Q9,48 13,44 Q17,40 22,44" fill="none" stroke={NAVY} strokeWidth="3.5"/>
    <circle cx="16" cy="48" r="4" fill={NAVY}/>
    <path d="M64,52 Q71,48 67,44 Q63,40 58,44" fill="none" stroke={NAVY} strokeWidth="3.5"/>
    <circle cx="64" cy="48" r="4" fill={NAVY}/>
    <rect x="16" y="52" width="48" height="4" fill={NAVY}/>

    {/* === SHAFT — Clean flutes === */}
    <rect x="20" y="58" width="40" height="280" fill={NAVY} rx="1"/>
    {[27, 34, 40, 46, 53].map(x => (
      <line key={`f${x}`} x1={x} y1="62" x2={x} y2="334" stroke={CREAM} strokeWidth="2.5" opacity="0.4"/>
    ))}

    {/* === BASE — Mirrored capital === */}
    <rect x="16" y="340" width="48" height="4" fill={NAVY}/>
    <path d="M16,344 Q9,348 13,352 Q17,356 22,352" fill="none" stroke={NAVY} strokeWidth="3.5"/>
    <circle cx="16" cy="348" r="4" fill={NAVY}/>
    <path d="M64,344 Q71,348 67,352 Q63,356 58,352" fill="none" stroke={NAVY} strokeWidth="3.5"/>
    <circle cx="64" cy="348" r="4" fill={NAVY}/>
    <rect x="12" y="351" width="56" height="5" fill={NAVY} rx="1"/>

    {/* === Base footer — Stepped plinth === */}
    <rect x="4" y="358" width="72" height="3" fill={NAVY} opacity="0.6"/>
    <rect x="6" y="362" width="68" height="4" fill={NAVY}/>
    <rect x="2" y="368" width="76" height="12" fill={NAVY}/>
    {[16,32,48,64].map(x => (
      <circle key={`fb${x}`} cx={x} cy="374" r="3" fill={CREAM} opacity="0.15"/>
    ))}
    <rect x="3" y="381" width="74" height="3" fill={NAVY} opacity="0.7"/>
    {[8,18,28,38,48,58,68].map(x => (
      <ellipse key={`eb${x}`} cx={x} cy="387" rx="3.5" ry="4" fill={NAVY} opacity="0.6"/>
    ))}
    <rect x="0" y="392" width="80" height="5" fill={NAVY}/>
  </svg>
);

// Roman Scutum with Crossed Spears — Protection of knowledge
// Based on historical Roman legionary scutum: curved rectangular, central boss, wing/eagle motif
const Scutum = ({ opacity = 0.09 }) => (
  <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
    <svg width="220" height="280" viewBox="0 0 220 280" style={{ opacity }}>
      {/* === CROSSED SPEARS (Pilum) behind shield === */}
      {/* Left spear shaft */}
      <line x1="30" y1="270" x2="190" y2="10" stroke={NAVY} strokeWidth="4" strokeLinecap="round"/>
      {/* Right spear shaft */}
      <line x1="190" y1="270" x2="30" y2="10" stroke={NAVY} strokeWidth="4" strokeLinecap="round"/>
      {/* Spear points — leaf-shaped (pilum tips) */}
      <path d="M188,14 L198,0 L194,18 L190,10 Z" fill={NAVY}/>
      <path d="M32,14 L22,0 L26,18 L30,10 Z" fill={NAVY}/>
      {/* Spear butt caps */}
      <circle cx="32" cy="268" r="4" fill={NAVY}/>
      <circle cx="188" cy="268" r="4" fill={NAVY}/>

      {/* === SHIELD BODY — Scutum === */}
      {/* Outer edge with slight curve (rounded rect) */}
      <rect x="48" y="32" width="124" height="216" rx="12" fill={CREAM} stroke={NAVY} strokeWidth="3.5"/>
      {/* Inner border — decorative frame */}
      <rect x="56" y="40" width="108" height="200" rx="8" fill="none" stroke={NAVY} strokeWidth="1.8"/>
      {/* Second inner border */}
      <rect x="62" y="46" width="96" height="188" rx="6" fill="none" stroke={NAVY} strokeWidth="0.8"/>

      {/* === WING MOTIF — Left wing === */}
      {/* Primary feathers */}
      <path d="M72,130 Q58,120 52,100 Q62,108 72,104 Q64,116 72,130" fill={NAVY} opacity="0.5"/>
      <path d="M72,122 Q54,108 50,86 Q62,96 72,90 Q62,106 72,122" fill={NAVY} opacity="0.4"/>
      <path d="M74,114 Q56,96 54,72 Q64,84 76,78 Q66,96 74,114" fill={NAVY} opacity="0.3"/>
      {/* Secondary feathers (shorter) */}
      <path d="M76,136 Q64,130 58,118 Q66,122 76,120" fill={NAVY} opacity="0.35"/>
      <path d="M78,144 Q68,140 62,130 Q70,132 78,128" fill={NAVY} opacity="0.25"/>
      
      {/* === WING MOTIF — Right wing === */}
      <path d="M148,130 Q162,120 168,100 Q158,108 148,104 Q156,116 148,130" fill={NAVY} opacity="0.5"/>
      <path d="M148,122 Q166,108 170,86 Q158,96 148,90 Q158,106 148,122" fill={NAVY} opacity="0.4"/>
      <path d="M146,114 Q164,96 166,72 Q156,84 144,78 Q154,96 146,114" fill={NAVY} opacity="0.3"/>
      <path d="M144,136 Q156,130 162,118 Q154,122 144,120" fill={NAVY} opacity="0.35"/>
      <path d="M142,144 Q152,140 158,130 Q150,132 142,128" fill={NAVY} opacity="0.25"/>

      {/* === CENTRAL LIGHTNING BOLT (fulmen) === */}
      <path d="M106,56 L100,90 L108,88 L98,130" fill="none" stroke={NAVY} strokeWidth="2" opacity="0.3"/>
      <path d="M114,56 L120,90 L112,88 L122,130" fill="none" stroke={NAVY} strokeWidth="2" opacity="0.3"/>
      
      {/* === LOWER LIGHTNING BOLT === */}
      <path d="M106,152 L100,186 L108,184 L98,224" fill="none" stroke={NAVY} strokeWidth="2" opacity="0.3"/>
      <path d="M114,152 L120,186 L112,184 L122,224" fill="none" stroke={NAVY} strokeWidth="2" opacity="0.3"/>

      {/* === CENTRAL BOSS (Umbo) === */}
      <circle cx="110" cy="140" r="22" fill={CREAM} stroke={NAVY} strokeWidth="2.5"/>
      <circle cx="110" cy="140" r="16" fill="none" stroke={NAVY} strokeWidth="1.5"/>
      <circle cx="110" cy="140" r="10" fill="none" stroke={NAVY} strokeWidth="1"/>
      <circle cx="110" cy="140" r="5" fill={NAVY}/>
      {/* Boss rivets */}
      {[0,60,120,180,240,300].map(angle => {
        const rad = (angle * Math.PI) / 180;
        return <circle key={angle} cx={110 + Math.cos(rad) * 19} cy={140 + Math.sin(rad) * 19} r="2" fill={NAVY} opacity="0.6"/>;
      })}

      {/* === HORIZONTAL SPINE through boss === */}
      <rect x="56" y="136" width="108" height="8" rx="2" fill="none" stroke={NAVY} strokeWidth="1" opacity="0.3"/>

      {/* === CORNER ROSETTES === */}
      {[[72,56],[148,56],[72,224],[148,224]].map(([cx,cy], i) => (
        <g key={`r${i}`}>
          <circle cx={cx} cy={cy} r="6" fill="none" stroke={NAVY} strokeWidth="0.8" opacity="0.4"/>
          <circle cx={cx} cy={cy} r="2.5" fill={NAVY} opacity="0.3"/>
        </g>
      ))}
    </svg>
  </div>
);

// Neural network nodes overlay (subtle, behind hero text)
const NeuralOverlay = ({ width = 1200, height = 600 }) => {
  const nodes = Array.from({ length: 12 }, (_, i) => ({
    x: 200 + (i % 4) * (width / 5) + Math.sin(i * 1.7) * 30,
    y: 100 + Math.floor(i / 4) * (height / 4) + Math.cos(i * 2.3) * 25,
  }));
  const edges = [];
  nodes.forEach((n, i) => {
    nodes.forEach((m, j) => {
      if (j > i && Math.hypot(n.x - m.x, n.y - m.y) < width / 3) {
        edges.push({ x1: n.x, y1: n.y, x2: m.x, y2: m.y, key: `${i}-${j}` });
      }
    });
  });
  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} style={{ position: "absolute", top: 0, left: 0, opacity: 0.03, pointerEvents: "none" }} preserveAspectRatio="xMidYMid slice">
      {edges.map(e => <line key={e.key} x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2} stroke={AMBER} strokeWidth="1"/>)}
      {nodes.map((n, i) => <circle key={i} cx={n.x} cy={n.y} r="3" fill={AMBER}/>)}
    </svg>
  );
};

// Oracle — a story that unfolds, then loops
const oracleMessages = [
  "What was built endures. What was learned persists. What was protected survives.",
  "Every document your firm has ever produced. Every drawing. Every report.",
  "Buried in shared drives. Lost in filing cabinets. Trapped in someone's memory.",
  "What if you could ask \u2014 and it answered?",
  "The answer exists in your records. Gradeum finds it.",
  "A simple question. An instant answer. Cited. Attributed. The Cascade.",
  "Consilium — when answers conflict, intelligence deliberates until truth emerges.",
  "Quaestio — complex questions decomposed. Each part investigated. Truth synthesized.",
  "From simple search to deep reasoning — intelligence that scales to the question.",
  "The Arcanum: your firm\u2019s living memory. Sealed. Sovereign. Yours.",
  "Ask once. The Arcanum remembers forever.",
  "Built for the firms that build the world.",
  "What was built endures. What was learned persists. What was protected survives.",
  "Gradere in futurum.",
];

const Oracle = () => {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const cycle = () => {
      setVisible(false);
      setTimeout(() => {
        setIndex(i => (i + 1) % oracleMessages.length);
        setVisible(true);
      }, 1200);
    };
    const interval = setInterval(cycle, 5000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "center",
      height: 44, maxWidth: 620, margin: "0 auto", padding: "0 24px",
    }}>
      <div style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 17, color: AMBER,
        fontStyle: "italic", letterSpacing: 0.6, textAlign: "center",
        opacity: visible ? 0.85 : 0,
        transition: "opacity 1.2s ease-in-out",
      }}>
        {oracleMessages[index]}
      </div>
    </div>
  );
};

// Demo Modal Shell
const DemoModal = ({ show, onClose, title, children }) => {
  if (!show) return null;
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(27,58,92,0.85)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }} onClick={onClose}>
      <div style={{ background: CREAM, borderRadius: 16, maxWidth: 800, width: "100%", maxHeight: "85vh", overflow: "auto", position: "relative", border: `2px solid ${AMBER}` }} onClick={e => e.stopPropagation()}>
        <div style={{ padding: "20px 24px 12px", borderBottom: `1px solid ${MARBLE}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 24, fontWeight: 700, color: NAVY }}>{title}</div>
            <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 13, color: AMBER, fontStyle: "italic" }}>Interactive Demonstration</div>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 24, color: NAVY, cursor: "pointer", padding: 8 }}>✕</button>
        </div>
        <div style={{ padding: 24 }}>{children}</div>
      </div>
    </div>
  );
};

// ===== PRAXIS DEMO =====
const PraxisDemo = () => {
  const [messages, setMessages] = useState([
    { role: "system", text: "32 project documents indexed. Custos connected. Ready." }
  ]);
  const [typing, setTyping] = useState(false);
  const [praxisEnd, setPraxisEnd] = useState(0);
  const [inputText, setInputText] = useState("");
  const [activeNav, setActiveNav] = useState(0);
  const [cursorPos, setCursorPos] = useState(null);
  const bottomRef = useRef(null);
  const queryIdxRef = useRef(0);
  const autoRef = useRef(null);

  const queries = [
    { q: "What is the pile capacity on the wharf project?", type: "SEARCH", cost: "$0.02", time: "0.8s", nav: 0,
      a: "Based on the 2023 Geotech Report (p.14, Section 4.2), the design pile capacity for the wharf project is 120 tons axial compression per HP14\u00D789 pile. The as-built driving records (Drawing S-3, General Note 7) confirm a minimum penetration of 42 feet into the bearing stratum.\n\n\uD83D\uDCC4 Sources: Geotech_Report_2023.pdf (p.14), S-3_Structural_Plans.pdf (Note 7)" },
    { q: "Was that damage present in the last inspection?", type: "CONSILIUM", cost: "$0.22", time: "4.2s", nav: 0, badge: "Consensus reached",
      a: "\u26A1 Consilium activated \u2014 divergence detected on inspection scope.\n\nAfter 2 rounds of deliberation:\n\nThe September 2023 Level II inspection rated Pile Cap 7-14 as Condition Rating 5 (Fair). Photos 14-16 show intact concrete surfaces on the north face. No deficiencies were noted at that time.\n\nBoth the 2023 record and your current observation are available for comparison.\n\n\uD83D\uDCC4 Sources: Inspection_Level_II_2023.pdf (p.31), Condition_Rating_Summary.xlsx (Row 47)" },
    { q: "Generate the weekly QC report", type: "REPORT", cost: "$0.36", time: "3.1s", nav: 3, badge: "Document generated", richType: "qc_report" },
    { q: "Show me the 12-week resource forecast", type: "FORECAST", cost: "$0.02", time: "1.4s", nav: 4, richType: "forecast" },
    { q: "Generate the March invoice", type: "INVOICE", cost: "$0.36", time: "2.8s", nav: 5, badge: "Invoice ready", richType: "invoice" },
  ];

  const executeQuery = (idx) => {
    const q = queries[idx];
    if (!q) { setPraxisEnd(1); return; }
    setTyping(true);
    setActiveNav(q.nav);
    if (q.q) {
      setMessages(prev => [...prev, { role: "user", text: q.q }]);
    } else {
      setMessages(prev => [...prev, { role: "user", text: "\u25B6 " + q.type, isSidebar: true }]);
    }
    const delay = q.type === "CONSILIUM" ? 3500 : q.richType ? 2500 : 1800;
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: "assistant", text: q.a || "", type: q.type, cost: q.cost, time: q.time, badge: q.badge, richType: q.richType
      }]);
      setTyping(false);
      setInputText("");
      queryIdxRef.current = idx + 1;
    }, delay);
  };

  const typeAndSend = (idx) => {
    const q = queries[idx];
    if (!q) { setPraxisEnd(1); return; }

    const text = q.q;
    let i = 0;
    setInputText("");
    const typeInterval = setInterval(() => {
      i++;
      setInputText(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(typeInterval);
        setTimeout(() => executeQuery(idx), 800);
      }
    }, 55);
  };

  useEffect(() => {
    if (praxisEnd > 0) return;
    const startDelay = setTimeout(() => {
      typeAndSend(0);
    }, 2500);
    return () => clearTimeout(startDelay);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    if (!typing && queryIdxRef.current > 0 && queryIdxRef.current < queries.length && praxisEnd === 0) {
      const nextDelay = setTimeout(() => {
        typeAndSend(queryIdxRef.current);
      }, 3000);
      return () => clearTimeout(nextDelay);
    }
    if (!typing && queryIdxRef.current >= queries.length && praxisEnd === 0) {
      const endDelay = setTimeout(() => setPraxisEnd(1), 3500);
      return () => clearTimeout(endDelay);
    }
  }, [messages, typing]);

  const navItems = [
    { label: "Search", sub: "Intelligence" },
    { label: "Projects", sub: "10 active" },
    { label: "Documents", sub: "32 indexed" },
    { label: "QC Review", sub: "2 pending", alert: 2 },
    { label: "Forecast", sub: "Resources" },
    { label: "Invoicing", sub: "March" },
    { label: "Arcanum", sub: "Memory" },
    { label: "Alerts", sub: "3 active", alert: 3 },
  ];

  return (
    <div style={{ position: "relative", minHeight: 480 }}>
      {praxisEnd === 0 && (<>
      <div style={{ display: "flex", gap: 0, borderRadius: 10, overflow: "hidden", border: "1px solid #D0CCC4", height: 440 }}>
        {/* Sidebar — professional, no emoji */}
        <div style={{ width: 72, background: "#1a2d44", padding: "6px 0", display: "flex", flexDirection: "column", gap: 1, flexShrink: 0 }}>
          {navItems.map((item, i) => (
            <div key={i} style={{ padding: "7px 6px", cursor: "pointer", position: "relative", borderLeft: i === activeNav ? "2px solid " + AMBER : "2px solid transparent",
              background: i === activeNav ? "rgba(196,136,58,0.08)" : "transparent", transition: "all 0.3s" }}>
              <div style={{ fontSize: 9, color: i === activeNav ? AMBER : "rgba(255,255,255,0.7)", fontWeight: i === activeNav ? 700 : 400, fontFamily: "'Lato', sans-serif", letterSpacing: 0.3 }}>{item.label}</div>
              <div style={{ fontSize: 7, color: i === activeNav ? "rgba(196,136,58,0.6)" : "rgba(255,255,255,0.3)", marginTop: 1 }}>{item.sub}</div>
              {item.alert && <div style={{ position: "absolute", top: 5, right: 5, minWidth: 12, height: 12, borderRadius: 6, background: "#EF4444", color: "#FFF", fontSize: 7, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 3px" }}>{item.alert}</div>}
              {cursorPos === i && <div style={{ position: "absolute", right: -2, top: "50%", transform: "translateY(-50%)", fontSize: 14, animation: "pulse 0.4s ease-in-out" }}>\u25C0</div>}
            </div>
          ))}
        </div>
        {/* Main area */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#FCFCFA" }}>
          {/* Header */}
          <div style={{ padding: "6px 14px", borderBottom: "1px solid #EBE7DF", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: 10, color: NAVY, fontWeight: 600, fontFamily: "'Lato', sans-serif" }}>{navItems[activeNav]?.label}</div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <div style={{ width: 6, height: 6, borderRadius: 3, background: "#22C55E" }}/>
              <span style={{ fontSize: 8, color: "#999" }}>Custos connected</span>
            </div>
          </div>
          {/* Messages */}
          <div style={{ flex: 1, overflow: "auto", padding: 12 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ marginBottom: 12, display: "flex", flexDirection: "column", alignItems: m.role === "user" ? "flex-end" : "flex-start" }}>
            {m.type && (
              <div style={{ display: "flex", gap: 6, marginBottom: 3, alignItems: "center" }}>
                <span style={{ fontSize: 9, fontWeight: 700,
                  color: m.type === "CONSILIUM" ? "#8B5CF6" : m.type === "REPORT" || m.type === "INVOICE" ? "#0E7490" : m.type === "FORECAST" ? "#B45309" : "#228B22",
                  background: m.type === "CONSILIUM" ? "#F3EEFF" : m.type === "REPORT" || m.type === "INVOICE" ? "#ECFEFF" : m.type === "FORECAST" ? "#FFF7ED" : "#F0FFF0",
                  padding: "1px 6px", borderRadius: 8, textTransform: "uppercase", letterSpacing: 0.8 }}>{m.type}</span>
                {m.badge && <span style={{ fontSize: 9, color: "#AAA" }}>{m.badge}</span>}
                <span style={{ fontSize: 9, color: AMBER, fontWeight: 600 }}>{m.cost}</span>
                {m.time && <span style={{ fontSize: 9, color: "#CCC" }}>{m.time}</span>}
              </div>
            )}
            <div style={{
              background: m.role === "user" ? (m.isSidebar ? "#E8E4DC" : NAVY) : m.role === "system" ? "#F5F3EE" : "#FFF",
              color: m.role === "user" && !m.isSidebar ? "#FFF" : NAVY,
              padding: m.richType ? "0" : "8px 12px", borderRadius: 8, maxWidth: m.richType ? "100%" : "88%", fontSize: 12, lineHeight: 1.6,
              whiteSpace: m.richType ? "normal" : "pre-wrap", border: m.role === "assistant" && !m.richType ? "1px solid #EBE7DF" : "none",
              fontFamily: m.role === "system" ? "'Lato', sans-serif" : "inherit",
              fontStyle: m.role === "system" ? "normal" : "normal", width: m.richType ? "100%" : "auto",
              fontSize: m.role === "system" ? 10 : 12, color: m.role === "system" ? "#999" : (m.role === "user" && !m.isSidebar ? "#FFF" : NAVY),
            }}>
              {m.richType === "qc_report" ? (
                <div style={{ border: "1px solid #EBE7DF", borderRadius: 8, overflow: "hidden" }}>
                  <div style={{ background: "#1B3A5C", padding: "8px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ color: "#FFF", fontWeight: 700, fontSize: 12 }}>QC Report — Wharf Rehabilitation</div>
                    <div style={{ color: "#C4883A", fontSize: 9 }}>Week of Mar 24-28, 2026</div>
                  </div>
                  <div style={{ padding: 10 }}>
                    <table style={{ width: "100%", fontSize: 10, borderCollapse: "collapse" }}>
                      <thead><tr style={{ borderBottom: "2px solid #E8E4DC" }}>
                        <th style={{ textAlign: "left", padding: "3px 6px", color: "#888", fontSize: 9 }}>Item</th>
                        <th style={{ textAlign: "left", padding: "3px 6px", color: "#888", fontSize: 9 }}>Status</th>
                        <th style={{ textAlign: "left", padding: "3px 6px", color: "#888", fontSize: 9 }}>Action</th>
                      </tr></thead>
                      <tbody>
                        <tr style={{ borderBottom: "1px solid #F0EBE3" }}><td style={{ padding: "4px 6px" }}>Pile Cap Calcs (7-1 to 7-8)</td><td style={{ padding: "4px 6px" }}><span style={{ background: "#DCFCE7", color: "#166534", padding: "1px 5px", borderRadius: 4, fontSize: 9, fontWeight: 600 }}>APPROVED</span></td><td style={{ padding: "4px 6px", color: "#888", fontSize: 9 }}>Cleared for PE review</td></tr>
                        <tr style={{ borderBottom: "1px solid #F0EBE3" }}><td style={{ padding: "4px 6px" }}>Pile Cap Calcs (7-9 to 7-14)</td><td style={{ padding: "4px 6px" }}><span style={{ background: "#DCFCE7", color: "#166534", padding: "1px 5px", borderRadius: 4, fontSize: 9, fontWeight: 600 }}>APPROVED</span></td><td style={{ padding: "4px 6px", color: "#888", fontSize: 9 }}>Cleared for PE review</td></tr>
                        <tr style={{ borderBottom: "1px solid #F0EBE3" }}><td style={{ padding: "4px 6px" }}>Pile Driving Analysis</td><td style={{ padding: "4px 6px" }}><span style={{ background: "#FEF9C3", color: "#854D0E", padding: "1px 5px", borderRadius: 4, fontSize: 9, fontWeight: 600 }}>RETURNED</span></td><td style={{ padding: "4px 6px", color: "#B45309", fontSize: 9 }}>Bearing capacity needs geotech confirmation</td></tr>
                        <tr style={{ borderBottom: "1px solid #F0EBE3" }}><td style={{ padding: "4px 6px" }}>Drawing Set S-1 through S-5</td><td style={{ padding: "4px 6px" }}><span style={{ background: "#DBEAFE", color: "#1E40AF", padding: "1px 5px", borderRadius: 4, fontSize: 9, fontWeight: 600 }}>IN REVIEW</span></td><td style={{ padding: "4px 6px", color: "#888", fontSize: 9 }}>Awaiting PE review</td></tr>
                        <tr><td style={{ padding: "4px 6px" }}>RFI — Anchor Bolt Sub</td><td style={{ padding: "4px 6px" }}><span style={{ background: "#FFF7ED", color: "#9A3412", padding: "1px 5px", borderRadius: 4, fontSize: 9, fontWeight: 600 }}>PENDING</span></td><td style={{ padding: "4px 6px", color: "#888", fontSize: 9 }}>Contractor awaiting response</td></tr>
                      </tbody>
                    </table>
                    <div style={{ marginTop: 8, display: "flex", gap: 6 }}>
                      <div style={{ flex: 1, background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 4, padding: "6px 8px" }}>
                        <div style={{ fontSize: 9, fontWeight: 700, color: "#DC2626" }}>PE REVIEW REQUIRED</div>
                        <div style={{ fontSize: 8, color: "#888" }}>S-3 and S-4 need responsible charge declaration</div>
                      </div>
                      <div style={{ flex: 1, background: "#FFF7ED", border: "1px solid #FED7AA", borderRadius: 4, padding: "6px 8px" }}>
                        <div style={{ fontSize: 9, fontWeight: 700, color: "#B45309" }}>REVIEWER OVERLOAD</div>
                        <div style={{ fontSize: 8, color: "#888" }}>Lead reviewer at 217% capacity</div>
                      </div>
                    </div>
                    <div style={{ marginTop: 6, fontSize: 8, color: "#AAA", textAlign: "right" }}>Template: Your Firm QC Report · <span style={{ color: "#C4883A" }}>Customize</span></div>
                  </div>
                </div>
              ) : m.richType === "forecast" ? (
                <div style={{ border: "1px solid #EBE7DF", borderRadius: 8, overflow: "hidden" }}>
                  <div style={{ background: "#1B3A5C", padding: "8px 12px", display: "flex", justifyContent: "space-between" }}>
                    <div style={{ color: "#FFF", fontWeight: 700, fontSize: 12 }}>12-Week Resource Forecast</div>
                    <div style={{ color: "#C4883A", fontSize: 9 }}>Apr 1 — Jun 24, 2026</div>
                  </div>
                  <div style={{ padding: "8px 10px", position: "relative" }}>
                    <div style={{ display: "flex", marginLeft: 60, marginBottom: 2, position: "relative" }}>
                      {["Apr 1","Apr 15","Apr 29","May 13","May 27","Jun 10","Jun 24"].map((d,i) => (
                        <div key={i} style={{ flex: 1, fontSize: 6, color: "#BBB", textAlign: "center" }}>{d}</div>
                      ))}
                      <div style={{ position: "absolute", left: "3%", top: 6, width: 1, height: 180, background: "#EF4444", opacity: 0.4, zIndex: 5 }}/>
                      <div style={{ position: "absolute", left: "0.5%", top: 0, fontSize: 6, color: "#EF4444", fontWeight: 700, zIndex: 5 }}>TODAY</div>
                    </div>
                    <div style={{ position: "relative", marginLeft: 60 }}>
                      {[
                        { name: "Wharf Rehab", color: "#2563EB", s: 0, e: 55, res: ["R.M.","T.K.","A.S."] },
                        { name: "Seawall Repair", color: "#059669", s: 0, e: 72, res: ["J.P.","D.W."] },
                        { name: "Dock Inspect", color: "#D97706", s: 0, e: 38, res: ["M.C."] },
                        { name: "Bridge Study", color: "#7C3AED", s: 10, e: 60, res: ["L.H.","K.R."] },
                        { name: "Bulkhead", color: "#0891B2", s: 20, e: 75, res: ["T.K.","N.F."] },
                        { name: "Marina Exp", color: "#BE185D", s: 35, e: 85, res: ["R.M.","S.B."] },
                        { name: "Jetty Assess", color: "#4F46E5", s: 5, e: 30, res: ["P.L."] },
                        { name: "Fender Rep", color: "#15803D", s: 45, e: 90, res: ["A.S.","D.W."] },
                        { name: "Dredge Anlys", color: "#B45309", s: 60, e: 95, res: ["M.C.","J.P."] },
                        { name: "Permit Supp", color: "#6D28D9", s: 0, e: 100, res: ["K.R."] },
                      ].map((p, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", marginBottom: 1 }}>
                          <div style={{ position: "absolute", left: -60, width: 56, fontSize: 7, color: "#1B3A5C", fontWeight: 500, textAlign: "right" }}>{p.name}</div>
                          <div style={{ flex: 1, background: "#F9FAFB", borderRadius: 2, height: 14, position: "relative" }}>
                            <div style={{ position: "absolute", left: p.s+"%", width: (p.e-p.s)+"%", height: "100%", background: p.color, borderRadius: 2, opacity: 0.15 }}/>
                            <div style={{ position: "absolute", left: p.s+"%", width: (p.e-p.s)+"%", height: "100%", display: "flex", alignItems: "center", gap: 1, paddingLeft: 2 }}>
                              {p.res.map((r, j) => (
                                <span key={j} style={{ fontSize: 5, color: p.color, fontWeight: 700, background: "rgba(255,255,255,0.85)", padding: "0 2px", borderRadius: 2, lineHeight: "10px" }}>{r}</span>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                      <svg width="100%" height="100%" viewBox="0 0 300 150" preserveAspectRatio="none" style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 3, pointerEvents: "none" }}>
                        <line x1="0" y1="82" x2="300" y2="82" stroke="#EF4444" strokeWidth="0.8" strokeDasharray="4,3" opacity="0.5"/>
                        <polyline points="0,20 25,18 50,22 75,25 100,28 125,35 150,80 175,90 200,70 225,65 250,72 275,78" fill="none" stroke="#EF4444" strokeWidth="1.8"/>
                        <polyline points="0,32 25,28 50,26 75,32 100,38 125,45 150,52 175,65 200,90 225,105 250,110 275,118" fill="none" stroke="#F59E0B" strokeWidth="1.8"/>
                        <polyline points="0,58 25,52 50,48 75,44 100,50 125,62 150,70 175,60 200,50 225,62 250,75 275,82" fill="none" stroke="#8B5CF6" strokeWidth="1.8"/>
                      </svg>
                    </div>
                    <div style={{ marginTop: 4, fontSize: 8, color: "#AAA", textAlign: "right" }}>Dashboard: Your Firm — Resource View · <span style={{ color: "#C4883A" }}>Customize</span></div>
                  </div>
                </div>
              ) : m.richType === "invoice" ? (
                <div style={{ border: "1px solid #EBE7DF", borderRadius: 8, overflow: "hidden", background: "#FAFAF8" }}>
                  <div style={{ padding: "12px 14px", borderBottom: "2px solid #1B3A5C" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <div>
                        <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: 14, fontWeight: 700, color: "#1B3A5C", letterSpacing: 2 }}>INVOICE</div>
                        <div style={{ fontSize: 9, color: "#888" }}>Your Firm, Inc.</div>
                      </div>
                      <div style={{ textAlign: "right", fontSize: 9, color: "#888" }}>
                        <div>#INV-2026-0312</div><div>March 31, 2026</div>
                      </div>
                    </div>
                  </div>
                  <div style={{ padding: "8px 14px" }}>
                    <div style={{ fontSize: 9, color: "#888" }}>Bill To: <strong style={{ color: "#1B3A5C" }}>Client Organization</strong></div>
                    <table style={{ width: "100%", fontSize: 10, borderCollapse: "collapse", marginTop: 8 }}>
                      <tbody>
                        <tr style={{ borderBottom: "1px solid #F0EBE3" }}><td style={{ padding: "4px 0" }}>Professional Engineering Services</td><td style={{ textAlign: "right", padding: "4px 0" }}>342.5 hrs</td><td style={{ textAlign: "right", padding: "4px 0" }}>$58,625</td></tr>
                        <tr style={{ borderBottom: "1px solid #F0EBE3" }}><td style={{ padding: "4px 0", color: "#888" }}>Reimbursables</td><td style={{ textAlign: "right" }}></td><td style={{ textAlign: "right", padding: "4px 0" }}>$2,340</td></tr>
                        <tr style={{ borderTop: "2px solid #1B3A5C" }}><td style={{ padding: "6px 0", fontWeight: 700 }}>Total Due</td><td></td><td style={{ textAlign: "right", fontWeight: 700, fontSize: 13 }}>$60,965</td></tr>
                      </tbody>
                    </table>
                  </div>
                  <div style={{ padding: "6px 14px", background: "#F5F3EE", borderTop: "1px solid #EBE7DF" }}>
                    <div style={{ fontSize: 9, fontWeight: 600, color: "#1B3A5C", marginBottom: 2 }}>Progress Narrative</div>
                    <div style={{ fontSize: 8, color: "#888", lineHeight: 1.5, fontStyle: "italic" }}>Engineering design at 65% completion. Structural calculations submitted for QC. Drawing set S-1 through S-5 in PE review.</div>
                  </div>
                  <div style={{ padding: "4px 14px", display: "flex", justifyContent: "space-between", fontSize: 8 }}>
                    <span style={{ color: "#888" }}>Contract: $60,965 of $185,000 (33%)</span>
                    <span style={{ color: "#059669", fontWeight: 600 }}>On budget</span>
                  </div>
                  <div style={{ padding: "4px 14px 6px", fontSize: 8, color: "#AAA", textAlign: "right" }}>Template: Your Firm Invoice · <span style={{ color: "#C4883A" }}>Customize</span></div>
                </div>
              ) : m.text}</div>
          </div>
        ))}
        {typing && (
          <div style={{ color: "#C4883A", fontSize: 11, fontStyle: "italic", padding: "4px 0" }}>
            Deliberating<span style={{ animation: "pulse 1s infinite" }}>...</span>
          </div>
        )}
        <div ref={bottomRef}/>
          </div>
          {/* Input bar */}
          <div style={{ padding: "6px 10px", borderTop: "1px solid #EBE7DF", display: "flex", alignItems: "center", gap: 6, background: "#FFF" }}>
            <div style={{ flex: 1, fontSize: 11, color: typing ? "#CCC" : "#1B3A5C", fontFamily: "'Lato', sans-serif", minHeight: 18, padding: "4px 8px", background: "#F9F9F7", borderRadius: 4, border: "1px solid #E8E4DC" }}>
              {typing ? "Processing..." : inputText || <span style={{ color: "#CCC" }}>Ask anything...</span>}
              {!typing && inputText && <span style={{ animation: "pulse 0.5s infinite", color: "#C4883A" }}>|</span>}
            </div>
          </div>
        </div>
      </div>
      </>)}

      {/* End screen: Customization */}
      {praxisEnd === 1 && (
        <div style={{ background: "#FAF7F2", padding: 20, borderRadius: 10, animation: "fadeUp 0.6s ease-out" }}>
          <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: 16, color: "#1B3A5C", fontWeight: 700, textAlign: "center", marginBottom: 4 }}>Fully Customizable to Your Practice</div>
          <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 12, color: "#C4883A", fontStyle: "italic", textAlign: "center", marginBottom: 16 }}>Every output shaped to your firm</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 16 }}>
            {[
              { title: "Report Templates", desc: "QC reports, progress reports, condition assessments — your formats" },
              { title: "Dashboards", desc: "Resource views, project status, financial tracking — your layout" },
              { title: "Invoice Formats", desc: "Match your billing structure, your PO formats, your clients" },
              { title: "Workflows", desc: "PE review chains, QC routing, approval sequences — automated" },
              { title: "The Arcanum", desc: "Institutional memory. Encrypted. On your server. Grows with every query." },
              { title: "Discipline-Specific", desc: "Structural, coastal, civil, environmental — adapts to your practice" },
            ].map((item, i) => (
              <div key={i} style={{ padding: "8px 10px", background: "#FFF", borderRadius: 6, border: "1px solid #EBE7DF" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#1B3A5C", marginBottom: 3 }}>{item.title}</div>
                <div style={{ fontSize: 9, color: "#888", lineHeight: 1.5 }}>{item.desc}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center" }}>
            <button onClick={() => setPraxisEnd(2)} style={{ background: "#1B3A5C", color: "#FFF", border: "none", borderRadius: 6, padding: "8px 24px", fontSize: 11, cursor: "pointer", fontFamily: "'Lato', sans-serif" }}>Continue →</button>
          </div>
        </div>
      )}

      {/* End screen: Hook */}
      {praxisEnd === 2 && (
        <div style={{ background: "linear-gradient(135deg, #1B3A5C, #1a2d44)", borderRadius: 10, padding: 28, textAlign: "center", animation: "fadeUp 0.8s ease-out" }}>
          <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: 22, color: "#C4883A", fontWeight: 700, marginBottom: 14, letterSpacing: 2 }}>The power is in your hands.</div>
          <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 15, color: "rgba(255,255,255,0.6)", fontStyle: "italic", lineHeight: 1.8, maxWidth: 380, margin: "0 auto 20px" }}>
            Every report. Every dashboard. Every workflow.<br/>Shaped to your firm.<br/>Built from your documents.<br/>Running on your server.<br/>Controlled by you.
          </div>
          <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 13, color: "#C4883A", fontStyle: "italic", opacity: 0.5, marginBottom: 20 }}>Gradere in futurum.</div>
          <button onClick={() => setPraxisEnd(0)} style={{ background: "rgba(196,136,58,0.12)", color: "#C4883A", border: "1px solid rgba(196,136,58,0.25)", borderRadius: 6, padding: "8px 20px", fontSize: 11, cursor: "pointer", fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: "italic" }}>Return</button>
        </div>
      )}
    </div>
  );
};

const CivitasDemo = () => {
  const [step, setStep] = useState(-1);
  const [fadeIn, setFadeIn] = useState(true);
  const [activeNav, setActiveNav] = useState(0);
  const [civEnd, setCivEnd] = useState(0);
  const autoRef = useRef(null);

  const navItems = [
    { label: "Field Capture", sub: "Observations" },
    { label: "Assets", sub: "Registry" },
    { label: "Inspections", sub: "History" },
    { label: "Documents", sub: "Indexed" },
    { label: "Memory", sub: "Arcanum" },
    { label: "Work Orders", sub: "Active" },
    { label: "Reports", sub: "Templates" },
    { label: "Alerts", sub: "2 new", alert: 2 },
  ];

  const steps = [
    { title: "Field Observation", subtitle: "Wharf 7, East Face", nav: 0,
      content: (
        <div>
          <div style={{ background: "#333", borderRadius: 8, height: 160, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #4a6741 0%, #5a7a52 30%, #8B8B7A 60%, #A09A8A 100%)", opacity: 0.9 }}/>
            <div style={{ position: "relative", textAlign: "center", color: "#FFF" }}>
              <div style={{ fontSize: 32, marginBottom: 4 }}>\uD83D\uDCF8</div>
              <div style={{ fontSize: 12, fontWeight: 600 }}>Pile Cap 7-14 \u2014 Spalling Detected</div>
              <div style={{ fontSize: 9, opacity: 0.7 }}>Photo captured via Gradeum Civitas</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
            <div style={{ flex: 1, background: "#FFF", borderRadius: 6, padding: 8, border: "1px solid #EBE7DF", fontSize: 10 }}>
              <div style={{ color: "#999", fontSize: 8 }}>GPS</div>
              <div style={{ color: "#1B3A5C", fontWeight: 600 }}>27.8136\u00B0 N, 97.3964\u00B0 W</div>
            </div>
            <div style={{ flex: 1, background: "#FFF", borderRadius: 6, padding: 8, border: "1px solid #EBE7DF", fontSize: 10 }}>
              <div style={{ color: "#999", fontSize: 8 }}>TIMESTAMP</div>
              <div style={{ color: "#1B3A5C", fontWeight: 600 }}>Apr 1, 2026 \u00B7 10:42 AM</div>
            </div>
            <div style={{ flex: 1, background: "#FFF", borderRadius: 6, padding: 8, border: "1px solid #EBE7DF", fontSize: 10 }}>
              <div style={{ color: "#999", fontSize: 8 }}>ASSET</div>
              <div style={{ color: "#1B3A5C", fontWeight: 600 }}>Pile Cap 7-14 (auto-matched)</div>
            </div>
          </div>
          <div style={{ background: "#FFF", borderRadius: 6, padding: 10, border: "1px solid #EBE7DF", fontSize: 11, color: "#1B3A5C" }}>
            <div style={{ color: "#999", fontSize: 8, marginBottom: 4 }}>FIELD QUERY</div>
            "Tell me what you know about this. It looks damaged."
          </div>
        </div>
      )},
    { title: "Memory + Document Retrieval", subtitle: "Custos searching local corpus and Institutional Memory", nav: 4,
      content: (
        <div>
          <div style={{ background: "#1B3A5C", borderRadius: 8, padding: 12 }}>
            {[
              { label: "Memory search", status: "No prior observations for Pile Cap 7-14", result: "MISS" },
              { label: "GPS match", status: "Asset matched: Wharf 7, Pile Cap 7-14 (12m radius)", result: "HIT" },
              { label: "Document retrieval", status: "4 documents found across 3 engineering firms", result: "4 docs" },
              { label: "Image analysis", status: "Concrete spalling, exposed rebar, north face", result: "ANALYZED" },
            ].map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 0", borderBottom: i < 3 ? "1px solid #2A5580" : "none" }}>
                <div>
                  <div style={{ fontSize: 10, color: "#C4883A", fontWeight: 600 }}>{s.label}</div>
                  <div style={{ fontSize: 9, color: "#8AACCC" }}>{s.status}</div>
                </div>
                <span style={{ fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 4,
                  color: s.result === "MISS" ? "#F87171" : "#4ADE80",
                  background: s.result === "MISS" ? "#3A2020" : "#203A20" }}>{s.result}</span>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 10, color: "#888", fontStyle: "italic", textAlign: "center", marginTop: 8 }}>
            First observation of this asset. Institutional Memory will remember this for all future queries.
          </div>
        </div>
      )},
    { title: "Intelligence Response", subtitle: "Cited findings from your records", nav: 3,
      content: (
        <div>
          <div style={{ background: "#FFF", borderRadius: 8, border: "1px solid #EBE7DF", padding: 12, fontSize: 11, lineHeight: 1.7, color: "#1B3A5C" }}>
            <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
              <span style={{ fontSize: 9, fontWeight: 700, color: "#228B22", background: "#F0FFF0", padding: "1px 6px", borderRadius: 6 }}>VERIFIED</span>
              <span style={{ fontSize: 9, color: "#C4883A" }}>$0.06</span>
            </div>
            <p style={{ margin: "0 0 8px" }}>This is <strong>Pile Cap 7-14</strong> on the east face of Wharf 7. The image shows concrete spalling with exposed reinforcing steel on the north face.</p>
            <p style={{ margin: "0 0 8px" }}>The September 2023 Level II inspection rated this pile cap as <strong>Condition 5 (Fair)</strong>. Photos 14-16 from that inspection show intact concrete on the north face. No deficiencies were noted at that time.</p>
            <p style={{ margin: "0 0 8px" }}>Both the 2023 inspection record and your current photo are available for comparison.</p>
            <div style={{ background: "#F5F3EE", borderRadius: 6, padding: 8, marginTop: 8, fontSize: 9 }}>
              Sources: Inspection_Level_II_2023.pdf (p.31) \u00B7 Master_Condition_Ratings.xlsx (Row 47) \u00B7 WO-4471_Tie_Rod_Repair.pdf
            </div>
          </div>
          <div style={{ marginTop: 10, display: "flex", gap: 6 }}>
            <div style={{ flex: 1, background: "#228B22", color: "#FFF", borderRadius: 6, padding: 8, textAlign: "center", fontSize: 10, fontWeight: 600 }}>Generate Work Order</div>
            <div style={{ flex: 1, background: "#C4883A", color: "#FFF", borderRadius: 6, padding: 8, textAlign: "center", fontSize: 10, fontWeight: 600 }}>Generate Inspection Report</div>
          </div>
          <div style={{ marginTop: 6, fontSize: 8, color: "#AAA", textAlign: "right" }}>Using: Your organization\u2019s templates \u00B7 <span style={{ color: "#C4883A" }}>Customize</span></div>
        </div>
      )},
    { title: "Observation Recorded", subtitle: "Stored in Institutional Memory", nav: 4,
      content: (
        <div>
          <div style={{ background: "#1B3A5C", borderRadius: 8, padding: 16, textAlign: "center", marginBottom: 12 }}>
            <div style={{ fontSize: 28, marginBottom: 4 }}>\uD83D\uDD12</div>
            <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 16, color: "#C4883A", fontWeight: 700 }}>Stored in Institutional Memory</div>
            <div style={{ fontSize: 9, color: "#8AACCC", marginTop: 4 }}>Encrypted \u00B7 GPS-tagged \u00B7 Timestamped \u00B7 Immutable</div>
          </div>
          <div style={{ background: "#FFF", borderRadius: 6, border: "1px solid #EBE7DF", padding: 10, fontSize: 10, lineHeight: 1.8 }}>
            <div><strong>Asset:</strong> Pile Cap 7-14, Wharf 7 East Face</div>
            <div><strong>GPS:</strong> 27.8136\u00B0 N, 97.3964\u00B0 W</div>
            <div><strong>Observation:</strong> Spalling with exposed rebar on north face</div>
            <div><strong>Documents cited:</strong> 4 source documents verified</div>
          </div>
          <div style={{ marginTop: 10, padding: 10, background: "#F5F3EE", borderRadius: 6, fontSize: 11, color: "#1B3A5C", fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: "italic", textAlign: "center" }}>
            Next time anyone queries Pile Cap 7-14, this observation will inform the response. The organization\u2019s institutional memory builds itself.
          </div>
        </div>
      )},
    { title: "Deep Infrastructure Knowledge", subtitle: "Your complete document history \u2014 indexed and understood", nav: 3,
      content: (
        <div>
          <div style={{ background: "#FFF", borderRadius: 8, border: "1px solid #EBE7DF", padding: 12, fontSize: 11, lineHeight: 1.7, color: "#1B3A5C" }}>
            <div style={{ fontSize: 9, color: "#999", marginBottom: 8, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>Documents related to Pile Cap 7-14 \u2014 ranked by relevance</div>
            {[
              { path: "S:/Engineering/Inspections/2023/Inspection_Level_II_2023.pdf", rel: "98%", pages: "p. 28\u201334", proj: "Annual Inspection 2023" },
              { path: "S:/Engineering/Condition_Ratings/Master_Asset_Ratings.xlsx", rel: "94%", pages: "Row 47", proj: "Asset Management Database" },
              { path: "S:/Engineering/Repairs/2016/WO-4471_Tie_Rod_Repair.pdf", rel: "87%", pages: "Full document", proj: "Emergency Repair 2016" },
              { path: "S:/Engineering/Design/Original/S-3_Structural_Plans_2009.pdf", rel: "82%", pages: "Sheet 3 of 12", proj: "Original Construction 2009" },
              { path: "S:/Engineering/Inspections/2019/CoastalEngineers_Assessment.pdf", rel: "79%", pages: "p. 41\u201344", proj: "5-Year Assessment 2019" },
              { path: "S:/Engineering/Inspections/2014/SmithEng_Level_I.pdf", rel: "71%", pages: "p. 12\u201314", proj: "Routine Inspection 2014" },
              { path: "D:/Archive/Capital_Planning/CIP_2020_2030_Wharves.pdf", rel: "64%", pages: "p. 8, Table 3", proj: "Capital Improvement Plan" },
              { path: "S:/Admin/Contracts/Inspection_MSA_2022.pdf", rel: "52%", pages: "Scope Exhibit A", proj: "Inspection Contract" },
            ].map((doc, i) => (
              <div key={i} style={{ padding: "5px 0", borderBottom: i < 7 ? "1px solid #F0EBE3" : "none", display: "flex", gap: 8 }}>
                <div style={{ minWidth: 30, textAlign: "right", fontWeight: 700, color: i < 3 ? "#228B22" : i < 5 ? "#C4883A" : "#999", fontSize: 10 }}>{doc.rel}</div>
                <div>
                  <div style={{ fontFamily: "monospace", fontSize: 9, color: "#1B3A5C", wordBreak: "break-all" }}>{doc.path}</div>
                  <div style={{ fontSize: 8, color: "#999" }}>{doc.proj} \u00B7 {doc.pages}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 10, padding: 12, background: "#F0EBE3", borderRadius: 6, fontSize: 14, color: "#1B3A5C", fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: "italic", textAlign: "center", lineHeight: 1.6 }}>
            8 documents. 6 projects. 15 years. Found in 1.2 seconds.<br/><strong>The Arcanum knows where everything lives.</strong>
          </div>
        </div>
      )},
  ];

  // Auto-advance with variable timing per step
  const stepDurations = [2000, 5000, 7000, 7000, 6000, 6000, 5000, 4000];
  const [typedSub, setTypedSub] = useState("");

  useEffect(() => {
    if (civEnd > 0 || step < 0) return;
    // Type the subtitle
    const sub = steps[step]?.subtitle || "";
    let i = 0;
    setTypedSub("");
    const typeTimer = setInterval(() => {
      i++;
      setTypedSub(sub.slice(0, i));
      if (i >= sub.length) clearInterval(typeTimer);
    }, 25);
    return () => clearInterval(typeTimer);
  }, [step, civEnd]);

  useEffect(() => {
    if (civEnd > 0) return;
    const dur = step === -1 ? 1500 : (stepDurations[step] || 5000);
    const timer = setTimeout(() => {
      setFadeIn(false);
      setTimeout(() => {
        setStep(s => {
          const next = s + 1;
          if (next < steps.length) {
            setActiveNav(steps[next].nav);
            setFadeIn(true);
            return next;
          }
          setCivEnd(1);
          return s;
        });
      }, 400);
    }, dur);
    return () => clearTimeout(timer);
  }, [step, civEnd]);

  return (
    <div style={{ position: "relative", minHeight: 480 }}>
      {civEnd === 0 && (
      <div style={{ display: "flex", gap: 0, borderRadius: 10, overflow: "hidden", border: "1px solid #D0CCC4", height: 440 }}>
        {/* Sidebar */}
        <div style={{ width: 72, background: "#1a2d44", padding: "6px 0", display: "flex", flexDirection: "column", gap: 1, flexShrink: 0 }}>
          {navItems.map((item, i) => (
            <div key={i} style={{ padding: "7px 6px", position: "relative", borderLeft: i === activeNav ? "2px solid #C4883A" : "2px solid transparent",
              background: i === activeNav ? "rgba(196,136,58,0.08)" : "transparent", transition: "all 0.3s" }}>
              <div style={{ fontSize: 9, color: i === activeNav ? "#C4883A" : "rgba(255,255,255,0.7)", fontWeight: i === activeNav ? 700 : 400, fontFamily: "'Lato', sans-serif" }}>{item.label}</div>
              <div style={{ fontSize: 7, color: i === activeNav ? "rgba(196,136,58,0.6)" : "rgba(255,255,255,0.3)", marginTop: 1 }}>{item.sub}</div>
              {item.alert && <div style={{ position: "absolute", top: 5, right: 5, minWidth: 12, height: 12, borderRadius: 6, background: "#EF4444", color: "#FFF", fontSize: 7, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 3px" }}>{item.alert}</div>}
            </div>
          ))}
        </div>
        {/* Main */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#FCFCFA" }}>
          <div style={{ padding: "6px 14px", borderBottom: "1px solid #EBE7DF", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: 10, color: "#1B3A5C", fontWeight: 600, fontFamily: "'Lato', sans-serif" }}>{step >= 0 ? steps[step].title : "Gradeum Civitas"}</div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <div style={{ width: 6, height: 6, borderRadius: 3, background: "#22C55E" }}/>
              <span style={{ fontSize: 8, color: "#999" }}>Custos connected</span>
            </div>
          </div>
          {/* Progress */}
          <div style={{ display: "flex", gap: 2, padding: "6px 14px 0" }}>
            {steps.map((s, i) => (
              <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= step ? "#C4883A" : "#E8E4DC", transition: "background 0.3s" }}/>
            ))}
          </div>
          {/* Content */}
          <div style={{ flex: 1, overflow: "auto", padding: 14 }}>
            {step >= 0 && (
              <div>
                <div style={{ fontSize: 10, color: "#C4883A", fontStyle: "italic", marginBottom: 10, fontFamily: "'Cormorant Garamond', Georgia, serif" }}>{typedSub}<span style={{ opacity: typedSub.length < (steps[step]?.subtitle?.length || 0) ? 1 : 0, color: "#C4883A", animation: "pulse 0.5s infinite" }}>|</span></div>
                <div style={{ opacity: fadeIn ? 1 : 0, transition: "opacity 0.3s" }}>
                  {steps[step].content}
                </div>
              </div>
            )}
            {step === -1 && (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "#CCC", fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: "italic" }}>
                Initializing field capture...
              </div>
            )}
          </div>
        </div>
      </div>
      )}

      {/* End: Customization */}
      {civEnd === 1 && (
        <div style={{ background: "#FAF7F2", padding: 20, borderRadius: 10, animation: "fadeUp 0.6s ease-out" }}>
          <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: 16, color: "#1B3A5C", fontWeight: 700, textAlign: "center", marginBottom: 4 }}>Your Platform. Your Rules.</div>
          <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 12, color: "#C4883A", fontStyle: "italic", textAlign: "center", marginBottom: 16 }}>Every output customizable to your organization</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 16 }}>
            {[
              { title: "Inspection Templates", desc: "Your forms, your fields, your rating scales \u2014 auto-populated" },
              { title: "Work Order Formats", desc: "Match your maintenance system. Auto-filed from field queries." },
              { title: "Asset Dashboards", desc: "Map views, timeline views \u2014 configured to your infrastructure" },
              { title: "Condition Reports", desc: "Your reporting format, populated from the Arcanum" },
              { title: "The Arcanum", desc: "Encrypted on your server. Grows with every interaction." },
              { title: "GPS Asset Registry", desc: "Auto-built from observations. Every asset mapped." },
            ].map((item, i) => (
              <div key={i} style={{ padding: "8px 10px", background: "#FFF", borderRadius: 6, border: "1px solid #EBE7DF" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#1B3A5C", marginBottom: 3 }}>{item.title}</div>
                <div style={{ fontSize: 9, color: "#888", lineHeight: 1.5 }}>{item.desc}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center" }}>
            <button onClick={() => setCivEnd(2)} style={{ background: "#1B3A5C", color: "#FFF", border: "none", borderRadius: 6, padding: "8px 24px", fontSize: 11, cursor: "pointer" }}>Continue →</button>
          </div>
        </div>
      )}

      {/* End: Hook */}
      {civEnd === 2 && (
        <div style={{ background: "linear-gradient(135deg, #1B3A5C, #1a2d44)", borderRadius: 10, padding: 28, textAlign: "center", animation: "fadeUp 0.8s ease-out" }}>
          <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: 22, color: "#C4883A", fontWeight: 700, marginBottom: 14, letterSpacing: 2 }}>Your infrastructure. Your records. Your memory.</div>
          <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 15, color: "rgba(255,255,255,0.6)", fontStyle: "italic", lineHeight: 1.8, maxWidth: 400, margin: "0 auto 20px" }}>
            Decades of institutional knowledge \u2014 searchable in seconds.<br/>Every field observation builds the record automatically.<br/>Every document found on your server, ranked by relevance.<br/>The Arcanum remembers. So your organization never forgets.
          </div>
          <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 13, color: "#C4883A", fontStyle: "italic", opacity: 0.5, marginBottom: 20 }}>Gradere in futurum.</div>
          <button onClick={() => setCivEnd(0)} style={{ background: "rgba(196,136,58,0.12)", color: "#C4883A", border: "1px solid rgba(196,136,58,0.25)", borderRadius: 6, padding: "8px 20px", fontSize: 11, cursor: "pointer", fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: "italic" }}>Return</button>
        </div>
      )}
    </div>
  );
};

// ===== MAIN SITE =====
export default function GradeumSite() {
  const [showPraxis, setShowPraxis] = useState(false);
  const [showCivitas, setShowCivitas] = useState(false);
  const [showLaunch, setShowLaunch] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Countdown to May 4, 2026
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const target = new Date("2026-05-04T00:00:00Z").getTime();
    const update = () => {
      const now = Date.now();
      const diff = Math.max(0, target - now);
      setCountdown({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const CountdownUnit = ({ value, label }) => (
    <div style={{ textAlign: "center", minWidth: 54 }}>
      <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 28, fontWeight: 700, color: AMBER, lineHeight: 1 }}>
        {String(value).padStart(2, "0")}
      </div>
      <div style={{ fontFamily: "'Lato', sans-serif", fontSize: 9, color: "#8AA4C0", textTransform: "uppercase", letterSpacing: 2, marginTop: 2 }}>{label}</div>
    </div>
  );

  return (
    <div style={{ fontFamily: "'Lato', 'Helvetica Neue', sans-serif", background: CREAM, minHeight: "100vh", paddingBottom: 20 }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Lato:wght@300;400;700&family=Cinzel:wght@400;600;700&display=swap" rel="stylesheet"/>

      {/* LAUNCH COUNTDOWN BANNER */}
      <div style={{ background: NAVY, padding: "14px 40px", display: "flex", justifyContent: "center", alignItems: "center", gap: 32, flexWrap: "wrap" }}>
        <div style={{ fontFamily: "'Cinzel', 'Cormorant Garamond', Georgia, serif", fontSize: 14, fontWeight: 700, color: "#FFF", letterSpacing: 4, textTransform: "uppercase" }}>
          Launch Day <span style={{ color: AMBER }}>·</span> May 04, 2026 <span style={{ color: "#7898B8", fontSize: 11 }}>00:00 UTC</span>
        </div>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <CountdownUnit value={countdown.days} label="Days"/>
          <span style={{ color: AMBER, fontSize: 20, fontWeight: 300, marginBottom: 12 }}>:</span>
          <CountdownUnit value={countdown.hours} label="Hours"/>
          <span style={{ color: AMBER, fontSize: 20, fontWeight: 300, marginBottom: 12 }}>:</span>
          <CountdownUnit value={countdown.minutes} label="Min"/>
          <span style={{ color: AMBER, fontSize: 20, fontWeight: 300, marginBottom: 12 }}>:</span>
          <CountdownUnit value={countdown.seconds} label="Sec"/>
        </div>
      </div>

      {/* NAV */}
      <nav style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px 40px 8px", position: "relative", zIndex: 10 }}>
        <div style={{ fontFamily: "'Cinzel', 'Cormorant Garamond', Georgia, serif", fontSize: 26, fontWeight: 700, letterSpacing: 10, color: NAVY, textTransform: "uppercase" }}>Gradeum</div>
        <div style={{ width: 60, height: 2, background: AMBER, marginTop: 8, borderRadius: 1, opacity: 0.6 }}/>
      </nav>

      {/* ORACLE — whispers between the wordmark and the world */}
      <Oracle/>

      {/* HERO — Pillars hold up the headline */}
      <section style={{ position: "relative", padding: "0px 40px 40px", textAlign: "center", overflow: "hidden", minHeight: 300 }}>
        <NeuralOverlay width={1400} height={700}/>
        <Pillar side="left" opacity={0.06}/>
        <Pillar side="right" opacity={0.06}/>
        <div style={{ position: "relative", zIndex: 2 }}>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(36px, 5vw, 64px)",
            fontWeight: 700, color: NAVY, margin: "0 0 16px", lineHeight: 1.15, letterSpacing: -0.5,
          }}>AI for the Infrastructure of Our World</h1>
          <p style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(16px, 2vw, 22px)",
            color: AMBER, maxWidth: 600, margin: "0 auto 40px", fontStyle: "italic", lineHeight: 1.5,
          }}>Gradere in futurum — Step into the future</p>
          {/* THE PORTAL — guarded by shields, a gateway to the future */}
          <style>{`
            @keyframes portalGlow {
              0%, 100% { box-shadow: 0 0 40px rgba(196,136,58,0.25), 0 0 80px rgba(196,136,58,0.15), inset 0 0 40px rgba(196,136,58,0.08); }
              50% { box-shadow: 0 0 60px rgba(196,136,58,0.5), 0 0 120px rgba(196,136,58,0.25), inset 0 0 60px rgba(196,136,58,0.2); }
            }
            @keyframes portalInner {
              0%, 100% { opacity: 0.06; }
              50% { opacity: 0.35; }
            }
            .portal-gate:hover { transform: scale(1.05); }
          `}</style>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            {/* Left guardian shield — ornate */}
            <svg width="109" height="144" viewBox="0 0 90 120" style={{ opacity: 0.12 }}>
              {/* Crossed spears */}
              <line x1="6" y1="116" x2="84" y2="4" stroke={NAVY} strokeWidth="2.8" strokeLinecap="round"/>
              <line x1="84" y1="116" x2="6" y2="4" stroke={NAVY} strokeWidth="2.8" strokeLinecap="round"/>
              <polygon points="82,8 88,1 85,13" fill={NAVY}/>
              <polygon points="8,8 2,1 5,13" fill={NAVY}/>
              <circle cx="8" cy="114" r="2.5" fill={NAVY}/>
              <circle cx="82" cy="114" r="2.5" fill={NAVY}/>
              {/* Shield body */}
              <rect x="16" y="14" width="58" height="92" rx="5" fill={CREAM} stroke={NAVY} strokeWidth="2.5"/>
              {/* Double inner border */}
              <rect x="21" y="19" width="48" height="82" rx="3.5" fill="none" stroke={NAVY} strokeWidth="1"/>
              <rect x="24" y="22" width="42" height="76" rx="2.5" fill="none" stroke={NAVY} strokeWidth="0.5"/>
              {/* Central boss with rivets */}
              <circle cx="45" cy="60" r="13" fill="none" stroke={NAVY} strokeWidth="2"/>
              <circle cx="45" cy="60" r="8.5" fill="none" stroke={NAVY} strokeWidth="1.2"/>
              <circle cx="45" cy="60" r="4" fill={NAVY}/>
              {[0,60,120,180,240,300].map(a => {
                const r = (a * Math.PI) / 180;
                return <circle key={`rv${a}`} cx={45 + Math.cos(r) * 11} cy={60 + Math.sin(r) * 11} r="1.2" fill={NAVY} opacity="0.5"/>;
              })}
              {/* Horizontal spine bar */}
              <rect x="22" y="57" width="46" height="6" rx="1.5" fill="none" stroke={NAVY} strokeWidth="0.8" opacity="0.3"/>
              {/* Vertical spine */}
              <line x1="45" y1="23" x2="45" y2="97" stroke={NAVY} strokeWidth="0.6" opacity="0.2"/>
              {/* Wing left — 3 layers */}
              <path d="M33,56 Q24,46 22,32 Q28,40 35,36 Q30,46 34,56" fill={NAVY} opacity="0.5"/>
              <path d="M34,50 Q26,40 25,26 Q31,34 37,30 Q32,40 35,50" fill={NAVY} opacity="0.35"/>
              <path d="M35,44 Q28,36 28,22 Q33,30 38,26 Q34,36 36,44" fill={NAVY} opacity="0.2"/>
              {/* Wing right — 3 layers */}
              <path d="M57,56 Q66,46 68,32 Q62,40 55,36 Q60,46 56,56" fill={NAVY} opacity="0.5"/>
              <path d="M56,50 Q64,40 65,26 Q59,34 53,30 Q58,40 55,50" fill={NAVY} opacity="0.35"/>
              <path d="M55,44 Q62,36 62,22 Q57,30 52,26 Q56,36 54,44" fill={NAVY} opacity="0.2"/>
              {/* Lower wing echoes */}
              <path d="M34,64 Q26,72 24,82 Q30,76 35,78 Q30,72 34,64" fill={NAVY} opacity="0.3"/>
              <path d="M56,64 Q64,72 66,82 Q60,76 55,78 Q60,72 56,64" fill={NAVY} opacity="0.3"/>
              {/* Lightning bolts top */}
              <path d="M43,26 L41,38 L44,37 L41,50" fill="none" stroke={NAVY} strokeWidth="0.8" opacity="0.25"/>
              <path d="M47,26 L49,38 L46,37 L49,50" fill="none" stroke={NAVY} strokeWidth="0.8" opacity="0.25"/>
              {/* Lightning bolts bottom */}
              <path d="M43,70 L41,82 L44,81 L41,94" fill="none" stroke={NAVY} strokeWidth="0.8" opacity="0.25"/>
              <path d="M47,70 L49,82 L46,81 L49,94" fill="none" stroke={NAVY} strokeWidth="0.8" opacity="0.25"/>
              {/* Corner rosettes */}
              <circle cx="28" cy="27" r="3" fill="none" stroke={NAVY} strokeWidth="0.6" opacity="0.4"/>
              <circle cx="28" cy="27" r="1.2" fill={NAVY} opacity="0.3"/>
              <circle cx="62" cy="27" r="3" fill="none" stroke={NAVY} strokeWidth="0.6" opacity="0.4"/>
              <circle cx="62" cy="27" r="1.2" fill={NAVY} opacity="0.3"/>
              <circle cx="28" cy="93" r="3" fill="none" stroke={NAVY} strokeWidth="0.6" opacity="0.4"/>
              <circle cx="28" cy="93" r="1.2" fill={NAVY} opacity="0.3"/>
              <circle cx="62" cy="93" r="3" fill="none" stroke={NAVY} strokeWidth="0.6" opacity="0.4"/>
              <circle cx="62" cy="93" r="1.2" fill={NAVY} opacity="0.3"/>
              {/* Decorative top/bottom bars */}
              <rect x="34" y="18" width="22" height="2.5" rx="1" fill={NAVY} opacity="0.2"/>
              <rect x="34" y="100" width="22" height="2.5" rx="1" fill={NAVY} opacity="0.2"/>
              {/* Laurel curves around boss */}
              <path d="M32,52 Q28,56 32,60" fill="none" stroke={NAVY} strokeWidth="0.6" opacity="0.3"/>
              <path d="M32,60 Q28,64 32,68" fill="none" stroke={NAVY} strokeWidth="0.6" opacity="0.3"/>
              <path d="M58,52 Q62,56 58,60" fill="none" stroke={NAVY} strokeWidth="0.6" opacity="0.3"/>
              <path d="M58,60 Q62,64 58,68" fill="none" stroke={NAVY} strokeWidth="0.6" opacity="0.3"/>
            </svg>

            {/* THE PORTAL — ornate Roman triumphal arch */}
            <div onClick={() => setShowLaunch(true)} className="portal-gate" style={{
              width: 120, height: 155, position: "relative", cursor: "pointer",
              transition: "transform 0.5s ease",
            }}>
              <svg width="120" height="155" viewBox="0 0 120 155" style={{ position: "absolute", top: 0, left: 0 }}>
                {/* Outer arch — main structure */}
                <path d="M8,155 L8,55 A52,52 0 0,1 112,55 L112,155" fill="none" stroke={AMBER} strokeWidth="3" opacity="0.55"/>
                {/* Inner arch */}
                <path d="M18,155 L18,58 A42,42 0 0,1 102,58 L102,155" fill="none" stroke={AMBER} strokeWidth="1.5" opacity="0.3"/>
                {/* Third arch line */}
                <path d="M24,155 L24,60 A36,36 0 0,1 96,60 L96,155" fill="none" stroke={AMBER} strokeWidth="0.8" opacity="0.2"/>
                {/* Inner glow fill */}
                <path d="M24,155 L24,60 A36,36 0 0,1 96,60 L96,155 Z" fill={AMBER} style={{ animation: "portalInner 5s ease-in-out infinite" }}/>

                {/* Voussoirs — arch stones */}
                {[-60,-45,-30,-15,0,15,30,45,60].map((angle, i) => {
                  const rad = ((angle - 90) * Math.PI) / 180;
                  const cx = 60 + Math.cos(rad) * 47;
                  const cy = 58 + Math.sin(rad) * 47;
                  return <circle key={`v${i}`} cx={cx} cy={cy} r="2.5" fill={AMBER} opacity={i === 4 ? 0.5 : 0.2}/>;
                })}
                
                {/* Keystone — ornamental crown */}
                <path d="M52,8 L60,0 L68,8" fill="none" stroke={AMBER} strokeWidth="2.5" opacity="0.6"/>
                <path d="M55,14 L60,6 L65,14" fill="none" stroke={AMBER} strokeWidth="1.2" opacity="0.35"/>
                <circle cx="60" cy="4" r="2" fill={AMBER} opacity="0.4"/>

                {/* Column capitals — Corinthian detail left */}
                <rect x="4" y="52" width="18" height="4" rx="1" fill={AMBER} opacity="0.3"/>
                <path d="M6,52 Q8,48 10,46 Q12,48 14,46 Q16,48 18,52" fill="none" stroke={AMBER} strokeWidth="0.8" opacity="0.3"/>
                <circle cx="7" cy="50" r="1.5" fill={AMBER} opacity="0.2"/>
                <circle cx="19" cy="50" r="1.5" fill={AMBER} opacity="0.2"/>

                {/* Column capitals — Corinthian detail right */}
                <rect x="98" y="52" width="18" height="4" rx="1" fill={AMBER} opacity="0.3"/>
                <path d="M100,52 Q102,48 104,46 Q106,48 108,46 Q110,48 112,52" fill="none" stroke={AMBER} strokeWidth="0.8" opacity="0.3"/>
                <circle cx="101" cy="50" r="1.5" fill={AMBER} opacity="0.2"/>
                <circle cx="113" cy="50" r="1.5" fill={AMBER} opacity="0.2"/>

                {/* Column shafts — fluted */}
                <rect x="6" y="56" width="14" height="95" fill={AMBER} opacity="0.1" rx="1"/>
                <rect x="100" y="56" width="14" height="95" fill={AMBER} opacity="0.1" rx="1"/>
                <line x1="10" y1="58" x2="10" y2="148" stroke={AMBER} strokeWidth="0.5" opacity="0.15"/>
                <line x1="13" y1="58" x2="13" y2="148" stroke={AMBER} strokeWidth="0.5" opacity="0.15"/>
                <line x1="16" y1="58" x2="16" y2="148" stroke={AMBER} strokeWidth="0.5" opacity="0.15"/>
                <line x1="104" y1="58" x2="104" y2="148" stroke={AMBER} strokeWidth="0.5" opacity="0.15"/>
                <line x1="107" y1="58" x2="107" y2="148" stroke={AMBER} strokeWidth="0.5" opacity="0.15"/>
                <line x1="110" y1="58" x2="110" y2="148" stroke={AMBER} strokeWidth="0.5" opacity="0.15"/>

                {/* Column bases */}
                <rect x="4" y="148" width="18" height="3" rx="1" fill={AMBER} opacity="0.25"/>
                <rect x="98" y="148" width="18" height="3" rx="1" fill={AMBER} opacity="0.25"/>

                {/* Threshold — stepped base stones */}
                <rect x="2" y="151" width="116" height="4" rx="1" fill={AMBER} opacity="0.25"/>

                {/* Decorative frieze above arch */}
                <rect x="20" y="16" width="80" height="3" rx="1" fill={AMBER} opacity="0.15"/>
                {[30,42,54,66,78,90].map(x => (
                  <rect key={`fr${x}`} x={x} y="12" width="3" height="4" rx="0.5" fill={AMBER} opacity="0.12"/>
                ))}

                {/* Inner arch decorative dots */}
                {[-50,-30,-10,10,30,50].map((angle, i) => {
                  const rad = ((angle - 90) * Math.PI) / 180;
                  const cx = 60 + Math.cos(rad) * 36;
                  const cy = 60 + Math.sin(rad) * 36;
                  return <circle key={`id${i}`} cx={cx} cy={cy} r="1" fill={AMBER} opacity="0.2"/>;
                })}
              </svg>
              {/* Glow container */}
              <div style={{
                position: "absolute", top: 12, left: 18, right: 18, bottom: 0,
                borderRadius: "50% 50% 0 0 / 30% 30% 0 0",
                animation: "portalGlow 5s ease-in-out infinite",
              }}/>
            </div>

            {/* Right guardian shield — ornate */}
            <svg width="109" height="144" viewBox="0 0 90 120" style={{ opacity: 0.12 }}>
              <line x1="6" y1="116" x2="84" y2="4" stroke={NAVY} strokeWidth="2.8" strokeLinecap="round"/>
              <line x1="84" y1="116" x2="6" y2="4" stroke={NAVY} strokeWidth="2.8" strokeLinecap="round"/>
              <polygon points="82,8 88,1 85,13" fill={NAVY}/>
              <polygon points="8,8 2,1 5,13" fill={NAVY}/>
              <circle cx="8" cy="114" r="2.5" fill={NAVY}/>
              <circle cx="82" cy="114" r="2.5" fill={NAVY}/>
              <rect x="16" y="14" width="58" height="92" rx="5" fill={CREAM} stroke={NAVY} strokeWidth="2.5"/>
              <rect x="21" y="19" width="48" height="82" rx="3.5" fill="none" stroke={NAVY} strokeWidth="1"/>
              <rect x="24" y="22" width="42" height="76" rx="2.5" fill="none" stroke={NAVY} strokeWidth="0.5"/>
              <circle cx="45" cy="60" r="13" fill="none" stroke={NAVY} strokeWidth="2"/>
              <circle cx="45" cy="60" r="8.5" fill="none" stroke={NAVY} strokeWidth="1.2"/>
              <circle cx="45" cy="60" r="4" fill={NAVY}/>
              {[0,60,120,180,240,300].map(a => {
                const r = (a * Math.PI) / 180;
                return <circle key={`rv${a}`} cx={45 + Math.cos(r) * 11} cy={60 + Math.sin(r) * 11} r="1.2" fill={NAVY} opacity="0.5"/>;
              })}
              <rect x="22" y="57" width="46" height="6" rx="1.5" fill="none" stroke={NAVY} strokeWidth="0.8" opacity="0.3"/>
              <line x1="45" y1="23" x2="45" y2="97" stroke={NAVY} strokeWidth="0.6" opacity="0.2"/>
              <path d="M33,56 Q24,46 22,32 Q28,40 35,36 Q30,46 34,56" fill={NAVY} opacity="0.5"/>
              <path d="M34,50 Q26,40 25,26 Q31,34 37,30 Q32,40 35,50" fill={NAVY} opacity="0.35"/>
              <path d="M35,44 Q28,36 28,22 Q33,30 38,26 Q34,36 36,44" fill={NAVY} opacity="0.2"/>
              <path d="M57,56 Q66,46 68,32 Q62,40 55,36 Q60,46 56,56" fill={NAVY} opacity="0.5"/>
              <path d="M56,50 Q64,40 65,26 Q59,34 53,30 Q58,40 55,50" fill={NAVY} opacity="0.35"/>
              <path d="M55,44 Q62,36 62,22 Q57,30 52,26 Q56,36 54,44" fill={NAVY} opacity="0.2"/>
              <path d="M34,64 Q26,72 24,82 Q30,76 35,78 Q30,72 34,64" fill={NAVY} opacity="0.3"/>
              <path d="M56,64 Q64,72 66,82 Q60,76 55,78 Q60,72 56,64" fill={NAVY} opacity="0.3"/>
              <path d="M43,26 L41,38 L44,37 L41,50" fill="none" stroke={NAVY} strokeWidth="0.8" opacity="0.25"/>
              <path d="M47,26 L49,38 L46,37 L49,50" fill="none" stroke={NAVY} strokeWidth="0.8" opacity="0.25"/>
              <path d="M43,70 L41,82 L44,81 L41,94" fill="none" stroke={NAVY} strokeWidth="0.8" opacity="0.25"/>
              <path d="M47,70 L49,82 L46,81 L49,94" fill="none" stroke={NAVY} strokeWidth="0.8" opacity="0.25"/>
              <circle cx="28" cy="27" r="3" fill="none" stroke={NAVY} strokeWidth="0.6" opacity="0.4"/>
              <circle cx="28" cy="27" r="1.2" fill={NAVY} opacity="0.3"/>
              <circle cx="62" cy="27" r="3" fill="none" stroke={NAVY} strokeWidth="0.6" opacity="0.4"/>
              <circle cx="62" cy="27" r="1.2" fill={NAVY} opacity="0.3"/>
              <circle cx="28" cy="93" r="3" fill="none" stroke={NAVY} strokeWidth="0.6" opacity="0.4"/>
              <circle cx="28" cy="93" r="1.2" fill={NAVY} opacity="0.3"/>
              <circle cx="62" cy="93" r="3" fill="none" stroke={NAVY} strokeWidth="0.6" opacity="0.4"/>
              <circle cx="62" cy="93" r="1.2" fill={NAVY} opacity="0.3"/>
              <rect x="34" y="18" width="22" height="2.5" rx="1" fill={NAVY} opacity="0.2"/>
              <rect x="34" y="100" width="22" height="2.5" rx="1" fill={NAVY} opacity="0.2"/>
              <path d="M32,52 Q28,56 32,60" fill="none" stroke={NAVY} strokeWidth="0.6" opacity="0.3"/>
              <path d="M32,60 Q28,64 32,68" fill="none" stroke={NAVY} strokeWidth="0.6" opacity="0.3"/>
              <path d="M58,52 Q62,56 58,60" fill="none" stroke={NAVY} strokeWidth="0.6" opacity="0.3"/>
              <path d="M58,60 Q62,64 58,68" fill="none" stroke={NAVY} strokeWidth="0.6" opacity="0.3"/>
            </svg>
          </div>
        </div>
      </section>

      {/* TAGLINE DIVIDER — Your Knowledge. Empowered. Protected. */}
      <section style={{ padding: "0 40px 10px", textAlign: "center", marginTop: 9 }}>
        <div>
          <span style={{ fontFamily: "'Cinzel', 'Cormorant Garamond', Georgia, serif", fontSize: "clamp(18px, 3vw, 28px)", fontWeight: 700, color: NAVY }}>
            Your Knowledge
          </span>
          <span style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "clamp(18px, 3vw, 28px)", color: AMBER, margin: "0 12px" }}>
            —
          </span>
          <span style={{ fontFamily: "'Cinzel', 'Cormorant Garamond', Georgia, serif", fontSize: "clamp(18px, 3vw, 28px)", fontWeight: 700, color: AMBER }}>
            Empowered
          </span>
          <span style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "clamp(18px, 3vw, 28px)", color: AMBER, margin: "0 12px" }}>
            —
          </span>
          <span style={{ fontFamily: "'Cinzel', 'Cormorant Garamond', Georgia, serif", fontSize: "clamp(18px, 3vw, 28px)", fontWeight: 700, color: NAVY }}>
            Protected
          </span>
        </div>
      </section>

      {/* PRODUCT CARDS */}
      <section style={{ padding: "20px 40px 80px", maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ display: "flex", gap: 32, flexWrap: "wrap", justifyContent: "center" }}>
          {/* PRAXIS */}
          <div style={{
            flex: 1, minWidth: 320, maxWidth: 460, background: "#FFF", borderRadius: 16,
            padding: 32, border: `1px solid ${MARBLE}`, position: "relative", overflow: "hidden",
            boxShadow: "0 2px 20px rgba(27,58,92,0.06)",
          }}>
            <svg width="100%" height="100%" style={{ position: "absolute", top: 0, left: 0, opacity: 0.025, pointerEvents: "none" }} viewBox="0 0 460 500" preserveAspectRatio="xMidYMid slice">
              <rect x="30" y="40" width="16" height="420" fill={NAVY} rx="1"/>
              <rect x="22" y="30" width="32" height="10" fill={NAVY} rx="1"/>
              <rect x="22" y="460" width="32" height="10" fill={NAVY} rx="1"/>
              <rect x="414" y="40" width="16" height="420" fill={NAVY} rx="1"/>
              <rect x="406" y="30" width="32" height="10" fill={NAVY} rx="1"/>
              <rect x="406" y="460" width="32" height="10" fill={NAVY} rx="1"/>
            </svg>
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 28, fontWeight: 700, color: NAVY, marginBottom: 4 }}>Gradeum Praxis</div>
              <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 13, color: AMBER, fontStyle: "italic", marginBottom: 20 }}>The Practice of Engineering</div>
              <p style={{ fontSize: 14, color: "#555", lineHeight: 1.7, marginBottom: 24 }}>
                Auditable AI for professional engineering. Every response governed by PE review workflows. Every document traceable. Every decision logged. Built for firms where professional liability demands complete data governance.
              </p>
              <div style={{ fontSize: 12, color: "#888", lineHeight: 1.8, marginBottom: 24 }}>
                Document Q&A · Drawing Intelligence · Consilium Consensus Engine · PE Governance · Time Tracking · Invoicing · Resource Forecasting · Institutional Memory
              </div>
              <button onClick={() => setShowPraxis(true)} style={{
                width: "100%", background: NAVY, color: "#FFF", border: "none", borderRadius: 8,
                padding: "12px 0", fontSize: 14, fontWeight: 600, cursor: "pointer",
                fontFamily: "'Cormorant Garamond', Georgia, serif", letterSpacing: 1,
              }}>Experience Praxis →</button>
            </div>
          </div>

          {/* CIVITAS */}
          <div style={{
            flex: 1, minWidth: 320, maxWidth: 460, background: "#FFF", borderRadius: 16,
            padding: 32, border: `1px solid ${MARBLE}`, position: "relative", overflow: "hidden",
            boxShadow: "0 2px 20px rgba(27,58,92,0.06)",
          }}>
            <svg width="100%" height="100%" style={{ position: "absolute", top: 0, left: 0, opacity: 0.025, pointerEvents: "none" }} viewBox="0 0 460 500" preserveAspectRatio="xMidYMid slice">
              <path d="M230,20 L30,180 L430,180 Z" fill="none" stroke={NAVY} strokeWidth="2"/>
              <rect x="60" y="180" width="340" height="300" fill="none" stroke={NAVY} strokeWidth="1.5"/>
              <rect x="140" y="240" width="80" height="120" fill="none" stroke={NAVY} strokeWidth="1"/>
              <rect x="260" y="240" width="80" height="120" fill="none" stroke={NAVY} strokeWidth="1"/>
            </svg>
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 28, fontWeight: 700, color: NAVY, marginBottom: 4 }}>Gradeum Civitas</div>
              <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 13, color: AMBER, fontStyle: "italic", marginBottom: 20 }}>The Infrastructure of Community</div>
              <p style={{ fontSize: 14, color: "#555", lineHeight: 1.7, marginBottom: 24 }}>
                AI-powered asset management for the organizations that own and maintain critical infrastructure. Turn decades of inspection records, maintenance histories, and condition assessments into actionable intelligence.
              </p>
              <div style={{ fontSize: 12, color: "#888", lineHeight: 1.8, marginBottom: 24 }}>
                Field Intelligence · GPS-Tagged Observations · Photo Documentation · Auto-Generated Reports · Institutional Memory · Condition Trending · Institutional Memory
              </div>
              <button onClick={() => setShowCivitas(true)} style={{
                width: "100%", background: AMBER, color: "#FFF", border: "none", borderRadius: 8,
                padding: "12px 0", fontSize: 14, fontWeight: 600, cursor: "pointer",
                fontFamily: "'Cormorant Garamond', Georgia, serif", letterSpacing: 1,
              }}>Experience Civitas →</button>
            </div>
          </div>
        </div>
      </section>

      {/* VALUE PROPOSITION */}
      <section style={{ padding: "0 40px 12px", textAlign: "center", maxWidth: 640, margin: "0 auto" }}>
        <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: 22, color: NAVY, fontWeight: 700, letterSpacing: 2, marginBottom: 4, lineHeight: 1.4 }}>
          Fundamentum Liberum.
        </div>
        <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: 22, color: NAVY, fontWeight: 700, letterSpacing: 2, marginBottom: 16 }}>
          Intelligentia Pretium.
        </div>
        <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 20, color: "#777", lineHeight: 2.2, marginBottom: 20, fontStyle: "italic", textAlign: "center" }}>
          The foundation is free.<br/>
          The platform, the tools, the workflows — yours without cost.<br/>
          Intelligence is the offering.<br/>
          Pay only when Gradeum thinks for you.
        </div>
        <div style={{ width: 40, height: 1, background: AMBER, margin: "0 auto 20px", opacity: 0.5 }}/>
        <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: 16, color: NAVY, fontWeight: 600, letterSpacing: 1, marginBottom: 8 }}>
          Vestrum. Formatum. Paratum.
        </div>
        <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 15, color: "#888", lineHeight: 1.6, fontStyle: "italic" }}>
          Yours. Shaped to your firm. Ready when you are.
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ textAlign: "center", padding: "20px 40px 28px" }}>
        <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 17, color: AMBER, fontStyle: "italic", marginBottom: 8 }}>
          Gradere in futurum.
        </div>
        <div style={{ fontSize: 11, color: "#BBB" }}>
          © 2026 Gradeum Technologies, LLC · Houston, Texas · Legal · Privacy · Security
        </div>
      </footer>


      {/* DEMO MODALS */}
      <DemoModal show={showPraxis} onClose={() => setShowPraxis(false)} title="Gradeum Praxis">
        <PraxisDemo/>
      </DemoModal>
      <DemoModal show={showCivitas} onClose={() => setShowCivitas(false)} title="Gradeum Civitas">
        <CivitasDemo/>
      </DemoModal>

      {/* THE FUTURE — heaven meets tech */}
      {showLaunch && (
        <div style={{ position: "fixed", inset: 0, zIndex: 300, overflow: "auto" }}>
          <style>{`
            @keyframes celestialPulse {
              0%, 100% { opacity: 0.3; transform: scale(1); }
              50% { opacity: 0.5; transform: scale(1.05); }
            }
            @keyframes fadeUp {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes starFloat {
              0%, 100% { opacity: 0.3; }
              50% { opacity: 0.8; }
            }
          `}</style>

          {/* Radiant background — dark edges, golden center */}
          <div style={{ position: "fixed", inset: 0, background: `radial-gradient(ellipse at 50% 40%, #2A1F10 0%, ${NAVY} 50%, #0D1B2A 100%)` }}/>

          {/* Celestial light rays */}
          <div style={{ position: "fixed", top: "10%", left: "50%", transform: "translateX(-50%)", width: 600, height: 600, borderRadius: "50%",
            background: `radial-gradient(circle, rgba(196,136,58,0.12) 0%, rgba(196,136,58,0.03) 40%, transparent 70%)`,
            animation: "celestialPulse 8s ease-in-out infinite", pointerEvents: "none",
          }}/>

          {/* Floating stars */}
          <svg style={{ position: "fixed", inset: 0, pointerEvents: "none" }} width="100%" height="100%">
            {Array.from({length: 30}, (_, i) => (
              <circle key={i}
                cx={`${10 + (i * 37) % 80}%`} cy={`${5 + (i * 53) % 90}%`}
                r={i % 3 === 0 ? "1.5" : "0.8"}
                fill={AMBER} opacity="0.2"
                style={{ animation: `starFloat ${3 + (i % 4)}s ease-in-out ${(i * 0.7) % 3}s infinite` }}
              />
            ))}
          </svg>

          {/* Content */}
          <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", padding: "40px 24px" }}>

            {/* Close — subtle */}
            <button onClick={() => setShowLaunch(false)} style={{ position: "fixed", top: 20, right: 24, background: "none", border: "none", color: "rgba(255,255,255,0.3)", fontSize: 24, cursor: "pointer", zIndex: 10 }}>✕</button>

            {/* Welcome */}
            <div style={{ animation: "fadeUp 1s ease-out", textAlign: "center", marginBottom: 8 }}>
              <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: 14, fontWeight: 600, letterSpacing: 6, color: "rgba(196,136,58,0.6)", textTransform: "uppercase", marginBottom: 24 }}>Gradeum</div>
              <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 700, color: "#FFF", lineHeight: 1.2, marginBottom: 12 }}>
                Welcome.
              </div>
              <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(16px, 2.5vw, 22px)", color: "rgba(255,255,255,0.7)", lineHeight: 1.6, maxWidth: 480, margin: "0 auto" }}>
                We are glad you are taking the next step.
              </div>
            </div>

            {/* Amber divider */}
            <div style={{ width: 80, height: 1, background: AMBER, opacity: 0.4, margin: "32px 0", animation: "fadeUp 1.2s ease-out" }}/>

            {/* What awaits */}
            <div style={{ animation: "fadeUp 1.4s ease-out", textAlign: "center", maxWidth: 520, marginBottom: 36 }}>
              <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 17, color: "rgba(255,255,255,0.55)", lineHeight: 1.8, fontStyle: "italic" }}>
                Behind this gate: a platform that remembers what your firm knows.
                Document intelligence that finds answers in seconds.
                An Arcanum that grows with every question.
                Practice management that costs nothing.
                Intelligence — only when you call upon it.
              </div>
            </div>

            {/* Countdown */}
            <div style={{ animation: "fadeUp 1.6s ease-out", marginBottom: 12 }}>
              <div style={{ display: "flex", gap: 20, justifyContent: "center" }}>
                {[
                  { v: countdown.days, l: "Dies" },
                  { v: countdown.hours, l: "Horae" },
                  { v: countdown.minutes, l: "Minuta" },
                  { v: countdown.seconds, l: "Secunda" },
                ].map((u, i) => (
                  <div key={i} style={{ textAlign: "center", minWidth: 60 }}>
                    <div style={{
                      fontFamily: "'Cinzel', Georgia, serif", fontSize: "clamp(32px, 5vw, 48px)",
                      fontWeight: 700, color: AMBER, lineHeight: 1,
                    }}>{String(u.v).padStart(2, "0")}</div>
                    <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 11, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: 3, marginTop: 6 }}>{u.l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Launch date */}
            <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.5)", letterSpacing: 4, textTransform: "uppercase", marginBottom: 40, animation: "fadeUp 1.8s ease-out" }}>
              May 04, 2026 · 00:00 UTC
            </div>

            {/* Waitlist */}
            <div style={{ animation: "fadeUp 2s ease-out", textAlign: "center", width: "100%", maxWidth: 460 }}>
              <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 18, color: "rgba(255,255,255,0.7)", marginBottom: 16 }}>
                Join the waitlist. Be among the first to enter.
              </div>
              {submitted ? (
                <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 16, color: "#C4883A", fontStyle: "italic" }}>
                  You are on the list.
                </div>
              ) : (
              <div style={{ display: "flex", gap: 8 }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  style={{
                    flex: 1, padding: "14px 18px", borderRadius: 8,
                    border: "1px solid rgba(196,136,58,0.25)", background: "rgba(255,255,255,0.04)",
                    color: "#FFF", fontSize: 15, fontFamily: "'Cormorant Garamond', Georgia, serif",
                    outline: "none", letterSpacing: 0.5,
                  }}
                />
                <button onClick={async () => {
                  if (!email || submitting) return;
                  setSubmitting(true);
                  try {
                    const res = await fetch('/api/waitlist', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ email, source: 'portal' })
                    });
                    const data = await res.json();
                    if (data.status === 'ok') setSubmitted(true);
                  } catch (e) { console.error(e); }
                  setSubmitting(false);
                }} style={{
                  background: `linear-gradient(135deg, ${AMBER}, #D4993A)`, color: "#FFF",
                  border: "none", borderRadius: 8,
                  padding: "14px 28px", fontSize: 14, fontWeight: 700, cursor: "pointer",
                  fontFamily: "'Cinzel', Georgia, serif", letterSpacing: 2,
                  whiteSpace: "nowrap", textTransform: "uppercase",
                  boxShadow: "0 4px 20px rgba(196,136,58,0.3)",
                  opacity: submitting ? 0.6 : 1,
                }}>{submitting ? "..." : "Enter"}</button>
              </div>
              )}
            </div>

            {/* Closing whisper */}
            <div style={{ marginTop: 48, fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 15, color: "rgba(196,136,58,0.4)", fontStyle: "italic", textAlign: "center", animation: "fadeUp 2.4s ease-out" }}>
              Gradere in futurum.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
