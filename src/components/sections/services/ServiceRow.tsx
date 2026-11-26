import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { RichText } from "@/components/ui/RichText";
import { cn } from "@/lib/cn";
import type { ServiceRowData } from "@/types";

interface ServiceRowProps {
  service: ServiceRowData;
  first?: boolean;
  last?: boolean;
}

const tagClass =
  "btn !rounded-[30px] bg-white !px-[23px] !py-[9px] text-accent hover:!rounded-[30px] hover:text-white focus-visible:text-white";

/**
 * Full-width dark row. Its photo sits under an opaque overlay that thins on
 * hover, so the image faintly shows through (as on the original).
 */
export function ServiceRow({ service, first, last }: ServiceRowProps) {
  return (
    <section
      className={cn(
        "group relative overflow-hidden bg-dark bg-cover bg-center",
        first && "z-10 -mt-[60px] rounded-section mx:-mt-[80px] xl:-mt-[150px]",
      )}
      style={service.image ? { backgroundImage: `url("${service.image}")` } : undefined}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-dark transition-opacity duration-300 group-hover:opacity-80"
      />

      <div className="site-container relative">
        <div
          className={cn(
            "flex flex-col md:flex-row",
            last
              ? "pt-[60px] pb-[120px] mx:pt-[80px] mx:pb-[160px] xl:pt-[150px] xl:pb-[240px]"
              : "border-b-[5px] border-white py-[60px] mx:py-[80px] xl:py-[150px]",
          )}
        >
          <div className="w-full md:w-1/2 mx:w-[45%] xl:w-[40%]">
            <Reveal
              as="h2"
              className="m-0 mb-[30px] font-anton text-[42px] leading-[1.2] font-normal text-white uppercase md:mb-0 md:text-[54px]"
            >
              {service.href ? (
                <Link href={service.href} className="transition-colors duration-300 hover:text-primary">
                  {service.title}
                </Link>
              ) : (
                service.title
              )}
            </Reveal>
          </div>

          <Reveal className="w-full md:w-1/2 mx:w-[55%] xl:w-[60%]">
            {service.tags.length > 0 && (
              <ul className="m-0 mb-[35px] flex list-none flex-wrap gap-5 p-0">
                {service.tags.map((tag) => (
                  <li key={tag.label}>
                    {tag.href ? (
                      <Link href={tag.href} className={tagClass}>
                        {tag.label}
                      </Link>
                    ) : (
                      <span className={tagClass}>{tag.label}</span>
                    )}
                  </li>
                ))}
              </ul>
            )}
            <RichText html={service.html} className="text-muted [&_p]:m-0 [&_p+p]:mt-6" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
