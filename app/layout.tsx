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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=DM+Sans:wght@400;500;600&family=DM+Serif+Display&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </head>
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
