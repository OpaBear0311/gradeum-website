import { useState, useEffect } from "react";

// ── Palette (matches Porta landing) ─────────────────────────
const NAVY = "#1B3A5C";
const AMBER = "#C4883A";
const CREAM = "#FAF7F2";
const WHITE = "#FFFFFF";
const MARBLE = "#E8E4DC";
const TEXT_MUTED = "#5A6B7F";
const TEXT_DIM = "#8B9AAD";

const FONTS = {
  headline: "'Cormorant Garamond', Georgia, serif",
  latin: "'Cinzel', 'Cormorant Garamond', Georgia, serif",
  body: "'Lato', 'Helvetica Neue', sans-serif",
};

// ── Products ────────────────────────────────────────────────
const PRODUCTS = {
  praxis: {
    name: "PRAXIS",
    subtitle: "The Practice of Engineering",
    description:
      "AI-native practice management for engineering firms. Document Q&A, drawing intelligence, PE governance, time tracking, and invoicing — all powered by your firm's institutional memory.",
    features: [
      "Document Q&A",
      "Drawing Intelligence",
      "Consilium Consensus",
      "PE Governance",
      "Time Tracking",
      "Invoicing",
      "Resource Forecasting",
      "Institutional Memory",
    ],
    cta: "Experience Praxis",
    link: "https://praxis.gradeum.io",
  },
  civitas: {
    name: "CIVITAS",
    subtitle: "The Infrastructure of Community",
    description:
      "Enterprise infrastructure operating system. Asset intelligence, condition tracking, capital planning, and board-ready reporting — grounded in your asset records.",
    features: [
      "Asset Intelligence",
      "Condition Tracking",
      "Inspection Management",
      "Work Order Pipeline",
      "Capital Planning",
      "Board Briefings",
      "Field Mode (Mobile)",
      "Deterioration Modeling",
    ],
    cta: "Experience Civitas",
    link: "https://civitas.gradeum.io",
  },
};

// ── Countdown ───────────────────────────────────────────────
function useCountdown(targetIso) {
  const [countdown, setCountdown] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0,
  });
  useEffect(() => {
    const target = new Date(targetIso).getTime();
    const update = () => {
      const diff = Math.max(0, target - Date.now());
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
  }, [targetIso]);
  return countdown;
}

const CountdownUnit = ({ value, label }) => (
  <div style={{ textAlign: "center", minWidth: 54 }}>
    <div style={{
      fontFamily: FONTS.headline, fontSize: 28, fontWeight: 700,
      color: AMBER, lineHeight: 1,
    }}>
      {String(value).padStart(2, "0")}
    </div>
    <div style={{
      fontFamily: FONTS.body, fontSize: 9, color: "#8AA4C0",
      textTransform: "uppercase", letterSpacing: 2, marginTop: 2,
    }}>
      {label}
    </div>
  </div>
);

// ── Product Card ────────────────────────────────────────────
const ProductCard = ({ product }) => (
  <div style={{
    flex: "1 1 400px",
    background: WHITE,
    border: `1px solid ${MARBLE}`,
    borderRadius: 12,
    padding: 32,
    display: "flex",
    flexDirection: "column",
    gap: 16,
    boxShadow: "0 2px 12px rgba(27,58,92,0.06)",
  }}>
    <h3 style={{
      fontFamily: FONTS.latin, fontSize: 20, fontWeight: 600,
      letterSpacing: 4, color: AMBER, margin: 0,
    }}>
      {product.name}
    </h3>
    <p style={{
      fontFamily: FONTS.headline, fontSize: 16,
      color: NAVY, margin: 0,
    }}>
      {product.subtitle}
    </p>
    <p style={{
      fontSize: 14, color: TEXT_MUTED, lineHeight: 1.7,
      fontFamily: FONTS.body, margin: 0,
    }}>
      {product.description}
    </p>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {product.features.map((f) => (
        <span key={f} style={{
          padding: "4px 12px",
          borderRadius: 20,
          fontSize: 11,
          fontWeight: 500,
          fontFamily: FONTS.body,
          background: "rgba(196,136,58,0.08)",
          color: AMBER,
          border: "1px solid rgba(196,136,58,0.2)",
        }}>
          {f}
        </span>
      ))}
    </div>
    <a href={product.link} style={{
      display: "inline-block",
      padding: "10px 24px",
      borderRadius: 8,
      background: NAVY,
      color: WHITE,
      fontSize: 14,
      fontWeight: 600,
      fontFamily: FONTS.body,
      textDecoration: "none",
      textAlign: "center",
      marginTop: "auto",
      cursor: "pointer",
    }}>
      {product.cta} →
    </a>
  </div>
);

