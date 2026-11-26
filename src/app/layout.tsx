import type { Metadata, Viewport } from "next";
import { Anton, Unbounded } from "next/font/google";
import type { ReactNode } from "react";
import { Footer } from "@/components/layout/footer/Footer";
import { Header } from "@/components/layout/header/Header";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { siteConfig } from "@/config/site";
import { getNavigation } from "@/lib/api/cms";
import type { ApiNavigation } from "@/lib/api/types";
import { getFooterMenu, getHeaderMenu, toNavLinks } from "@/lib/navigation";
import { getSiteRoutes, TEMPLATE, type SiteRoutes } from "@/lib/routes";
import { EMPTY_SETTINGS, getSiteSettings } from "@/lib/settings";
import "./globals.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin", "latin-ext"],
  variable: "--font-anton-family",
  display: "swap",
});

const unbounded = Unbounded({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-unbounded-family",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s – ${siteConfig.name}`,
  },
  openGraph: { siteName: siteConfig.name, type: "website" },
};

export const viewport: Viewport = {
  themeColor: "#252525",
};

/** The header/footer must still render (e.g. on error pages) if the API is unreachable. */
async function orFallback<T>(promise: Promise<T>, fallback: T, label: string): Promise<T> {
  try {
    return await promise;
  } catch (error) {
    console.error(`[layout] Could not load ${label}:`, error);
    return fallback;
  }
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const [navigation, settings, routes] = await Promise.all([
    orFallback<ApiNavigation>(getNavigation(), {}, "navigation"),
    orFallback(getSiteSettings(), EMPTY_SETTINGS, "site options"),
    orFallback<SiteRoutes>(getSiteRoutes(), { byTemplate: {} }, "page routes"),
  ]);

  const headerLinks = toNavLinks(getHeaderMenu(navigation)?.items, routes.landingSlug);
  const footerLinks = toNavLinks(getFooterMenu(navigation)?.items, routes.landingSlug);

  return (
    <html lang="en" className={`${anton.variable} ${unbounded.variable}`}>
      <body>
        <Header
          items={headerLinks}
          logo={settings.headerLogo}
          drawerLogo={settings.footerLogo ?? settings.headerLogo}
          button={settings.headerButton}
        />
        <main>{children}</main>
        <Footer
          settings={settings}
          columns={footerLinks
            .filter((link) => link.children?.length)
            .map((link) => ({ title: link.label, links: link.children ?? [] }))}
          bottomLinks={footerLinks.filter((link) => !link.children?.length)}
          contactHref={routes.byTemplate[TEMPLATE.contact]}
        />
        <ScrollToTop />
      </body>
    </html>
  );
}
