import type { Metadata } from "next";
import PricingCard from "@/components/sections/PricingCard";
import Accordion from "@/components/ui/Accordion";
import {
  PRICING,
  FIRMS_FEATURES,
  FIRMS_FAQ,
} from "@/lib/constants";
import { faqSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Pricing \u2014 Gradeum",
  description: "$385/seat/month. Every feature. 60-day trial.",
  openGraph: {
    images: [{ url: "/og/pricing.svg", width: 1200, height: 630 }],
  },
};

export default function FirmsPricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(FIRMS_FAQ)) }}
      />
      <section className="pt-20 pb-10 md:pt-24 md:pb-12 bg-paper">
        <div className="max-w-3xl mx-auto px-6 md:px-10 text-center">
          <h1 className="text-4xl sm:text-5xl font-serif text-navy leading-tight mb-4">
            Pricing
          </h1>
          <p className="text-navy/60 text-lg mb-10">
            One price. Every feature. No surprises.
          </p>

          <PricingCard
            price={PRICING.firms.price}
            label={PRICING.firms.label}
            period="/seat/month"
            features={FIRMS_FEATURES}
            cta={{ label: "Contact Us", href: "/agencies/contact" }}
            highlight="60-day free trial"
          />

          <p className="mt-8 text-navy/50 text-sm max-w-md mx-auto">
            Every feature included. No tiers. No modules. No per-query charges.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-2xl mx-auto px-6 md:px-10">
          <h2 className="text-2xl font-serif text-navy mb-8 text-center">
            Frequently asked questions
          </h2>
          <Accordion items={FIRMS_FAQ} />
        </div>
      </section>
    </>
  );
}
