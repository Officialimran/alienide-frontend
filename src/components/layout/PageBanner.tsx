import Link from "next/link";
import { Fragment } from "react";
import { cn } from "@/lib/cn";

interface Crumb {
  label: string;
  href?: string;
}

interface PageBannerProps {
  /** Solid first word(s) of the title (omit for a breadcrumb-only banner). */
  solid?: string;
  /** Outlined remainder of the title. */
  outline?: string;
  image: string;
  crumbs: Crumb[];
  /**
   * "page": the next section overlaps the banner by 100px (pages built in the page builder).
   * "archive": the banner ends in its own white rounded spacer and adds a bottom gradient (listing pages).
   * "compact": shorter, breadcrumb only, ends in its own spacer (e.g. the 404 page).
   */
  variant?: "page" | "archive" | "compact";
}

/** Inner-page hero: darkened photo, big two-tone title and a breadcrumb trail. */
export function PageBanner({ solid, outline, image, crumbs, variant = "page" }: PageBannerProps) {
  const archive = variant === "archive";
  const compact = variant === "compact";
  const ownSpacer = archive || compact;

  return (
    <section
      className={cn(
        "relative flex flex-col justify-end overflow-hidden bg-dark bg-cover bg-center",
        compact ? "min-h-[350px] lg:min-h-[450px]" : "min-h-[430px] md:min-h-[530px] lg:min-h-[630px] xl:min-h-[730px]",
      )}
      style={{ backgroundImage: `url(${image})` }}
    >
      <div aria-hidden="true" className="absolute inset-0 bg-black/50" />
      {archive && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_65%,#000_90%)] opacity-80"
        />
      )}

      <div className={cn("site-container relative z-10 text-center", !ownSpacer && "pb-[100px]")}>
        {solid && (
        <h1
          className={cn(
            "m-0 font-anton text-[42px] leading-none font-normal text-white uppercase md:text-[80px] lg:text-[100px] xl:text-[140px]",
            archive
              ? "mb-[100px] md:mb-[120px] lg:mb-[150px] xl:mb-[185px]"
              : "mb-[60px] md:mb-[120px] xl:mb-[185px]",
          )}
        >
          {solid} <span className="text-outline [--stroke-color:#fff]">{outline}</span>
        </h1>
        )}

        <nav
          aria-label="Breadcrumb"
          className={cn(
            "relative py-[17px] text-[12px] leading-[2] font-normal",
            "before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-[linear-gradient(270deg,rgba(255,255,255,0)_7.57%,#fff_53.21%,rgba(255,255,255,0)_89.77%)] before:content-['']",
            compact ? "text-white" : "text-muted",
          )}
        >
          <ol className="m-0 inline-flex list-none flex-wrap items-center justify-center p-0">
            {crumbs.map((crumb, i) => (
              <Fragment key={crumb.label}>
                {i > 0 && (
                  <li aria-hidden="true" className="mx-5 flex">
                    <svg width="5" height="7" viewBox="0 0 5 7" className="text-primary">
                      <path d="M0 0l5 3.5L0 7z" fill="currentColor" />
                    </svg>
                  </li>
                )}
                <li>
                  {crumb.href ? (
                    <Link href={crumb.href} className="transition-colors hover:text-primary">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span aria-current="page">{crumb.label}</span>
                  )}
                </li>
              </Fragment>
            ))}
          </ol>
        </nav>
      </div>

      {ownSpacer && (
        <div aria-hidden="true" className="relative z-10 h-[60px] rounded-section bg-white md:h-[80px] lg:h-[100px]" />
      )}
    </section>
  );
}
