import { ButtonLink } from "@/components/ui/ButtonLink";
import { CmsImage } from "@/components/ui/CmsImage";
import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";
import { RichText } from "@/components/ui/RichText";
import { RotatingBadge } from "@/components/ui/RotatingBadge";
import { cn } from "@/lib/cn";
import type { OverviewCta, Stat } from "@/types";

export interface AboutSectionProps {
  heading: string;
  /** Part of the heading shown in the accent colour. */
  highlight?: string;
  image?: string;
  badgeText?: string;
  intro?: string;
  /** CMS HTML. */
  description?: string;
  stats: Stat[];
  cta?: OverviewCta;
}

/**
 * Splits the heading around the highlighted words (case-insensitive).
 * Highlighted words that are not part of the heading are added at its end.
 */
export function splitHeading(heading: string, highlight?: string): [string, string, string] {
  const words = highlight?.trim();
  if (!words) return [heading, "", ""];
  const at = heading.toLowerCase().indexOf(words.toLowerCase());
  if (at < 0) return [heading.trim() ? `${heading.trimEnd()} ` : "", words, ""];
  return [heading.slice(0, at), heading.slice(at, at + words.length), heading.slice(at + words.length)];
}

/** Studio overview (CMS "Overview" widget): heading, image, copy and animated stats. */
export function AboutSection({ heading, highlight, image, badgeText, intro, description, stats, cta }: AboutSectionProps) {
  const [before, accent, after] = splitHeading(heading, highlight);

  return (
    <section id="about" className="relative z-10 bg-white pb-[60px] md:pb-[80px] lg:pb-[100px] xl:pb-[150px]">
      <div className="site-container flex flex-wrap">
        {/* Story */}
        <div className={cn("flex w-full flex-wrap", stats.length > 0 ? "md:w-[70%] mx:w-[60%]" : "md:w-full")}>
          <Reveal
            as="h2"
            className="m-0 mb-10 w-full font-anton text-[36px] leading-[1.2] font-normal uppercase md:text-[42px] lg:text-[48px] xl:text-[54px] 2xl:mb-[55px]"
          >
            <span className="text-muted">{before}</span>
            {accent && <span className="text-accent">{accent}</span>}
            {after && <span className="text-muted">{after}</span>}
          </Reveal>

          {image && (
            <div className="relative w-full md:w-[35%]">
              <Reveal animation="image" className="img-zoom w-[245px] max-w-full rounded-[20px]">
                <CmsImage src={image} alt="" width={245} height={260} className="block h-auto w-full object-cover" />
              </Reveal>
              {badgeText && <RotatingBadge text={badgeText} className="absolute -top-[30px] left-[185px] hidden md:flex" />}
            </div>
          )}

          <div className={cn("w-full pt-[30px] md:pt-0", image && "md:w-[65%] md:pl-[30px] mx:pl-[20px] lg:pl-[35px]")}>
            <Reveal className="max-w-[400px] [&_p]:mb-[1.618em]">
              {intro && <p>{intro}</p>}
              <RichText html={description} />
            </Reveal>
            {cta && (
              <Reveal>
                <ButtonLink href={cta.href} variant="link" newTab={cta.newTab}>
                  {cta.label}
                </ButtonLink>
              </Reveal>
            )}
          </div>
        </div>

        {/* Stats */}
        {stats.length > 0 && (
          <div className="flex w-full flex-col items-start pt-[50px] md:w-[30%] md:pt-0 md:pl-[30px] mx:w-[40%] lg:pl-[50px]">
            {stats.map((stat, i) => (
              <Reveal key={`${stat.label}-${i}`} className="w-full">
                <Counter
                  to={stat.value}
                  suffix={stat.suffix}
                  className="block font-anton text-[80px] leading-[0.9] text-outline [--stroke-color:var(--color-primary)] mx:text-[100px] lg:text-[120px] xl:text-[140px]"
                />
                <p
                  className={cn(
                    "relative m-0 -mt-[15px] bg-white py-[7px] font-unbounded text-[16px] font-normal text-accent mx:-mt-[25px] mx:text-[18px]",
                    i < stats.length - 1 ? "mb-10 mx:mb-[60px] 2xl:mb-[110px]" : "mb-0 mx:mb-[5px]",
                  )}
                >
                  {stat.label}
                </p>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
