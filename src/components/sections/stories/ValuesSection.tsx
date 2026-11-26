import { CmsImage } from "@/components/ui/CmsImage";
import { FeatureIcon } from "@/components/ui/FeatureIcon";
import { Reveal } from "@/components/ui/Reveal";
import { RichText } from "@/components/ui/RichText";
import { cn } from "@/lib/cn";
import type { DetailFeature } from "@/types";

interface ValuesSectionProps {
  heading?: string;
  /** CMS HTML shown under the heading. */
  description?: string;
  values: DetailFeature[];
  /** Draw the green rule above (when something precedes it in the panel). */
  ruled?: boolean;
}

/**
 * "Our values" (CMS "Features" widget): one row of illustrated values
 * separated by soft vertical rules (2 per row on tablet, stacked on mobile).
 */
export function ValuesSection({ heading, description, values, ruled = true }: ValuesSectionProps) {
  if (values.length === 0) return null;

  return (
    <div className={cn(ruled && "border-t-[5px] border-primary pt-[60px] mx:pt-[80px] xl:pt-[150px]")}>
      {heading && (
        <Reveal
          as="h2"
          className="m-0 mb-[30px] text-center font-anton text-[48px] leading-[1.1] font-normal text-accent uppercase md:text-[62px] lg:text-[68px] xl:text-[80px]"
        >
          {heading}
        </Reveal>
      )}
      {description && (
        <Reveal className="mx-auto mb-[50px] max-w-[630px] text-center font-unbounded text-[16px] leading-[1.7] font-normal md:text-[18px] xl:mb-[85px]">
          <RichText html={description} className="[&_p]:m-0 [&_p+p]:mt-4" />
        </Reveal>
      )}

      <Reveal>
        <ul className="m-0 flex list-none flex-wrap p-0 mx:flex-nowrap">
          {values.map((value, i) => (
            <li
              key={`${value.title}-${i}`}
              className={cn(
                "relative w-full px-[15px] pb-[30px] text-center md:w-1/2 mx:w-auto mx:flex-1 mx:pb-0 xl:px-[30px] 2xl:pr-[50px] 2xl:pl-[40px]",
                i < values.length - 2 && "md:pb-[60px] mx:pb-0",
                i > 0 &&
                  "mx:before:absolute mx:before:inset-y-0 mx:before:left-0 mx:before:w-px mx:before:bg-[radial-gradient(at_center_center,#00000026_0%,#ffffff_100%)] mx:before:content-['']",
              )}
            >
              {value.image ? (
                <CmsImage
                  src={value.image.src}
                  alt=""
                  width={195}
                  height={195}
                  sizes="195px"
                  // Fixed width as on the design: with w-auto a 195px upload shows at half size on HiDPI screens.
                  className="mx-auto mb-[25px] aspect-square h-auto w-[195px] max-w-full object-contain transition-transform duration-300 hover:scale-105"
                />
              ) : (
                value.icon && (
                  <span className="mx-auto mb-[25px] flex aspect-square w-[195px] max-w-full items-center justify-center rounded-full bg-beige text-[90px] text-primary transition-transform duration-300 hover:scale-105">
                    <FeatureIcon icon={value.icon} />
                  </span>
                )
              )}
              <h3 className="m-0 mb-[13px] font-anton text-[30px] leading-[1.3333] font-normal text-accent uppercase">
                {value.title}
              </h3>
              {value.text && <p className="m-0 whitespace-pre-line">{value.text}</p>}
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
}
