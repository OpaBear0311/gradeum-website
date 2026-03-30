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
    <section className="bg-navy-deep py-8">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {statements.map((statement) => (
            <p
              key={statement}
              className="text-white/90 text-center text-sm font-medium"
            >
              {statement}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
