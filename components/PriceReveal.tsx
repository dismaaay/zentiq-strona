"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "./ui";
import { useCountUp } from "@/lib/useCountUp";

// Uczciwe sygnały zaufania zamiast zmyślonej liczby klientów.
const trust = ["0 zł z góry", "Pełne prawa i pliki", "Umowa po akceptacji"];

/**
 * Sygnaturowy moment cenowy: rynkowa wycena zostaje efektownie przekreślona,
 * a nasza cena wyskakuje w szklanej karcie na viridianowym bandzie.
 * Licznik oszczędności liczy do PRAWDZIWEJ wartości (7000 - 500 = 6500 zł).
 * Choreografia startuje raz, gdy sekcja wejdzie w kadr (IntersectionObserver).
 */
export function PriceReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);
  const savings = useCountUp(6500, live, 1600);

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
    <section className="section">
      <Container>
        <div
          ref={ref}
          className={`band-accent relative overflow-hidden rounded-[2rem] bg-accent px-6 py-16 text-white sm:rounded-[2.5rem] sm:px-16 sm:py-24 ${
            live ? "is-live" : ""
          }`}
        >
          {/* Środowisko światła na bandzie: miękki odblask z górnego rogu,
              pole pod szklaną kartą i pogłębiony dolny róg. Światło na
              płaszczyźnie zamiast pływającej plamy. */}
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(68% 58% at 84% -6%, rgb(255 255 255 / 0.15), transparent 62%)",
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(46% 44% at 50% 60%, rgb(255 255 255 / 0.11), transparent 72%)",
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(60% 58% at 6% 112%, rgb(10 70 52 / 0.5), transparent 60%)",
              }}
            />
          </div>

          <div className="relative mx-auto max-w-[760px] text-center">
            <h2 className="type-h2 text-white">Ta sama jakość. Ułamek ceny.</h2>

            {/* Rynkowa cena, która zostaje przekreślona */}
            <p className="pr-market-label mt-12 text-sm text-white/80">
              Rynkowa wycena podobnych projektów
            </p>
            <div className="mt-2 inline-block">
              <span className="relative inline-block">
                <span className="pr-market font-mono text-4xl font-medium tracking-tight text-white sm:text-6xl">
                  3000-7000 zł
                </span>
                <span
                  aria-hidden
                  className="pr-strike absolute left-0 top-1/2 h-[5px] w-full -translate-y-1/2 rounded-full bg-white"
                />
              </span>
            </div>

            {/* Nasza cena w szklanej karcie */}
            <div className="pr-price mx-auto mt-10 w-full max-w-md">
              <div className="glass px-8 py-9">
                <p className="text-sm font-medium text-ink">W Zentiq</p>
                <p className="mt-1 whitespace-nowrap font-mono text-5xl font-medium tracking-tight text-ink sm:text-6xl">
                  od 500 zł
                </p>
              </div>
            </div>

            {/* Licznik oszczędności (prawdziwa wartość) */}
            <p className="pr-savings mt-10 text-lg text-white/90 sm:text-xl">
              Oszczędzasz nawet{" "}
              <span className="font-mono font-semibold text-white tabular-nums">
                {savings.toLocaleString("pl-PL")} zł
              </span>
            </p>

            {/* Uczciwe sygnały zaufania */}
            <ul className="mt-10 flex flex-wrap items-center justify-center gap-3">
              {trust.map((t) => (
                <li
                  key={t}
                  className="pr-chip inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-medium text-white"
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="m5 13 4 4L19 7"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
