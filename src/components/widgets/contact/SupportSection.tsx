import { splitHeading } from "@/components/sections/AboutSection";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { CmsImage } from "@/components/ui/CmsImage";
import { FeatureIcon } from "@/components/ui/FeatureIcon";
import { Reveal } from "@/components/ui/Reveal";
import { RichText } from "@/components/ui/RichText";
import type { ContactSupportWidgetComputed, ContactSupportWidgetContent } from "@/lib/api/types";
import { cn } from "@/lib/cn";
import { mediaUrl } from "@/lib/media";

export interface SupportWidgetData {
  content: ContactSupportWidgetContent;
  computed: ContactSupportWidgetComputed;
}

interface SupportSectionProps extends SupportWidgetData {
  /** "sidebar": the column next to the feedback form; "section": a full-width grid. */
  variant?: "sidebar" | "section";
}

type SupportItem = NonNullable<ContactSupportWidgetContent["items"]>[number];
type SupportLink = NonNullable<ContactSupportWidgetComputed["items"]>[number];

interface RevealedLink {
  href: string;
  icon: string;
  label: string;
  external: boolean;
}

const clean = (value: string | null | undefined) => value?.replace(/\s+/g, " ").trim() ?? "";

/** Icon of the card's main action, as in the theme (the phone glyph for calls). */
const ACTION_ICONS: Record<string, string> = {
  email: "fa-regular fa-envelope",
  phone: "phone",
  link: "fa-solid fa-link",
};

/** Social links, then the email / phone / link action, all revealed on hover. */
function revealedLinks(item: SupportItem, link?: SupportLink): RevealedLink[] {
  const socials = (item.socials ?? [])
    .map((s) => ({ href: clean(s.url), icon: clean(s.icon) || "fa-solid fa-link", label: clean(s.label) || clean(s.url), external: true }))
    .filter((s) => s.href);

  const action = item.action ?? "none";
  if (link?.href && action !== "none") {
    socials.push({
      href: link.href,
      icon: clean(item.icon) || ACTION_ICONS[action],
      label: clean(link.text) || clean(item.title),
      external: link.external,
    });
  }
  return socials;
}

const revealLink =
  "mr-[15px] translate-y-[10px] text-[14px] leading-none text-body opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-hover:delay-300 group-focus-within:translate-y-0 group-focus-within:opacity-100 hover:text-primary focus-visible:text-primary";