// ── Main Page ───────────────────────────────────────────────
export default function GradeumSite() {
  const countdown = useCountdown("2026-05-04T00:00:00Z");

  return (
    <div style={{
      fontFamily: FONTS.body,
      background: CREAM,
      minHeight: "100vh",
    }}>
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Lato:wght@300;400;700&family=Cinzel:wght@400;600;700&display=swap"
        rel="stylesheet"
      />

      {/* LAUNCH COUNTDOWN BANNER */}
      <div style={{
        background: NAVY,
        padding: "14px 40px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 32,
        flexWrap: "wrap",
      }}>
        <div style={{
          fontFamily: FONTS.latin, fontSize: 14, fontWeight: 700,
          color: "#FFF", letterSpacing: 4, textTransform: "uppercase",
        }}>
          Launch Day <span style={{ color: AMBER }}>·</span> May 04, 2026{" "}
          <span style={{ color: "#7898B8", fontSize: 11 }}>00:00 UTC</span>
        </div>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <CountdownUnit value={countdown.days} label="Days" />
          <span style={{ color: AMBER, fontSize: 20, fontWeight: 300, marginBottom: 12 }}>:</span>
          <CountdownUnit value={countdown.hours} label="Hours" />
          <span style={{ color: AMBER, fontSize: 20, fontWeight: 300, marginBottom: 12 }}>:</span>
          <CountdownUnit value={countdown.minutes} label="Min" />
          <span style={{ color: AMBER, fontSize: 20, fontWeight: 300, marginBottom: 12 }}>:</span>
          <CountdownUnit value={countdown.seconds} label="Sec" />
        </div>
      </div>

      {/* HEADER */}
      <header style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 32px",
        borderBottom: `1px solid ${MARBLE}`,
        background: CREAM,
      }}>
        <a href="/" style={{ textDecoration: "none" }}>
          <span style={{
            fontFamily: FONTS.latin, fontSize: 18, fontWeight: 600,
            letterSpacing: 6, color: AMBER,
          }}>
            GRADEUM
          </span>
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {[
            { href: "https://praxis.gradeum.io", label: "Praxis" },
            { href: "https://civitas.gradeum.io", label: "Civitas" },
            { href: "https://porta.gradeum.io/download", label: "Download" },
          ].map((link) => (
            <a key={link.href} href={link.href} style={{
              color: TEXT_MUTED, fontSize: 13, fontWeight: 500,
              textDecoration: "none", fontFamily: FONTS.body,
            }}>
              {link.label}
            </a>
          ))}
          <a href="https://porta.gradeum.io" style={{
            padding: "8px 20px",
            borderRadius: 6,
            background: AMBER,
            color: WHITE,
            fontSize: 13,
            fontWeight: 600,
            textDecoration: "none",
            fontFamily: FONTS.body,
          }}>
            Sign In
          </a>
        </div>
      </header>

      {/* HERO */}
      <section style={{
        textAlign: "center",
        padding: "80px 24px 40px",
        maxWidth: 800,
        margin: "0 auto",
      }}>
        <h1 style={{
          fontFamily: FONTS.headline, fontSize: 42,
          color: NAVY, margin: "0 0 20px", lineHeight: 1.2,
        }}>
          AI for the Infrastructure of Our World
        </h1>
        <p style={{
          fontSize: 16, color: TEXT_MUTED, lineHeight: 1.7,
          maxWidth: 600, margin: "0 auto",
        }}>
          Document intelligence, institutional memory, and practice management
          for professional engineering firms and infrastructure owners.
        </p>
      </section>

      {/* VALUE PROP */}
      <div style={{ textAlign: "center", padding: "24px 24px 48px" }}>
        <p style={{
          fontFamily: FONTS.latin, fontSize: 14, fontStyle: "italic",
          color: AMBER, letterSpacing: 2, margin: 0,
        }}>
          Your Knowledge — Empowered — Protected
        </p>
      </div>

      {/* PRODUCT CARDS */}
      <section style={{
        display: "flex", gap: 24, maxWidth: 960,
        margin: "0 auto", padding: "0 24px 80px", flexWrap: "wrap",
      }}>
        <ProductCard product={PRODUCTS.praxis} />
        <ProductCard product={PRODUCTS.civitas} />
      </section>

      {/* FOOTER */}
      <footer style={{
        textAlign: "center",
        padding: "32px 24px",
        borderTop: `1px solid ${MARBLE}`,
        background: CREAM,
      }}>
        <p style={{
          fontSize: 13, fontFamily: FONTS.latin, fontStyle: "italic",
          color: AMBER, margin: "0 0 8px",
        }}>
          Gradere in futurum
        </p>
        <p style={{ fontSize: 11, color: TEXT_DIM, margin: 0 }}>
          © 2026 Gradeum Technologies, LLC · Houston, Texas
        </p>
      </footer>
    </div>
  );
}
