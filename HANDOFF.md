# HANDOFF: Bates Landscaping remodel

Written 2026-09-25, updated the same evening after Justin's third review round. **The homepage is built and live at
justin94.space/bates; the next session builds the other pages.** This file replaces the planning-session handoff. Read it top to bottom before touching code.

Read in this order:
1. **This file.** Everything decided, everything built, every trap.
2. **`DESIGN.md`**: the design system as built (tokens, type scale, radii, components, do's and don'ts).
3. **`PRODUCT.md`**: product truth (who, why, constraints, what content exists, what must never be invented).
4. **`NOTES.md`**: the running decision log with the reasoning and history. **Append to it** every time Justin decides
   something. He discusses piecemeal, jumps between topics, and expects every point noted.
5. `recon/`: everything captured from the live site. Don't re-crawl; it's all here (inventory in §6).

---

## 0. Status at a glance

| Area | State |
|---|---|
| Homepage (`site/app/page.tsx`) | Built, reviewed by Justin three times, all feedback applied. Scale confirmed "fine now". |
| Live | **https://justin94.space/bates** (Portfolio proxies `/bates/*` to the Vercel app, §3). |
| Design system | Settled and documented in `DESIGN.md`. Reuse it; don't reinvent per page. |
| Other pages | **Not started.** Internal links go to real paths under `/bates` and 404 until each page exists (§7.1 item 7). |
| Chat FAB | UI built with canned answers from their FAQs. **No AI backend yet** (§9.2). |
| Booking | Not built (spec §9.1). `/book-now?service=<key>` is already linked from the chat. |
| Consent Preferences | Built (button bottom-left + dialog, choice in `localStorage`). |
| Git / GitHub | Private repo **`tsujintsujin/bates-landscaping`**, default branch `main`; merge to `main` = production deploy. |
| Dark mode | Not built, not requested. Page is light with dark bands. |
| Interview sheet | `deliverables/Bates-site-notes.pdf` (source `site-notes.html`), 12 verified findings (§11). |

---

## 1. How Justin works (read this first; it matters more than the spec)

These come from friction in the sessions so far. Getting them wrong costs his trust fast.

1. **"Discuss" / "check with me" / "thoughts?" means answer in chat. Don't build.** No files, no scaffolding, no crawling
   until he says go. Building when he asked to talk is the #1 thing that angered him.
2. **Don't invoke skills he didn't name.** Never run `/site-rebuild` on your own. The design skills (`impeccable`,
   `emil-design-eng`, `design-taste-frontend`, or all three via `/frontendskills`) are what he wants for design work, and
   he invoked `/frontendskills` for the homepage. For new pages, **offer** them; run them when he says.
3. **When he names a reference site, open it in Chrome and study it before giving opinions.** He shows references and
   expects them studied. Measure (font sizes, card sizes, borders) with `javascript_tool`; don't eyeball.
4. **Recommend, don't survey.** One recommendation with a short why. When he pushes back, check whether he's right and
   say so plainly if he is.
5. **Own your calls.** Don't blame rules or tools. When he asked "is this using design skills? why is everything so
   big?", the honest answer (I skipped the skills' comp and review steps, and copied Hooper's big-type numbers) was right.
6. **He trims and edits media himself** (OpenCut for video, image edits). Don't regenerate assets he said are his
   (the hero video; the Khyss and Juliana headshots).
7. **Plain language.** Short tables and bullets. No jargon.
8. **He reviews visually and finds problems within minutes.** He sends numbered lists of fixes. Apply all of them, check
   each one in the browser at desktop and phone width, and report per number.
9. **He dislikes things that look oversized.** Twice now "everything is too big". Default to the smaller option.

Global rules from his `CLAUDE.md` (auto-loaded, summarised):
- **Git:** never edit on `main`. Branch first (`claude/<topic>`), then when the task is fully done: gates green → audit
  staged files for secrets → commit → push → `gh pr create` → `gh pr merge --merge --delete-branch`. Do it yourself,
  don't ask "should I commit?". One task, one PR.
