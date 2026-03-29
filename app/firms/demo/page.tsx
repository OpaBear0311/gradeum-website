import type { Metadata } from "next";
import GradeumSimulation from "@/components/demo/GradeumSimulation";
import Link from "next/link";
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
      <div className="bg-navy-deep py-5 px-6 flex items-center justify-center gap-6">
        <span className="text-white/60 text-sm hidden sm:inline">
          Ready to learn more?
        </span>
        <Link
          href="/firms/pricing"
          className="px-4 py-1.5 text-sm font-medium rounded-lg border border-white/20 text-white/80 hover:border-white/40 hover:text-white transition-colors"
        >
          See Pricing
        </Link>
        <Link
          href={`mailto:${CONTACT_EMAIL}`}
          className="px-4 py-1.5 text-sm font-medium rounded-lg border border-white/20 text-white/80 hover:border-white/40 hover:text-white transition-colors"
        >
          Request a Walkthrough
        </Link>
      </div>
    </>
  );
}
