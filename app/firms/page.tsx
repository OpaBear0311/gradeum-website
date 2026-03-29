import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import ProblemSection from "@/components/sections/ProblemSection";
import PillarsSection from "@/components/sections/PillarsSection";
import TrustStrip from "@/components/sections/TrustStrip";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
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
      <section className="py-12 md:py-16 bg-warm-gray/30">
        <div className="max-w-3xl mx-auto px-6 md:px-10 text-center">
          <h2 className="text-3xl md:text-4xl font-serif text-navy mb-3">
            {TAGLINE}
          </h2>
          <p className="text-navy/60 text-sm">
            Try Gradeum free for 60 days. Your data. Your machine. Your control.
          </p>
        </div>
      </section>
    </>
  );
}
