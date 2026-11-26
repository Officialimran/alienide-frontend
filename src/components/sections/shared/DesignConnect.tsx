import Image from "next/image";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { CmsImage } from "@/components/ui/CmsImage";
import { MotionFx, type MotionFxProps } from "@/components/ui/MotionFx";
import { Reveal } from "@/components/ui/Reveal";
import { RichText } from "@/components/ui/RichText";
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

interface Deco {
  src: string;
  w: number;
  h: number;
  className: string;
  /** Elementor motion_fx values of the original theme. */
  motion: Pick<MotionFxProps, "mouseTrack" | "tilt">;
}

const otherDecos: Deco[] = [
  {
    src: "/images/h1_deco-4.png",
    w: 118,
    h: 123,
    className: "bottom-[50px] left-[48px] w-[50px] md:w-[80px] xl:bottom-[264px] 2xl:w-[118px]",
    motion: { mouseTrack: { speed: 0.9, negative: true }, tilt: { speed: 4 } },
  },
  {
    src: "/images/h1_deco-6.png",
    w: 169,
    h: 206,
    className: "right-[5px] bottom-[80px] w-[60px] md:w-[80px] mx:w-[100px] xl:bottom-[261px] 2xl:w-[169px]",
    motion: { mouseTrack: { speed: 0.8 }, tilt: { speed: 4 } },
  },
  {
    src: "/images/h1_deco-3.png",
    w: 93,
    h: 95,
    className: "top-[80px] right-[30px] w-[60px] md:w-[93px] lg:top-[180px] xl:top-[226px] xl:right-[75px]",
    motion: { mouseTrack: { speed: 0.4, negative: true } },
  },
];

/** Content of the CMS "We Are" widget (falls back to the design copy). */
export interface DesignConnectContent {
  heading?: string | null;
  intro?: string | null;
  /** CMS HTML. */
  description?: string | null;
  /** Character artwork; the theme's hero character when empty. */
  image?: string | null;
  imagePosition?: "left" | "right";
}

const DEFAULT_CONTENT = {
  heading: "design create & connect",
  intro:
    "We are ready to deliver your vision across multiple platforms, mobile, or desktop. Games are the language of the 21st century and we can help you harness their unique power.",
};

/**
 * "Design, create & connect" pitch: copy beside the character artwork, a
 * spinning halo that scales on scroll and floating gems that follow the mouse.
 */
export function DesignConnect({
  variant = "home",
  ctaHref,
  ctaLabel = "let’s talk",
  content,
}: {
  variant?: Variant;
  ctaHref?: string;
  ctaLabel?: string;
  content?: DesignConnectContent;
}) {
  const v = variants[variant];
  const decos: Deco[] = [
    { src: "/images/h1_deco-5.png", w: 111, h: 117, className: v.firstDeco, motion: { mouseTrack: { speed: 0.5 } } },
    ...otherDecos,
  ];

  const heading = content?.heading?.trim() || DEFAULT_CONTENT.heading;
  const intro = content ? content.intro?.trim() : DEFAULT_CONTENT.intro;
  const imageLeft = content?.imagePosition === "left";

  return (
    <div className={cn("site-container flex flex-col items-center", imageLeft ? "md:flex-row-reverse" : "md:flex-row")}>
      <div
        className={cn(
          "flex w-full flex-col items-center text-center md:items-start md:text-left",
          v.split[0],
          v.intro,
          imageLeft && "md:pl-[40px]",
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
          {heading}
        </Reveal>
        {intro && <Reveal className="mb-[30px] max-w-[375px]">{intro}</Reveal>}
        {content?.description && (
          <Reveal className="mb-[30px] max-w-[375px]">
            <RichText html={content.description} className="[&_p]:m-0 [&_p+p]:mt-4" />
          </Reveal>
        )}
        {ctaHref && (
          <Reveal>
            <ButtonLink href={ctaHref} className="max-md:!px-[25px] max-md:!py-[15px]">
              {ctaLabel}
            </ButtonLink>
          </Reveal>
        )}
      </div>

      <div
        className={cn(
          "relative flex w-full items-center justify-center pt-[50px] md:pt-0",
          imageLeft ? "md:pr-[40px]" : "md:pl-[40px]",
          v.split[1],
        )}
      >
        {/* Halo: spins (theme ".rotate", 12s) and scales down while scrolling (motion_fx scale in-out 1.1, 20–80%). */}
        <MotionFx
          scrollScale={{ speed: 1.1, direction: "in-out", range: [20, 80] }}
          minWidth={768}
          className={cn("absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:w-[655px]", v.circle)}
        >
          <Image
            src="/images/h1_circle.png"
            alt=""
            width={655}
            height={655}
            className="w-full max-w-none animate-spin-slow motion-safe-only"
          />
        </MotionFx>

        {/* Character: grows into place while scrolling (motion_fx scale out-in 1, 20–80%). */}
        <MotionFx scrollScale={{ speed: 1, direction: "out-in", range: [20, 80] }} className={cn("relative z-[1]", v.character)}>
          {content?.image ? (
            <CmsImage src={content.image} alt="" width={566} height={860} className="w-[450px] max-w-full xl:w-[566px]" />
          ) : (
            <Image
              src="/images/h1_img-3.png"
              alt="Young hero character holding a staff"
              width={566}
              height={860}
              className="w-[450px] max-w-full xl:w-[566px]"
            />
          )}
        </MotionFx>

        {decos.map((d, i) => (
          <Reveal key={d.src} animation="scale-up" delay={i * 100} className={`absolute z-[2] ${d.className}`}>
            <MotionFx {...d.motion}>
              <Image src={d.src} alt="" width={d.w} height={d.h} className="w-full" />
            </MotionFx>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
