import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import ProblemSection from "@/components/sections/ProblemSection";
import PillarsSection from "@/components/sections/PillarsSection";
import TrustStrip from "@/components/sections/TrustStrip";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import Button from "@/components/ui/Button";
import { FIRMS_HERO, TAGLINE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Gradeum \u2014 Be an engineer again",
  description:
    "AI practice management: document Q&A, PE workflow, time tracking, resource planning.",
  openGraph: {
    images: [{ url: "/og/firms.svg", width: 1200, height: 630 }],
  },
};

export default function FirmsHome() {
  return (
    <>
      <Hero
        headline={FIRMS_HERO.headline}
        sub={FIRMS_HERO.sub}
        primaryCTA={{ label: "Get Started", href: "/firms/pricing" }}
        secondaryCTA={{ label: "See the Demo", href: "/firms/demo" }}
        trustChips={[
          "Data never leaves your server",
          "PE review required on every output",
          "60-day free trial",
        ]}
      />
      <ProblemSection />
      <PillarsSection />
      <TrustStrip />
      <HowItWorksSection />

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-warm-gray/30">
        <div className="max-w-3xl mx-auto px-6 md:px-10 text-center">
          <h2 className="text-3xl md:text-4xl font-serif text-navy mb-4">
            {TAGLINE}
          </h2>
          <p className="text-navy/60 mb-10 max-w-xl mx-auto">
            Try Gradeum free for 60 days. Your data. Your machine. Your control.
          </p>
          <Button href="/firms/pricing" size="lg">
            Get Started
          </Button>
        </div>
      </section>
    </>
  );
}
