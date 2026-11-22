import Image from "next/image";
import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";
import { stats } from "@/data/site";
import { storiesIntro } from "@/data/stories";
import { ValuesGrid } from "./ValuesGrid";

/** White rounded panel that overlaps the banner: story, stats and values. */
export function StoryIntroSection() {
  const { headline, lead, body } = storiesIntro;

  return (
    <section className="relative z-10 -mt-[100px] rounded-section bg-white py-[60px] mx:py-[80px] xl:py-[150px]">
      <div className="site-container">
        {/* Story */}
        <div className="mb-[60px] flex flex-col md:mb-[80px] md:flex-row xl:mb-[150px]">
          <div className="w-full md:w-1/2">
            <Image
              src="/images/about/about-pic.jpg"
              alt="The Qamico team standing together in the studio"
              width={660}
              height={570}
              priority
              className="mx-auto w-full rounded-[20px] md:rounded-[40px]"
            />
          </div>

          <div className="relative w-full pt-[60px] md:w-1/2 md:pt-0 md:pl-[30px] lg:pl-[60px] xl:pl-[70px]">
            <Image
              src="/images/h1_deco.png"
              alt=""
              width={98}
              height={100}
              className="absolute top-[30px] right-0 hidden animate-spin-slow motion-safe-only xl:block"
            />
            <Reveal
              as="h2"
              className="relative z-[1] m-0 mb-[30px] text-center font-anton text-[36px] leading-[1.2] font-normal tracking-[-1px] text-accent uppercase md:text-left md:text-[40px] mx:text-[42px] lg:text-[48px] xl:mt-20 xl:mr-[110px] xl:mb-[60px] xl:text-[54px]"
            >
              {headline.before}
              <span className="whitespace-nowrap text-primary">{headline.highlight}</span>
              {headline.after}
            </Reveal>
            <Reveal className="mb-[1.618em] text-center font-unbounded text-[16px] leading-[1.7] font-normal text-accent md:text-left md:text-[18px]">
              {lead}
            </Reveal>
            <Reveal className="text-center md:text-left">{body}</Reveal>
          </div>
        </div>

        {/* Stats */}
        <Reveal className="mb-[60px] flex flex-col md:mb-[80px] md:flex-row xl:mb-[150px]">
          {stats.map((stat) => (
            <div key={stat.label} className="w-full pb-[30px] text-center md:w-1/3 md:pb-0">
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

        {/* Values */}
        <div className="border-t-[5px] border-primary pt-[60px] mx:pt-[80px] xl:pt-[150px]">
          <Reveal
            as="h2"
            className="m-0 mb-[30px] text-center font-anton text-[48px] leading-[1.1] font-normal text-accent uppercase md:text-[62px] lg:text-[68px] xl:text-[80px]"
          >
            our values
          </Reveal>
          <Reveal className="mx-auto mb-[50px] max-w-[630px] text-center font-unbounded text-[16px] leading-[1.7] font-normal md:text-[18px] xl:mb-[85px]">
            We are trusted and relied upon by many of the world’s leading video game companies.
          </Reveal>
          <Reveal>
            <ValuesGrid />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
