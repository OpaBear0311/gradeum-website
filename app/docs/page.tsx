import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DocsContent from "@/components/sections/DocsContent";

export const metadata: Metadata = {
  title: "Documentation \u2014 Gradeum",
  description:
    "Gradeum platform documentation, Agent installation guide, and API reference.",
};

export default function DocsPage() {
  return (
    <>
      <Navbar audience="firms" />
      <main id="main-content" className="pt-16 min-h-screen bg-white">
        <DocsContent />
      </main>
      <Footer />
    </>
  );
}
