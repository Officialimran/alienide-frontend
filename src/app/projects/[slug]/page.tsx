import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DetailFeatures } from "@/components/sections/detail/DetailFeatures";
import { DetailGallery } from "@/components/sections/detail/DetailGallery";
import { DetailHero } from "@/components/sections/detail/DetailHero";
import { DetailOverview } from "@/components/sections/detail/DetailOverview";
import { projectDetail } from "@/data/projectDetail";
import { catalog, getProject, platformLabel } from "@/data/projects";

type Params = Promise<{ slug: string }>;

/** Pre-render every game's page at build time. */
export function generateStaticParams() {
  return catalog.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return {
    title: project.title,
    description: projectDetail.overview.intro,
    openGraph: { title: project.title, images: [project.hero] },
  };
}

export default async function ProjectDetailPage({ params }: { params: Params }) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const { overview, cta, facts, features, gallery } = projectDetail;

  return (
    <>
      <DetailHero
        title={project.title}
        image={project.hero}
        badgesHeading="Available Now"
        badges={project.platforms.map((slug) => ({
          label: platformLabel(slug),
          href: `/projects?platforms=${slug}`,
          icon: slug,
        }))}
      />
      <DetailOverview heading="game overview" {...overview} cta={cta} facts={facts} />
      <DetailFeatures heading="Main features" features={features} />
      <DetailGallery items={gallery} title={project.title} />
    </>
  );
}
