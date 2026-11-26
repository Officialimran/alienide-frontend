import { DesignConnect, type DesignConnectContent } from "@/components/sections/shared/DesignConnect";
import { TextMarquee } from "@/components/ui/TextMarquee";

interface ServicesCtaSectionProps {
  /** Words for the scrolling strip (the services' tags). */
  marqueeItems: string[];
  contactHref?: string;
  /** From the page's "We Are" widget (design copy when there is none). */
  content?: DesignConnectContent;
}

/** White rounded panel over the last service row: pitch + scrolling marquee. */
export function ServicesCtaSection({ marqueeItems, contactHref, content }: ServicesCtaSectionProps) {
  return (
    <section className="relative z-20 overlap-section rounded-section bg-white pt-[60px] md:pt-[80px] lg:pt-[100px] xl:pt-[150px]">
      <DesignConnect variant="services" ctaHref={contactHref} content={content} />
      {marqueeItems.length > 0 ? (
        <TextMarquee
          items={marqueeItems}
          label="What we do"
          titleClassName="text-[60px] mx:text-[80px]"
          pace="services"
          className="py-[60px] mx:py-[80px] xl:py-[150px]"
        />
      ) : (
        <div className="pb-[60px] mx:pb-[80px] xl:pb-[150px]" />
      )}
    </section>
  );
}
