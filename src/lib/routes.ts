import { cache } from "react";
import { getPages } from "@/lib/api/cms";
import type { ApiPage } from "@/lib/api/types";

/**
 * Template slugs the frontend has a layout for (managed in the CMS under
 * Page Templates). A page's template decides how /{page-slug} renders.
 */
export const TEMPLATE = {
  landing: "landing",
  projects: "projects",
  contact: "contact",
  services: "services",
  team: "team",
  about: "about",
} as const;

export type TemplateSlug = (typeof TEMPLATE)[keyof typeof TEMPLATE];

/** Public URL of a CMS page: the landing page is the home page. */
export function pagePath(page: Pick<ApiPage, "slug" | "template">): string {
  return page.template.slug === TEMPLATE.landing ? "/" : `/${page.slug}`;
}

/**
 * Where each template lives on the site, e.g. { projects: "/our-games", contact: "/contact-us" }.
 * Lets components link to "the projects page" without hard-coding its slug.
 * When several pages share a template, the newest one wins (the API sorts newest first).
 */
export interface SiteRoutes {
  byTemplate: Partial<Record<string, string>>;
  /** Slug of the page using the landing template (served at "/"). */
  landingSlug?: string;
}

export const getSiteRoutes = cache(async (): Promise<SiteRoutes> => {
  const pages = await getPages();
  const byTemplate: SiteRoutes["byTemplate"] = {};
  let landingSlug: string | undefined;

  for (const page of pages) {
    const template = page.template.slug;
    if (!template || byTemplate[template]) continue;
    byTemplate[template] = pagePath(page);
    if (template === TEMPLATE.landing) landingSlug = page.slug;
  }

  return { byTemplate, landingSlug };
});

/** Detail page of an item listed on a template page, e.g. /our-games/walton-vr. */
export function childPath(routes: SiteRoutes, template: TemplateSlug, slug: string): string | undefined {
  const base = routes.byTemplate[template];
  return base ? `${base}/${slug}` : undefined;
}

/** Template page URL with a query string, e.g. /projects?platforms=android. */
export function withQuery(path: string, query: Record<string, string | number | undefined>): string {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined && value !== "") params.set(key, String(value));
  }
  const qs = params.toString();
  return qs ? `${path}?${qs}` : path;
}

/** Points links to the landing page's own slug at "/" instead. */
export function normalizeHref(href: string, landingSlug?: string): string {
  if (landingSlug && (href === `/${landingSlug}` || href === `/${landingSlug}/`)) return "/";
  return href;
}
