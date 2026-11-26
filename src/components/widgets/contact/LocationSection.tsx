import type { CSSProperties } from "react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/ui/Reveal";
import type {
  GoogleMapWidgetComputed,
  GoogleMapWidgetContent,
  OfficeAddressWidgetComputed,
  OfficeAddressWidgetContent,
} from "@/lib/api/types";
import { cn } from "@/lib/cn";

export interface MapWidgetData {
  content: GoogleMapWidgetContent;
  computed: GoogleMapWidgetComputed;
}

export interface OfficeWidgetData {
  content: OfficeAddressWidgetContent;
  computed: OfficeAddressWidgetComputed;
}

interface LocationSectionProps {
  /** CMS "Google Map" widget. */
  map?: MapWidgetData;
  /** CMS "Office Address" widget; its first office overlaps the map. */
  office?: OfficeWidgetData;
  /** Wrap in its own section (when placed by the generic widget renderer). */
  standalone?: boolean;
}

type Office = NonNullable<OfficeAddressWidgetContent["items"]>[number];
type OfficeLinks = NonNullable<OfficeAddressWidgetComputed["items"]>[number];

/** Desktop map height of the theme's contact page; the CMS "Height" overrides it. */
const DEFAULT_MAP_HEIGHT = 650;

const clean = (value: string | null | undefined) => value?.replace(/\s+/g, " ").trim() ?? "";

function mapHeight(value: number | string | null | undefined): number {
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? Math.min(900, Math.max(200, n)) : DEFAULT_MAP_HEIGHT;
}

const blockTitle = "m-0 mb-[25px] font-anton text-[30px] leading-none font-normal text-accent uppercase";

/** One office line, theme "icon box" style: bold value (linked when possible) over a muted label. */
function DetailLine({ value, label, href }: { value: string; label?: string; href?: string | null }) {
  return (
    <li className="mb-[25px] last:mb-0">
      <p className="m-0 font-unbounded text-[14px] leading-5 font-semibold break-words text-accent">
        {href ? (
          <a href={href} className="transition-colors hover:text-primary">
            {value}
          </a>
        ) : (
          value
        )}
      </p>
      {label && <p className="m-0 text-muted">{label}</p>}
    </li>
  );
}

/** Address, phones, emails and opening hours of one office. */
function OfficeDetails({ office, links }: { office: Office; links?: OfficeLinks }) {
  const address = clean(office.address);
  const place = [clean(office.title), clean(office.city)].filter(Boolean).join(", ");
  const phones = (office.phones ?? []).map((p, i) => ({ ...p, href: links?.phones?.[i]?.href })).filter((p) => clean(p.number));
  const emails = (office.emails ?? []).map((e, i) => ({ ...e, href: links?.emails?.[i]?.href })).filter((e) => clean(e.address));
  const hours = (office.hours ?? []).filter((h) => clean(h.days) || clean(h.time));

  return (
    <ul className="m-0 list-none p-0">
      {address && <DetailLine value={address} label={place || undefined} />}
      {phones.map((p, i) => (
        <DetailLine key={`phone-${i}`} value={clean(p.number)} label={clean(p.label) || undefined} href={p.href} />
      ))}
      {emails.map((e, i) => (
        <DetailLine key={`email-${i}`} value={clean(e.address)} label={clean(e.label) || undefined} href={e.href} />
      ))}
      {hours.map((h, i) => {
        const days = clean(h.days);
        const time = clean(h.time);
        return <DetailLine key={`hours-${i}`} value={days || time} label={days ? time || undefined : undefined} />;
      })}
    </ul>
  );
}

/**
 * Office location block from the "Google Map" and "Office Address" widgets,
 * laid out like the theme's contact page: a full-width rounded map with the
 * office card overlapping its bottom-right corner (stacked below it on
 * phones), plus a "Get directions" link. Further offices follow in a grid.
 */
export function LocationSection({ map, office, standalone }: LocationSectionProps) {
  const embedUrl = map?.computed.embed_url ?? undefined;
  const offices = (office?.content.items ?? []).filter((o) => clean(o.address) || clean(o.title));
  const [mainOffice, ...otherOffices] = offices;
  const mainLinks = office?.computed.items?.[0];

  if (!embedUrl && !mainOffice) return null;

  const mapContent = map?.content;
  const height = mapHeight(mapContent?.height);
  const mapLabel = clean(mapContent?.marker_title) || clean(mapContent?.heading) || map?.computed.query || "Office location";

  // "Get directions": the map's toggle, else the office's "View on map" toggle.
  const directionsUrl =
    (mapContent?.show_directions && map?.computed.directions_url) ||
    (mainOffice?.show_map_link && mainLinks?.directions_url) ||
    undefined;

  const officeHeading = clean(office?.content.heading);
  const officeSubheading = clean(office?.content.subheading);
  const officeDescription = clean(office?.content.description);
  const overlap = Boolean(embedUrl && mainOffice);

  const body = (
    <>
      <div className={cn("flex flex-col", overlap && "md:items-end")} style={{ "--map-h": `${height}px` } as CSSProperties}>
        {embedUrl && (
          <div className="w-full overflow-hidden rounded-[20px] bg-[#f8f8f8]">
            <iframe
              src={embedUrl}
              title={`Map: ${mapLabel}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className={cn(
                "block h-[350px] w-full border-0 md:h-[var(--map-h)]",
                mapContent?.dark_style && "[filter:invert(90%)_hue-rotate(180deg)_saturate(0.6)]",
              )}
            />
          </div>
        )}

        {mainOffice && (
          <Reveal
            className={cn(
              "relative flex min-h-[400px] w-full flex-col justify-center bg-white text-center md:text-left mx:min-h-[450px]",
              overlap
                ? "rounded-tl-[20px] rounded-br-[20px] md:-mt-[400px] md:w-[350px] md:px-[30px] mx:-mt-[450px] mx:w-[450px] lg:px-[60px] xl:w-[500px] xl:px-[90px]"
                : "rounded-[20px] border border-line px-[30px] py-[40px] md:px-[60px]",
            )}
          >
            {officeSubheading && <p className="m-0 mb-2 text-[14px] text-muted uppercase">{officeSubheading}</p>}
            {officeHeading && <h2 className={blockTitle}>{officeHeading}</h2>}
            {officeDescription && <p className="m-0 mb-[25px] text-muted">{officeDescription}</p>}
            <OfficeDetails office={mainOffice} links={mainLinks} />
            {directionsUrl && (
              <div className="mt-[30px]">
                <ButtonLink href={directionsUrl} variant="link" newTab>
                  Get directions
                </ButtonLink>
              </div>
            )}
          </Reveal>
        )}
      </div>

      {otherOffices.length > 0 && (
        <div className="mt-[30px] grid gap-[30px] md:grid-cols-2 xl:grid-cols-3">
          {otherOffices.map((o, i) => {
            const links = office?.computed.items?.[i + 1];
            return (
              <Reveal key={`${o.title}-${i}`} className="rounded-[20px] border border-line p-[30px] text-center md:text-left">
                <OfficeDetails office={o} links={links} />
                {o.show_map_link && links?.directions_url && (
                  <div className="mt-[30px]">
                    <ButtonLink href={links.directions_url} variant="link" newTab>
                      Get directions
                    </ButtonLink>
                  </div>
                )}
              </Reveal>
            );
          })}
        </div>
      )}
    </>
  );

  return standalone ? <section className="site-container mb-[60px] mx:mb-[80px] xl:mb-[150px]">{body}</section> : body;
}
