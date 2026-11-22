import type { IconName } from "@/components/ui/Icon";

export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
}

export interface Project {
  title: string;
  href: string;
  genre: string;
  image: string;
  platforms: IconName[];
}

export interface Service {
  title: string;
  description: string;
  icon: IconName;
  href: string;
}

export interface Award {
  title: string[];
  result: string;
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
  socials: { label: string; href: string }[];
}

export interface Testimonial {
  quote: string[];
  name: string;
  source: string;
  avatar: string;
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

export interface SocialBrand {
  name: string;
  href: string;
  logo: string;
  width: number;
}

/* ------------------------------------------------------------------
 * Detail-page layout (shared by project and service detail pages)
 * ------------------------------------------------------------------ */

/** Icon tile in the hero ("Available now" platforms / "Our services"). */
export interface DetailBadge {
  label: string;
  href: string;
  icon: IconName;
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
}

export interface DetailFeature {
  title: string;
  text: string;
  image: { src: string; w: number; h: number };
}

export interface GalleryItem {
  kind: "video" | "image";
  /** YouTube id for videos, image path for images. */
  src: string;
  thumb: string;
  alt: string;
}
