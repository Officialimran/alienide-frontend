import type { Metadata } from "next";
import { PageBanner } from "@/components/layout/PageBanner";
import { DiversitySection } from "@/components/sections/stories/DiversitySection";
import { StoryIntroSection } from "@/components/sections/stories/StoryIntroSection";
import { StudioLifeSection } from "@/components/sections/stories/StudioLifeSection";

export const metadata: Metadata = {
  title: "The Stories",
  description:
    "Meet Qamico: an award-winning independent game studio — our story, values, commitment to diversity and life at the studio.",
};

export default function StoriesPage() {
  return (
    <>
      <PageBanner
        solid="The"
        outline="Stories"
        image="/images/about/about-bc.jpg"
        crumbs={[{ label: "Home", href: "/" }, { label: "The Stories" }]}
      />
      <StoryIntroSection />
      <DiversitySection />
      <StudioLifeSection />
    </>
  );
}
