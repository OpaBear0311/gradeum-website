import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import StorySection from "@/components/sections/StorySection";
import AgencyHowItWorks from "@/components/sections/AgencyHowItWorks";
import TrustStrip from "@/components/sections/TrustStrip";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { AGENCIES_HERO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Gradeum for Agencies \u2014 Your archive, accessible",
  description:
    "Document retrieval for government organizations. Files never leave your network.",
  openGraph: {
    images: [{ url: "/og/agencies.svg", width: 1200, height: 630 }],
  },
};

const agencyTrust = [
  "Your documents never leave your server.",
  "Every result traced to source, page, and date.",
  "Gradeum does not exercise engineering judgment.",
];

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
    title: "AI-Validated Results",
    description:
      "Every response is validated for accuracy before being shown to you. Confidence is scored. Disagreements are flagged.",
  },
  {
    title: "Report Generation",
    description:
      "Compile any search result into a downloadable PDF or Word document with full source attribution and disclaimer.",
  },
];

export default function AgenciesHome() {
  return (
    <>
      <Hero
        headline={AGENCIES_HERO.headline}
        sub={AGENCIES_HERO.sub}
        trustChips={[
          "Data never leaves your network",
          "Source attribution on every result",
          "No engineering judgment",
        ]}
      />
      <StorySection />

      {/* What You Get */}
      <section className="bg-warm-gray/30 py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-serif text-navy text-center mb-10">
            What You Get
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
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

      <AgencyHowItWorks />
      <TrustStrip statements={agencyTrust} />
      <section className="py-12 text-center px-6">
        <h2 className="text-3xl md:text-4xl font-serif text-navy mb-4">
          Your knowledge. Empowered.
        </h2>
        <Button href="/agencies/contact" variant="secondary" size="lg">
          Contact Us
        </Button>
      </section>
    </>
  );
}
