import Image from "next/image";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";
import { stats } from "@/data/site";
import { cn } from "@/lib/cn";

export function AboutSection() {
  return (
    <section id="about" className="relative z-10 bg-white pb-[60px] md:pb-[80px] lg:pb-[100px] xl:pb-[150px]">
      <div className="site-container flex flex-wrap">
        {/* Story */}
        <div className="flex w-full flex-wrap md:w-[70%] mx:w-[60%]">
          <Reveal
            as="h2"
            className="m-0 mb-10 w-full font-anton text-[36px] leading-[1.2] font-normal uppercase md:text-[42px] lg:text-[48px] xl:text-[54px] 2xl:mb-[55px]"
          >
            <span className="text-muted">We are the game development studio known for crafting distinctive and </span>
            <span className="text-accent">immersive games</span>
            <span className="text-muted"> that stand out in the market.</span>
          </Reveal>

          <Reveal className="w-full md:w-[35%]">
            <Image
              src="/images/h1_img-2.jpg"
              alt="Developers working together in the studio"
              width={245}
              height={260}
              className="rounded-[20px]"
            />
          </Reveal>

          <div className="w-full pt-[30px] md:w-[65%] md:pt-0 md:pl-[30px] mx:pl-[20px] lg:pl-[35px]">
            <Reveal className="max-w-[400px] [&_p]:mb-[1.618em]">
              <p>
                Qamico is a design studio focused on game development that works with companies around the world,
                helping them grow and expand their business.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipiscing diam tortor sit feugiat dictum eu diam euismod
                ultrices convallis eget vel velit posuere mi consequat leo egestas sed odio molestie non imperdiet
                malesuada.
              </p>
            </Reveal>
            <Reveal>
              <ButtonLink href="/the-stories" variant="link">
                more about us
              </ButtonLink>
            </Reveal>
          </div>
        </div>

        {/* Stats */}
        <div className="flex w-full flex-col items-start pt-[50px] md:w-[30%] md:pt-0 md:pl-[30px] mx:w-[40%] lg:pl-[50px]">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} className="w-full">
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
      </div>
    </section>
  );
}
