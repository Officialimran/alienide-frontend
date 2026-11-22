import { TextMarquee } from "@/components/ui/TextMarquee";
import { marqueeItems } from "@/data/site";

/** Home: rounded white strip with an endlessly scrolling list of services. */
export function ServicesMarquee() {
  return (
    <section className="relative z-10 overlap-section rounded-section bg-white py-[60px] md:py-[80px] lg:py-[100px] xl:py-[150px]">
      <TextMarquee items={marqueeItems} href="/services" label="Our services" />
    </section>
  );
}
