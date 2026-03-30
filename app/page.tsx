import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import AudienceFork from "@/components/sections/AudienceFork";
import TrustStrip from "@/components/sections/TrustStrip";
import { ROOT_HERO, INDUSTRIES } from "@/lib/constants";

export default function Home() {
  return (
    <>
      <Navbar audience="root" />
      <main id="main-content">
        {/* Hero with pillar + shield background art */}
        <div className="relative">
          {/* Left — Roman pillar */}
          <svg
            viewBox="0 0 120 400"
            className="hidden md:block absolute left-[6%] top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ height: "50vh", opacity: 0.045 }}
            aria-hidden="true"
          >
            <g stroke="#1B3A5C" strokeWidth="1.5" fill="none">
              {/* Capital */}
              <path d="M30 40 Q60 20 90 40" />
              <path d="M25 48 Q60 30 95 48" />
              <rect x="28" y="48" width="64" height="8" rx="1" />
              {/* Fluted shaft */}
              <line x1="32" y1="56" x2="36" y2="340" />
              <line x1="44" y1="56" x2="46" y2="340" />
              <line x1="56" y1="56" x2="57" y2="340" />
              <line x1="68" y1="56" x2="69" y2="340" />
              <line x1="80" y1="56" x2="78" y2="340" />
              <line x1="88" y1="56" x2="84" y2="340" />
              {/* Base */}
              <rect x="30" y="340" width="60" height="8" rx="1" />
              <rect x="24" y="348" width="72" height="10" rx="2" />
              <rect x="18" y="358" width="84" height="14" rx="3" />
            </g>
          </svg>

          {/* Right — Shield and spear */}
          <svg
            viewBox="0 0 160 400"
            className="hidden md:block absolute right-[6%] top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ height: "50vh", opacity: 0.045 }}
            aria-hidden="true"
          >
            <g stroke="#1B3A5C" strokeWidth="1.5" fill="none">
              {/* Spear — diagonal behind shield */}
              <line x1="120" y1="20" x2="40" y2="380" />
              <polygon points="120,20 115,40 125,40" fill="#1B3A5C" opacity="0.3" stroke="none" />
              {/* Shield — round clipeus */}
              <circle cx="75" cy="200" r="60" />
              <circle cx="75" cy="200" r="50" />
              <circle cx="75" cy="200" r="8" />
              {/* Shield cross */}
              <line x1="75" y1="150" x2="75" y2="250" />
              <line x1="25" y1="200" x2="125" y2="200" />
              {/* Shield rivets */}
              <circle cx="75" cy="155" r="3" />
              <circle cx="75" cy="245" r="3" />
              <circle cx="30" cy="200" r="3" />
              <circle cx="120" cy="200" r="3" />
            </g>
          </svg>

          <Hero
            headline={ROOT_HERO.headline}
            sub={ROOT_HERO.sub}
            uppercase
          />
        </div>

        <AudienceFork />

        {/* Industry strip */}
        <section className="py-6 px-6">
          <p className="text-center text-sm font-medium text-navy/40 mb-3">
            For the industries we depend on
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 max-w-3xl mx-auto">
            {INDUSTRIES.map((ind) => (
              <span key={ind} className="text-sm text-navy/50">
                {ind}
              </span>
            ))}
          </div>
        </section>

        <TrustStrip />
      </main>
      <Footer />
    </>
  );
}
