'use client'
import { useState, useEffect } from "react";
import CivitasFieldInspection from "./CivitasFieldInspection";
import CivitasCallOut from "./CivitasCallOut";
import CivitasAssetManager from "./CivitasAssetManager";

const AMBER = "#C4883A";
const NAVY = "#1B3A5C";
const NAVY_DEEP = "#0F1D36";

const DEMOS = [
  { id: "inspection", label: "Field Inspection", subtitle: "\"Was this here before?\"", duration: 30, Component: CivitasFieldInspection },
  { id: "callout", label: "Emergency Call-Out", subtitle: "\"Do we have this?\"", duration: 24, Component: CivitasCallOut },
  { id: "manager", label: "Asset Management", subtitle: "\"Brief the board on Dock 7\"", duration: 25, Component: CivitasAssetManager },
];

export default function CivitasDemoCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const currentDemo = DEMOS[activeIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const next = prev + (100 / (currentDemo.duration * 20));
        if (next >= 100) {
          setActiveIndex(i => (i + 1) % DEMOS.length);
          return 0;
        }
        return next;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [activeIndex, currentDemo.duration]);

  const selectDemo = (index) => {
    setActiveIndex(index);
    setProgress(0);
  };

  return (
    <div>
      {/* Tab bar */}
      <div style={{
        display: "flex", gap: 3, marginBottom: 12,
        background: "rgba(27,58,92,0.15)",
        borderRadius: 8, padding: 3,
      }}>
        {DEMOS.map((demo, i) => (
          <button
            key={demo.id}
            onClick={() => selectDemo(i)}
            style={{
              flex: 1, padding: "10px 6px",
              background: i === activeIndex ? "rgba(196,136,58,0.08)" : "transparent",
              border: i === activeIndex ? "1px solid rgba(196,136,58,0.18)" : "1px solid transparent",
              borderRadius: 6, cursor: "pointer",
              transition: "all 0.3s ease",
              position: "relative", overflow: "hidden",
              fontFamily: "'Lato', sans-serif",
            }}
          >
            {i === activeIndex && (
              <div style={{
                position: "absolute", bottom: 0, left: 0,
                height: 2, background: AMBER,
                width: progress + "%",
                transition: "width 50ms linear",
              }} />
            )}
            <div style={{
              fontSize: 12, fontWeight: 600,
              color: i === activeIndex ? NAVY : "rgba(27,58,92,0.4)",
              marginBottom: 1,
            }}>{demo.label}</div>
            <div style={{
              fontSize: 10, fontStyle: "italic",
              color: i === activeIndex ? AMBER : "rgba(27,58,92,0.2)",
              fontFamily: "'Cormorant Garamond', Georgia, serif",
            }}>{demo.subtitle}</div>
          </button>
        ))}
      </div>

      {/* Demo viewport */}
      <div style={{
        position: "relative",
        aspectRatio: "16/10",
        borderRadius: 10,
        overflow: "hidden",
        background: NAVY_DEEP,
        boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
      }}>
        {DEMOS.map((demo, i) => (
          <div
            key={demo.id}
            style={{
              position: "absolute", inset: 0,
              opacity: i === activeIndex ? 1 : 0,
              pointerEvents: i === activeIndex ? "auto" : "none",
              transition: "opacity 0.4s ease",
            }}
          >
            <demo.Component active={i === activeIndex} />
          </div>
        ))}
      </div>
    </div>
  );
}
