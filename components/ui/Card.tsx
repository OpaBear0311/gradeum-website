interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

export default function Card({
  children,
  className = "",
  hoverable = false,
}: CardProps) {
  return (
    <div
      className={`bg-white border border-warm-gray rounded-2xl p-8 ${
        hoverable ? "transition-all hover:shadow-lg hover:-translate-y-1" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
