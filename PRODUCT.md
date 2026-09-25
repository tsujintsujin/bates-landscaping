# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js 16 (App Router, TypeScript) + Tailwind CSS v4 + GSAP (ScrollTrigger) in `site/`. Icons: `@phosphor-icons/react`.
Fonts via `next/font/google`: Bricolage Grotesque (display), Asap (body). Deployed on Vercel (project
`bates-landscaping`, root `site/`), served at justin94.space/bates through the Portfolio app's rewrites; `basePath` is
`/bates`. The chatbot can call Cloudflare Workers AI from a server route; booking email goes through Brevo.

## Users

1. **Bates Landscaping's leadership** (Justin Bates, Partner + General Manager; Dylan, Partner + VP of Operations).
   Justin Masiga (the builder) is applying for a job at Bates and uses this remodel to get a foot in the door. The site has
   to show two things in an interview: "I understand your business" and "I can build what you need."
2. **The site's own visitors**, which the demo must convincingly serve: homeowners, property managers, HOAs, apartment
   communities, engineers, senior living facilities, offices, churches and cemeteries in Chester, Delaware and Montgomery
   Counties, PA. They arrive with a problem (yard floods, bamboo spreading, want a patio, need upkeep, need snow cleared
   for a building) rather than a service name.

## Product Purpose

A modern remodel of https://bateslandscaping.co/ that is clearly better than the current site and adds working features
it lacks: a chatbot that answers from Bates's own FAQs, and a real booking flow that emails the booking. Demo only, zero
cost (free tiers). Success = Bates sees it and wants to talk to Justin.

## Positioning

Problem-first: the visitor's problem is the thread through the whole site (chat quick replies, page copy), with the
Residential vs Commercial split underneath. Real Bates content only: their case studies (with county and price range),
their team, their photos, their words.

## Operating Context

- Current Bates booking = Calendly embed on `/book-now/` (service, 30-min intake call, then email 3-5 property photos).
  The demo replaces it with its own calendar + form that emails the booking (not Calendly; see HANDOFF.md).
- Client portal "Track My Project" is external (portal.golmn.com). Staff login is Trainual (external).
- Snow + ice is commercial/HOA only, never homeowners. Not offered: concrete, firewood, mulch delivery, tree work over ~15 ft.

## Capabilities and Constraints

- Must be `noindex` (it must not compete with their real site). Already set in `site/app/layout.tsx`.
- Must not book onto Bates's real calendar or email their real inbox during the demo. Bookings go to
  justin.masiga.94@gmail.com until Justin says to switch.
- Free tiers only: Cloudflare Workers + Workers AI (10,000 neurons/day), Brevo (300 emails/day).
- Decided: a compact visible FAQ as well as the bot; bookings use the Aqua Brevo sender (email says Aqua); the
  "what I found" sheet is `deliverables/Bates-site-notes.pdf`. Open items: HANDOFF.md §10.

## Brand Commitments

- Bates red **#ED1C24** is the brand (logo, their CSS, staff uniforms). Logo grey #585858. Never a reference site's palette.
- Chosen by Justin for the remodel: deep forest green **#0F1F17** as the dark partner to the red; Bricolage Grotesque headings.
- Their tagline, verbatim, is the hero: "The best Landscape company to work WITH and FOR".
- Logo: only small rasters exist (`recon/brand/`, 250x66 and 300x79). A larger or SVG logo has been asked for, not received.

## Evidence on Hand

- `recon/case-studies.json` + `recon/case-studies/`: 16 real case studies (problem, county, price range, what was done).
- `recon/team.json` + `recon/team/`: 10 team members with bios and headshots.
- `recon/portfolio/` + `manifest.json`: 20 gallery photos; `recon/faq.md`: 55 FAQs verbatim; `recon/home-copy.md`.
- `recon/hero-video.webm`: hero footage trimmed by Justin.
- **Absent, never fabricate:** testimonials (Bates has none anywhere), opening hours, stats, awards beyond the NALP 2024
  Awards of Excellence badge, prices beyond those in the case studies.

## Product Principles

1. Their content, their brand; a remodel of the look and the flow, not of the facts.
2. The visitor's problem leads; the service catalogue follows.
3. Working features beat mockups: the bot answers, the booking really sends.
4. Restraint over spectacle: no scroll-jacking, no smooth-scroll libraries, nothing that fights native scrolling.

## Accessibility & Inclusion

Every motion respects `prefers-reduced-motion` (static headline, no marquee, no bob, poster instead of video).
Careers content must keep the English + Spanish application routes.
