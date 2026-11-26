import { cn } from "@/lib/cn";

/** Code points of the original theme's "gamico-icon" font. */
const glyphs = {
  "arrow-top-right": "",
  "arrow-up": "",
  cart: "",
  crown: "",
  "long-arrow-left": "",
  "long-arrow-right": "",
  "magic-wand": "",
  quote: "",
  swords: "",
  "treasure-map": "",
  user: "",
  wishlist: "",
  bars: "",
  office: "",
  times: "",
  android: "",
  ios: "",
  "nintendo-switch": "",
  playstation: "",
  steam: "",
  xbox: "",
  group: "",
  "facebook-f": "",
  twitter: "",
  instagram: "",
  "pinterest-p": "",
  phone: "",
} as const;

export type IconName = keyof typeof glyphs;

/** True when the theme's icon font has a glyph with this name (e.g. a platform slug). */
export function isIconName(name: string | null | undefined): name is IconName {
  return Boolean(name) && Object.prototype.hasOwnProperty.call(glyphs, name as string);
}

interface IconProps {
  name: IconName;
  className?: string;
  label?: string;
}

export function Icon({ name, className, label }: IconProps) {
  return (
    <i
      className={cn("gi", className)}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? "img" : undefined}
    >
      {glyphs[name]}
    </i>
  );
}
