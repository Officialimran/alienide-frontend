import { JoinTeamCard } from "@/components/sections/team/JoinTeamCard";
import { TeamGrid } from "@/components/sections/team/TeamGrid";
import { TestimonialSlider } from "@/components/sections/testimonials/TestimonialSlider";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { RichText } from "@/components/ui/RichText";
import { WidgetRenderer } from "@/components/widgets/WidgetRenderer";
import { firstWidget, toTeamMember, toTestimonials } from "@/lib/adapters";
import { getTeamMembers } from "@/lib/api/cms";
import { TEMPLATE } from "@/lib/routes";
import { PageHeader } from "./PageHeader";
import type { TemplateProps } from "./types";

/**
 * "team" template — every active team member (GET /team-members?all=1),
 * followed by the page's testimonial widget.
 */
export async function TeamTemplate({ page, routes }: TemplateProps) {
  if (!page) return null;

  const members = (await getTeamMembers()).map(toTeamMember);
  const testimonial = firstWidget(page.widgets, "testimonial");
  const testimonials = toTestimonials(testimonial?.content);
  const contactHref = routes.byTemplate[TEMPLATE.contact];

  return (
    <>
      <PageHeader page={page} />

      <section className="relative z-10 -mt-[100px] rounded-section bg-white pt-[60px] pb-[60px] md:pt-[80px] md:pb-[80px] mx:pt-[100px] mx:pb-[100px] xl:pt-[150px] xl:pb-[150px]">
        {page.content && (
          <div className="site-container mb-[60px] text-center xl:mb-[100px]">
            <Reveal className="mx-auto max-w-[760px]">
              <RichText html={page.content} className="[&_p]:m-0 [&_p+p]:mt-4" />
            </Reveal>
          </div>
        )}

        <div className="site-container">
          {members.length > 0 ? (
            <Reveal>
              <TeamGrid
                members={members}
                gridClassName="grid-cols-1 gap-[60px] md:grid-cols-3 md:gap-[30px] xl:grid-cols-4"
                trailing={contactHref ? <JoinTeamCard href={contactHref} /> : undefined}
              />
            </Reveal>
          ) : (
            <p className="m-0 text-center text-[16px]">Our team will be introduced here soon.</p>
          )}
        </div>

        {testimonials.length > 0 && (
          <>
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
          </>
        )}
      </section>

      <WidgetRenderer
        widgets={page.widgets}
        excludeIds={testimonial ? [testimonial.id] : []}
        context={{ title: page.title, contactHref }}
      />
    </>
  );
}
