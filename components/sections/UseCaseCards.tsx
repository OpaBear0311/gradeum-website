import Card from "@/components/ui/Card";
import { AGENCY_USE_CASES } from "@/lib/constants";

const iconMap: Record<string, React.ReactNode> = {
  anchor: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-navy">
      <circle cx="16" cy="8" r="3" stroke="currentColor" strokeWidth="2" />
      <path d="M16 11v16M8 20l8 7 8-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  building: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-navy">
      <rect x="6" y="4" width="20" height="24" rx="2" stroke="currentColor" strokeWidth="2" />
      <rect x="11" y="9" width="4" height="4" rx="0.5" fill="currentColor" opacity="0.3" />
      <rect x="17" y="9" width="4" height="4" rx="0.5" fill="currentColor" opacity="0.3" />
      <rect x="11" y="16" width="4" height="4" rx="0.5" fill="currentColor" opacity="0.3" />
      <rect x="17" y="16" width="4" height="4" rx="0.5" fill="currentColor" opacity="0.3" />
      <rect x="13" y="23" width="6" height="5" rx="0.5" fill="currentColor" opacity="0.3" />
    </svg>
  ),
  road: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-navy">
      <path d="M4 28L12 4h8l8 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 8v3M16 15v3M16 22v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  shield: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-navy">
      <path d="M16 3L5 8v8c0 7.18 4.7 13.32 11 15 6.3-1.68 11-7.82 11-15V8L16 3z" stroke="currentColor" strokeWidth="2" />
      <path d="M12 16l3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  landmark: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-navy">
      <path d="M16 3l12 7H4l12-7z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <rect x="4" y="26" width="24" height="3" rx="1" stroke="currentColor" strokeWidth="2" />
      <path d="M8 10v16M14 10v16M20 10v16M26 10v16" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
};

export default function UseCaseCards() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-12">
      <h2 className="sr-only">Use cases by organization type</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {AGENCY_USE_CASES.map((uc) => (
          <Card key={uc.title} className="flex flex-col gap-4">
            <div className="mb-1">{iconMap[uc.icon]}</div>
            <h3 className="text-xl font-serif text-navy font-semibold">
              {uc.title}
            </h3>
            <p className="text-navy/60 leading-relaxed text-sm">
              {uc.scenario}
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
}
