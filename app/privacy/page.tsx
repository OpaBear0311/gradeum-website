import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy — Gradeum",
  description: "Gradeum Privacy Policy.",
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar audience="root" />
      <main id="main-content" className="pt-16">
        <section className="max-w-3xl mx-auto px-6 py-12">
          <h1 className="text-4xl font-serif text-navy mb-8">
            Privacy Policy
          </h1>
          <div className="text-navy/60 leading-relaxed space-y-4">
            <p>
              The Gradeum Privacy Policy is available at{" "}
              <a
                href="https://app.gradeum.io/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber underline"
              >
                app.gradeum.io/privacy
              </a>
              .
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
