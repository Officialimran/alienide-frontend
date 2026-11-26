"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { observeIntersection } from "@/hooks/useInView";
import { cn } from "@/lib/cn";

/**
 * Port of Elementor Pro's "Motion Effects" used on the original theme
 * (data-settings motion_fx_*). Values are the same units as the CMS:
 *
 * - mouseTrack: element drifts with the cursor (speed 0.3 – 0.9 on the theme).
 * - tilt:       3D tilt towards the cursor (speed 4 on the theme).
 * - scrollScale: scales while the element crosses the viewport range.
 *     "out-in" = Scale Up (grows into place), "in-out" = Scale Down.
 * - scrollX:    slides horizontally while scrolling through the viewport.
 *
 * Effects are skipped for users who prefer reduced motion, and mouse effects
 * only run on devices with a fine pointer (as Elementor does).
 */
export interface MotionFxProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  mouseTrack?: { speed: number; negative?: boolean };
  tilt?: { speed: number };
  scrollScale?: { speed: number; direction?: "out-in" | "in-out"; range?: [number, number] };
  scrollX?: { speed: number; negative?: boolean; range?: [number, number] };
  /** Minimum viewport width (px) for the scroll effects; the theme turns some off on phones. */
  minWidth?: number;
}

type MotionOptions = Omit<MotionFxProps, "children" | "className" | "style">;

const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));

/* ------------------------------------------------------------------
 * Shared engine
 *
 * Every MotionFx on the page is driven by ONE scroll listener, ONE
 * mousemove listener and at most ONE requestAnimationFrame per frame.
 * Each frame first reads all layout (getBoundingClientRect) and only then
 * writes all transforms, so the browser lays out once per frame instead of
 * once per element (no layout thrashing). Elements far outside the viewport
 * are skipped entirely.
 * ------------------------------------------------------------------ */

interface Instance {
  node: HTMLElement;
  opts: MotionOptions;
  useMouse: boolean;
  useScroll: boolean;
  /** Within (or near) the viewport. */
  near: boolean;
  /** Needs an update on the next frame regardless of input. */
  force: boolean;
  /** Scroll progress through the viewport (0–100), measured in the read phase. */
  passed: number;
  wideEnough: boolean;
  transform: string;
}

const instances = new Set<Instance>();
let frame = 0;
let scrollDirty = false;
let mouseDirty = false;
// Mouse position as a percentage of the viewport (50/50 = centred).
let mx = 50;
let my = 50;
const listening = { scroll: false, mouse: false, resize: false };

function render() {
  frame = 0;
  const scrolled = scrollDirty;
  const moved = mouseDirty;
  scrollDirty = false;
  mouseDirty = false;

  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const due: Instance[] = [];

  // Read phase: layout is measured for every element before any is written.
  for (const inst of instances) {
    if (!inst.near) continue;
    const needs = inst.force || (scrolled && inst.useScroll) || (moved && inst.useMouse);
    if (!needs) continue;
    inst.force = false;
    inst.wideEnough = vw >= (inst.opts.minWidth ?? 0);
    if (inst.useScroll && inst.wideEnough) {
      const rect = inst.node.getBoundingClientRect();
      // 0% when the element's top enters at the bottom, 100% when its bottom leaves at the top.
      inst.passed = clamp((vh - rect.top) / (vh + rect.height)) * 100;
    }
    due.push(inst);
  }

  // Write phase.
  for (const inst of due) {
    const transform = buildTransform(inst);
    if (transform !== inst.transform) {
      inst.transform = transform;
      inst.node.style.transform = transform;
    }
  }
}

