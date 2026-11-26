import Link from "next/link";
import { ImageMarquee } from "@/components/ui/ImageMarquee";
import type { LightboxImage } from "@/components/ui/Lightbox";
import { Reveal } from "@/components/ui/Reveal";
import { RichText } from "@/components/ui/RichText";
import type { GalleryItem } from "@/types";

/** A strip needs enough photos to fill the viewport before it loops. */
const MIN_PER_STRIP = 5;

function fill(images: LightboxImage[]): LightboxImage[] {
  if (images.length === 0) return images;
  const out = [...images];
  while (out.length < MIN_PER_STRIP) out.push(...images);
  return out;
}

interface StudioLifeSectionProps {
  heading?: string;
  /** CMS HTML. */
  description?: string;
  items: GalleryItem[];
  /** "Join us now" target; the call to action is hidden without it. */
  contactHref?: string;
}

/**
 * "Studio life" (CMS "Gallery" widget): dark rounded panel with two opposing
 * photo strips, followed by the "Let's build worlds" call to action.
 */
export function StudioLifeSection({ heading, description, items, contactHref }: StudioLifeSectionProps) {
  const photos: LightboxImage[] = items.filter((i) => i.kind === "image").map((i) => ({ src: i.src, alt: i.alt }));
  if (photos.length === 0 && !heading && !description) return null;

  // Two strips from alternating photos once there are enough to tell them apart.
  const strips = photos.length >= 4 ? [photos.filter((_, i) => i % 2 === 0), photos.filter((_, i) => i % 2 === 1)] : [photos];

  return (
    <section className="relative z-10 -mt-[60px] overflow-hidden rounded-section bg-dark py-[60px] mx:-mt-[80px] mx:py-[80px] xl:-mt-[100px] xl:py-[150px]">
      {/* Faded team photo in the top-right corner */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[url(/images/about/about-bg.png)] bg-contain bg-top-right bg-no-repeat opacity-10"
      />

      {(heading || description) && (
        <div className="site-container relative text-center md:text-left">
          {heading && (
            <Reveal
              as="h2"
              className="m-0 mb-[30px] font-anton text-[48px] leading-[1.1] font-normal text-white uppercase md:text-[62px] lg:text-[68px] xl:text-[80px]"
            >
              {heading}
            </Reveal>
          )}
          {description && (
            <Reveal className="mb-[30px] font-unbounded text-[16px] leading-[1.7] font-normal text-muted md:mb-[60px] md:max-w-[520px] md:text-[18px] xl:mb-[120px]">
              <RichText html={description} className="[&_p]:m-0 [&_p+p]:mt-4" />
            </Reveal>
          )}
        </div>
      )}

      {photos.length > 0 && (
        <div className="relative">
          {strips.map((strip, i) => (
            <Reveal key={i} className={i < strips.length - 1 ? "mb-[30px]" : undefined}>
              <ImageMarquee images={fill(strip)} reverse={i % 2 === 1} />
            </Reveal>
          ))}
        </div>
      )}

      {contactHref && (
        <div className="site-container relative mt-[60px] md:mt-[80px] xl:mt-[150px]">
          <Reveal as="h2" className="display-title m-0 mb-[13px] text-white">
            let’s build
          </Reveal>
          <div className="flex items-center">
            <Reveal as="p" className="display-title m-0 text-outline [--stroke-color:#fff]">
              worlds
            </Reveal>
            <Reveal className="ml-[13px] md:ml-[17px]">
              <Link
                href={contactHref}
                className="btn rounded-[80px] px-[30px] py-[10px] text-[15px] leading-[34px] hover:rounded-[80px] md:px-10 md:py-5 md:text-[24px] lg:px-[45px] lg:py-[30px] xl:px-20 xl:py-[45px]"
              >
                join us now
              </Link>
            </Reveal>
          </div>
        </div>
      )}
    </section>
  );
}
