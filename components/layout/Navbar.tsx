"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FIRMS_NAV_LINKS, AGENCIES_NAV_LINKS } from "@/lib/constants";

interface NavbarProps {
  audience: "firms" | "agencies" | "root";
}

export default function Navbar({ audience }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links =
    audience === "firms"
      ? FIRMS_NAV_LINKS
      : audience === "agencies"
        ? AGENCIES_NAV_LINKS
        : [];

  const crossLink =
    audience === "firms"
      ? { label: "For Agencies \u2192", href: "/agencies" }
      : audience === "agencies"
        ? { label: "For Firms \u2192", href: "/firms" }
        : null;

  const ctaHref =
    audience === "agencies" ? "/agencies/pricing" : "/firms/pricing";

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[60] focus:px-4 focus:py-2 focus:bg-amber focus:text-white focus:rounded-lg focus:text-sm focus:font-medium"
      >
        Skip to content
      </a>
      <nav
        aria-label="Main navigation"
        className={`fixed top-0 left-0 right-0 z-50 h-16 flex items-center px-6 md:px-10 transition-colors duration-300 ${
          scrolled
            ? "bg-navy-deep/95 backdrop-blur-sm shadow-md"
            : "bg-transparent"
        }`}
      >
        {/* Wordmark */}
        <Link
          href={audience === "root" ? "/" : `/${audience}`}
          className="text-sm font-bold tracking-[0.2em] select-none"
          style={{ color: scrolled ? "#FAF7F2" : "#1B3A5C" }}
        >
          GRADEUM
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6 ml-10">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors ${
                scrolled
                  ? "text-white/70 hover:text-white"
                  : "text-navy/70 hover:text-navy"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex-1" />

        {/* Cross-link */}
        {crossLink && (
          <Link
            href={crossLink.href}
            className={`hidden md:inline text-xs mr-6 transition-colors ${
              scrolled
                ? "text-white/50 hover:text-white/80"
                : "text-navy/40 hover:text-navy/70"
            }`}
          >
            {crossLink.label}
          </Link>
        )}

        {/* CTA */}
        <Link
          href={ctaHref}
          className="hidden md:inline-flex items-center px-5 py-2 bg-amber text-white text-sm font-medium rounded-lg hover:bg-amber-dark transition-colors"
        >
          Get Started
        </Link>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-5 h-0.5 transition-all ${scrolled ? "bg-white" : "bg-navy"} ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`}
          />
          <span
            className={`block w-5 h-0.5 transition-all ${scrolled ? "bg-white" : "bg-navy"} ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-5 h-0.5 transition-all ${scrolled ? "bg-white" : "bg-navy"} ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
          />
        </button>
      </nav>

      {/* Mobile overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-navy-deep flex flex-col items-center justify-center gap-6 pt-16">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-white text-xl"
            >
              {link.label}
            </Link>
          ))}
          {crossLink && (
            <Link
              href={crossLink.href}
              onClick={() => setMenuOpen(false)}
              className="text-white/50 text-sm mt-4"
            >
              {crossLink.label}
            </Link>
          )}
          <Link
            href={ctaHref}
            onClick={() => setMenuOpen(false)}
            className="mt-4 px-8 py-3 bg-amber text-white text-lg font-medium rounded-lg"
          >
            Get Started
          </Link>
        </div>
      )}
    </>
  );
}
