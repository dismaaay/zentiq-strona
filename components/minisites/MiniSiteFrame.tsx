"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

const DESIGN_WIDTH = 720;

/**
 * Ramka skalująca mini-stronę: treść jest projektowana na sztywnej
 * szerokości 720 px (wysokość dowolna, zwykle 900) i skalowana transformem
 * do szerokości kontenera. Kadr pokazuje wycinek 4:3 (górne 540 px projektu).
 * Gdy `pan` jest włączone, treść powoli się przewija, odsłaniając dalszą
 * część strony, co dowodzi, że podgląd to żywy layout, nie zrzut ekranu.
 * Treść podglądu jest dekoracyjna (aria-hidden), całość opisuje role="img".
 */
export function MiniSiteFrame({
  children,
  label,
  surface,
  pan = false,
  className = "",
}: {
  children: ReactNode;
  /** Opis dla czytników ekranu, np. "Podgląd projektu strony: Studio Halo". */
  label: string;
  /** Kolor tła mini-strony (widoczny zanim policzy się skala). */
  surface: string;
  /** Czy podgląd ma się powoli auto-przewijać (tylko duże/sygnaturowe kadry). */
  pan?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width ?? 0;
      setScale(width / DESIGN_WIDTH);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      role="img"
      aria-label={label}
      // data-nosnippet: treść makiety to fikcyjne dane demo (nazwy, adresy, telefony,
      // opinie). Bez tego crawler/LLM może je zassać jako fakty o Zentiq
      // (np. „Zentiq to salon w Gdyni" albo demo-telefon jako nasz kontakt).
      data-nosnippet
      className={`relative aspect-[4/3] w-full overflow-hidden ${className}`}
      style={{ background: surface }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 origin-top-left select-none"
        style={{
          width: DESIGN_WIDTH,
          transform: `scale(${scale})`,
          visibility: scale > 0 ? "visible" : "hidden",
        }}
      >
        <div className={pan ? "minisite-pan" : ""}>{children}</div>
      </div>
    </div>
  );
}
