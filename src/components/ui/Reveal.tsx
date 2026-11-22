"use client";

import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/cn";

type Animation = "move-up" | "scale-up";

interface RevealProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  as?: ElementType;
  animation?: Animation;
  /** Delay in milliseconds. */
  delay?: number;
}

/**
 * Plays the theme's entrance animation (opalMoveUp / opalScaleUp)
 * once the element scrolls into view.
 */
export function Reveal({
  children,
  as: Tag = "div",
  animation = "move-up",
  delay = 0,
  className,
  style,
  ...rest
}: RevealProps) {
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <Tag
      ref={ref}
      data-animation={animation}
      className={cn("reveal", inView && "is-visible", className)}
      style={delay ? { ...style, animationDelay: `${delay}ms` } : style}
      {...rest}
    >
      {children}
    </Tag>
  );
}
