import { ButtonLink } from "@/components/ui/ButtonLink";
import { DisplayTitle } from "@/components/ui/DisplayTitle";
import { Reveal } from "@/components/ui/Reveal";
import type { TeamMember } from "@/types";
import { TeamGrid } from "./TeamGrid";

/** Home: featured team members (GET /team-members?featured=1). */
export function TeamSection({ members, allHref }: { members: TeamMember[]; allHref?: string }) {
  return (
    <section
      id="team"
      className="relative z-10 overlap-section rounded-section bg-white pt-[60px] pb-[60px] md:pt-[80px] md:pb-[80px] lg:pt-[100px] lg:pb-[100px] xl:pt-[150px] xl:pb-[150px]"
    >
      <div className="site-container flex flex-wrap">
        <Reveal className="w-full text-center md:w-1/2 md:text-left">
          <DisplayTitle solid="definitive" outline="Team" />
        </Reveal>

        {allHref && (
          <div className="order-last mt-[30px] flex w-full justify-center md:order-none md:mt-0 md:w-1/2 md:items-end md:justify-end">
            <Reveal>
              <ButtonLink href={allHref} className="max-md:!px-[25px] max-md:!py-[15px]">
                meet all members
              </ButtonLink>
            </Reveal>
          </div>
        )}

        <Reveal className="mt-[30px] w-full md:mt-[60px] lg:mt-[80px]">
          <TeamGrid members={members} />
        </Reveal>
      </div>
    </section>
  );
}
