import type { IconName } from "@/components/ui/Icon";

/**
 * View models rendered by the components. Backend responses are mapped to
 * these in src/lib/adapters.ts, so components stay independent of the API.
 */

export interface NavLink {
  id?: number;
  label: string;
  href: string;
  newTab?: boolean;
  children?: NavLink[];
}

/** Icon from the theme's icon font or an image uploaded in the CMS. */
export interface Glyph {
  icon?: IconName;
  image?: string;
}

/** Platform badge (project type): links to the projects listing filtered by it. */
export interface PlatformLink extends Glyph {
  slug: string;
  label: string;
  href?: string;
}

export interface TagLink {
  label: string;
  href?: string;
}

/** Home "Our games" stacked card. */
export interface Project {
  title: string;
  href?: string;
  genre?: TagLink;
  image?: string;
  platforms: PlatformLink[];
}

/** Projects archive card. */
export interface ArchiveProject {
  slug: string;
  title: string;
  href?: string;
  image?: string;
  genres: TagLink[];
}

/** Home "Our capabilities" item. */
export interface Service extends Glyph {
  title: string;
  description: string;
  href?: string;
}

/** Full-width row on the services listing. */
export interface ServiceRowData {
  title: string;
  href?: string;
  image?: string;
  tags: TagLink[];
  /** CMS HTML (excerpt or content). */
  html?: string;
}

export interface SocialItem extends Glyph {
  label: string;
  href: string;
}

export interface TeamMember {
  name: string;
  role: string;
  image?: string;
  /** CMS HTML. */
  bio?: string;
  socials: SocialItem[];
}

export interface Testimonial {
  quote: string;
  name: string;
  source?: string;
  avatar?: string;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface FooterColumn {
  title: string;
  links: NavLink[];
}

export interface Partner {
  name: string;
  href?: string;
  logo?: { src: string; width: number; height: number };
  /** Placeholder mark used when no logo is set. */
  mark?: IconName;
}

/* ------------------------------------------------------------------
 * Detail-page layout (shared by project and service detail pages)
 * ------------------------------------------------------------------ */

/** Icon tile in the hero ("Available now" platforms / "Our services"). */
export interface DetailBadge extends Glyph {
  label: string;
  href?: string;
  /** Highlight the tile for the page you are on. */
  active?: boolean;
}

/** One row of the grey facts card. */
export interface DetailFact {
  title: string;
  value: string;
  href?: string;
}

export interface DetailCta {
  label: string;
  href: string;
  icon: "play" | "arrow";
  newTab?: boolean;
}

/** Call-to-action button set in the CMS. */
export interface OverviewCta {
  label: string;
  href: string;
  newTab?: boolean;
}

export interface DetailFeature {
  title: string;
  text: string;
  image?: { src: string; w: number; h: number };
  icon?: string;
}

export interface GalleryItem {
  /** "embed": YouTube/Vimeo player URL; "file": direct video file; "image": picture. */
  kind: "embed" | "file" | "image";
  src: string;
  thumb?: string;
  alt: string;
}

export interface FaqItem {
  question: string;
  /** CMS HTML. */
  answer: string;
}
