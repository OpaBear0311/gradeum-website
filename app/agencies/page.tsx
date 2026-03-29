import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import StorySection from "@/components/sections/StorySection";
import AgencyHowItWorks from "@/components/sections/AgencyHowItWorks";
import TrustStrip from "@/components/sections/TrustStrip";
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

export default function AgenciesHome() {
  return (
    <>
      <Hero
        headline={AGENCIES_HERO.headline}
        sub={AGENCIES_HERO.sub}
        primaryCTA={{ label: "Get Started", href: "/agencies/pricing" }}
        secondaryCTA={{ label: "See Use Cases", href: "/agencies/use-cases" }}
        trustChips={[
          "Data never leaves your network",
          "Source attribution on every result",
          "No engineering judgment",
        ]}
      />
      <StorySection />
      <AgencyHowItWorks />
      <TrustStrip statements={agencyTrust} />
      <section className="py-20 text-center px-6">
        <h2 className="text-3xl md:text-4xl font-serif text-navy mb-6">
          Your knowledge. Empowered.
        </h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button href="/agencies/pricing" size="lg">
            Get Started
          </Button>
          <Button href="/agencies/contact" variant="secondary" size="lg">
            Contact Us
          </Button>
        </div>
      </section>
    </>
  );
}
