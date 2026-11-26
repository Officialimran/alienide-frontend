import Link from "next/link";
import { ServiceRow } from "@/components/sections/services/ServiceRow";
import { ServicesCtaSection } from "@/components/sections/services/ServicesCtaSection";
import { ServicesIntro } from "@/components/sections/services/ServicesIntro";
import { WidgetRenderer } from "@/components/widgets/WidgetRenderer";
import { fallbackImages } from "@/config/site";
import { firstWidget, toDesignConnect, toServiceRow } from "@/lib/adapters";
import { getServices, MAX_PER_PAGE } from "@/lib/api/cms";
import { TEMPLATE } from "@/lib/routes";
import { PageHeader } from "./PageHeader";
import { firstParam, type TemplateProps } from "./types";

/**
 * "services" template — one full-width row per active service, then the
 * "Design, create & connect" pitch fed by the page's "We Are" widget.
 * A tag link (?tags=Unity) narrows the list, using the backend's tag filter.
 */
export async function ServicesTemplate({ page, path, searchParams, routes }: TemplateProps) {
  if (!page) return null;

  const tag = firstParam(searchParams.tags);
  const { data: services } = await getServices({ tags: tag ? [tag] : undefined, perPage: MAX_PER_PAGE });

  const projectsHref = routes.byTemplate[TEMPLATE.projects];
  const contactHref = routes.byTemplate[TEMPLATE.contact];
  const marquee = [...new Set(services.flatMap((s) => s.tags))];
  const weAre = firstWidget(page.widgets, "we_are");

  return (
    <>
      <PageHeader page={page} fallbackImage={fallbackImages.servicesBanner} />
      <ServicesIntro
        title={page.excerpt ?? undefined}
        html={page.content ?? undefined}
        cta={projectsHref ? { label: "see our games", href: projectsHref } : undefined}
      />

      {tag && (
        <p role="status" className="site-container relative z-20 -mt-[40px] mb-[100px] text-center mx:-mt-[60px] xl:-mt-[200px] xl:mb-[180px]">
          Showing services tagged “<strong className="font-medium text-accent">{tag}</strong>” ·{" "}
          <Link href={path} className="text-primary underline hover:text-accent">
            show all
          </Link>
        </p>
      )}

      {services.length > 0 ? (
        services.map((service, i) => (
          <ServiceRow key={service.slug} service={toServiceRow(service, routes)} first={i === 0} last={i === services.length - 1} />
        ))
      ) : (
        <p className="site-container py-10 text-center text-[16px]">No services found.</p>
      )}

      {/* "Design, create & connect" ← the page's "We Are" widget. */}
      <ServicesCtaSection marqueeItems={marquee} contactHref={contactHref} content={toDesignConnect(weAre?.content)} />
      <WidgetRenderer
        widgets={page.widgets}
        excludeIds={weAre ? [weAre.id] : []}
        context={{ title: page.title, contactHref }}
      />
    </>
  );
}
