import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Terms of Service — Gradeum",
  description: "Gradeum Terms of Service.",
};

export default function TermsPage() {
  return (
    <>
      <Navbar audience="root" />
      <main id="main-content" className="pt-16">
        <section className="max-w-3xl mx-auto px-6 py-24">
          <h1 className="text-4xl font-serif text-navy mb-8">
            Terms of Service
          </h1>
          <div className="text-navy/60 leading-relaxed space-y-4">
            <p>
              The Gradeum Terms of Service are available at{" "}
              <a
                href="https://app.gradeum.io/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber underline"
              >
                app.gradeum.io/terms
              </a>
              .
            </p>
            <p>
              A copy will be provided during the signup process.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
