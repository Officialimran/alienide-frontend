import Link from "next/link";
import { CmsImage } from "@/components/ui/CmsImage";
import type { ArchiveProject } from "@/types";

const pill =
  "mx-[5px] mb-[10px] inline-block rounded-[20px] border border-white px-[25px] py-2 text-[14px] leading-[1.7143] text-white transition-all duration-300 hover:border-primary hover:bg-primary hover:text-accent";

/** Archive card: just the artwork until hovered/focused, then genre pills + title fade in. */
export function ArchiveProjectCard({ project, priority }: { project: ArchiveProject; priority?: boolean }) {
  return (
    <article className="group img-zoom relative rounded-[20px]">
      {project.image ? (
        <CmsImage
          src={project.image}
          alt={project.title}
          width={945}
          height={675}
          priority={priority}
          sizes="(max-width: 767px) 100vw, (max-width: 1350px) 50vw, 630px"
          className="block aspect-[945/675] h-auto w-full rounded-[20px] object-cover"
        />
      ) : (
        <div aria-hidden="true" className="aspect-[945/675] w-full rounded-[20px] bg-dark" />
      )}
      <div className="absolute inset-0 flex flex-col justify-end rounded-[20px] bg-[linear-gradient(180deg,rgba(0,0,0,0)_43.51%,#000000_94.43%)] px-[50px] py-10 opacity-0 transition-opacity duration-300 group-focus-within:opacity-100 group-hover:opacity-100 max-sm:p-5">
        <ul className="-mx-[5px] mb-[6px] flex list-none flex-wrap p-0">
          {project.genres.map((g) => (
            <li key={g.label}>
              {g.href ? (
                <Link href={g.href} className={pill}>
                  {g.label}
                </Link>
              ) : (
                <span className={pill}>{g.label}</span>
              )}
            </li>
          ))}
        </ul>
        <h2 className="m-0 font-anton text-[30px] leading-[1.3] font-normal min-[501px]:text-[40px]">
          {project.href ? (
            <Link href={project.href} className="text-white transition-colors duration-300 hover:text-primary">
              {project.title}
            </Link>
          ) : (
            <span className="text-white">{project.title}</span>
          )}
        </h2>
      </div>
    </article>
  );
}
