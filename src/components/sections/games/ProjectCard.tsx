import Link from "next/link";
import { CmsImage } from "@/components/ui/CmsImage";
import { GlyphIcon } from "@/components/ui/GlyphIcon";
import { cn } from "@/lib/cn";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  scaled?: boolean;
  priority?: boolean;
}

const pill =
  "mb-[10px] inline-block rounded-[20px] border border-white px-[25px] py-[8px] text-[14px] leading-[1.7143] text-white transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-accent";

export function ProjectCard({ project, scaled, priority }: ProjectCardProps) {
  const { genre } = project;

  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-[20px] transition-transform duration-[600ms] ease-[var(--ease-smooth)]",
        scaled && "scale-[0.96]",
      )}
    >
      <div className="img-zoom relative rounded-[20px] bg-black pt-[53.4%]">
        {project.image && (
          <CmsImage
            src={project.image}
            alt={project.title}
            fill
            priority={priority}
            sizes="(max-width: 1350px) 100vw, 1290px"
            className="rounded-[20px] object-cover"
          />
        )}
      </div>

      <div className="absolute inset-0 flex flex-col justify-end rounded-[20px] bg-[linear-gradient(180deg,rgba(0,0,0,0)_43.51%,#000000_94.43%)] p-[15px] sm:p-[80px]">
        {genre && (
          <div className="mb-[6px] flex flex-wrap">
            {genre.href ? (
              <Link href={genre.href} className={pill}>
                {genre.label}
              </Link>
            ) : (
              <span className={pill}>{genre.label}</span>
            )}
          </div>
        )}
        <div className="flex flex-wrap items-center justify-between gap-y-2">
          <h3 className="m-0 mr-5 font-anton text-[24px] leading-[1.3] font-normal text-white sm:text-[40px]">
            {project.href ? (
              <Link href={project.href} className="text-white transition-colors duration-300 hover:text-primary">
                {project.title}
              </Link>
            ) : (
              project.title
            )}
          </h3>
          <ul className="m-0 flex list-none items-center gap-5 p-0">
            {project.platforms.map((p) => (
              <li key={p.slug} className="text-[20px] text-white sm:text-[24px]">
                {p.href ? (
                  <Link href={p.href} className="transition-colors hover:text-primary">
                    <GlyphIcon glyph={p} label={p.label} />
                  </Link>
                ) : (
                  <GlyphIcon glyph={p} label={p.label} />
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
