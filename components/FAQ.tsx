import { Container } from "./ui";
import { Reveal } from "./Reveal";
import { faqItems } from "@/lib/faq";

/**
 * Najczęstsze pytania. Natywny <details>/<summary>: dostępny z klawiatury,
 * działa bez JS, płynne rozwijanie sterowane CSS (globals.css, details.faq).
 * Układ dwukolumnowy: lewa niosąca nagłówek, prawa interaktywna lista.
 */
export function FAQ() {
  return (
    <section id="faq" className="section scroll-mt-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <Reveal>
              <h2 className="type-h2 text-ink">
                Pytania, które zadaje każdy.
              </h2>
            </Reveal>
            <Reveal delay={90}>
              <p className="type-lead mt-6 max-w-[32ch] text-ink-2">
                Model bez płatności z góry brzmi zbyt dobrze. Poniżej mówimy
                wprost, jak to działa.
              </p>
            </Reveal>
          </div>

          <Reveal delay={120} className="lg:pt-2">
            <ul className="border-t border-line">
              {faqItems.map((item) => (
                <li key={item.q}>
                  <details className="faq group border-b border-line">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-medium text-ink [&::-webkit-details-marker]:hidden">
                      {item.q}
                      <span
                        aria-hidden
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-field text-ink transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-open:rotate-45"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M12 5v14M5 12h14"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                          />
                        </svg>
                      </span>
                    </summary>
                    <p className="max-w-[58ch] pb-6 text-base leading-relaxed text-ink-2">
                      {item.a}
                    </p>
                  </details>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
