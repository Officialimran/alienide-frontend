"use client";

import { useState, type ReactNode } from "react";
import { matchSocialName, SocialIcon } from "@/components/sections/detail/SocialIcons";
import { Icon, isIconName, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";
import type { SocialLink } from "@/lib/settings";

/** How many social links the band shows. */
const MAX_LINKS = 3;

/** Theme icon-font glyphs for platforms without a bundled SVG. */
const FONT_GLYPHS: { icon: IconName; match: RegExp }[] = [
  { icon: "twitter", match: /^(twitter|x)$|(^|\.)(twitter\.com|x\.com)$/i },
  { icon: "pinterest-p", match: /^pinterest$|(^|\.)pinterest\.[a-z.]+$/i },
];

function parseUrl(href: string): URL | undefined {
  try {
    return new URL(href);
  } catch {
    return undefined;
  }
}

/** "@AlienideInteractive" from facebook.com/AlienideInteractive or youtube.com/@AlienideInteractive. */
function handleOf(href: string): string | undefined {
  const url = parseUrl(href);
  const first = url?.pathname.split("/").find(Boolean);
  if (!first) return url?.hostname.replace(/^www\./, "");
  return first.startsWith("@") ? first : `@${first}`;
}

/** Built-in icon (brand SVG or theme font glyph) when the CMS has none for a link. */
function FallbackIcon({ link }: { link: SocialLink }) {
  const name = matchSocialName(link.label, link.href);
  if (name) return <SocialIcon name={name} className="h-[26px] w-[26px] text-white" />;

  const host = parseUrl(link.href)?.hostname ?? "";
  const glyph = FONT_GLYPHS.find((g) => g.match.test(link.label.trim()) || g.match.test(host));
  if (glyph) return <Icon name={glyph.icon} className="text-[24px] text-white" />;

  return <span className="font-anton text-[20px] leading-none text-white uppercase">{link.label.trim().charAt(0) || "•"}</span>;
}

/**
 * The link's icon from the site options API (social_links[].icon): an uploaded
 * image/SVG in its own colours, or an icon-font class. Falls back to a built-in
 * icon when there is none or the file fails to load.
 */
function LinkIcon({ link }: { link: SocialLink }) {
  const [failed, setFailed] = useState(false);
  const icon = link.icon && !failed ? link.icon : undefined;

  if (icon && icon.type !== "class") {
    return (
      // Plain <img>: any host/format the CMS stores, no optimizer or CORS requirements.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={icon.src}
        alt=""
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
        className="h-[28px] w-[28px] object-contain"
      />
    );
  }
  if (icon?.type === "class" && isIconName(icon.src)) {
    return <Icon name={icon.src} className="text-[24px] text-white" />;
  }
  return <FallbackIcon link={link} />;
}

function SocialCard({ link, index }: { link: SocialLink; index: number }) {
  const label = link.label.trim() || matchSocialName(link.label, link.href) || "Social";
  const handle = handleOf(link.href);

  return (
    <Reveal as="li" animation="scale-up" delay={150 + index * 120} className="min-w-0">
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${label} (opens in a new tab)`}
        className={cn(
          "group relative flex items-center gap-[14px] overflow-hidden rounded-[22px] bg-accent p-[14px] pr-[16px] text-left text-white",
          "shadow-[0_18px_40px_-22px_rgba(0,0,0,0.55)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          "hover:-translate-y-[6px] hover:shadow-[0_28px_50px_-24px_rgba(0,0,0,0.6)]",
          "focus-visible:-translate-y-[6px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
        )}
      >
        {/* Soft brand glow that wakes up on hover */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-[60px] -right-[40px] h-[140px] w-[140px] rounded-full bg-primary/30 opacity-0 blur-[50px] transition-opacity duration-500 will-change-[opacity] group-hover:opacity-100"
        />

        <span className="relative flex h-[56px] w-[56px] shrink-0 items-center justify-center rounded-[16px] bg-white/[0.08] ring-1 ring-white/10 transition-all duration-500 group-hover:bg-white group-hover:ring-white">
          <span className="transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-110">
            <LinkIcon link={link} />
          </span>
        </span>

        <span className="relative flex min-w-0 flex-1 flex-col gap-[6px]">
          <span className="truncate font-anton text-[20px] leading-none uppercase">{label}</span>
          {handle && (
            <span className="truncate font-unbounded text-[11px] leading-none font-normal text-white/55">{handle}</span>
          )}
        </span>

        <span
          aria-hidden="true"
          className="relative flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full bg-primary text-[12px] text-accent transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-45"
        >
          <Icon name="arrow-top-right" />
        </span>
      </a>
    </Reveal>
  );
}

/** Green band above the footer: "Follow the journey" heading beside up to three CMS social links. */
export function SocialBand({ links }: { links: SocialLink[] }) {
  const shown = links.slice(0, MAX_LINKS);
  if (shown.length === 0) return null;

  return (
    <section aria-labelledby="social-band-title" className="relative isolate overflow-hidden bg-primary">
      {/* Surface: white sheen top-left, faint dot grid fading to the right */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_120%_at_0%_0%,rgba(255,255,255,0.45)_0%,rgba(255,255,255,0)_60%)]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(rgba(0,0,0,0.08)_1px,transparent_1.5px)] [background-size:18px_18px] [mask-image:linear-gradient(90deg,transparent_10%,black_60%,transparent)]"
      />

      <div className="site-container flex flex-col items-center gap-[30px] py-[50px] text-center md:py-[60px] lg:flex-row lg:justify-between lg:gap-[50px] lg:text-left xl:py-[70px]">
        <Reveal className="shrink-0">
          <p className="m-0 mb-[12px] inline-flex items-center gap-[10px] font-unbounded text-[11px] leading-none font-medium tracking-[0.18em] text-accent/70 uppercase">
            <span aria-hidden="true" className="h-[2px] w-[28px] rounded-full bg-accent/50" />
            Stay connected
          </p>
          <h2
            id="social-band-title"
            className="m-0 font-anton text-[40px] leading-[1] font-normal text-accent uppercase md:text-[48px] xl:text-[56px]"
          >
            Follow{" "}
            <span className="text-outline [--stroke-color:#000] [--stroke-width:1.5px]">the journey</span>
          </h2>
        </Reveal>

        <ul
          className={cn(
            "m-0 grid w-full list-none gap-[16px] p-0 sm:grid-cols-2 lg:w-auto lg:flex-1 lg:gap-[20px]",
            shown.length === 1 && "sm:grid-cols-1 sm:max-w-[340px] lg:max-w-[340px]",
            shown.length >= 3 && "lg:grid-cols-3",
            shown.length < 3 && "lg:max-w-[680px]",
          )}
        >
          {shown.map((link, i) => (
            <SocialCard key={link.href} link={link} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}
