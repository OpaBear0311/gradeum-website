import { useState, useEffect, useRef } from "react";
import CivitasDemoCarousel from "./demos/CivitasDemoCarousel";
import PraxisDemoCarousel from "./demos/PraxisDemoCarousel";

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
              0%, 100% { box-shadow: 0 0 40px 20px rgba(196,136,42,0.15), 0 0 80px 40px rgba(196,136,42,0.08); filter: brightness(1); }
              50% { box-shadow: 0 0 60px 30px rgba(196,136,42,0.35), 0 0 120px 60px rgba(196,136,42,0.18); filter: brightness(1.08); }
            }
            @keyframes portalInner {
              0%, 100% { opacity: 0.08; }
              50% { opacity: 0.4; }
            }
            @keyframes archShimmer {
              0% { stroke-dashoffset: 600; }
              100% { stroke-dashoffset: 0; }
            }
            .portal-gate { transition: transform 0.3s ease; }
            .portal-gate:hover { transform: scale(1.03); }
            .portal-gate:hover .portal-hover-text { opacity: 1 !important; }
            .portal-gate:hover .portal-glow-div {
              box-shadow: 0 0 80px 40px rgba(196,136,42,0.5), 0 0 140px 70px rgba(196,136,42,0.28) !important;
              filter: brightness(1.12) !important;
            }
            .portal-shimmer-path {
              stroke-dasharray: 300;
              stroke-dashoffset: 600;
              animation: archShimmer 6s linear infinite;
            }
            @media (prefers-reduced-motion: reduce) {
              .portal-gate, .portal-gate:hover { animation: none !important; transform: none !important; }
              .portal-glow-div { animation: none !important; box-shadow: 0 0 40px 20px rgba(196,136,42,0.2) !important; }
              .portal-shimmer-path { animation: none !important; }
            }
            @media (max-width: 600px) {
              .portal-glow-div { box-shadow: 0 0 24px 12px rgba(196,136,42,0.12) !important; }
            }
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
            <a href="https://porta.gradeum.io" className="portal-gate" style={{
              width: 120, display: "inline-block", position: "relative", cursor: "pointer",
              textDecoration: "none",
            }}>
              <svg width="120" height="155" viewBox="0 0 120 155" style={{ display: "block" }}>
                {/* Outer arch — main structure */}
                <path d="M8,155 L8,55 A52,52 0 0,1 112,55 L112,155" fill="none" stroke={AMBER} strokeWidth="3" opacity="0.55"/>
                {/* Shimmer trace on outer arch */}
                <path className="portal-shimmer-path" d="M8,155 L8,55 A52,52 0 0,1 112,55 L112,155" fill="none" stroke="rgba(255,235,200,0.35)" strokeWidth="2" />
                {/* Inner arch */}
                <path d="M18,155 L18,58 A42,42 0 0,1 102,58 L102,155" fill="none" stroke={AMBER} strokeWidth="1.5" opacity="0.3"/>
                {/* Third arch line */}
                <path d="M24,155 L24,60 A36,36 0 0,1 96,60 L96,155" fill="none" stroke={AMBER} strokeWidth="0.8" opacity="0.2"/>
                {/* Inner glow fill */}
                <path d="M24,155 L24,60 A36,36 0 0,1 96,60 L96,155 Z" fill={AMBER} style={{ animation: "portalInner 4s ease-in-out infinite" }}/>

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
              <div className="portal-glow-div" style={{
                position: "absolute", top: 12, left: 18, right: 18, bottom: 0,
                borderRadius: "50% 50% 0 0 / 30% 30% 0 0",
                animation: "portalGlow 3s ease-in-out infinite",
                transition: "box-shadow 0.3s ease, filter 0.3s ease",
                pointerEvents: "none",
              }}/>
              {/* Hover text */}
              <span className="portal-hover-text" style={{
                display: "block", textAlign: "center", marginTop: 4,
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 14, fontStyle: "italic", color: AMBER,
                opacity: 0, transition: "opacity 0.3s ease",
                pointerEvents: "none",
              }}>Enter the Gateway</span>
            </a>

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
              <a href="/experience/praxis" style={{
                display: "block", width: "100%", background: NAVY, color: "#FFF", border: "none", borderRadius: 8,
                padding: "12px 0", fontSize: 14, fontWeight: 600, cursor: "pointer",
                fontFamily: "'Cormorant Garamond', Georgia, serif", letterSpacing: 1,
                textDecoration: "none", textAlign: "center", boxSizing: "border-box",
              }}>Experience Praxis →</a>
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
              <a href="/experience/civitas" style={{
                display: "block", width: "100%", background: AMBER, color: "#FFF", border: "none", borderRadius: 8,
                padding: "12px 0", fontSize: 14, fontWeight: 600, cursor: "pointer",
                fontFamily: "'Cormorant Garamond', Georgia, serif", letterSpacing: 1,
                textDecoration: "none", textAlign: "center", boxSizing: "border-box",
              }}>Experience Civitas →</a>
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
        <PraxisDemoCarousel/>
      </DemoModal>
      <DemoModal show={showCivitas} onClose={() => setShowCivitas(false)} title="Gradeum Civitas">
        <CivitasDemoCarousel/>
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
