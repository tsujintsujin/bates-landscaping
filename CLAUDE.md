# CLAUDE.md — Bates Landscaping remodel (pitch demo)

Demo remodel of bateslandscaping.co that Justin uses to apply for a job at Bates. Homepage built; other pages next.

**Before doing anything, read `HANDOFF.md`** (status, decisions, traps, how to verify here), then `DESIGN.md`
(design system as built) and `PRODUCT.md` (product truth). `NOTES.md` is the decision log: append every decision
Justin makes.

Fast facts:
- App in `site/` (Next.js 16 + Tailwind v4 + GSAP). Dev server: launch config `bates`, **port 3012**.
- Repo: `tsujintsujin/bates-landscaping` (private). Never edit on `main`; branch, PR, merge.
- "Discuss" / "check with me" = talk only, no building. Offer design skills; don't auto-run skills he didn't name.
- Every internal link is intercepted by `SoonToast` until its page is built; allow-list new routes (HANDOFF §7.1).
- Justin's Chrome is maximized and often hidden: use the iframe trick or `tools/shots.mjs` for phone-width checks
  and proof screenshots (HANDOFF §8).
