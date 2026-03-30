import type { Metadata } from "next";
import PricingCard from "@/components/sections/PricingCard";
import Accordion from "@/components/ui/Accordion";
import { PRICING, AGENCIES_FEATURES, AGENCIES_FAQ } from "@/lib/constants";
import { faqSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Pricing \u2014 Gradeum for Agencies",
  description:
    "$129/seat/month. Document retrieval. Files never leave.",
  openGraph: {
    images: [{ url: "/og/agencies-pricing.svg", width: 1200, height: 630 }],
  },
};

export default function AgenciesPricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(AGENCIES_FAQ)) }}
      />
      <section className="py-12 px-6">
        <div className="max-w-md mx-auto text-center mb-4">
          <h1 className="text-4xl font-serif text-navy mb-3">Pricing</h1>
        </div>

        <PricingCard
          price={PRICING.agencies.price}
          label={PRICING.agencies.label}
          period="/seat/month"
          features={AGENCIES_FEATURES}
          cta={{ label: "Contact Us", href: "/agencies/contact" }}
        />

        <p className="text-center text-navy/50 text-sm mt-6 max-w-md mx-auto">
          Document retrieval. Source attribution. Data sovereignty. No engineering judgment.
        </p>
      </section>

      <section className="max-w-2xl mx-auto px-6 pb-10">
        <h2 className="text-2xl font-serif text-navy text-center mb-8">
          Frequently Asked Questions
        </h2>
        <Accordion items={AGENCIES_FAQ} />
      </section>
    </>
  );
}
