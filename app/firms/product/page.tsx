import type { Metadata } from "next";
import ModuleShowcase from "@/components/sections/ModuleShowcase";
import SecuritySection from "@/components/sections/SecuritySection";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Product \u2014 Gradeum",
  description:
    "Program mgmt, resource planning, PE review, time tracking. Built for licensed firms.",
  openGraph: {
    images: [{ url: "/og/firms-product.svg", width: 1200, height: 630 }],
  },
};

export default function FirmsProductPage() {
  return (
    <>
      {/* Short hero */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-20 bg-paper">
        <div className="max-w-3xl mx-auto px-6 md:px-10 text-center">
          <h1 className="text-4xl sm:text-5xl font-serif text-navy leading-tight mb-6">
            Everything your firm does. One platform.
          </h1>
          <p className="text-lg text-navy/60 max-w-2xl mx-auto leading-relaxed">
            Document intelligence, program management, and PE governance —
            built for licensed professionals.
          </p>
        </div>
      </section>

      <ModuleShowcase />
      <SecuritySection />

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-paper">
        <div className="max-w-3xl mx-auto px-6 md:px-10 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button href="/firms/pricing" size="lg">
            Get Started
          </Button>
          <Button href="/firms/demo" variant="secondary" size="lg">
            See the Demo
          </Button>
        </div>
      </section>
    </>
  );
}
