import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DetailHero } from "@/components/sections/detail/DetailHero";
import { DetailOverview } from "@/components/sections/detail/DetailOverview";
import { WidgetRenderer } from "@/components/widgets/WidgetRenderer";
import { toPlatformLinks } from "@/lib/adapters";
import { getProject } from "@/lib/api/cms";
import type { ApiProject } from "@/lib/api/types";
import { mediaUrl } from "@/lib/media";
import { pagePath, TEMPLATE, withQuery, type SiteRoutes } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/text";
import type { DetailCta, DetailFact } from "@/types";
import type { DetailTemplateProps } from "./types";

function facts(project: ApiProject, routes: SiteRoutes): DetailFact[] {
  const list: DetailFact[] = [];
  const release = formatDate(project.release_date);
  if (release) list.push({ title: "Release date", value: release });

  const platforms = project.types?.map((t) => t.name).join(", ");
  if (platforms) list.push({ title: "Platforms", value: platforms });

  const genres = project.categories ?? [];
  if (genres.length) {
    const base = routes.byTemplate[TEMPLATE.projects];
    list.push({
      title: genres.length > 1 ? "Genres" : "Genre",
      value: genres.map((g) => g.name).join(", "),
      href: base && genres.length === 1 ? withQuery(base, { genres: genres[0].slug }) : undefined,
    });
  }

  if (project.website_url) {
    list.push({ title: "Website", value: project.website_url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, ""), href: project.website_url });
  }
  return list;
}

function cta(project: ApiProject): DetailCta | undefined {
  // Jumps to the gallery section (id="gallery") on this page, which holds the trailer.
  if (project.widgets?.some((w) => w.widget_type === "gallery")) return { label: "watch the trailer", href: "#gallery", icon: "play" };
  return undefined;
}

/** Project detail at /{projects-page}/{project-slug} (GET /projects/{slug}). */
export async function ProjectDetailTemplate({ slug, routes }: DetailTemplateProps) {
  const project = await getProject(slug);
  if (!project) notFound();

  return (
    <>
      <DetailHero
        title={project.title}
        image={mediaUrl(project.cover ?? project.thumbnail)}
        badgesHeading="Available Now"
        badges={toPlatformLinks(project, routes)}
      />
      <DetailOverview
        heading="game overview"
        intro={project.excerpt ?? undefined}
        html={project.content ?? undefined}
        cta={cta(project)}
        facts={facts(project, routes)}
        socials={project.social_links.map((s) => ({ label: s.label || s.platform, href: s.url }))}
      />
      <WidgetRenderer
        widgets={project.widgets}
        context={{ title: project.title, contactHref: routes.byTemplate[TEMPLATE.contact] }}
      />
    </>
  );
}

export async function projectDetailMetadata({ parent, slug }: DetailTemplateProps): Promise<Metadata> {
  const project = await getProject(slug);
  if (!project) return {};
  return buildMetadata({
    title: project.title,
    metaTitle: project.meta_title,
    description: project.meta_description,
    fallbackDescription: project.excerpt || project.content,
    keywords: project.meta_keyword,
    image: project.cover ?? project.thumbnail,
    path: `${pagePath(parent)}/${project.slug}`,
  });
}
