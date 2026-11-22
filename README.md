# Qamico – Indie Games Studio (Next.js)

A Next.js 15 (App Router) + TypeScript + Tailwind CSS v4 rebuild of the Gamico/Qamico
indie-game-studio home page.

## Scripts

```bash
npm run dev     # http://localhost:3000
npm run build   # production build
npm run start   # serve the production build
npm run lint
```

Set `NEXT_PUBLIC_SITE_URL` in production so Open Graph URLs resolve correctly.

## Pages

| Route          | Page                                  |
| -------------- | ------------------------------------- |
| `/`            | Home                                  |
| `/the-stories` | About us ("The Stories")              |
| `/services`    | Our Services                          |
| `/projects`    | Games archive with platform/genre filter and pagination (`?platforms=&genres=&page=`) |
| `/projects/[slug]` | Game detail (all 14 games pre-rendered): hero, overview + facts, features, video/image gallery |
| `/services/[slug]` | Service detail (4 services): same layout and components as the game detail page |
| `/our-team`    | Full studio roster (click a member for the profile slider), join-the-team card, testimonials |
| `/contact-us`  | Map + office details, feedback form (client-side validation; wire `onSend` to a backend), support contacts |
| any unknown URL | 404 page (`src/app/not-found.tsx`) |

Header, footer and the back-to-top button live in the root layout, so new pages only render
their own sections. Inner pages start with `PageBanner` (title + breadcrumb).

## Structure

```
src/
  app/            layout (fonts, metadata), page composition, globals.css (design tokens)
  components/
    layout/       Header (nav, dropdowns, account card, cart drawer, mobile menu), Footer, ScrollToTop, PageBanner
    sections/     One folder/file per page section (home sections; stories/, services/ per page;
                  shared/ for blocks reused across pages, e.g. DesignConnect; projects/ for the archive;
                  detail/ for the shared game + service detail layout)
    ui/           Reusable primitives: ButtonLink, DisplayTitle, Icon, Reveal, Counter, Drawer,
                  ImageMarquee, TextMarquee, Lightbox
  data/           site.ts (shared + home, team roster), partners.ts (home logos — placeholders), contact.ts, stories.ts, services.ts, projects.ts (catalogue + query helper),
                  projectDetail.ts (shared game-page template content; services.ts holds service-page content)
  hooks/          useInView (IntersectionObserver)
  lib/            small helpers
  types/          shared content types
public/
  images/         artwork, photos, logos, social brand marks
  fonts/          theme icon font (gamico-icon)
```

## Notes

- **Design tokens** live in `src/app/globals.css` (`@theme`). Breakpoints mirror the original's
  Elementor setup: `md` 768, `mx` 881, `lg` 1025, `xl` 1201, `2xl` 1367.
- **Animations**: scroll-triggered entrance (`Reveal`), count-up stats, marquee, sticky stacking
  game cards, sticky capabilities column, ink-fill button hover, team detail popup, Swiper
  carousels (testimonials, team, social brands). All respect `prefers-reduced-motion`.
- **Hero video** is the original YouTube background, looped between 2s–9s via the IFrame API,
  with a poster image fallback.
- **Forms** (newsletter, login) are front-end only; wire them to your backend.
- **Assets**: images, icon font and brand artwork come from the commercial Gamico theme demo.
  Make sure you hold a licence (or replace them) before deploying publicly.
# alienide-frontend
