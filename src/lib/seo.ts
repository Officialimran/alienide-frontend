import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import type { ApiPage } from "@/lib/api/types";
import { mediaUrl } from "@/lib/media";
import { plainText, truncate } from "@/lib/text";

interface SeoInput {
  title: string;
  metaTitle?: string | null;
  description?: string | null;
  /** Fallback source for the description (HTML allowed). */
  fallbackDescription?: string | null;
  keywords?: string | null;
  image?: string | null;
  path: string;
  /** Use the title as-is, without the "– Site name" suffix (home page). */
  absoluteTitle?: boolean;
}

/** Next.js metadata from the SEO fields the CMS stores on pages, projects and services. */
export function buildMetadata({
  title,
  metaTitle,
  description,
  fallbackDescription,
  keywords,
  image,
  path,
  absoluteTitle,
}: SeoInput): Metadata {
  const pageTitle = metaTitle?.trim() || title;
  const desc = description?.trim() || truncate(plainText(fallbackDescription), 160) || undefined;
  const img = mediaUrl(image);

  return {
    title: absoluteTitle ? { absolute: pageTitle } : pageTitle,
    description: desc,
    keywords: keywords
      ?.split(",")
      .map((k) => k.trim())
      .filter(Boolean),
    alternates: { canonical: path },
    openGraph: {
      title: pageTitle,
      description: desc,
      url: path,
      siteName: siteConfig.name,
      type: "website",
      images: img ? [img] : undefined,
    },
    twitter: { card: img ? "summary_large_image" : "summary", title: pageTitle, description: desc, images: img ? [img] : undefined },
  };
}

export function pageMetadata(page: ApiPage, path: string, options: { absoluteTitle?: boolean } = {}): Metadata {
  return buildMetadata({
    title: page.title,
    metaTitle: page.meta_title,
    description: page.meta_description,
    fallbackDescription: page.excerpt || page.content,
    keywords: page.main_keyword,
    image: page.cover,
    path,
    ...options,
  });
}
