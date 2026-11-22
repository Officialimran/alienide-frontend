import type { Metadata } from "next";
import { PageBanner } from "@/components/layout/PageBanner";
import { ArchiveProjectCard } from "@/components/sections/projects/ArchiveProjectCard";
import { Pagination } from "@/components/sections/projects/Pagination";
import { ProjectFilter } from "@/components/sections/projects/ProjectFilter";
import { Reveal } from "@/components/ui/Reveal";
import { genreOptions, platformOptions, queryProjects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Browse the games developed and published by the Qamico indie game studio, filtered by platform or genre.",
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) || undefined;

export default async function ProjectsPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const platform = one(params.platforms);
  const genre = one(params.genres);
  const { items, page, totalPages, total } = queryProjects({ platform, genre, page: Number(one(params.page)) || 1 });

  const hrefFor = (n: number) => {
    const q = new URLSearchParams();
    if (platform) q.set("platforms", platform);
    if (genre) q.set("genres", genre);
    if (n > 1) q.set("page", String(n));
    const s = q.toString();
    return s ? `/projects?${s}` : "/projects";
  };

  return (
    <>
      <PageBanner
        variant="archive"
        solid="Our"
        outline="Games"
        image="/images/projects/project-bc.jpg"
        crumbs={[{ label: "Home", href: "/" }, { label: "Projects" }]}
      />

      {/* Theme archive container ("col-full"): 1290px content with 15px gutters at every width. */}
      <div className="mx-auto w-full max-w-[1320px] px-[15px] pt-[50px] pb-[120px]">
        {/* Intro */}
        <header className="mb-[85px] flex flex-col items-center text-center md:items-start md:text-left mx:flex-row mx:items-center">
          <Reveal
            as="h2"
            className="m-0 mb-[30px] max-w-[440px] font-anton text-[54px] leading-[64px] font-normal text-accent uppercase mx:mb-0 mx:max-w-none mx:flex-1 lg:w-[440px] lg:flex-none"
          >
            latest develop and publish games
          </Reveal>
          {/* The original's 520px box includes the indent, so the text column is 490px / 440px. */}
          <Reveal className="w-full font-unbounded text-[18px] leading-[1.7] font-normal mx:ml-[30px] mx:flex-1 lg:max-w-[490px] xl:ml-20 xl:max-w-[440px]">
            We’re immensely proud of the games we’ve made, but we know the best is still to come. Keep watching this
            space.
          </Reveal>
        </header>

        {/* Filter + results */}
        <section aria-label="Projects" className="border-t-[5px] border-accent pt-[30px]">
          <ProjectFilter platforms={platformOptions} genres={genreOptions} platform={platform} genre={genre} />

          <p className="sr-only" role="status">
            {total} {total === 1 ? "project" : "projects"} found
          </p>

          {items.length > 0 ? (
            <ul className="m-0 grid list-none grid-cols-1 gap-[30px] p-0 md:grid-cols-2">
              {items.map((project, i) => (
                <li key={project.slug} id={project.slug}>
                  <ArchiveProjectCard project={project} priority={i < 2} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="m-0 py-10 text-[16px]">No projects match these filters. Try another platform or genre.</p>
          )}

          <Pagination page={page} totalPages={totalPages} hrefFor={hrefFor} />
        </section>
      </div>
    </>
  );
}
