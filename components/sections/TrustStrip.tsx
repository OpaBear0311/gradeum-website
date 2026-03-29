const defaultStatements = [
  "Your documents never leave your server.",
  "Gradeum does not exercise engineering judgment.",
  "Every PE review is logged immutably.",
];

interface TrustStripProps {
  statements?: string[];
}

export default function TrustStrip({ statements = defaultStatements }: TrustStripProps) {
  return (
    <section className="bg-navy-deep py-14 md:py-16">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          {statements.map((statement) => (
            <p
              key={statement}
              className="text-white/90 text-center text-sm md:text-base font-medium"
            >
              {statement}
            </p>
          ))}
        </div>
        <p className="text-center text-white/40 text-xs">
          These are architectural facts enforced at the system level.
        </p>
      </div>
    </section>
  );
}
