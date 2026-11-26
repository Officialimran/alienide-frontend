/**
 * Response shapes of the Laravel public API (/api/v1).
 * They mirror the backend's API Resources (app/Http/Resources/*) one to one.
 */

/* ------------------------------------------------------------------
 * Envelopes
 * ------------------------------------------------------------------ */

/** `{ status, message, data }` returned by "show" endpoints, navigation and options. */
export interface ApiEnvelope<T> {
  status: boolean;
  message?: string;
  data: T;
}

/** Laravel `Resource::collection()` without pagination. */
export interface ApiCollection<T> {
  data: T[];
}

export interface ApiPaginationMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number | null;
  to: number | null;
}

/** Laravel `Resource::collection($paginator)`. */
export interface ApiPaginated<T> {
  data: T[];
  meta: ApiPaginationMeta;
}

/* ------------------------------------------------------------------
 * Widgets (WidgetInstanceResource; content per App\Widgets\Definitions)
 * ------------------------------------------------------------------ */

export interface ApiVideoLink {
  url: string | null;
  provider?: "youtube" | "vimeo" | "file" | string | null;
  video_id?: string | null;
  embed_url?: string | null;
  thumbnail?: string | null;
}

export interface GalleryWidgetContent {
  heading?: string | null;
  description?: string | null;
  items?: {
    type?: "image" | "video";
    image?: string | null;
    video?: ApiVideoLink | null;
    title?: string | null;
    alt?: string | null;
  }[];
}

export interface TestimonialWidgetContent {
  heading?: string | null;
  items?: {
    name: string;
    designation?: string | null;
    image?: string | null;
    rating?: string | null;
    message: string;
  }[];
}

export interface FeaturesWidgetContent {
  heading?: string | null;
  description?: string | null;
  items?: { title: string; image?: string | null; icon?: string | null; description?: string | null }[];
}

export interface FaqWidgetContent {
  heading?: string | null;
  items?: { question: string; answer: string }[];
}

export interface ClientWidgetContent {
  heading?: string | null;
  items?: { name: string; image?: string | null }[];
}

export interface OverviewWidgetContent {
  image?: string | null;
  heading?: string | null;
  highlight?: string | null;
  badge_text?: string | null;
  intro?: string | null;
  description?: string | null;
  /** "Learn more" button; hidden when button_url is empty. */
  button_text?: string | null;
  button_url?: string | null;
  button_new_tab?: boolean | null;
  stats?: { value: string; suffix?: string | null; label: string }[];
}

export interface WeAreWidgetContent {
  image?: string | null;
  image_position?: "left" | "right";
  heading?: string | null;
  intro?: string | null;
  description?: string | null;
}

/** GoogleMapWidget: a location set by address or coordinates. */
export interface GoogleMapWidgetContent {
  heading?: string | null;
  description?: string | null;
  location_type?: "address" | "coordinates";
  address?: string | null;
  latitude?: number | string | null;
  longitude?: number | string | null;
  marker_title?: string | null;
  zoom?: number | string | null;
  map_type?: "roadmap" | "satellite";
  height?: number | string | null;
  dark_style?: boolean | null;
  show_directions?: boolean | null;
}

/** Links GoogleMapWidget::computed() derives from the location (no API key needed). */
export interface GoogleMapWidgetComputed {
  query?: string | null;
  embed_url?: string | null;
  map_url?: string | null;
  directions_url?: string | null;
}

export interface OfficeAddressWidgetContent {
  subheading?: string | null;
  heading?: string | null;
  description?: string | null;
  items?: {
    title: string;
    city?: string | null;
    image?: string | null;
    address: string;
    phones?: { label?: string | null; number: string }[];
    emails?: { label?: string | null; address: string }[];
    hours?: { days: string; time: string }[];
    show_map_link?: boolean | null;
  }[];
}

/** Per office (same order as content.items): tel:/mailto: links and map links. */
export interface OfficeAddressWidgetComputed {
  items?: {
    phones?: { href: string | null }[];
    emails?: { href: string | null }[];
    map_url?: string | null;
    directions_url?: string | null;
  }[];
}

export interface ContactSupportWidgetContent {
  subheading?: string | null;
  heading?: string | null;
  highlight?: string | null;
  description?: string | null;
  image?: string | null;
  items?: {
    title: string;
    icon_image?: string | null;
    icon?: string | null;
    description?: string | null;
    action?: "none" | "email" | "phone" | "link";
    email?: string | null;
    phone?: string | null;
    url?: string | null;
    action_text?: string | null;
    new_tab?: boolean | null;
    /** Revealed with the action when hovering the card. */
    socials?: { label?: string | null; icon?: string | null; url: string }[];
  }[];
  hours?: string | null;
  response_time?: string | null;
  button_text?: string | null;
  button_url?: string | null;
  button_new_tab?: boolean | null;
}

/** Per support option (same order as content.items): the action link, if any. */
export interface ContactSupportWidgetComputed {
  items?: { href: string | null; text: string | null; external: boolean }[];
}

export interface WidgetContentMap {
  gallery: GalleryWidgetContent;
  testimonial: TestimonialWidgetContent;
  features: FeaturesWidgetContent;
  faq: FaqWidgetContent;
  client: ClientWidgetContent;
  overview: OverviewWidgetContent;
  we_are: WeAreWidgetContent;
  google_map: GoogleMapWidgetContent;
  office_address: OfficeAddressWidgetContent;
  contact_support: ContactSupportWidgetContent;
}

