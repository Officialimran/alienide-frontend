import type { IconName } from "@/components/ui/Icon";

/**
 * Partner / client logos for the home page "Our Partners" section.
 *
 * PLACEHOLDERS: these names are invented and rendered as neutral wordmarks.
 * To show a real client, add `logo` (put the file in /public/images/partners/)
 * and, optionally, `href`. Recommended: SVG or transparent PNG, roughly 3:1,
 * at least 300px wide. Logos are shown greyscale and turn full colour on hover.
 */
export interface Partner {
  name: string;
  href?: string;
  logo?: { src: string; width: number; height: number };
  /** Placeholder mark used when no logo file is set. */
  mark?: IconName;
}

const marks: IconName[] = ["swords", "crown", "magic-wand", "treasure-map", "group", "office"];

const names = [
  "Pixel Forge",
  "Lumen Arcade",
  "Ironleaf",
  "Nova Drift",
  "Blue Ember",
  "Starling Labs",
  "Quarry Play",
  "Moonbyte",
  "Hexa Works",
  "Orbit Nine",
  "Cobalt Crow",
  "Tidal Pixel",
  "Mosslight",
  "Red Lantern",
  "Glasswing",
  "Saltmarsh",
  "Ninefold",
  "Driftwood",
  "Copperkey",
  "Wildcard Co.",
  "Paper Moth",
  "Brightvale",
  "Lowpoly Lab",
  "Emberfall",
  "Kitebird",
  "Northgate",
  "Silverpine",
  "Stonepath",
  "Fable Yard",
  "Quietstorm",
];

export const partners: Partner[] = names.map((name, i) => ({ name, mark: marks[i % marks.length] }));