- **Browser testing = Claude in Chrome (`mcp__claude-in-chrome__*`) only.** The built-in Browser pane is only for
  `preview_start` to launch the dev server. Every user-facing change is checked at desktop **and ~390px phone width**,
  with screenshots sent via `SendUserFile`. No screenshot = "built, not checked". See §8 for how to actually get valid
  screenshots here (it's not straightforward).
- **Run commands yourself**; never hand him commands to paste (UAC elevation is the only exception).
- **Credentials** live in `D:\AIO Freelance\Credentials\` (index `README.md`). Never copy a secret value into the repo,
  a log, a doc or chat. Refer to it by its README name.

---

## 2. Purpose

- **A demo for a job application.** Justin (the builder, Justin Masiga) is applying to work at Bates Landscaping and uses
  this remodel to get a foot in the door. Not a sold client build. **Zero cost** (free tiers only).
- It must make two points in an interview: *"I understand your business"* and *"I can build what you need."* Real Bates
  content and brand, clearly better than the current site, plus working features it lacks (chatbot, real booking email).
- **Modern remodel, NOT the same layout and look** as the current site. Justin was explicit.
- The footer says "Concept remodel, not the official site." and the site is `noindex`. Keep both.

---

## 3. Repo, running it, checks

### Where things are
- Local: `D:\AIO Freelance\Freelance\Pitch\Bates\` (git root). App in `site/`. Recon in `recon/`. Tools in `tools/`.
- GitHub: **https://github.com/tsujintsujin/bates-landscaping** (private). `main` is the default branch; the homepage was
  merged via PR from `claude/homepage`.
- `.claude/skills` and `.claude/commands` in the Bates folder are **Windows junctions** to `D:\AIO Freelance\.claude\`
  (so the workspace skills load when Bates is the git root). They are gitignored. Don't delete them; don't commit them.
  If a fresh clone lacks them and the design skills don't show up, recreate with
  `cmd /c mklink /J .claude\skills "D:\AIO Freelance\.claude\skills"` (and the same for `commands`).

### Running
- Dev server: **port 3012**. `.claude/launch.json` has config `"bates"` (`npm --prefix site run dev -- -p 3012`).
  Start it with `mcp__Claude_Browser__preview_start {name: "bates"}`, then open **`http://localhost:3012/bates`** in real
  Chrome. The whole app lives under the `/bates` base path; `http://localhost:3012/` is a 404.
- Changing `site/next.config.ts` needs a server restart (`preview_stop` then `preview_start`).
- If `preview_start` says port 3012 is held by another chat's server, check whether it actually responds
  (`curl http://localhost:3012/bates`). An earlier chat's server died silently once; when the port is free, start it again.
- Port 3000 may be taken by Justin's local OpenCut. Don't use it.
- The first request after start compiles for ~30-60s; a Chrome tab opened too early shows an error page. Wait for
  `curl` to return 200, then navigate.
- The Next.js dev "N" badge is turned off (`devIndicators: false`) because it covered the Consent button.

### Deploy (live)
- **Vercel project `bates-landscaping`** (team `tsujintsujins-projects`), connected to the GitHub repo, **Root Directory
  `site`**, framework Next.js, production branch `main`. Every merge to `main` deploys production; branch pushes get
  preview deployments. The repo root has `.vercel/project.json` (gitignored) from `vercel link`, and `vercel link` also
  wrote a `.env.local` with a short-lived OIDC token (gitignored; never commit it).
- Production app URL: **https://bates-landscaping.vercel.app/bates** (public). Per-deployment URLs
  (`bates-landscaping-<hash>-tsujintsujins-projects.vercel.app`) sit behind Vercel's login (deployment protection
  "all except custom domains"), which is expected; the production alias and justin94.space are public.
- **justin94.space/bates** works through the **Portfolio** project (`D:\AIO Freelance\Portfolio`, repo
  `tsujintsujin/portfolio`): its `next.config.ts` `rewrites()` maps `/bates` and `/bates/:path*` to the Vercel app. New
  pages need no Portfolio change (`/bates/:path*` covers them).
- `basePath` is `"/bates"` from `site/lib/base.ts` (`BASE`), imported by `next.config.ts`. See §7.1 item 1 for what that
  means when writing links and image paths.
- Vercel's CLI is logged in as `tsujintsujin`. Its token lives in `%APPDATA%\xdg.data\com.vercel.cli\auth.json`; it was
  used once to set the Root Directory through the Vercel API. Never copy it anywhere.

### Stack and versions
- Next.js **16.3.6** (App Router), React 19.2.8, TypeScript, Tailwind CSS **v4** (`@tailwindcss/postcss`, tokens in
  `@theme` in `site/app/globals.css`), GSAP 3.15 (ScrollTrigger only), `@phosphor-icons/react` 2.1. Node 24.
- **Next 16 is newer than your training data.** `site/AGENTS.md` says read `site/node_modules/next/dist/docs/` before
  writing Next-specific code. `next dev` rewrites `site/AGENTS.md` / `site/CLAUDE.md`; commit whatever it writes.
- Fonts via `next/font/google` in `site/app/layout.tsx`: `Bricolage_Grotesque` (axes opsz, wdth) → `--font-bricolage`,
  `Asap` → `--font-asap`.
- `LayoutProps<"/">` in `layout.tsx` is Next 16's global route type. Fine as is.

### Checks (all passed at handoff)
```
cd site
npx tsc --noEmit
npx eslint app components lib
npx next build
node "D:/AIO Freelance/.claude/skills/impeccable/scripts/detect.mjs" --json app/page.tsx components/client.tsx app/globals.css
```
The last one is the impeccable design detector; it returned `[]` (no findings). RTK rewrites some commands and
summarises their output; prefix `rtk proxy` (e.g. `rtk proxy npx eslint ...`) to see the full lint output.

---

## 4. File map

