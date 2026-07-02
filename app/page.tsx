import { Hero } from "@/components/Hero";
import { Process } from "@/components/Process";
import { Proof } from "@/components/Proof";
import { Work } from "@/components/Work";
import { PriceReveal } from "@/components/PriceReveal";
import { Pricing } from "@/components/Pricing";
import { Manifest } from "@/components/Manifest";
import { FAQ } from "@/components/FAQ";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <Process />
      <Proof />
      <Work />
      <PriceReveal />
      <Pricing />
      <Manifest />
      <FAQ />
      {/* Ciemna klamra: dramatyczne domknięcie strony (Kontakt + stopka).
          id wykorzystuje Nav do adaptacji szkła nad ciemnym tłem. */}
      <div
        id="ciemna-klamra"
        className="band-dark mt-8 rounded-t-[2rem] bg-ink sm:mt-12 sm:rounded-t-[2.5rem]"
      >
        <Contact />
        <Footer />
      </div>
    </>
  );
}
