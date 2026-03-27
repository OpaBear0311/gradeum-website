import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/react";
import { Footer } from "@/components/footer";
import { SiteNav } from "@/components/site-nav";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://gradeum.com"),
  title: {
    default: "Gradeum | The Practice of Engineering. Remembered.",
    template: "%s | Gradeum"
  },
  description:
    "Gradeum helps engineering firms find referenced knowledge, draft deliverables, and maintain a clean professional record while keeping documents on their own server.",
  openGraph: {
    title: "Gradeum",
    description:
      "Your firm's engineering knowledge. Working. Static marketing site for Gradeum Technologies LLC.",
    url: "https://gradeum.com",
    siteName: "Gradeum",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="relative min-h-screen bg-white">
          <SiteNav />
          <main>{children}</main>
          <Footer />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
