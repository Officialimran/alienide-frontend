import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

export interface ServiceSidebarProps {
  /** The service's tags ("What we do"), shown as plain text. */
  tags: string[];
  /** Every service, the current one flagged as active. */
  services: { label: string; href?: string; active?: boolean }[];
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className="h-[10px] w-[10px]">
      <path d="M3 8.5l3 3 7-7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CardTitle({ children, tone }: { children: string; tone: "dark" | "light" }) {
  return (
    <h2
      className={cn(
        "m-0 mb-[22px] flex items-center gap-[12px] font-anton text-[22px] leading-none font-normal uppercase",
        tone === "dark" ? "text-white" : "text-accent",
      )}
    >
      <span aria-hidden="true" className="h-[22px] w-[4px] rounded-full bg-primary" />
      {children}
    </h2>
  );
}

/**
 * Service detail sidebar: a dark "What we do" card with the service's
 * capabilities, then a numbered "All services" navigation card.
 * Sticks beside the overview on tablet and up.
 */
export function ServiceSidebar({ tags, services }: ServiceSidebarProps) {
  if (tags.length === 0 && services.length === 0) return null;

  return (
    <div className="flex flex-col gap-[20px] md:sticky md:top-[40px]">
      {tags.length > 0 && (
        <Reveal
          as="section"
          aria-label="What we do"
          className="relative overflow-hidden rounded-[24px] bg-dark px-[26px] pt-[32px] pb-[26px] xl:px-[34px]"
        >
          {/* Soft brand glow in the corner */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-[80px] -right-[80px] h-[200px] w-[200px] rounded-full bg-primary/25 blur-[70px]"
          />
          <div className="relative">
            <CardTitle tone="dark">What we do</CardTitle>
            <ul className="m-0 flex list-none flex-col p-0">
              {tags.map((tag) => (
                <li
                  key={tag}
                  className="flex items-center gap-[12px] border-b border-white/[0.08] py-[11px] font-unbounded text-[13px] leading-[1.45] font-normal text-white/80 last:border-b-0"
                >
                  <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <CheckIcon />
                  </span>
                  <span className="min-w-0 flex-1">{tag}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      )}

      {services.length > 1 && <ServicesNav services={services} />}
    </div>
  );
}

/**
 * "All services" navigation: black→navy card with a numbered tile
 * per service. Hover sweeps a frosted fill in from the left and slides the
 * arrow in; the current service is a mint row.
 */
function ServicesNav({ services }: { services: ServiceSidebarProps["services"] }) {
  return (
    <Reveal
      as="nav"
      aria-label="All services"
      delay={100}
      className="relative isolate overflow-hidden rounded-[24px] border border-white/10 p-[10px] text-white shadow-[0_30px_70px_-30px_rgba(15,31,77,0.8)]"
    >
      {/* Background: black → navy blend, with soft navy (top-left) and blue (bottom-right) glows */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(90%_55%_at_100%_100%,rgba(37,99,235,0.38)_0%,rgba(37,99,235,0)_65%),radial-gradient(80%_45%_at_0%_0%,rgba(30,58,138,0.45)_0%,rgba(30,58,138,0)_65%),linear-gradient(165deg,#05070d_0%,#0a1228_45%,#0f1f4d_100%)]"
      />
      {/* Fine top highlight */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-[24px] top-0 -z-10 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
      />
      <div className="flex items-center justify-between px-[16px] pt-[20px] pb-[16px]">
        <h2 className="m-0 flex items-center gap-[12px] font-anton text-[22px] leading-none font-normal text-white uppercase">
          <span aria-hidden="true" className="h-[22px] w-[4px] rounded-full bg-primary" />
          All services
        </h2>
        <span className="rounded-full bg-white/15 px-[10px] py-[5px] font-unbounded text-[11px] leading-none font-medium text-white ring-1 ring-white/20">
          {String(services.length).padStart(2, "0")}
        </span>
      </div>

      <ol className="m-0 flex list-none flex-col gap-[2px] p-0">
        {services.map((service, i) => {
          const number = String(i + 1).padStart(2, "0");
          const inner = (
            <>
              {/* Hover fill, sweeping in from the left */}
              {!service.active && (
                <span
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 origin-left scale-x-0 rounded-[inherit] bg-white/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
                />
              )}

              <span
                className={cn(
                  "flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-[12px] font-anton text-[14px] leading-none transition-all duration-300",
                  service.active
                    ? "bg-accent text-primary"
                    : "bg-white/[0.14] text-white/75 ring-1 ring-white/15 group-hover:bg-primary group-hover:text-accent group-hover:ring-primary",
                )}
              >
                {number}
              </span>

              <span
                className={cn(
                  "min-w-0 flex-1 font-anton text-[15px] leading-[1.3] uppercase transition-transform duration-300",
                  !service.active && "group-hover:translate-x-[3px]",
                )}
              >
                {service.label}
              </span>

              <span
                aria-hidden="true"
                className={cn(
                  "flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full text-[11px] transition-all duration-300",
                  service.active
                    ? "bg-accent text-primary"
                    : "-translate-x-[8px] bg-white text-accent opacity-0 group-hover:translate-x-0 group-hover:rotate-45 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100",
                )}
              >
                <Icon name="arrow-top-right" className={service.active ? undefined : "-rotate-45"} />
              </span>
            </>
          );

          const itemClass = cn(
            "group relative isolate flex items-center gap-[14px] overflow-hidden rounded-[16px] py-[8px] pr-[10px] pl-[8px] outline-none",
            service.active
              ? "bg-primary text-accent shadow-[0_10px_30px_-10px_rgba(45,244,161,0.6)]"
              : "text-white focus-visible:ring-2 focus-visible:ring-primary",
          );

          return (
            <li key={`${service.label}-${i}`}>
              {service.href ? (
                <Link href={service.href} aria-current={service.active ? "page" : undefined} className={itemClass}>
                  {inner}
                </Link>
              ) : (
                <span className={itemClass}>{inner}</span>
              )}
            </li>
          );
        })}
      </ol>
    </Reveal>
  );
}
