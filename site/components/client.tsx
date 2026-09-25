"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { asset } from "@/lib/base";
import { CASES, CHIPS, GALLERY, NAV, PHONE, PHONE_HREF, TEAM } from "@/lib/content";
import { Arrow, ArrowLeft, Chat, Chevron, Close, Cookie, Menu, Phone } from "./icons";

const OPEN_CHAT = "bates:open-chat";
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- Links: internal via next/link (adds the /bates base path), off-site in a new tab ---------- */

export function SmartLink({ href, className, children }: { href: string; className?: string; children: React.ReactNode }) {
  return href.startsWith("http") ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  ) : (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

/* ---------- Header: transparent over the hero, solid once the hero's top leaves ---------- */

// overHero: the page starts with a dark hero containing <div id="top-probe">. The header is then transparent over it
// and turns solid once the probe scrolls away. Every other page gets the solid header from the start.
export function Header({ overHero = false }: { overHero?: boolean }) {
  const [solid, setSolid] = useState(!overHero);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const probe = overHero ? document.getElementById("top-probe") : null;
    if (!probe) return;
    const io = new IntersectionObserver(([e]) => setSolid(!e.isIntersecting));
    io.observe(probe);
    return () => io.disconnect();
  }, [overHero]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    // Floating buttons (.menu-hide) step aside while the menu is open; see globals.css.
    if (open) document.documentElement.dataset.menu = "open";
    else delete document.documentElement.dataset.menu;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [open]);

  const light = solid && !open;
  const link =
    "flex items-center gap-1 rounded-full px-3.5 py-2 text-[15px] font-medium transition-colors hover:bg-current/10";
  const menu =
    "invisible absolute left-1/2 top-full -translate-x-1/2 translate-y-1 pt-3 opacity-0 transition-[opacity,transform,visibility] duration-200 ease-(--ease-out) group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100";
  const panel = "rounded-2xl bg-white p-2 text-ink shadow-[0_18px_40px_-12px_rgb(15_31_23/0.35)] ring-1 ring-forest/5";
  const item = "block rounded-xl px-3 py-2 text-[15px] transition-colors hover:bg-paper hover:text-red";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,color,box-shadow] duration-300 ${
        open
          ? "bg-forest text-white" // menu open: header joins the menu so nothing behind shows through
          : light
            ? "bg-paper/95 text-ink shadow-[0_1px_0_rgb(15_31_23/0.08)] backdrop-blur-md"
            : "text-white"
      }`}
    >
      <div className="mx-auto grid h-18 max-w-[1440px] grid-cols-[1fr_auto] items-center gap-4 px-4 md:px-8 lg:grid-cols-[1fr_auto_1fr]">
        <Link href="/" aria-label="Bates Landscaping home" className="w-fit">
          <Image
            src={asset("/img/logo.svg")}
            alt="Bates Landscaping"
            width={250}
            height={66}
            priority
            unoptimized
            className={`h-9 w-auto transition-[filter] duration-300 md:h-10 ${light ? "" : "brightness-0 invert"}`}
          />
        </Link>

        <nav aria-label="Main" className="hidden items-center lg:flex">
          <div className="group relative">
            <button className={link} aria-haspopup="true">
              Services <Chevron className="size-3.5" weight="bold" />
            </button>
            <div className={menu}>
              <div className={`${panel} grid w-[440px] grid-cols-2 gap-1`}>
                {Object.entries(NAV.services).map(([group, items]) => (
                  <div key={group}>
                    <p className="px-3 pb-1 pt-2 font-display text-sm font-bold text-red">{group}</p>
                    {items.map(([label, href]) => (
                      <SmartLink key={label} href={href} className={item}>{label}</SmartLink>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="group relative">
            <button className={link} aria-haspopup="true">
              Portfolio <Chevron className="size-3.5" weight="bold" />
            </button>
            <div className={menu}>
              <div className={`${panel} w-52`}>
                {NAV.portfolio.map(([label, href]) => (
                  <SmartLink key={label} href={href} className={item}>{label}</SmartLink>
                ))}
              </div>
            </div>
          </div>
          <Link href="/about-us" className={link}>About Us</Link>
          <div className="group relative">
            <button className={link} aria-haspopup="true">
              Careers <Chevron className="size-3.5" weight="bold" />
            </button>
            <div className={menu}>
              <div className={`${panel} w-52`}>
                {NAV.careers.map(([label, href]) => (
                  <SmartLink key={label} href={href} className={item}>{label}</SmartLink>
                ))}
              </div>
            </div>
          </div>
        </nav>

        <div className="flex items-center justify-self-end gap-2">
          <a
            href={PHONE_HREF}
            className={`press hidden items-center gap-2 rounded-full px-4 py-2.5 text-[15px] font-medium md:inline-flex ${
              light ? "hover:bg-forest/5" : "hover:bg-white/10"
            }`}
          >
            <Phone className="size-4" weight="bold" /> {PHONE}
          </a>
          <a
            href={PHONE_HREF}
            aria-label={`Call ${PHONE}`}
            className={`press grid size-11 place-items-center rounded-full md:hidden ${
              light ? "bg-forest text-white" : "bg-white text-forest"
            }`}
          >
            <Phone className="size-5" weight="bold" />
          </a>
          <Link
            href="/book-now"
            className="press hidden rounded-full bg-red px-5 py-2.5 text-[15px] font-semibold text-white hover:bg-red-deep sm:inline-flex"
          >
            Book now
          </Link>
          <button
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className={`press grid size-11 place-items-center rounded-full lg:hidden ${
              light ? "bg-forest/5 text-ink" : "bg-white/15 text-white backdrop-blur"
            }`}
          >
            {open ? <Close className="size-5" weight="bold" /> : <Menu className="size-5" weight="bold" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-x-0 bottom-0 top-18 overflow-y-auto bg-forest px-4 pb-10 pt-2 text-white transition-opacity duration-200 starting:opacity-0 lg:hidden">
          <nav aria-label="Mobile" className="flex flex-col" onClick={() => setOpen(false)}>
            {Object.entries(NAV.services).map(([group, items]) => (
              <details key={group} className="group/d border-b border-white/10" onClick={(e) => e.stopPropagation()}>
                <summary className="flex cursor-pointer list-none items-center justify-between py-4 font-display text-2xl font-bold">
                  {group}
                  <Chevron className="size-5 transition-transform duration-200 group-open/d:rotate-180" />
                </summary>
                <div className="pb-3" onClick={() => setOpen(false)}>
                  {items.map(([label, href]) => (
                    <SmartLink key={label} href={href} className="block py-2 text-lg text-white/75">{label}</SmartLink>
                  ))}
                </div>
              </details>
            ))}
            {[...NAV.portfolio, ["About Us", "/about-us"], ...NAV.careers].map(([label, href]) => (
              <SmartLink key={label} href={href} className="border-b border-white/10 py-4 font-display text-2xl font-bold">
                {label}
              </SmartLink>
            ))}
            <Link href="/book-now" className="press mt-8 rounded-full bg-red py-4 text-center text-lg font-semibold">
              Book now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

/* ---------- Hero video: poster first, video only when motion + data allow ---------- */

export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const save = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (!reduced() && !save) ref.current?.play().catch(() => {});
  }, []);
  return (
    <video
      ref={ref}
      className="absolute inset-0 size-full object-cover"
      muted
      loop
      playsInline
      preload="none"
      poster={asset("/media/hero-poster.webp")}
      aria-hidden
    >
      <source src={asset("/media/hero.webm")} type="video/webm" />
      <source src={asset("/media/hero.mp4")} type="video/mp4" />
    </video>
  );
}

/* ---------- Word-by-word fill, scrubbed to scroll ---------- */

export function WordFill({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        ref.current!.children,
        { opacity: 0.18 },
        {
          opacity: 1,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top 80%", end: "bottom 45%", scrub: true },
        },
      );
    });
    return () => mm.revert();
  }, []);
  return (
    <h2 ref={ref} className={className} aria-label={text}>
      {text.split(" ").map((w, i) => (
        <span key={i} aria-hidden>
          {w}{" "}
        </span>
      ))}
    </h2>
  );
}

/* ---------- Gallery: small staggered cards on an endless marquee (Hooper intro gallery) ---------- */

export function GalleryMarquee() {
  // Two identical halves; the track slides exactly one half, then repeats seamlessly.
  const card = (g: (typeof GALLERY)[number], copy: boolean) => (
    <figure
      key={g.src + copy}
      aria-hidden={copy || undefined}
      className="relative mr-3 shrink-0 overflow-hidden rounded-md bg-forest md:mr-5"
      style={{
        width: `min(${g.w}px, ${(g.w / 4.8).toFixed(1)}vw)`,
        aspectRatio: `${g.w} / ${g.h}`,
        marginTop: `min(${g.y}px, ${(g.y / 4.8).toFixed(1)}vw)`,
      }}
    >
      <Image src={asset(g.src)} alt={copy ? "" : g.caption} fill sizes="(min-width: 768px) 340px, 62vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-forest/10 to-transparent" />
      <figcaption className="absolute inset-x-3 bottom-3 border-t border-white/25 pt-2.5 text-[11px] font-semibold uppercase leading-tight tracking-[0.08em] text-white md:inset-x-4 md:bottom-4">
        {g.caption}
      </figcaption>
    </figure>
  );
  return (
    <div className="overflow-hidden motion-reduce:no-scrollbar motion-reduce:overflow-x-auto">
      <div className="flex w-max items-start animate-[marquee_80s_linear_infinite] motion-reduce:animate-none">
        {GALLERY.map((g) => card(g, false))}
        {GALLERY.map((g) => card(g, true))}
      </div>
    </div>
  );
}

/* ---------- Case studies: looping slider (Hooper's "See what we've done") ---------- */

const mod = (i: number, n: number) => ((i % n) + n) % n;

export function CaseCarousel() {
  const [pos, setPos] = useState(0); // unbounded; the card shown is CASES[pos mod n]
  const drag = useRef<{ x: number; t: number } | null>(null);
  const n = CASES.length;
  const go = (d: number) => setPos((p) => p + d);

  // Swipe: a quick flick is enough, no distance threshold needed (velocity > 0.11 px/ms)
  const onDown = (e: React.PointerEvent) => (drag.current = { x: e.clientX, t: performance.now() });
  const onUp = (e: React.PointerEvent) => {
    if (!drag.current) return;
    const dx = e.clientX - drag.current.x;
    const v = Math.abs(dx) / (performance.now() - drag.current.t);
    drag.current = null;
    if (Math.abs(dx) > 50 || (Math.abs(dx) > 10 && v > 0.11)) go(dx < 0 ? 1 : -1);
  };

  const arrow =
    "press absolute top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-red text-white shadow-[0_10px_24px_-8px_rgb(15_31_23/0.5)] hover:bg-red-deep md:size-13";

  return (
    <div
      className="relative h-[460px] touch-pan-y select-none overflow-hidden [--gap:12px] [--inset:28px] [--w:min(80vw,1040px)] md:h-[540px] md:[--gap:20px] md:[--inset:52px]"
      onPointerDown={onDown}
      onPointerUp={onUp}
      onPointerCancel={() => (drag.current = null)}
      onKeyDown={(e) => (e.key === "ArrowRight" ? go(1) : e.key === "ArrowLeft" ? go(-1) : null)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Case studies"
    >
      {[-2, -1, 0, 1, 2].map((k) => {
        const abs = pos + k;
        const c = CASES[mod(abs, n)];
        const on = k === 0;
        return (
          <article
            key={abs}
            aria-hidden={!on}
            className="absolute inset-y-0 left-1/2 w-(--w) overflow-hidden bg-forest text-white transition-[transform,clip-path] duration-700 ease-(--ease-in-out) motion-reduce:transition-none"
            style={{
              transform: `translateX(calc(-50% + ${k} * (var(--w) + var(--gap))))`,
              clipPath: on ? "inset(var(--inset) 0 round 6px)" : "inset(0 round 6px)",
            }}
          >
            <Image src={asset(c.img)} alt="" fill sizes="(min-width: 1300px) 1040px, 80vw" className="object-cover" draggable={false} />
            <div
              className={`absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/20 to-forest/10 transition-opacity duration-500 ${on ? "" : "opacity-40"}`}
            />
            <div
              className={`absolute inset-x-5 bottom-[calc(var(--inset)+1.5rem)] top-[calc(var(--inset)+1.25rem)] flex flex-col justify-between transition-opacity duration-300 md:inset-x-8 ${
                on ? "opacity-100 delay-300" : "opacity-0"
              }`}
            >
              <ul className="flex flex-wrap gap-1">
                {c.tags.map((t, j) => (
                  <li
                    key={t}
                    className={`rounded-[3px] px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.05em] ${
                      ["bg-white text-forest", "bg-red text-white", "bg-paper text-forest"][j % 3]
                    }`}
                  >
                    {t}
                  </li>
                ))}
              </ul>
              <div>
                <h3 className="max-w-2xl font-display text-[clamp(1.6rem,3vw,2.75rem)] font-bold leading-[1] tracking-[-0.02em]">
                  {c.title}
                </h3>
                <p className="mt-2.5 max-w-lg text-[15px] leading-snug text-white/80">{c.line}</p>
                {c.price && <p className="mt-2 text-sm font-semibold uppercase tracking-[0.05em] text-white">{c.price}</p>}
              </div>
            </div>
          </article>
        );
      })}
      <button onClick={() => go(-1)} aria-label="Previous case study" className={`${arrow} left-3 md:left-8`}>
        <ArrowLeft className="size-5" weight="bold" />
      </button>
      <button onClick={() => go(1)} aria-label="Next case study" className={`${arrow} right-3 md:right-8`}>
        <Arrow className="size-5" weight="bold" />
      </button>
      <p className="sr-only" aria-live="polite">
        Case study {mod(pos, n) + 1} of {n}: {CASES[mod(pos, n)].title}
      </p>
    </div>
  );
}

/* ---------- Chat FAB (UI only; bot backend comes later) ---------- */

type Msg = { from: "bot" | "user"; text: string; service?: string };
const GREETING = "Hey there, how can we help you?";

export function OpenChatButton({ className, children }: { className: string; children: React.ReactNode }) {
  return (
    <button className={className} onClick={() => dispatchEvent(new Event(OPEN_CHAT))}>
      {children}
    </button>
  );
}

export function ChatFab() {
  const [open, setOpen] = useState(false);
  const [nudge, setNudge] = useState(false);
  const [bubble, setBubble] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([{ from: "bot", text: GREETING }]);
  const end = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem("bates-chat-seen") === "1"; } catch {}
    // Badge stays until opened; the speech bubble steps aside after 8s so it never parks over content on a phone.
    const t = seen ? undefined : setTimeout(() => { setNudge(true); setBubble(true); }, 3000);
    const t2 = seen ? undefined : setTimeout(() => setBubble(false), 11000);
    const onOpen = () => { setOpen(true); dismiss(); };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    addEventListener(OPEN_CHAT, onOpen);
    addEventListener("keydown", onKey);
    return () => { clearTimeout(t); clearTimeout(t2); removeEventListener(OPEN_CHAT, onOpen); removeEventListener("keydown", onKey); };
  }, []);

  useEffect(() => {
    end.current?.scrollIntoView({ block: "end" });
  }, [msgs, open]);

  function dismiss() {
    setNudge(false);
    try { sessionStorage.setItem("bates-chat-seen", "1"); } catch {}
  }

  function pick(c: (typeof CHIPS)[number]) {
    setMsgs((m) => [...m, { from: "user", text: c.label }, { from: "bot", text: c.answer, service: c.key }]);
  }

  return (
    <>
      {open && (
        <div
          role="dialog"
          aria-label="Chat with Bates Landscaping"
          className="fixed bottom-24 right-4 z-50 flex max-h-[min(600px,calc(100svh-8rem))] w-[min(380px,calc(100vw-2rem))] origin-bottom-right flex-col overflow-hidden rounded-2xl bg-white text-ink shadow-[0_24px_60px_-16px_rgb(15_31_23/0.45)] ring-1 ring-forest/5 transition-[opacity,transform] duration-200 ease-(--ease-out) starting:scale-95 starting:opacity-0"
        >
          <div className="flex items-center justify-between bg-forest px-5 py-4 text-white">
            <p className="font-display text-lg font-bold leading-none">Bates Landscaping</p>
            <button onClick={() => setOpen(false)} aria-label="Close chat" className="press grid size-10 place-items-center rounded-full hover:bg-white/10">
              <Close className="size-5" />
            </button>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {msgs.map((m, i) => (
              <div key={i} className={m.from === "user" ? "flex justify-end" : ""}>
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-[15px] leading-snug transition-[opacity,transform] duration-300 ease-(--ease-out) starting:translate-y-2 starting:opacity-0 ${
                    m.from === "user" ? "rounded-br-md bg-red text-white" : "rounded-bl-md bg-paper"
                  }`}
                >
                  {m.text}
                  {m.service && (
                    <Link href={`/book-now?service=${m.service}`} className="mt-3 flex items-center gap-1.5 font-semibold text-red">
                      Book now <Arrow className="size-4" weight="bold" />
                    </Link>
                  )}
                </div>
              </div>
            ))}
            <div className="flex flex-wrap gap-2 pt-1">
              {CHIPS.map((c) => (
                <button
                  key={c.key}
                  onClick={() => pick(c)}
                  className="press rounded-full border border-forest/15 px-3.5 py-2 text-sm font-medium hover:border-red hover:text-red"
                >
                  {c.label}
                </button>
              ))}
            </div>
            <div ref={end} />
          </div>
          <p className="border-t border-forest/5 px-4 py-3 text-[13px] text-moss">
            Pick a topic above, or call <a href={PHONE_HREF} className="font-semibold text-ink underline underline-offset-2">{PHONE}</a>.
          </p>
        </div>
      )}

      {nudge && bubble && !open && (
        <div className="menu-hide fixed bottom-24 right-4 z-50 flex max-w-[250px] origin-bottom-right items-start gap-1 rounded-2xl rounded-br-md bg-white py-3 pl-4 pr-2 text-[15px] text-ink shadow-[0_16px_40px_-12px_rgb(15_31_23/0.4)] ring-1 ring-forest/5 motion-safe:animate-[pop_.3s_var(--ease-out)]">
          <button onClick={() => { setOpen(true); dismiss(); }} className="text-left">{GREETING}</button>
          <button onClick={dismiss} aria-label="Dismiss" className="grid size-7 shrink-0 place-items-center rounded-full text-moss hover:bg-paper">
            <Close className="size-4" />
          </button>
        </div>
      )}

      <button
        onClick={() => { setOpen(!open); dismiss(); }}
        aria-label={open ? "Close chat" : "Open chat"}
        className="menu-hide press fixed bottom-5 right-4 z-50 grid size-14 place-items-center rounded-full bg-red text-white shadow-[0_12px_28px_-8px_rgb(237_28_36/0.55)] hover:bg-red-deep"
      >
        {open ? <Close className="size-6" weight="bold" /> : <Chat className="size-7" weight="fill" />}
        {nudge && !open && (
          <span className="absolute -right-0.5 -top-0.5 grid size-5 place-items-center rounded-full bg-forest text-[11px] font-bold ring-2 ring-white">1</span>
        )}
      </button>
    </>
  );
}

