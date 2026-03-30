const steps = [
  {
    number: "1",
    title: "Install",
    description:
      "The Gradeum Assistant installs on your server and indexes your project files locally. Your documents never leave your network.",
  },
  {
    number: "2",
    title: "Ask",
    description:
      "Your team asks questions in natural language. Gradeum retrieves answers from your files and engineering standards, cited to source.",
  },
  {
    number: "3",
    title: "Review",
    description:
      "Every AI output goes through your PE workflow. You approve it, you own it, it\u2019s on the record.",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-8 bg-paper">
      <div className="max-w-3xl mx-auto px-6 md:px-10">
        <h2 className="text-3xl md:text-4xl font-serif text-navy text-center mb-10">
          How it works
        </h2>

        <div className="relative">
          <div className="absolute left-6 top-8 bottom-8 w-px bg-warm-gray hidden md:block" />

          <div className="space-y-8">
            {steps.map((step) => (
              <div key={step.number} className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-navy text-white flex items-center justify-center font-serif text-lg relative z-10">
                  {step.number}
                </div>
                <div className="pt-1">
                  <h3 className="text-xl font-serif text-navy mb-2">
                    {step.title}
                  </h3>
                  <p className="text-navy/60 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
