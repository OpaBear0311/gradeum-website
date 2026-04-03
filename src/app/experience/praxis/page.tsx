'use client';

import ExperiencePage from '@/components/ExperiencePage';

const SECTIONS = [
  {
    heading: "YOUR FIRM'S KNOWLEDGE\nORGANIZED",
    body: [
      'Every drawing. Every report. Every calculation. Every specification your firm has ever produced.',
      'Indexed. Searchable. Cited.',
    ],
  },
  {
    heading: 'IT STARTS WITH CUSTOS',
    body: [
      'A lightweight service that runs on your firm\'s server. It reads your documents — PDFs, drawings, specifications, reports.',
      'It indexes everything locally. Nothing leaves your network.',
      'Your data stays yours.',
    ],
  },
  {
    heading: 'MEET ATLAS',
    subheading: 'Your firm\'s AI engineering assistant.',
    body: [
      'Ask a question. ATLAS searches your indexed documents, retrieves the relevant sections, and generates a cited answer.',
      'Every response includes the source document, page number, and applicable code reference.',
      'ATLAS never makes engineering decisions. That\'s your job.',
    ],
  },
  {
    heading: 'THE COMMAND CENTER',
    subheading: 'Three panels. One workspace.',
    body: [
      'Left: Your projects, tasks, and schedule.',
      'Center: ATLAS — always present, always ready.',
      'Right: Live preview of what ATLAS produces.',
      'Documents. Gantt charts. Permit matrices. Basis of design outlines. Calculation summaries.',
      'Generated in seconds. Reviewed by you.',
    ],
  },
  {
    heading: 'FROM QUESTION\nTO DELIVERABLE',
    body: [
      'Ask ATLAS to draft a basis of design. ATLAS pulls governing codes, design criteria, and project data from your firm\'s indexed documents.',
      'Review. Edit. Approve.',
      'The PE responsible charge log records every approval with an immutable timestamp.',
      'Your signature. Your judgment. ATLAS did the research.',
    ],
  },
];

export default function ExperiencePraxis() {
  return (
    <ExperiencePage
      product="praxis"
      sections={SECTIONS}
      demoSubtext="Your demo key provides access to a sandboxed environment with sample engineering projects and documents."
    />
  );
}
