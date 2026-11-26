import type { ReactNode } from "react";
import { AboutSection } from "@/components/sections/AboutSection";
import { DetailFeatures } from "@/components/sections/detail/DetailFeatures";
import { DetailGallery } from "@/components/sections/detail/DetailGallery";
import { PartnersSection } from "@/components/sections/partners/PartnersSection";
import { TestimonialsSection } from "@/components/sections/testimonials/TestimonialsSection";
import { toFaqItems, toFeatures, toGalleryItems, toOverviewCta, toPartners, toStats, toTestimonials } from "@/lib/adapters";
import type { ApiWidget, WidgetComputedMap, WidgetContentMap, WidgetType } from "@/lib/api/types";
import { mediaUrl } from "@/lib/media";
import { LocationSection } from "./contact/LocationSection";
import { SupportSection } from "./contact/SupportSection";
import { FaqSection } from "./FaqSection";
import { WeAreSection } from "./WeAreSection";

/** Context a widget may need from the page it is placed on. */
export interface WidgetContext {
  /** Title of the page / project, used to label gallery slides. */
  title: string;
  /** URL of the contact page (partner call-to-action). */
  contactHref?: string;
}

type Renderer<T extends WidgetType> = (
  content: WidgetContentMap[T],
  ctx: WidgetContext,
  /** Read-only values the backend derives from the content (links, embed URLs). */
  computed: Partial<WidgetComputedMap[T]>,
) => ReactNode;

/**
 * One themed section per widget type registered in the backend
 * (App\Widgets\WidgetRegistry). Unknown types are skipped.
 */
const renderers: { [T in WidgetType]: Renderer<T> } = {
  overview: (c) =>
    c.heading ? (
      <AboutSection
        heading={c.heading}
        highlight={c.highlight ?? undefined}
        image={mediaUrl(c.image)}
        badgeText={c.badge_text ?? undefined}
        intro={c.intro ?? undefined}
        description={c.description ?? undefined}
        stats={toStats(c.stats)}
        cta={toOverviewCta(c)}
      />
    ) : null,
  we_are: (c) => <WeAreSection content={c} />,
  features: (c) => (
    <DetailFeatures heading={c.heading || "Main features"} description={c.description ?? undefined} features={toFeatures(c)} />
  ),
  gallery: (c, ctx) => (
    <DetailGallery
      heading={c.heading || "Gallery"}
      description={c.description ?? undefined}
      items={toGalleryItems(c)}
      title={ctx.title}
    />
  ),
  testimonial: (c) => <TestimonialsSection heading={c.heading ?? undefined} items={toTestimonials(c)} />,
  client: (c, ctx) => <PartnersSection heading={c.heading ?? undefined} partners={toPartners(c)} contactHref={ctx.contactHref} />,
  faq: (c) => <FaqSection heading={c.heading ?? undefined} items={toFaqItems(c)} />,
  google_map: (c, _ctx, computed) => <LocationSection map={{ content: c, computed }} standalone />,
  office_address: (c, _ctx, computed) => <LocationSection office={{ content: c, computed }} standalone />,
  contact_support: (c, _ctx, computed) => <SupportSection content={c} computed={computed} />,
};

function isKnown(type: string): type is WidgetType {
  return Object.prototype.hasOwnProperty.call(renderers, type);
}

export function Widget({ widget, context }: { widget: ApiWidget; context: WidgetContext }) {
  if (!isKnown(widget.widget_type)) return null;
  const render = renderers[widget.widget_type] as Renderer<WidgetType>;
  return <>{render(widget.content as WidgetContentMap[WidgetType], context, (widget.computed ?? {}) as Partial<WidgetComputedMap[WidgetType]>)}</>;
}

interface WidgetRendererProps {
  widgets?: ApiWidget[];
  context: WidgetContext;
  /** Widgets (by id) the template already placed in its own layout. */
  excludeIds?: number[];
}

/** Renders a page's widgets in their CMS order. */
export function WidgetRenderer({ widgets = [], context, excludeIds = [] }: WidgetRendererProps) {
  const list = widgets.filter((w) => !excludeIds.includes(w.id)).sort((a, b) => a.sort_order - b.sort_order);

  return (
    <>
      {list.map((widget) => (
        <Widget key={widget.id} widget={widget} context={context} />
      ))}
    </>
  );
}
