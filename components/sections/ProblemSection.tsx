import Card from "@/components/ui/Card";

const stats = [
  "Hours every week searching for documents",
  "Too much PE time on non-engineering tasks",
  "$380\u2013750 in recovered billing capacity per deliverable",
];

export default function ProblemSection() {
  return (
    <section className="py-10 md:py-14 bg-paper">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <div className="flex flex-col sm:flex-row items-stretch gap-0 mb-8 max-w-3xl mx-auto rounded-2xl overflow-hidden border border-warm-gray">
          <div className="flex-1 bg-navy/10 p-6 flex flex-col justify-center">
            <span className="text-3xl md:text-4xl font-serif text-navy mb-2">
              Too much time
            </span>
            <p className="text-navy/70 text-sm leading-relaxed">
              Searching, formatting, rebuilding.
            </p>
          </div>
          <div className="flex-1 bg-navy/5 p-6 flex flex-col justify-center">
            <span className="text-3xl md:text-4xl font-serif text-navy/70 mb-2">
              Not enough time
            </span>
            <p className="text-navy/70 text-sm leading-relaxed">Engineering.</p>
          </div>
        </div>

        <p className="text-center text-xl md:text-2xl font-serif text-navy mb-8">
          Gradeum gives you that time back.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat) => (
            <Card key={stat} className="text-center py-5 px-4">
              <p className="text-navy/80 text-sm leading-relaxed">{stat}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
