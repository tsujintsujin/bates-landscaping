import Image from "next/image";
import Link from "next/link";
import {
  CaseCarousel,
  ChatFab,
  ConsentPreferences,
  GalleryMarquee,
  Header,
  HeroVideo,
  OpenChatButton,
  TeamSection,
  WordFill,
} from "@/components/client";
import { Arrow, ArrowUpRight, FacebookLogo, InstagramLogo, LinkedinLogo, Mail, Phone, Plus } from "@/components/icons";
import { asset } from "@/lib/base";
import { ADDRESS, EMAIL, FAQS, HISTORY, PHONE, PHONE_HREF, SERVICES, SOCIALS } from "@/lib/content";

const SOCIAL_ICONS = { FacebookLogo, InstagramLogo, LinkedinLogo };
const pill = "press inline-flex items-center gap-2 rounded-full px-5 py-3 text-[15px] font-semibold";
const arrowNudge = "size-4 transition-transform duration-200 ease-(--ease-out) [@media(hover:hover)]:group-hover:translate-x-0.5";
const textLink = "group inline-flex items-center gap-1.5 text-[15px] font-semibold";
const label = "text-xs font-semibold uppercase tracking-[0.08em] text-white/50";
const h2 = "font-display text-[clamp(1.9rem,3.6vw,3.25rem)] font-bold leading-[1.04] tracking-[-0.03em]";
const wrap = "mx-auto max-w-[1180px] px-4 md:px-8 xl:px-0";

/* NALP Awards of Excellence ribbons (their homepage shows the 2024 and 2025 awards above the hero headline; this is
   our drawn version, without NALP's logo mark). */
function AwardRibbon({
  year,
  fill,
  size = "h-[106px] md:h-[130px]",
}: {
  year: string;
  fill: string;
  size?: string;
}) {
  return (
    <svg
      viewBox="0 0 110 140"
      className={`${size} w-auto drop-shadow-[0_8px_14px_rgb(0_0_0/0.35)]`}
      role="img"
      aria-label={`National Association of Landscape Professionals, ${year} Awards of Excellence recipient`}
    >
      <path d="M4 0 H106 V136 L55 116 L4 136 Z" fill={fill} />
      <path d="M10 7 H100 V125 L55 107 L10 125 Z" fill="none" stroke="white" strokeOpacity=".28" strokeWidth="1" />
      <g fill="white" textAnchor="middle" style={{ fontFamily: "var(--font-asap)" }}>
        <text x="55" y="23" fontSize="8" fontWeight="600" letterSpacing="1.8" opacity=".85">NALP</text>
        <path d="M34 30 H76" stroke="white" strokeOpacity=".4" />
        <text x="55" y="56" fontSize="27" fontWeight="700" style={{ fontFamily: "var(--font-bricolage)" }} letterSpacing="-.5">
          {year}
        </text>
        <text x="55" y="72" fontSize="8.5" letterSpacing=".8">AWARDS OF</text>
        <text x="55" y="83" fontSize="8.5" letterSpacing=".8">EXCELLENCE</text>
        <text x="55" y="97" fontSize="8.5" fontWeight="700" letterSpacing="1.4">RECIPIENT</text>
      </g>
    </svg>
  );
}

/* Thin contour lines, drawn across a whole strip */
function Contours({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 1440 240" preserveAspectRatio="xMidYMid slice" className={className} fill="none" stroke="currentColor" strokeWidth="1" aria-hidden>
      {Array.from({ length: 9 }, (_, i) => (
        <path key={i} d={`M-20 ${40 + i * 22} C 260 ${-10 + i * 26}, 520 ${120 + i * 14}, 820 ${50 + i * 22} S 1260 ${10 + i * 26}, 1460 ${90 + i * 18}`} />
      ))}
    </svg>
  );
}

