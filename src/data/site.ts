import type {
  Award,
  FooterColumn,
  NavLink,
  Project,
  Service,
  SocialBrand,
  Stat,
  TeamMember,
  Testimonial,
} from "@/types";

export const siteConfig = {
  name: "Qamico",
  tagline: "Indie Games Studio",
  description:
    "An award-winning Prague-based indie game studio pushing the boundaries of narrative and serious games.",
  heroVideoId: "2kJ9hIagoyk",
  heroVideoStart: 2,
  heroVideoEnd: 9,
  email: "hello@example.com",
  phone: "+123 888 000 33",
  address: "2972 Westheimer Rd. Santa Ana, Illinois 85486",
} as const;

/** Primary navigation (header + mobile menu). Kept flat: no dropdowns. */
export const mainNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/the-stories" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Our Team", href: "/our-team" },
  { label: "Contact Us", href: "/contact-us" },
];

export const marqueeItems = [
  "Game development",
  "Game design",
  "Art direction",
  "Multiplatform development",
];

export const stats: Stat[] = [
  { value: 15, suffix: "+", label: "years experience working" },
  { value: 30, suffix: "+", label: "games completed" },
  { value: 80, suffix: "M+", label: "downloads of all-time" },
];

export const projects: Project[] = [
  {
    title: "Abyss of the Unseen Oracle",
    href: "/projects/abyss-of-the-unseen-oracle",
    genre: "Action",
    image: "/images/project_14.jpg",
    platforms: ["android", "ios", "xbox"],
  },
  {
    title: "Spires of the Forgotten Era",
    href: "/projects/spires-of-the-forgotten-era",
    genre: "Survival",
    image: "/images/project_13.jpg",
    platforms: ["ios", "playstation", "steam"],
  },
  {
    title: "Warriors of the Twilight Veil",
    href: "/projects/warriors-of-the-twilight-veil",
    genre: "Shooting",
    image: "/images/project_12.jpg",
    platforms: ["nintendo-switch", "steam", "xbox"],
  },
  {
    title: "Specters of the Fallen City",
    href: "/projects/specters-of-the-fallen-city",
    genre: "Strategy",
    image: "/images/project_11.jpg",
    platforms: ["nintendo-switch", "playstation", "steam"],
  },
];

export const services: Service[] = [
  {
    title: "Game development",
    description:
      "Our works have been internationally recognized for their design, stories and art direction. Together, we can transform your ideas into captivating games, on desktop, mobile or console.",
    icon: "swords",
    href: "/services/game-development",
  },
  {
    title: "Game design",
    description:
      "We have long experience in creating educational and serious games with a wide range of topics, from history to ecology.",
    icon: "treasure-map",
    href: "/services/game-design",
  },
  {
    title: "Art direction",
    description:
      "We make award-winning games with unique art direction. Together, we can transform your ideas into captivating games, on desktop, mobile or console.",
    icon: "magic-wand",
    href: "/services/art-direction",
  },
  {
    title: "Multiplatform development",
    description:
      "We can help you port your game as our programmers have extensive experience with multiple platforms—PC, Mac, Linux, iOS, Android, WebGL or Nintendo Switch.",
    icon: "crown",
    href: "/services/multiplatform-development",
  },
];

/** First row has four awards, second row three (as on the original). */
export const awards: Award[][] = [
  [
    { title: ["Independent", "Games Festival"], result: "Finalist" },
    { title: ["Central & Eastern", "Europe Game"], result: "Hiden Gem 2019" },
    { title: ["Game Industry", "News"], result: "Silver Medal 2018" },
    { title: ["Game Of", "The Year"], result: "Best Story 2016" },
  ],
  [
    { title: ["Games For", "Change"], result: "Best Game" },
    { title: ["Gameplay", "Design Award"], result: "Winner" },
    { title: ["Best Of", "E3 2023"], result: "Finalist" },
  ],
];

const loremBio =
  "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.";

const memberSocials = [
  { label: "Facebook", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "Youtube", href: "#" },
];

