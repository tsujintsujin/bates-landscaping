import { FACTS, FAQ_ITEMS, PRICES } from "@/lib/knowledge";

// Chat assistant. The browser only talks to this route (same origin, so justin94.space's CSP is fine); this route calls
// the Cloudflare Worker in chat-worker/, which runs Workers AI through its AI binding.
// Env (Vercel project settings, never the repo; copy in Credentials/Bates/chat.env): BATES_CHAT_URL, BATES_CHAT_KEY.
// Each request carries the company facts, the price table and only the FAQs that match the question (keyword overlap),
// so the model isn't drowning in 55 answers and the free Workers AI allowance stretches further.
// ponytail: no rate limiting; the free daily allowance is the cap, and errors fall back to the phone number.

const FALLBACK = "Sorry, I can't answer that right now. Please call us at (484) 443-8772 or email info@bateslandscaping.net.";

const STOP = new Set(
  "a an the and or but if of to in on at for with by from is are was were be been do does did can could would should will i you we us our your my me it its this that these those what whats how when where who why which there their they them about any some much many more most just like maybe get got have has had not no yes so than then too very also into out up over under again please thanks hi hello hey".split(
    " ",
  ),
);
const stem = (w: string) => w.replace(/(ing|ings|ed|es|s)$/, "");
const terms = (text: string) =>
  new Set(
    text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter((w) => w.length > 2 && !STOP.has(w))
      .map(stem),
  );

function relevantFaqs(question: string, n = 6) {
  const q = terms(question);
  return FAQ_ITEMS.map((f) => {
    const qt = terms(f.q);
    const at = terms(f.a);
    let score = 0;
    for (const w of q) score += (qt.has(w) ? 3 : 0) + (at.has(w) ? 1 : 0);
    return { f, score };
  })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, n)
    .map(({ f }) => `Q: ${f.q}\nA: ${f.a}`)
    .join("\n\n");
}

const RULES = `You are the chat assistant on the Bates Landscaping website (Southeastern Pennsylvania). You speak for the Bates
team: say "we" and "us".

How to answer:
- Answer the question that was asked, directly, using the facts, prices and FAQs below. Give the useful detail (what we
  do, how it works, how long, which areas) rather than deflecting.
- Yes/no questions: start with yes or no. Check "WE DO NOT OFFER" first; if it's there, say so plainly and, if the facts
  give one, say what we suggest instead.
- 1-3 short sentences, friendly and plain. No markdown or lists.
- Prices: never quote a price for the visitor's own job. If they ask about cost, share the matching lines from PRICE
  EXAMPLES exactly as written, as past examples, and say an exact price needs a look at the property. If there's no
  matching line, just say so.
- Only suggest booking a consultation or calling when the visitor asks for a price or estimate, asks how to get
  started, or the information below truly doesn't cover the question. Don't end every answer with a sales line.
- Never invent anything that isn't below: no prices, schedules, availability, hours, discounts, guarantees, team details.
- Off-topic (not landscaping or Bates): reply exactly "I can only help with landscaping and Bates Landscaping questions."
- If the visitor writes in Spanish, answer in Spanish. Use a plain hyphen, never long dashes.

Sound like a real person from the Bates office typing a quick reply, not like an AI:
- Contractions (we're, don't, it's). Mix sentence lengths: a short one, then a longer one. A fragment is fine ("Yep, we do.").
- Start with the answer itself. Don't repeat the question back, don't open with "Great question", don't end with a summary.
- Plain everyday words. Never use: "I'd be happy to", "feel free", "don't hesitate", "additionally", "furthermore",
  "it's important to note", "ensure", "comprehensive", "tailored", "wide range", "seamless", "enhance", "delve".
- A little warmth or personality is good (e.g. "bamboo's a stubborn one"), but keep every fact exactly as given.`;

type Msg = { role: "user" | "assistant"; content: string };

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Bad request" }, { status: 400 });
  }
  const raw = (body as { messages?: unknown })?.messages;
  const messages: Msg[] = (Array.isArray(raw) ? raw : [])
    .filter(
      (m): m is Msg =>
        !!m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string" && m.content.trim() !== "",
    )
    .slice(-8)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 600) }));
  if (!messages.length || messages[messages.length - 1].role !== "user") {
    return Response.json({ error: "Bad request" }, { status: 400 });
  }

  const url = process.env.BATES_CHAT_URL;
  const key = process.env.BATES_CHAT_KEY;
  if (!url || !key) return Response.json({ reply: FALLBACK }, { status: 503 });

  // Match FAQs on the latest question plus the previous one (follow-ups like "and for commercial?").
  const userTurns = messages.filter((m) => m.role === "user").map((m) => m.content);
  const faqs = relevantFaqs(userTurns.slice(-2).join(" "));
  const system = `${RULES}\n\nFACTS\n${FACTS}\n\nPRICE EXAMPLES FROM PAST PROJECTS\n${PRICES}\n\nRELEVANT FAQS (Bates's own answers)\n${faqs || "(none matched)"}`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "x-bates-key": key, "Content-Type": "application/json" },
      body: JSON.stringify({ messages: [{ role: "system", content: system }, ...messages] }),
      signal: AbortSignal.timeout(25000),
    });
    const data = (await res.json().catch(() => null)) as { response?: string } | null;
    const reply = data?.response?.trim();
    if (!res.ok || !reply) return Response.json({ reply: FALLBACK }, { status: 502 });
    return Response.json({ reply: reply.replace(/[–—]/g, "-") });
  } catch {
    return Response.json({ reply: FALLBACK }, { status: 504 });
  }
}
