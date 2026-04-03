'use client';

import { useTimeline, type Beat } from './useTimeline';
import DemoRequestForm from '../DemoRequestForm';

// Design tokens matching real Command Center
const BG = '#0B1120';
const PANEL = '#111827';
const SURFACE = '#1F2937';
const BORDER = 'rgba(255,255,255,0.08)';
const AMBER = '#C4882A';
const TEXT = '#F8FAFC';
const MUTED = '#94A3B8';
const DIM = '#64748B';
const SUCCESS = '#4ADE80';
const INFO = '#3B82F6';
const MONO = "'JetBrains Mono', monospace";
const SANS = "'DM Sans', sans-serif";
const SERIF = "'DM Serif Display', serif";

interface NavItem { label: string }
interface ChatMsg { role: 'user' | 'atlas'; text: string; citations?: string; tier?: string; cost?: string }
interface TableRow { cells: string[]; badge?: { text: string; color: string } }
interface ActionCard { title: string; fields: Record<string, string>; confirm: string; result: string }
interface GanttBar { label: string; pct: number; color: string; milestone?: boolean }

export interface DemoConfig {
  product: 'praxis' | 'civitas';
  productName: string;
  navItems: NavItem[];
  activeNav: string;
  statCards: { label: string; value: string }[];
  contextItems: { label: string; detail: string; pct: number }[];
  chatQuestion: string;
  chatResponse: string;
  chatCitations: string;
  previewTitle: string;
  previewRows: TableRow[];
  fileAction: ActionCard;
  ganttBars: GanttBar[];
  screenshotAction: ActionCard;
  demoSubtext: string;
}