function buildTransform({ opts, useScroll, useMouse, wideEnough, passed }: Instance): string {
  const parts: string[] = [];

  if (useScroll && wideEnough) {
    if (opts.scrollX) {
      const [start, end] = opts.scrollX.range ?? [0, 100];
      const p = clamp((passed - start) / (end - start)) * 100;
      // Elementor: (50 - progress) × speed, "To left" by default.
      const sign = opts.scrollX.negative ? -1 : 1;
      parts.push(`translateX(${((50 - p) * opts.scrollX.speed * 2 * sign).toFixed(2)}px)`);
    }

    if (opts.scrollScale) {
      const [start, end] = opts.scrollScale.range ?? [20, 80];
      const t = clamp((passed - start) / (end - start));
      const amount = 0.2 * opts.scrollScale.speed;
      const scale = opts.scrollScale.direction === "in-out" ? 1 + amount * (1 - t) : 1 - amount * (1 - t);
      parts.push(`scale(${scale.toFixed(4)})`);
    }
  }

  if (useMouse) {
    const dx = mx - 50;
    const dy = my - 50;
    if (opts.mouseTrack) {
      const sign = opts.mouseTrack.negative ? 1 : -1;
      const k = opts.mouseTrack.speed * sign;
      parts.push(`translate(${(dx * k).toFixed(2)}px, ${(dy * k).toFixed(2)}px)`);
    }
    if (opts.tilt) {
      const k = opts.tilt.speed / 20;
      parts.unshift("perspective(1000px)");
      parts.push(`rotateX(${(-dy * k * 0.5).toFixed(2)}deg) rotateY(${(dx * k * 0.5).toFixed(2)}deg)`);
    }
  }

  return parts.join(" ");
}

function schedule() {
  if (!frame) frame = requestAnimationFrame(render);
}

function onScroll() {
  scrollDirty = true;
  schedule();
}

function onResize() {
  for (const inst of instances) inst.force = true;
  schedule();
}

function onMouse(e: MouseEvent) {
  mx = (e.clientX / window.innerWidth) * 100;
  my = (e.clientY / window.innerHeight) * 100;
  mouseDirty = true;
  schedule();
}

/** Attaches only the listeners the current instances need (none when there are none). */
function updateListeners() {
  let scroll = false;
  let mouse = false;
  for (const inst of instances) {
    scroll ||= inst.useScroll;
    mouse ||= inst.useMouse;
  }
  const any = instances.size > 0;

  if (scroll !== listening.scroll) {
    listening.scroll = scroll;
    if (scroll) window.addEventListener("scroll", onScroll, { passive: true });
    else window.removeEventListener("scroll", onScroll);
  }
  if (mouse !== listening.mouse) {
    listening.mouse = mouse;
    if (mouse) window.addEventListener("mousemove", onMouse, { passive: true });
    else window.removeEventListener("mousemove", onMouse);
  }
  if (any !== listening.resize) {
    listening.resize = any;
    if (any) window.addEventListener("resize", onResize, { passive: true });
    else window.removeEventListener("resize", onResize);
  }
  if (!any && frame) {
    cancelAnimationFrame(frame);
    frame = 0;
  }
}

export function MotionFx({
  children,
  className,
  style,
  mouseTrack,
  tilt,
  scrollScale,
  scrollX,
  minWidth = 0,
}: MotionFxProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Serialised so inline option objects don't re-run the effect on every render.
  const config = JSON.stringify({ mouseTrack, tilt, scrollScale, scrollX, minWidth });

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const opts = JSON.parse(config) as MotionOptions;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const inst: Instance = {
      node,
      opts,
      useMouse: finePointer && Boolean(opts.mouseTrack || opts.tilt),
      useScroll: Boolean(opts.scrollScale || opts.scrollX),
      near: true,
      force: true,
      passed: 0,
      wideEnough: true,
      transform: "",
    };
    if (!inst.useMouse && !inst.useScroll) return;

    instances.add(inst);
    updateListeners();
    schedule();

    // Pause the effect while the element is well outside the viewport. The
    // margin is wide enough that it is always up to date before it appears.
    const stopObserving = observeIntersection(
      node,
      (entry) => {
        inst.near = entry.isIntersecting;
        if (inst.near) {
          inst.force = true;
          schedule();
        }
      },
      { rootMargin: "50% 0px 50% 0px" },
    );

    return () => {
      stopObserving();
      instances.delete(inst);
      updateListeners();
      node.style.transform = "";
    };
  }, [config]);

  return (
    <div
      ref={ref}
      className={cn("will-change-transform", className)}
      // Mouse effects ease towards the cursor (Elementor's mouse transition); scroll effects follow the scroll exactly.
      style={{ transition: mouseTrack || tilt ? "transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)" : undefined, ...style }}
    >
      {children}
    </div>
  );
}
