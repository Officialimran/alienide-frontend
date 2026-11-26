import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/ui/Reveal";
import { RichText } from "@/components/ui/RichText";

interface ServicesIntroProps {
  /** Page excerpt. */
  title?: string;
  /** Page content (CMS HTML). */
  html?: string;
  cta?: { label: string; href: string };
}

/** White rounded panel overlapping the banner with the page's opening pitch. */
export function ServicesIntro({ title, html, cta }: ServicesIntroProps) {
  return (
    <section className="relative z-10 -mt-[100px] rounded-section bg-white pt-[60px] pb-[120px] mx:pt-[80px] mx:pb-[160px] xl:pt-[140px] xl:pb-[290px]">
      <div className="site-container flex flex-col items-center text-center">
        {title && (
          <Reveal
            as="h2"
            className="m-0 max-w-[690px] pb-[30px] font-anton text-[48px] leading-[1.1] font-normal text-accent uppercase md:text-[62px] lg:text-[68px] xl:text-[80px]"
          >
            {title}
          </Reveal>
        )}
        {html && (
          <Reveal className="mb-10 max-w-[630px]">
            <RichText html={html} className="[&_p]:m-0 [&_p+p]:mt-4" />
          </Reveal>
        )}
        {cta && (
          <Reveal>
            <ButtonLink href={cta.href} className="max-md:!px-[25px] max-md:!py-[15px]">
              {cta.label}
            </ButtonLink>
          </Reveal>
        )}
      </div>
    </section>
  );
}
