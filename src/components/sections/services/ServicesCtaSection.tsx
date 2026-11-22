import { DesignConnect } from "@/components/sections/shared/DesignConnect";
import { TextMarquee } from "@/components/ui/TextMarquee";
import { servicesMarqueeItems } from "@/data/services";

/** White rounded panel over the last service row: pitch + values marquee. */
export function ServicesCtaSection() {
  return (
    <section className="relative z-20 overlap-section rounded-section bg-white pt-[60px] md:pt-[80px] lg:pt-[100px] xl:pt-[150px]">
      <DesignConnect variant="services" />
      <TextMarquee
        items={servicesMarqueeItems}
        label="Our values"
        titleClassName="text-[60px] mx:text-[80px]"
        className="py-[60px] mx:py-[80px] xl:py-[150px]"
      />
    </section>
  );
}
