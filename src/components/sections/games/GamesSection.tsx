import { ButtonLink } from "@/components/ui/ButtonLink";
import { DisplayTitle } from "@/components/ui/DisplayTitle";
import { Reveal } from "@/components/ui/Reveal";
import { projects } from "@/data/site";
import { StackedProjects } from "./StackedProjects";

export function GamesSection() {
  return (
    <section
      id="projects"
      className="relative rounded-section bg-dark pt-[60px] pb-[90px] md:pt-[80px] md:pb-[120px] lg:pt-[100px] lg:pb-[140px] xl:pt-[150px] xl:pb-[240px]"
    >
      <div className="site-container flex flex-wrap">
        <div className="w-full md:w-1/2">
          <Reveal>
            <DisplayTitle solid="Our" outline="Games" tone="light" />
          </Reveal>
        </div>

        <div className="order-last mt-10 flex w-full justify-center md:order-none md:mt-0 md:w-1/2 md:items-end md:justify-end">
          <Reveal>
            <ButtonLink href="/projects" className="max-md:!px-[25px] max-md:!py-[15px]">
              view all games
            </ButtonLink>
          </Reveal>
        </div>

        <Reveal className="mt-[60px] w-full xl:mt-[80px]">
          <StackedProjects projects={projects} />
        </Reveal>
      </div>
    </section>
  );
}
