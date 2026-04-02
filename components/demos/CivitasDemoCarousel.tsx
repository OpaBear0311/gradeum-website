'use client'
import { useState, useEffect, useCallback } from "react";
import CivitasFieldInspection from "./CivitasFieldInspection";
import CivitasCallOut from "./CivitasCallOut";
import CivitasAssetManager from "./CivitasAssetManager";
import "./demo-animations.css";

const AMBER = "#C4883A";
const AMBER_LIGHT = "#D4A65A";
const PAPER = "#FAF7F2";
const NAVY_DEEP = "#0F1D36";

const DEMOS = [
  {
    id: "inspection",
    label: "Field Inspection",
    subtitle: "\"Was this here before?\"",
    duration: 30,
    Component: CivitasFieldInspection,
  },
  {
    id: "callout",
    label: "Emergency Call-Out",
    subtitle: "\"Do we have this?\"",
    duration: 24,
    Component: CivitasCallOut,
  },
  {
    id: "manager",
    label: "Asset Management",
    subtitle: "\"Brief the board on Dock 7\"",
    duration: 25,
    Component: CivitasAssetManager,
  },
];

export default function CivitasDemoCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const currentDemo = DEMOS[activeIndex];

  // Auto-advance
  useEffect(() => {
    if (!isVisible) return;
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
  }, [activeIndex, currentDemo.duration, isVisible]);

  // Intersection observer — only play when visible
  const containerRef = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const selectDemo = (index: number) => {
    setActiveIndex(index);
    setProgress(0);
  };

  return (
    <div ref={containerRef} style={{ maxWidth: 960, margin: "0 auto", padding: "0 20px" }}>
      {/* Tab bar */}
      <div style={{
        display: "flex", gap: 4, marginBottom: 16,
        background: "rgba(27,58,92,0.3)",
        borderRadius: 10, padding: 4,
      }}>
        {DEMOS.map((demo, i) => (
          <button
            key={demo.id}
            onClick={() => selectDemo(i)}
            style={{
              flex: 1, padding: "12px 8px",
              background: i === activeIndex ? "rgba(196,136,58,0.12)" : "transparent",
              border: i === activeIndex ? "1px solid rgba(196,136,58,0.25)" : "1px solid transparent",
              borderRadius: 8, cursor: "pointer",
              transition: "all 0.3s ease",
              position: "relative", overflow: "hidden",
            }}
          >
            {/* Progress bar */}
            {i === activeIndex && (
              <div style={{
                position: "absolute", bottom: 0, left: 0,
                height: 2, background: AMBER,
                width: `${progress}%`,
                transition: "width 50ms linear",
              }} />
            )}
            <div style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13, fontWeight: 600,
              color: i === activeIndex ? PAPER : "rgba(255,255,255,0.45)",
              marginBottom: 2,
            }}>{demo.label}</div>
            <div style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 11, fontStyle: "italic",
              color: i === activeIndex ? AMBER_LIGHT : "rgba(255,255,255,0.25)",
            }}>{demo.subtitle}</div>
          </button>
        ))}
      </div>

      {/* Demo viewport */}
      <div style={{
        position: "relative",
        aspectRatio: "16/10",
        borderRadius: 12,
        overflow: "hidden",
        background: NAVY_DEEP,
        boxShadow: "0 24px 80px rgba(0,0,0,0.4)",
      }}>
        {DEMOS.map((demo, i) => (
          <div
            key={demo.id}
            style={{
              position: "absolute", inset: 0,
              opacity: i === activeIndex ? 1 : 0,
              pointerEvents: i === activeIndex ? "auto" : "none",
              transition: "opacity 0.5s ease",
            }}
          >
            <demo.Component active={i === activeIndex && isVisible} />
          </div>
        ))}
      </div>
    </div>
  );
}
