/**
 * Deployment-level settings (env). Website content itself comes from the CMS.
 */
export const siteConfig = {
  /** Used in the <title> template; the backend has no site-name option. */
  name: process.env.NEXT_PUBLIC_SITE_NAME ?? "Alienide",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;

/**
 * Landing sections that have no backend source yet.
 * - awards: display-only copy kept from the design (edit in AwardsSection.tsx).
 * - newsletter: off — there is no subscribe endpoint, so the form could not
 *   deliver anything. Turn on once an API exists and is wired to SubscribeForm.
 */
export const staticSections = {
  awards: true,
  newsletter: false,
} as const;

/**
 * Design artwork used when the CMS leaves an image empty
 * (page banners without a cover, the home hero without a banner image).
 */
export const fallbackImages = {
  banner: "/images/page-bc.jpg",
  projectsBanner: "/images/projects/project-bc.jpg",
  servicesBanner: "/images/services/service-bc.jpg",
  hero: "/images/h1-bgvideo.jpg",
} as const;
