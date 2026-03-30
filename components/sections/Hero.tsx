interface HeroProps {
  headline: string;
  sub: string;
  trustChips?: string[];
  bgImage?: string;
  uppercase?: boolean;
}

export default function Hero({
  headline,
  sub,
  trustChips,
  bgImage,
  uppercase = false,
}: HeroProps) {
  return (
    <section className="relative flex flex-col items-center justify-center overflow-hidden">
      {bgImage && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
      )}
      <div className="absolute inset-0 bg-paper/85" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center pt-20 pb-6">
        <h1
          className={`text-4xl sm:text-5xl md:text-6xl font-serif text-navy leading-tight mb-3 ${
            uppercase ? "uppercase tracking-wide" : ""
          }`}
        >
          {headline}
        </h1>
        <p className="text-lg md:text-xl text-navy/60 max-w-2xl mx-auto leading-relaxed">
          {sub}
        </p>
        {trustChips && trustChips.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3 mt-4">
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
