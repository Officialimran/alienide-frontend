"use client";

import { useEffect, useRef, useState } from "react";

interface Options {
  /** Fraction of the element that must be visible. */
  threshold?: number;
  rootMargin?: string;
  /** Stop observing after the first time it becomes visible. */
  once?: boolean;
}

type Listener = (entry: IntersectionObserverEntry) => void;

interface Pool {
  observer: IntersectionObserver;
  listeners: Map<Element, Listener>;
}

/**
 * One IntersectionObserver per (threshold, rootMargin) pair, shared by every
 * element that uses those options. A page has dozens of reveal-on-scroll
 * elements; sharing observers keeps the browser's intersection work (and the
 * callbacks it fires while scrolling) to a minimum.
 */
const pools = new Map<string, Pool>();

function getPool(threshold: number | number[], rootMargin: string): Pool {
  const key = `${String(threshold)}|${rootMargin}`;
  let pool = pools.get(key);
  if (!pool) {
    const listeners = new Map<Element, Listener>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) listeners.get(entry.target)?.(entry);
      },
      { threshold, rootMargin },
    );
    pool = { observer, listeners };
    pools.set(key, pool);
  }
  return pool;
}

/**
 * Observes `node` with a shared observer; returns the function that stops it.
 * Falls back to reporting "visible" when IntersectionObserver is unavailable.
 */
export function observeIntersection(
  node: Element,
  listener: Listener,
  { threshold = 0, rootMargin = "0px" }: { threshold?: number | number[]; rootMargin?: string } = {},
): () => void {
  if (typeof IntersectionObserver === "undefined") {
    listener({ isIntersecting: true, target: node } as IntersectionObserverEntry);
    return () => undefined;
  }
  const pool = getPool(threshold, rootMargin);
  pool.listeners.set(node, listener);
  pool.observer.observe(node);
  return () => {
    if (pool.listeners.get(node) !== listener) return;
    pool.listeners.delete(node);
    pool.observer.unobserve(node);
  };
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

    // `let`: the fallback path may call the listener before this is assigned.
    let stop: () => void = () => undefined;
    stop = observeIntersection(
      node,
      (entry) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) stop();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin },
    );
    return () => stop();
  }, [threshold, rootMargin, once]);

  return { ref, inView };
}
