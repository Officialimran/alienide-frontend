import { CmsImage } from "@/components/ui/CmsImage";
import { FeatureIcon } from "@/components/ui/FeatureIcon";
import { Reveal } from "@/components/ui/Reveal";
import { RichText } from "@/components/ui/RichText";
import { cn } from "@/lib/cn";
import type { DetailFeature } from "@/types";

/** Image margins under each feature picture, as set individually on the original. */
const imageGap = ["md:mb-[50px]", "md:mb-[45px]", "md:mb-[30px]", "md:mb-[55px]"];

/** Heading with a black rule above, used by the features and gallery blocks. */
export function RuledHeading({ children }: { children: string }) {
  return (
    <Reveal
      as="h2"
      className="m-0 mb-[60px] border-t-[5px] border-accent pt-[60px] text-center font-anton text-[54px] leading-[64px] font-normal text-accent uppercase mx:pt-[80px] xl:pt-[100px]"
    >
      {children}
    </Reveal>
  );
}

/** 2×2 grid of illustrated features (stacked on mobile). */
export function DetailFeatures({
  heading,
  description,
  features,
}: {
  heading: string;
  /** CMS HTML shown under the heading. */
  description?: string;
  features: DetailFeature[];
}) {
  const last = features.length - 1;
  if (features.length === 0) return null;

  return (
    <section className="site-container mb-[60px] mx:mb-[80px] xl:mb-[150px]">
      <RuledHeading>{heading}</RuledHeading>
      {description && (
        <Reveal className="mx-auto -mt-[30px] mb-[60px] max-w-[760px] text-center">
          <RichText html={description} className="[&_p]:m-0 [&_p+p]:mt-4" />
        </Reveal>
      )}
      <ul className="m-0 flex list-none flex-wrap p-0">
        {features.map((f, i) => {
          const lastRow = i >= features.length - (features.length % 2 || 2);
          return (
            <li
              key={`${f.title}-${i}`}
              className={cn(
                "w-full text-center md:w-1/2 xl:px-[80px]",
                i % 2 === 0 ? "md:pr-[40px]" : "md:pl-[40px]",
                i === last ? "" : lastRow ? "mb-[60px] md:mb-0" : "mb-[60px] mx:mb-[80px]",
              )}
            >
              <Reveal>
                {f.image ? (
                  <CmsImage
                    src={f.image.src}
                    alt={f.title}
                    width={f.image.w}
                    height={f.image.h}
                    className={cn("mx-auto mb-[30px] h-auto max-h-[330px] w-auto max-w-full", imageGap[i % imageGap.length])}
                  />
                ) : (
                  f.icon && (
                    <span className="mx-auto mb-[30px] flex h-[160px] w-[160px] items-center justify-center rounded-full bg-beige text-[72px] text-primary md:mb-[40px] xl:h-[200px] xl:w-[200px] xl:text-[96px]">
                      <FeatureIcon icon={f.icon} />
                    </span>
                  )
                )}
                <h3 className="m-0 mb-[15px] font-anton text-[24px] leading-none font-normal text-accent uppercase">
                  {f.title}
                </h3>
                {f.text && <p className="m-0 whitespace-pre-line">{f.text}</p>}
              </Reveal>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
