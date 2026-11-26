import { StoryOverview } from "@/components/sections/stories/StoryOverview";
import { StudioLifeSection } from "@/components/sections/stories/StudioLifeSection";
import { ValuesSection } from "@/components/sections/stories/ValuesSection";
import { Reveal } from "@/components/ui/Reveal";
import { RichText } from "@/components/ui/RichText";
import { WeAreSection } from "@/components/widgets/WeAreSection";
import { WidgetRenderer } from "@/components/widgets/WidgetRenderer";
import { firstWidget, toFeatures, toGalleryItems, toOverviewCta, toStats } from "@/lib/adapters";
import { mediaUrl } from "@/lib/media";
import { TEMPLATE } from "@/lib/routes";
import { PageHeader } from "./PageHeader";
import type { TemplateProps } from "./types";

/**
 * "about" template — e.g. /the-stories. Each block is driven by one of the page's widgets:
 *   Overview → story, photo and counters (white panel over the banner)
 *   Features → "our values" row (same panel, under a green rule)
 *   We Are   → illustration + copy (beige panel, e.g. "Diversity & Inclusion")
 *   Gallery  → "studio life" photo strips + "Let's build worlds" call to action (dark panel)
 * Any other widgets on the page follow in their CMS order.
 */
export function AboutTemplate({ page, routes }: TemplateProps) {
  if (!page) return null;

  const widgets = page.widgets ?? [];
  const overview = firstWidget(widgets, "overview");
  const features = firstWidget(widgets, "features");
  const weAre = firstWidget(widgets, "we_are");
  const gallery = firstWidget(widgets, "gallery");
  const contactHref = routes.byTemplate[TEMPLATE.contact];

  // The CMS can return the literal string "null" for empty content.
  const content = page.content && page.content.trim() !== "null" ? page.content : null;
  const o = overview?.content;
  const values = toFeatures(features?.content);
  const placed = [overview, features, weAre, gallery].flatMap((w) => (w ? [w.id] : []));

  return (
    <>
      <PageHeader page={page} fallbackImage="/images/about/about-bc.jpg" />

      {/* White rounded panel overlapping the banner. */}
      <section className="relative z-10 -mt-[100px] rounded-section bg-white py-[60px] mx:py-[80px] xl:py-[150px]">
        <div className="site-container">
          {content && (
            <Reveal className="mb-[60px] md:mb-[80px] xl:mb-[150px]">
              <RichText html={content} className="mx-auto max-w-[960px]" as="article" />
            </Reveal>
          )}

          {o && (
            <StoryOverview
              heading={o.heading ?? undefined}
              highlight={o.highlight ?? undefined}
              image={mediaUrl(o.image)}
              badgeText={o.badge_text ?? undefined}
              intro={o.intro ?? undefined}
              description={o.description ?? undefined}
              stats={toStats(o.stats)}
              cta={toOverviewCta(o)}
            />
          )}

          <ValuesSection
            heading={features?.content.heading ?? undefined}
            description={features?.content.description ?? undefined}
            values={values}
            ruled={Boolean(o || content)}
          />
        </div>
      </section>

      {weAre && <WeAreSection content={weAre.content} />}

      {gallery && (
        <StudioLifeSection
          heading={gallery.content.heading ?? undefined}
          description={gallery.content.description ?? undefined}
          items={toGalleryItems(gallery.content)}
          contactHref={contactHref}
        />
      )}

      <WidgetRenderer widgets={widgets} excludeIds={placed} context={{ title: page.title, contactHref }} />
    </>
  );
}
