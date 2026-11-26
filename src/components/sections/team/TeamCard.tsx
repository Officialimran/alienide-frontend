import { CmsImage } from "@/components/ui/CmsImage";
import type { TeamMember } from "@/types";

interface TeamCardProps {
  member: TeamMember;
  onOpen: () => void;
}

export function TeamCard({ member, onOpen }: TeamCardProps) {
  return (
    <button type="button" onClick={onOpen} className="group block w-full cursor-pointer text-left" aria-label={`About ${member.name}`}>
      <div className="img-zoom relative rounded-[20px] pt-[123%] before:absolute before:inset-0 before:z-[2] before:bg-[linear-gradient(180deg,rgba(255,255,255,0)_57.99%,#ffffff_96.25%)] before:content-['']">
        {member.image ? (
          <CmsImage
            src={member.image}
            alt={member.name}
            fill
            sizes="(max-width: 767px) 100vw, (max-width: 880px) 50vw, 300px"
            className="rounded-[20px] object-cover"
          />
        ) : (
          <div aria-hidden="true" className="absolute inset-0 rounded-[20px] bg-beige" />
        )}
      </div>
      <div className="relative z-[3] px-[15px] lg:px-[30px]">
        <h3 className="absolute bottom-full left-[15px] m-0 w-[calc(100%-60px)] font-anton text-[30px] leading-[1.3] font-normal text-accent uppercase transition-colors duration-300 group-hover:text-primary 2xl:left-[30px] 2xl:w-[calc(100%-30px)] 2xl:text-[40px]">
          {member.name}
        </h3>
        <p className="m-0 font-anton text-[18px] leading-[1.444] text-muted uppercase">{member.role}</p>
      </div>
    </button>
  );
}
