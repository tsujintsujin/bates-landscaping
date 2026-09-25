---
name: Bates Landscaping remodel
description: Bates red and forest green, Hooper's structure and motion, real Bates content.
colors:
  red: "#ed1c24"
  red-deep: "#b8121a"
  forest: "#0f1f17"
  forest-2: "#18301f"
  moss: "#5d6b5f"
  paper: "#f3f4f0"
  ink: "#121a15"
  white: "#ffffff"
  logo-grey: "#585858"
typography:
  display:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontWeight: 700
    letterSpacing: "-0.02em to -0.035em (tighter as size grows)"
  body:
    fontFamily: "Asap, system-ui, sans-serif"
    fontSize: "15px (16px base)"
    lineHeight: 1.55
rounded:
  chip: "3px"
  media: "6px"
  card: "16px"
  feature-card: "24px"
  pill: "9999px"
spacing:
  gutter-mobile: "16px"
  gutter-tablet: "32px"
  content-max: "1180px"
  header-max: "1440px"
  section-y-mobile: "96px"
  section-y-desktop: "112px-128px"
components:
  button-primary:
    backgroundColor: "{colors.red}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    padding: "12px 20px"
  button-primary-hover:
    backgroundColor: "{colors.red-deep}"
  button-dark:
    backgroundColor: "{colors.forest}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    padding: "12px 20px"
  button-dark-hover:
    backgroundColor: "{colors.red}"
  chip:
    rounded: "{rounded.chip}"
    padding: "4px 8px"
---

# Design System: Bates Landscaping remodel

## Overview

A landscaping contractor's site with the structure and motion of hooper-services.co.uk (a UK landscaper Justin chose as
the reference) and none of its look. Bates red carries action and emphasis; deep forest green carries the dark surfaces
(hero overlay, footer, hiring strip, commercial card, chat header). The page is light (paper ground) with dark bands; it
is not dark mode and there is no dark-mode variant.

Source of truth for tokens: `site/app/globals.css` (`@theme`). Everything in this file describes what is built on the
homepage as of 2026-09-25. Other pages must reuse it.

## Colors

### Primary
- **Bates red `#ED1C24`** (`red`): primary buttons, the WITH / FOR emphasis in the hero, carousel arrows, chat FAB, hover
  colour for links on dark backgrounds, the floating card gradient end.
- **Red deep `#B8121A`** (`red-deep`): hover state of red buttons; floating card gradient middle. Gradient start `#7A0B10`.

### Secondary
- **Forest `#0F1F17`** (`forest`): footer, hiring strip, hero overlay tint, dark buttons, chat header, mobile menu.
- **Forest-2 `#18301F`** (`forest-2`): the Commercial card (so it separates from the forest hero behind it).

### Neutral
- **Paper `#F3F4F0`** (`paper`): page ground. Slightly green-grey, deliberately not cream.
- **White**: the case-studies section background, dropdown panels, chat panel.
- **Ink `#121A15`**: text on light. **Moss `#5D6B5F`**: secondary text on light (paragraphs under headings).
- On dark surfaces, secondary text is white at 65-80% opacity; labels white at 50%.

### Named Rules
- One accent: red. No other hue ever gets introduced (no blue links, no green "success" chips).
- Shadows are tinted forest (`rgb(15 31 23 / a)`), never black.
- Text selection is red with white text; focus ring is a 2px red outline, offset 3px (`globals.css`).

## Typography

