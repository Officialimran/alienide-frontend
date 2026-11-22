import type { NavLink } from "@/types";

/** True when `href` points at the current route (hash links never count). */
export function isCurrent(href: string, pathname: string): boolean {
  if (!href.startsWith("/")) return false;
  const path = href.split("#")[0] || "/";
  return path === pathname;
}

/**
 * A menu item is active on its own page, on any page nested under it
 * (e.g. /projects/some-game highlights "Projects"), or when a child is current.
 */
export function isActiveItem(item: NavLink, pathname: string): boolean {
  const path = item.href.split("#")[0];
  const nested = path.length > 1 && pathname.startsWith(`${path}/`);
  return isCurrent(item.href, pathname) || nested || Boolean(item.children?.some((c) => isCurrent(c.href, pathname)));
}
