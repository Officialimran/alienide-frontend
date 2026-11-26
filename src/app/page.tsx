import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { getPages } from "@/lib/api/cms";
import { getSiteRoutes, TEMPLATE } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";
import { LandingTemplate } from "@/templates/LandingTemplate";
import type { SearchParams } from "@/templates/types";

/** The home page is the newest active CMS page using the "landing" template. */
async function getLandingPage() {
  const [page] = await getPages(TEMPLATE.landing);
  return page ?? null;
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getLandingPage();
  if (!page) return { title: { absolute: siteConfig.name } };
  return pageMetadata(page, "/", { absoluteTitle: true });
}

export default async function HomePage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const [page, routes, params] = await Promise.all([getLandingPage(), getSiteRoutes(), searchParams]);
  return <LandingTemplate page={page} path="/" searchParams={params} routes={routes} />;
}
