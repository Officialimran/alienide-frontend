import { API_ORIGIN } from "@/lib/api/client";

/**
 * Normalises a media URL coming from the CMS:
 * - stored paths ("projects/a.png", "/storage/a.png") are resolved against the backend,
 * - unsafe characters (e.g. spaces in "New Project.webp") are percent-encoded once.
 */
export function mediaUrl(src: string | null | undefined): string | undefined {
  if (!src) return undefined;
  try {
    if (/^https?:\/\//i.test(src)) return new URL(src).href;
    const path = src.startsWith("/") ? src : `/storage/${src}`;
    return new URL(path, API_ORIGIN).href;
  } catch {
    return undefined;
  }
}

/** True for images that next/image can optimise (served by our backend's /storage). */
export function isOptimizable(src: string): boolean {
  if (src.startsWith("/")) return true;
  try {
    const url = new URL(src);
    return url.origin === API_ORIGIN && url.pathname.startsWith("/storage/");
  } catch {
    return false;
  }
}
