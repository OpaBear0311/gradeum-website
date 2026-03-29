import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    template: "%s | Gradeum for Firms",
    default: "Gradeum for Firms",
  },
  description:
    "AI practice management for engineering, architecture, and surveying firms. Your knowledge. Empowered.",
};

export default function FirmsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar audience="firms" />
      <main id="main-content" className="pt-16">{children}</main>
      <Footer />
    </>
  );
}
