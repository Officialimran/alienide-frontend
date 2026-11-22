/** Content for the "Our Services" page and the service detail pages. */

import type { IconName } from "@/components/ui/Icon";
import type { DetailFeature, GalleryItem } from "@/types";

export interface ServiceDetail {
  slug: string;
  title: string;
  /** Icon shown in the detail-page hero badges (same as the home "capabilities" icons). */
  icon: IconName;
  /** One-line pitch (also used on the home page capabilities list). */
  summary: string;
  tags: string[];
  paragraphs: [string, string];
  /** Photo revealed behind the row on hover; also the detail-page hero. */
  image: string;
  /** Detail page: four illustrated highlights. */
  features: DetailFeature[];
  /** Detail page: showreel + artwork. */
  gallery: GalleryItem[];
}

const featureImages = [
  { src: "/images/projects/gallery/feature_1.png", w: 409, h: 289 },
  { src: "/images/projects/gallery/feature_2.png", w: 330, h: 296 },
  { src: "/images/projects/gallery/feature_3.png", w: 312, h: 332 },
  { src: "/images/projects/gallery/feature_4.png", w: 273, h: 305 },
];

/** Builds the four detail-page features from [title, text] pairs. */
const features = (items: [string, string][]): DetailFeature[] =>
  items.map(([title, text], i) => ({ title, text, image: featureImages[i] }));

/** Showreel first, then five pieces of game artwork (by project number). */
const gallery = (projectNumbers: number[]): GalleryItem[] => [
  { kind: "video", src: "2kJ9hIagoyk", thumb: "/images/projects/gallery/video_thumb_1.jpg", alt: "Studio showreel" },
  ...projectNumbers.map((n, i) => ({
    kind: "image" as const,
    src: `/images/projects/full/project_${n}.jpg`,
    thumb: `/images/projects/project_${n}.jpg`,
    alt: `Artwork ${i + 1}`,
  })),
];

export const servicesIntro = {
  title: "We make the games we'd love to play",
  text: "We are ready to deliver your vision across multiple platforms. Games are the language of the century and with us, you can harness their unique power.",
};

export const serviceDetails: ServiceDetail[] = [
  {
    slug: "game-development",
    title: "Game development",
    icon: "swords",
    summary:
      "Our works have been internationally recognized for their design, stories and art direction. Together, we can transform your ideas into captivating games, on desktop, mobile or console.",
    features: features([
      ["Adaptations", "We turn existing worlds, books and brands into games that stay true to the source while playing like something new."],
      ["Co-development", "We slot into your team and pipeline, taking on features, content or whole milestones alongside your developers."],
      ["Level design", "Spaces that teach, surprise and reward, built around a steady flow of fresh challenges as players progress."],
      ["Multiplayer", "From couch co-op to online play, we build the systems that keep people coming back together."],
    ]),
    gallery: gallery([14, 9, 7, 5, 2]),
    tags: ["Adaptations", "Co-development", "Exotic gameplay", "Level design", "Engineering", "Multiplayer"],
    paragraphs: [
      "Our diverse team has years of game storytelling and design experience, ready to deliver your vision across multiple platforms, mobile or desktop.",
      "We have long experience in creating educational and serious games with a wide range of topics, from history to ecology.",
    ],
    image: "/images/services/sv_pic1.jpg",
  },
  {
    slug: "game-design",
    title: "Game design",
    icon: "treasure-map",
    summary:
      "We have long experience in creating educational and serious games with a wide range of topics, from history to ecology.",
    features: features([
      ["3D art", "Characters, props and worlds modelled and textured to fit your game's style and performance budget."],
      ["Concept art", "Early sketches and paintings that pin down the look and mood before production starts."],
      ["Interactivity", "Mechanics and feedback loops that make every input feel meaningful and every choice matter."],
      ["Environments", "Explorable places with their own history, built to guide players without holding their hand."],
    ]),
    gallery: gallery([13, 10, 6, 1, 4]),
    tags: ["3D art", "Concept art", "Interactivity", "Strategy", "Environments", "3D assets"],
    paragraphs: [
      "Even the most captivating game ideas will eventually become dull if the challenges never change. Good level design is about providing players with new and interesting challenges as they progress through the game.",
      "Usually this requires a steady flow of fresh features that introduce new equipment, opponents, enemies, or obstacles into the gameplay.",
    ],
    image: "/images/services/sv_pic2.jpg",
  },
  {
    slug: "art-direction",
    title: "Art direction",
    icon: "magic-wand",
    summary:
      "We make award-winning games with unique art direction. Together, we can transform your ideas into captivating games, on desktop, mobile or console.",
    features: features([
      ["Animation", "In-game animation and motion that gives characters weight, personality and readable intent."],
      ["Lighting and VFX", "Light, colour and effects that set the mood and keep the action clear on screen."],
      ["Concept art", "A clear visual target for the whole team, from first sketches to final style guides."],
      ["Cinematics", "Pre-rendered and in-engine sequences for trailers, story moments and key art."],
    ]),
    gallery: gallery([12, 3, 8, 11, 1]),
    tags: ["Animation", "Lighting and VFX", "Concept art", "Visual", "Cinematics"],
    paragraphs: [
      "Whether you need environment art or character, creature and object designs ranging from whimsical themes to ultra-realistic visuals, our world-class artists are always ready to tackle your projects.",
      "For the past 25 years, we have been providing in-game animation, cinematics, pre-rendered animation for the world’s top games, TV series and movies.",
    ],
    image: "/images/services/sv_pic3.jpg",
  },
  {
    slug: "multiplatform-development",
    title: "Multiplatform development",
    icon: "crown",
    summary:
      "We can help you port your game as our programmers have extensive experience with multiple platforms—PC, Mac, Linux, iOS, Android, WebGL or Nintendo Switch.",
    features: features([
      ["Target audience", "We help you choose the platforms where your players already are and plan the release around them."],
      ["Accelerated", "Proven porting workflows that get your game onto new hardware without stalling development."],
      ["Maximum coverage", "One codebase, many storefronts: PC, Mac, Linux, iOS, Android, WebGL and consoles."],
      ["Engine", "Deep engine experience, including Unity, for performance tuning, input and platform requirements."],
    ]),
    gallery: gallery([11, 14, 13, 5, 10]),
    tags: ["Target audience", "Accelerated", "Maximum coverage", "Engine", "Unity"],
    paragraphs: [
      "We can help you port your game as our programmers have extensive experience with multiple platforms—PC, Mac, Linux, iOS, Android, WebGL or Nintendo Switch.",
      "Our team of experts possess both the artistic sense and technical abilities to implement them perfectly, bringing an otherwise standard visual to life.",
    ],
    image: "/images/services/sv_pic4.jpg",
  },
];

export const servicesMarqueeItems = ["Community", "Free to Play", "Responsibility", "Humble"];

export function getService(slug: string): ServiceDetail | undefined {
  return serviceDetails.find((s) => s.slug === slug);
}

/** Facts shown in the grey card on every service detail page. */
export function serviceFacts(service: ServiceDetail) {
  return [
    { title: "Specialities", value: service.tags.slice(0, 3).join(", ") },
    { title: "Platforms", value: "PC, consoles & mobile" },
    { title: "Contact", value: "hello@example.com", href: "mailto:hello@example.com" },
  ];
}
