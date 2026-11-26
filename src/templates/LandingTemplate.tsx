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
import { WidgetRenderer } from "@/components/widgets/WidgetRenderer";
import { fallbackImages, siteConfig, staticSections } from "@/config/site";
import {
  firstWidget,
  toPartners,
  toProjectCard,
  toServiceCard,
  toStats,
  toTeamMember,
  toDesignConnect,
  toOverviewCta,
  toTestimonials,
} from "@/lib/adapters";
import { getBanners, getProjects, getServices, getTeamMembers, MAX_PER_PAGE } from "@/lib/api/cms";
import { mediaUrl } from "@/lib/media";
import { heroVideoFromUrl } from "@/lib/video";
import { TEMPLATE } from "@/lib/routes";
import type { TemplateProps } from "./types";

/** How many featured items the home page shows per section. */
const HOME_LIMIT = 4;

/** Featured items first; falls back to the first items when none are flagged as featured. */
async function featuredOrFirst<T>(featured: Promise<T[]>, all: () => Promise<T[]>): Promise<T[]> {
  const items = await featured;
  return items.length > 0 ? items : (await all()).slice(0, HOME_LIMIT);
}

/**
 * "landing" template — the home page.
 * Hero ← banners · marquee/capabilities ← services · games ← projects ·
 * team ← team members · about/design-connect/testimonials/partners ← the page's widgets.
 */
export async function LandingTemplate({ page, routes }: TemplateProps) {
  const [banners, projects, allServices, team] = await Promise.all([
    getBanners(),
    featuredOrFirst(
      getProjects({ featured: true, perPage: HOME_LIMIT }).then((r) => r.data),
      () => getProjects({ perPage: HOME_LIMIT }).then((r) => r.data),
    ),
    getServices({ perPage: MAX_PER_PAGE }).then((r) => r.data),
    featuredOrFirst(getTeamMembers(true), () => getTeamMembers()),
  ]);

  const featuredServices = allServices.filter((s) => s.is_featured);
  const capabilities = (featuredServices.length > 0 ? featuredServices : allServices).slice(0, HOME_LIMIT);

  const banner = banners[0];
  const widgets = page?.widgets ?? [];
  const overview = firstWidget(widgets, "overview");
  const testimonial = firstWidget(widgets, "testimonial");
  const client = firstWidget(widgets, "client");
  const weAre = firstWidget(widgets, "we_are");

  const to = (template: string) => routes.byTemplate[template];
  const contactHref = to(TEMPLATE.contact);

  return (
    <>
      <HeroSection
        title={banner?.title || page?.title || siteConfig.name}
        subtitle={banner?.subtitle ?? page?.excerpt ?? undefined}
        href={banner?.url ?? undefined}
        image={mediaUrl(banner?.cover) ?? mediaUrl(page?.cover) ?? fallbackImages.hero}
        imageMobile={mediaUrl(banner?.cover_sd)}
        video={heroVideoFromUrl(banner?.video_url)}
      />

      <ServicesMarquee items={allServices.map((s) => s.title)} href={to(TEMPLATE.services)} />

      {overview?.content.heading && (
        <AboutSection
          heading={overview.content.heading}
          highlight={overview.content.highlight ?? undefined}
          image={mediaUrl(overview.content.image)}
          badgeText={overview.content.badge_text ?? undefined}
          intro={overview.content.intro ?? undefined}
          description={overview.content.description ?? undefined}
          stats={toStats(overview.content.stats)}
          cta={toOverviewCta(overview.content, to("about") ? { label: "more about us", href: to("about") as string } : undefined)}
        />
      )}

      {projects.length > 0 && (
        <GamesSection projects={projects.map((p) => toProjectCard(p, routes))} allHref={to(TEMPLATE.projects)} />
      )}

      {/* "Design, create & connect" ← the page's "We Are" widget (design copy when there is none). */}
      <CtaSection
        contactHref={contactHref}
        content={toDesignConnect(weAre?.content)}
      />

      {capabilities.length > 0 && (
        <CapabilitiesSection
          services={capabilities.map((s, i) => toServiceCard(s, i, routes))}
          allHref={to(TEMPLATE.services)}
        />
      )}

      {staticSections.awards && <AwardsSection />}

      {team.length > 0 && <TeamSection members={team.map(toTeamMember)} allHref={to(TEMPLATE.team)} />}

      {/* Testimonials ← the home page's "Testimonial" widget. */}
      {testimonial && (
        <TestimonialsSection heading={testimonial.content.heading ?? undefined} items={toTestimonials(testimonial.content)} />
      )}

      {client && (
        <PartnersSection heading={client.content.heading ?? undefined} partners={toPartners(client.content)} contactHref={contactHref} />
      )}

      {staticSections.newsletter && <NewsletterSection />}

      {/* Any other widget added to the landing page (FAQ, gallery, features …). */}
      <WidgetRenderer
        widgets={widgets}
        excludeIds={[overview?.id, weAre?.id, testimonial?.id, client?.id].filter((id): id is number => id !== undefined)}
        context={{ title: page?.title ?? siteConfig.name, contactHref }}
      />
    </>
  );
}
