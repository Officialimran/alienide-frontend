import "@fortawesome/fontawesome-free/css/all.min.css";
import { Icon, isIconName } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

/** Font Awesome / icon-font class list: letters, digits, "-", "_" and spaces only. */
const CLASS_LIST = /^[\w\s-]+$/;

/** A Font Awesome icon without a style class ("fa-bolt") uses the solid set. */
function iconClasses(value: string): string {
  const classes = value.trim().split(/\s+/);
  const hasStyle = classes.some((c) => /^(fa[srlbdt]?|fa-(solid|regular|light|thin|duotone|brands|sharp))$/.test(c));
  const isFontAwesome = classes.some((c) => c.startsWith("fa-"));
  return !hasStyle && isFontAwesome ? ["fa-solid", ...classes].join(" ") : classes.join(" ");
}

/**
 * Icon chosen in the CMS "Icon class" field: a theme glyph name (e.g. "crown")
 * or a Font Awesome class (e.g. "fa-solid fa-bolt"). Sized by font-size.
 */
export function FeatureIcon({ icon, className }: { icon: string; className?: string }) {
  const value = icon.trim();
  if (isIconName(value)) return <Icon name={value} className={className} />;
  if (!CLASS_LIST.test(value)) return null;
  return <i aria-hidden="true" className={cn(iconClasses(value), "leading-none", className)} />;
}
