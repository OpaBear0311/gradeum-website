import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CONTACT_EMAIL } from "@/lib/constants";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Partner Portal — Gradeum",
  description: "Sign in to the Gradeum Partner Portal.",
};

export default function PartnerLoginPage() {
  return (
    <>
      <Navbar audience="root" />
      <main id="main-content" className="pt-16 min-h-screen flex items-center justify-center bg-paper px-6">
        <div className="bg-white border border-warm-gray rounded-2xl p-10 max-w-md w-full">
          <div className="text-center mb-8">
            <span className="text-sm font-bold tracking-[0.2em] text-navy">
              GRADEUM
            </span>
            <h1 className="text-2xl font-serif text-navy mt-4">
              Partner Portal
            </h1>
          </div>

          <form action="#" className="space-y-5">
            <div>
              <label
                htmlFor="partner-email"
                className="block text-sm font-medium text-navy mb-1.5"
              >
                Email
              </label>
              <input
                id="partner-email"
                type="email"
                disabled
                className="w-full border border-warm-gray rounded-lg px-4 py-2.5 text-sm text-navy/40 bg-warm-gray/30 cursor-not-allowed"
                placeholder="you@organization.gov"
              />
            </div>
            <div>
              <label
                htmlFor="partner-password"
                className="block text-sm font-medium text-navy mb-1.5"
              >
                Password
              </label>
              <input
                id="partner-password"
                type="password"
                disabled
                className="w-full border border-warm-gray rounded-lg px-4 py-2.5 text-sm text-navy/40 bg-warm-gray/30 cursor-not-allowed"
                placeholder="••••••••"
              />
            </div>
            <button
              type="button"
              disabled
              className="w-full py-3 bg-navy/20 text-navy/40 font-medium rounded-lg cursor-not-allowed"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 p-4 bg-navy/5 border border-navy/10 rounded-lg">
            <p className="text-sm text-navy/60 text-center">
              Partner portal launching soon. Contact{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-navy underline"
              >
                {CONTACT_EMAIL}
              </a>{" "}
              for partner inquiries.
            </p>
          </div>

          <p className="text-center text-xs text-navy/40 mt-6">
            Not a partner?{" "}
            <Link href="/agencies/contact" className="text-navy/60 underline">
              Learn about the Gradeum Partner Program
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