/** Theme "support box": avatar, name and role; hover/focus reveals a divider and the person's links. */
function SupportCard({ item, link }: { item: SupportItem; link?: SupportLink }) {
  const title = clean(item.title);
  const role = clean(item.description);
  const image = mediaUrl(item.icon_image);
  const icon = clean(item.icon);
  const links = revealedLinks(item, link);

  return (
    <div
      tabIndex={links.length > 0 ? 0 : undefined}
      className="group flex flex-wrap items-center rounded-[5px] border border-line bg-white p-5 transition-shadow duration-300 outline-none hover:shadow-[0_0_50px_0_rgba(0,0,0,0.07)] focus-within:shadow-[0_0_50px_0_rgba(0,0,0,0.07)]"
    >
      {image ? (
        <CmsImage src={image} alt="" width={70} height={70} className="mr-[18px] h-[70px] w-[70px] rounded-full object-cover" />
      ) : (
        <span
          aria-hidden="true"
          className="mr-[18px] flex h-[70px] w-[70px] items-center justify-center rounded-full bg-primary text-[24px] text-accent"
        >
          {icon ? <FeatureIcon icon={icon} /> : <span className="font-anton text-[28px] uppercase">{title.charAt(0)}</span>}
        </span>
      )}
      <div className="min-w-0 flex-1">
        <p className="m-0 text-[14px] leading-[1.7143] font-bold text-accent">{title}</p>
        {role && <p className="m-0 text-[14px] leading-[1.7143] font-normal text-muted">{role}</p>}
      </div>

      {links.length > 0 && (
        <div className="relative flex max-h-0 w-full items-center overflow-hidden transition-all duration-300 before:absolute before:top-5 before:left-0 before:h-px before:w-0 before:bg-line before:transition-all before:duration-300 before:content-[''] group-hover:max-h-[54px] group-hover:pt-10 group-hover:before:w-full group-focus-within:max-h-[54px] group-focus-within:pt-10 group-focus-within:before:w-full">
          {links.map((l, i) => (
            <a
              key={`${l.href}-${i}`}
              href={l.href}
              target={l.external ? "_blank" : undefined}
              rel={l.external ? "noopener noreferrer" : undefined}
              aria-label={`${title}: ${l.label}`}
              title={l.label}
              className={revealLink}
            >
              <FeatureIcon icon={l.icon} />
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * CMS "Contact Support" widget in the theme's support-box style:
 * heading, one card per person / channel, then optional support hours,
 * response time and a call-to-action button.
 */
export function SupportSection({ content, computed, variant = "section" }: SupportSectionProps) {
  const items = (content.items ?? []).map((item, i) => ({ item, link: computed.items?.[i] })).filter(({ item }) => clean(item.title));
  const heading = clean(content.heading);
  const subheading = clean(content.subheading);
  const description = content.description?.trim();
  const hours = clean(content.hours);
  const responseTime = clean(content.response_time);
  const buttonUrl = clean(content.button_url);
  const image = mediaUrl(content.image);

  if (!heading && items.length === 0 && !hours && !responseTime && !buttonUrl) return null;

  const sidebar = variant === "sidebar";
  const [before, accent, after] = splitHeading(heading, content.highlight ?? undefined);
  const meta = [
    hours && { icon: "fa-regular fa-clock", text: hours },
    responseTime && { icon: "fa-regular fa-comment-dots", text: responseTime },
  ].filter(Boolean) as { icon: string; text: string }[];

  const body = (
    <>
      {(subheading || heading || description) && (
        <Reveal className={cn("mb-[30px] text-center", sidebar ? "md:text-left" : "mx-auto max-w-[760px]")}>
          {subheading && <p className="m-0 mb-2 text-[14px] text-muted uppercase">{subheading}</p>}
          {heading && (
            <h2 className="m-0 font-anton text-[30px] leading-none font-normal text-accent uppercase">
              {before}
              {accent && <span className="text-primary">{accent}</span>}
              {after}
            </h2>
          )}
          {description && <RichText html={description} className="mt-4 text-muted [&_p]:m-0 [&_p+p]:mt-3" />}
        </Reveal>
      )}

      {image && (
        <Reveal animation="image" className="mb-[30px] overflow-hidden rounded-[20px]">
          <CmsImage src={image} alt="" width={800} height={500} className="h-auto w-full object-cover" />
        </Reveal>
      )}

      {items.length > 0 && (
        <ul className={cn("m-0 grid list-none gap-[30px] p-0", !sidebar && "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4")}>
          {items.map(({ item, link }, i) => (
            <Reveal as="li" key={`${item.title}-${i}`}>
              <SupportCard item={item} link={link} />
            </Reveal>
          ))}
        </ul>
      )}

      {(meta.length > 0 || buttonUrl) && (
        <Reveal className={cn("mt-[30px] text-center", sidebar ? "md:text-left" : "")}>
          {meta.length > 0 && (
            <ul className="m-0 mb-[25px] list-none p-0 last:mb-0">
              {meta.map((m) => (
                <li key={m.text} className="mb-3 flex items-center justify-center gap-3 text-muted last:mb-0 md:justify-start">
                  <FeatureIcon icon={m.icon} className="w-4 text-center text-accent" />
                  {m.text}
                </li>
              ))}
            </ul>
          )}
          {buttonUrl && (
            <ButtonLink href={buttonUrl} newTab={Boolean(content.button_new_tab)}>
              {clean(content.button_text) || "Learn more"}
            </ButtonLink>
          )}
        </Reveal>
      )}
    </>
  );

  return sidebar ? body : <section className="site-container mb-[60px] mx:mb-[80px] xl:mb-[150px]">{body}</section>;
}
