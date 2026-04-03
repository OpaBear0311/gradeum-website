'use client';

import ExperienceDemo, { type DemoConfig } from '@/components/experience/ExperienceDemo';

const config: DemoConfig = {
  product: 'praxis',
  productName: 'PRAXIS',
  navItems: [
    { label: 'Dashboard' }, { label: 'Projects' }, { label: 'Tasks' },
    { label: 'Proposals' }, { label: 'Invoicing' }, { label: 'Documents' }, { label: 'Schedule' },
  ],
  activeNav: 'Projects',
  statCards: [],
  contextItems: [
    { label: 'Harbor Expansion Phase II', detail: 'Design — Port Authority', pct: 65 },
    { label: 'Coastal Resilience Program', detail: 'Permitting — City of Bayshore', pct: 40 },
    { label: 'Wharf Rehabilitation', detail: 'Construction Support — Maritime Terminal', pct: 85 },
  ],
  chatQuestion: 'What permits do we need for the harbor expansion project?',
  chatResponse: 'Based on the Harbor Expansion Phase II project scope and location, the following permits are required:\n\n1. USACE Section 10/404 Permit — navigable waters and wetland fill\n2. State Coastal Development Permit — coastal zone management\n3. NOAA Essential Fish Habitat Consultation — marine habitat impact\n4. City Grading Permit — landside construction',
  chatCitations: '[Source: Project Scope Document Rev.3, USACE Regulatory Guidance Letter 08-03]',
  previewTitle: 'Permit Matrix — Harbor Expansion',
  previewRows: [
    { cells: ['USACE Section 10/404', 'Navigable waters'], badge: { text: 'In Preparation', color: '#3B82F6' } },
    { cells: ['State Coastal Dev', 'Coastal zone mgmt'], badge: { text: 'Not Started', color: '#94A3B8' } },
    { cells: ['NOAA EFH', 'Marine habitat'], badge: { text: 'Consultation', color: '#8B5CF6' } },
    { cells: ['City Grading', 'Landside construction'], badge: { text: 'Not Started', color: '#94A3B8' } },
  ],
  fileAction: {
    title: '[Dropped: Storm_Surge_Analysis_Rev2.pdf]',
    fields: { Type: 'Technical Report', Project: 'Harbor Expansion Phase II', Discipline: 'Coastal Engineering' },
    confirm: 'Confirm',
    result: 'Filed to Harbor Expansion / Reports',
  },
  ganttBars: [
    { label: 'Site Survey', pct: 100, color: '#4ADE80' },
    { label: 'Geotech', pct: 100, color: '#4ADE80' },
    { label: 'Wave Modeling', pct: 80, color: '#3B82F6' },
    { label: 'Structural Design', pct: 70, color: '#3B82F6' },
    { label: 'BOD Rev.3', pct: 45, color: '#C4882A' },
    { label: '60% Submittal', pct: 0, color: '#C4882A', milestone: true },
    { label: 'Permit Package', pct: 10, color: '#8B5CF6' },
    { label: 'Final Design', pct: 0, color: '#94A3B8' },
  ],
  screenshotAction: {
    title: '[Pasted screenshot — email from Port Authority]',
    fields: { From: 'Port Authority — J. Morrison', Subject: 'Revised construction window', 'Key Detail': 'Construction start moved to June 2027' },
    confirm: 'Update Schedule',
    result: 'Schedule updated. Email logged to correspondence.',
  },
  demoSubtext: 'Your demo key provides access to a sandboxed environment with sample engineering projects and documents.',
};

export default function ExperiencePraxis() {
  return <ExperienceDemo config={config} />;
}
