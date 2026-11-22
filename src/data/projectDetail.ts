/**
 * Shared content of the project detail template. On the original site every
 * game's detail page uses this same copy; only the title, hero artwork and
 * platform badges change per game (those come from the catalogue).
 */

import type { DetailCta, DetailFact, DetailFeature, GalleryItem } from "@/types";

export const projectDetail = {
  overview: {
    intro:
      "What dreams are made of is the stuff of nightmares in this new point-and-click adventure. Delve deep into realms both fantastical and terrifying, and use the power of lucid dreaming to solve puzzles, explore, and contend with eerie adversaries in your search for the brother you thought had died.",
    lead: "Foster a sanctuary for frogs and restore the biodiversity of the wetlands, a cozy farming sim where you raise frogs by playing mini-games and decorating your habitat.",
    body: "Lorem ipsum dolor sit amet consectetur adipiscing diam tortor sit feugiat dictum eu diam euismod ultrices convallis eget vel velit posuere mi consequat leo egestas sed odio molestie non imperdiet malesuada. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  cta: { label: "watch the trailer", href: "#gallery", icon: "play" } satisfies DetailCta,
  facts: [
    { title: "Release date", value: "28 Jun 2022" },
    { title: "Genre", value: "Action, Adventure" },
    { title: "Website", value: "www.example.com", href: "#" },
  ] satisfies DetailFact[],
  features: [
    {
      title: "Dirty worlds",
      text: "Lorem ipsum dolor sit amet consectetur adipiscing diam tortor sit feugiat dictum eu diam euismod ultrices convallis eget vel velit posuere mi consequat.",
      image: { src: "/images/projects/gallery/feature_1.png", w: 409, h: 289 },
    },
    {
      title: "Horned hero",
      text: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus",
      image: { src: "/images/projects/gallery/feature_2.png", w: 330, h: 296 },
    },
    {
      title: "Survival mode",
      text: "Vestibulum eu quam nec neque pellentesque efficitur id eget nisl. Proin porta est convallis lacus blandit pretium sed non enim. Maecenas lacinia non orci at aliquam.",
      image: { src: "/images/projects/gallery/feature_3.png", w: 312, h: 332 },
    },
    {
      title: "Black humour",
      text: "Doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
      image: { src: "/images/projects/gallery/feature_4.png", w: 273, h: 305 },
    },
  ] satisfies DetailFeature[],
  gallery: [
    { kind: "video", src: "2kJ9hIagoyk", thumb: "/images/projects/gallery/video_thumb_1.jpg", alt: "Gameplay trailer" },
    { kind: "video", src: "RGQ_GOmr_C4", thumb: "/images/projects/gallery/video_thumb_2.jpg", alt: "Cinematic trailer" },
    { kind: "image", src: "/images/projects/gallery/gallery_1.jpg", thumb: "/images/projects/gallery/gallery_1.jpg", alt: "Screenshot 1" },
    { kind: "image", src: "/images/projects/gallery/gallery_2.jpg", thumb: "/images/projects/gallery/gallery_2.jpg", alt: "Screenshot 2" },
    { kind: "image", src: "/images/projects/gallery/gallery_3.jpg", thumb: "/images/projects/gallery/gallery_3.jpg", alt: "Screenshot 3" },
    { kind: "image", src: "/images/projects/gallery/gallery_4.jpg", thumb: "/images/projects/gallery/gallery_4.jpg", alt: "Screenshot 4" },
    { kind: "image", src: "/images/projects/gallery/gallery_5.jpg", thumb: "/images/projects/gallery/gallery_5.jpg", alt: "Screenshot 5" },
  ] satisfies GalleryItem[],
};