```
Bates/
  HANDOFF.md        this file
  DESIGN.md         design system as built (impeccable reads it)
  PRODUCT.md        product truth (impeccable reads it)
  NOTES.md          decision log, append-only
  CLAUDE.md         short pointer to the above (auto-loads)
  .claude/launch.json   dev server config "bates", port 3012
  tools/shots.mjs   headless Chrome screenshots at 1440 and 390 (see §8)
  deliverables/     Bates-site-notes.pdf + site-notes.html (the "what I found" sheet for the interview)
  recon/            captured live-site content (§6)
  site/
    next.config.ts      basePath "/bates" (from lib/base.ts), devIndicators off
    app/layout.tsx      fonts, metadata (title, description, robots noindex)
    app/icon.svg        favicon = traced Bates "B" mark
    app/page.tsx        the homepage markup (server component) incl. footer
    app/globals.css     Tailwind v4 @theme tokens, .press, .rise, .floating, marquee keyframes, services panels
                        (.svc*), FAQ open animation (.faq)
    components/client.tsx  all client components: SmartLink, Header, HeroVideo, WordFill, GalleryMarquee,
                        CaseCarousel, ChatFab, OpenChatButton, TeamSection, ConsentPreferences
    components/icons.tsx   Phosphor re-exports under local names (Arrow, Phone, Mail, Menu, Close, Cookie, Plus, ...)
    lib/base.ts         BASE = "/bates" and asset() for /public paths
    lib/content.ts      PHONE, EMAIL, ADDRESS, SOCIALS, NAV, GALLERY, CASES, SERVICES, HISTORY, TEAM, FAQS, CHIPS
    public/img/         web-ready images: g-* gallery, c-* case studies, s-snow, crew, team/*.webp (480px squares),
                        logo.svg (traced), logo.webp (old raster, unused), aoe-2024.webp (NALP badge)
    public/media/       hero.webm, hero.mp4, hero-poster.webp
```

Images were converted with Python + Pillow (WebP). ffmpeg is installed (winget, user scope) for video. `vtracer`
(pip) traced the logo: red and grey layers separately from the 1044x275 original, recoloured to exact #ED1C24 / #585858.

---

## 5. The business (verified facts only)

