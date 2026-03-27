import type { ReactNode } from "react";

export type NavItem = {
  href: string;
  label: string;
};

export type StatItem = {
  value: string;
  label: string;
};

export type FeatureCard = {
  title: string;
  description: string;
};

export type StepItem = {
  title: string;
  description: string;
};

export type FaqItem = {
  question: string;
  answer: ReactNode;
};
