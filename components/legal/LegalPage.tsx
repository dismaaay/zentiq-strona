import { Container } from "@/components/ui";
import { legalConfig, legalLinks, isLegalPlaceholder } from "@/lib/legal";

/**
 * Wspólny układ dla stron prawnych: wąska kolumna redakcyjna, nagłówek z datą
 * aktualizacji i własna minimalna stopka (strony prawne to osobne route'y i nie
 * dziedziczą stopki strony głównej). Treść owinięta w `.legal-prose` (globals.css).
 */
export function LegalPage({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const year = new Date().getFullYear();
  return (
    <>
      <article className="pt-28 pb-20 sm:pt-36">
        <Container>
          <div className="mx-auto max-w-[680px]">
            <a
              href="/"
              className="text-sm text-ink-2 underline-offset-4 transition-colors duration-150 hover:text-ink hover:underline"
            >
              ← Strona główna
            </a>
            <h1 className="type-h2 mt-6 text-ink">{title}</h1>
            <p className="mt-4 text-sm text-ink-2">
              Ostatnia aktualizacja: {legalConfig.lastUpdated}
            </p>
            <div className="legal-prose mt-12">{children}</div>
          </div>
        </Container>
      </article>

      <footer className="border-t border-line">
        <Container className="py-10">
          <div className="mx-auto flex max-w-[680px] flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <a
              href="/"
              className="text-lg font-semibold tracking-tight text-ink"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Zentiq
            </a>
            <nav
              aria-label="Dokumenty prawne"
              className="flex flex-wrap gap-x-6 gap-y-2"
            >
              {legalLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="text-sm text-ink-2 transition-colors duration-150 hover:text-ink"
                >
                  {l.label}
                </a>
              ))}
              <a
                href={`mailto:${legalConfig.entity.dataEmail}`}
                className="font-mono text-sm text-ink-2 transition-colors duration-150 hover:text-ink"
              >
                {legalConfig.entity.dataEmail}
              </a>
            </nav>
          </div>
          <p className="mx-auto mt-8 max-w-[680px] text-xs text-ink-2">
            © {year} Zentiq. Wszelkie prawa zastrzeżone.
          </p>
        </Container>
      </footer>
    </>
  );
}

/**
 * Renderuje realną wartość danych podmiotu albo — gdy to wciąż placeholder —
 * widoczny znacznik do uzupełnienia (żeby nie publikować zmyślonych danych).
 */
export function LegalValue({ value, label }: { value: string; label: string }) {
  if (isLegalPlaceholder(value)) {
    return (
      <span className="rounded bg-accent-wash px-1.5 py-0.5 text-ink-2">
        [{label} — do uzupełnienia]
      </span>
    );
  }
  return <>{value}</>;
}
