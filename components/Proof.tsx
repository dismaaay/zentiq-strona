"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "./ui";
import { useCountUp } from "@/lib/useCountUp";

// Uczciwe dowody. Emfaza inna niż na bandzie ceny: rzemioslo / czas / warunki.
const proofPoints = [
  "Prawdziwy kod, nie szablon z półki.",
  "Pierwszy projekt gotowy w 24 h.",
  "Płatność dopiero po twojej akceptacji.",
];

/**
 * Moment liczbowy: licznik dobija do 280 zrealizowanych projektow
 * (liczba prawdziwa), a viridianowa linia sama rysuje sie pod spodem,
 * gdy licznik laduje. Reframing wiaze liczbe z modelem: nikt nie ufal
 * nam w ciemno. Choreografia startuje raz (IntersectionObserver).
 */
export function Proof() {
  const ref = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);
  const count = useCountUp(280, live, 1900);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setLive(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setLive(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="zaufanie" className="section">
      <Container>
        <div
          ref={ref}
          className={`grid items-center gap-x-12 gap-y-12 lg:grid-cols-12 ${
            live ? "is-live" : ""
          }`}
        >
          {/* Lewa kolumna: liczba */}
          <div className="relative lg:col-span-5">
            {/* Pole swietlne pod liczba (to swiatlo, nie glow) */}
            <div
              aria-hidden
              className="pointer-events-none absolute -left-12 -top-20 -z-10 h-[380px] w-[380px]"
              style={{
                background:
                  "radial-gradient(closest-side, var(--color-accent-wash), transparent 72%)",
              }}
            />
            <p className="proof-kicker font-mono text-xs uppercase tracking-[0.2em] text-ink-2">
              Dotychczas
            </p>
            <p className="proof-num mt-4 font-mono text-[4.5rem] font-medium leading-[0.85] tracking-tight text-accent tabular-nums sm:text-[7rem] lg:text-[9rem]">
              {count}
            </p>
            <div
              aria-hidden
              className="proof-rule mt-3 h-[3px] w-40 rounded-full bg-accent/30 sm:w-56"
            />
            <p className="proof-label type-h3 mt-6 text-ink">
              zrealizowanych projektów
            </p>
          </div>

          {/* Prawa kolumna: reframing + dowody */}
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="proof-lead type-lead text-ink-2">
              Żadna z tych firm nie musiała nam ufać w ciemno. Najpierw
              zobaczyły gotowy projekt, a dopiero potem zdecydowały, czy chcą go
              zatrzymać.
            </p>
            <ul className="mt-8 space-y-4">
              {proofPoints.map((point) => (
                <li
                  key={point}
                  className="proof-item flex items-start gap-3 text-ink"
                >
                  <span
                    aria-hidden
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <path
                        d="m5 13 4 4L19 7"
                        stroke="currentColor"
                        strokeWidth="2.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="text-base">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
