/** Strips tags from CMS HTML (meta descriptions, plain-text slots). */
export function plainText(html: string | null | undefined): string {
  return (html ?? "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

/** Shortens text to `max` characters on a word boundary. */
export function truncate(text: string, max = 160): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max).replace(/\s+\S*$/, "")}…`;
}

/**
 * Splits a title into the theme's two-tone heading:
 * first word solid, the rest outlined ("Our Team" → "Our" / "Team").
 */
export function splitTitle(title: string): { solid: string; outline: string } {
  const [solid = "", ...rest] = title.trim().split(/\s+/);
  return { solid, outline: rest.join(" ") };
}

/** "contact_working_hours" → "Working hours" (labels for option keys). */
export function humanizeKey(key: string, stripPrefix?: string): string {
  const base = stripPrefix && key.startsWith(stripPrefix) ? key.slice(stripPrefix.length) : key;
  const words = base.replace(/[_-]+/g, " ").trim();
  return words.charAt(0).toUpperCase() + words.slice(1);
}

/** "2026-11-22" → "November 22, 2026". */
export function formatDate(date: string | null | undefined): string | undefined {
  if (!date) return undefined;
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return date;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
}
