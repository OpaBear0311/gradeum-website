const steps = [
  {
    number: "01",
    title: "Install the Agent",
    description:
      "The Gradeum Agent installs on your server. It indexes your document archive locally \u2014 PDFs, drawings, specifications, reports, correspondence. Your files never leave your network.",
  },
  {
    number: "02",
    title: "Search in plain language",
    description:
      'Any staff member can search your archive in everyday language: \u201Cpile driving records Wharf 7 1987.\u201D Gradeum returns the exact document, page, and section with the original date of record.',
  },
  {
    number: "03",
    title: "Get attributed answers",
    description:
      "Every result shows the source document name, page number, section, original date, and relevance score. Two independent AI models validate every response for confidence.",
  },
];

export default function AgencyHowItWorks() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <h2 className="text-3xl md:text-4xl font-serif text-navy text-center mb-16">
        How It Works
      </h2>
      <div className="grid md:grid-cols-3 gap-10">
        {steps.map((step) => (
          <div key={step.number} className="flex flex-col">
            <span className="text-amber font-bold text-sm tracking-widest mb-3">
              {step.number}
            </span>
            <h3 className="text-xl font-serif text-navy mb-3">{step.title}</h3>
            <p className="text-navy/60 leading-relaxed text-sm">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
