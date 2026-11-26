import { TextMarquee } from "@/components/ui/TextMarquee";

/** Home: rounded white strip with an endlessly scrolling list of services. */
export function ServicesMarquee({ items, href }: { items: string[]; href?: string }) {
  return (
    <section className="relative z-10 overlap-section rounded-section bg-white py-[60px] md:py-[80px] lg:py-[100px] xl:py-[150px]">
      {items.length > 0 && <TextMarquee items={items} href={href} label="Our services" />}
    </section>
  );
}
