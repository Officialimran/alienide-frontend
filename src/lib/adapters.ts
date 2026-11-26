import type { DesignConnectContent } from "@/components/sections/shared/DesignConnect";
import { isIconName, type IconName } from "@/components/ui/Icon";
import type {
  ApiProject,
  ApiService,
  ApiTeamMember,
  ApiWidget,
  ClientWidgetContent,
  FaqWidgetContent,
  FeaturesWidgetContent,
  GalleryWidgetContent,
  OverviewWidgetContent,
  TestimonialWidgetContent,
  WeAreWidgetContent,
  WidgetComputedMap,
  WidgetContentMap,
  WidgetType,
} from "@/lib/api/types";
import { mediaUrl } from "@/lib/media";
import { childPath, TEMPLATE, withQuery, type SiteRoutes } from "@/lib/routes";
import { plainText, truncate } from "@/lib/text";
import type {
  ArchiveProject,
  DetailFeature,
  FaqItem,
  GalleryItem,
  OverviewCta,
  Glyph,
  Partner,
  PlatformLink,
  Project,
  Service,
  ServiceRowData,
  Stat,
  TagLink,
  TeamMember,
  Testimonial,
} from "@/types";

/* ------------------------------------------------------------------
 * Widgets
 * ------------------------------------------------------------------ */

/** First widget of a type (in display order), with its id so templates can exclude it from the generic list. */
export function firstWidget<T extends WidgetType>(
  widgets: ApiWidget[] | undefined,
  type: T,
): { id: number; content: WidgetContentMap[T]; computed: Partial<WidgetComputedMap[T]> } | undefined {
  const widget = (widgets ?? [])
    .filter((w) => w.widget_type === type)
    .sort((a, b) => a.sort_order - b.sort_order)[0];
  return widget
    ? {
        id: widget.id,
        content: widget.content as WidgetContentMap[T],
        computed: (widget.computed ?? {}) as Partial<WidgetComputedMap[T]>,
      }
    : undefined;
}

export function toTestimonials(content: TestimonialWidgetContent | undefined): Testimonial[] {
  return (content?.items ?? [])
    .filter((t) => t.message && t.name)
    .map((t) => ({
      quote: t.message,
      name: t.name,
      source: t.designation ?? undefined,
      avatar: mediaUrl(t.image),
    }));
}

/** "80M" + "+" → { value: 80, suffix: "M+" } so the counter can animate the number. */
export function toStats(stats: OverviewWidgetContent["stats"]): Stat[] {
  return (stats ?? []).map((s) => {
    const match = String(s.value ?? "").trim().match(/^(\d+(?:\.\d+)?)(.*)$/);
    return match
      ? { value: Number(match[1]), suffix: `${match[2]}${s.suffix ?? ""}`, label: s.label }
      : { value: 0, suffix: `${s.value}${s.suffix ?? ""}`, label: s.label };
  });
}

export function toPartners(content: ClientWidgetContent | undefined): Partner[] {
  return (content?.items ?? [])
    .filter((c) => c.name)
    .map((c) => {
      const src = mediaUrl(c.image);
      return { name: c.name, logo: src ? { src, width: 240, height: 80 } : undefined };
    });
}

export function toGalleryItems(content: GalleryWidgetContent | undefined): GalleryItem[] {
  const items: GalleryItem[] = [];
  for (const [i, item] of (content?.items ?? []).entries()) {
    const alt = item.alt || item.title || `Item ${i + 1}`;
    if (item.type === "video" && item.video?.url) {
      const video = item.video;
      if (video.embed_url) {
        items.push({ kind: "embed", src: video.embed_url, thumb: video.thumbnail ?? undefined, alt });
      } else {
        items.push({ kind: "file", src: video.url as string, alt });
      }
    } else {
      const src = mediaUrl(item.image);
      if (src) items.push({ kind: "image", src, thumb: src, alt });
    }
  }
  return items;
}

