"use client";

import { useEffect, useRef, useState } from "react";

interface Options {
  /** Fraction of the element that must be visible. */
  threshold?: number;
  rootMargin?: string;
  /** Stop observing after the first time it becomes visible. */
  once?: boolean;
}

export function useInView<T extends Element>({
  threshold = 0.1,
  rootMargin = "0px 0px -40px 0px",
  once = true,
}: Options = {}) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, inView };
}