export const team: TeamMember[] = [
  { name: "Floyd Miles", role: "Creative Director", image: "/images/team-4.jpg", bio: loremBio, socials: memberSocials },
  { name: "Arlene Bell", role: "Technical Artist", image: "/images/team-1.jpg", bio: loremBio, socials: memberSocials },
  { name: "Marvin Jones", role: "Character Artist", image: "/images/team-2.jpg", bio: loremBio, socials: memberSocials },
  { name: "Jenny Wilson", role: "Lead Animator", image: "/images/team-3.jpg", bio: loremBio, socials: memberSocials },
];

const directoryBio =
  "We bring deep, functional expertise, but are known for our holistic perspective: we capture value across boundaries and between the silos of any organization. We have proven a multiplier effect...";

const member = (name: string, role: string, image: string): TeamMember => ({
  name,
  role,
  image,
  bio: directoryBio,
  socials: memberSocials,
});

/** Full studio roster shown on the "Our Team" page. */
export const teamDirectory: TeamMember[] = [
  member("Floyd Miles", "Creative Director", "/images/team-4.jpg"),
  member("Arlene Bell", "Technical Artist", "/images/team-1.jpg"),
  member("Marvin Jones", "Character Artist", "/images/team-2.jpg"),
  member("Jenny Wilson", "Lead Animator", "/images/team-3.jpg"),
  member("Robert Fox", "animator", "/images/team/team-11.jpg"),
  member("Cody Fisher", "design manager", "/images/team/team-5.jpg"),
  member("Jane Cooper", "concept artist", "/images/team/team-7.jpg"),
  member("Guy Hawkins", "gameplay engineer", "/images/team/team-9.jpg"),
  member("Elena Pena", "it support", "/images/team/team-6.jpg"),
  member("scott doe", "audio designer", "/images/team/team-8.jpg"),
  member("ashley bishop", "art manager", "/images/team/team-10.jpg"),
];

export const testimonials: Testimonial[] = [
  {
    quote: ["“Mesmerizing, serious and heart-breaking", "gameplay. An exceptional work of the", "videogame scene!”"],
    name: "rorert fox,",
    source: "pc gamer",
    avatar: "/images/h1_avatar-3.png",
  },
  {
    quote: ["“Absolutely stunning and intimate", "cinematography. Immensely emotional", "journey”"],
    name: "kevin jones ,",
    source: "game review",
    avatar: "/images/h1_avatar-1.png",
  },
  {
    quote: ["“Excellent job, your games is", "phenomenal. This is the way people will", "play in the future.”"],
    name: "luke romero,",
    source: "gamespot",
    avatar: "/images/h1_avatar-2.png",
  },
];

export const socialBrands: SocialBrand[] = [
  { name: "Facebook", href: "#", logo: "/images/brands/facebook.svg", width: 174 },
  { name: "Instagram", href: "#", logo: "/images/brands/instagram.svg", width: 191 },
  { name: "Twitter", href: "#", logo: "/images/brands/twitter.svg", width: 154 },
  { name: "Youtube", href: "#", logo: "/images/brands/youtube.svg", width: 158 },
  { name: "Steam", href: "#", logo: "/images/brands/steam.svg", width: 139 },
];

export const footerColumns: FooterColumn[] = [
  {
    title: "Our Studio",
    links: [
      { label: "About Us", href: "/the-stories" },
      { label: "Our Team", href: "/our-team" },
      { label: "Our Games", href: "/projects" },
      { label: "Careers", href: "#" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Game Design", href: "/services/game-design" },
      { label: "Game Development", href: "/services/game-development" },
      { label: "Art Director", href: "/services/art-direction" },
      { label: "Multiplatform", href: "/services/multiplatform-development" },
    ],
  },
];

export const footerBottomNav: NavLink[] = [
  { label: "home", href: "/" },
  { label: "news", href: "/#blog" },
  { label: "projects", href: "/projects" },
  { label: "about", href: "/the-stories" },
  { label: "contact", href: "/contact-us" },
];
