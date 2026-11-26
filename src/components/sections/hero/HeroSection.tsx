import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/ui/Reveal";
import type { HeroVideo } from "@/lib/video";
import { HeroBackground } from "./HeroBackground";

const titleSize = "text-[48px] md:text-[72px] lg:text-[100px] xl:text-[140px]";

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  /** Banner link; the button is hidden without one. */
  href?: string;
  /** The backend has no button-text field for banners. */
  buttonLabel?: string;
  image: string;
  /** Smaller artwork for phones (banner "cover_sd"). */
  imageMobile?: string;
  /** Banner video, loaded 3s after the image has fully loaded. */
  video?: HeroVideo;
}

/**
 * Home hero, driven by the first active banner (GET /banners).
 * 115% of the screen tall (it grows only if the content needs more room), so
 * the artwork runs past the fold. The extra 15% is added to the bottom padding,
 * keeping the text centred in the first screen below the header that overlays
 * the hero.
 */
export function HeroSection({ title, subtitle, href, buttonLabel = "learn more", image, imageMobile, video }: HeroSectionProps) {
  return (
    <section className="relative flex min-h-[115svh] flex-col justify-center overflow-hidden bg-dark pt-[120px] pb-[calc(60px+15svh)]">
      {/* Art-directed image first; the video replaces it once loaded. */}
      <HeroBackground image={image} imageMobile={imageMobile} video={video} />
      <div aria-hidden="true" className="absolute inset-0 bg-black/40" />

      <div className="site-container relative z-10">
        <h1 className="m-0 mb-5 font-anton leading-[0.95] font-normal text-white uppercase">
          <Reveal as="span" className={`block ${titleSize}`}>
            {title}
          </Reveal>
        </h1>

        {subtitle && (
          <Reveal className="mb-[30px] max-w-[640px] font-unbounded text-[16px] leading-[1.7] font-normal text-white md:mb-10 md:text-[18px]">
            {subtitle}
          </Reveal>
        )}

        {href && (
          <Reveal>
            <ButtonLink href={href} className="max-md:!px-[25px] max-md:!py-[15px]">
              {buttonLabel}
            </ButtonLink>
          </Reveal>
        )}
      </div>
    </section>
  );
}
