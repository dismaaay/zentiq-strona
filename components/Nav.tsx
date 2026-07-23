"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { navItems, siteConfig } from "@/lib/site";

/**
 * Nawigacja: plywajaca pigulka. Na gorze strony przezroczysta,
 * po 24 px scrolla wjezdza warstwa liquid glass (jedno z dwoch
 * dozwolonych miejsc szkla na stronie). Nad ciemna klamra (Kontakt +
 * stopka) szklo i tekst adaptuja sie do ciemnego tla.
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [overDark, setOverDark] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const ticking = useRef(false);

  // Kotwice sekcji żyją na stronie głównej. Poza nią (np. strony prawne)
  // linkujemy do „/#…", żeby przenieść na home i przewinąć do sekcji.
  const home = usePathname() === "/";
  const to = (hash: string) => (home ? hash : `/${hash}`);

  // Scroll: przelaczenie szkla + wykrycie ciemnej klamry pod nawigacja.
  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24);
        const band = document.getElementById("ciemna-klamra");
        setOverDark(band ? band.getBoundingClientRect().top <= 72 : false);
        ticking.current = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scrollspy: IntersectionObserver na sekcjach.
  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.href.slice(1)))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Blokada scrolla tla i Escape przy otwartym menu mobilnym.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Ciemna kolorystyka tylko gdy nad klamra i menu zamkniete (menu jest jasne).
  const dark = overDark && !open;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto mt-3 w-[calc(100%-1.5rem)] max-w-[840px]">
        <nav
          aria-label="Główna"
          className="relative isolate flex h-14 items-center justify-between rounded-full px-5"
        >
          {/* Warstwa szkla jasna.
              position:absolute inline: .glass ustawia position:relative,
              a regula bez warstwy wygrywa z utility Tailwinda. Bez tego tlo
              weszloby do ukladu flex i zepchnelo logo na srodek pigulki. */}
          <div
            aria-hidden
            style={{ position: "absolute" }}
            className={`glass glass--pill inset-0 -z-10 transition-opacity duration-300 ${
              (scrolled || open) && !dark ? "opacity-100" : "opacity-0"
            }`}
          />
          {/* Warstwa szkla ciemna (nad klamra) */}
          <div
            aria-hidden
            style={{ position: "absolute" }}
            className={`glass glass--pill glass--dark inset-0 -z-10 transition-opacity duration-300 ${
              dark ? "opacity-100" : "opacity-0"
            }`}
          />

          <a
            href={home ? "#start" : "/"}
            onClick={() => setOpen(false)}
            className={`text-lg font-semibold tracking-tight transition-colors duration-300 ${
              dark ? "text-paper" : "text-ink"
            }`}
            style={{ fontFamily: "var(--font-display)" }}
          >
            Zentiq
          </a>

          {/* Linki desktop */}
          <ul className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={to(item.href)}
                  className={`text-sm font-medium transition-colors duration-300 ${
                    active === item.href
                      ? dark
                        ? "text-paper"
                        : "text-ink"
                      : dark
                        ? "text-paper/60 hover:text-paper"
                        : "text-ink-2 hover:text-ink"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href={to("#cennik")}
            className="hidden items-center rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition-colors duration-150 hover:bg-accent-strong md:inline-flex"
          >
            Wyceń stronę
          </a>

          {/* Przelacznik menu mobilnego */}
          <button
            type="button"
            aria-label={open ? "Zamknij menu" : "Otwórz menu"}
            aria-expanded={open}
            aria-controls="menu-mobilne"
            onClick={() => setOpen((v) => !v)}
            className={`-mr-2 flex h-10 w-10 items-center justify-center transition-colors duration-300 md:hidden ${
              dark ? "text-paper" : "text-ink"
            }`}
          >
            <span className="relative block h-3.5 w-5">
              <span
                className={`absolute left-0 top-0 block h-0.5 w-5 bg-current transition-transform duration-300 ${
                  open ? "translate-y-[6px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute bottom-0 left-0 block h-0.5 w-5 bg-current transition-transform duration-300 ${
                  open ? "-translate-y-[6px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </nav>
      </div>

      {/* Menu mobilne: pelnoekranowa nakladka na papierze */}
      {open && (
        <div
          id="menu-mobilne"
          className="fixed inset-0 -z-10 flex flex-col bg-paper px-8 pb-10 pt-28 md:hidden"
        >
          <ul className="flex flex-col gap-2">
            {navItems.map((item, i) => (
              <li
                key={item.href}
                className="motion-safe:animate-menu-in"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <a
                  href={to(item.href)}
                  onClick={() => setOpen(false)}
                  className="type-h3 block py-2 text-ink"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div
            className="mt-auto flex flex-col gap-3 motion-safe:animate-menu-in"
            style={{ animationDelay: `${navItems.length * 60}ms` }}
          >
            <a
              href={siteConfig.contact.phoneHref}
              className="flex items-center justify-center gap-2 rounded-full border border-line px-6 py-3.5 text-center text-base font-medium text-ink"
            >
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              Zadzwoń: {siteConfig.contact.phone}
            </a>
            <a
              href={to("#cennik")}
              onClick={() => setOpen(false)}
              className="block rounded-full bg-accent px-6 py-3.5 text-center text-base font-medium text-white"
            >
              Wyceń stronę
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
