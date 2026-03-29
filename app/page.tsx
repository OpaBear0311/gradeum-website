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
        <Hero
          headline={ROOT_HERO.headline}
          sub={ROOT_HERO.sub}
        />
        <AudienceFork />

        {/* Industry strip */}
        <section className="py-8 px-6">
          <p className="text-center text-sm font-medium text-navy/40 mb-4">
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