export default function ExperienceDemo({ config }: { config: DemoConfig }) {
  const beats: Beat[] = [
    { id: 'reveal', startMs: 1000, durationMs: 2000 },
    { id: 'context', startMs: 3000, durationMs: 3000 },
    { id: 'question', startMs: 6000, durationMs: 3000 },
    { id: 'response', startMs: 9000, durationMs: 7000 },
    { id: 'preview', startMs: 16000, durationMs: 4000 },
    { id: 'filing', startMs: 20000, durationMs: 6000 },
    { id: 'gantt', startMs: 26000, durationMs: 6000 },
    { id: 'screenshot', startMs: 32000, durationMs: 8000 },
    { id: 'hero', startMs: 40000, durationMs: 4000 },
    { id: 'cta', startMs: 44000, durationMs: 2000 },
  ];

  const tl = useTimeline(beats);
  const { isBeatActive: a, isBeatDone: d, beatProgress: p, done, restart, elapsed } = tl;

  const tooNarrow = typeof window !== 'undefined' && window.innerWidth < 1280;

  if (tooNarrow) {
    return (
      <div style={{ height: '100vh', background: BG, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32, textAlign: 'center', fontFamily: SANS }}>
        <div style={{ fontFamily: SERIF, fontSize: 28, color: AMBER, letterSpacing: 4, marginBottom: 16 }}>EXPERIENCE {config.productName}</div>
        <div style={{ fontSize: 14, color: MUTED, marginBottom: 32, maxWidth: 400, lineHeight: 1.6 }}>This demo is best viewed on a desktop browser (1280px+). Enter your email below to receive a demo key.</div>
        <DemoRequestForm product={config.product} />
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700&family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet" />
      </div>
    );
  }

  // Typing helpers
  const typed = (text: string, progress: number) => text.slice(0, Math.floor(text.length * Math.min(progress, 1)));
  const wordStream = (text: string, progress: number) => {
    const words = text.split(' ');
    return words.slice(0, Math.floor(words.length * Math.min(progress, 1))).join(' ');
  };

  const panelReveal = a('reveal');
  const showCTA = a('cta') || done;
  const ctaDim = showCTA ? 0.15 : 1;

  return (
    <div style={{ height: '100vh', width: '100vw', background: BG, overflow: 'hidden', position: 'relative', fontFamily: SANS }}>
      {/* Ambient glow before reveal */}
      {!panelReveal && (
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
          width: 300, height: 300, borderRadius: '50%',
          background: `radial-gradient(circle, ${AMBER}15 0%, transparent 70%)`,
        }} />
      )}

      {/* Command Center */}
      <div style={{
        display: 'flex', flexDirection: 'column', height: '100%',
        opacity: panelReveal ? ctaDim : 0,
        transition: 'opacity 0.8s ease',
      }}>
        {/* Top bar */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '6px 16px', borderBottom: `1px solid ${BORDER}`, background: PANEL,
          minHeight: 40, opacity: panelReveal ? 1 : 0, transition: 'opacity 0.5s ease 0.3s',
        }}>
          <span style={{ fontFamily: "'Cinzel', serif", fontSize: 14, fontWeight: 700, letterSpacing: 4, color: AMBER }}>{config.productName}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: SUCCESS, boxShadow: `0 0 6px ${SUCCESS}80` }} />
              <span style={{ fontSize: 10, color: MUTED }}>Custos</span>
            </div>
            <span style={{ fontSize: 10, color: DIM, fontFamily: MONO }}>$127.43</span>
            <div style={{ width: 22, height: 22, borderRadius: '50%', background: SURFACE, display: 'flex', alignItems: 'center', justifyContent: 'center', color: AMBER, fontSize: 10, fontWeight: 700 }}>J</div>
          </div>
        </div>

        {/* Three panels */}
        <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
          {/* LEFT — Context Pane */}
          <div style={{
            width: 260, background: PANEL, borderRight: `1px solid ${BORDER}`,
            display: 'flex', flexDirection: 'column', overflow: 'hidden',
            transform: panelReveal ? 'translateX(0)' : 'translateX(-100%)',
            transition: 'transform 0.6s ease',
          }}>
            {/* Nav */}
            <nav style={{ padding: '12px 0' }}>
              {config.navItems.map((item, i) => {
                const visible = a('context') && elapsed >= 3000 + i * 100;
                const isActive = item.label === config.activeNav;
                return (
                  <div key={item.label} style={{
                    padding: '8px 16px', fontSize: 12,
                    color: isActive ? AMBER : MUTED,
                    background: isActive ? `${AMBER}15` : 'transparent',
                    borderLeft: isActive ? `2px solid ${AMBER}` : '2px solid transparent',
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateX(0)' : 'translateX(-20px)',
                    transition: 'all 0.3s ease',
                    fontWeight: isActive ? 600 : 400,
                  }}>{item.label}</div>
                );
              })}
            </nav>

            {/* Context items (projects/stats) */}
            {a('context') && (
              <div style={{ padding: '0 12px', flex: 1, overflow: 'hidden' }}>
                {/* Stat cards for Civitas, project cards for Praxis */}
                {config.statCards.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 12 }}>
                    {config.statCards.map((s, i) => (
                      <div key={s.label} style={{
                        padding: '8px', borderRadius: 6, background: SURFACE, fontSize: 11,
                        opacity: elapsed >= 3500 + i * 200 ? 1 : 0,
                        transition: 'opacity 0.4s ease',
                      }}>
                        <div style={{ color: DIM, fontSize: 9 }}>{s.label}</div>
                        <div style={{ color: TEXT, fontSize: 16, fontWeight: 700, fontFamily: MONO }}>{s.value}</div>
                      </div>
                    ))}
                  </div>
                )}
                {config.contextItems.map((item, i) => (
                  <div key={item.label} style={{
                    padding: '8px', borderRadius: 6, background: SURFACE, marginBottom: 6,
                    opacity: elapsed >= 4000 + i * 300 ? 1 : 0,
                    transition: 'opacity 0.4s ease',
                  }}>
                    <div style={{ fontSize: 11, fontWeight: 500, color: TEXT }}>{item.label}</div>
                    <div style={{ fontSize: 9, color: DIM }}>{item.detail}</div>
                    <div style={{ marginTop: 4, height: 3, borderRadius: 2, background: `${TEXT}10` }}>
                      <div style={{
                        height: '100%', borderRadius: 2, background: AMBER,
                        width: elapsed >= 4200 + i * 300 ? `${item.pct}%` : '0%',
                        transition: 'width 0.8s ease',
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* CENTER — ATLAS Chat */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
            {/* Context bar */}
            <div style={{ padding: '4px 24px', fontSize: 9, color: DIM, borderBottom: `1px solid ${BORDER}`, background: PANEL }}>
              ATLAS context: <span style={{ color: MUTED }}>{config.activeNav}</span>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, padding: '20px 24px', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
              {/* User question */}
              {a('question') && (
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
                  <div style={{
                    maxWidth: '70%', padding: '10px 14px',
                    borderRadius: '12px 12px 3px 12px',
                    background: '#1E293B', color: TEXT, fontSize: 13, lineHeight: 1.6,
                  }}>
                    {typed(config.chatQuestion, p('question'))}
                    {a('question') && !d('question') && <span style={{ opacity: 0.5 }}>|</span>}
                  </div>
                </div>
              )}

              {/* Thinking indicator */}
              {a('response') && !d('response') && p('response') < 0.15 && (
                <div style={{ fontSize: 12, color: DIM, fontStyle: 'italic', marginBottom: 12, paddingLeft: 4 }}>
                  ATLAS is thinking...
                </div>
              )}

              {/* ATLAS response */}
              {a('response') && p('response') >= 0.15 && (
                <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 12 }}>
                  <div style={{
                    maxWidth: '80%', padding: '12px 16px',
                    borderRadius: '12px 12px 12px 3px',
                    background: SURFACE, border: `1px solid ${BORDER}`,
                    color: TEXT, fontSize: 12, lineHeight: 1.7, whiteSpace: 'pre-wrap',
                  }}>
                    {wordStream(config.chatResponse, (p('response') - 0.15) / 0.85)}
                    {d('response') && (
                      <>
                        <div style={{ marginTop: 8, paddingTop: 8, borderTop: `1px solid ${BORDER}`, fontSize: 10, color: DIM, fontStyle: 'italic' }}>
                          {config.chatCitations}
                        </div>
                        <div style={{ marginTop: 6, display: 'flex', gap: 4 }}>
                          <span style={{ padding: '1px 6px', borderRadius: 3, fontSize: 9, fontWeight: 700, fontFamily: MONO, color: SUCCESS, background: `${SUCCESS}15` }}>
                            {config.product === 'praxis' ? 'CASCADE' : 'SEARCH'} {config.product === 'praxis' ? '$0.02' : '$0.02'}
                          </span>
                          <span style={{ padding: '1px 6px', borderRadius: 3, fontSize: 9, fontWeight: 700, fontFamily: MONO, color: AMBER, background: `${AMBER}15` }}>
                            {config.productName}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Filing action card */}
              {a('filing') && (
                <ActionCardAnim card={config.fileAction} progress={p('filing')} done={d('filing')} />
              )}

              {/* Screenshot action card */}
              {a('screenshot') && (
                <ActionCardAnim card={config.screenshotAction} progress={p('screenshot')} done={d('screenshot')} />
              )}
            </div>

            {/* PE disclaimer */}
            <div style={{ padding: '6px 24px', fontSize: 8, color: DIM, borderTop: `1px solid ${BORDER}` }}>
              AI-generated responses require PE review before use in design decisions.
            </div>

            {/* Input bar */}
            <div style={{ padding: '8px 24px 12px', display: 'flex', gap: 6 }}>
              <div style={{
                flex: 1, padding: '8px 12px', borderRadius: 8,
                background: SURFACE, border: `1px solid ${BORDER}`,
                fontSize: 12, color: DIM,
              }}>Ask ATLAS...</div>
              <div style={{
                width: 32, height: 32, borderRadius: 8,
                background: AMBER, display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: BG, fontSize: 14,
              }}>→</div>
            </div>
          </div>

          {/* RIGHT — Preview Pane */}
          <div style={{
            width: 340, background: PANEL, borderLeft: `1px solid ${BORDER}`,
            display: 'flex', flexDirection: 'column', overflow: 'hidden',
            transform: panelReveal ? 'translateX(0)' : 'translateX(100%)',
            transition: 'transform 0.6s ease',
          }}>
            <div style={{ padding: '8px 12px', borderBottom: `1px solid ${BORDER}`, fontSize: 10, color: DIM, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase' }}>
              Preview
            </div>
            <div style={{ flex: 1, padding: 12, overflow: 'hidden' }}>
              {/* Preview table (Beat 5) */}
              {a('preview') && !a('gantt') && (
                <PreviewTable title={config.previewTitle} rows={config.previewRows} progress={p('preview')} />
              )}
              {/* Gantt (Beat 7) */}
              {a('gantt') && (
                <GanttPreview bars={config.ganttBars} progress={p('gantt')} />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Overlay */}
      {showCTA && (
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          zIndex: 50,
          opacity: done ? 1 : 0,
          transition: 'opacity 0.8s ease',
        }}>
          <div style={{ fontFamily: SERIF, fontSize: 36, color: AMBER, letterSpacing: 4, marginBottom: 16 }}>
            EXPERIENCE {config.productName}
          </div>
          <div style={{ fontSize: 15, color: TEXT, opacity: 0.8, marginBottom: 32, lineHeight: 1.6, textAlign: 'center' }}>
            Enter your email to receive a demo key.<br />No commitment. No sales call. Just the platform.
          </div>
          <DemoRequestForm product={config.product} />
          <button onClick={restart} style={{
            marginTop: 24, background: 'none', border: 'none',
            color: DIM, fontSize: 12, cursor: 'pointer', fontFamily: SANS,
            textDecoration: 'underline',
          }}>Watch again</button>
          <div style={{ marginTop: 16, fontSize: 11, color: DIM, maxWidth: 380, textAlign: 'center', lineHeight: 1.5 }}>
            {config.demoSubtext}
          </div>
        </div>
      )}

      {/* Fonts */}
      <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700&family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet" />
    </div>
  );
}

/* Sub-components */

function ActionCardAnim({ card, progress, done: isDone }: { card: ActionCard; progress: number; done: boolean }) {
  const visible = progress > 0.1;
  const confirmed = progress > 0.7;
  return (
    <div style={{ marginBottom: 12, opacity: visible ? 1 : 0, transition: 'opacity 0.4s ease' }}>
      {/* User drop message */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
        <div style={{ padding: '6px 10px', borderRadius: '10px 10px 3px 10px', background: '#1E293B', color: TEXT, fontSize: 11 }}>
          {card.title}
        </div>
      </div>
      {/* ATLAS card */}
      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <div style={{
          padding: '10px 14px', borderRadius: '10px 10px 10px 3px',
          background: SURFACE, border: `1px solid ${BORDER}`, maxWidth: '80%',
        }}>
          {!confirmed && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 11 }}>
              {Object.entries(card.fields).map(([k, v]) => (
                <div key={k}><span style={{ color: DIM }}>{k}:</span> <span style={{ color: TEXT }}>{v}</span></div>
              ))}
              <div style={{ display: 'flex', gap: 4, marginTop: 6 }}>
                <span style={{
                  padding: '3px 10px', borderRadius: 4, fontSize: 10, fontWeight: 600,
                  background: `${SUCCESS}15`, color: SUCCESS,
                  animation: 'pulse 1.5s ease-in-out infinite',
                }}>{card.confirm}</span>
              </div>
            </div>
          )}
          {confirmed && (
            <div style={{ fontSize: 11, color: SUCCESS, display: 'flex', alignItems: 'center', gap: 4 }}>
              ✓ {card.result}
            </div>
          )}
        </div>
      </div>
      <style>{`@keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.6; } }`}</style>
    </div>
  );
}

function PreviewTable({ title, rows, progress }: { title: string; rows: TableRow[]; progress: number }) {
  const visibleCount = Math.floor(rows.length * Math.min(progress * 1.5, 1));
  return (
    <div>
      <div style={{ fontSize: 12, fontWeight: 600, color: TEXT, marginBottom: 8 }}>{title}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {rows.slice(0, visibleCount).map((row, i) => (
          <div key={i} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '6px 8px', borderRadius: 4, background: SURFACE, fontSize: 10,
            opacity: 1, transition: 'opacity 0.3s ease',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {row.cells.map((cell, j) => (
                <span key={j} style={{ color: j === 0 ? TEXT : DIM }}>{cell}</span>
              ))}
            </div>
            {row.badge && (
              <span style={{
                padding: '1px 6px', borderRadius: 3, fontSize: 8, fontWeight: 700,
                background: `${row.badge.color}20`, color: row.badge.color,
              }}>{row.badge.text}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function GanttPreview({ bars, progress }: { bars: GanttBar[]; progress: number }) {
  return (
    <div>
      <div style={{ fontSize: 12, fontWeight: 600, color: TEXT, marginBottom: 8 }}>Schedule</div>
      <div style={{ display: 'flex', gap: 4, marginBottom: 10 }}>
        {['Day', 'Week', 'Month'].map(z => (
          <span key={z} style={{
            padding: '2px 8px', borderRadius: 4, fontSize: 9, fontWeight: 600,
            background: z === 'Week' ? `${AMBER}15` : 'transparent',
            color: z === 'Week' ? AMBER : DIM,
            border: `1px solid ${z === 'Week' ? `${AMBER}30` : BORDER}`,
          }}>{z}</span>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {bars.map((bar, i) => {
          const barProgress = Math.max(0, Math.min((progress - i * 0.08) * 2, 1));
          return (
            <div key={bar.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 9, color: MUTED, width: 100, flexShrink: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {bar.label}
              </span>
              {bar.milestone ? (
                <div style={{
                  width: 10, height: 10, transform: 'rotate(45deg)',
                  background: AMBER, marginLeft: 20,
                  opacity: barProgress > 0.5 ? 1 : 0,
                  transition: 'opacity 0.3s ease',
                }} />
              ) : (
                <div style={{ flex: 1, height: 8, borderRadius: 4, background: `${TEXT}08` }}>
                  <div style={{
                    height: '100%', borderRadius: 4,
                    background: bar.color,
                    width: `${bar.pct * barProgress}%`,
                    transition: 'width 0.6s ease',
                  }} />
                </div>
              )}
              {!bar.milestone && (
                <span style={{ fontSize: 8, color: DIM, fontFamily: MONO, minWidth: 24 }}>
                  {Math.round(bar.pct * barProgress)}%
                </span>
              )}
            </div>
          );
        })}
      </div>
      {/* Today marker */}
      <div style={{
        marginTop: 12, display: 'flex', alignItems: 'center', gap: 6,
        opacity: progress > 0.5 ? 1 : 0, transition: 'opacity 0.4s ease',
      }}>
        <div style={{ width: 1, height: 16, background: '#EF4444', borderRight: '1px dashed #EF4444' }} />
        <span style={{ fontSize: 8, color: '#EF4444', fontWeight: 600 }}>TODAY</span>
      </div>
    </div>
  );
}
