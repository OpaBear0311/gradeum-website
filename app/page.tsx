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
        {/* Hero + cards with flanking background art */}
        <section className="relative overflow-hidden">
          {/* Pillar — left side */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/pillar.svg"
            alt=""
            aria-hidden="true"
            className="hidden md:block pointer-events-none select-none absolute left-4 md:left-8 lg:left-16 top-1/2 -translate-y-1/2 h-[70%] max-h-[500px] w-auto opacity-[0.04]"
          />

          {/* Shield and Spear — right side */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/shield-spear.svg"
            alt=""
            aria-hidden="true"
            className="hidden md:block pointer-events-none select-none absolute right-4 md:right-8 lg:right-16 top-1/2 -translate-y-1/2 h-[70%] max-h-[500px] w-auto opacity-[0.04]"
          />

          {/* Content — above the art */}
          <div className="relative z-10">
            <Hero
              headline={ROOT_HERO.headline}
              sub={ROOT_HERO.sub}
              uppercase
            />
            <AudienceFork />
          </div>
        </section>

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
