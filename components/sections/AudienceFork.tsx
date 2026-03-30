"use client";

import Link from "next/link";
import { AUDIENCE_CARDS } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";

const icons: Record<string, React.ReactNode> = {
  firms: (
    <svg width="44" height="44" viewBox="0 0 48 48" fill="none" className="text-navy" aria-hidden="true">
      <rect x="8" y="18" width="32" height="22" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M16 18V12a8 8 0 0116 0v6" stroke="currentColor" strokeWidth="2" />
      <rect x="14" y="26" width="4" height="6" rx="1" fill="currentColor" opacity="0.3" />
      <rect x="22" y="26" width="4" height="6" rx="1" fill="currentColor" opacity="0.3" />
      <rect x="30" y="26" width="4" height="6" rx="1" fill="currentColor" opacity="0.3" />
    </svg>
  ),
  agencies: (
    <svg width="44" height="44" viewBox="0 0 48 48" fill="none" className="text-navy" aria-hidden="true">
      <rect x="6" y="14" width="36" height="26" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M6 22h36" stroke="currentColor" strokeWidth="2" />
      <rect x="12" y="26" width="10" height="3" rx="1" fill="currentColor" opacity="0.3" />
      <rect x="12" y="32" width="14" height="3" rx="1" fill="currentColor" opacity="0.3" />
      <circle cx="36" cy="14" r="6" fill="#1B3A5C" opacity="0.1" />
      <path d="M34 14l1.5 1.5L38 12" stroke="#1B3A5C" strokeWidth="1.5" />
    </svg>
  ),
  industry: (
    <svg width="44" height="44" viewBox="0 0 48 48" fill="none" className="text-navy" aria-hidden="true">
      <rect x="6" y="22" width="12" height="18" rx="1" stroke="currentColor" strokeWidth="2" />
      <rect x="18" y="16" width="12" height="24" rx="1" stroke="currentColor" strokeWidth="2" />
      <rect x="30" y="10" width="12" height="30" rx="1" stroke="currentColor" strokeWidth="2" />
      <path d="M10 28h4M10 33h4" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      <path d="M22 22h4M22 27h4M22 32h4" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      <circle cx="36" cy="18" r="3" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
    </svg>
  ),
};

export default function AudienceFork() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-8">
      <h2 className="sr-only">Choose your audience</h2>
      <div className="grid grid-cols-1 gap-5 max-w-2xl mx-auto">
        {AUDIENCE_CARDS.map((card) => (
          <Link
            key={card.href + card.audience}
            href={card.href}
            onClick={() => trackEvent("audience_toggle", { to: card.audience })}
            className="group bg-white border border-warm-gray rounded-2xl p-7 flex flex-col items-start gap-3 transition-all hover:shadow-lg hover:-translate-y-1"
          >
            {icons[card.audience]}
            <h3 className="text-xl font-serif text-navy">{card.title}</h3>
            <p className="text-navy/60 leading-relaxed text-sm">{card.description}</p>
            <span className="text-navy/50 font-medium text-sm mt-auto group-hover:translate-x-1 transition-transform">
              Learn more &rarr;
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
