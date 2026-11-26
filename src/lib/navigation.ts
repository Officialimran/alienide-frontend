import type { ApiMenu, ApiMenuItem, ApiNavigation } from "@/lib/api/types";
import { normalizeHref } from "@/lib/routes";
import type { NavLink } from "@/types";

/**
 * Menus come from GET /navigation keyed by their location (or slug when no
 * location is set). These are the keys the header / footer look for, in order.
 */
const HEADER_MENU_KEYS = ["header", "primary", "main", "main-menu", "main_menu", "header-menu"];
const FOOTER_MENU_KEYS = ["footer", "footer-menu", "footer_menu"];

function pickMenu(navigation: ApiNavigation, keys: string[]): ApiMenu | undefined {
  for (const key of keys) if (navigation[key]) return navigation[key];
  return undefined;
}

export function getHeaderMenu(navigation: ApiNavigation): ApiMenu | undefined {
  return (
    pickMenu(navigation, HEADER_MENU_KEYS) ??
    // Fall back to the first menu that is not the footer menu.
    Object.entries(navigation).find(([key]) => !FOOTER_MENU_KEYS.includes(key))?.[1]
  );
}

export function getFooterMenu(navigation: ApiNavigation): ApiMenu | undefined {
  return pickMenu(navigation, FOOTER_MENU_KEYS);
}

function itemHref(item: ApiMenuItem, landingSlug?: string): string {
  const raw = item.url || (item.linkable?.slug ? `/${item.linkable.slug}` : "#");
  return normalizeHref(raw, landingSlug);
}

/** Menu tree → NavLink tree (the shape the header/footer components render). */
export function toNavLinks(items: ApiMenuItem[] = [], landingSlug?: string): NavLink[] {
  return items
    .filter((item) => item.status !== false)
    .map((item) => ({
      id: item.id,
      label: item.title,
      href: itemHref(item, landingSlug),
      newTab: item.target === "_blank",
      children: item.children?.length ? toNavLinks(item.children, landingSlug) : undefined,
    }));
}
