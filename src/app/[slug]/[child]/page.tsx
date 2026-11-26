import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPage } from "@/lib/api/cms";
import { getSiteRoutes } from "@/lib/routes";
import { resolveDetailTemplate } from "@/templates/registry";

type Params = Promise<{ slug: string; child: string }>;

/**
 * Item pages under a listing page, e.g. /{projects-page}/{project-slug}.
 * The listing page's template decides which item type the slug refers to,
 * so no section prefix (/projects, /services) is hard-coded.
 */
async function resolve(params: Params) {
  const { slug, child } = await params;
  const parent = await getPage(slug);
  const detail = resolveDetailTemplate(parent?.template.slug);
  return parent && detail ? { parent, detail, child } : null;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const found = await resolve(params);
  if (!found) return {};
  const routes = await getSiteRoutes();
  return found.detail.metadata({ parent: found.parent, slug: found.child, routes });
}

export default async function CmsDetailPage({ params }: { params: Params }) {
  const [found, routes] = await Promise.all([resolve(params), getSiteRoutes()]);
  if (!found) notFound();

  const { Component } = found.detail;
  return <Component parent={found.parent} slug={found.child} routes={routes} />;
}
