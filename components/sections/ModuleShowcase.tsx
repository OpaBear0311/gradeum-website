const modules = [
  {
    title: "Document Q&A",
    description:
      "Ask about any document in your archive in plain language. Get answers with source attribution: document name, page number, section, date of record. Dual-model consensus validates every response.",
  },
  {
    title: "Drawing Intelligence",
    description:
      "Ask about a drawing element and get the answer with sheet reference, drawing number, zone, and seal attribution. Gradeum tells you who sealed it, when, and what the status is.",
  },
  {
    title: "PE Review Workflow",
    description:
      "Every AI output enters a review queue. The PE reviews, approves or rejects with comments, and the decision is logged immutably. The responsible charge log is append-only \u2014 no edits, no deletions.",
  },
  {
    title: "Document Production",
    description:
      "Basis of Design memoranda, condition assessments, inspection reports, specifications. AI-assisted drafting guided by your project data and governing standards. PE-review-ready on first pass.",
  },
  {
    title: "Program Management",
    description:
      "Resource forecasting, time tracking with AFK detection, invoice generation, subcontractor registry, staff rate management. The practice management features your firm needs without a second platform.",
  },
];

export default function ModuleShowcase() {
  return (
    <section className="py-20 md:py-28 bg-paper">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="space-y-20">
          {modules.map((mod, i) => {
            const isReversed = i % 2 === 1;
            return (
              <div
                key={mod.title}
                className={`flex flex-col ${isReversed ? "md:flex-row-reverse" : "md:flex-row"} gap-10 items-center`}
              >
                {/* Image placeholder */}
                <div className="flex-1 w-full">
                  <div className="aspect-[4/3] rounded-2xl bg-warm-gray flex items-center justify-center">
                    <span className="text-navy/30 text-sm">
                      Screenshot coming soon
                    </span>
                  </div>
                </div>

                {/* Text */}
                <div className="flex-1">
                  <h3 className="text-2xl font-serif text-navy mb-4">
                    {mod.title}
                  </h3>
                  <p className="text-navy/60 leading-relaxed">
                    {mod.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
