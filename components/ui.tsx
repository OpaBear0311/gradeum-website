import Link from "next/link";
import clsx from "clsx";
import type { ReactNode } from "react";

export function Section({
  children,
  className,
  tone = "white",
  id
}: {
  children: ReactNode;
  className?: string;
  tone?: "white" | "mist" | "navy";
  id?: string;
}) {
  return (
    <section
      id={id}
      className={clsx(
        "px-4 py-20 sm:px-6 lg:px-8 lg:py-24",
        tone === "mist" && "bg-gradeum-mist",
        tone === "navy" && "bg-gradeum-navy text-white",
        className
      )}
    >
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-gradeum-cyan">
      {children}
    </p>
  );
}

export function Heading({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2 className={clsx("text-balance text-3xl font-semibold text-gradeum-navy sm:text-4xl", className)}>
      {children}
    </h2>
  );
}

export function BodyText({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return <p className={clsx("text-lg leading-8 text-gradeum-muted", className)}>{children}</p>;
}

export function PrimaryButton({
  href,
  children,
  className
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={clsx(
        "inline-flex min-h-12 items-center justify-center rounded-full bg-gradeum-cyan px-6 text-sm font-semibold uppercase tracking-[0.08em] text-white hover:bg-gradeum-cyan-deep",
        className
      )}
    >
      {children}
    </Link>
  );
}

export function SecondaryButton({
  href,
  children,
  className
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={clsx(
        "inline-flex min-h-12 items-center justify-center rounded-full border border-gradeum-border bg-white px-6 text-sm font-semibold uppercase tracking-[0.08em] text-gradeum-navy hover:border-gradeum-cyan hover:text-gradeum-cyan",
        className
      )}
    >
      {children}
    </Link>
  );
}

export function Card({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "rounded-4xl border border-gradeum-border bg-white p-8 shadow-panel",
        className
      )}
    >
      {children}
    </div>
  );
}

export function PlaceholderMedia({
  title,
  alt,
  className
}: {
  title: string;
  alt: string;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={alt}
      className={clsx(
        "relative overflow-hidden rounded-4xl border border-gradeum-border bg-gradient-to-br from-gradeum-navy/12 via-white to-gradeum-cyan/10",
        className
      )}
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(27,58,92,0.08),transparent_35%,rgba(0,172,193,0.16))]" />
      <div className="relative flex h-full min-h-[240px] items-end p-6">
        <div className="rounded-3xl border border-white/70 bg-white/80 px-4 py-3 backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gradeum-cyan">Placeholder</p>
          <p className="mt-1 text-base font-semibold text-gradeum-navy">{title}</p>
          <p className="mt-2 max-w-sm text-sm leading-6 text-gradeum-muted">{alt}</p>
        </div>
      </div>
    </div>
  );
}

export function BrowserMockup({
  title,
  alt,
  className
}: {
  title: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className={clsx("rounded-[28px] border border-gradeum-border bg-white shadow-panel", className)}>
      <div className="flex items-center gap-2 border-b border-gradeum-border px-5 py-4">
        <span className="h-3 w-3 rounded-full bg-gradeum-gold/80" />
        <span className="h-3 w-3 rounded-full bg-gradeum-cyan/70" />
        <span className="h-3 w-3 rounded-full bg-gradeum-navy/20" />
        <span className="ml-3 rounded-full bg-gradeum-mist px-3 py-1 text-xs text-gradeum-muted">
          gradeum.local
        </span>
      </div>
      <PlaceholderMedia title={title} alt={alt} className="rounded-t-none border-0 shadow-none" />
    </div>
  );
}
