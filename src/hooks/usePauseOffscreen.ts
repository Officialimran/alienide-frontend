"use client";

import { useEffect, type RefObject } from "react";
import { observeIntersection } from "@/hooks/useInView";

/**
 * Marks `ref`'s element with `data-offscreen` while it is outside the viewport
 * (plus a margin), which pauses its CSS loop animations (see globals.css).
 * Endless marquees and spinners then cost nothing while nobody can see them,
 * and resume exactly where they stopped before they scroll back into view.
 * The attribute is set directly on the DOM node: no React re-render.
 */
export function usePauseOffscreen(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const stop = observeIntersection(
      node,
      (entry) => {
        if (entry.isIntersecting) node.removeAttribute("data-offscreen");
        else node.setAttribute("data-offscreen", "");
      },
      { rootMargin: "25% 0px 25% 0px" },
    );
    return () => {
      stop();
      node.removeAttribute("data-offscreen");
    };
  }, [ref]);
}
