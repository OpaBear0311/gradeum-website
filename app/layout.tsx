import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://gradeum.io"),
  title: "Gradeum — AI for the Infrastructure of Our World",
  description:
    "AI for the Infrastructure of Our World. Gradeum-Heavy for professional engineering firms. Gradeum-Lite for infrastructure owners.",
  openGraph: {
    title: "Gradeum — AI for the Infrastructure of Our World",
    description:
      "AI for the Infrastructure of Our World. Gradeum-Heavy for professional engineering firms. Gradeum-Lite for infrastructure owners.",
    url: "https://gradeum.io",
    siteName: "Gradeum",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
