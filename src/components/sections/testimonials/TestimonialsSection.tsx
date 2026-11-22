import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { testimonials } from "@/data/site";
import { TestimonialSlider } from "./TestimonialSlider";

export function TestimonialsSection() {
  return (
    <section aria-label="Testimonials" className="relative z-10 bg-white pb-[60px] md:pb-[80px] lg:pb-[150px]">
      <div className="site-container">
        <Reveal className="mb-5 w-full border-t-[5px] border-primary pt-[60px] text-center md:pt-[80px] lg:mb-10 lg:pt-[100px] xl:pt-[140px]">
          <Icon name="quote" className="text-[64px] text-primary lg:text-[90px]" />
        </Reveal>
        <Reveal>
          <TestimonialSlider items={testimonials} />
        </Reveal>
      </div>
    </section>
  );
}
