// Gradeum Website v1.0
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CookieConsent from "@/components/ui/CookieConsent";
import Analytics from "@/components/layout/Analytics";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gradeum.io"),
  title: "Gradeum \u2014 AI for Engineering & Infrastructure",
  description:
    "AI-powered practice management for firms. Document retrieval for agencies. Your data never leaves.",
  openGraph: {
    images: [{ url: "/og/home.svg", width: 1200, height: 630 }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Gradeum Technologies, LLC",
  url: "https://gradeum.io",
  description:
    "AI-powered practice management for engineering firms and document retrieval for government agencies.",
  foundingDate: "2026",
  address: {
    "@type": "PostalAddress",
    addressCountry: "US",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
        <CookieConsent />
        <Analytics />
        <VercelAnalytics />
      </body>
    </html>
  );
}
