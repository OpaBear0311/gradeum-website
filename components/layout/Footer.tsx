import Link from "next/link";
import { FOOTER_LINKS, TAGLINE } from "@/lib/constants";

export default function Footer() {
  const columns = [
    { title: "Product", links: FOOTER_LINKS.product },
    { title: "Company", links: FOOTER_LINKS.company },
    { title: "Resources", links: FOOTER_LINKS.resources },
    { title: "Legal", links: FOOTER_LINKS.legal },
  ];

  return (
    <footer aria-label="Site footer" className="bg-navy-deep text-white/70">
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-bold tracking-widest text-white/40 uppercase mb-4 font-sans">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold tracking-[0.2em] text-white/90">
              GRADEUM
            </span>
            <span className="text-xs text-white/40 italic">{TAGLINE}</span>
          </div>
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} Gradeum Technologies, LLC.
          </p>
        </div>
      </div>
    </footer>
  );
}
