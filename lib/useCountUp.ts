import { useEffect, useRef, useState } from "react";

/**
 * Animowany licznik rosnący (0 -> target), uruchamiany gdy `active` = true.
 * rAF, ease-out. Przy prefers-reduced-motion skacze od razu do wartości.
 */
export function useCountUp(target: number, active: boolean, durationMs = 1500) {
  const [value, setValue] = useState(0);
  const raf = useRef(0);

  useEffect(() => {
    if (!active) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setValue(target);
      return;
    }
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [target, active, durationMs]);

  return value;
}
