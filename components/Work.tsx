"use client";

import { useState } from "react";
import { Container, ButtonLink } from "./ui";
import { Reveal } from "./Reveal";
import { projects, type ProjectId } from "@/lib/projects";
import { MiniSiteFrame } from "./minisites/MiniSiteFrame";
import { MiniSalon } from "./minisites/MiniSalon";
import { MiniKancelaria } from "./minisites/MiniKancelaria";
import { MiniPracownia } from "./minisites/MiniPracownia";

const minisites: Record<ProjectId, React.ReactNode> = {
  halo: <MiniSalon />,
  reda: <MiniKancelaria />,
  forma: <MiniPracownia />,
};

/**
 * Projekty pokazowe: te same trzy zywe mini-strony co w hero,
 * w pelniejszej odslonie. Bento 3 = 3: jedna duza karta + dwie mniejsze,
 * klik w mala awansuje ja do duzej.
 */
export function Work() {
  const [featuredId, setFeaturedId] = useState<ProjectId>("halo");
  const featured = projects.find((p) => p.id === featuredId)!;
  const side = projects.filter((p) => p.id !== featuredId);

  return (
    <section id="realizacje" className="section">
      <Container>
        <div className="max-w-[720px]">
          <Reveal>
            <h2 className="type-h2 text-ink">Projekty pokazowe.</h2>
          </Reveal>
          <Reveal delay={90}>
            <p className="type-lead mt-6 text-ink-2">
              Trzy branże, trzy różne charaktery. Każdy podgląd to prawdziwy
              layout złożony w kodzie, a nie obrazek. Tak samo zaczniemy twój.
            </p>
          </Reveal>
        </div>

        <Reveal delay={140}>
          <p className="mt-12 text-sm text-ink-2">
            Projekty demonstracyjne. Treści są przykładowe, wykonanie jest nasze.
          </p>
          <div className="mt-4 grid gap-6 lg:grid-cols-12">
            {/* Duza karta (powoli sama sie przewija) */}
            <figure className="lg:col-span-8">
              <div
                key={featured.id}
                className="motion-safe:animate-preview-in"
              >
                <div className="overflow-hidden rounded-[20px] border border-line">
                  <MiniSiteFrame
                    label={`Podgląd projektu strony: ${featured.name}`}
                    surface={featured.surface}
                    pan
                  >
                    {minisites[featured.id]}
                  </MiniSiteFrame>
                </div>
                <figcaption className="mt-5 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <span className="type-h3 text-ink">{featured.name}</span>
                  <span className="font-mono text-sm text-ink-2">
                    {featured.domain}
                  </span>
                  <span className="w-full text-base text-ink-2">
                    {featured.industry}. {featured.scope}
                  </span>
                </figcaption>
              </div>
            </figure>

            {/* Dwie mniejsze karty */}
            <div className="flex flex-col gap-6 lg:col-span-4">
              {side.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setFeaturedId(p.id)}
                  aria-label={`Pokaż projekt ${p.name} w powiększeniu`}
                  className="group text-left"
                >
                  <div className="overflow-hidden rounded-[20px] border border-line transition-colors duration-150 group-hover:border-ink/30">
                    <MiniSiteFrame
                      label={`Podgląd projektu strony: ${p.name}`}
                      surface={p.surface}
                    >
                      {minisites[p.id]}
                    </MiniSiteFrame>
                  </div>
                  <span className="mt-3 flex items-baseline justify-between gap-4">
                    <span className="text-base font-medium text-ink">
                      {p.name}
                    </span>
                    <span className="text-sm text-ink-2">{p.industry}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Hook: brak twojej branzy */}
        <Reveal delay={80}>
          <div className="mt-14 flex flex-col gap-5 border-t border-line pt-10 sm:flex-row sm:items-center sm:justify-between">
            <p className="type-h3 max-w-[26ch] text-ink">
              Nie widzisz tu swojej branży?
            </p>
            <div className="flex flex-col gap-4 sm:items-end">
              <p className="max-w-[42ch] text-ink-2 sm:text-right">
                To akurat najlepszy moment. Zrobimy projekt pod twoją firmę i
                pokażemy go, zanim cokolwiek zdecydujesz.
              </p>
              <ButtonLink href="#cennik" variant="primary" withArrow>
                Zacznij od swojej strony
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
