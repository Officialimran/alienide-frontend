import type { Metadata } from "next";
import { PageBanner } from "@/components/layout/PageBanner";
import { ServiceRow } from "@/components/sections/services/ServiceRow";
import { ServicesCtaSection } from "@/components/sections/services/ServicesCtaSection";
import { ServicesIntro } from "@/components/sections/services/ServicesIntro";
import { serviceDetails } from "@/data/services";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Game development, game design, art direction and multiplatform development from the Qamico indie game studio.",
};

export default function ServicesPage() {
  return (
    <>
      <PageBanner
        solid="Our"
        outline="Services"
        image="/images/services/service-bc.jpg"
        crumbs={[{ label: "Home", href: "/" }, { label: "Our Services" }]}
      />
      <ServicesIntro />
      {serviceDetails.map((service, i) => (
        <ServiceRow key={service.title} service={service} first={i === 0} last={i === serviceDetails.length - 1} />
      ))}
      <ServicesCtaSection />
    </>
  );
}
