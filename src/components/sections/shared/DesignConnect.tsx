import Image from "next/image";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

type Variant = "home" | "services";

/** Per-page tweaks the original uses for the same block. */
const variants: Record<
  Variant,
  { firstDeco: string; circle: string; character: string; heading: string; intro: string; split: [string, string] }
> = {
  home: {
    firstDeco: "top-[90px] left-[30px] w-[40px] md:w-[70px] 2xl:top-[117px] 2xl:left-[116px] 2xl:w-[111px]",
    circle: "w-[440px]",
    character: "pr-[80px] lg:pr-[180px]",
    heading: "md:text-[62px]",
    intro: "",
    split: ["md:w-[35%]", "md:w-[65%]"],
  },
  services: {
    firstDeco: "top-[90px] left-[30px] w-[40px] md:w-[70px] 2xl:top-[110px] 2xl:left-[90px] 2xl:w-[111px]",
    circle: "w-[350px]",
    character: "pr-[90px] lg:pr-[180px]",
    heading: "md:text-[54px]",
    intro: "mb-[30px] md:mb-0",
    split: ["md:w-[40%]", "md:w-[60%]"],
  },
};

const otherDecos = [
  {
    src: "/images/h1_deco-4.png",
    w: 118,
    h: 123,
    className: "bottom-[50px] left-[48px] w-[50px] md:w-[80px] xl:bottom-[264px] 2xl:w-[118px]",
  },
  {
    src: "/images/h1_deco-6.png",
    w: 169,
    h: 206,
    className: "right-[5px] bottom-[80px] w-[60px] md:w-[80px] mx:w-[100px] xl:bottom-[261px] 2xl:w-[169px]",
  },
  {
    src: "/images/h1_deco-3.png",
    w: 93,
    h: 95,
    className: "top-[80px] right-[30px] w-[60px] md:w-[93px] lg:top-[180px] xl:top-[226px] xl:right-[75px]",
  },
];

/** "Design, create & connect" pitch with the hero character, spinning halo and floating gems. */
export function DesignConnect({ variant = "home" }: { variant?: Variant }) {
  const v = variants[variant];
  const decos = [{ src: "/images/h1_deco-5.png", w: 111, h: 117, className: v.firstDeco }, ...otherDecos];

  return (
    <div className="site-container flex flex-col items-center md:flex-row">
      <div
        className={cn(
          "flex w-full flex-col items-center text-center md:items-start md:text-left",
          v.split[0],
          v.intro,
        )}
      >
        <Reveal
          as="h2"
          className={cn(
            "m-0 mb-[30px] max-w-[275px] font-anton text-[48px] leading-none font-normal text-accent uppercase lg:text-[68px] xl:text-[80px]",
            v.heading,
          )}
        >
          {/* Wraps naturally inside the 275px box, like the original. */}
          design create &amp; connect
        </Reveal>
        <Reveal className="mb-[30px] max-w-[375px]">
          We are ready to deliver your vision across multiple platforms, mobile, or desktop. Games are the language of
          the 21st century and we can help you harness their unique power.
        </Reveal>
        <Reveal>
          <ButtonLink href="/contact-us" className="max-md:!px-[25px] max-md:!py-[15px]">
            let’s talk
          </ButtonLink>
        </Reveal>
      </div>

      <div
        className={cn("relative flex w-full items-center justify-center pt-[50px] md:pt-0 md:pl-[40px]", v.split[1])}
      >
        <Image
          src="/images/h1_circle.png"
          alt=""
          width={655}
          height={655}
          className={cn(
            "absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2 animate-spin-slow motion-safe-only md:w-[655px]",
            v.circle,
          )}
        />
        <div className={cn("relative z-[1]", v.character)}>
          <Image
            src="/images/h1_img-3.png"
            alt="Young hero character holding a staff"
            width={566}
            height={860}
            className="w-[450px] max-w-full xl:w-[566px]"
          />
        </div>
        {decos.map((d, i) => (
          <Reveal key={d.src} delay={i * 100} className={`absolute z-[2] ${d.className}`}>
            <Image src={d.src} alt="" width={d.w} height={d.h} className="w-full" />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
