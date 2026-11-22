import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/ui/Reveal";
import { servicesIntro } from "@/data/services";

/** White rounded panel overlapping the banner with the page's opening pitch. */
export function ServicesIntro() {
  return (
    <section className="relative z-10 -mt-[100px] rounded-section bg-white pt-[60px] pb-[120px] mx:pt-[80px] mx:pb-[160px] xl:pt-[140px] xl:pb-[290px]">
      <div className="site-container flex flex-col items-center text-center">
        <Reveal
          as="h2"
          className="m-0 max-w-[690px] pb-[30px] font-anton text-[48px] leading-[1.1] font-normal text-accent uppercase md:text-[62px] lg:text-[68px] xl:text-[80px]"
        >
          {servicesIntro.title}
        </Reveal>
        <Reveal className="mb-10 max-w-[630px]">{servicesIntro.text}</Reveal>
        <Reveal>
          <ButtonLink href="/projects" className="max-md:!px-[25px] max-md:!py-[15px]">
            see our games
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
