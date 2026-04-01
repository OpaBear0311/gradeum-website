import type { Metadata } from "next";
import { DM_Serif_Display, DM_Sans } from "next/font/google";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import "./globals.css";

const dmSerifDisplay = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-serif",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gradeum.io"),
  title: "Gradeum \u2014 AI for the Infrastructure of Our World",
  description:
    "Auditable AI for professional engineering and asset management for critical infrastructure owners.",
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
    "Auditable AI for professional engineering and asset management for critical infrastructure owners.",
  foundingDate: "2026",
  address: { "@type": "PostalAddress", addressCountry: "US" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${dmSerifDisplay.variable} ${dmSans.variable} antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
        <VercelAnalytics />
      </body>
    </html>
  );
}
