import { cn } from "@/lib/cn";

export function Chevron({ className }: { className?: string }) {
  return (
    <svg
      className={cn("h-[6px] w-[10px]", className)}
      viewBox="0 0 10 6"
      fill="none"
      aria-hidden="true"
    >
      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
