"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

const audiences = [
  {
    title: "For Firms",
    description:
      "AI practice management for the firms that design ports, bridges, coastal structures, and critical infrastructure.",
    href: "/firms",
    audience: "firms",
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="text-navy" aria-hidden="true">
        <rect x="8" y="18" width="32" height="22" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M16 18V12a8 8 0 0116 0v6" stroke="currentColor" strokeWidth="2" />
        <rect x="14" y="26" width="4" height="6" rx="1" fill="currentColor" opacity="0.3" />
        <rect x="22" y="26" width="4" height="6" rx="1" fill="currentColor" opacity="0.3" />
        <rect x="30" y="26" width="4" height="6" rx="1" fill="currentColor" opacity="0.3" />
      </svg>
    ),
  },
  {
    title: "For Agencies",
    description:
      "Document retrieval for port authorities, municipalities, DOTs, and government organizations.",
    href: "/agencies",
    audience: "agencies",
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="text-navy" aria-hidden="true">
        <rect x="6" y="14" width="36" height="26" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M6 22h36" stroke="currentColor" strokeWidth="2" />
        <rect x="12" y="26" width="10" height="3" rx="1" fill="currentColor" opacity="0.3" />
        <rect x="12" y="32" width="14" height="3" rx="1" fill="currentColor" opacity="0.3" />
        <circle cx="36" cy="14" r="6" fill="#1B3A5C" opacity="0.1" />
        <path d="M34 14l1.5 1.5L38 12" stroke="#1B3A5C" strokeWidth="1.5" />
      </svg>
    ),
  },
];

export default function AudienceFork() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-10">
      <h2 className="sr-only">Choose your audience</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {audiences.map((aud) => (
          <Link
            key={aud.href}
            href={aud.href}
            onClick={() =>
              trackEvent("audience_toggle", { to: aud.audience })
            }
            className="group bg-white border border-warm-gray rounded-2xl p-8 flex flex-col items-start gap-4 transition-all hover:shadow-lg hover:-translate-y-1"
          >
            {aud.icon}
            <h3 className="text-2xl font-serif text-navy">{aud.title}</h3>
            <p className="text-navy/60 leading-relaxed text-sm">{aud.description}</p>
            <span className="text-navy/50 font-medium text-sm mt-auto group-hover:translate-x-1 transition-transform">
              Learn more &rarr;
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
