import { CmsImage } from "@/components/ui/CmsImage";
import { GlyphIcon } from "@/components/ui/GlyphIcon";
import type { TeamMember } from "@/types";

const revealLink =
  "mr-[15px] translate-y-[10px] text-[14px] leading-none text-body opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-hover:delay-300 group-focus-within:translate-y-0 group-focus-within:opacity-100 hover:text-primary";

/** Contact person; hovering/focusing reveals a divider and their social links. */
export function SupportCard({ person }: { person: TeamMember }) {
  return (
    <div
      tabIndex={0}
      className="group flex cursor-pointer flex-wrap items-center rounded-[5px] border border-line p-5 transition-shadow duration-300 outline-none hover:shadow-[0_0_50px_0_rgba(0,0,0,0.07)] focus-within:shadow-[0_0_50px_0_rgba(0,0,0,0.07)]"
    >
      {person.image ? (
        <CmsImage src={person.image} alt="" width={70} height={70} className="mr-[18px] h-[70px] w-[70px] rounded-full object-cover" />
      ) : (
        <span aria-hidden="true" className="mr-[18px] flex h-[70px] w-[70px] items-center justify-center rounded-full bg-primary font-anton text-[28px] text-accent uppercase">
          {person.name.charAt(0)}
        </span>
      )}
      <div className="flex-1">
        <p className="m-0 text-[14px] leading-[1.7143] font-bold text-accent">{person.name}</p>
        <p className="m-0 text-[14px] leading-[1.7143] font-normal text-muted">{person.role}</p>
      </div>

      {person.socials.length > 0 && (
        <div className="relative flex max-h-0 w-full items-center overflow-hidden transition-all duration-300 before:absolute before:top-5 before:left-0 before:h-px before:w-0 before:bg-line before:transition-all before:duration-300 before:content-[''] group-hover:max-h-[54px] group-hover:pt-10 group-hover:before:w-full group-focus-within:max-h-[54px] group-focus-within:pt-10 group-focus-within:before:w-full">
          {person.socials.map((s, i) => (
            <a
              key={`${s.href}-${i}`}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${person.name} on ${s.label || s.href}`}
              className={revealLink}
            >
              <GlyphIcon glyph={s} label={s.label || s.href} decorative />
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
