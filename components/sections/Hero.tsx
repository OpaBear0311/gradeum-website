interface HeroProps {
  headline: string;
  sub: string;
  trustChips?: string[];
  bgImage?: string;
}

export default function Hero({
  headline,
  sub,
  trustChips,
  bgImage,
}: HeroProps) {
  return (
    <section className="relative min-h-[55vh] flex flex-col items-center justify-center overflow-hidden">
      {bgImage && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
      )}
      <div className="absolute inset-0 bg-paper/85" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center pt-20 pb-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-navy leading-tight mb-4">
          {headline}
        </h1>
        <p className="text-lg md:text-xl text-navy/60 max-w-2xl mx-auto leading-relaxed">
          {sub}
        </p>
        {trustChips && trustChips.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3 mt-6">
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

      {/* Scroll indicator */}
      <div className="relative z-10 pb-4 mt-2">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-navy/30"
          style={{ animation: "bounce-down 2s ease-in-out infinite" }}
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  );
}