/* ---------- The team: circles; click = others fade, head slides left, details slide out of the circle ---------- */
// Sequence (open):  others fade 0-250ms → head slides to the left edge 200-750ms → details slide out 700-1200ms.
// Phones (< sm, 3 columns): the head slides to the top centre instead and the details reveal downward under it.
// Sequence (close): details fade out 0-300ms → head slides home 300-850ms → others fade in 750ms+.
// Clicking anywhere on the details (or Esc, or the close button) runs the close sequence.

export function TeamSection() {
  const [sel, setSel] = useState<number | null>(null); // last person opened (kept during the close sequence)
  const [open, setOpen] = useState(false);
  const [fading, setFading] = useState(false); // details fading out after a close
  const [shift, setShift] = useState({ x: 0, y: 0 });
  const [gridH, setGridH] = useState<number>();
  const [panelH, setPanelH] = useState(0);
  const grid = useRef<HTMLUListElement>(null);
  const circles = useRef<(HTMLSpanElement | null)[]>([]);
  const heads = useRef<(HTMLButtonElement | null)[]>([]);
  const panel = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const openSel = useRef<number | null>(null); // who is open right now, for the resize observer

  // Distance from a head's circle to its target (grid top-left, or top-centre on phones), from layout offsets, which
  // the transform itself doesn't affect.
  const measure = (i: number) => {
    const b = heads.current[i]!;
    const c = circles.current[i]!;
    const phone = !matchMedia("(min-width: 640px)").matches;
    const targetX = phone ? (grid.current!.offsetWidth - c.offsetWidth) / 2 : 0;
    return { x: targetX - (b.offsetLeft + c.offsetLeft), y: -(b.offsetTop + c.offsetTop) };
  };

  // Keep the stage as tall as the grid (and the open panel) so the page doesn't jump, and keep an open head pinned to
  // the left edge if the width changes (window resize, DevTools opening).
  useEffect(() => {
    const ro = new ResizeObserver(() => {
      setGridH(grid.current!.offsetHeight);
      if (openSel.current !== null) setShift(measure(openSel.current));
    });
    ro.observe(grid.current!);
    return () => ro.disconnect();
  }, []);

  const close = useCallback(() => {
    openSel.current = null;
    setOpen(false);
    setFading(true);
    setTimeout(() => setFading(false), 320);
    if (sel !== null) setTimeout(() => heads.current[sel]?.focus({ preventScroll: true }), 900);
  }, [sel]);

  useEffect(() => {
    if (!open) return;
    setPanelH(panel.current!.offsetTop + panel.current!.scrollHeight);
    const t = setTimeout(() => closeBtn.current?.focus({ preventScroll: true }), 700);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    addEventListener("keydown", onKey);
    return () => { clearTimeout(t); removeEventListener("keydown", onKey); };
  }, [open, close]);

  function pick(i: number) {
    openSel.current = i;
    setShift(measure(i));
    setFading(false);
    setSel(i);
    setOpen(true);
  }

  const p = sel === null ? null : TEAM[sel];
  return (
    <div
      className="relative transition-[height] duration-500 ease-(--ease-in-out) [--head:96px] md:[--head:148px]"
      style={{ height: gridH === undefined ? undefined : open ? Math.max(gridH, panelH) : gridH }}
    >
      <ul ref={grid} className="grid grid-cols-3 gap-x-3 gap-y-7 sm:grid-cols-5 md:gap-x-6 md:gap-y-10">
        {TEAM.map((m, i) => {
          const me = open && sel === i;
          const others = open && sel !== i;
          return (
            <li
              key={m.name}
              className={`flex justify-center transition-opacity duration-300 motion-reduce:transition-none ${
                // a lone last person on a 3-column row sits in the middle column
                i === TEAM.length - 1 && TEAM.length % 3 === 1 ? "col-start-2 sm:col-start-auto" : ""
              } ${
                others ? "pointer-events-none opacity-0 delay-0" : "opacity-100 delay-[750ms]"
              }`}
            >
              <button
                ref={(el) => { heads.current[i] = el; }}
                onClick={() => (me ? close() : pick(i))}
                aria-expanded={me}
                aria-controls="team-details"
                tabIndex={others ? -1 : 0}
                className={`group relative z-10 flex flex-col items-center gap-3 transition-transform duration-[550ms] ease-(--ease-in-out) motion-reduce:transition-none ${
                  me ? "delay-200" : "delay-300"
                }`}
                style={{ transform: me ? `translate(${shift.x}px, ${shift.y}px)` : undefined }}
              >
                <span
                  ref={(el) => { circles.current[i] = el; }}
                  className="relative block size-(--head) overflow-hidden rounded-full bg-forest ring-0 ring-red transition-[transform,box-shadow] duration-150 ease-(--ease-out) group-active:scale-[0.92] [@media(hover:hover)]:group-hover:ring-4"
                >
                  <Image src={asset(m.img)} alt="" fill sizes="148px" className="object-cover" />
                </span>
                <span className={`text-center transition-opacity duration-200 ${me ? "opacity-0" : ""}`}>
                  <span className="block font-display text-base font-bold leading-tight md:text-lg">{m.name}</span>
                  <span className="mt-0.5 block max-w-[16ch] text-[13px] leading-snug text-moss">{m.role}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {/* Details: tucked behind the circle, slides out to the right across the full width. Click anywhere on it to
          close; closing fades it out in place. */}
      <div
        ref={panel}
        id="team-details"
        role="region"
        aria-label={p ? `About ${p.name}` : undefined}
        aria-hidden={!open}
        onClick={open ? close : undefined}
        className={`absolute left-0 right-0 top-[calc(var(--head)+1.25rem)] cursor-pointer pb-2 ease-(--ease-out) motion-reduce:transition-none sm:left-(--head) sm:top-0 sm:pl-4 md:pl-8 ${
          open
            ? "pointer-events-auto translate-0 opacity-100 transition-[clip-path,translate,opacity] duration-500 delay-700 [clip-path:inset(0_0_0_0)]"
            : fading
              ? "pointer-events-none translate-0 opacity-0 transition-opacity duration-300 delay-0 [clip-path:inset(0_0_0_0)]"
              : "pointer-events-none -translate-y-[calc(var(--head)/2)] opacity-0 transition-none [clip-path:inset(0_0_100%_0)] sm:translate-y-0 sm:-translate-x-[calc(var(--head)/2)] sm:[clip-path:inset(0_100%_0_0)]"
        }`}
      >
        {p && (
          <div>
            <div className="relative flex items-start justify-center gap-4 sm:justify-between">
              <div className="text-center sm:text-left">
                <h3 className="font-display text-2xl font-bold leading-tight tracking-[-0.02em] md:text-3xl">{p.name}</h3>
                <p className="mt-1 text-sm font-semibold text-red">{p.role}</p>
              </div>
              <button
                ref={closeBtn}
                tabIndex={open ? 0 : -1}
                aria-label={`Close ${p.name}'s details`}
                className="press absolute right-0 top-0 grid size-9 shrink-0 place-items-center rounded-full bg-forest/5 text-ink hover:bg-forest/10 sm:static"
              >
                <Close className="size-4" weight="bold" />
              </button>
            </div>
            <p className="mt-4 text-[15px] leading-relaxed text-moss md:text-base">{p.bio}</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- Consent Preferences (their site has a CookieYes button bottom-left; this is ours) ---------- */
// The demo sets no tracking cookies; the only storage is the chat's "seen" flag. The choice is remembered per browser.

const CONSENT_KEY = "bates-consent";
const CONSENT = [
  ["necessary", "Necessary", "Necessary cookies are required to enable the basic features of this site, such as providing secure log-in or adjusting your consent preferences. These cookies do not store any personally identifiable data."],
  ["functional", "Functional", "Functional cookies help perform certain functionalities like sharing the content of the website on social media platforms, collecting feedback, and other third-party features."],
  ["analytics", "Analytics", "Analytical cookies are used to understand how visitors interact with the website. These cookies help provide information on metrics such as the number of visitors, bounce rate, traffic source, etc."],
  ["performance", "Performance", "Performance cookies are used to understand and analyse the key performance indexes of the website which helps in delivering a better user experience for the visitors."],
  ["advertisement", "Advertisement", "Advertisement cookies are used to provide visitors with customised advertisements based on the pages you visited previously and to analyse the effectiveness of the ad campaigns."],
] as const;
type Choice = Record<(typeof CONSENT)[number][0], boolean>;
const NONE: Choice = { necessary: true, functional: false, analytics: false, performance: false, advertisement: false };
const ALL: Choice = { necessary: true, functional: true, analytics: true, performance: true, advertisement: true };

export function ConsentPreferences() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [choice, setChoice] = useState<Choice>(NONE);
  const [saved, setSaved] = useState(false);

  function openPanel() {
    try {
      const s = localStorage.getItem(CONSENT_KEY);
      setChoice(s ? { ...NONE, ...JSON.parse(s) } : NONE);
    } catch {}
    setSaved(false);
    dialog.current?.showModal();
  }
  function save(c: Choice) {
    setChoice(c);
    try { localStorage.setItem(CONSENT_KEY, JSON.stringify(c)); } catch {}
    setSaved(true);
    setTimeout(() => dialog.current?.close(), 500);
  }

  return (
    <>
      <button
        onClick={openPanel}
        aria-label="Consent preferences"
        className="menu-hide press fixed bottom-5 left-4 z-40 grid size-12 place-items-center rounded-full bg-forest text-white shadow-[0_10px_24px_-8px_rgb(15_31_23/0.55)] ring-1 ring-white/15 hover:bg-forest-2"
      >
        <Cookie className="size-6" />
      </button>

      <dialog
        ref={dialog}
        aria-labelledby="consent-title"
        onClick={(e) => e.target === dialog.current && dialog.current?.close()}
        className="m-auto max-h-[min(720px,calc(100dvh-2rem))] w-[min(680px,calc(100vw-2rem))] overflow-hidden rounded-2xl bg-white p-0 text-ink shadow-[0_30px_70px_-20px_rgb(15_31_23/0.6)] backdrop:bg-forest/60 backdrop:backdrop-blur-sm open:flex open:flex-col"
      >
        <div className="flex items-center justify-between border-b border-forest/10 px-5 py-4 md:px-7">
          <h2 id="consent-title" className="font-display text-xl font-bold tracking-[-0.02em]">Consent preferences</h2>
          <button onClick={() => dialog.current?.close()} aria-label="Close" className="press grid size-9 place-items-center rounded-full hover:bg-paper">
            <Close className="size-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5 md:px-7">
          <p className="text-[15px] leading-relaxed text-moss">
            We use cookies to help you navigate efficiently and perform certain functions. Choose which categories you
            allow. Necessary cookies are always on because the site can&apos;t work without them.
          </p>
          <ul className="mt-5 divide-y divide-forest/10 border-y border-forest/10">
            {CONSENT.map(([key, label, text]) => (
              <li key={key} className="relative">
                <details className="group/c py-4">
                  <summary className="flex cursor-pointer list-none items-center gap-3 pr-28">
                    <Chevron className="size-4 shrink-0 -rotate-90 transition-transform duration-200 group-open/c:rotate-0" weight="bold" />
                    <span className="font-semibold">{label}</span>
                  </summary>
                  <p className="mt-2 pl-7 text-sm leading-relaxed text-moss">{text}</p>
                </details>
                <div className="absolute right-0 top-4 flex h-6 items-center">
                  {key === "necessary" ? (
                    <span className="text-sm font-semibold text-forest-2">Always active</span>
                  ) : (
                    <label className="relative inline-flex cursor-pointer items-center">
                      <input
                        type="checkbox"
                        className="peer sr-only"
                        checked={choice[key]}
                        onChange={(e) => setChoice({ ...choice, [key]: e.target.checked })}
                        aria-label={`Allow ${label.toLowerCase()} cookies`}
                      />
                      <span className="h-6 w-11 rounded-full bg-forest/15 transition-colors duration-200 peer-checked:bg-red peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-red" />
                      <span className="absolute left-0.5 top-0.5 size-5 rounded-full bg-white shadow-sm transition-transform duration-200 ease-(--ease-out) peer-checked:translate-x-5" />
                    </label>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col-reverse items-stretch gap-3 border-t border-forest/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between md:px-7">
          <button onClick={() => save(choice)} className="text-[15px] font-semibold text-ink underline underline-offset-4 hover:text-red">
            {saved ? "Saved" : "Save my preferences"}
          </button>
          <div className="grid grid-cols-2 gap-3 sm:flex">
            <button onClick={() => save(NONE)} className="press rounded-full px-5 py-3 text-[15px] font-semibold ring-1 ring-forest/25 hover:bg-paper">
              Reject all
            </button>
            <button onClick={() => save(ALL)} className="press rounded-full bg-red px-5 py-3 text-[15px] font-semibold text-white hover:bg-red-deep">
              Accept all
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
