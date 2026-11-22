import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { diversity } from "@/data/stories";

const decos = [
  {
    src: "/images/about/about_decor4.png",
    w: 130,
    h: 130,
    className:
      "top-[60px] left-0 w-[40px] md:w-[70px] mx:top-[90px] mx:left-[30px] 2xl:top-[125px] 2xl:left-[10px] 2xl:w-[130px]",
  },
  {
    src: "/images/about/about_decor3.png",
    w: 93,
    h: 105,
    className: "top-[80px] right-[30px] w-[60px] md:w-[93px] lg:top-[180px] xl:top-0 xl:right-[230px]",
  },
  {
    src: "/images/about/about_decor2.png",
    w: 131,
    h: 120,
    className:
      "right-[90px] bottom-[80px] w-[60px] md:w-[80px] mx:w-[100px] xl:bottom-[220px] 2xl:w-[131px]",
  },
  {
    src: "/images/about/about_decor1.png",
    w: 163,
    h: 167,
    className:
      "bottom-[100px] left-0 w-[50px] md:w-[80px] mx:bottom-[50px] xl:bottom-[60px] 2xl:w-[163px]",
  },
];

export function DiversitySection() {
  return (
    <section className="relative rounded-section bg-beige pt-[60px] pb-[120px] mx:pt-[80px] mx:pb-[160px] xl:pt-[100px] xl:pb-[200px]">
      <div className="site-container flex flex-col md:flex-row">
        <div className="relative w-full md:w-[55%]">
          <Image
            src="/images/about/about-pic2.png"
            alt="Cartoon brawler character throwing a punch"
            width={727}
            height={706}
            className="mx-auto w-full"
          />
          {decos.map((d, i) => (
            <Reveal key={d.src} delay={i * 100} className={`absolute ${d.className}`}>
              <Image src={d.src} alt="" width={d.w} height={d.h} className="w-full" />
            </Reveal>
          ))}
        </div>

        <div className="flex w-full flex-col justify-center pt-[30px] text-center md:w-[45%] md:pt-0 md:pl-[30px] md:text-left lg:pl-[60px] xl:pl-[90px]">
          <Reveal
            as="h2"
            className="m-0 mb-[30px] font-anton text-[48px] leading-[1.1] font-normal text-accent uppercase md:text-[62px] lg:text-[68px] xl:text-[80px]"
          >
            Diversity &amp; Inclusion
          </Reveal>
          <Reveal className="mb-[1.618em] font-unbounded text-[16px] leading-[1.7] font-normal text-body md:max-w-[380px] md:text-[18px]">
            {diversity.lead}
          </Reveal>
          <Reveal className="md:max-w-[380px]">{diversity.body}</Reveal>
        </div>
      </div>
    </section>
  );
}
