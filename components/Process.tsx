import type { ReactNode } from "react";
import { Container } from "./ui";
import { Reveal } from "./Reveal";

const steps: { title: string; desc: ReactNode }[] = [
  {
    title: "Opisujesz firmę.",
    desc: "Wypełniasz krótki formularz wyceny. To wszystko, czego potrzebujemy na start.",
  },
  {
    title: "Dostajesz gotowy projekt.",
    desc: "W ciągu 24 godzin wysyłamy link do działającej strony. Za darmo.",
  },
  {
    title: "Decydujesz.",
    desc: (
      <>
        Podoba się: płacisz i strona jest twoja. Nie podoba się: nie płacisz{" "}
        <em>nic</em>.
      </>
    ),
  },
];

export function Process() {
  return (
    <section id="proces" className="section">
      <Container>
        <div className="grid gap-x-12 gap-y-12 lg:grid-cols-12">
          {/* Lewa kolumna: tytul sekcji, lepki na desktopie */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <h2 className="type-h2 text-ink">Ryzyko bierzemy na siebie.</h2>
              </Reveal>
              <Reveal delay={90}>
                <p className="type-lead mt-6 max-w-[34ch] text-ink-2">
                  Nie ryzykujesz ani złotówki. Płacisz tylko za projekt, który
                  naprawdę chcesz zatrzymać.
                </p>
              </Reveal>
            </div>
          </div>

          {/* Prawa kolumna: trzy kroki */}
          <div className="lg:col-span-7">
            {steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 90}>
                <div className="border-t border-line py-9 sm:py-12">
                  <h3 className="type-step text-ink">{step.title}</h3>
                  <p className="mt-3 max-w-[46ch] text-ink-2">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
