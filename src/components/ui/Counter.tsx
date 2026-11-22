"use client";

import { useEffect, useState } from "react";
import { useInView } from "@/hooks/useInView";

interface CounterProps {
  to: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

/** Counts from 0 to `to` once visible (Elementor counter widget behaviour). */
export function Counter({ to, suffix = "", duration = 2000, className }: CounterProps) {
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold: 0.5 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(to);
      return;
    }
    let frame = 0;
    const startTime = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(eased * to));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, to, duration]);

  return (
    <span ref={ref} className={className} aria-label={`${to}${suffix}`}>
      <span aria-hidden="true">
        {value}
        {suffix}
      </span>
    </span>
  );
}
