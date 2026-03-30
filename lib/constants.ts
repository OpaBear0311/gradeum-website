// lib/constants.ts — Single source of truth for all site copy

export const TAGLINE = "Your knowledge. Empowered.";

export const ROOT_HERO = {
  headline: "THE INFRASTRUCTURE OF OUR WORLD",
  sub: "Engineering firms that design it. Agencies that maintain it. Industry that builds it.",
};

export const AUDIENCE_CARDS = [
  {
    title: "For Firms",
    description:
      "The engineers who design it, inspect it, and put their seal on it. Ports. Bridges. Coastal structures. The infrastructure that holds.",
    href: "/firms",
    audience: "firms",
  },
  {
    title: "For Agencies",
    description:
      "Port authorities. DOTs. Municipalities. The organizations that own it, regulate it, and are responsible for keeping it standing.",
    href: "/agencies",
    audience: "agencies",
  },
  {
    title: "For Industry",
    description:
      "Refineries. Utilities. Operators. Developers. Decades of engineering records, inspection reports, and as-builts \u2014 searchable in seconds.",
    href: "/firms",
    audience: "industry",
  },
];

export const FIRMS_HERO = {
  headline: "Be an engineer again.",
  sub: "Stop searching. Start building.",
};

export const AGENCIES_HERO = {
  headline:
    "Every document your organization has ever produced \u2014 searchable in seconds.",
  sub: "Decades of engineering records. Instantly accessible. Your data never leaves.",
};

export const PRICING = {
  firms: { price: 385, label: "$385/seat/month", audience: "firms" as const },
  agencies: {
    price: 129,
    label: "$129/seat/month",
    audience: "agencies" as const,
  },
};

export const CONTACT_EMAIL = "info@gradeum.io";

export const SIGNUP_LIVE = false; // Flip when E&O bound

// Industries strip for root landing
export const INDUSTRIES = [
  "Ports & Marine",
  "Bridges & Highways",
  "Coastal Protection",
  "Water & Utilities",
  "Buildings & Structures",
];

// Firms navigation
export const FIRMS_NAV_LINKS = [
  { label: "Product", href: "/firms/product" },
  { label: "Pricing", href: "/firms/pricing" },
  { label: "About", href: "/about" },
  { label: "Docs", href: "/docs" },
];

// Agencies navigation
export const AGENCIES_NAV_LINKS = [
  { label: "Use Cases", href: "/agencies/use-cases" },
  { label: "Pricing", href: "/agencies/pricing" },
  { label: "Contact", href: "/agencies/contact" },
];

// Footer columns
export const FOOTER_LINKS = {
  product: [
    { label: "For Firms", href: "/firms" },
    { label: "For Agencies", href: "/agencies" },
    { label: "Demo", href: "/firms/demo" },
    { label: "Pricing", href: "/firms/pricing" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Partners", href: "/partners/login" },
  ],
  resources: [
    { label: "Documentation", href: "/docs" },
    { label: "Contact", href: "/agencies/contact" },
  ],
  legal: [
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
  ],
};

// Firms feature list for pricing page
export const FIRMS_FEATURES = [
  "Document Q&A with dual-model consensus",
  "Drawing intelligence with seal attribution",
  "PE review workflow and responsible charge log",
  "Time tracking with AFK detection",
  "Resource forecasting (12-week capacity)",
  "Proposal intelligence",
  "Document production engine",
  "Gradeum Assistant (on-premise, your data stays)",
  "Unlimited queries",
  "60-day free trial",
];

// Agencies feature list for pricing page
export const AGENCIES_FEATURES = [
  "Document Q&A with dual-model consensus",
  "Drawing intelligence",
  "Basic report generation (PDF + DOCX)",
  "Query history with search",
  "Admin panel (users, indexing, audit log)",
  "Gradeum Assistant (on-premise, your data stays)",
  "Source attribution (document, page, section, date)",
  "Unlimited queries",
];

// FAQ items (firms)
export const FIRMS_FAQ = [
  {
    question: "Does my data leave my network?",
    answer:
      "No. The Gradeum Assistant runs on your server and indexes documents locally. Only relevant document chunks are retrieved in response to a specific query. Your files never leave your building.",
  },
  {
    question: "Does Gradeum make engineering decisions?",
    answer:
      "Never. Gradeum retrieves information and assists with document production. All outputs must be reviewed by a licensed professional engineer. The PE review workflow is built into every output path.",
  },
  {
    question: "What is dual-model consensus?",
    answer:
      "Every engineering query is processed by two independent AI models (Claude and GPT-4o) in parallel. Their responses are compared and a confidence indicator is displayed. This increases confidence before PE review \u2014 it does not replace PE review.",
  },
  {
    question: "How long does implementation take?",
    answer:
      "Standard implementation is 5 days on-site. Your document corpus is indexed, engineers are trained, and you are operational by the following Monday.",
  },
  {
    question: "Can I try it before committing?",
    answer:
      "Yes. Every subscription starts with a 60-day free trial. Full platform access, no feature gating.",
  },
];

// FAQ items (agencies)
export const AGENCIES_FAQ = [
  {
    question: "What types of documents can Gradeum index?",
    answer:
      "PDFs (including scanned drawings via OCR), Word documents, specifications, reports, inspection records, correspondence, and engineering calculations. If it is in your file system, Gradeum can index it.",
  },
  {
    question: "Does our data leave our network?",
    answer:
      "No. The Gradeum Assistant runs on your server. Documents are indexed locally. Only relevant excerpts are retrieved in response to a specific query. Full data sovereignty.",
  },
  {
    question: "Do we need engineering staff to use it?",
    answer:
      "No. Gradeum for Agencies is designed for document retrieval, not engineering production. Any staff member with access can search your archive in plain language.",
  },
  {
    question: "What about documents from decades ago?",
    answer:
      "The Assistant processes scanned documents using OCR. Historical engineering records, hand-drawn plans, and legacy reports are all searchable once indexed. Every result includes the original date of record.",
  },
];

// Use case cards for agencies
export const AGENCY_USE_CASES = [
  {
    title: "Port Authorities",
    scenario:
      'A port engineer needs the original pile driving records for a wharf built in 1987. Instead of pulling boxes from storage, they search: "pile driving records Wharf 7 1987" and get the exact report, page, and section in seconds.',
    icon: "anchor",
  },
  {
    title: "Municipalities",
    scenario:
      "A city engineer is reviewing a stormwater permit application and needs to verify the drainage study from the original subdivision plat. One search returns the study with attributed source and date of record.",
    icon: "building",
  },
  {
    title: "State DOTs",
    scenario:
      "A bridge inspector needs the as-built drawings for a structure last rehabilitated in 2003. The drawings, specifications, and inspection history surface together with full attribution.",
    icon: "road",
  },
  {
    title: "US Coast Guard",
    scenario:
      "A facility inspector needs the structural assessment history for a waterfront facility. Every condition assessment, rating, and recommendation is retrievable from the archived record.",
    icon: "shield",
  },
  {
    title: "State Agencies",
    scenario:
      "A coastal zone management office needs to verify permit conditions from a 2011 authorization. The original permit, special conditions, and compliance correspondence are all searchable.",
    icon: "landmark",
  },
];
