"use client";

import { useEffect, useRef, useState } from "react";
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
 * Sygnaturowy panel hero: szklana rama (aproksymacja liquid glass)
 * z zywa, dzialajaca mini-strona w srodku i chipami przelaczajacymi projekt.
 */
export function LivePreview() {
  const [variant, setVariant] = useState<ProjectId>("halo");
  const frameRef = useRef<HTMLDivElement>(null);
  const rafId = useRef(0);
  const lightEnabled = useRef(false);

  useEffect(() => {
    lightEnabled.current = window.matchMedia(
      "(hover: hover) and (prefers-reduced-motion: no-preference)"
    ).matches;
    return () => cancelAnimationFrame(rafId.current);
  }, []);

  function handlePointerMove(e: React.PointerEvent) {
    if (!lightEnabled.current) return;
    const el = frameRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - 160;
    const y = e.clientY - rect.top - 160;
    cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => {
      el.style.setProperty("--hx", `${x}px`);
      el.style.setProperty("--hy", `${y}px`);
    });
  }

  const project = projects.find((p) => p.id === variant)!;

  return (
    <div>
      <div
        ref={frameRef}
        onPointerMove={handlePointerMove}
        className="glass p-2"
      >
        {/* Pasek tytulowy panelu: sama domena, wycentrowana */}
        <div className="flex items-center justify-center pb-2.5 pt-1.5">
          <span className="font-mono text-[13px] tracking-tight text-ink">
            {project.domain}
          </span>
        </div>

        {/* Zywy podglad projektu (powoli sam sie przewija) */}
        <div className="overflow-hidden rounded-2xl border border-white/40">
          <div key={project.id} className="motion-safe:animate-preview-in">
            <MiniSiteFrame
              label={`Podgląd projektu strony: ${project.name}`}
              surface={project.surface}
              pan
            >
              {minisites[project.id]}
            </MiniSiteFrame>
          </div>
        </div>

        {/* Reaktywny odblask na szkle */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl"
        >
          <div className="glass-highlight" />
        </div>
      </div>

      {/* Przelacznik projektow */}
      <div
        role="group"
        aria-label="Wybierz projekt pokazowy"
        className="mt-4 flex flex-wrap gap-2"
      >
        {projects.map((p) => {
          const active = p.id === variant;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => setVariant(p.id)}
              aria-pressed={active}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors duration-150 ${
                active
                  ? "bg-ink text-paper"
                  : "bg-field text-ink-2 hover:text-ink"
              }`}
            >
              {p.chip}
            </button>
          );
        })}
      </div>
    </div>
  );
}
