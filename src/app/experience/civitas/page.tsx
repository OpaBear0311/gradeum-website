'use client';

import ExperiencePage from '@/components/ExperiencePage';

const SECTIONS = [
  {
    heading: "THE INFRASTRUCTURE\nOF COMMUNITY",
    body: [
      'Every pier. Every seawall. Every pipeline. Every asset your organization is responsible for.',
      'Monitored. Assessed. Planned.',
    ],
  },
  {
    heading: 'IT STARTS WITH CUSTOS',
    body: [
      'A lightweight service on your organization\'s network. It reads inspection reports, engineering assessments, condition surveys, and maintenance records.',
      'Your asset data stays in your building.',
    ],
  },
  {
    heading: 'MEET ATLAS',
    subheading: 'Your organization\'s AI infrastructure assistant.',
    body: [
      'Ask about an asset\'s condition history. ATLAS retrieves every inspection finding, every rating change, every work order — and shows you the trend.',
      'ATLAS never recommends maintenance actions. That\'s your engineer\'s call.',
    ],
  },
  {
    heading: 'THE COMMAND CENTER',
    subheading: 'Portfolio health at a glance.',
    body: [
      'Condition trends across every facility. Capital exposure quantified and prioritized.',
      'Left: Your assets, inspections, and work orders.',
      'Center: ATLAS — always present, always ready.',
      'Right: Condition charts. Deterioration forecasts. Board briefings.',
    ],
  },
  {
    heading: 'FROM DATA\nTO DECISION',
    body: [
      '"What\'s our total exposure on assets rated Critical?"',
      'ATLAS answers in seconds — with the data, the chart, and a board-ready briefing you can export.',
      'Your board sees a one-page summary. Behind it: every inspection, every rating, every dollar quantified.',
    ],
  },
];

export default function ExperienceCivitas() {
  return (
    <ExperiencePage
      product="civitas"
      sections={SECTIONS}
      demoSubtext="Your demo key provides access to a sandboxed environment with sample infrastructure assets and inspection data."
    />
  );
}
