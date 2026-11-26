import Link from "next/link";
import { CmsImage } from "@/components/ui/CmsImage";
import { GlyphIcon } from "@/components/ui/GlyphIcon";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";
import type { DetailBadge } from "@/types";

interface DetailHeroProps {
  title: string;
  image?: string;
  /** Optional strip of icon tiles under the title (e.g. a project's platforms). */
  badgesHeading?: string;
  badges?: DetailBadge[];
}

function BadgeTile({ badge }: { badge: DetailBadge }) {
  const content = (
    <>
      <span
        className={cn(
          "mx-auto mb-[6px] flex h-[95px] w-[95px] items-center justify-center rounded-[10px] text-[40px] transition-all duration-300 group-hover:bg-primary group-hover:text-white",
          badge.active ? "bg-primary text-white" : "bg-black/80 text-muted",
        )}
      >
        <GlyphIcon glyph={badge} label={badge.label} decorative />
      </span>
      <span
        className={cn(
          "block max-w-[95px] font-anton text-[12px] leading-[1.3333] uppercase transition-colors duration-300 group-hover:text-white",
          badge.active ? "text-white" : "text-muted",
        )}
      >
        {badge.label}
      </span>
    </>
  );

  return badge.href ? (
    <Link href={badge.href} aria-current={badge.active ? "page" : undefined} className="group block p-[5px] text-center">
      {content}
    </Link>
  ) : (
    <span className="group block p-[5px] text-center">{content}</span>
  );
}

/** Full-viewport artwork hero: title, icon badges, white rounded bottom edge. */
export function DetailHero({ title, image, badgesHeading, badges = [] }: DetailHeroProps) {
  return (
    <section
      className={cn(
        "relative z-0 flex pt-[150px] pb-[100px]",
        // A title-only hero doesn't need the full viewport.
        badges.length > 0 ? "min-h-screen" : "min-h-[520px] md:min-h-[620px] xl:min-h-[720px]",
      )}
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        {image ? (
          <CmsImage src={image} alt="" fill priority sizes="100vw" className="object-cover" />
        ) : (
          <div className="absolute inset-0 bg-dark" />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-x-0 bottom-0 h-[70%] bg-[linear-gradient(180deg,rgba(0,0,0,0)_65.61%,#000000_91.99%)]" />
      </div>

      <div className="mx-auto flex w-full max-w-[1320px] flex-col px-[15px]">
        <h1 className="m-0 mt-auto text-center font-anton text-[80px] leading-[1.1] font-normal text-white uppercase">
          {title}
        </h1>

        {badges.length > 0 ? (
          <Reveal className="mt-auto mb-[47px] flex flex-col items-center text-muted">
            {badgesHeading && (
              <h2 className="m-0 mb-[10px] font-anton text-[24px] leading-[34px] font-normal text-muted">{badgesHeading}</h2>
            )}
            <ul className="-mx-[5px] m-0 flex list-none flex-wrap justify-center p-0">
              {badges.map((badge) => (
                <li key={badge.label}>
                  <BadgeTile badge={badge} />
                </li>
              ))}
            </ul>
          </Reveal>
        ) : (
          <div className="mt-auto" />
        )}
      </div>

      {/* White rounded edge the content starts on (100 / 80 / 60px). */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 z-[1] h-[60px] rounded-section bg-white md:h-[80px] lg:h-[100px]"
      />
    </section>
  );
}
