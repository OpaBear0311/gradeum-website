interface BadgeProps {
  children: React.ReactNode;
  variant?: "navy" | "amber" | "muted";
}

const variants = {
  navy: "bg-navy/10 text-navy",
  amber: "bg-amber/10 text-amber-dark",
  muted: "bg-navy/5 text-navy/50",
};

export default function Badge({ children, variant = "navy" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${variants[variant]}`}
    >
      {children}
    </span>
  );
}
