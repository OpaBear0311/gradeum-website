import type { Metadata } from "next";
import GradeumSimulation from "@/components/demo/GradeumSimulation";
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
    <>
      <div className="h-[calc(100vh-64px)]">
        <GradeumSimulation />
      </div>
      <div className="bg-navy-deep py-6 px-6 flex items-center justify-center gap-6">
        <span className="text-white/60 text-sm hidden sm:inline">
          Ready to get started?
        </span>
        <Button href="/firms/pricing" size="md">
          See Pricing
        </Button>
        <Button
          href={`mailto:${CONTACT_EMAIL}`}
          variant="secondary"
          size="md"
          className="border-white/20 text-white hover:border-white/40"
        >
          Request a Walkthrough
        </Button>
      </div>
    </>
  );
}
