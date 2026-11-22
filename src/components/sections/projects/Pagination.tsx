import Link from "next/link";
import { cn } from "@/lib/cn";

interface PaginationProps {
  page: number;
  totalPages: number;
  /** Builds the href for a given page number (keeps active filters). */
  hrefFor: (page: number) => string;
}

const box =
  "inline-flex h-[50px] w-[50px] items-center justify-center font-unbounded text-[12px] leading-[50px] font-semibold uppercase transition-all duration-300";

function Arrow({ dir }: { dir: "prev" | "next" }) {
  return (
    <svg width="8" height="14" viewBox="0 0 8 14" fill="none" aria-hidden="true" className={dir === "prev" ? "rotate-180" : ""}>
      <path d="M1 1l6 6-6 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Pagination({ page, totalPages, hrefFor }: PaginationProps) {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const idle = cn(box, "bg-white text-muted shadow-[inset_0_0_0_1px_var(--color-line)] hover:text-accent");

  return (
    <nav aria-label="Projects pagination" className="mt-[60px]">
      <ul className="m-0 flex list-none flex-wrap items-center p-0">
        {page > 1 && (
          <li>
            <Link href={hrefFor(page - 1)} aria-label="Previous page" className={cn(idle, "text-accent")}>
              <Arrow dir="prev" />
            </Link>
          </li>
        )}
        {pages.map((n) => (
          <li key={n}>
            {n === page ? (
              <span
                aria-current="page"
                className={cn(box, "bg-primary text-accent shadow-[inset_0_0_0_1px_var(--color-primary)]")}
              >
                {n}
              </span>
            ) : (
              <Link href={hrefFor(n)} className={idle}>
                {n}
              </Link>
            )}
          </li>
        ))}
        {page < totalPages && (
          <li>
            <Link href={hrefFor(page + 1)} aria-label="Next page" className={cn(idle, "text-accent")}>
              <Arrow dir="next" />
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
