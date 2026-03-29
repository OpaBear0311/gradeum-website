import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

interface PricingCardProps {
  price: number;
  label: string;
  period: string;
  features: string[];
  cta: { label: string; href: string };
  highlight?: string;
}

export default function PricingCard({
  price,
  label,
  period,
  features,
  cta,
  highlight,
}: PricingCardProps) {
  return (
    <div className="bg-white border border-warm-gray rounded-2xl p-10 max-w-md mx-auto w-full">
      {highlight && (
        <div className="mb-6">
          <Badge variant="amber">{highlight}</Badge>
        </div>
      )}

      <div className="mb-8">
        <span className="text-5xl font-serif text-navy">${price}</span>
        <span className="text-navy/50 text-base ml-2">{period}</span>
      </div>

      <ul className="space-y-3 mb-10">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm">
            <svg
              className="w-5 h-5 text-amber flex-shrink-0 mt-0.5"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 10l4 4 8-8" />
            </svg>
            <span className="text-navy/70">{feature}</span>
          </li>
        ))}
      </ul>

      <Button href={cta.href} size="lg" className="w-full">
        {cta.label}
      </Button>
    </div>
  );
}
