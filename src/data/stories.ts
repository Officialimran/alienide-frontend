/** Content for the "The Stories" (about us) page. */

export interface ValueItem {
  title: string;
  description: string;
  image: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
}

export const storiesIntro = {
  headline: { before: "The Game ", highlight: "is", after: " On with Alienide Interactive." },
  lead: "Gamico Studio is a team of over 100 highly experienced professionals from all around the world who share the passion and drive for creating video games.",
  body: "The studios are integrated into the Group by service line and use the operating systems and tools deployed by those services lines to ensure people and projects can operate across studios and across geographies.",
};

export const values: ValueItem[] = [
  {
    title: "Player experience first",
    description: "We believe our laser focus on players inspires the most meaningful and lasting game experiences.",
    image: "/images/about/ab-shape1.png",
  },
  {
    title: "Dare to dream",
    description: "We believe the courage to chase bold ideas will make impossible dreams come true for players.",
    image: "/images/about/ab-shape2.png",
  },
  {
    title: "Thrive together",
    description: "We believe we’re stronger when we respect each other, invest in each other, and succeed as one team.",
    image: "/images/about/ab-shape3.png",
  },
  {
    title: "Execute with excellence",
    description: "We believe operational excellence will unlock us to deliver better experiences for the long run.",
    image: "/images/about/ab-shape4.png",
  },
];

export const diversity = {
  lead: "We’re focused on making a great home for people who love making games and setting a high bar for diversity and inclusion.",
  body: "We believe that anyone with passion, vision, and perseverance can make a positive impact. As part of that ethos, we also believe that there are ways where we, as a company, can provide long-term value and positive impact to the players, partners, Rioters, and communities we serve.",
};

const img = (name: string, alt: string): GalleryImage => ({ src: `/images/studio/${name}.jpg`, alt });

export const studioGalleryTop: GalleryImage[] = [
  img("photo-4", "Team planning session at a glass wall"),
  img("blog_8", "Two friends playing console games on a sofa"),
  img("blog_6", "Game controllers and a VR headset on a white desk"),
  img("blog_5", "Developer playing a game at a neon-lit desk"),
  img("blog_4", "Life at the Qamico studio"),
  img("blog_3", "Life at the Qamico studio"),
  img("blog_2", "Life at the Qamico studio"),
  img("blog_10", "Life at the Qamico studio"),
];

export const studioGalleryBottom: GalleryImage[] = [
  img("photo-2", "Playtesting an arcade cabinet outdoors"),
  img("photo-3", "Designer trying out a VR prototype"),
  img("photo-5", "Team reviewing work on a laptop"),
  img("photo-6", "Team meeting around a whiteboard"),
  img("photo-7", "Life at the Qamico studio"),
  img("photo-8", "Life at the Qamico studio"),
  img("photo-4", "Team planning session at a glass wall"),
];
