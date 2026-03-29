import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import SecuritySection from "@/components/sections/SecuritySection";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "How It Works \u2014 Gradeum for Agencies",
  description:
    "Install locally, index your archive, search in plain language. Data sovereignty guaranteed.",
  openGraph: {
    images: [{ url: "/og/agencies-product.svg", width: 1200, height: 630 }],
  },
};

const features = [
  {
    title: "Plain Language Search",
    description:
      "Search your entire archive in everyday language. No keywords, no boolean operators, no folder diving.",
  },
  {
    title: "Source Attribution",
    description:
      "Every result shows the original document name, page number, section, date of record, and relevance score. Nothing is unattributed.",
  },
  {
    title: "Dual-Model Validation",
    description:
      "Two independent AI models process every query. Agreement is scored. Disagreements are flagged. Confidence, not guesswork.",
  },
  {
    title: "Report Generation",
    description:
      "Compile any search result into a downloadable PDF or Word document with full source attribution and disclaimer.",
  },
];

const flowSteps = [
  "Your Server",
  "Gradeum Agent",
  "Search Query",
  "Document Chunks",
  "AI Answer",
  "Attributed Result",
];

export default function AgenciesProductPage() {
  return (
    <>
      <Hero
        headline="How Gradeum Works"
        sub="Install locally. Index everything. Search in plain language. Your data stays yours."
        primaryCTA={{ label: "Get Started", href: "/agencies/pricing" }}
      />

      {/* Architecture Overview */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-serif text-navy text-center mb-12">
          Architecture Overview
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-0 mb-14">
          {flowSteps.map((step, i) => (
            <div key={step} className="flex items-center">
              <div className="px-4 py-3 rounded-lg border border-navy/15 bg-white text-navy text-sm text-center min-w-[120px]">
                {step}
              </div>
              {i < flowSteps.length - 1 && (
                <svg
                  className="w-6 h-4 text-navy/30 hidden md:block"
                  viewBox="0 0 24 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M0 8h20M16 4l4 4-4 4" />
                </svg>
              )}
            </div>
          ))}
        </div>

        <div className="max-w-2xl mx-auto space-y-4 text-sm text-navy/60 leading-relaxed">
          <p>The Gradeum Agent runs on your server. It never transmits your documents.</p>
          <p>Only relevant excerpts (500–1,500 words) are used to generate an answer.</p>
          <p>Two independent AI models validate every response.</p>
          <p>The Agent indexes PDFs, scanned drawings (via OCR), Word documents, and specifications.</p>
        </div>
      </section>

      {/* What You Get */}
      <section className="bg-warm-gray/30 py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-serif text-navy text-center mb-14">
            What You Get
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((f) => (
              <Card key={f.title}>
                <h3 className="text-lg font-serif text-navy mb-2">{f.title}</h3>
                <p className="text-navy/60 text-sm leading-relaxed">
                  {f.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <SecuritySection variant="agencies" />

      <section className="py-20 text-center px-6">
        <Button href="/agencies/pricing" size="lg">
          Get Started
        </Button>
      </section>
    </>
  );
}
