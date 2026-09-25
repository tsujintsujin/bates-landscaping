# HANDOFF: Bates Landscaping remodel

Written 2026-09-25 at the end of the homepage sessions. **Final state (Justin, 2026-09-25): the demo is the homepage
only, live at https://justin94.space/bates. No other pages will be built.** Every link to another page of the site shows
a short "not part of the demo" / "Booking isn't available in this demo" notice instead of navigating (`DemoNotice` in
`components/client.tsx`), and any other address under `/bates` renders a "This page isn't part of the demo" page
(`app/[...slug]/page.tsx`) instead of a 404. §8 (building other pages) is kept only as reference in case that changes. Read this top to bottom
before touching code; §8 (building the other pages) and §9 (traps) are the parts most likely to save you a rebuild.

Read in this order:
1. **This file.** Status, how Justin works, what's built and why, how to build the next pages, every trap.
2. **`DESIGN.md`**: the design system as built (tokens, type scale, radii, components, do's and don'ts). It is the
   authority on look and motion; the `impeccable` design skill reads it automatically.
3. **`PRODUCT.md`**: product truth (who, why, constraints, what content exists, what must never be invented).
4. **`NOTES.md`**: the running decision log with the reasoning and history. **Append to it** every time Justin decides
   something. He discusses piecemeal, jumps between topics, and expects every point noted.
5. `recon/`: everything captured from their live site (§6). Don't re-crawl what's already there.

---

## 0. Status at a glance

