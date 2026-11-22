import type { Metadata, Viewport } from "next";
import { Anton, Unbounded } from "next/font/google";
import type { ReactNode } from "react";
import { Footer } from "@/components/layout/footer/Footer";
import { Header } from "@/components/layout/header/Header";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { siteConfig } from "@/data/site";
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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: `${siteConfig.name} – ${siteConfig.tagline}`,
    template: `%s – ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: `${siteConfig.name} – ${siteConfig.tagline}`,
    description: siteConfig.description,
    type: "website",
    images: ["/images/h1-bgvideo.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#252525",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${anton.variable} ${unbounded.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
