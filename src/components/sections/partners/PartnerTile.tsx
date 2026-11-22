import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import type { Partner } from "@/data/partners";
import { cn } from "@/lib/cn";

/** Three wordmark treatments so placeholder logos don't all look alike. */
function PlaceholderMark({ partner, variant }: { partner: Partner; variant: number }) {
  const icon = partner.mark ?? "swords";

  if (variant === 1) {
    return (
      <span className="flex items-center gap-[2px] font-unbounded text-[14px] font-semibold tracking-tight whitespace-nowrap lowercase sm:text-[15px] md:text-[17px]">
        {partner.name}
        <span className="h-[7px] w-[7px] rounded-full bg-current transition-colors duration-300 group-hover:bg-primary" />
      </span>
    );
  }
  if (variant === 2) {
    return (
      <span className="flex flex-col items-center gap-1">
        <Icon name={icon} className="text-[26px] transition-colors duration-300 group-hover:text-primary" />
        <span className="font-unbounded text-[10px] font-semibold tracking-[0.2em] uppercase">{partner.name}</span>
      </span>
    );
  }
  return (
    <span className="flex items-center gap-[10px]">
      <Icon name={icon} className="text-[22px] transition-colors duration-300 group-hover:text-primary sm:text-[26px] md:text-[30px]" />
      <span className="font-anton text-[17px] leading-none tracking-[0.04em] whitespace-nowrap uppercase sm:text-[20px] md:text-[22px]">{partner.name}</span>
    </span>
  );
}

/**
 * One logo tile: muted/greyscale at rest; on hover it lifts, gains the theme's
 * soft shadow, shows the logo in full colour and slides in a green accent bar.
 */
export function PartnerTile({ partner, index }: { partner: Partner; index: number }) {
  const content = partner.logo ? (
    <Image
      src={partner.logo.src}
      alt={partner.name}
      width={partner.logo.width}
      height={partner.logo.height}
      className="max-h-[48px] w-auto max-w-[80%] object-contain opacity-60 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
    />
  ) : (
    <>
      <span className="sr-only">{partner.name}</span>
      <span aria-hidden="true" className="text-muted transition-colors duration-300 group-hover:text-accent">
        <PlaceholderMark partner={partner} variant={index % 3} />
      </span>
    </>
  );

  const tileClass = cn(
    "group relative flex h-[96px] items-center justify-center overflow-hidden rounded-[20px] bg-white px-4 md:h-[120px]",
    "transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_50px_0_rgba(0,0,0,0.07)] focus-visible:-translate-y-1 focus-visible:outline-2 focus-visible:outline-primary",
    // Green accent bar that grows from the centre on hover.
    "after:absolute after:bottom-0 after:left-1/2 after:h-[4px] after:w-0 after:-translate-x-1/2 after:bg-primary after:transition-all after:duration-300 after:content-[''] hover:after:w-full focus-visible:after:w-full",
  );

  return partner.href ? (
    <Link href={partner.href} className={tileClass} target="_blank" rel="noopener noreferrer">
      {content}
    </Link>
  ) : (
    <div className={tileClass} tabIndex={0}>
      {content}
    </div>
  );
}
