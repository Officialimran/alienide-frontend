import Image from "next/image";
import { DisplayTitle } from "@/components/ui/DisplayTitle";
import { Reveal } from "@/components/ui/Reveal";
import { awards } from "@/data/site";
import { cn } from "@/lib/cn";
import type { Award } from "@/types";

function AwardItem({ award }: { award: Award }) {
  return (
    <Reveal
      className={cn(
        "group mb-5 w-[230px] max-w-full bg-top bg-no-repeat px-0 pt-0 text-center mx:mb-0 mx:bg-[length:200px_auto] mx:px-5 mx:pt-[10px] lg:bg-auto lg:px-[35px]",
        "bg-[url(/images/h2_vector2.svg)] hover:bg-[url(/images/h2_vector3.svg)]",
      )}
    >
      <h3 className="m-0 font-unbounded text-[13px] leading-[1.4] font-medium text-white lg:text-[14px]">
        {award.title[0]}
        <br />
        {award.title[1]}
      </h3>
      <p className="m-0 mt-[6px] font-unbounded text-[12px] font-light text-body transition-colors duration-300 group-hover:text-primary lg:text-[14px]">
        {award.result}
      </p>
    </Reveal>
  );
}

export function AwardsSection() {
  const [rowA, rowB] = awards;

  return (
    <section className="relative z-10 overlap-section rounded-section bg-dark pt-[60px] pb-[90px] md:pt-[80px] md:pb-[120px] lg:pt-[150px] lg:pb-[240px]">
      <div className="site-container flex flex-col">
        <Reveal className="mb-[30px] text-center md:mb-[60px] lg:mb-[80px] xl:mb-[100px] 2xl:mb-[120px]">
          <DisplayTitle solid="Our" outline="awards" tone="light" stacked={false} />
        </Reveal>

        <div className="order-2 mb-[120px] flex flex-col items-center md:flex-row md:flex-wrap md:items-start md:justify-between mx:order-none mx:mb-[40px] lg:mb-[90px]">
          {rowA.map((a) => (
            <AwardItem key={a.title.join(" ")} award={a} />
          ))}
        </div>

        <div className="order-1 mx-auto flex w-full max-w-[888px] flex-col items-center md:flex-row md:flex-wrap md:items-start md:justify-between mx:order-none mx:mb-[160px]">
          {rowB.map((a) => (
            <AwardItem key={a.title.join(" ")} award={a} />
          ))}
        </div>

        {/* "Best debut" banner */}
        <Reveal className="order-3 flex flex-wrap items-center justify-center rounded-[20px] bg-primary px-[15px] pb-[15px] md:flex-nowrap md:rounded-[40px] md:px-[30px] md:pb-0 lg:rounded-[80px] mx:order-none">
          <Image
            src="/images/h1_img-4.png"
            alt="Game award trophy"
            width={265}
            height={247}
            className="-mt-[100px] w-[180px] shrink-0 max-md:mx-auto md:w-[240px] mx:w-[277px]"
          />
          <div className="max-md:w-full md:hidden" />
          <div className="flex w-[150px] flex-col items-center py-[10px] md:w-[170px] md:items-start md:py-0">
            <h3 className="m-0 mb-[5px] font-anton text-[30px] leading-[1.3] text-black uppercase mx:text-[40px]">
              best debut
            </h3>
            <p className="m-0 font-anton text-[18px] leading-[1.444] text-black uppercase">indie game of 2020</p>
          </div>
          <div className="self-center md:ml-5 md:border-l md:border-black/20 md:pl-5 mx:ml-[30px] mx:pl-[30px]">
            <Image src="/images/awards.svg" alt="The Game Awards" width={166} height={57} className="opacity-40" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
