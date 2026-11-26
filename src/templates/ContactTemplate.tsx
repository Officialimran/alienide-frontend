import { ContactForm } from "@/components/sections/contact/ContactForm";
import { Reveal } from "@/components/ui/Reveal";
import { RichText } from "@/components/ui/RichText";
import { LocationSection } from "@/components/widgets/contact/LocationSection";
import { SupportSection } from "@/components/widgets/contact/SupportSection";
import { WidgetRenderer } from "@/components/widgets/WidgetRenderer";
import { firstWidget } from "@/lib/adapters";
import { cn } from "@/lib/cn";
import { PageHeader } from "./PageHeader";
import type { TemplateProps } from "./types";

const blockTitle = "m-0 mb-[30px] text-center font-anton text-[30px] leading-none font-normal text-accent uppercase md:text-left";

/**
 * "contact" template, laid out like the theme's Contact Us page.
 * Every contact detail comes from the page's widgets:
 * - "Google Map" + "Office Address": map with the office card and "Get directions",
 * - "Contact Support": support options next to the feedback form (POST /suggests).
 * Any other widget on the page is rendered below in its CMS order.
 */
export function ContactTemplate({ page, path }: TemplateProps) {
  if (!page) return null;

  const map = firstWidget(page.widgets, "google_map");
  const office = firstWidget(page.widgets, "office_address");
  const support = firstWidget(page.widgets, "contact_support");
  const placed = [map?.id, office?.id, support?.id].filter((id): id is number => id !== undefined);

  return (
    <>
      <PageHeader page={page} />

      <section className="relative z-10 -mt-[100px] rounded-section bg-white pt-[60px] md:pb-[60px] mx:pt-[80px] mx:pb-[80px] lg:pb-0 xl:pt-[150px]">
        <div className="site-container">
          {(map || office) && (
            <div className="md:mb-[30px] xl:mb-[100px]">
              <LocationSection map={map} office={office} />
            </div>
          )}

          {page.content && (
            <Reveal className="mx-auto max-w-[760px] pt-[30px] text-center">
              <RichText html={page.content} className="[&_p]:m-0 [&_p+p]:mt-4" />
            </Reveal>
          )}

          {/* Black rule */}
          <div className="py-[50px]">
            <div className="h-[5px] bg-accent" />
          </div>

          {/* Feedback form + contact support */}
          <div className="flex flex-col md:flex-row">
            <div
              className={cn(
                "w-full pb-[30px] md:pb-0",
                support ? "md:w-1/2 md:pr-[15px] mx:w-[65%] lg:w-[70%] xl:w-[75%]" : "lg:pb-[80px] xl:pb-[150px]",
              )}
            >
              <Reveal as="h2" className={blockTitle}>
                Feedback form
              </Reveal>
              <Reveal>
                <ContactForm key={path} />
              </Reveal>
            </div>
            {support && (
              <div className="w-full pb-[60px] md:w-1/2 md:pb-0 md:pl-[15px] mx:w-[35%] lg:min-h-[576px] lg:w-[30%] xl:w-[25%]">
                <SupportSection content={support.content} computed={support.computed} variant="sidebar" />
              </div>
            )}
          </div>
        </div>
      </section>

      <WidgetRenderer widgets={page.widgets} context={{ title: page.title }} excludeIds={placed} />
    </>
  );
}
