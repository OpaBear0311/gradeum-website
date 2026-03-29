import Link from "next/link";

interface HeroProps {
  headline: string;
  sub: string;
  primaryCTA: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
  trustChips?: string[];
  bgImage?: string;
}

export default function Hero({
  headline,
  sub,
  primaryCTA,
  secondaryCTA,
  trustChips,
  bgImage,
}: HeroProps) {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background with paper overlay */}
      {bgImage && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
      )}
      <div className="absolute inset-0 bg-paper/85" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center pt-20 pb-16">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-navy leading-tight mb-6">
          {headline}
        </h1>
        <p className="text-lg md:text-xl text-navy/60 mb-10 max-w-2xl mx-auto leading-relaxed">
          {sub}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={primaryCTA.href}
            className="px-8 py-3 bg-amber text-white font-medium rounded-lg hover:bg-amber-dark transition-colors text-base"
          >
            {primaryCTA.label}
          </Link>
          {secondaryCTA && (
            <Link
              href={secondaryCTA.href}
              className="px-8 py-3 border border-navy/20 text-navy font-medium rounded-lg hover:border-navy/40 transition-colors text-base"
            >
              {secondaryCTA.label}
            </Link>
          )}
        </div>
        {trustChips && trustChips.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {trustChips.map((chip) => (
              <span
                key={chip}
                className="text-xs text-navy/50 bg-navy/5 px-3 py-1 rounded-full"
              >
                {chip}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
