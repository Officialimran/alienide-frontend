"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { usePauseOffscreen } from "@/hooks/usePauseOffscreen";
import { cn } from "@/lib/cn";

/**
 * Speed references taken from the original theme (Gamico "slide scrolling" widget):
 *   .elementor-scrolling-inner { animation: marquee 40s linear infinite }
 *   @keyframes marquee { 100% { transform: translate(-100%) } }
 * i.e. each group travels its own width — the width of these words — in 40s.
 * Our strips show CMS content of any length, so the duration is scaled by
 * (rendered width ÷ width of the reference words in the same styles), which
 * reproduces the reference speed exactly at every breakpoint.
 */
const MARQUEE_PACE = {
  /** demo2.wpopal.com/gamico/services/ */
  services: { items: ["Community", "Free to Play", "Responsibility", "Humble"], seconds: 40 },
  /** Home page strip of the original build. */
  home: { items: ["Game development", "Game design", "Art direction", "Multiplatform development"], seconds: 40 },
} as const;

interface MarqueePace {
  items: readonly string[];
  seconds: number;
}

/** Which reference speed a strip uses (a key, so server components can pass it). */
export type MarqueePaceName = keyof typeof MARQUEE_PACE;

interface TextMarqueeProps {
  items: string[];
  href?: string;
  label: string;
  /** Font-size classes for the words. */
  titleClassName?: string;
  className?: string;
  /** Reference speed: "services" (theme services page) or "home". */
  pace?: MarqueePaceName;
}

/** Character-count estimate, used only until the strip has been measured in the browser. */
function estimateSeconds(items: readonly string[], pace: MarqueePace): number {
  const units = (list: readonly string[]) => list.reduce((sum, item) => sum + item.length + 6, 0);
  return (pace.seconds * Math.max(units(items), 1)) / units(pace.items);
}

const itemClass = "mx-[25px] flex shrink-0 items-center gap-[50px]";
const wordClass = "font-anton leading-none whitespace-nowrap text-accent uppercase";

/** Endless strip of big uppercase words separated by the spinning "indie games studio" badge. */
export function TextMarquee({
  items,
  href = "#",
  label,
  titleClassName = "text-[42px] md:text-[60px] lg:text-[80px]",
  className,
  pace: paceName = "home",
}: TextMarqueeProps) {
  const pace: MarqueePace = MARQUEE_PACE[paceName];
  const trackRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLUListElement>(null);
  const referenceRef = useRef<HTMLUListElement>(null);
  const [seconds, setSeconds] = useState(() => estimateSeconds(items, pace));
  // Copies of the group; at least 3 (as on the theme), more if the content is short.
  const [copies, setCopies] = useState(3);
  usePauseOffscreen(trackRef);

  useLayoutEffect(() => {
    const track = trackRef.current;
    const group = groupRef.current;
    const reference = referenceRef.current;
    if (!track || !group || !reference) return;

    const measure = () => {
      const groupWidth = group.getBoundingClientRect().width;
      const referenceWidth = reference.getBoundingClientRect().width;
      if (!groupWidth || !referenceWidth) return;
      setSeconds(pace.seconds * (groupWidth / referenceWidth));
      // The track starts shifted left by half its width (theme behaviour), and each
      // group travels one group width, so the copies must cover 1.5× the track + one group.
      const needed = Math.ceil((track.getBoundingClientRect().width * 1.5) / groupWidth) + 1;
      setCopies(Math.max(3, needed));
    };

    measure();
    // Re-measure on resize and when the web font finishes loading (widths change).
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    ro.observe(group);
    ro.observe(reference);
    return () => ro.disconnect();
  }, [items, pace]);

  // Set on the element itself: Tailwind resolves var(--marquee-duration) inside
  // --animate-marquee at :root, so a custom property on an ancestor has no effect.
  const animationStyle: CSSProperties = { animationDuration: `${seconds.toFixed(2)}s` };

  return (
    <Reveal className={cn("group/marquee relative flex overflow-hidden", className)} aria-label={label}>
      {/* Theme: .elementor-scrolling-wrapper { white-space: nowrap; transform: translateX(-50%) } */}
      <div ref={trackRef} className="flex w-full shrink-0 -translate-x-1/2">
        {Array.from({ length: copies }, (_, g) => (
          <ul
            key={g}
            ref={g === 0 ? groupRef : undefined}
            aria-hidden={g > 0}
            style={animationStyle}
            className="m-0 flex shrink-0 animate-marquee list-none items-center p-0 group-hover/marquee:[animation-play-state:paused] motion-safe-only"
          >
            {items.map((item, i) => (
              <li key={`${item}-${i}`} className={itemClass}>
                <Image
                  src="/images/marquee.png"
                  alt=""
                  width={100}
                  height={100}
                  className="w-[98px] animate-spin-slow motion-safe-only"
                />
                <Link
                  href={href}
                  tabIndex={g > 0 ? -1 : undefined}
                  className={cn(wordClass, "transition-colors duration-300 hover:text-primary", titleClassName)}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        ))}
      </div>

      {/* Invisible copy of the reference words in the same styles: the speed yardstick. */}
      <ul
        ref={referenceRef}
        aria-hidden="true"
        className="pointer-events-none invisible absolute top-0 left-0 m-0 flex w-max list-none items-center p-0"
      >
        {pace.items.map((item) => (
          <li key={item} className={itemClass}>
            <span className="block w-[98px] shrink-0" />
            <span className={cn(wordClass, titleClassName)}>{item}</span>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
