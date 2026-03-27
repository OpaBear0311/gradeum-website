"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import clsx from "clsx";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/product", label: "Product" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/docs", label: "Docs" }
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={clsx(
        "sticky top-0 z-50 border-b border-transparent bg-white/95 backdrop-blur",
        scrolled && "border-gradeum-border shadow-sm"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-xl font-semibold tracking-tight text-gradeum-navy">
          Gradeum
        </Link>
        <nav
          aria-label="Primary"
          className="hidden items-center gap-6 text-sm font-medium text-gradeum-muted lg:flex"
        >
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-gradeum-navy">
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/trial"
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-gradeum-cyan px-5 text-sm font-semibold uppercase tracking-[0.08em] text-white hover:bg-gradeum-cyan-deep"
        >
          Start Free Trial
        </Link>
      </div>
      <nav
        aria-label="Mobile"
        className="border-t border-gradeum-border px-4 pb-4 pt-3 text-sm text-gradeum-muted lg:hidden"
      >
        <div className="flex flex-wrap gap-x-5 gap-y-3">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-gradeum-navy">
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
