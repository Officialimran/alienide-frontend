import Image from "next/image";
import { CmsImage } from "@/components/ui/CmsImage";
import { MotionFx, type MotionFxProps } from "@/components/ui/MotionFx";
import { Reveal } from "@/components/ui/Reveal";
import { RichText } from "@/components/ui/RichText";
import { cn } from "@/lib/cn";
import type { WeAreWidgetContent } from "@/lib/api/types";
import { mediaUrl } from "@/lib/media";

/** Floating decorations around the illustration (theme artwork). */
const decos: { src: string; w: number; h: number; className: string; motion: Pick<MotionFxProps, "mouseTrack" | "tilt"> }[] = [
  {
    src: "/images/about/about_decor4.png",
    w: 130,
    h: 130,
    className:
      "top-[60px] left-0 w-[40px] md:w-[70px] mx:top-[90px] mx:left-[30px] 2xl:top-[125px] 2xl:left-[10px] 2xl:w-[130px]",
    motion: { mouseTrack: { speed: 0.5 } },
  },
  {
    src: "/images/about/about_decor3.png",
    w: 93,
    h: 105,
    className: "top-[80px] right-[30px] w-[60px] md:w-[93px] lg:top-[180px] xl:top-0 xl:right-[230px]",
    motion: { mouseTrack: { speed: 0.4, negative: true } },
  },
  {
    src: "/images/about/about_decor2.png",
    w: 131,
    h: 120,
    className: "right-[90px] bottom-[80px] w-[60px] md:w-[80px] mx:w-[100px] xl:bottom-[220px] 2xl:w-[131px]",
    motion: { mouseTrack: { speed: 0.8 }, tilt: { speed: 4 } },
  },
  {
    src: "/images/about/about_decor1.png",
    w: 163,
    h: 167,
    className: "bottom-[100px] left-0 w-[50px] md:w-[80px] mx:bottom-[50px] xl:bottom-[60px] 2xl:w-[163px]",
    motion: { mouseTrack: { speed: 0.9, negative: true }, tilt: { speed: 4 } },
  },
];

/** CMS "We Are" widget: illustration beside a heading, intro and description (beige rounded panel). */
export function WeAreSection({ content }: { content: WeAreWidgetContent }) {
  const image = mediaUrl(content.image);
  const imageRight = content.image_position === "right";

  return (
    <section className="relative rounded-section bg-beige pt-[60px] pb-[120px] mx:pt-[80px] mx:pb-[160px] xl:pt-[100px] xl:pb-[200px]">
      <div className={cn("site-container flex flex-col", imageRight ? "md:flex-row-reverse" : "md:flex-row")}>
        {image && (
          <div className="relative w-full md:w-[55%]">
            <Reveal animation="image">
              <CmsImage src={image} alt="" width={727} height={706} className="mx-auto block h-auto w-full" />
            </Reveal>
            {decos.map((d, i) => (
              <Reveal key={d.src} animation="scale-up" delay={i * 100} className={`absolute ${d.className}`}>
                <MotionFx {...d.motion}>
                  <Image src={d.src} alt="" width={d.w} height={d.h} className="w-full" />
                </MotionFx>
              </Reveal>
            ))}
          </div>
        )}

        <div
          className={cn(
            "flex w-full flex-col justify-center pt-[30px] text-center md:pt-0 md:text-left",
            image ? "md:w-[45%]" : "md:w-full",
            image && (imageRight ? "md:pr-[30px] lg:pr-[60px] xl:pr-[90px]" : "md:pl-[30px] lg:pl-[60px] xl:pl-[90px]"),
          )}
        >
          {content.heading && (
            <Reveal
              as="h2"
              className="m-0 mb-[30px] font-anton text-[48px] leading-[1.1] font-normal text-accent uppercase md:text-[62px] lg:text-[68px] xl:text-[80px]"
            >
              {content.heading}
            </Reveal>
          )}
          {content.intro && (
            <Reveal className="mb-[1.618em] font-unbounded text-[16px] leading-[1.7] font-normal text-body md:max-w-[380px] md:text-[18px]">
              {content.intro}
            </Reveal>
          )}
          <Reveal className="md:max-w-[380px]">
            <RichText html={content.description} className="[&_p]:m-0 [&_p+p]:mt-4" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
