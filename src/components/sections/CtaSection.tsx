import { DesignConnect } from "@/components/sections/shared/DesignConnect";

/** Home: white rounded panel overlapping the dark games section. */
export function CtaSection() {
  return (
    <div className="relative z-10 -mt-[30px] bg-dark md:-mt-[40px] lg:-mt-[90px]">
      <section className="rounded-section bg-white py-[60px] md:py-[80px] xl:py-[100px]">
        <DesignConnect variant="home" />
      </section>
    </div>
  );
}
