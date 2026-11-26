import { cache } from "react";
import { apiGet, apiGetOrNull, type Query } from "./client";
import type {
  ApiBanner,
  ApiCollection,
  ApiEnvelope,
  ApiNavigation,
  ApiOptions,
  ApiPage,
  ApiPaginated,
  ApiProject,
  ApiProjectTaxonomy,
  ApiService,
  ApiTeamMember,
} from "./types";

/**
 * One function per public endpoint (routes/api.php → prefix v1).
 * Wrapped in React cache() so a page and its generateMetadata()
 * share a single request.
 */

/* ---------------------------------- Pages --------------------------------- */

/** GET /pages — active pages, newest first (?template=slug filters by template). */
export const getPages = cache(async (template?: string): Promise<ApiPage[]> => {
  const res = await apiGet<ApiCollection<ApiPage>>("pages", { query: { template }, tags: ["pages"] });
  return res.data;
});

/** GET /pages/{slug} — null when the page does not exist or is inactive. */
export const getPage = cache(async (slug: string): Promise<ApiPage | null> => {
  const res = await apiGetOrNull<ApiEnvelope<ApiPage>>(`pages/${encodeURIComponent(slug)}`, { tags: ["pages"] });
  return res?.data ?? null;
});

/* ------------------------------- Site chrome ------------------------------ */

/** GET /navigation — every active menu, keyed by location (or slug). */
export const getNavigation = cache(async (): Promise<ApiNavigation> => {
  const res = await apiGet<ApiEnvelope<ApiNavigation | []>>("navigation", { tags: ["navigation"] });
  // PHP encodes an empty associative array as [].
  return Array.isArray(res.data) ? {} : res.data;
});

/** GET /options — public site options grouped by group (header, footer, contact, social …). */
export const getOptions = cache(async (): Promise<ApiOptions> => {
  const res = await apiGet<ApiEnvelope<ApiOptions | []>>("options", { tags: ["options"] });
  return Array.isArray(res.data) ? {} : res.data;
});

/** GET /banners — active banners by priority. */
export const getBanners = cache(async (): Promise<ApiBanner[]> => {
  const res = await apiGet<ApiEnvelope<ApiBanner[]>>("banners", { tags: ["banners"] });
  return res.data;
});

/* --------------------------------- Projects ------------------------------- */

export interface ProjectQuery {
  /** Project type (platform) slugs. */
  platforms?: string[];
  /** Project category (genre) slugs. */
  genres?: string[];
  search?: string;
  featured?: boolean;
  page?: number;
  perPage?: number;
}

/** GET /projects — paginated, newest first. */
export const getProjects = cache(
  async ({ platforms, genres, search, featured, page, perPage }: ProjectQuery = {}): Promise<ApiPaginated<ApiProject>> => {
    const query: Query = { platforms, genres, search, featured, page, per_page: perPage };
    return apiGet<ApiPaginated<ApiProject>>("projects", { query, tags: ["projects"] });
  },
);

/** GET /projects/{slug} — with platforms, genres and widgets. */
export const getProject = cache(async (slug: string): Promise<ApiProject | null> => {
  const res = await apiGetOrNull<ApiEnvelope<ApiProject>>(`projects/${encodeURIComponent(slug)}`, { tags: ["projects"] });
  return res?.data ?? null;
});

/** GET /project-types — platforms used by the projects filter. */
export const getProjectTypes = cache(async (): Promise<ApiProjectTaxonomy[]> => {
  return (await apiGet<ApiCollection<ApiProjectTaxonomy>>("project-types", { tags: ["projects"] })).data;
});

/** GET /project-categories — genres used by the projects filter. */
export const getProjectCategories = cache(async (): Promise<ApiProjectTaxonomy[]> => {
  return (await apiGet<ApiCollection<ApiProjectTaxonomy>>("project-categories", { tags: ["projects"] })).data;
});

/* --------------------------------- Services ------------------------------- */

export interface ServiceQuery {
  tags?: string[];
  search?: string;
  featured?: boolean;
  page?: number;
  perPage?: number;
}

/** GET /services — paginated, by priority. */
export const getServices = cache(
  async ({ tags, search, featured, page, perPage }: ServiceQuery = {}): Promise<ApiPaginated<ApiService>> => {
    const query: Query = { tags, search, featured, page, per_page: perPage };
    return apiGet<ApiPaginated<ApiService>>("services", { query, tags: ["services"] });
  },
);

/** GET /services/{slug} */
export const getService = cache(async (slug: string): Promise<ApiService | null> => {
  const res = await apiGetOrNull<ApiEnvelope<ApiService>>(`services/${encodeURIComponent(slug)}`, { tags: ["services"] });
  return res?.data ?? null;
});

/** Maximum page size the backend accepts for paginated listings. */
export const MAX_PER_PAGE = 50;

/* ----------------------------------- Team --------------------------------- */

/** GET /team-members?all=1 — every active member (optionally only featured ones). */
export const getTeamMembers = cache(async (featured = false): Promise<ApiTeamMember[]> => {
  const res = await apiGet<ApiCollection<ApiTeamMember>>("team-members", {
    query: { all: true, featured },
    tags: ["team"],
  });
  return res.data;
});
