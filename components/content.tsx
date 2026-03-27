import type { FaqItem, FeatureCard, StatItem, StepItem } from "@/components/types";

export const homeStats: StatItem[] = [
  { value: "4.2 hrs/week", label: "searching for documents" },
  { value: "40%", label: "of PE time spent on non-engineering tasks" },
  { value: "$380-750", label: "recovered billing per deliverable" }
];

export const coreFeatures: FeatureCard[] = [
  {
    title: "Find anything in your project history",
    description:
      "AI searches your firm’s indexed corpus and returns cited answers with direct source attribution."
  },
  {
    title: "Draft the deliverable",
    description:
      "From basis of design documents to condition assessments and technical memos, Gradeum drafts and your PE reviews."
  },
  {
    title: "Keep the record clean",
    description:
      "Every PE approval is logged, every revision is tracked, and responsible charge stays visible."
  }
];

export const trustItems = [
  "PE Review Required on Every Output",
  "Your Data Stays on Your Server",
  "Built by a Licensed PE",
  "Dual-Model AI Verification"
];

export const workflowSteps: StepItem[] = [
  {
    title: "Your documents stay on your server",
    description:
      "The Gradeum Agent indexes locally so project history remains inside your network and under your control."
  },
  {
    title: "Ask a question, get a cited answer",
    description:
      "The system retrieves directly from your indexed corpus and shows the source behind every response."
  },
  {
    title: "Draft, review, approve",
    description:
      "Deliverables move through a PE review step with a permanent audit trail and responsible charge logging."
  }
];

export const productFeatures: FeatureCard[] = [
  {
    title: "Standards Q&A",
    description:
      "Ask for code, specification, or internal standard references and receive source-linked responses grounded in your own library."
  },
  {
    title: "Document Drafting",
    description:
      "Generate first drafts for reports, memoranda, scopes, and specifications using firm language and prior deliverables."
  },
  {
    title: "QC Review",
    description:
      "Compare drafts against standards, past work, and internal checklists before they reach the engineer of record."
  },
  {
    title: "Drawing Q&A",
    description:
      "Search sheets, notes, and extracted project metadata to answer detail-oriented questions without manually digging."
  },
  {
    title: "PE Workflow",
    description:
      "Maintain review checkpoints, approvals, and revision visibility without turning professional judgment over to software."
  }
];

export const pricingFaqs: FaqItem[] = [
  {
    question: "What happens during the free trial?",
    answer:
      "You install Gradeum on your own machine, index a representative project folder, and evaluate search, drafting, and review workflows over 30 days."
  },
  {
    question: "Does trial data leave our environment?",
    answer: "No. The trial is designed around local indexing and local control of your firm’s working documents."
  },
  {
    question: "How is pricing finalized?",
    answer:
      "Final pricing depends on seat count, implementation scope, and the complexity of your corpus and workflow requirements."
  },
  {
    question: "Are implementation services required?",
    answer:
      "Implementation is recommended for most firms because it improves indexing quality, templates, and rollout speed, but remote onboarding is available for lighter deployments."
  },
  {
    question: "Do engineers still review output?",
    answer:
      "Always. Gradeum supports document production and traceability, but every output remains subject to licensed PE review before use."
  },
  {
    question: "Can Gradeum work with legacy project archives?",
    answer:
      "Yes, provided the source files are accessible for indexing. Gradeum is designed to unlock value from the project history firms already have."
  },
  {
    question: "Is there an enterprise deployment option?",
    answer:
      "Yes. Enterprise engagements can include broader seat counts, security reviews, deployment coordination, and custom workflow support."
  }
];

export const principles = [
  "Engineering decisions belong to the engineer.",
  "AI may assist reference work, but it must never replace responsible charge.",
  "Institutional knowledge should compound, not disappear into folders and inboxes.",
  "Security and traceability are features, not compliance afterthoughts."
];
