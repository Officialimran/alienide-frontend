import { Reveal } from "@/components/ui/Reveal";
import { RichText } from "@/components/ui/RichText";
import { RuledHeading } from "@/components/sections/detail/DetailFeatures";
import type { FaqItem } from "@/types";

/** CMS "FAQ" widget: accessible accordion (native <details>) in the theme's type styles. */
export function FaqSection({ heading, items }: { heading?: string; items: FaqItem[] }) {
  if (items.length === 0) return null;

  return (
    <section className="site-container mb-[60px] mx:mb-[80px] xl:mb-[150px]">
      <RuledHeading>{heading?.trim() || "FAQ"}</RuledHeading>
      <Reveal as="div" className="mx-auto max-w-[960px]">
        {items.map((item, i) => (
          <details key={`${item.question}-${i}`} className="group border-b border-line" open={i === 0}>
            <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-[22px] font-anton text-[20px] leading-[1.4] text-accent uppercase transition-colors hover:text-primary md:text-[24px] [&::-webkit-details-marker]:hidden">
              {item.question}
              <span
                aria-hidden="true"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-[22px] leading-none text-accent transition-transform duration-300 group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <RichText html={item.answer} className="pb-[25px] [&_p]:m-0 [&_p+p]:mt-4" />
          </details>
        ))}
      </Reveal>
    </section>
  );
}
