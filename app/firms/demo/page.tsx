import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import { CONTACT_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Demo \u2014 Gradeum",
  description: "Interactive walkthrough of the platform.",
  openGraph: {
    images: [{ url: "/og/firms.svg", width: 1200, height: 630 }],
  },
};

export default function DemoPage() {
  return (
    <div className="h-[calc(100vh-64px)] flex flex-col items-center justify-center bg-paper px-6">
      <div className="max-w-md text-center">
        <h1 className="text-3xl md:text-4xl font-serif text-navy mb-4">
          Interactive Demo
        </h1>
        <p className="text-navy/60 mb-8 leading-relaxed">
          The interactive demo will be available here. Contact us for a live
          walkthrough.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button href={`mailto:${CONTACT_EMAIL}`} size="lg">
            Request a Walkthrough
          </Button>
          <Button href="/firms/pricing" variant="secondary" size="lg">
            See Pricing
          </Button>
        </div>
      </div>
    </div>
  );
}
