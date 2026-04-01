import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gradeum — AI for the Infrastructure of Our World',
  description: 'Document intelligence, institutional memory, and practice management for professional engineering firms. Launching May 4, 2026.',
  keywords: 'engineering, AI, document intelligence, institutional memory, infrastructure, coastal engineering, marine engineering',
  openGraph: {
    title: 'Gradeum — AI for the Infrastructure of Our World',
    description: 'Document intelligence, institutional memory, and practice management for professional engineering firms.',
    url: 'https://gradeum.io',
    siteName: 'Gradeum',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gradeum — AI for the Infrastructure of Our World',
    description: 'What was built endures. What was learned persists. What was protected survives.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta name="theme-color" content="#1B3A5C" />
      </head>
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  )
}
