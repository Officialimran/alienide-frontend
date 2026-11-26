/* eslint-disable @next/next/no-img-element -- icons are tiny, any host, sized in em */
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import type { Glyph } from "@/types";

interface GlyphIconProps {
  glyph: Glyph;
  /** Accessible name; also used for the letter fallback. */
  label: string;
  /** Hide from assistive tech (when the surrounding link already has a label). */
  decorative?: boolean;
  className?: string;
}

/**
 * Renders a theme icon-font glyph, an icon uploaded in the CMS, or —
 * when neither exists — the label's first letter, all sized by font-size.
 */
export function GlyphIcon({ glyph, label, decorative, className }: GlyphIconProps) {
  if (glyph.image) {
    return (
      <img
        src={glyph.image}
        alt={decorative ? "" : label}
        className={cn("inline-block h-[1em] w-auto max-w-[2em] object-contain", className)}
      />
    );
  }
  if (glyph.icon) return <Icon name={glyph.icon} label={decorative ? undefined : label} className={className} />;
  return (
    <span
      aria-hidden={decorative || undefined}
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : label}
      className={cn("font-anton leading-none uppercase", className)}>
      {label.charAt(0)}
    </span>
  );
}
