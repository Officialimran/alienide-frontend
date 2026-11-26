import { ButtonLink } from "@/components/ui/ButtonLink";
import { DisplayTitle } from "@/components/ui/DisplayTitle";
import { Reveal } from "@/components/ui/Reveal";
import { splitTitle } from "@/lib/text";
import type { Partner } from "@/types";
import { PartnerTile } from "./PartnerTile";

interface PartnersSectionProps {
  partners: Partner[];
  /** Widget heading, shown two-tone ("Our Partners"). */
  heading?: string;
  /** URL of the page using the contact template. */
  contactHref?: string;
}

/**
 * Client logos from the CMS "Client" widget — beige rounded panel
 * (same rhythm as the other sections) with a responsive logo grid.
 */
export function PartnersSection({ partners, heading, contactHref }: PartnersSectionProps) {
  if (partners.length === 0) return null;
  const { solid, outline } = splitTitle(heading?.trim() || "Our Partners");

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
              <DisplayTitle solid={solid} outline={outline} />
            </Reveal>
            <div className="order-last mt-[30px] flex w-full flex-col items-center gap-[30px] text-center md:order-none md:mt-0 md:w-1/2 md:items-end md:justify-end md:text-right">
              <Reveal className="max-w-[440px] font-unbounded text-[16px] leading-[1.7] font-normal text-accent md:text-[18px]">
                Studios, publishers and platforms we&apos;re proud to build, port and ship games with.
              </Reveal>
              {contactHref && (
                <Reveal>
                  <ButtonLink href={contactHref} className="max-md:!px-[25px] max-md:!py-[15px]">
                    become a partner
                  </ButtonLink>
                </Reveal>
              )}
            </div>
          </div>

          <ul className="m-0 mt-[30px] grid list-none grid-cols-2 gap-[15px] p-0 md:mt-[60px] md:grid-cols-3 md:gap-[30px] lg:mt-[80px] lg:grid-cols-5 xl:grid-cols-6">
            {partners.map((partner, i) => (
              <Reveal as="li" key={`${partner.name}-${i}`} delay={(i % 6) * 60}>
                <PartnerTile partner={partner} index={i} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
