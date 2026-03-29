import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import { TAGLINE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About \u2014 Gradeum",
  description: "Built by a licensed PE. Time returned to judgment.",
  openGraph: {
    images: [{ url: "/og/about.svg", width: 1200, height: 630 }],
  },
};

const principles = [
  {
    title: "The engineer decides.",
    description:
      "AI retrieves, drafts, and organizes. The PE reviews, approves, and takes responsibility. This boundary is non-negotiable.",
  },
  {
    title: "Your data is yours.",
    description:
      "The Gradeum Agent runs on your server. Documents are indexed locally. Nothing leaves your network.",
  },
  {
    title: "The record is immutable.",
    description:
      "Every PE approval generates a timestamped, append-only log entry. No edits. No deletions. Exportable on demand.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar audience="firms" />
      <main id="main-content" className="pt-16">
        {/* Hero */}
        <section className="pt-24 pb-16 md:pt-32 md:pb-20 bg-paper">
          <div className="max-w-3xl mx-auto px-6 md:px-10 text-center">
            <h1 className="text-4xl sm:text-5xl font-serif text-navy leading-tight mb-6">
              Built by a licensed professional engineer.
            </h1>
            <p className="text-lg text-navy/60 max-w-2xl mx-auto leading-relaxed">
              Gradeum was built by someone who carries the weight of responsible
              charge every day. Not by a software company looking at engineering
              from the outside.
            </p>
          </div>
        </section>

        {/* The Story */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-2xl mx-auto px-6 md:px-10">
            <h2 className="text-2xl font-serif text-navy mb-8">The Story</h2>
            <div className="space-y-6 text-navy/70 leading-relaxed">
              <p>
                The engineer who built Gradeum spent years doing what every PE
                does &mdash; searching for references that should have been at
                their fingertips, rebuilding documents they had built before, and
                spending more time on administrative tasks than on engineering
                judgment.
              </p>
              <p>
                Gradeum exists because one engineer decided to build the tool the
                profession needed. Not a general-purpose AI assistant. Not a
                chatbot. A purpose-built platform that understands engineering
                workflows, respects the PE&rsquo;s authority, and keeps the data
                where it belongs &mdash; on the firm&rsquo;s own server.
              </p>
            </div>
          </div>
        </section>

        {/* Principles */}
        <section className="py-16 md:py-24 bg-paper">
          <div className="max-w-2xl mx-auto px-6 md:px-10">
            <h2 className="text-2xl font-serif text-navy mb-10">Principles</h2>
            <div className="space-y-10">
              {principles.map((principle) => (
                <div key={principle.title}>
                  <h3 className="text-lg font-serif text-navy mb-2">
                    {principle.title}
                  </h3>
                  <p className="text-navy/60 leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 md:py-28 bg-warm-gray/30">
          <div className="max-w-3xl mx-auto px-6 md:px-10 text-center">
            <h2 className="text-3xl md:text-4xl font-serif text-navy mb-6">
              {TAGLINE}
            </h2>
            <Button href="/firms/pricing" size="lg">
              Get Started
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