| Area | State |
|---|---|
| Homepage (`site/app/page.tsx`) | **Done.** Built with `/frontendskills`, then six review rounds from Justin, every point applied and checked at desktop and phone widths down to 320px. |
| Live | **https://justin94.space/bates** (Portfolio proxies `/bates/*` to the Vercel app, §3). Merges to `main` deploy automatically. |
| Design system | Settled; documented in `DESIGN.md`. Reuse it on every page. |
| Other pages | **Not being built** (Justin's final decision). Internal links show a demo notice; every other `/bates/...` address shows a "not part of the demo" page. Checked: 58 internal links clicked, none navigates; all 24 linked addresses (and made-up deeper ones) return 200. |
| Shared shell | Header, footer, chat and consent still live inside `page.tsx`. **Move them to the layout first** (§8.1). |
| Chat | UI built, canned answers from their FAQs. **No AI backend yet** (§10.2). |
| Booking | Not built (§10.1). `/book-now?service=<key>` is already linked from the chat. |
| Consent Preferences | Built (bottom-left button + dialog, choice kept in `localStorage`). |
| Git | Private repo `tsujintsujin/bates-landscaping`, `main` default. PRs #1-#6 merged. |
| Open questions | **None blocking.** All answered by Justin (§11). |
| Interview sheet | `deliverables/Bates-site-notes.pdf`: 12 verified issues on their current site (§12). |
| Dark mode | Not built, not requested. Light page with dark bands. |

---

## 1. How Justin works (read first; it matters more than the spec)

These come from friction in the sessions so far. Getting them wrong costs his trust fast.

1. **"Discuss" / "check with me" / "thoughts?" / "or do you have other suggestion?" means answer in chat first.** When
   he asks a question, answer it; when he gives an instruction, do it. Building when he asked to talk angered him most.
2. **Don't invoke skills he didn't name.** Never run `/site-rebuild` (its flow contradicts his decisions). The design
   skills (`impeccable`, `emil-design-eng`, `design-taste-frontend`, or all three via `/frontendskills`) are what he
   wants for design work. For a new page, **offer** them; run them when he says. If you run them, don't skip their
   comp/review steps and then claim you used them (§1.5).
3. **When he names a reference site, open it in Chrome and study it before giving opinions.** Measure font sizes, card
   sizes and borders with `javascript_tool`; don't eyeball. Take a reference's **structure and motion**, never its look.
4. **Recommend, don't survey.** One recommendation with a short why. When he pushes back ("isn't that what they already
   have?", "why is Justin 4th?"), check whether he's right and say so plainly if he is.
5. **Own your calls.** Don't blame rules or tools. When he asked "is this using design skills? why is everything so
   big?", the honest answer (skills loaded but their comp and review steps skipped; Hooper's big-type numbers copied)
   was the right one.
6. **He edits media himself** (OpenCut for video, image retouching). Don't regenerate assets he said are his (the hero
   video; the team headshots, including Khyss and Juliana's, which he already retouched).
7. **Plain language.** Short tables and bullets. No jargon.
8. **He reviews visually, fast, and on small phones.** He sends numbered lists of fixes, often mid-task, with
   screenshots. He views pages through a Chrome **mobile-simulator extension** (a phone frame) and at Windows display
   scaling. Apply every point, check each at desktop **and** phone widths (390 and 320), and report per number.
9. **Taste record** (what he approved or rejected; follow it on new pages):
   - Smaller over bigger. Early versions were "too big"; the current scale is confirmed fine.
   - **One button + one text link** with an arrow, never two buttons side by side. Buttons for primary actions have no
     arrow; "Book now" is the label for booking everywhere.
   - Motion he likes: Hooper-style word-fill headlines, an endless marquee that **never pauses**, a looping slider, the
     team click sequence, gentle bob. Motion he dislikes: smooth-scroll libraries, anything laggy or scroll-jacking.
   - Hand-drawn doodles looked bad: rejected. Prefer clean structural cues (e.g. the vertical timeline on phones).
   - Content must be **real and ordered sensibly** (he caught the founder listed 4th). Order people by role.
   - On phones: centre what's centred, cover the page fully with overlays (menu), no stray lines or strips.
   - Their own wording where it exists ("We're here to help!"), shortened only where needed.

Global rules from his `CLAUDE.md` (auto-loaded, summarised):
- **Git:** never edit on `main`. `git switch -c claude/<topic>` first. When a task is fully done: gates green → audit
  staged files for secrets → commit → push → `gh pr create` → `gh pr merge --merge --delete-branch` → watch the Vercel
  production deploy → check the live page. Do it yourself; don't ask "should I commit?". One task, one PR.
- **Browser testing = Claude in Chrome (`mcp__claude-in-chrome__*`).** The built-in Browser pane is only for
  `preview_start` to launch the dev server. No screenshot = "built, not checked". §7 explains how to get valid
  screenshots in this setup (it isn't straightforward).
- **Run commands yourself**; never hand him commands to paste (UAC elevation is the only exception).
- **Credentials** live in `D:\AIO Freelance\Credentials\` (index `README.md`). Never copy a secret value into the repo,
  a log, a doc or chat.

---

## 2. Purpose

- **A demo for a job application.** Justin Masiga (the builder) is applying to work at Bates Landscaping and uses this
  remodel to get a foot in the door. Not a sold client build. **Zero cost** (free tiers only).
- It must make two points in an interview: *"I understand your business"* and *"I can build what you need."* Real Bates
  content and brand, clearly better than the current site, plus working features it lacks (chatbot, booking email).
- **Modern remodel, NOT the same layout and look** as their current site.
- The footer says "Concept remodel, not the official site." and every page is `noindex` (set in the root layout). Keep both.

---

## 3. Repo, running, deploying, checks

### Where things are
- Local: `D:\AIO Freelance\Freelance\Pitch\Bates\` (git root). App in `site/`. Recon in `recon/`. Tools in `tools/`.
- GitHub: **https://github.com/tsujintsujin/bates-landscaping** (private), default branch `main`.
- `.claude/skills` and `.claude/commands` in the Bates folder are **Windows junctions** to `D:\AIO Freelance\.claude\`
  so the workspace skills load when Bates is the git root. Gitignored. Don't delete or commit them. If a fresh clone
  lacks them: `cmd /c mklink /J .claude\skills "D:\AIO Freelance\.claude\skills"` (same for `commands`).

### Running locally
- Dev server on **port 3012**: `.claude/launch.json` config `"bates"` (`npm --prefix site run dev -- -p 3012`).
  Start with `mcp__Claude_Browser__preview_start {name: "bates"}`, then open **`http://localhost:3012/bates`** in real
  Chrome. The app lives under the `/bates` base path, so `http://localhost:3012/` is a 404.
- Changing `site/next.config.ts` needs a restart (`preview_stop` then `preview_start`).
- If `preview_start` says 3012 is held by another chat's server, check it responds (`curl http://localhost:3012/bates`);
  one died silently before. First request after start compiles for 30-60s; wait for a 200 before opening Chrome.
- Port 3000 may be taken by Justin's local OpenCut. Don't use it.
- The Next.js dev "N" badge is off (`devIndicators: false`); it covered the Consent button.

### Deploy (live)
- **Vercel project `bates-landscaping`** (team `tsujintsujins-projects`), connected to the GitHub repo, **Root Directory
  `site`**, framework Next.js, production branch `main`. Merge to `main` = production deploy (~1 min). Branch pushes get
  protected preview deployments.
- Production app: **https://bates-landscaping.vercel.app/bates** (public). Per-deployment URLs sit behind Vercel's login
  (deployment protection "all except custom domains"); that's expected.
- **justin94.space/bates** is served by the **Portfolio** project (`D:\AIO Freelance\Portfolio`, repo
  `tsujintsujin/portfolio`, branch `master`): its `next.config.ts` `rewrites()` maps `/bates` and `/bates/:path*` to the
  Vercel app. **New pages need no Portfolio change.** Its catch-all CSP (`default-src 'self'`, `img-src 'self' data:`)
  covers this app because everything loads same-origin through the proxy. If a page ever needs an external script,
  image host, iframe (e.g. a map) or API from the browser, add a `/bates/:path*` headers block in the Portfolio config,
  like the existing `/surge` and `/aqua` blocks.
- `basePath` is `"/bates"` (from `site/lib/base.ts`). See §9 item 1.
- Checking a deploy: the Vercel CLI is logged in as `tsujintsujin`; its token is in
  `%APPDATA%\xdg.data\com.vercel.cli\auth.json` (read it into a shell variable only; never print or copy it).
  `GET https://api.vercel.com/v6/deployments?projectId=prj_lXTCBO4GPosCCzVm6GSrwenjdy7s&teamId=team_36a0KyuushhQDJkVDAtq4tnz&target=production&limit=1`
  shows the latest production deploy's state and commit.
- `vercel link` left `.vercel/project.json` and a `.env.local` (short-lived OIDC token) at the repo root. Both gitignored.

### Stack
- Next.js **16.3.6** (App Router), React 19.2.8, TypeScript, Tailwind CSS **v4** (tokens in `@theme` in
  `site/app/globals.css`), GSAP 3.15 (ScrollTrigger only, used by `WordFill`), `@phosphor-icons/react` 2.1, Node 24.
- **Next 16 is newer than your training data.** Read `site/node_modules/next/dist/docs/` before writing Next-specific
  code (`site/AGENTS.md` says so). `next dev` rewrites `site/AGENTS.md` / `site/CLAUDE.md`; commit whatever it writes.
- Fonts via `next/font/google` in `site/app/layout.tsx`: `Bricolage_Grotesque` (opsz, wdth) → `--font-bricolage`;
  `Asap` → `--font-asap`.

### Gates (all pass on `main`)
```
cd site
npx tsc --noEmit
npx eslint app components lib
npx next build
node "D:/AIO Freelance/.claude/skills/impeccable/scripts/detect.mjs" --json <changed .tsx/.css files>
```
The last is the impeccable design detector; it returns `[]` on the homepage. RTK rewrites shell commands and
summarises output; prefix `rtk proxy` to see full output (e.g. `rtk proxy npx eslint app components lib`).

---

## 4. File map

```
Bates/
  HANDOFF.md  DESIGN.md  PRODUCT.md  NOTES.md  CLAUDE.md
  .claude/launch.json     dev server config "bates", port 3012
  tools/shots.mjs         headless Chrome screenshots at 1440 and 390 (§7)
  deliverables/           Bates-site-notes.pdf + site-notes.html (the interview sheet)
  recon/                  captured live-site content (§6)
  site/
    next.config.ts        basePath "/bates" (from lib/base.ts), devIndicators off
    app/layout.tsx        fonts, metadata (title, description, robots noindex)
    app/icon.svg          favicon = traced Bates "B" mark
    app/page.tsx          the homepage (server component), incl. footer and help card; also defines AwardRibbon,
                          Contours and the class-string constants pill / textLink / arrowNudge / label / h2 / wrap
    app/globals.css       Tailwind @theme tokens; .press .rise .floating; marquee keyframes; .svc* services panels;
                          .faq open animation; .menu-hide rule
    components/client.tsx client components: SmartLink, Header, HeroVideo, WordFill, GalleryMarquee, CaseCarousel,
                          ChatFab, OpenChatButton, TeamSection, ConsentPreferences
    components/icons.tsx  Phosphor re-exports under local names (Arrow, ArrowLeft, ArrowUpRight, Phone, Mail, Menu,
                          Close, Chevron, Chat, Cookie, Plus, FacebookLogo, InstagramLogo, LinkedinLogo)
    lib/base.ts           BASE = "/bates" and asset() for /public paths
    lib/content.ts        PHONE, PHONE_HREF, EMAIL, ADDRESS, SOCIALS, NAV, GALLERY, CASES, SERVICES, HISTORY, TEAM, FAQS, CHIPS
    public/img/           g-* gallery, c-* case studies, s-snow, crew, team/*.webp (480px squares), logo.svg (traced)
    public/media/         hero.webm, hero.mp4, hero-poster.webp
```

Image conversion: Python + Pillow to WebP. ffmpeg is installed (winget, user scope) for video. `vtracer` (pip) traced
the logo (red and grey layers separately from the 1044x275 original, recoloured to exact #ED1C24 / #585858).

---

## 5. The business (verified facts only)

| | |
|---|---|
| Name | Bates Landscaping (Bates Landscaping Ltd on LinkedIn) |
| Tagline | "The best Landscape company to work WITH and FOR" |
| Claim | "One of the highest rated companies to work with and for in Southeastern PA" |
| History | Justin Bates learned the trade from his father in 2002; company started 2009 (mother's garage); incorporated 2011; West Chester office 2017; drainage team 2018; Phoenixville location 2022 |
| Awards | **NALP (National Association of Landscape Professionals) Awards of Excellence: 2024 and 2025 recipient.** Their homepage shows both above the hero (`recon/brand/nalp-2024-2025.png`); their footer shows the 2024 badge (`recon/brand/aoe2024winner.png`). Ours shows both years as drawn ribbons in the hero **and the footer**. |
| Address | 705 St Marys St, Phoenixville, PA 19460. Also West Chester and Phoenixville location pages. |
| Phone | **(484) 443-8772** (the number on their trucks; **decided by Justin** over the site's (484) 887-8678). `PHONE` / `PHONE_HREF`. |
| Email | `info@bateslandscaping.net` (.net, while the site is .co; the only address anywhere) |
| Hours | **Not published. Don't invent them.** |
| Service area | Chester, Delaware and Montgomery Counties, PA (snow also covers the Philadelphia Airport area). Towns include Chester Springs, Kennett Square, Paoli, Media, Phoenixville, Downingtown, Bryn Mawr, Wayne, West Chester, Malvern, King of Prussia, plus ~20 more on `/all-services/` (**not captured**) |
| Socials | facebook.com/BatesLandscapingPa, instagram.com/bateslandscapingltd, linkedin.com/company/bates-landscaping-ltd |
| Clients | Homeowners, property managers, HOAs, apartment communities, engineers, senior living, offices, churches and cemeteries |
| Services | Installation & design; maintenance (residential = "Estate Maintenance"); hardscaping; drainage/stormwater; bamboo remediation; snow + ice (**commercial/HOA only**, never homeowners) |
| Not offered (FAQ) | Concrete, firewood, mulch delivery, tree work over ~15 ft |
| Booking today | Calendly embed on `/book-now/`: choose service, 30-min intake call, email 3-5 property photos |
| Careers | 8 open roles, benefits, English + Spanish applications (employee and subcontractor), Trainual staff login |
| Client portal | "Track My Project" → https://portal.golmn.com/ (external) |

### Their real page URLs (live menu, checked 2026-09-25). Build our pages at the same paths (under `/bates`).
| Page | Path |
|---|---|
| About Us | `/about-us/` (its submenu "The Bates Difference..." → `/design/`) |
| All services | `/all-services/` |
| Commercial landing | `/commercial-landscaping-services/` |
| Commercial: Installation & Design / Maintenance / Drainage / Bamboo / Snow + Ice | `/commercial-landscaping-installation-design/`, `/commercial-maintenance/`, `/commercial-drainage/`, `/bamboo-remediation/`, `/snow-ice-removal-west-chester/` |
| Residential landing | `/residential-landscaping-services/` |
| Residential: Installation & Design / Estate Maintenance / Drainage | `/design/`, `/maintain/`, `/drainage-solutions/` |
| Project Gallery | `/project-gallery/` (their duplicate `/project-gallery-tabs/` needn't be built) |
| Case Studies | `/case-studies/`; each case study at **`/portfolio-posts/<slug>/`** (slugs in §6) |
| Careers | `/career-center/`, `/join-our-team/`; Trainual login is external |
| Book Now / Request a Quote | `/book-now`, `/request-a-quote/` (the same thing on their site) |
| Locations | `/west-chester/`, `/phoenixville/` |
| Legal | `/terms-and-conditions/`, `/sms-terms-condition/`, `/sitemap/`; our footer links `/privacy-policy`, which **doesn't exist on their site** (their "Privacy Policy" link opens the SMS terms) |

Their Residential menu has no Bamboo entry; ours lists Bamboo under both (same page). `/design/` doubles as "The Bates
Difference" and Residential Installation & Design.

---

## 6. What's on disk (`recon/`)

| Path | Contents |
|---|---|
| `recon/hero-video.webm` | Hero footage **trimmed by Justin in OpenCut** (21.5s, 1920x1080, 25 MB). Web copies in `site/public/media/` are re-encoded (~4 MB) **and cropped** (`crop=iw*0.89:ih*0.85:0:0`) to remove a burned-in logo. Use no other video. |
| `recon/home-copy.md` | Their homepage copy, verbatim, in page order (their HTML repeats headings; that's their markup). |
| `recon/faq.md` | **55 FAQs verbatim**: homepage 31, residential 9, commercial 15. |
| `recon/services/<slug>.md` | **Their service and landing pages' text, verbatim**: the 8 service paths + Commercial and Residential landing pages (10 files). `recon/services/img/` has 6 of their snow + ice photos. |
| `recon/case-studies.json` + `recon/case-studies/` | **16 case studies** (keys `url, title, text, images, local`; `text` is sometimes a list, join it). Up to 3 images each. ⚠ Some images belong to the "similar projects" sidebar, not the job; check visually before pairing. |
| `recon/portfolio/` + `manifest.json` | 20 of the 24 photos on `/project-gallery/`. Manifest: file → source URL → `caption` (their title, or `null`; 12 of 20 are null). |
| `recon/team.json` + `recon/team/` | 10 team members: name, position, full bio, headshot (originals). |
| `recon/brand/` | Logo originals (`bates-logo-original.png` 1044x275 is the largest that exists; `bates-mark-original.png` 512); **traced SVGs `bates-logo.svg`, `bates-mark.svg`**; NALP badges `aoe2024winner.png`, `nalp-2024-2025.png`. |

### The 16 case studies (all distinct jobs; several share a title)
| # | Slug (`/portfolio-posts/<slug>/`) | County | Price range |
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

The homepage slider uses 8 of them (`CASES` in `lib/content.ts`), the ones whose photo clearly shows that job. Titles
drop the " - Bates Landscaping" suffix; prices use a plain hyphen.

### Team (`TEAM` in `lib/content.ts`, in this order)
Justin (Partner + General Manager est 2009, the founder), Dylan (Partner + VP of Operations est 2013), Megan (Area
Manager est 2015), Molly (Production Manager est 2024), Cailee (Office Manager), Melissa (Business Developer est 2014),
Khyss (Human Resources Administrator est 2024), Enrique (Supervisor est 2011, first employee), Angel (Shop Supervisor est
2018), Juliana (Sales Assistant est 2025). **Ordered by role** (Justin asked why the founder was 4th; their own page's
order was used before). Bios verbatim.
- Megan's card says "Area Manager est 2015"; her page bio says Account Manager. Card used as-is.
- All ten headshots are final. **Khyss and Juliana's are already Justin's retouched versions** (earlier notes said they
  were pending; that was wrong). Don't generate or swap headshots.
- About-page videos "Meet Ramon" and "Meet Nerly Garcia" feature people not on the team list. Their other videos
  (Hardscaping 76 MB, SpringCleanUp 56 MB, BambooRemoval 187 MB, Meet_Angel 91 MB, Meet_Ramon 124 MB,
  Meet_Nerly_Garcia 134 MB) are under `bateslandscaping.co/wp-content/uploads/2023/03/` or `/2024/04/`, not downloaded.
  Their homepage video was **ruled out by Justin**.

Heavy originals (always convert to WebP into `site/public/img/` first): `portfolio/16-untitled-design-76.png` (6.8 MB),
`case-studies/06-0` / `07-0` `daiva-k.png` (7.6 MB each), `portfolio/19-123.jpeg`, `team/01-megan.jpg` (2+ MB).

---

## 7. How to verify in this setup (hard-won; read before your first screenshot)

Justin's rule: nothing user-facing is "done" without screenshots at desktop and phone width, sent via `SendUserFile`.

1. **His Chrome window is maximized**, so `resize_window` is ignored (`innerWidth` stays ~1745-1920). Check with
   `javascript_tool` → `innerWidth`. Ways around it:
   - **`tools/shots.mjs`** (headless Chrome over CDP): `node tools/shots.mjs <outDir> [/path]` (path under `/bates`,
     e.g. `/about-us`) writes `desktop-NN.jpg` (1440x900) and `mobile-NN.jpg` (390x844 @2x) down the whole page and
     prints `innerWidth` vs `scrollWidth` (equal = no sideways overflow). **Use these as proof images.** Output to your
     scratchpad, not the repo. For other widths (320, 344, 360) copy the pattern and change the metrics.
   - **Same-origin iframe** for clicking at phone width in his Chrome: on `http://localhost:3012/bates` run
     `document.open(); document.write('<body style="margin:0;background:#555"><iframe id=m src="/bates/" style="width:390px;height:844px;border:0;display:block;margin:0 auto"></iframe></body>'); document.close();`
     then use `document.getElementById('m').contentWindow` (a true 390px viewport; media queries apply).
2. **His Chrome window is usually behind other windows, so `document.hidden === true`.** Then smooth scrolling doesn't
   run, IntersectionObserver callbacks and lazy images stall, timers are throttled (a `setTimeout` inside
   `javascript_tool` can time out the call), and screenshots come out stale or torn (a blank band above a header that's
   really at `top: 0`). Check `document.hidden` first when something looks broken.
3. **Coordinate clicks from the Chrome tool can land offset** in that window. Click via `javascript_tool`
   (`el.click()`) and read state back. React ignores clicks on elements whose `disabled` prop is true even if you flip
   the DOM attribute.
4. **Interaction tests:** the most reliable tool was a headless CDP script (same pattern as `tools/shots.mjs`) using
   `Input.dispatchMouseEvent` for real press, release and hover, reading state back (`aria-expanded`, widths,
   `localStorage`, computed styles) and screenshotting each step.
5. Tailwind v4's `scale-*` / `translate-*` utilities set the CSS **`scale` / `translate`** properties, not `transform`.
   Read `getComputedStyle(el).scale`, and list `translate` (not `transform`) in `transition-[...]`.
6. **Fractional scaling bugs:** Justin runs Windows display scaling; test hairline issues with
   `deviceScaleFactor` 1.25 / 1.5 / 1.75, not only 1 and 2. (The help-card seam hairline only showed there.)
7. **His mobile-simulator extension** injects `style="translate: ..."` on fixed elements (the chat button) before React
   loads, so the dev overlay shows a hydration mismatch. That's the extension, not the code; it doesn't happen live.
8. Close tabs you opened (`tabs_close_mcp`) before finishing, except one he wants kept.
9. After merging, check the **live** page (justin94.space/bates/...) the same way; the proxy adds a CSP (§3).

---

## 8. Building the other pages (the plan)

### 8.0 Superseded: no pages are being built

**Not happening.** Justin later decided the demo stays homepage-only (see the note at the top). The scope below
(written minutes earlier) is kept only as history; the "Unavailable in demo" idea was implemented site-wide instead, as
`DemoNotice`.

#### Former scope (superseded)
1. **The header menus are not built.** Services, Portfolio, About Us and Careers (every dropdown item, the "About Us"
   link, and the same items in the mobile menu, Trainual included) **don't navigate**. Clicking any of them shows a small
   **"Unavailable in demo"** popup in the site's style (toast or small dialog; forest background, white text, closes on
   its own or on click/Esc; respects reduced motion). The earlier `SoonToast` in git history (commit `aa4a9ab`,
   `site/components/client.tsx`) is a starting point. The header's logo (→ home), phone number and "Book now" keep
   working.
2. **Only one layer of pages below the homepage gets built**: the pages that the homepage's **body and footer** link to
   (list below). They are **design-only**: real content and layout, but the links and buttons inside them don't go
   anywhere (show the same "Unavailable in demo" popup rather than a dead click). The exceptions are shared shell
   links: the logo / "Home" back to the homepage, the header "Book now", the phone and email links, the chat and
   consent buttons.
3. **Nothing deeper is built**: no case-study detail pages (`/portfolio-posts/<slug>`), no pages reachable only from
   another subpage, and none of the 12 dropdown destinations unless the homepage body or footer links to them.

Pages to build (one layer; each is where a homepage body or footer link already points):

| Page | Linked from on the homepage |
|---|---|
| `/commercial-landscaping-services` | Commercial card; footer "Commercial" |
| `/residential-landscaping-services` | Residential card; footer "Residential" |
| `/all-services` | "All services →" in Our services |
| `/commercial-landscaping-installation-design`, `/commercial-maintenance`, `/commercial-drainage`, `/bamboo-remediation`, `/snow-ice-removal-west-chester` | The five service panels |
| `/project-gallery` | "View all projects →"; footer "Portfolio" |
| `/about-us` | "About us →" in We are Bates Landscaping; footer "About Us" |
| `/case-studies` | "All case studies →" |
| `/join-our-team` | "See Careers"; footer "Careers" |
| `/faq` | "All questions →" |
| `/book-now` | Hero, help card, header "Book now", chat answers (`?service=`) |
| `/request-a-quote` | Footer "Contact" (same content as Book Now on their site; can reuse it) |
| `/west-chester`, `/phoenixville` | Footer "Also in ..." |
| `/sitemap`, `/terms-and-conditions`, `/privacy-policy` | Footer |

Note the overlap: About Us, the landing pages, gallery and careers exist as pages (reached from the homepage body and
footer), while the header menu items that point at the same places still show the popup. That's what Justin asked for;
if he later wants the header to use the built pages, it's a one-line change per item.

Because pages are design-only, the booking form (§10.1) and chatbot backend (§10.2) are **not** part of this scope
unless Justin asks; `/book-now` is built as a designed page whose submit shows the popup.


### 8.1 First: move the shared shell out of the homepage
Today a new page would render with no header, footer, chat or consent. Do this refactor before (or as part of) the
first new page, in its own commit:

| Move | Where | Notes |
|---|---|---|
| `Header` | render once in `app/layout.tsx` | It needs to know whether the page starts with a dark hero. Recommended: a small client wrapper using `usePathname()`; `overHero` is true for `/` (and any page you give a dark hero). Keep the `#top-probe` div at the top of dark heroes. |
| Footer (the `<footer>` block in page.tsx) | `components/footer.tsx` (server), rendered in the layout | Change the footer "Home" link target only if needed; it already uses `Link href="/"`. |
| "We're here to help!" card | `components/help-card.tsx` | Render it above the footer on most pages (Justin mapped it to "Book Project Consultation Now", which their site puts on every page). Keep `-mb-px` and the phone/desktop background rules. |
| `ChatFab`, `ConsentPreferences` | layout | They must exist once per page. |
| `AwardRibbon`, `Contours`, and the class constants `pill`, `textLink`, `arrowNudge`, `label`, `h2`, `wrap` | `components/ui.tsx` (or `lib/ui.ts` for the strings) | Reuse them instead of re-typing class lists; that's how the pages stay consistent. |

After the move, the homepage must look and behave exactly as before: re-run the checks in §7 on `/` before building on it.

### 8.2 Inner-page anatomy (**confirmed by Justin**)
- **Header:** solid by default (`<Header />`), or transparent over a dark page hero.
- **Page hero:** a compact forest band (not full-screen): the page title in the display face (section-headline size),
  one line of their copy, and one action pair (button + text link). Optionally a photo on the right with the same leaf
  mask as the Commercial/Residential cards. Justin: inner pages **must not copy the homepage's video hero**.
- **Body:** their verbatim copy from `recon/services/<slug>.md` etc., split into short sections with the homepage's
  patterns: split text + photo, a relevant slice of `CaseCarousel` (filter `CASES` by tag), a few relevant `FAQS`
  in the same accordion, the hiring strip where it fits.
- **End:** the help card, then the footer (from the layout).
- **Every page:** `generateMetadata`/`metadata` with a real title and description (robots `noindex` stays from the
  root layout), links via `Link`/`SmartLink`, images via `asset()`, checked at 1440, 390 and 320.

### 8.3 Page by page: content and suggested building blocks
| Page | Content source | Suggested blocks |
|---|---|---|
| About Us (`/about-us`) | WE ARE copy (`recon/home-copy.md`), `HISTORY`, `TEAM`, crew photo | Page hero, WE ARE split, history timeline, `TeamSection`, hiring strip, help card |
| Commercial / Residential landing | `recon/services/commercial-landscaping-services.md`, `.../residential-landscaping-services.md` | Page hero, their intro, the relevant service panels (reuse `.svc` pattern), matching case studies, FAQ slice (their commercial 15 / residential 9) |
| The 5 service pages linked from the homepage panels (§8.0; the 3 residential-only ones, `/design`, `/maintain`, `/drainage-solutions`, are header-menu-only, so not built) | `recon/services/<slug>.md` (+ `recon/services/img/` for snow) | Page hero, copy sections, related case studies, FAQ slice, help card. Each commercial service page mentions its residential version where one exists (Installation & Design ↔ `/design`, Maintenance ↔ `/maintain`, Drainage ↔ `/drainage-solutions`); under §8.0 that link shows the popup. Snow page: "Commercial and HOA properties" chip; never offer snow to homeowners. |
| Project Gallery | `recon/portfolio/` + manifest | Grid of photos with captions under the thin line (gallery card style); write short captions for the 12 untitled ones (Justin approved that approach) |
| Case Studies (`/case-studies`) | `recon/case-studies.json` | List/grid of all 16 with county, type and price chips (the chip style from the slider); filter by Residential / Commercial / service |
| Case study detail (`/portfolio-posts/<slug>`) | same JSON | **Not built** (two layers deep, §8.0). Case cards on `/case-studies` show the popup when clicked. |
| FAQ (`/faq`) | `recon/faq.md` (55) | **Must be compact** (Justin disliked their long list): grouped tabs (General / Residential / Commercial) or a filter, native `<details name=...>` accordion like the homepage, plus "Ask us →" to open the chat |
| Book Now (`/book-now`, `/request-a-quote`) | §10.1 | Designed multi-step form (read `?service=` to preselect); submit shows the popup (design-only, §8.0) |
| Careers (`/join-our-team` only; `/career-center` is header-menu-only) | **not captured**: fetch their page text once, save to `recon/careers.md` | Hiring strip style hero, roles list, benefits, English + Spanish application links |
| West Chester / Phoenixville | **not captured**: fetch once, save to `recon/` | Page hero, local copy, service list, maybe a map (needs a CSP block in Portfolio, §3) |
| Terms / Sitemap (`/terms-and-conditions`, `/sitemap`) | fetch once | Plain readable text pages (SMS terms isn't linked from the homepage, so not built) |
| Privacy Policy | doesn't exist on their site | **Decided:** a short, clearly labelled placeholder ("This is a demo; Bates Landscaping's privacy policy goes here"). Don't write legal text. |

---

## 9. Traps (all real)

1. **Base path `/bates`.** Every route is under `/bates`. Page links must use `next/link` (`Link`) or `SmartLink` (in
   `client.tsx`: internal → `Link`, `http...` → new tab), which add `/bates` automatically. A plain `<a href="/x">`
   breaks on justin94.space. **Images, video, posters and any `/public` file need `asset("/img/...")`** (Next doesn't
   prefix `next/image` `src`). `#anchors`, `tel:` and `mailto:` are fine as plain `<a>`.
2. **The shell lives in `page.tsx`** until §8.1 is done.
3. **Header colour:** `<Header overHero />` (transparent over a dark hero that contains `<div id="top-probe">`) vs
   `<Header />` (solid from the start). When the menu is open the header is forest regardless.
4. **`#work`** is the gallery section id (hero "See our work" jumps there).
5. **Motion stays in client components** (`"use client"`). Register GSAP plugins inside effects, clean up with
   `gsap.matchMedia()` revert, gate on `prefers-reduced-motion: no-preference`. Never `window.addEventListener("scroll")`.
6. **Lint rule `react-hooks/set-state-in-effect`** (Next 16 config): don't call `setState` directly in an effect body;
   derive initial state instead.
7. **Links right now:** homepage body and footer links point at real paths that 404 until each page exists; header menu
   links currently navigate too. Both change under §8.0: header menus → "Unavailable in demo" popup; body/footer
   links → the built pages; links inside those pages → the popup.
8. **Floating buttons and the menu:** anything else fixed to the screen edges should also carry `menu-hide` so the
   open mobile menu covers the page completely.
9. **Section seams at fractional scaling:** a dark section meeting another dark section at a fractional pixel shows a
   light hairline. Overlap by 1px (`-mb-px`) where two same-colour sections meet (as on the help card).
10. **Text rules:** no em or en dashes in visible text (their verbatim FAQ had one; it became a comma).

---

## 10. Specs for features still to build

### 10.1 Booking (`/book-now`)
- **Decided: no Calendly.** Our own calendar and form; made-up availability (e.g. weekdays, 30-min slots). On submit the
  booking is **emailed**. Why not Calendly (don't reopen): the embed can't be restyled on free plans; a hidden Calendly
  iframe can't be driven from our UI (cross-origin); the Scheduling API needs a paid plan and their token; scraping is
  against their terms. Already explained to Justin.
- **Recipient for now: `justin.masiga.94@gmail.com`.** Switch to Bates's address only when Justin says.
- **Sending: reuse the Aqua Brevo sender** (decided). The email must say it comes from Aqua (sender name / subject that
  mentions Aqua), because that's the verified sender. Pattern: server route → `POST https://api.brevo.com/v3/smtp/email`,
  as in `D:\AIO Freelance\Freelance\Pitch\Aqua\lib\mail.ts`. Key + sender: Credentials README row **"Aqua (pitch)"**
  (`BREVO_API_KEY`, `MAIL_FROM`) → add them as Vercel environment variables for this project (never in the repo). Free =
  300 emails/day.
- Steps: what's going on / service → date & time → details + optional 3-5 property photos (fixes their "email us
  photos" step, which never shows an address). Pre-select from `?service=drainage|bamboo|hardscaping|maintenance|snow|other`.
- Forms: label above input, error text below, no placeholder-as-label, WCAG AA contrast.

### 10.2 Chatbot backend
- **Cloudflare Workers AI** (decided direction; not Ollama: always on, no PC or tunnel), e.g.
  `@cf/meta/llama-3.1-8b-instruct-fp8-fast`, called from a server route (the site itself is on Vercel). Put all 55 FAQs
  and the key facts (§5) in the system prompt; no vector DB.
- Rules: answer only from Bates info; never invent prices, schedules or availability; fall back to phone and booking;
  snow is commercial/HOA only.
- Free tier: 10,000 neurons/day (~300 replies with the full FAQ in the prompt); hard stop at the cap until 00:00 UTC.
- Keep `ChatFab`'s look, badge/bubble behaviour and quick-reply chips; add a text input when the backend exists.

---

## 11. Decisions on the former open questions (all answered 2026-09-25; don't re-ask)

| # | Question | Decision |
|---|---|---|
| 1 | Which page first | Justin doesn't mind. Suggested: **About Us** first (mostly reuses built pieces, so it sets the inner-page pattern fast). |
| 2 | Inner-page hero | **Confirmed** the compact forest band (§8.2). Inner pages must not copy the homepage video hero. |
| 3 | Khyss / Juliana photos | Already his retouched versions. Final. |
| 4 | Footer award badge | **Done:** the footer now shows the 2024 and 2025 ribbons (same `AwardRibbon` as the hero, 92px). The old badge image was deleted. |
| 5 | Privacy policy | A short, clearly labelled placeholder page. No invented legal text. |
| 6 | Homepage services link to commercial pages | Keep the homepage as is; each service page links to its residential counterpart and back. |
| 7 | Reviews | None on the site. Justin asks Bates in the interview. Never fabricate. |

Earlier answers (also settled): scale is fine; gallery captions fine; help card uses their text with a "Book now" button +
"Ask us →" link; compact visible FAQ; Aqua Brevo sender with Aqua named in the email; logo SVG; no "demo" toast;
off-site links open in a new tab; deploy at justin94.space/bates with pages under it; interview sheet; NALP ribbons in
the hero; services section; team ordered by role; chat header without a subtitle.

---

## 12. Upstream issues on their current site (the interview sheet)

`deliverables/Bates-site-notes.pdf` (2 pages, Bates-branded; source `site-notes.html`, printed with headless Chrome
`Page.printToPDF`). Every item was checked live on 2026-09-25:

1. Homepage service cards have mixed-up descriptions.
2. Book Now asks for photos "to the provided email address" but shows none.
3. "Privacy Policy" link goes to `/sms-terms-condition/`.
4. Two phone numbers: site (484) 887-8678 vs trucks (484) 443-8772.
5. Email is `.net` while the site is `.co`, and only appears on two inner pages.
6. "Highest rated" claim with no reviews or testimonials anywhere.
7. 31 FAQs stacked on the homepage; one answer is "Too many to list here!"; the scheduling answer only covers hardscaping.
8. Overlapping pages: Book Now = Request a Quote (same calendar); two gallery URLs; Home link `?page_id=19`.
9. "WE ARE: Bates Landscaping" twice; a hidden "Book Project Consultation Now" block (`display:none` on desktop).
10. Case studies share titles (4x "Bamboo Removal", 2x "Custom Pondless Water Feature").
11. 12 of 20 sampled gallery photos titled with file names.
12. Bamboo missing from the Residential menu though 3 of 4 bamboo case studies are homeowners.

Checked and dropped as untrue: "public login form in the header" (it's in their code but hidden) and "slow site"
(~1.7s desktop / 0.7s phone to main content). The sheet predates the discovery that they also won the **2025** award;
if Justin wants it updated, add that to the "works well" box.

---

## 13. First moves for the next session

1. Read this file, `DESIGN.md`, `PRODUCT.md`; skim the end of `NOTES.md`.
2. `git switch main && git pull`, then `git switch -c claude/<topic>`.
3. Start the server (§3); look at `http://localhost:3012/bates` and https://justin94.space/bates in Chrome so you know
   the language you're extending.
4. Read §8.0 (scope). Offer Justin the design skills for the new pages and say which page you'll start with.
   Nothing else needs asking first; the inner-page pattern is confirmed (§8.2).
5. Add the "Unavailable in demo" popup and wire the header menus to it (§8.0 item 1).
6. Do the shell move (§8.1) and re-verify the homepage.
7. Build the pages in §8.0 with the existing tokens, components and rules; verify per §7 at 1440, 390 and 320; ship per §1;
   check it live at justin94.space/bates/<page>; append decisions to `NOTES.md` and update this file and `DESIGN.md`.