| | |
|---|---|
| Name | Bates Landscaping (Bates Landscaping Ltd on LinkedIn) |
| Tagline | "The best Landscape company to work WITH and FOR" |
| Claim | "One of the highest rated companies to work with and for in Southeastern PA" |
| History | Justin Bates learned the trade from his father in 2002; company started 2009 (mother's garage); incorporated 2011; West Chester office 2017; drainage team 2018; Phoenixville location 2022 |
| Address | 705 St Marys St, Phoenixville, PA 19460 (footer). Also West Chester and Phoenixville location pages. |
| Phone | **(484) 443-8772**, the number on their truck. **Decided by Justin** over the footer's (484) 887-8678. In `lib/content.ts` as `PHONE` / `PHONE_HREF`. |
| Email | `info@bateslandscaping.net` (**.net**; the only address anywhere on their site, which is .co) |
| Hours | **Not on their site. Don't invent them.** |
| Service area | Chester, Delaware and Montgomery Counties, PA (snow also covers the Philadelphia Airport area). Towns include Chester Springs, Kennett Square, Paoli, Media, Phoenixville, Downingtown, Bryn Mawr, Wayne, West Chester, Malvern, King of Prussia, plus about 20 more on `/all-services/` (**not captured**) |
| Award | NALP (National Association of Landscape Professionals) 2024 Awards of Excellence Winner ("AOE 2024" badge in their footer). On our footer too (`public/img/aoe-2024.webp`). |
| Socials | facebook.com/BatesLandscapingPa, instagram.com/bateslandscapingltd, linkedin.com/company/bates-landscaping-ltd |
| Clients | Homeowners, property managers, HOAs, apartment communities, engineers, senior living, offices, churches and cemeteries |
| Services | Installation & design; maintenance (residential = "Estate Maintenance"); hardscaping; drainage/stormwater; bamboo remediation; snow + ice (**commercial/HOA only**, not homeowners) |
| Not offered (FAQ) | Concrete, firewood, mulch delivery, tree work over ~15 ft |
| Booking today | Calendly embed on `/book-now/`: choose service, 30-min intake call, email 3-5 property photos |
| Careers | 8 open roles, benefits list, English + Spanish applications (employee and subcontractor), Trainual staff login |
| Client portal | "Track My Project" → https://portal.golmn.com/ (external) |

### Their real URLs (live menu, checked 2026-09-25). Our `NAV` uses these paths.
| Label | Path |
|---|---|
| About Us | `/about-us/` (submenu item "The Bates Difference and Down..." → `/design/`) |
| Services (all) | `/all-services/` |
| Commercial Landscaping | `/commercial-landscaping-services/` |
| Commercial: Installation & Design / Maintenance / Drainage / Bamboo / Snow + Ice | `/commercial-landscaping-installation-design/`, `/commercial-maintenance/`, `/commercial-drainage/`, `/bamboo-remediation/`, `/snow-ice-removal-west-chester/` |
| Residential Landscaping | `/residential-landscaping-services/` |
| Residential: Installation & Design / Estate Maintenance / Drainage | `/design/`, `/maintain/`, `/drainage-solutions/` |
| Portfolio | `/project-gallery/` (also a duplicate `/project-gallery-tabs/`), `/case-studies/` |
| Career Center | `/career-center/`, `/join-our-team/`, Trainual login `https://bates-landscaping.trainualapp.com/users/sign_in` (external) |
| Book Now / Request a Quote | `/book-now`, `/request-a-quote/` (effectively the same page) |
| Locations | `/west-chester/`, `/phoenixville/` |
| Legal | `/terms-and-conditions/`, `/sms-terms-condition/`, `/sitemap/` |

Notes: on their site Residential's menu has no Bamboo entry; ours lists Bamboo under both (same page, `/bamboo-remediation`).
`/design/` doubles as "The Bates Difference" and Residential Installation & Design. Our footer's "Privacy Policy" links to
`/privacy-policy`, which **doesn't exist on their site** (theirs points at SMS terms, an upstream bug; see §11).

---

## 6. What's on disk (`recon/`)

| Path | Contents |
|---|---|
| `recon/hero-video.webm` | Hero footage **trimmed by Justin in OpenCut**. 21.5s, 1920x1080, 25.3 MB. The web copies in `site/public/media/` are re-encoded (~4 MB each) **and cropped** (`crop=iw*0.89:ih*0.85:0:0`) to remove a pink "B" logo burned into the bottom-right corner. Use no other video. |
| `recon/home-copy.md` | Their homepage copy, verbatim, in page order (their HTML repeats headings; that's their markup). |
| `recon/faq.md` | 55 FAQs verbatim: homepage 31, residential 9, commercial 15. |
| `recon/case-studies.json` + `recon/case-studies/` | **16 case studies**, keys `url, title, text, images, local`. `text` is sometimes a list of paragraphs; join it. Up to 3 images each, downloaded. ⚠ Some of the 3 images belong to the "similar projects" sidebar, not the job itself; check visually before pairing. |
| `recon/portfolio/` + `manifest.json` | 20 of the 24 photos on `/project-gallery/`. Manifest maps file → source URL → `caption` (their title where one exists, `null` otherwise). |
| `recon/team.json` + `recon/team/` | 10 team members: name, position, full bio, headshot. |
| `recon/brand/` | Logo originals: `bates-logo-original.png` (**1044x275**, the largest that exists), `-1024x270`, `-300x79`, `-e1.webp` (250x66); square mark `bates-mark-original.png` (512) and `-270`. **Traced SVGs: `bates-logo.svg`, `bates-mark.svg`.** NALP badge `aoe2024winner.png` (1665x601). |
| `recon/services/` | **Their service and landing pages' text, verbatim**: 10 pages (the 8 service paths in §5 + the Commercial and Residential landing pages), captured 2026-09-25, one `.md` per URL slug. `recon/services/img/` has 6 of their snow + ice photos. |

### The 16 case studies (all distinct jobs; several share a title)
| # | URL slug | County | Price range |
|---|---|---|---|
| 1 | 55-community-property-maintenance-snow-ice-management | Delaware | none given |
| 2 | irregular-natural-flagstone-reinstall | Delaware | $22,000-$28,000 |
| 3 | grading-drainage | Chester | $15,000-$20,000 |
| 4 | business-complex-office-building-landscape-maintenance | Chester | none given |
| 5 | native-planting-with-added-water-feature | Montgomery | $8,000-$13,000 |
| 6 | storm-water-drainage-berms-piping | Delaware | $16,000-$24,000 |
| 7 | partial-perimiter-pond-dredging (their spelling) | Chester | none given |
| 8 | custom-pondless-water-feature | Chester | $12,000-$15,000 |
| 9 | custom-pondless-water-feature-chester-county | Chester | $20,000-$24,000 |
| 10 | bamboo-removal | Chester | $11,000-$13,000 |
| 11 | bamboo-removal-delaware-county | Delaware | $20,000-$25,000 |
| 12 | bamboo-removal-residential | Delaware | $29,000-$32,000 |
| 13 | bamboo-removal-commercial | Delaware | $9,000-$11,000 |
| 14 | entry-walkway-with-porch-overlay | Chester | $28K-$33K |
| 15 | drainage-issue-water-in-home | Chester | $45K-$50K+ |
| 16 | city-oasis | none given | none given |

The homepage carousel uses **8** of them (`CASES` in `lib/content.ts`): the ones whose photo clearly shows that job. Titles
there drop the " - Bates Landscaping" suffix. Prices use a plain hyphen (no en dashes, see DESIGN.md).

### Team (from `team.json`)
Megan (Area Manager est 2015), Dylan (Partner + VP of Operations est 2013), Melissa (Business Developer est 2014),
Justin (Partner + General Manager est 2009), Angel (Shop Supervisor est 2018), Enrique (Supervisor est 2011), Cailee
(Office Manager), Khyss (Human Resources Administrator est 2024), Molly (Production Manager est 2024), Juliana (Sales
Assistant est 2025).
- Megan: card says "Area Manager est 2015", her page bio says Account Manager. Card used as-is.
- **Khyss and Juliana** headshots don't match the others (the rest: red Bates tops, dark grey studio backdrop, smiling).
  **Justin is retouching those two himself.** Use the current files until he drops in new ones. Don't generate replacements.
  (A Hugging Face attempt earlier hit the ZeroGPU daily quota; that route is dropped.)
- About-page videos "Meet Ramon" and "Meet Nerly Garcia" feature people not on the team list.
- Other Bates videos exist on their server (sizes by HEAD): Hardscaping.webm (76 MB), SpringCleanUp (56 MB),
  BambooRemoval (187 MB), Meet_Angel (91 MB), Meet_Ramon (124 MB), Meet_Nerly_Garcia (134 MB), under
  `bateslandscaping.co/wp-content/uploads/2023/03/` or `/2024/04/`. Not downloaded. `meet-bates-landscaping` (their
  homepage video) was **ruled out by Justin**.

Heavy originals, if you ever use them: `portfolio/16-untitled-design-76.png` (6.8 MB), `case-studies/06-0` and `07-0`
`daiva-k.png` (7.6 MB each), `portfolio/19-123.jpeg` (2.3 MB), `team/01-megan.jpg` (2.2 MB). Always convert to WebP
into `site/public/img/` first.

---

## 7. The homepage as built (top to bottom)

Main reference: **https://www.hooper-services.co.uk/**. Take its **structure and motion**, never its look (Hooper is
green/cream/yellow/blue; Bates is red + forest). Bottom card reference: **https://www.pocketdevs.ph/**.

| # | Section | What it is | Justin's decisions / history |
|---|---|---|---|
| Header | `Header` | Transparent over hero, solid after. Traced SVG logo. Nav centred on the page (grid `1fr auto 1fr`). Phone + "Book now" right. Mobile: phone + menu buttons, full-screen forest menu. Trainual opens in a new tab. | He flagged the nav as off-centre (phone number weighed the right side). Fixed; measured centre = page centre. He asked for an SVG of their logo; traced from their largest original. |
| 1 | Hero | Video bg, forest overlay. H1 = their tagline, WITH and FOR in red. One line of services + counties. **"Book now" button (no arrow) + "See our work →" text link.** | Tagline chosen by Justin over new headlines. First version was 5 lines (too big); now 3. Text raised above centre on desktop; centred both ways on phones. |
| 2 | Commercial / Residential cards | Two link cards overlapping the hero's bottom. Forest-2 and red. Title, one short line, "Discover more →", photo with leaf mask. Desktop: photo fills the card's right half. | Brought back by Justin as section 2 in Hooper's style. Lines shortened from their long copy. Smaller cards and wider desktop photo at his request. |
| 3 | Project galleries (`#work`) | Word-fill headline "Landscapes we've built and cared for across Southeastern PA." → endless **marquee** of 14 small photos at staggered heights, caption under a thin line → their full sentence as a paragraph → "View all projects →". | 30-word headline rejected; scroll-linked drift rejected: **auto marquee that never stops** (no hover pause). My 5 written captions approved. |
| 4 | **Our services** | Forest section. **Five panels in a row; the hovered/focused one widens** (first one by default) and shows its line + "Learn more →". Pure CSS (`.svc*` in globals.css); collapsed titles shrink to 1rem so long words fit. Phones: stacked cards with text showing. Snow + Ice carries a "Commercial and HOA properties" chip. "All services →" goes to `/all-services`. | Justin: their 5-card services list must be developed. Their homepage blurbs are swapped between cards, so each line comes from that service's own page (`recon/services/`). Links follow their cards (commercial service pages). |
| 5 | **We are Bates Landscaping** | Split: heading ("We are" small over "Bates Landscaping"), their founding paragraph + competitive-edge paragraph, "About us →"; crew photo right. Below: **history row** 2002 / 2009 / 2011 / 2017 / 2018 / 2022 (`HISTORY`). | Added by Justin: WE ARE goes before "One of the highest rated...". The "Founded in 2011" paragraph moved here from under the carousel. |
| 6 | "One of the highest rated..." + case studies | Word-fill headline (their claim) → **looping case slider** (8 cases) → "All case studies →". | Must loop both ways with no empty side; Hooper look (active inset, neighbours taller, near-square corners, square chips, round arrows over neighbours). Texts approved. |
| 7 | We're hiring! | **Full-width forest strip** with faint contour lines, heading + one line, "See Careers" pill + round white arrow → `/join-our-team`. No photo. | Like Hooper's "Ready to transform your space?" strip, at Justin's request. |
| 8 | **The team** | 10 circles (their headshots) with name + card title; 5 per row desktop, 3 on phones. **Click sequence** (`TeamSection`): the circle presses to 0.92 and pops back on release → other heads fade out → the clicked head slides to the left edge → the details (name, title, full bio) slide out from behind the circle to the right. **Clicking anywhere on the details** (or Esc, or its × button) runs it in reverse. Hover: red ring. | Justin's spec, implemented step by step. Timings are in the component's header comment. Khyss/Juliana headshots are still the old ones until Justin sends retouched files. |
| 9 | **FAQ** | White section. Left: "Frequently asked questions", one line, "All questions →" (`/faq`, page not built). Right: **six of their FAQs** in native `<details name="faq">` (one open at a time); the "+" turns into a red "×". Smooth open via `::details-content` where supported. | Justin: a visible FAQ, but compact, nothing like their 31-question dump; the chat covers the rest. Answers verbatim (one en dash → comma). |
| 10 | "We're here to help!" card | Their heading + their line "Discover how our personalized approach to landscaping can benefit your property." Red gradient card straddling page/footer, gentle bob. **"Ask us" button (opens chat) + "Book now →" text link.** | Justin: use their text (over "Not sure where to start?"). Also stands in for their hidden "Book Project Consultation Now" block. |
| 11 | Footer | "Explore" links (2 columns on phones), Head office, Call us, Email our team, Connect with us, Bates Difference line, Track My Project ↗, Sitemap, **NALP 2024 Awards of Excellence badge** on a white chip, legal row. | Rebuilt for small screens earlier. Badge added at Justin's OK. No hours column (they publish none). |
| Global | Chat FAB (bottom-right) | Red button, "1" badge + bubble after 3s, bubble hides after 8s, never auto-opens. Quick-reply chips with canned FAQ answers + "Book now →" to `/book-now?service=<key>`. | Behaviour proposed and accepted. |
| Global | **Consent Preferences** (bottom-left) | Round forest button with a cookie icon → native `<dialog>` "Consent preferences": Necessary (always active), Functional, Analytics, Performance, Advertisement (switches, expandable descriptions in their CookieYes wording) → "Save my preferences" (text link), "Reject all", "Accept all". Stored in `localStorage` key `bates-consent`. | Justin: add their bottom-left Consent Preferences, in our look. The demo sets no tracking cookies. Reject and Accept get equal weight on purpose. |

Chat quick-reply keys (use these on the booking page): `drainage`, `bamboo`, `hardscaping` (label "Patio / garden"),
`maintenance`, `snow`, `other`.

---

## 7.1 Traps when adding pages (read before creating a route)

These are all real and will bite:

1. **Base path `/bates`.** Every route is under `/bates`. Page links **must** use `next/link` (`Link`) or `SmartLink`
   (in `client.tsx`; internal → `Link`, `http...` → new tab), which add `/bates` automatically. A plain
   `<a href="/about-us">` points at `justin94.space/about-us` and breaks. **Images, video, posters and any `/public` file
   need `asset("/img/...")`** from `lib/base.ts` (Next does not prefix `next/image` `src` with the base path).
   `#anchors`, `tel:` and `mailto:` are fine as plain `<a>`.
2. **Header, ChatFab, ConsentPreferences and the footer live in `app/page.tsx`, not in the layout.** A new page gets
   none of them. Move them (plus the floating card and `Contours`) into `app/layout.tsx` or shared components before
   building the second page.
3. **Header colour: `<Header overHero />` vs `<Header />`.** The homepage passes `overHero` and has
   `<div id="top-probe">` at the top of its dark hero; the header is transparent/white while the probe is visible.
   Without `overHero` the header is solid (paper, dark text) from the start, which is right for light pages. A page
   with its own dark hero passes `overHero` and includes the probe div. (If the header moves into the layout, this
   needs a per-page signal, e.g. a route check or reading the probe on mount.)
4. **`#work`** is the gallery section's id (hero "See our work" jumps there).
5. **Motion code must stay in client components** (`"use client"`). GSAP is only used by `WordFill`. Register plugins
   inside effects, revert with `gsap.matchMedia()` cleanup, gate on `prefers-reduced-motion: no-preference`.
6. **Never use `window.addEventListener("scroll")`** for effects. Use IntersectionObserver, ScrollTrigger or CSS.
7. **Unbuilt internal links 404.** Justin asked to remove the "not part of this demo yet" toast since the pages come
   next. Links already on the homepage that need pages: `/about-us`, `/all-services`, the 8 service paths (§5),
   `/commercial-landscaping-services`, `/residential-landscaping-services`, `/project-gallery`, `/case-studies`,
   `/join-our-team`, `/book-now`, `/request-a-quote`, `/faq`, `/west-chester`, `/phoenixville`, `/sitemap`,
   `/terms-and-conditions`, `/privacy-policy`.
8. **React lint rule `react-hooks/set-state-in-effect`** is on (Next 16 config). Don't call `setState` directly in an
   effect body; derive initial state instead (that's why `Header` takes an `overHero` prop).

---

## 8. How to verify here (hard-won; read before your first screenshot)

Justin's rule: nothing user-facing is "done" without a screenshot at desktop and ~390px phone width, sent via
`SendUserFile`. In this setup that's harder than it sounds. (All local URLs are under `/bates`.)

1. **His Chrome window is maximized**, so `resize_window` is ignored (`innerWidth` stays ~1745-1920). Verify with
   `javascript_tool` → `innerWidth`. Two ways around it:
   - **Same-origin iframe:** on the localhost tab run
     `document.open(); document.write('<body style="margin:0;background:#555"><iframe id=m src="/" style="width:390px;height:844px;border:0;display:block;margin:0 auto"></iframe></body>'); document.close();`
     run it on `http://localhost:3012/bates` with the iframe `src="/bates/"`, then inspect with `document.getElementById('m').contentWindow` (its `innerWidth` is a true 390 and media queries
     apply). Good for clicking and reading at phone width.
   - **`tools/shots.mjs`** (headless Chrome over CDP): `node tools/shots.mjs <outDir> [/path]` (path under `/bates`, e.g. `/about-us`) writes
     `desktop-NN.jpg` (1440x900) and `mobile-NN.jpg` (390x844 @2x) down the whole page and prints
     `innerWidth` vs `scrollWidth` (equal = no horizontal overflow). **Use these as the proof images.** Stitch them into
     one strip with Pillow if useful. Put output in your scratchpad, not the repo.
2. **His Chrome window is usually behind other windows, so `document.hidden === true`.** In a hidden tab: smooth scrolling
   doesn't run, IntersectionObserver callbacks and lazy images stall, and screenshots come out stale or torn (a blank band
   above a header that's really at `top: 0`). Check `document.hidden` first when something looks broken. It fooled me into
   chasing a phantom layout bug and a phantom carousel bug.
3. **Coordinate clicks from the Chrome tool can land offset** in that window. For reliable interaction tests, click via
   `javascript_tool` (`el.click()`), then read state back (URL hash, `scrollLeft`, `aria-live` text, dialog text).
   Remember React ignores clicks on elements whose `disabled` prop is true, even if you flip the DOM attribute.
4. **Close tabs you opened** (`tabs_close_mcp`) before finishing, except one he asked to keep.
5. For interaction tests the most reliable tool was **a headless CDP script** (same pattern as `tools/shots.mjs`) that
   uses `Input.dispatchMouseEvent` for real press, release and hover, reads state back (`aria-expanded`, element widths,
   `localStorage`) and screenshots each step. That's how the team sequence, services hover, FAQ and consent were checked.
6. Tailwind v4's `scale-*` utilities set the CSS **`scale`** property, not `transform`; check `getComputedStyle(el).scale`.

What was verified in round 3: links carry `/bates` and Trainual opens in a new tab; hovering a service widens it to
527px vs 163px for the rest; team press = scale 0.92, the right person opens, a click on the details closes it (desktop
and 390px); the FAQ keeps one answer open; consent saves to `localStorage` and closes; no horizontal overflow at 390.
Verified in earlier rounds: hero, nav centring (953px vs true centre 952.5px at 1920 incl. scrollbar), marquee moves
on its own (~53px/s), carousel loops (Previous from card 1 → 8; three Nexts → 3; fast clicks stack), chat chip answers +
"Book now" with `?service=drainage`, "See our work" jumps to `#work`, mobile menu opens/expands/locks scroll, no horizontal
overflow at 1440 or 390.

---

## 9. Specs for what comes next

### 9.1 Booking (`/book-now`)
- **Decided: no Calendly.** Our own calendar and form. Made-up availability (e.g. weekdays, 30-min slots). On submit, the
  booking is **emailed**. Why not Calendly (don't reopen it): the embed can't be restyled on free plans; driving a hidden
  Calendly iframe from our UI is impossible (cross-origin); the official Scheduling API needs a paid plan + the account's
  token; scraping it is against their terms. All already explained to Justin.
- **Recipient for now: `justin.masiga.94@gmail.com`.** Switch to Bates's address only when Justin says (otherwise every
  test lands in their real inbox).
- Sending: server route/Worker → **Brevo** `POST https://api.brevo.com/v3/smtp/email`, same pattern as
  `D:\AIO Freelance\Freelance\Pitch\Aqua\lib\mail.ts`. Brevo only verifies the *sender*, so it can deliver to any
  recipient. Existing key + verified sender: Credentials README row **"Aqua (pitch)"** (`BREVO_API_KEY`, `MAIL_FROM`).
  **Decided: reuse Aqua's sender**, and the email should say it's from Aqua (sender name / subject that mentions Aqua),
  because that's the verified sender. Brevo free = 300/day.
- Proposed steps: what's going on / service → date & time → details + optional 3-5 property photos (fixes their "email us
  photos" step, which never shows an address).
- Pre-select from the query string: `/book-now?service=drainage|bamboo|hardscaping|maintenance|snow|other`.
- Forms: label above input, error text below, no placeholder-as-label, WCAG AA contrast (DESIGN.md).

### 9.2 Chatbot backend
- **Cloudflare Worker + Workers AI** (decided direction; not Ollama: always on, no PC or tunnel). Model e.g.
  `@cf/meta/llama-3.1-8b-instruct-fp8-fast`. Put all 55 FAQs + key business facts in the system prompt (no vector DB).
- Rules: answer only from Bates info; never invent prices, schedules or availability; fall back to phone and booking.
  Snow = commercial/HOA only.
- Free tier: 10,000 neurons/day (~300 replies with the full FAQ in each prompt); free plan hard-stops at the cap until
  00:00 UTC. Fine for a demo. (CF docs checked 2026-09-25.)
- The existing `ChatFab` UI keeps its quick-reply chips; add a text input when the backend exists. Keep the badge/bubble
  behaviour as built.

### 9.3 Other pages (content that exists for each)
| Page | Source content |
|---|---|
| About Us | `recon/home-copy.md` (WE ARE block), `recon/team.json` + headshots (reuse `TEAM` / `TeamSection`), `HISTORY`, history facts in §5 |
| Commercial / Residential landing | `recon/services/commercial-landscaping-services.md`, `recon/services/residential-landscaping-services.md`; relevant case studies by tag |
| Service pages (8 paths, §5) | **`recon/services/<slug>.md`** (verbatim, captured). Snow photos in `recon/services/img/`. |
| Project Gallery | `recon/portfolio/` (20 of 24) + manifest captions (12 of 20 have no real title; write short descriptions) |
| Case Studies | `recon/case-studies.json` (16, table in §6) |
| FAQ (`/faq`) | `recon/faq.md` (55: homepage 31, residential 9, commercial 15). **Must be compact** (Justin disliked their long list): grouped or tabbed, native `<details>`. |
| Careers / Join Our Team | 8 open roles, benefits, English + Spanish applications (**not captured**; fetch once and save to `recon/`). |
| Book Now | §9.1 |
| West Chester / Phoenixville | Not captured |
| Privacy Policy | Doesn't exist on their site (their link goes to SMS terms). Needs writing or a placeholder; ask Justin. |

---

## 10. Open questions (ask Justin; don't guess)

Answered on 2026-09-25 (don't re-ask): scale is fine; my gallery captions are fine; the help card uses their text; a
visible compact FAQ; reuse Aqua's Brevo sender (email says Aqua); logo SVG made; toast removed; off-site links in new
tabs; deploy at justin94.space/bates with subpages under it; "what I found" sheet made; NALP badge added; services built.

Still open:
1. Khyss and Juliana retouched headshots (Justin is doing them; swap into `site/public/img/team/` as 480px WebP squares).
2. Which page to build first, and whether to run the design skills for each new page.
3. Privacy policy content (their site has none).
4. Their 5 service cards link to the **commercial** service pages (as on their site). Should the homepage panels also
   offer the residential versions?
5. Testimonials: Bates has none, so none (never fabricate). Ask whether they have Google reviews to link.

---

## 11. Upstream issues on their current site

Delivered to Justin as **`deliverables/Bates-site-notes.pdf`** (2 pages, Bates-branded, source `site-notes.html`,
printed with headless Chrome `Page.printToPDF`). Every item was checked live on 2026-09-25:

1. Homepage service cards have mixed-up descriptions.
2. Book Now asks for photos "to the provided email address" but shows none.
3. "Privacy Policy" link goes to `/sms-terms-condition/`.
4. Two phone numbers: site (484) 887-8678 vs trucks (484) 443-8772 (we use the truck's, per Justin).
5. Email is `.net` while the site is `.co`, and it only appears on two inner pages.
6. "Highest rated" claim, no reviews or testimonials anywhere (only "preview" matches in their code).
7. 31 FAQs stacked on the homepage; one answer is "Too many to list here!"; the scheduling answer only covers hardscaping.
8. Overlapping pages: Book Now = Request a Quote (same calendar); two gallery URLs; Home link `?page_id=19`.
9. "WE ARE: Bates Landscaping" twice; hidden "Book Project Consultation Now" block (`display:none` on desktop).
10. Case studies share titles (4x "Bamboo Removal", 2x "Custom Pondless Water Feature").
11. 12 of 20 sampled gallery photos titled with file names ("4-2", "123", "untitled-design-76").
12. Bamboo missing from the Residential menu though 3 of 4 bamboo case studies are homeowners.

Checked and **dropped** as untrue: "public login form in the header" (the form is in their code but hidden) and "slow
site" (main content in ~1.7s desktop / 0.7s phone, 2 MB, ~80 requests).

---

## 12. Suggested first moves for the next session

1. Read this file, `DESIGN.md`, `PRODUCT.md`, then skim `NOTES.md`.
2. `git switch main && git pull`, then `git switch -c claude/<page-topic>`.
3. Start the server (§3) and look at `http://localhost:3012/bates` and the live https://justin94.space/bates in Chrome.
4. Ask Justin, in chat, which page he wants first (§10.2). Wait for the answer.
5. Before the second page exists, do the shared-layout move (§7.1 item 2). Keep every link on `Link`/`SmartLink` and every
   asset on `asset()` (§7.1 item 1).
6. Build the page, verify per §8, then ship per §1 (PR + merge = production deploy), and check it live on
   justin94.space/bates/<page>.
