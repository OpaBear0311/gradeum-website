import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import TrustStrip from "@/components/sections/TrustStrip";
import Card from "@/components/ui/Card";
import {
  INDUSTRY_HERO,
  INDUSTRY_PROBLEM,
  INDUSTRY_SECTORS,
  INDUSTRY_FEATURES,
  INDUSTRY_STEPS,
  TAGLINE,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: "For Industry | Gradeum",
  description:
    "Decades of engineering records \u2014 inspection reports, P&IDs, as-builts, and specifications \u2014 searchable in seconds. Gradeum indexes your files locally. Your data never leaves.",
  openGraph: {
    title: "Gradeum for Industry",
    description: "Decades of engineering records, searchable in seconds.",
    url: "https://gradeum.io/industry",
  },
};

export default function IndustryPage() {
  return (
    <>
      <Navbar audience="root" />
      <main id="main-content" className="pt-16">
        {/* Hero */}
        <Hero
          headline={INDUSTRY_HERO.headline}
          sub={INDUSTRY_HERO.sub}
          trustChips={[
            "Data never leaves your network",
            "Source attribution on every result",
            "No engineering judgment",
          ]}
        />

        {/* The Problem */}
        <section className="py-8 bg-warm-gray/30">
          <div className="max-w-2xl mx-auto px-6">
            <h2 className="text-2xl font-serif text-navy mb-6">
              Your institutional knowledge is buried.
            </h2>
            <div className="font-serif text-navy/70 text-lg leading-[1.9] space-y-5">
              {INDUSTRY_PROBLEM.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        </section>

        {/* Who This Is For */}
        <section className="py-8">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-2xl font-serif text-navy text-center mb-2">
              Built for the companies that can&rsquo;t afford to lose what they know.
            </h2>
            <p className="text-center text-xs text-navy/40 mb-8 italic">
              Representative industries. Not a client list.
            </p>
            <div className="grid md:grid-cols-2 gap-5">
              {INDUSTRY_SECTORS.map((s) => (
                <div
                  key={s.sector}
                  className="bg-white border border-warm-gray rounded-xl p-5"
                >
                  <h3 className="text-sm font-bold text-navy mb-1">
                    {s.sector}
                  </h3>
                  <p className="text-sm text-navy/50">{s.examples}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What You Get */}
        <section className="py-8 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-2xl font-serif text-navy text-center mb-8">
              What Gradeum does for you
            </h2>
            <div className="grid md:grid-cols-2 gap-5">
              {INDUSTRY_FEATURES.map((f) => (
                <Card key={f.title}>
                  <h3 className="text-base font-serif text-navy mb-2">
                    {f.title}
                  </h3>
                  <p className="text-navy/60 text-sm leading-relaxed">
                    {f.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-8 bg-paper">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-2xl font-serif text-navy text-center mb-8">
              How it works
            </h2>
            <div className="space-y-6">
              {INDUSTRY_STEPS.map((step) => (
                <div key={step.number} className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-navy text-white flex items-center justify-center text-sm font-bold">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-navy mb-1">
                      {step.title}
                    </h3>
                    <p className="text-navy/60 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-8 bg-warm-gray/30">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-serif text-navy mb-2">{TAGLINE}</h2>
            <p className="text-navy/60 text-sm">
              Try Gradeum free for 60 days. Your data. Your machine. Your
              control.
            </p>
          </div>
        </section>

        <TrustStrip />
      </main>
      <Footer />
    </>
  );
}
