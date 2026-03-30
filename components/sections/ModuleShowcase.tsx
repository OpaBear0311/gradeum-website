const modules = [
  {
    title: "Document Q&A",
    description:
      "Ask about any document in your archive in plain language. Get answers with source attribution: document name, page number, section, date of record. Dual-model consensus validates every response.",
    mockup: "/images/mockups/document-qa.svg",
    alt: "Document Q&A interface showing a question about pile splice requirements with cited answer and source panel",
  },
  {
    title: "Drawing Intelligence",
    description:
      "Ask about a drawing element and get the answer with sheet reference, drawing number, zone, and seal attribution. Gradeum tells you who sealed it, when, and what the status is.",
    mockup: "/images/mockups/drawing-intelligence.svg",
    alt: "Drawing intelligence viewer showing a pile layout plan with highlighted element details and PE seal attribution",
  },
  {
    title: "PE Review Workflow",
    description:
      "Every AI output enters a review queue. The PE reviews, approves or rejects with comments, and the decision is logged immutably. The responsible charge log is append-only \u2014 no edits, no deletions.",
    mockup: "/images/mockups/pe-review.svg",
    alt: "PE review queue with pending documents, expanded review panel showing approve and revise actions with responsible charge logging",
  },
  {
    title: "Document Production",
    description:
      "Basis of Design memoranda, condition assessments, inspection reports, specifications. AI-assisted drafting guided by your project data and governing standards. PE-review-ready on first pass.",
    mockup: "/images/mockups/document-production.svg",
    alt: "Document production interface showing a Basis of Design template with AI-generated design criteria citing ASCE and PIANC standards",
  },
  {
    title: "Program Management",
    description:
      "Resource forecasting, time tracking with AFK detection, invoice generation, subcontractor registry, staff rate management. The practice management features your firm needs without a second platform.",
    mockup: "/images/mockups/program-management.svg",
    alt: "Program management dashboard showing 12 active projects with progress tracking, PE assignments, and financial metrics",
  },
];

export default function ModuleShowcase() {
  return (
    <section className="py-8 bg-paper">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="space-y-12">
          {modules.map((mod, i) => {
            const isReversed = i % 2 === 1;
            return (
              <div
                key={mod.title}
                className={`flex flex-col ${isReversed ? "md:flex-row-reverse" : "md:flex-row"} gap-10 items-center`}
              >
                {/* Feature mockup */}
                <div className="flex-1 w-full">
                  <img
                    src={mod.mockup}
                    alt={mod.alt}
                    className="rounded-2xl shadow-lg w-full"
                    loading="lazy"
                  />
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
