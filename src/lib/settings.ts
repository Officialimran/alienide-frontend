import { cache } from "react";
import { getOptions } from "@/lib/api/cms";
import type { ApiIconType, ApiOptionButton, ApiOptionContact, ApiOptions, ApiOptionSocialLink } from "@/lib/api/types";
import { mediaUrl } from "@/lib/media";
import { humanizeKey } from "@/lib/text";

/**
 * Site options (GET /options) in the shape the UI uses.
 * Groups / keys follow the backend's option definitions:
 *   header:  header_logo (image), header_button (button)
 *   footer:  footer_logo (image), footer_content (editor), copyright_text (text)
 *   contact: contact_* (contact: value / url / icon)
 *   social:  social_links (social_links)
 */

export interface CmsIcon {
  src: string;
  /** "svg" | "image" → <img>/mask; "class" → an icon-font class name. */
  type: Exclude<ApiIconType, null>;
}

export interface ContactDetail {
  key: string;
  label: string;
  value: string;
  href?: string;
  icon?: CmsIcon;
}

export interface SocialLink {
  label: string;
  href: string;
  icon?: CmsIcon;
}

export interface SiteSettings {
  headerLogo?: string;
  headerButton?: { label: string; href: string; newTab: boolean };
  footerLogo?: string;
  footerContent?: string;
  copyright?: string;
  contacts: ContactDetail[];
  email?: ContactDetail;
  phone?: ContactDetail;
  address?: ContactDetail;
  socialLinks: SocialLink[];
}

/** Labels for the contact options the backend ships with; others are derived from the key. */
const CONTACT_LABELS: Record<string, string> = {
  contact_address: "Office Headquarters",
  contact_phone: "Phone number",
  contact_email: "Our email",
};

const isObject = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v);
const str = (v: unknown) => (typeof v === "string" && v.trim() ? v : undefined);

function toIcon(icon: string | null | undefined, type: ApiIconType): CmsIcon | undefined {
  if (!icon || !type) return undefined;
  return { src: type === "class" ? icon : (mediaUrl(icon) ?? icon), type };
}

function contactHref(key: string, value: string, url: string | null): string | undefined {
  if (url) return url;
  if (key.includes("email")) return `mailto:${value}`;
  if (key.includes("phone") || key.includes("mobile")) return `tel:${value.replace(/[^\d+]/g, "")}`;
  return undefined;
}

export function toSiteSettings(options: ApiOptions): SiteSettings {
  const header = options.header ?? {};
  const footer = options.footer ?? {};
  const contactGroup = options.contact ?? {};
  const social = options.social ?? {};

  const button = header.header_button as ApiOptionButton | undefined;

  const contacts: ContactDetail[] = Object.entries(contactGroup)
    .filter((entry): entry is [string, ApiOptionContact] => isObject(entry[1]) && Boolean(str(entry[1].value)))
    .map(([key, c]) => ({
      key,
      label: CONTACT_LABELS[key] ?? humanizeKey(key, "contact_"),
      value: c.value as string,
      href: contactHref(key, c.value as string, c.url),
      icon: toIcon(c.icon, c.icon_type),
    }));

  const socialLinks: SocialLink[] = (Array.isArray(social.social_links) ? (social.social_links as ApiOptionSocialLink[]) : [])
    .filter((link) => link.url)
    .map((link) => ({
      label: link.label ?? "",
      href: link.url as string,
      icon: toIcon(link.icon, link.icon_type),
    }));

  const find = (k: string) => contacts.find((c) => c.key === k);

  return {
    headerLogo: mediaUrl(str(header.header_logo)),
    headerButton:
      button?.text && button.url ? { label: button.text, href: button.url, newTab: button.new_tab } : undefined,
    footerLogo: mediaUrl(str(footer.footer_logo)),
    footerContent: str(footer.footer_content),
    copyright: str(footer.copyright_text),
    contacts,
    email: find("contact_email"),
    phone: find("contact_phone"),
    address: find("contact_address"),
    socialLinks,
  };
}

export const getSiteSettings = cache(async (): Promise<SiteSettings> => toSiteSettings(await getOptions()));

export const EMPTY_SETTINGS: SiteSettings = { contacts: [], socialLinks: [] };
