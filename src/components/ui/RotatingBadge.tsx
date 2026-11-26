import { cn } from "@/lib/cn";

/** Circular text that slowly spins (e.g. "Indie Games Studio"), as on the theme's badges. */
export function RotatingBadge({ text, className }: { text: string; className?: string }) {
  const label = `${text} • ${text} • `;
  return (
    <span
      aria-hidden="true"
      className={cn("flex h-[100px] w-[100px] items-center justify-center rounded-full bg-primary", className)}
    >
      <svg viewBox="0 0 100 100" className="h-full w-full animate-spin-slow motion-safe-only">
        <defs>
          <path id="rotating-badge-circle" d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0" />
        </defs>
        <text className="fill-accent font-anton uppercase" fontSize="10.5" letterSpacing="1.2">
          <textPath href="#rotating-badge-circle" textLength="224">
            {label}
          </textPath>
        </text>
      </svg>
    </span>
  );
}
