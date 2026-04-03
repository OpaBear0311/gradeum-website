'use client';

import { useEffect, useRef } from 'react';
import DemoRequestForm from './DemoRequestForm';

const BG = '#0B1120';
const AMBER = '#C4882A';
const TEXT = '#E2E8F0';
const TEXT_DIM = '#94A3B8';

interface Section {
  heading: string;
  subheading?: string;
  body: string[];
}

interface ExperiencePageProps {
  product: 'praxis' | 'civitas';
  sections: Section[];
  demoSubtext: string;
}

export default function ExperiencePage({ product, sections, demoSubtext }: ExperiencePageProps) {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = '1';
            (entry.target as HTMLElement).style.transform = 'translateY(0)';
          }
        });
      },
      { threshold: 0.15 }
    );
    sectionRefs.current.forEach(ref => { if (ref) observer.observe(ref); });
    return () => observer.disconnect();
  }, []);

  const productName = product === 'praxis' ? 'PRAXIS' : 'CIVITAS';

  return (
    <div style={{
      background: BG,
      minHeight: '100vh',
      fontFamily: "'DM Sans', sans-serif",
      color: TEXT,
      overflowX: 'hidden',
    }}>
      {/* Nav */}
      <nav style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 40px',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: `${BG}CC`,
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <a href="/" style={{
          fontFamily: "'Cinzel', serif",
          fontSize: 16,
          fontWeight: 700,
          letterSpacing: 4,
          color: AMBER,
          textDecoration: 'none',
        }}>GRADEUM</a>
        <span style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: 14,
          color: TEXT_DIM,
          letterSpacing: 2,
        }}>{productName}</span>
      </nav>

      {/* Sections */}
      {sections.map((section, i) => (
        <div
          key={i}
          ref={el => { sectionRefs.current[i] = el; }}
          style={{
            minHeight: i === 0 ? '100vh' : '80vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '80px 40px',
            textAlign: 'center',
            opacity: 0,
            transform: 'translateY(40px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}
        >
          {/* Accent line */}
          {i > 0 && (
            <div style={{
              width: 40,
              height: 1,
              background: `${AMBER}40`,
              marginBottom: 48,
            }} />
          )}

          <h2 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: i === 0 ? 48 : 36,
            fontWeight: 400,
            color: AMBER,
            letterSpacing: i === 0 ? 6 : 3,
            lineHeight: 1.3,
            marginBottom: 32,
            maxWidth: 700,
            whiteSpace: 'pre-line',
          }}>
            {section.heading}
          </h2>

          {section.subheading && (
            <div style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: 20,
              color: TEXT_DIM,
              marginBottom: 32,
              fontStyle: 'italic',
            }}>
              {section.subheading}
            </div>
          )}

          <div style={{
            maxWidth: 560,
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}>
            {section.body.map((line, j) => (
              <p key={j} style={{
                fontSize: 16,
                lineHeight: 1.8,
                color: TEXT,
                margin: 0,
                opacity: 0.85,
              }}>
                {line}
              </p>
            ))}
          </div>
        </div>
      ))}

      {/* Demo request section */}
      <div
        ref={el => { sectionRefs.current[sections.length] = el; }}
        style={{
          minHeight: '70vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '80px 40px',
          textAlign: 'center',
          opacity: 0,
          transform: 'translateY(40px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
        }}
      >
        <div style={{
          width: 40, height: 1,
          background: `${AMBER}40`,
          marginBottom: 48,
        }} />

        <h2 style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: 36,
          fontWeight: 400,
          color: AMBER,
          letterSpacing: 3,
          marginBottom: 16,
        }}>
          EXPERIENCE {productName}
        </h2>

        <p style={{
          fontSize: 16,
          color: TEXT,
          opacity: 0.85,
          marginBottom: 40,
          maxWidth: 480,
          lineHeight: 1.6,
        }}>
          Enter your email to receive a demo key.
          No commitment. No sales call. Just the platform.
        </p>

        <DemoRequestForm product={product} />

        <p style={{
          fontSize: 13,
          color: TEXT_DIM,
          marginTop: 32,
          maxWidth: 420,
          lineHeight: 1.6,
        }}>
          {demoSubtext}
        </p>
      </div>

      {/* Footer */}
      <footer style={{
        padding: '24px 40px',
        textAlign: 'center',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        fontSize: 12,
        color: TEXT_DIM,
      }}>
        Gradeum Technologies, LLC
      </footer>

      {/* Load fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600;700&family=DM+Serif+Display&display=swap"
        rel="stylesheet"
      />
    </div>
  );
}
