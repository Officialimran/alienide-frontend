import { splitHeading } from "@/components/sections/AboutSection";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { CmsImage } from "@/components/ui/CmsImage";
import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";
import { RichText } from "@/components/ui/RichText";
import { RotatingBadge } from "@/components/ui/RotatingBadge";
import { cn } from "@/lib/cn";
import type { OverviewCta, Stat } from "@/types";

export interface StoryOverviewProps {
  heading?: string;
  /** Part of the heading shown in the primary colour. */
  highlight?: string;
  image?: string;
  /** Spinning badge text next to the heading (e.g. "Indie Games Studio"). */
  badgeText?: string;
  intro?: string;
  /** CMS HTML. */
  description?: string;
  stats: Stat[];
  /** "Learn More" button under the copy. */
  cta?: OverviewCta;
}

/** "The Stories" intro (CMS "Overview" widget): photo beside the story, then a row of animated counters. */
export function StoryOverview({ heading, highlight, image, badgeText, intro, description, stats, cta }: StoryOverviewProps) {
  const [before, accent, after] = splitHeading(heading ?? "", highlight);
  const hasStory = Boolean(heading || intro || description || image || cta);

  return (
    <>
      {hasStory && (
        <div className="mb-[60px] flex flex-col md:mb-[80px] md:flex-row md:items-center xl:mb-[120px]">
          {image && (
            <div className="w-full md:w-1/2">
              <Reveal animation="image" className="img-zoom rounded-[20px] md:rounded-[40px]">
                <CmsImage
                  src={image}
                  alt={heading ?? ""}
                  width={660}
                  height={570}
                  priority
                  className="mx-auto block h-auto w-full object-cover"
                />
              </Reveal>
            </div>
          )}

          <div
            className={cn(
              "relative w-full",
              image ? "pt-[40px] md:w-1/2 md:pt-0 md:pl-[30px] lg:pl-[60px] xl:pl-[70px]" : "mx-auto max-w-[960px]",
            )}
          >
            {badgeText && <RotatingBadge text={badgeText} className="absolute -top-[10px] right-0 hidden xl:flex" />}
            {heading && (
              <Reveal
                as="h2"
                className={cn(
                  "relative z-[1] m-0 mb-[30px] text-center font-anton text-[36px] leading-[1.2] font-normal tracking-[-1px] text-accent uppercase md:text-left md:text-[40px] mx:text-[42px] lg:mb-[35px] lg:text-[48px] xl:mb-[40px] xl:text-[54px]",
                  badgeText && "xl:mr-[110px]",
                )}
              >
                {before}
                {accent && <span className="text-primary">{accent}</span>}
                {after}
              </Reveal>
            )}
            {intro && (
              <Reveal className="mb-[20px] text-center font-unbounded text-[16px] leading-[1.7] font-normal text-accent md:text-left md:text-[18px]">
                {intro}
              </Reveal>
            )}
            {description && (
              <Reveal className="text-center md:text-left">
                <RichText html={description} className="[&_p]:m-0 [&_p+p]:mt-4" />
              </Reveal>
            )}
            {cta && (
              <Reveal className="mt-[30px] text-center md:text-left xl:mt-[35px]">
                <ButtonLink href={cta.href} newTab={cta.newTab}>
                  {cta.label}
                </ButtonLink>
              </Reveal>
            )}
          </div>
        </div>
      )}

      {stats.length > 0 && (
        <Reveal className="mb-[60px] flex flex-col md:mb-[80px] md:flex-row xl:mb-[150px]">
          {stats.map((stat, i) => (
            <div key={`${stat.label}-${i}`} className="w-full pb-[30px] text-center md:flex-1 md:pb-0">
              <Counter
                to={stat.value}
                suffix={stat.suffix}
                className="-mb-[15px] block font-anton text-[80px] leading-[0.95] uppercase text-outline [--stroke-color:var(--color-primary)] md:text-[100px] mx:-mb-[25px] xl:text-[140px]"
              />
              <p className="relative m-0 bg-white px-5 py-[7px] font-unbounded text-[18px] font-normal text-accent">
                {stat.label}
              </p>
            </div>
          ))}
        </Reveal>
      )}
    </>
  );
}
