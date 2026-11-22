import { ButtonLink } from "@/components/ui/ButtonLink";
import { DisplayTitle } from "@/components/ui/DisplayTitle";
import { Reveal } from "@/components/ui/Reveal";
import { partners } from "@/data/partners";
import { PartnerTile } from "./PartnerTile";

/**
 * Home: "Our Partners" — beige rounded panel (same rhythm as the other
 * sections) with a responsive grid of client logos.
 * 30 logos fill complete rows at 2 / 3 / 5 / 6 columns.
 */
export function PartnersSection() {
  return (
    <div className="relative z-10 bg-white">
      <section
        id="partners"
        aria-labelledby="partners-title"
        className="rounded-section bg-beige pt-[60px] pb-[60px] md:pt-[80px] md:pb-[80px] lg:pt-[100px] lg:pb-[100px] xl:pt-[150px] xl:pb-[150px]"
      >
        <div className="site-container">
          <div className="flex flex-wrap">
            <Reveal className="w-full text-center md:w-1/2 md:text-left" id="partners-title">
              <DisplayTitle solid="Our" outline="Partners" />
            </Reveal>
            <div className="order-last mt-[30px] flex w-full flex-col items-center gap-[30px] text-center md:order-none md:mt-0 md:w-1/2 md:items-end md:justify-end md:text-right">
              <Reveal className="max-w-[440px] font-unbounded text-[16px] leading-[1.7] font-normal text-accent md:text-[18px]">
                Studios, publishers and platforms we&apos;re proud to build, port and ship games with.
              </Reveal>
              <Reveal>
                <ButtonLink href="/contact-us" className="max-md:!px-[25px] max-md:!py-[15px]">
                  become a partner
                </ButtonLink>
              </Reveal>
            </div>
          </div>

          <ul className="m-0 mt-[30px] grid list-none grid-cols-2 gap-[15px] p-0 md:mt-[60px] md:grid-cols-3 md:gap-[30px] lg:mt-[80px] lg:grid-cols-5 xl:grid-cols-6">
            {partners.map((partner, i) => (
              <Reveal as="li" key={partner.name} delay={(i % 6) * 60}>
                <PartnerTile partner={partner} index={i} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
