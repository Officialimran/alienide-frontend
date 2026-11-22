import Image from "next/image";
import Link from "next/link";
import type { TeamMember } from "@/types";

/** Staggered fade-up used for each line of the active slide. */
const stagger =
  "translate-y-[30px] opacity-0 transition-[opacity,transform] duration-[400ms] in-[.swiper-slide-active]:translate-y-0 in-[.swiper-slide-active]:opacity-100";

export function TeamSlide({ member }: { member: TeamMember }) {
  return (
    <div className="flex max-w-[1100px] flex-col items-center justify-between md:flex-row">
      <div className="w-full md:w-[40%]">
        <div className="relative pt-[123%]">
          <Image
            src={member.image}
            alt={member.name}
            width={600}
            height={740}
            className="absolute bottom-0 left-0 h-[68%] w-[68%] rounded-[20px] object-cover transition-[width,height] duration-[400ms] group-data-[open=true]/team:h-full group-data-[open=true]/team:w-full"
          />
        </div>
      </div>

      <div className="mt-[30px] w-full max-w-[580px] text-center md:mt-0 md:w-[53%] md:text-left">
        <h3 className={`m-0 mb-[9px] font-anton text-[40px] leading-[1.1] font-normal text-accent uppercase delay-200 md:text-[80px] ${stagger}`}>
          {member.name}
        </h3>
        <p className={`m-0 font-anton text-[18px] leading-[1.444] text-primary uppercase delay-300 ${stagger}`}>
          {member.role}
        </p>
        <div className="mt-8 mb-[30px] hidden h-px w-0 bg-line transition-[width] delay-[400ms] duration-[400ms] lg:block in-[.swiper-slide-active]:w-full" />
        <p className={`m-0 mt-5 delay-500 lg:mt-0 ${stagger}`}>{member.bio}</p>
        <ul className={`m-0 mt-[30px] flex list-none items-center justify-center p-0 delay-700 md:justify-start ${stagger}`}>
          {member.socials.map((s) => (
            <li
              key={s.label}
              className="flex items-center after:mx-[10px] after:inline-block after:h-4 after:w-px after:bg-line last:after:hidden"
            >
              <Link href={s.href} className="font-anton text-[18px] text-muted uppercase transition-colors hover:text-primary">
                {s.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
