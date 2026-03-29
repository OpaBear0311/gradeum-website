import Card from "@/components/ui/Card";

const stats = [
  "4.2 hrs/week searching for documents",
  "40% of PE time on non-engineering tasks",
  "$380\u2013750 in recovered billing capacity per deliverable",
];

export default function ProblemSection() {
  return (
    <section className="py-20 md:py-28 bg-paper">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        {/* Time split graphic */}
        <div className="flex flex-col sm:flex-row items-stretch gap-0 mb-12 max-w-3xl mx-auto rounded-2xl overflow-hidden border border-warm-gray">
          <div className="flex-[3] bg-navy/10 p-8 flex flex-col justify-center">
            <span className="text-5xl font-serif text-navy mb-2">60%</span>
            <p className="text-navy/70 text-sm leading-relaxed">
              Searching, formatting, rebuilding.
            </p>
          </div>
          <div className="flex-[2] bg-amber/10 p-8 flex flex-col justify-center">
            <span className="text-5xl font-serif text-amber-dark mb-2">
              40%
            </span>
            <p className="text-navy/70 text-sm leading-relaxed">Engineering.</p>
          </div>
        </div>

        <p className="text-center text-xl md:text-2xl font-serif text-navy mb-14">
          Gradeum gives you the 60% back.
        </p>

        {/* Stat cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <Card key={stat} className="text-center">
              <p className="text-navy/80 text-sm leading-relaxed">{stat}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
