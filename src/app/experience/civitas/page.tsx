'use client';

import ExperienceDemo, { type DemoConfig } from '@/components/experience/ExperienceDemo';

const config: DemoConfig = {
  product: 'civitas',
  productName: 'CIVITAS',
  navItems: [
    { label: 'Portfolio' }, { label: 'Assets' }, { label: 'Inspections' },
    { label: 'Work Orders' }, { label: 'Capital Plan' }, { label: 'Documents' }, { label: 'Intelligence' },
  ],
  activeNav: 'Portfolio',
  statCards: [
    { label: 'Total Assets', value: '84' },
    { label: 'Critical', value: '3' },
    { label: 'Capital Exposure', value: '$8.6M' },
  ],
  contextItems: [
    { label: 'Marine Terminal', detail: '32 assets — 2 Critical', pct: 75 },
    { label: 'Harbor District', detail: '28 assets — 1 Critical', pct: 82 },
    { label: 'Waterfront Park', detail: '24 assets — 0 Critical', pct: 91 },
  ],
  chatQuestion: "What's our total exposure on assets rated Poor or Critical?",
  chatResponse: 'Your portfolio has 14 assets rated Poor or Critical with a combined estimated replacement value of $12.4M:\n\nCritical (Rating 1-2): 3 assets, $4.2M\n  Seawall Section 12 — $4.2M (RSL: 3-5 years)\n\nPoor (Rating 3-4): 11 assets, $8.2M\n  Pier 7 Fender System — $2.1M (RSL: 2-4 years)\n  Dock B Cathodic Protection — $890K (RSL: 1-3 years)\n  ...and 8 more',
  chatCitations: '[Source: Inspection Records 2024-2026, Capital Needs Assessment FY2026]',
  previewTitle: 'Capital Exposure Summary',
  previewRows: [
    { cells: ['Seawall Section 12', '$4.2M — RSL: 3-5 yr'], badge: { text: 'Critical', color: '#EF4444' } },
    { cells: ['Pier 7 Fenders', '$2.1M — RSL: 2-4 yr'], badge: { text: 'Poor', color: '#F97316' } },
    { cells: ['Dock B CP System', '$890K — RSL: 1-3 yr'], badge: { text: 'Poor', color: '#F97316' } },
    { cells: ['Pier 3 Deck', '$1.8M — RSL: 4-6 yr'], badge: { text: 'Poor', color: '#F97316' } },
    { cells: ['Boat Ramp A', '$420K — RSL: 3-5 yr'], badge: { text: 'Poor', color: '#F97316' } },
  ],
  fileAction: {
    title: '[Dropped: Pier_9_Inspection_Q1_2026.pdf]',
    fields: { Asset: 'Pier 9 Deck', Inspector: 'K. Patel', Findings: '4 elements rated, 1 condition change', Rating: '7 → 6 (Fair)' },
    confirm: 'Update Asset Record',
    result: 'Pier 9 condition updated. Rating history logged.',
  },
  ganttBars: [
    { label: 'Seawall Repair', pct: 90, color: '#EF4444' },
    { label: 'Fender Replace', pct: 45, color: '#F97316' },
    { label: 'CP Retrofit', pct: 20, color: '#F59E0B' },
    { label: 'Deck Rehab', pct: 10, color: '#3B82F6' },
    { label: 'FY2027 Start', pct: 0, color: '#C4882A', milestone: true },
    { label: 'Ramp Resurface', pct: 0, color: '#94A3B8' },
  ],
  screenshotAction: {
    title: '[ATLAS: Board briefing generated]',
    fields: { Sections: 'Executive Summary, Portfolio Health, Critical Findings, Capital Needs', Format: 'PDF — 6 pages', Meeting: 'April 8, 2026' },
    confirm: 'Export PDF',
    result: 'Board briefing exported. 6 pages, 4 charts.',
  },
  demoSubtext: 'Your demo key provides access to a sandboxed environment with sample infrastructure assets and inspection data.',
};

export default function ExperienceCivitas() {
  return <ExperienceDemo config={config} />;
}
