import { Container, ButtonLink } from "./ui";
import { LivePreview } from "./LivePreview";

export function Hero() {
  return (
    <section id="start" className="relative overflow-hidden">
      {/* Statyczne pole swietlne pod szklem (to swiatlo, nie glow) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute -top-32 right-[-12%] h-[620px] w-[620px] rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, var(--color-accent-wash), transparent 72%)",
          }}
        />
        <div
          className="absolute left-[-18%] top-[30%] h-[520px] w-[520px] rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgb(255 255 255 / 0.9), transparent 70%)",
          }}
        />
      </div>

      <Container>
        <div className="grid items-center gap-12 pb-16 pt-32 sm:pt-36 lg:grid-cols-12 lg:gap-10 lg:pb-24">
          <div className="lg:col-span-6">
            <h1 className="type-display text-ink">
              <span className="mb-5 block font-mono text-xs uppercase tracking-[0.2em] text-ink-2 motion-safe:animate-rise-in">
                Strony internetowe dla firm
              </span>
              <span className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
                <span className="block motion-safe:animate-line-up">
                  Najpierw zobacz.
                </span>
              </span>
              <span className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
                <span
                  className="block motion-safe:animate-line-up"
                  style={{ animationDelay: "90ms" }}
                >
                  Potem <em>zdecyduj.</em>
                </span>
              </span>
            </h1>

            <p
              className="type-lead mt-7 max-w-[40ch] text-ink-2 motion-safe:animate-rise-in"
              style={{ animationDelay: "200ms" }}
            >
              Projektujemy i budujemy strony dla firm. Gotowy projekt oglądasz
              za darmo. Płacisz dopiero, gdy chcesz go zatrzymać.
            </p>

            <div
              className="mt-9 flex flex-col gap-3 sm:flex-row motion-safe:animate-rise-in"
              style={{ animationDelay: "300ms" }}
            >
              <ButtonLink href="#cennik" variant="primary" withArrow>
                Wyceń stronę
              </ButtonLink>
              <ButtonLink href="#realizacje" variant="secondary">
                Zobacz projekty
              </ButtonLink>
            </div>
          </div>

          <div
            className="lg:col-span-6 lg:-mt-6 motion-safe:animate-rise-in"
            style={{ animationDelay: "250ms" }}
          >
            <LivePreview />
          </div>
        </div>
      </Container>
    </section>
  );
}
