import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { getPage } from "@/lib/api/cms";
import { getSiteRoutes, pagePath, TEMPLATE } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";
import { resolvePageTemplate } from "@/templates/registry";
import type { SearchParams } from "@/templates/types";

type Params = Promise<{ slug: string }>;

/**
 * Every CMS page lives at /{page-slug}. The page's template
 * (landing, projects, services, team, contact …) picks the layout.
 */
export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const page = await getPage((await params).slug);
  return page ? pageMetadata(page, pagePath(page)) : {};
}

export default async function CmsPage({ params, searchParams }: { params: Params; searchParams: Promise<SearchParams> }) {
  const { slug } = await params;
  const [page, routes, query] = await Promise.all([getPage(slug), getSiteRoutes(), searchParams]);
  if (!page) notFound();

  // The landing page is served at "/" only.
  if (page.template.slug === TEMPLATE.landing) permanentRedirect("/");

  const Template = resolvePageTemplate(page.template.slug);
  return <Template page={page} path={pagePath(page)} searchParams={query} routes={routes} />;
}
