import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DetailFeatures } from "@/components/sections/detail/DetailFeatures";
import { DetailGallery } from "@/components/sections/detail/DetailGallery";
import { DetailHero } from "@/components/sections/detail/DetailHero";
import { DetailOverview } from "@/components/sections/detail/DetailOverview";
import { getService, serviceDetails, serviceFacts } from "@/data/services";

type Params = Promise<{ slug: string }>;

/** Pre-render every service page at build time. */
export function generateStaticParams() {
  return serviceDetails.map((s) => ({ slug: s.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const service = getService((await params).slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.summary,
    openGraph: { title: service.title, images: [service.image] },
  };
}

/** Service detail: same layout, styling and structure as the project detail page. */
export default async function ServiceDetailPage({ params }: { params: Params }) {
  const service = getService((await params).slug);
  if (!service) notFound();

  return (
    <>
      <DetailHero
        title={service.title}
        image={service.image}
        badgesHeading="Our Services"
        badges={serviceDetails.map((s) => ({
          label: s.title,
          href: `/services/${s.slug}`,
          icon: s.icon,
          active: s.slug === service.slug,
        }))}
      />
      <DetailOverview
        heading="service overview"
        intro={service.summary}
        lead={service.paragraphs[0]}
        body={service.paragraphs[1]}
        cta={{ label: "watch the showreel", href: "#gallery", icon: "play" }}
        facts={serviceFacts(service)}
      />
      <DetailFeatures heading="What we offer" features={service.features} />
      <DetailGallery items={service.gallery} title={service.title} />
    </>
  );
}
