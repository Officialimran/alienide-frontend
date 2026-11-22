"use client";

import { useEffect, useRef, useState } from "react";
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
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [covered, setCovered] = useState<boolean[]>(() => projects.map(() => false));

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const items = itemRefs.current;
      const next = items.map((el, i) => {
        const below = items[i + 1];
        if (!el || !below) return false;
        return below.getBoundingClientRect().top < el.getBoundingClientRect().bottom - 1;
      });
      setCovered((prev) => (prev.every((v, i) => v === next[i]) ? prev : next));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="grid gap-[30px] [--offset:30px] md:[--offset:80px]">
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
