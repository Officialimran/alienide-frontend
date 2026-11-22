import { AboutSection } from "@/components/sections/AboutSection";
import { AwardsSection } from "@/components/sections/AwardsSection";
import { CapabilitiesSection } from "@/components/sections/CapabilitiesSection";
import { CtaSection } from "@/components/sections/CtaSection";
import { GamesSection } from "@/components/sections/games/GamesSection";
import { HeroSection } from "@/components/sections/hero/HeroSection";
import { NewsletterSection } from "@/components/sections/newsletter/NewsletterSection";
import { PartnersSection } from "@/components/sections/partners/PartnersSection";
import { ServicesMarquee } from "@/components/sections/ServicesMarquee";
import { TeamSection } from "@/components/sections/team/TeamSection";
import { TestimonialsSection } from "@/components/sections/testimonials/TestimonialsSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesMarquee />
      <AboutSection />
      <GamesSection />
      <CtaSection />
      <CapabilitiesSection />
      <AwardsSection />
      <TeamSection />
      <TestimonialsSection />
      <PartnersSection />
      <NewsletterSection />
    </>
  );
}
