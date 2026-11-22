import Image from "next/image";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/data/site";
import { HeroVideo } from "./HeroVideo";

const titleSize = "text-[68px] md:text-[100px] lg:text-[140px] xl:text-[200px]";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[550px] flex-col justify-center overflow-hidden bg-dark py-[100px] md:min-h-[700px] md:py-0 lg:min-h-[900px] xl:min-h-[1150px]">
      <HeroVideo
        videoId={siteConfig.heroVideoId}
        start={siteConfig.heroVideoStart}
        end={siteConfig.heroVideoEnd}
        poster="/images/h1-bgvideo.jpg"
      />

      <div className="site-container relative z-10">
        <h1 className="m-0 font-anton leading-[0.95] font-normal text-white uppercase">
          <Reveal as="span" className={`block ${titleSize}`}>
            we make
          </Reveal>
          <span className="mt-[5px] mb-5 flex flex-wrap items-center gap-y-[10px] md:mt-0 md:flex-nowrap">
            <Reveal as="span" className="mr-[10px] block shrink-0 md:my-[5px] xl:my-0">
              <Image
                src="/images/h1_img-1.jpg"
                alt=""
                width={340}
                height={176}
                priority
                className="h-[95px] w-[340px] max-w-full rounded-[88px] object-cover lg:h-[130px] xl:h-[176px]"
              />
            </Reveal>
            <Reveal as="span" className={`block text-outline [--stroke-color:#fff] ${titleSize}`}>
              games
            </Reveal>
          </span>
        </h1>

        <Reveal className="mb-[30px] max-w-[640px] font-unbounded text-[16px] leading-[1.7] font-normal text-white md:mb-10 md:text-[18px]">
          {siteConfig.description.replace(/\.$/, "")}
        </Reveal>

        <Reveal>
          <ButtonLink href="/projects" className="max-md:!px-[25px] max-md:!py-[15px]">
            our projects
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
