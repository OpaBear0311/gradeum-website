import Link from "next/link";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/product", label: "Product" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/trial", label: "Free Trial" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" }
];

export function Footer() {
  return (
    <footer className="bg-gradeum-navy text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div className="space-y-4">
          <Link href="/" className="text-2xl font-semibold tracking-tight">
            Gradeum
          </Link>
          <p className="max-w-xs text-base text-white/80">
            The practice of engineering. Remembered.
          </p>
          <a href="mailto:hello@gradeum.com" className="text-sm text-white/85 hover:text-white">
            hello@gradeum.com
          </a>
        </div>
        <div className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-white/70">
            Navigate
          </h2>
          <div className="grid gap-3 text-sm text-white/85">
            {footerLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-white/70">
            Professional Notice
          </h2>
          <p className="max-w-md text-sm leading-6 text-white/85">
            All outputs are AI-assisted reference only and must be reviewed by a licensed
            professional engineer before use in any deliverable. Gradeum does not exercise
            engineering judgment.
          </p>
        </div>
      </div>
    </footer>
  );
}
