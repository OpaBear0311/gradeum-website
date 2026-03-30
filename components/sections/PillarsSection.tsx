import Card from "@/components/ui/Card";

const pillars = [
  {
    title: "Find anything",
    description:
      "Your drawings, reports, specs, and calculations \u2014 searchable in seconds. Every answer traceable to the source document, page, and section.",
  },
  {
    title: "Draft the deliverable",
    description:
      "AI-assisted document creation guided by your project data and engineering standards. Basis of Design. Calc packages. Proposals. Structured, cited, PE-review-ready.",
  },
  {
    title: "Keep the record clean",
    description:
      "PE review workflow governs all outputs. Responsible charge logged on every approval. Nothing enters the project record without your sign-off. The audit trail is immutable.",
  },
];

export default function PillarsSection() {
  return (
    <section className="py-8 bg-white">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <h2 className="sr-only">What Gradeum does</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar) => (
            <Card key={pillar.title} hoverable>
              <h3 className="text-xl font-serif text-navy mb-3">
                {pillar.title}
              </h3>
              <p className="text-navy/60 text-sm leading-relaxed">
                {pillar.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
