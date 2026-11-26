"use client";

import { useEffect, useRef, useState } from "react";
import { observeIntersection } from "@/hooks/useInView";
import type { Project } from "@/types";
import { ProjectCard } from "./ProjectCard";

interface StackedProjectsProps {
  projects: Project[];
}

/**
 * Sticky "card stack": each card pins 40px lower than the previous one
 * and shrinks slightly once the next card slides over it.
 */
export function StackedProjects({ projects }: StackedProjectsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [covered, setCovered] = useState<boolean[]>(() => projects.map(() => false));

  useEffect(() => {
    const container = containerRef.current;
    let frame = 0;
    let listening = false;
    const measure = () => {
      frame = 0;
      const items = itemRefs.current;
      // All rects are read in one pass (a single layout), then compared.
      const rects = items.map((el) => el?.getBoundingClientRect());
      const next = items.map((el, i) => {
        const rect = rects[i];
        const below = rects[i + 1];
        if (!rect || !below) return false;
        return below.top < rect.bottom - 1;
      });
      setCovered((prev) => (prev.every((v, i) => v === next[i]) ? prev : next));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    const listen = (on: boolean) => {
      if (on === listening) return;
      listening = on;
      if (on) {
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll, { passive: true });
        onScroll();
      } else {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      }
    };

    measure();
    // Only track scrolling while the stack is on (or a screen away from) the screen.
    const stopObserving = container
      ? observeIntersection(container, (entry) => listen(entry.isIntersecting), { rootMargin: "100% 0px 100% 0px" })
      : (listen(true), () => undefined);

    return () => {
      stopObserving();
      listen(false);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={containerRef} className="grid gap-[30px] [--offset:30px] md:[--offset:80px]">
      {projects.map((project, i) => (
        <div
          key={project.title}
          ref={(el) => {
            itemRefs.current[i] = el;
          }}
          className="sticky"
          style={{ top: `calc(${i} * 40px + var(--offset))` }}
        >
          <ProjectCard project={project} scaled={covered[i]} />
        </div>
      ))}
    </div>
  );
}
