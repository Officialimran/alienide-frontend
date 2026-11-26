import { ArchiveProjectCard } from "@/components/sections/projects/ArchiveProjectCard";
import { Pagination } from "@/components/sections/projects/Pagination";
import { ProjectFilter } from "@/components/sections/projects/ProjectFilter";
import { Reveal } from "@/components/ui/Reveal";
import { RichText } from "@/components/ui/RichText";
import { WidgetRenderer } from "@/components/widgets/WidgetRenderer";
import { fallbackImages } from "@/config/site";
import { toArchiveProject } from "@/lib/adapters";
import { getProjectCategories, getProjects, getProjectTypes } from "@/lib/api/cms";
import { TEMPLATE, withQuery } from "@/lib/routes";
import { PageHeader } from "./PageHeader";
import { firstParam, type TemplateProps } from "./types";

const PER_PAGE = 10;

/**
 * "projects" template — project archive with the platform / genre filter.
 * Filters use the backend's query names (?platforms=&genres=&page=).
 */
export async function ProjectsTemplate({ page, path, searchParams, routes }: TemplateProps) {
  if (!page) return null;

  const platform = firstParam(searchParams.platforms);
  const genre = firstParam(searchParams.genres);
  const current = Math.max(1, Number(firstParam(searchParams.page)) || 1);

  const [result, types, categories] = await Promise.all([
    getProjects({
      platforms: platform ? [platform] : undefined,
      genres: genre ? [genre] : undefined,
      page: current,
      perPage: PER_PAGE,
    }),
    getProjectTypes(),
    getProjectCategories(),
  ]);

  const { data: projects, meta } = result;
  const hrefFor = (n: number) => withQuery(path, { platforms: platform, genres: genre, page: n > 1 ? n : undefined });
  const contactHref = routes.byTemplate[TEMPLATE.contact];

  return (
    <>
      <PageHeader page={page} variant="archive" fallbackImage={fallbackImages.projectsBanner} />

      {/* Theme archive container ("col-full"): 1290px content with 15px gutters at every width. */}
      <div className="mx-auto w-full max-w-[1320px] px-[15px] pt-[50px] pb-[120px]">
        {/* Intro: page excerpt (heading) + page content */}
        {(page.excerpt || page.content) && (
          <header className="mb-[85px] flex flex-col items-center text-center md:items-start md:text-left mx:flex-row mx:items-center">
            {page.excerpt && (
              <Reveal
                as="h2"
                className="m-0 mb-[30px] max-w-[440px] font-anton text-[54px] leading-[64px] font-normal text-accent uppercase mx:mb-0 mx:max-w-none mx:flex-1 lg:w-[440px] lg:flex-none"
              >
                {page.excerpt}
              </Reveal>
            )}
            {page.content && (
              <Reveal className="w-full font-unbounded text-[18px] leading-[1.7] font-normal mx:ml-[30px] mx:flex-1 lg:max-w-[490px] xl:ml-20 xl:max-w-[440px]">
                <RichText html={page.content} className="[&_p]:m-0 [&_p+p]:mt-4" />
              </Reveal>
            )}
          </header>
        )}

        {/* Filter + results */}
        <section aria-label="Projects" className="border-t-[5px] border-accent pt-[30px]">
          <ProjectFilter
            action={path}
            platforms={types.map((t) => ({ value: t.slug, label: t.name }))}
            genres={categories.map((c) => ({ value: c.slug, label: c.name }))}
            platform={platform}
            genre={genre}
          />

          <p className="sr-only" role="status">
            {meta.total} {meta.total === 1 ? "project" : "projects"} found
          </p>

          {projects.length > 0 ? (
            <ul className="m-0 grid list-none grid-cols-1 gap-[30px] p-0 md:grid-cols-3">
              {projects.map((project, i) => (
                <li key={project.slug} id={project.slug}>
                  <ArchiveProjectCard project={toArchiveProject(project, routes)} priority={i < 2} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="m-0 py-10 text-[16px]">
              {platform || genre ? "No projects match these filters. Try another platform or genre." : "No projects yet."}
            </p>
          )}

          <Pagination page={meta.current_page} totalPages={meta.last_page} hrefFor={hrefFor} />
        </section>
      </div>

      <WidgetRenderer widgets={page.widgets} context={{ title: page.title, contactHref }} />
    </>
  );
}
