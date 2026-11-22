import type { Metadata } from "next";
import { PageBanner } from "@/components/layout/PageBanner";
import { JoinTeamCard } from "@/components/sections/team/JoinTeamCard";
import { TeamGrid } from "@/components/sections/team/TeamGrid";
import { TestimonialSlider } from "@/components/sections/testimonials/TestimonialSlider";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { teamDirectory, testimonials } from "@/data/site";

export const metadata: Metadata = {
  title: "Our Team",
  description: "Meet the artists, designers and engineers behind the Qamico indie game studio.",
};

export default function OurTeamPage() {
  return (
    <>
      <PageBanner
        solid="Our"
        outline="Team"
        image="/images/page-bc.jpg"
        crumbs={[{ label: "Home", href: "/" }, { label: "Our Team" }]}
      />

      <section className="relative z-10 -mt-[100px] rounded-section bg-white pt-[60px] pb-[60px] md:pt-[80px] md:pb-[80px] mx:pt-[100px] mx:pb-[100px] xl:pt-[150px] xl:pb-[150px]">
        <div className="site-container">
          <Reveal>
            <TeamGrid
              members={teamDirectory}
              gridClassName="grid-cols-1 gap-[60px] md:grid-cols-3 md:gap-[30px] xl:grid-cols-4"
              trailing={<JoinTeamCard />}
            />
          </Reveal>
        </div>

        {/* Green rule (150 / 80 / 60px breathing room) */}
        <div className="site-container py-[60px] mx:py-[80px] xl:py-[150px]">
          <div className="h-[5px] bg-primary" />
        </div>

        <div className="site-container">
          <Reveal className="mb-10 text-center">
            <Icon name="quote" className="text-[60px] text-primary md:text-[90px] mx:text-[100px]" />
          </Reveal>
          <Reveal>
            <TestimonialSlider items={testimonials} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
