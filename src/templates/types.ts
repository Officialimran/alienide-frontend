import type { ApiPage } from "@/lib/api/types";
import type { SiteRoutes } from "@/lib/routes";

export type SearchParams = Record<string, string | string[] | undefined>;

/** Props every page template receives. */
export interface TemplateProps {
  /** The CMS page (null only for the home page when no landing page exists yet). */
  page: ApiPage | null;
  /** Public URL of this page. */
  path: string;
  searchParams: SearchParams;
  routes: SiteRoutes;
}

/** Props of a detail template rendered at /{listing-page}/{item-slug}. */
export interface DetailTemplateProps {
  /** The listing page the item belongs to (e.g. the page using the "projects" template). */
  parent: ApiPage;
  slug: string;
  routes: SiteRoutes;
}

/** First value of a query-string parameter. */
export const firstParam = (value: string | string[] | undefined): string | undefined =>
  (Array.isArray(value) ? value[0] : value)?.trim() || undefined;
