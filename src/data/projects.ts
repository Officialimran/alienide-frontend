import type { IconName } from "@/components/ui/Icon";

/** Full games catalogue for the /projects archive (platforms & genres as on the original). */

export type PlatformSlug = Extract<IconName, "android" | "ios" | "nintendo-switch" | "playstation" | "steam" | "xbox">;

export interface CatalogProject {
  slug: string;
  title: string;
  genres: string[];
  platforms: PlatformSlug[];
  /** 945×675 card crop used on the archive. */
  image: string;
  /** Full-size artwork used as the detail-page hero. */
  hero: string;
}

export const platformOptions: { value: PlatformSlug; label: string }[] = [
  { value: "android", label: "Android" },
  { value: "ios", label: "iOs" },
  { value: "nintendo-switch", label: "Nintendo Switch" },
  { value: "playstation", label: "PlayStation" },
  { value: "steam", label: "Steam" },
  { value: "xbox", label: "Xbox" },
];

export const genreOptions = ["Action", "Adventure", "Shooting", "Simulation", "Strategy", "Survival"].map((g) => ({
  value: g.toLowerCase(),
  label: g,
}));

const p = (
  n: number,
  slug: string,
  title: string,
  genres: string[],
  platforms: PlatformSlug[],
): CatalogProject => ({
  slug,
  title,
  genres,
  platforms,
  image: `/images/projects/project_${n}.jpg`,
  hero: `/images/projects/full/project_${n}.jpg`,
});

export const catalog: CatalogProject[] = [
  p(14, "abyss-of-the-unseen-oracle", "Abyss of the Unseen Oracle", ["Action"], ["android", "ios", "xbox"]),
  p(13, "spires-of-the-forgotten-era", "Spires of the Forgotten Era", ["Survival"], ["ios", "playstation", "steam"]),
  p(12, "warriors-of-the-twilight-veil", "Warriors of the Twilight Veil", ["Shooting"], ["nintendo-switch", "steam", "xbox"]),
  p(11, "specters-of-the-fallen-city", "Specters of the Fallen City", ["Strategy"], ["nintendo-switch", "playstation", "steam"]),
  p(10, "realms-beyond-the-void", "Realms Beyond the Void", ["Adventure"], ["android", "ios", "steam"]),
  p(9, "shadows-of-the-ancient-fortress", "Shadows of the Ancient Fortress", ["Action"], ["playstation", "steam", "xbox"]),
  p(8, "chronicles-of-the-lost-realm", "Chronicles of the Lost Realm", ["Simulation"], ["ios", "nintendo-switch", "playstation"]),
  p(7, "eternal-vanguard", "Eternal Vanguard", ["Action"], ["steam", "xbox"]),
  p(6, "wanderers-odyssey", "Wanderer’s Odyssey", ["Simulation"], ["android", "ios", "nintendo-switch"]),
  p(5, "castle-fortress", "Castle Fortress", ["Action", "Survival"], ["android", "ios", "playstation", "steam"]),
  p(4, "jungle-of-canyons", "Jungle of Canyons", ["Strategy"], ["playstation", "steam", "xbox"]),
  p(3, "mystics-of-the-eclipse", "Mystics of the Eclipse", ["Action"], ["playstation", "steam", "xbox"]),
  p(2, "the-forgotten-knight", "The Forgotten Knight", ["Action"], ["android", "ios", "steam"]),
  p(1, "guardians-of-the-rapture", "Guardians of the Rapture", ["Adventure"], ["ios", "nintendo-switch", "playstation"]),
];

export const PROJECTS_PER_PAGE = 10;

export interface ProjectQuery {
  platform?: string;
  genre?: string;
  page?: number;
}

/** Filters the catalogue and returns one page of results plus paging info. */
export function queryProjects({ platform, genre, page = 1 }: ProjectQuery) {
  const filtered = catalog.filter(
    (proj) =>
      (!platform || proj.platforms.includes(platform as PlatformSlug)) &&
      (!genre || proj.genres.some((g) => g.toLowerCase() === genre)),
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / PROJECTS_PER_PAGE));
  const current = Math.min(Math.max(1, page), totalPages);
  const start = (current - 1) * PROJECTS_PER_PAGE;
  return { items: filtered.slice(start, start + PROJECTS_PER_PAGE), total: filtered.length, page: current, totalPages };
}

export function getProject(slug: string): CatalogProject | undefined {
  return catalog.find((proj) => proj.slug === slug);
}

export const platformLabel = (slug: PlatformSlug) => platformOptions.find((o) => o.value === slug)?.label ?? slug;