/** Read-only values the backend derives from a widget's content (WidgetContract::computed). */
export interface WidgetComputedMap {
  gallery: Record<string, never>;
  testimonial: Record<string, never>;
  features: Record<string, never>;
  faq: Record<string, never>;
  client: Record<string, never>;
  overview: Record<string, never>;
  we_are: Record<string, never>;
  google_map: GoogleMapWidgetComputed;
  office_address: OfficeAddressWidgetComputed;
  contact_support: ContactSupportWidgetComputed;
}

export type WidgetType = keyof WidgetContentMap;

export interface ApiWidget<T extends string = string> {
  id: number;
  widget_type: T;
  label: string | null;
  content: T extends WidgetType ? WidgetContentMap[T] : Record<string, unknown>;
  computed?: T extends WidgetType ? WidgetComputedMap[T] : Record<string, unknown>;
  sort_order: number;
}

/* ------------------------------------------------------------------
 * Pages & templates
 * ------------------------------------------------------------------ */

export interface ApiPage {
  id: number;
  template: { id: number | null; slug: string | null; name: string | null };
  title: string;
  slug: string;
  content: string | null;
  excerpt: string | null;
  meta_title: string | null;
  meta_description: string | null;
  main_keyword: string | null;
  cover: string | null;
  cover_sd: string | null;
  status: boolean;
  widgets?: ApiWidget[];
  created_at: string;
}

/* ------------------------------------------------------------------
 * Navigation (MenuResource / MenuItemResource)
 * ------------------------------------------------------------------ */

export interface ApiMenuItem {
  id: number;
  parent_id: number | null;
  title: string;
  /** "page" (linked to a CMS page) or "custom". */
  type: "page" | "custom" | string;
  url: string | null;
  target: "_self" | "_blank" | string | null;
  sort_order: number;
  status: boolean;
  linkable: { id: number; title: string; slug: string | null } | null;
  children: ApiMenuItem[];
}

export interface ApiMenu {
  id: number;
  name: string;
  slug: string;
  location: string | null;
  status: boolean;
  items: ApiMenuItem[];
}

/** Menus keyed by `location` (or `slug` when no location is set). */
export type ApiNavigation = Record<string, ApiMenu>;

/* ------------------------------------------------------------------
 * Site options (OptionService::present)
 * ------------------------------------------------------------------ */

export type ApiIconType = "svg" | "image" | "class" | null;

export interface ApiOptionButton {
  text: string | null;
  url: string | null;
  new_tab: boolean;
}

export interface ApiOptionContact {
  value: string | null;
  url: string | null;
  icon: string | null;
  icon_type: ApiIconType;
}

export interface ApiOptionSocialLink {
  label: string | null;
  url: string | null;
  icon: string | null;
  icon_type: ApiIconType;
}

/** `{ group: { key: value } }`; the value shape depends on the option type. */
export type ApiOptions = Record<string, Record<string, unknown>>;

/* ------------------------------------------------------------------
 * Banners
 * ------------------------------------------------------------------ */

export interface ApiBanner {
  id: number;
  title: string | null;
  subtitle: string | null;
  /** YouTube link or video file shown over the cover after it has loaded. */
  video_url: string | null;
  url: string | null;
  priority: number;
  cover: string | null;
  cover_sd: string | null;
}

/* ------------------------------------------------------------------
 * Projects
 * ------------------------------------------------------------------ */

export interface ApiProjectSocialLink {
  platform: string;
  label: string;
  url: string;
}

export interface ApiProject {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  thumbnail: string | null;
  cover: string | null;
  release_date: string | null;
  website_url: string | null;
  social_links: ApiProjectSocialLink[];
  types?: { name: string; slug: string; icon: string | null }[];
  categories?: { name: string; slug: string }[];
  widgets?: ApiWidget[];
  is_featured: boolean;
  priority: number;
  meta_title: string | null;
  meta_description: string | null;
  meta_keyword: string | null;
}

export interface ApiProjectTaxonomy {
  id: number;
  name: string;
  slug: string;
  icon?: string | null;
  priority: number;
  projects_count?: number;
}

/* ------------------------------------------------------------------
 * Services
 * ------------------------------------------------------------------ */

export interface ApiService {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  tags: string[];
  thumbnail: string | null;
  cover: string | null;
  release_date: string | null;
  is_featured: boolean;
  priority: number;
  meta_title: string | null;
  meta_description: string | null;
  meta_keyword: string | null;
}

/* ------------------------------------------------------------------
 * Team
 * ------------------------------------------------------------------ */

export interface ApiTeamMember {
  id: number;
  name: string;
  slug: string;
  designation: string | null;
  content: string | null;
  image: string | null;
  social_links?: { label: string | null; icon: string | null; icon_type: "svg" | "image"; url: string | null }[];
  is_featured: boolean;
  priority: number;
}

/* ------------------------------------------------------------------
 * Forms
 * ------------------------------------------------------------------ */

/** POST /v1/suggests (SuggestStoreRequest). */
export interface SuggestionPayload {
  name: string;
  email: string;
  phone: string;
  address?: string;
  remarks?: string;
}