export default function Home() {
  return (
    <>
      <Header overHero />
      <main>
        {/* 1. Hero: centred on phones, left-aligned and sitting a little above centre on desktop */}
        <section className="relative min-h-[100dvh] overflow-hidden bg-forest text-white">
          <div id="top-probe" className="absolute inset-x-0 top-0 h-24" aria-hidden />
          <HeroVideo />
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgb(15_31_23/0.9)_0%,rgb(15_31_23/0.5)_50%,rgb(15_31_23/0.4)_100%)]" />
          <div className="relative mx-auto flex min-h-[100dvh] max-w-[1440px] flex-col items-center justify-center px-4 pb-28 pt-20 text-center md:items-start md:px-8 md:pb-48 md:pt-24 md:text-left">
            <div className="rise mb-6 flex gap-2 md:mb-7">
              <AwardRibbon year="2024" fill="#1c5a3a" />
              <AwardRibbon year="2025" fill="#2f8a45" />
            </div>
            <h1 className="rise max-w-[17ch] font-display [animation-delay:60ms] text-[clamp(2.5rem,5.4vw,5.75rem)] font-bold leading-[0.95] tracking-[-0.035em]">
              The best landscape company to work <span className="text-red">WITH</span> and{" "}
              <span className="text-red">FOR</span>
            </h1>
            <p className="rise mt-5 max-w-md text-base text-white/80 [animation-delay:120ms] md:text-lg">
              Design, hardscaping, drainage and maintenance across Chester, Delaware and Montgomery Counties, PA.
            </p>
            <div className="rise mt-7 flex flex-wrap items-center justify-center gap-x-7 gap-y-4 [animation-delay:220ms] md:justify-start">
              <Link href="/book-now" className={`${pill} bg-red text-white hover:bg-red-deep`}>
                Book now
              </Link>
              <a href="#work" className={`${textLink} text-white hover:text-white/80`}>
                See our work <Arrow className={arrowNudge} weight="bold" />
              </a>
            </div>
          </div>
        </section>

        {/* 2. Commercial / Residential, overlapping the hero's bottom edge */}
        <section className="relative z-10 mx-auto -mt-20 grid max-w-[1180px] gap-3 px-4 md:-mt-28 md:grid-cols-2 md:gap-4 md:px-8 xl:px-0">
          {[
            {
              title: "Commercial landscaping",
              line: "Premium commercial projects, on time and on budget.",
              href: "/commercial-landscaping-services",
              img: "/img/g-office-exton.webp",
              bg: "bg-forest-2",
            },
            {
              title: "Residential landscaping",
              line: "A reliable residential service, from design to estate maintenance.",
              href: "/residential-landscaping-services",
              img: "/img/c-walkway.webp",
              bg: "bg-red",
            },
          ].map((c) => (
            <Link
              key={c.title}
              href={c.href}
              className={`group grid grid-cols-[1fr_auto] items-center gap-4 overflow-hidden rounded-2xl ${c.bg} p-5 text-white shadow-[0_24px_50px_-20px_rgb(15_31_23/0.5)] lg:grid-cols-[1fr_1fr] lg:items-stretch lg:gap-0 lg:p-0`}
            >
              <div className="lg:p-7">
                <h2 className="max-w-[12ch] font-display text-[clamp(1.4rem,1.9vw,1.75rem)] font-bold leading-[1.05] tracking-[-0.02em]">
                  {c.title}
                </h2>
                <p className="mt-2.5 max-w-[30ch] text-[15px] leading-snug text-white/80">{c.line}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-[15px] font-semibold">
                  Discover more <Arrow className={arrowNudge} weight="bold" />
                </span>
              </div>
              <div className="relative h-32 w-24 overflow-hidden [border-radius:0_62%_0_62%] md:h-40 md:w-32 lg:h-auto lg:min-h-52 lg:w-auto lg:[border-radius:0_0_0_70%]">
                <Image
                  src={asset(c.img)}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 300px, 130px"
                  className="object-cover transition-transform duration-700 ease-(--ease-out) [@media(hover:hover)]:group-hover:scale-105"
                />
              </div>
            </Link>
          ))}
        </section>

        {/* 3. Project galleries */}
        <section id="work" className="scroll-mt-20 pb-24 pt-24 md:pb-28 md:pt-32">
          <div className="mx-auto max-w-5xl px-4 text-center">
            <WordFill
              text="Landscapes we've built and cared for across Southeastern PA."
              className="font-display text-[clamp(2rem,4.4vw,4.25rem)] font-bold leading-[1.02] tracking-[-0.035em]"
            />
          </div>
          <div className="mt-12 md:mt-16">
            <GalleryMarquee />
          </div>
          <div className="mx-auto mt-12 max-w-xl px-4 text-center md:mt-14">
            <p className="text-[15px] leading-relaxed text-moss">
              We provide the full range of landscape design and maintenance services to homeowners, property managers,
              HOAs, engineers and senior living facilities throughout Chester, Delaware and Montgomery Counties.
            </p>
            <Link href="/project-gallery" className={`${pill} group mt-7 bg-forest text-white hover:bg-red`}>
              View all projects <Arrow className={arrowNudge} weight="bold" />
            </Link>
          </div>
        </section>

        {/* 4. Services: five panels, the hovered one widens (their five homepage cards) */}
        <section className="bg-forest py-24 text-white md:py-28">
          <div className={wrap}>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className={h2}>Our services</h2>
              <Link href="/all-services" className={`${textLink} text-white hover:text-white/80`}>
                All services <Arrow className={arrowNudge} weight="bold" />
              </Link>
            </div>
            <ul className="svc-row mt-10 flex flex-col gap-3 md:mt-12">
              {SERVICES.map((s) => (
                <li key={s.title} className="svc">
                  <Link href={s.href} className="svc-card group relative flex h-full min-h-60 flex-col justify-end overflow-hidden rounded-2xl bg-forest-2 p-5 md:min-h-72 md:p-6 lg:px-4">
                    <Image src={asset(s.img)} alt="" fill sizes="(min-width: 1024px) 600px, 100vw" className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest/95 via-forest/45 to-forest/5" />
                    <div className="relative">
                      <h3 className="svc-title font-display text-[clamp(1.25rem,1.8vw,1.6rem)] font-bold leading-[1.08] tracking-[-0.02em]">
                        {s.title}
                      </h3>
                      <div className="svc-more">
                        <div className="overflow-hidden">
                          {"note" in s && (
                            <span className="mt-3 inline-block rounded-[3px] bg-white px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.05em] text-forest">
                              {s.note}
                            </span>
                          )}
                          <p className="mt-3 max-w-[40ch] text-[15px] leading-snug text-white/80 lg:w-[34ch]">{s.line}</p>
                          <span className="mt-4 inline-flex items-center gap-1.5 text-[15px] font-semibold">
                            Learn more <Arrow className={arrowNudge} weight="bold" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 5. We are Bates Landscaping */}
        <section className="py-24 md:py-32">
          <div className={`${wrap} grid items-center gap-10 md:grid-cols-[1fr_1.05fr] md:gap-16`}>
            <div>
              <h2 className={h2}>
                <span className="mb-2 block text-[clamp(1.1rem,1.6vw,1.4rem)] font-semibold tracking-normal text-moss">We are</span>
                Bates Landscaping
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-ink">
                Founded in 2011 by Justin Bates, Bates Landscaping has been known for high quality workmanship and
                family-oriented relationships with their clients and employees.
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-moss">
                To maintain a competitive edge over the years, we strive to source the best material, work with the latest
                technology and equipment, while employing and training the best team members to deliver 100% client
                satisfaction.
              </p>
              <Link href="/about-us" className={`${textLink} mt-6 text-ink hover:text-red`}>
                About us <Arrow className={arrowNudge} weight="bold" />
              </Link>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image src={asset("/img/crew.webp")} alt="The Bates Landscaping crew at the yard" fill sizes="(min-width: 768px) 600px, 100vw" className="object-cover" />
            </div>
          </div>
          {/* Phones: a vertical timeline (line + red marker per year) so the order reads without reading.
              From sm up: a row of columns with a rule above each year. */}
          <ol
            className={`${wrap} relative mt-14 grid gap-7 before:absolute before:bottom-2 before:left-[calc(1rem+5px)] before:top-2 before:w-px before:bg-forest/20 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-8 sm:before:hidden md:mt-20 lg:grid-cols-6`}
          >
            {HISTORY.map(([year, text]) => (
              <li key={year} className="relative pl-8 sm:border-t sm:border-forest/15 sm:pl-0 sm:pt-4">
                <span className="absolute left-0 top-2 size-2.75 rounded-full bg-red ring-4 ring-paper sm:hidden" aria-hidden />
                <p className="font-display text-2xl font-bold tracking-[-0.02em] text-red">{year}</p>
                <p className="mt-1.5 text-sm leading-snug text-moss">{text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* 6. Highest rated: case studies */}
        <section className="bg-white pb-24 pt-24 md:pb-28 md:pt-28">
          <div className="mx-auto max-w-5xl px-4 text-center">
            <WordFill
              text="One of the highest rated companies to work with and for in Southeastern PA."
              className="font-display text-[clamp(1.9rem,3.6vw,3.25rem)] font-bold leading-[1.04] tracking-[-0.03em]"
            />
          </div>
          <div className="mt-10 md:mt-14">
            <CaseCarousel />
          </div>
          <div className="mt-10 text-center md:mt-12">
            <Link href="/case-studies" className={`${pill} group bg-forest text-white hover:bg-red`}>
              All case studies <Arrow className={arrowNudge} weight="bold" />
            </Link>
          </div>
        </section>

        {/* 7. We're hiring: full-width strip */}
        <section className="relative overflow-hidden bg-forest text-white">
          <Contours className="pointer-events-none absolute inset-0 size-full text-white/[0.09]" />
          <div className="relative mx-auto flex max-w-[1180px] flex-col items-start gap-6 px-4 py-12 md:flex-row md:items-center md:justify-between md:px-8 md:py-14 xl:px-0">
            <div>
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-bold leading-[1.05] tracking-[-0.025em]">
                We&apos;re hiring!
              </h2>
              <p className="mt-2 max-w-lg text-[15px] leading-relaxed text-white/70">
                On-site training, creative pay packages, a team atmosphere and benefits. Applications in English and Spanish.
              </p>
            </div>
            <Link
              href="/join-our-team"
              className="press group inline-flex shrink-0 items-center gap-3 self-end md:self-auto rounded-full bg-red py-1.5 pl-5 pr-1.5 text-[15px] font-semibold hover:bg-red-deep"
            >
              See Careers
              <span className="grid size-9 place-items-center rounded-full bg-white text-forest">
                <Arrow className={arrowNudge} weight="bold" />
              </span>
            </Link>
          </div>
        </section>

        {/* 8. The team */}
        <section className="py-24 md:py-28">
          <div className={wrap}>
            <h2 className={`${h2} text-center`}>The team</h2>
            <div className="mt-10 md:mt-14">
              <TeamSection />
            </div>
          </div>
        </section>

        {/* 9. FAQ: six of theirs, compact; the chat covers the rest */}
        <section className="bg-white py-24 md:py-28">
          <div className={`${wrap} grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16`}>
            <div>
              <h2 className={h2}>Frequently asked questions</h2>
              <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-moss">
                Quick answers from our team. Anything else, ask us in the chat.
              </p>
              <Link href="/faq" className={`${textLink} mt-6 text-ink hover:text-red`}>
                All questions <Arrow className={arrowNudge} weight="bold" />
              </Link>
            </div>
            <div className="border-y border-forest/10">
              {FAQS.map(([q, a], i) => (
                <details key={q} name="faq" className={`faq group/f ${i ? "border-t border-forest/10" : ""}`}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-[17px] font-semibold leading-snug">
                    {q}
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-forest/5 transition-[transform,background-color] duration-300 ease-(--ease-out) group-open/f:rotate-45 group-open/f:bg-red group-open/f:text-white">
                      <Plus className="size-4" weight="bold" />
                    </span>
                  </summary>
                  <p className="max-w-[60ch] pb-6 pr-14 text-[15px] leading-relaxed text-moss">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* 10. Floating card straddling the page/footer seam */}
        <section className="relative z-10 -mb-px bg-forest px-4 pt-8 md:bg-[linear-gradient(to_bottom,white_calc(50%+2rem),var(--color-forest)_calc(50%+2rem))] md:px-8 md:pt-4">
          <div className="floating relative mx-auto max-w-[1180px] overflow-hidden rounded-3xl bg-[linear-gradient(120deg,#7a0b10_0%,var(--color-red-deep)_45%,var(--color-red)_100%)] p-8 text-white shadow-[0_30px_60px_-20px_rgb(15_31_23/0.55)] md:p-12">
            <svg
              viewBox="0 0 400 300"
              className="pointer-events-none absolute -right-20 -top-12 w-[480px] text-white/15"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.25"
              aria-hidden
            >
              {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                <path key={i} d={`M${40 + i * 14} 300 C ${90 + i * 10} ${200 - i * 12}, ${160 + i * 6} ${150 - i * 14}, 400 ${60 + i * 16}`} />
              ))}
            </svg>
            <div className="relative max-w-xl">
              <h2 className="font-display text-[clamp(1.9rem,3.2vw,2.75rem)] font-bold leading-[1.04] tracking-[-0.03em]">
                We&apos;re here to help!
              </h2>
              <p className="mt-3 text-base text-white/85">
                Discover how our personalized approach to landscaping can benefit your property.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-4">
                <Link href="/book-now" className={`${pill} bg-white text-red-deep hover:bg-paper`}>
                  Book now
                </Link>
                <OpenChatButton className={`${textLink} text-white hover:text-white/80`}>
                  Ask us <Arrow className={arrowNudge} weight="bold" />
                </OpenChatButton>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 11. Footer */}
      <footer className="bg-forest pb-28 pt-14 text-white md:pb-10 md:pt-20">
        <div className="mx-auto grid max-w-[1180px] gap-12 px-4 md:grid-cols-[1fr_1.4fr] md:px-8 xl:px-0">
          <div>
            <p className={label}>Explore</p>
            <nav aria-label="Footer" className="mt-4 grid grid-cols-2 gap-x-6 gap-y-1 md:grid-cols-1">
              {[
                ["Home", "/"],
                ["Commercial", "/commercial-landscaping-services"],
                ["Residential", "/residential-landscaping-services"],
                ["Portfolio", "/project-gallery"],
                ["About Us", "/about-us"],
                ["Careers", "/join-our-team"],
                ["Contact", "/request-a-quote"],
              ].map(([text, href]) => (
                <Link
                  key={text}
                  href={href}
                  className="w-fit py-1 font-display text-xl font-bold leading-tight tracking-[-0.02em] transition-colors hover:text-red md:text-[clamp(1.5rem,2.4vw,2rem)]"
                >
                  {text}
                </Link>
              ))}
            </nav>
          </div>

          <div className="grid content-start gap-x-8 gap-y-9 text-[15px] sm:grid-cols-2">
            <div>
              <p className={label}>Head office</p>
              <p className="mt-3 leading-relaxed">{ADDRESS[0]}<br />{ADDRESS[1]}</p>
              <p className="mt-2 text-white/65">
                Also in <Link href="/west-chester" className="underline underline-offset-2 hover:text-red">West Chester</Link> and{" "}
                <Link href="/phoenixville" className="underline underline-offset-2 hover:text-red">Phoenixville</Link>
              </p>
            </div>
            <div>
              <p className={label}>Call us</p>
              <a href={PHONE_HREF} className="mt-3 inline-flex items-center gap-2 font-medium hover:text-red">
                <Phone className="size-4" weight="bold" /> {PHONE}
              </a>
            </div>
            <div>
              <p className={label}>Email our team</p>
              <a href={`mailto:${EMAIL}`} className="group mt-3 inline-flex items-center gap-2.5 font-medium hover:text-red">
                <span className="grid size-10 place-items-center rounded-full bg-white/10 transition-colors group-hover:bg-red group-hover:text-white">
                  <Mail className="size-4" />
                </span>
                {EMAIL}
              </a>
            </div>
            <div>
              <p className={label}>Connect with us</p>
              <div className="mt-3 flex gap-2">
                {SOCIALS.map((s) => {
                  const Icon = SOCIAL_ICONS[s.icon];
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="press grid size-10 place-items-center rounded-full bg-white/10 hover:bg-red"
                    >
                      <Icon className="size-4" />
                    </a>
                  );
                })}
              </div>
            </div>
            <div className="sm:col-span-2 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="max-w-sm text-white/65">The Bates Difference comes from our unique approach to the design process.</p>
                <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium">
                  <a href="https://portal.golmn.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-red">
                    Track My Project <ArrowUpRight className="size-3.5" weight="bold" />
                  </a>
                  <Link href="/sitemap" className="hover:text-red">Sitemap</Link>
                </div>
              </div>
              <div className="flex shrink-0 gap-2">
                <AwardRibbon year="2024" fill="#1c5a3a" size="h-[92px]" />
                <AwardRibbon year="2025" fill="#2f8a45" size="h-[92px]" />
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-12 flex max-w-[1180px] flex-col gap-2 border-t border-white/10 px-4 pt-6 text-[13px] text-white/50 md:mt-16 md:flex-row md:items-center md:justify-between md:px-8 xl:px-0">
          <p>© {new Date().getFullYear()} Bates Landscaping Ltd. Concept remodel, not the official site.</p>
          <div className="flex gap-5">
            <Link href="/terms-and-conditions" className="hover:text-white">Terms and Conditions</Link>
            <Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
          </div>
        </div>
      </footer>

      <ChatFab />
      <ConsentPreferences />
    </>
  );
}