- **Display: Bricolage Grotesque**, bold (700), tight tracking, `text-wrap: balance` on all h1-h3.
- **Body: Asap** (Bates's current site font), 15px for paragraphs, 16px base.
- Headlines are sentence case. The only all-caps words are WITH and FOR in the hero (their tagline's own capitals).
- Small uppercase is used only for: gallery captions (11px, tracking 0.08em), case-study tag chips (11px), and footer field
  labels (12px, white/50). Never as an eyebrow above a section heading.

### Hierarchy (as built, clamp values)
| Role | Size | Where |
|---|---|---|
| Hero h1 | `clamp(2.5rem, 5.4vw, 5.75rem)`, leading 0.95, tracking -0.035em | Hero |
| Word-fill headline | `clamp(2rem, 4.4vw, 4.25rem)` | Gallery section |
| Section headline | `clamp(1.9rem, 3.6vw, 3.25rem)` | "One of the highest rated..." |
| Feature heading | `clamp(1.9rem, 3.2vw, 2.75rem)` | Floating card |
| Case title | `clamp(1.6rem, 3vw, 2.75rem)` | Carousel |
| Strip heading | `clamp(1.75rem, 3vw, 2.5rem)` | Hiring strip |
| Card title | `clamp(1.4rem, 1.9vw, 1.75rem)` | Commercial / Residential |
| Footer links | 20px mobile, `clamp(1.5rem, 2.4vw, 2rem)` desktop | Footer |
| Body | 15px, leading-relaxed, max ~65ch | Everywhere |

**OPEN:** Justin said "everything is too big" twice. A global shrink (hero ~60px, section heads 36-44px, section padding
80-96px, footer links ~26px) was proposed and **not answered**. Ask before building new pages at the current scale.

## Layout

- Content column `max-w-[1180px]` centred; header and hero content `max-w-[1440px]`.
- Gutters: 16px mobile (`px-4`), 32px from `md` (`md:px-8`), 0 from `xl` inside the 1180 column (`xl:px-0`).
- Breakpoints: Tailwind defaults (`sm 640`, `md 768`, `lg 1024`, `xl 1280`).
- Hero: `min-h-[100dvh]`. Content is centred (horizontally and vertically) on phones; left-aligned and sitting above
  centre on desktop (`md:pb-48` vs `md:pt-24`), because the split cards overlap the hero's bottom edge by 112px.
- Header: 72px tall, three-column grid `1fr auto 1fr` from `lg` so the nav is on the page's true centre.
- Section rhythm: `py-24` mobile, `md:py-28`/`md:pt-32`; hiring strip is shorter (`py-12`/`md:py-14`).
- The floating CTA card straddles the seam between page and footer: its section background is split paper/forest at
  `calc(50% + half the top padding)`.

## Elevation & Depth

- Cards over the hero: `0 24px 50px -20px rgb(15 31 23 / .5)`.
- Floating card: `0 30px 60px -20px rgb(15 31 23 / .55)`.
- Dropdowns: `0 18px 40px -12px rgb(15 31 23 / .35)` + 1px ring forest/5.
- Chat panel: `0 24px 60px -16px rgb(15 31 23 / .45)`. FAB: red-tinted `0 12px 28px -8px rgb(237 28 36 / .55)`.
- Header when solid: paper/95 + `backdrop-blur-md` + 1px bottom hairline shadow.

## Shapes

| Radius | Used for |
|---|---|
| 3px | Case-study tag chips (square-ish, like Hooper's) |
| 6px | Gallery photo cards, case-study slides (near-square, like Hooper's) |
| 16px (`rounded-2xl`) | Commercial/Residential cards, service panels, dropdown panels, chat panel, consent dialog |
| Circle | Team headshots |
| 24px (`rounded-3xl`) | Floating "We're here to help!" card |
| Full pill | Every button, the phone link, social icons, arrow buttons |

Leaf mask on the Commercial/Residential photos: `border-radius: 0 62% 0 62%` on mobile/tablet;
`0 0 0 70%` on desktop, where the photo fills the card's right half.

## Components

All live in `site/components/client.tsx` (client) and `site/app/page.tsx` (markup). Icons: Phosphor only, via
`site/components/icons.tsx` (re-exports; add new icons there). Never hand-draw icons.

### Buttons
- **Primary:** red pill, white 15px semibold text, 12px 20px padding, **no arrow**. Label "Book now" everywhere booking is meant.
- **Dark:** forest pill, turns red on hover ("View all projects →", "All case studies →" keep an arrow).
- **Text link with arrow:** no background, semibold, arrow nudges 2px right on hover. Used as the second action next
  to a button ("See our work →" in the hero, "Book now →" in the floating card). Rule from Justin: **one button + one
  text link**, never two buttons side by side.
- **Pill with arrow circle** ("See Careers"): one red pill, text then a white 36px circle with the arrow inside its
  right end (padding 6px on the right, 20px on the left); hover darkens the pill and nudges the arrow.
- Every pressable has class `press`: `scale(0.97)` on `:active`, 160ms custom ease-out (`globals.css`).
- Hover effects that move things are gated behind `@media (hover:hover)`.

### Chips
Case-study tags: 11px uppercase semibold, 3px radius, cycling white / red / paper backgrounds.

### Cards / Containers
- **Commercial / Residential**: link cards overlapping the hero; title + one line + "Discover more →"; photo with leaf mask.
- **Gallery card**: small photo (230-330px wide desktop, ~48-69vw phone), staggered top margins, forest gradient from the
  bottom, caption under a 1px white/25 line (Hooper's `.intro_gallery_caption`).
- **Case slide**: see Signature Components.
- Cards are used only where they carry hierarchy; sections otherwise group with space.

### Navigation
- Header: transparent with white text over the hero, turns solid (paper, ink text, coloured logo) once the hero top leaves
  the viewport (IntersectionObserver on `#top-probe`) when the page renders `<Header overHero />`. **Plain `<Header />` is solid from the start** (for light pages).
- Desktop: logo left, nav centred (Services ▾ / Portfolio ▾ / About Us / Careers ▾), phone number + red "Book now" right.
  Dropdowns open on hover and focus-within.
- Mobile: logo, round phone button, round menu button. Menu = full-screen forest panel, Commercial/Residential as
  `<details>` accordions, page scroll locked, Esc closes.

### Signature Components
- **Word-fill headline** (`WordFill`): words go from 18% to full opacity, scrubbed to scroll (GSAP ScrollTrigger,
  `top 80%` to `bottom 45%`). Must be one short line (Justin rejected a 30-word version).
- **Gallery marquee** (`GalleryMarquee`): list rendered twice, CSS `@keyframes marquee` to `translateX(-50%)`, 80s linear
  infinite. **Never pauses** (Justin, explicitly). Off for reduced motion (becomes a horizontal scroller).
- **Case-study slider** (`CaseCarousel`): custom, no library. Five slides rendered at offsets -2..2 around an unbounded
  `pos`, keyed by absolute index so they animate `transform` between positions (700ms custom ease-in-out). Loops both
  ways forever. Active slide is inset top and bottom with `clip-path` so the neighbours look taller (Hooper's look).
  Round red arrows over the neighbours; swipe on touch (a flick > 0.11 px/ms or a 50px drag); arrow keys when focused.
- **Floating CTA card** ("We're here to help!"): red gradient card with contour line art, 12px vertical bob (3.2s,
  CSS), straddles page/footer. "Ask us" opens the chat.
- **Service panels** (`.svc-row` / `.svc` in globals.css, pure CSS): five full-height photo panels in a row from `lg`;
  the hovered or focused panel grows to `flex-grow: 3.4` (600ms ease-in-out), the first one is open by default. The
  open panel's description reveals with a `grid-template-rows: 0fr → 1fr` transition; collapsed titles are 1rem and
  grow to 1.6rem. Below `lg` they stack with everything visible.
- **Team** (`TeamSection`): circle headshots (96px phone, 148px desktop), name + title under each. Press scales the
  circle to 0.92; click: others fade (250ms), the head slides to the left edge (550ms ease-in-out, 200ms delay), the
  details reveal from behind the circle across the full remaining width with `clip-path` + translate (500ms ease-out,
  700ms delay). Clicking the details closes it: the details fade out in place (300ms, Justin's call), then the head
  slides home (550ms after 300ms) and the others fade back in (750ms). Stage height animates to fit the bio. The head's
  offset comes from layout offsets and is re-measured on resize.
- **FAQ accordion**: native `<details name="faq">` (exclusive), 1px forest/10 dividers, round "+" that rotates into a
  red "×" when open, `::details-content` height animation where supported.
- **Consent Preferences**: round forest button bottom-left (cookie icon), native `<dialog>` with a blurred forest
  backdrop, categories as `<details>` rows with red switches, footer: "Save my preferences" text link + "Reject all"
  (outlined pill) + "Accept all" (red pill).
- **History row**: six columns (2 on phones), each a 1px top rule, year in red display type, one line of moss text.
- **Chat FAB**: red round button bottom-right. After 3s a "1" badge plus a speech bubble "Hey there, how can we help
  you?"; the bubble hides after 8s, the badge stays until opened (both remembered for the visit in sessionStorage).
  Never auto-opens. Panel shows quick-reply chips (Drainage, Bamboo, Patio / garden, Maintenance, Snow, Something
  else); each answer (canned text from their FAQs, `CHIPS` in `lib/content.ts`) carries "Book now →" to
  `/book-now?service=<key>`. Any element can open it with `dispatchEvent(new Event("bates:open-chat"))`.
- **Hero video**: muted, looped, poster first; plays only when reduced motion is off and data saver is off.
- **Hero entrance**: `.rise` (18px up, 6px blur, 900ms ease-out), staggered 0 / 120 / 220ms.

## Do's and Don'ts

### Do:
- Reuse the tokens, radii and button rules above on every new page.
- Use Bates's real copy, photos and facts from `recon/`.
- Keep motion native-scroll friendly and respect `prefers-reduced-motion`.
- Check every page at 1440 (or 1920) and 390 wide before calling it done.

### Don't:
- No smooth-scroll libraries (Lenis etc.), no scroll-jacking, no pinned sections that trap the scroll. Justin finds them laggy.
- No small uppercase eyebrow labels above headings. No section numbers.
- No em dashes or en dashes in visible text (use a hyphen, comma or full stop).
- No second accent colour, no gradients on text, no glass-for-decoration.
- No two buttons side by side: one button plus one text link.
- No invented testimonials, hours, stats, awards or prices.
- No hand-drawn icons; Phosphor only.
