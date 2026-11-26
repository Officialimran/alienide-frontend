import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DetailHero } from "@/components/sections/detail/DetailHero";
import { DetailOverview } from "@/components/sections/detail/DetailOverview";
import { ServiceSidebar } from "@/components/sections/services/ServiceSidebar";
import { getService, getServices, MAX_PER_PAGE } from "@/lib/api/cms";
import { mediaUrl } from "@/lib/media";
import { childPath, pagePath, TEMPLATE } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";
import type { DetailTemplateProps } from "./types";

/** Service detail at /{services-page}/{service-slug} (GET /services/{slug}). */
export async function ServiceDetailTemplate({ slug, routes }: DetailTemplateProps) {
  const [service, all] = await Promise.all([getService(slug), getServices({ perPage: MAX_PER_PAGE })]);
  if (!service) notFound();

  const contactHref = routes.byTemplate[TEMPLATE.contact];

  const sidebar = (
    <ServiceSidebar
      tags={service.tags}
      services={all.data.map((s) => ({
        label: s.title,
        href: childPath(routes, TEMPLATE.services, s.slug),
        active: s.slug === service.slug,
      }))}
    />
  );

  return (
    <>
      <DetailHero
        title={service.title}
        image={mediaUrl(service.cover ?? service.thumbnail)}
      />
      <DetailOverview
        heading="service overview"
        intro={service.excerpt ?? undefined}
        html={service.content ?? undefined}
        cta={contactHref ? { label: "let’s talk", href: contactHref, icon: "arrow" } : undefined}
        facts={[]}
        aside={sidebar}
      />
    </>
  );
}

export async function serviceDetailMetadata({ parent, slug }: DetailTemplateProps): Promise<Metadata> {
  const service = await getService(slug);
  if (!service) return {};
  return buildMetadata({
    title: service.title,
    metaTitle: service.meta_title,
    description: service.meta_description,
    fallbackDescription: service.excerpt || service.content,
    keywords: service.meta_keyword,
    image: service.cover ?? service.thumbnail,
    path: `${pagePath(parent)}/${service.slug}`,
  });
}
