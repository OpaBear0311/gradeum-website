import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import AudienceFork from "@/components/sections/AudienceFork";
import TrustStrip from "@/components/sections/TrustStrip";
import { ROOT_HERO } from "@/lib/constants";

export default function Home() {
  return (
    <>
      <Navbar audience="root" />
      <main id="main-content">
        <Hero
          headline={ROOT_HERO.headline}
          sub={ROOT_HERO.sub}
          primaryCTA={{ label: "For Firms", href: "/firms" }}
          secondaryCTA={{ label: "For Agencies", href: "/agencies" }}
        />
        <AudienceFork />
        <TrustStrip />
      </main>
      <Footer />
    </>
  );
}
