import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    template: "%s | Gradeum for Agencies",
    default: "Gradeum for Agencies",
  },
  description:
    "Document retrieval for port authorities, municipalities, DOTs, and government organizations. Your knowledge. Empowered.",
};

export default function AgenciesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar audience="agencies" />
      <main id="main-content" className="pt-16">{children}</main>
      <Footer />
    </>
  );
}
