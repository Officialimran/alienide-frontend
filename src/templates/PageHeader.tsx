import { PageBanner } from "@/components/layout/PageBanner";
import { fallbackImages } from "@/config/site";
import type { ApiPage } from "@/lib/api/types";
import { mediaUrl } from "@/lib/media";
import { splitTitle } from "@/lib/text";

interface PageHeaderProps {
  page: ApiPage;
  variant?: "page" | "archive";
  /** Design artwork used when the page has no cover image. */
  fallbackImage?: string;
}

/** Inner-page banner from the CMS page: two-tone title, cover image, breadcrumb. */
export function PageHeader({ page, variant = "page", fallbackImage = fallbackImages.banner }: PageHeaderProps) {
  const { solid, outline } = splitTitle(page.title);
  return (
    <PageBanner
      variant={variant}
      solid={solid}
      outline={outline}
      image={mediaUrl(page.cover) ?? fallbackImage}
      crumbs={[{ label: "Home", href: "/" }, { label: page.title }]}
    />
  );
}
