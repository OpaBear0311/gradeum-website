interface SecurityPoint {
  title: string;
  description: string;
}

const defaultPoints: SecurityPoint[] = [
  {
    title: "AES-256 encryption at rest, TLS 1.3 in transit",
    description: "All data encrypted with industry-standard protocols.",
  },
  {
    title: "Tenant isolation at the database layer",
    description: "Your data is logically and physically separated.",
  },
  {
    title: "U.S. data residency",
    description: "All infrastructure hosted in the United States.",
  },
  {
    title: "Full audit logging, 7-year retention",
    description: "Every query and result is logged and exportable.",
  },
];

const agencyPoints: SecurityPoint[] = [
  {
    title: "AES-256 encryption at rest",
    description: "All indexed data is encrypted on your server using AES-256.",
  },
  {
    title: "TLS 1.3 in transit",
    description: "All communication between the Assistant and the interface uses TLS 1.3.",
  },
  {
    title: "Data sovereignty",
    description:
      "Your files never leave your network. The Gradeum Assistant runs entirely on your infrastructure.",
  },
  {
    title: "Full audit log",
    description: "Every query, every result, every user action \u2014 logged and exportable.",
  },
];

interface SecuritySectionProps {
  variant?: "firms" | "agencies";
}

export default function SecuritySection({ variant = "firms" }: SecuritySectionProps) {
  const points = variant === "agencies" ? agencyPoints : defaultPoints;

  return (
    <section className="py-20 md:py-28 bg-navy-deep">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <h2 className="text-3xl md:text-4xl font-serif text-white text-center mb-14">
          Security {variant === "agencies" ? "& Data Sovereignty" : "architecture"}
        </h2>

        {variant === "firms" && (
          <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-0 mb-16">
            {[
              "Firm Network",
              "Gradeum Assistant",
              "Cloud",
              "Claude",
              "Back",
            ].map((node, i) => (
              <div key={node} className="flex items-center">
                <div className="px-5 py-3 rounded-lg border border-white/20 bg-white/5 text-white text-sm text-center min-w-[120px]">
                  {node}
                </div>
                {i < 4 && (
                  <svg
                    className="w-8 h-4 text-white/30 hidden md:block"
                    viewBox="0 0 32 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M0 8h28M24 4l4 4-4 4" />
                  </svg>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {points.map((point) => (
            <div key={point.title} className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-amber flex-shrink-0 mt-0.5"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M10 2l-7 4v4c0 5.25 3 9.75 7 11 4-1.25 7-5.75 7-11V6l-7-4z" />
                <path d="M7 10l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div>
                <span className="text-white/90 text-sm font-medium">{point.title}</span>
                <p className="text-white/50 text-xs mt-0.5">{point.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
