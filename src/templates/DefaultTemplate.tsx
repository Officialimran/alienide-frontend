import { Reveal } from "@/components/ui/Reveal";
import { RichText } from "@/components/ui/RichText";
import { WidgetRenderer } from "@/components/widgets/WidgetRenderer";
import { TEMPLATE } from "@/lib/routes";
import { PageHeader } from "./PageHeader";
import type { TemplateProps } from "./types";

/**
 * Fallback for any template without a dedicated layout (e.g. "default"): banner, the page's rich-text content, then its widgets.
 */
export function DefaultTemplate({ page, routes }: TemplateProps) {
  if (!page) return null;

  return (
    <>
      <PageHeader page={page} />

      {/* White rounded panel overlapping the banner (also the spacer when there is no content). */}
      <section className="relative z-10 -mt-[100px] rounded-section bg-white pt-[60px] pb-[60px] mx:pt-[80px] mx:pb-[80px] xl:pt-[150px] xl:pb-[150px]">
        {page.content ? (
          <Reveal className="site-container">
            <RichText html={page.content} className="mx-auto max-w-[960px]" as="article" />
          </Reveal>
        ) : (
          page.excerpt && (
            <Reveal className="site-container text-center font-unbounded text-[18px] leading-[1.7] font-normal text-accent">
              {page.excerpt}
            </Reveal>
          )
        )}
      </section>

      <WidgetRenderer widgets={page.widgets} context={{ title: page.title, contactHref: routes.byTemplate[TEMPLATE.contact] }} />
    </>
  );
}