/** Overview "Learn more" button (label defaults to "Learn More"); `fallback` when no link is set. */
export function toOverviewCta(
  content: OverviewWidgetContent | undefined,
  fallback?: OverviewCta,
): OverviewCta | undefined {
  const link = content?.button_url?.trim();
  if (!link) return fallback;
  // Accepts a full URL, a path ("/about-us"), an anchor, or a bare page slug ("about-us").
  const href = /^(https?:\/\/|\/|#|mailto:|tel:)/i.test(link) ? link : `/${link}`;
  return { label: content?.button_text?.trim() || "Learn More", href, newTab: Boolean(content?.button_new_tab) };
}

/** "We Are" widget → the "Design, create & connect" block (home & services pages). */
export function toDesignConnect(content: WeAreWidgetContent | undefined): DesignConnectContent | undefined {
  if (!content) return undefined;
  return {
    heading: content.heading,
    intro: content.intro,
    description: content.description,
    image: mediaUrl(content.image),
    imagePosition: content.image_position,
  };
}

export function toFeatures(content: FeaturesWidgetContent | undefined): DetailFeature[] {
  return (content?.items ?? [])
    .filter((f) => f.title)
    .map((f) => {
      const icon = f.icon?.trim() || undefined;
      // An image link pasted into the icon field counts as the image.
      const src = mediaUrl(f.image) ?? (icon && isMediaPath(icon) ? mediaUrl(icon) : undefined);
      return {
        title: f.title,
        text: f.description ?? "",
        image: src ? { src, w: 409, h: 300 } : undefined,
        icon: src ? undefined : icon,
      };
    });
}

export function toFaqItems(content: FaqWidgetContent | undefined): FaqItem[] {
  return (content?.items ?? []).filter((f) => f.question && f.answer);
}

/* ------------------------------------------------------------------
 * Projects
 * ------------------------------------------------------------------ */

const isMediaPath = (v: string) => /^(https?:\/\/|\/|storage\/|[\w-]+\/.+\.\w{2,5}$)/i.test(v);

/** Platform icon: uploaded image, a theme glyph named by `icon`, or a glyph matching the slug. */
export function platformGlyph(type: { slug: string; icon?: string | null }): Glyph {
  if (type.icon && isMediaPath(type.icon)) return { image: mediaUrl(type.icon) };
  if (isIconName(type.icon)) return { icon: type.icon };
  if (isIconName(type.slug)) return { icon: type.slug };
  return {};
}

function projectsFilterHref(routes: SiteRoutes, key: "platforms" | "genres", slug: string) {
  const base = routes.byTemplate[TEMPLATE.projects];
  return base ? withQuery(base, { [key]: slug }) : undefined;
}

export function toPlatformLinks(project: ApiProject, routes: SiteRoutes): PlatformLink[] {
  return (project.types ?? []).map((t) => ({
    slug: t.slug,
    label: t.name,
    href: projectsFilterHref(routes, "platforms", t.slug),
    ...platformGlyph(t),
  }));
}

function toGenreLinks(project: ApiProject, routes: SiteRoutes): TagLink[] {
  return (project.categories ?? []).map((c) => ({ label: c.name, href: projectsFilterHref(routes, "genres", c.slug) }));
}

export function toProjectCard(project: ApiProject, routes: SiteRoutes): Project {
  return {
    title: project.title,
    href: childPath(routes, TEMPLATE.projects, project.slug),
    genre: toGenreLinks(project, routes)[0],
    image: mediaUrl(project.cover ?? project.thumbnail),
    platforms: toPlatformLinks(project, routes),
  };
}

export function toArchiveProject(project: ApiProject, routes: SiteRoutes): ArchiveProject {
  return {
    slug: project.slug,
    title: project.title,
    href: childPath(routes, TEMPLATE.projects, project.slug),
    image: mediaUrl(project.thumbnail ?? project.cover),
    genres: toGenreLinks(project, routes),
  };
}

/* ------------------------------------------------------------------
 * Services
 * ------------------------------------------------------------------ */

/**
 * Services have no icon field in the CMS; the theme's capability glyphs
 * are used in turn as decoration.
 */
const SERVICE_GLYPHS: IconName[] = ["swords", "treasure-map", "magic-wand", "crown"];
export const serviceGlyph = (index: number): IconName => SERVICE_GLYPHS[index % SERVICE_GLYPHS.length];

export function serviceSummary(service: ApiService, max = 220): string {
  return truncate(service.excerpt?.trim() || plainText(service.content), max);
}

export function toServiceCard(service: ApiService, index: number, routes: SiteRoutes): Service {
  return {
    title: service.title,
    description: serviceSummary(service),
    href: childPath(routes, TEMPLATE.services, service.slug),
    icon: serviceGlyph(index),
  };
}

export function toServiceRow(service: ApiService, routes: SiteRoutes): ServiceRowData {
  const base = routes.byTemplate[TEMPLATE.services];
  return {
    title: service.title,
    href: childPath(routes, TEMPLATE.services, service.slug),
    image: mediaUrl(service.cover ?? service.thumbnail),
    tags: service.tags.map((tag) => ({ label: tag, href: base ? withQuery(base, { tags: tag }) : undefined })),
    html: service.content?.trim() ? service.content : service.excerpt ? `<p>${escapeHtml(service.excerpt)}</p>` : undefined,
  };
}

/* ------------------------------------------------------------------
 * Team
 * ------------------------------------------------------------------ */

export function toTeamMember(member: ApiTeamMember): TeamMember {
  return {
    name: member.name,
    role: member.designation ?? "",
    image: mediaUrl(member.image),
    bio: member.content ?? undefined,
    socials: (member.social_links ?? [])
      .filter((s) => s.url)
      .map((s) => ({ label: s.label ?? "", href: s.url as string, image: mediaUrl(s.icon) })),
  };
}

/* ------------------------------------------------------------------ */

function escapeHtml(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
