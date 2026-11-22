import Link from "next/link";
import { ImageMarquee } from "@/components/ui/ImageMarquee";
import { Reveal } from "@/components/ui/Reveal";
import { studioGalleryBottom, studioGalleryTop } from "@/data/stories";

/** Dark rounded panel: intro, two opposing photo strips and the "Let's build worlds" call to action. */
export function StudioLifeSection() {
  return (
    <section className="relative z-10 -mt-[60px] overflow-hidden rounded-section bg-dark py-[60px] mx:-mt-[80px] mx:py-[80px] xl:-mt-[100px] xl:py-[150px]">
      {/* Faded team photo in the top-right corner */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[url(/images/about/about-bg.png)] bg-contain bg-top-right bg-no-repeat opacity-10"
      />

      <div className="site-container relative text-center md:text-left">
        <Reveal
          as="h2"
          className="m-0 mb-[30px] font-anton text-[48px] leading-[1.1] font-normal text-white uppercase md:text-[62px] lg:text-[68px] xl:text-[80px]"
        >
          studio life
        </Reveal>
        <Reveal className="mb-[30px] font-unbounded text-[16px] leading-[1.7] font-normal text-muted md:mb-[60px] md:max-w-[520px] md:text-[18px] xl:mb-[120px]">
          As the studio continues to grow, our artists grow alongside it. We may be small, but everyone here is a
          jack-of-all-trades.
        </Reveal>
      </div>

      <div className="relative mb-[60px] md:mb-[80px] xl:mb-[150px]">
        <Reveal className="mb-[30px]">
          <ImageMarquee images={studioGalleryTop} />
        </Reveal>
        <Reveal>
          <ImageMarquee images={studioGalleryBottom} reverse />
        </Reveal>
      </div>

      <div className="site-container relative">
        <Reveal as="h2" className="display-title m-0 mb-[13px] text-white">
          let’s build
        </Reveal>
        <div className="flex items-center">
          <Reveal as="p" className="display-title m-0 text-outline [--stroke-color:#fff]">
            worlds
          </Reveal>
          <Reveal className="ml-[13px] md:ml-[17px]">
            <Link
              href="/#contact"
              className="btn rounded-[80px] px-[30px] py-[10px] text-[15px] leading-[34px] hover:rounded-[80px] md:px-10 md:py-5 md:text-[24px] lg:px-[45px] lg:py-[30px] xl:px-20 xl:py-[45px]"
            >
              join us now
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
