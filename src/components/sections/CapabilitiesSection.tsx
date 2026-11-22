import Link from "next/link";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { DisplayTitle } from "@/components/ui/DisplayTitle";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/data/site";
import { cn } from "@/lib/cn";

export function CapabilitiesSection() {
  return (
    <section id="services" className="relative rounded-section bg-beige pb-[60px] md:pb-[90px]">
      <div className="site-container flex flex-col md:flex-row md:items-start">
        {/* Service list */}
        <div className="order-2 w-full md:order-none md:w-[40%] md:pt-[60px]">
          {services.map((service, i) => (
            <div key={service.title} className="pb-5">
              <div className="flex flex-col items-center md:items-start mx:flex-row">
                <Link
                  href={service.href}
                  aria-label={service.title}
                  className="flex shrink-0 items-center justify-center rounded-[20px] bg-primary p-[15px] text-[48px] text-white xl:text-[64px]"
                >
                  <Icon name={service.icon} />
                </Link>
                <Reveal className="mt-[15px] w-full max-w-[350px] border-t-[5px] border-primary pt-[15px] text-center md:text-left mx:mt-[33px] mx:ml-[35px] mx:max-w-[315px] mx:pt-[30px] lg:ml-[30px] lg:max-w-[360px] xl:mt-[45px] xl:mb-5 xl:pt-[50px]">
                  <h3 className="m-0 mb-[13px] font-anton text-[32px] leading-[1.3] font-normal text-accent uppercase xl:text-[40px]">
                    <Link href={service.href} className="transition-colors duration-300 hover:text-primary">
                      {service.title}
                    </Link>
                  </h3>
                  <p className="m-0">{service.description}</p>
                </Reveal>
              </div>
              <Reveal
                className={cn(
                  "mt-[20px] text-center md:text-left mx:pl-[95px] xl:pl-[125px]",
                  // Only the last link tightens on smaller screens (as on the original).
                  i === services.length - 1 ? "mb-5 md:mb-[30px] lg:mb-[60px]" : "mb-[60px]",
                )}
              >
                <ButtonLink href={service.href} variant="link">
                  learn more
                </ButtonLink>
              </Reveal>
            </div>
          ))}
        </div>

        {/* Sticky title column */}
        <div className="order-1 mb-[60px] flex w-full flex-col items-center justify-center text-center md:sticky md:top-0 md:order-none md:mb-0 md:min-h-[900px] md:w-[60%] md:items-end md:py-[150px] md:text-right">
          <Reveal className="mb-[30px] md:mb-[60px]">
            <DisplayTitle solid="Our" outline="capabilities" />
          </Reveal>
          <Reveal className="mb-[30px] max-w-[620px] font-unbounded text-[18px] leading-[1.7] font-normal text-accent">
            Games are a language of storytelling. We’re looking for games that develop and expand this language.
          </Reveal>
          <Reveal>
            <ButtonLink href="/services" variant="white" className="max-md:!px-[25px] max-md:!py-[15px]">
              what we offer
            </ButtonLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
