// POST { messages: [{ role, content }] } with header "x-bates-key" → { response }.
// The system prompt and message limits live in the site's route; this only runs the model.
interface Env {
  AI: { run(model: string, input: unknown): Promise<{ response?: string }> };
  BATES_KEY: string;
}

const MODEL = "@cf/meta/llama-3.3-70b-instruct-fp8-fast";

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });
    if (!env.BATES_KEY || req.headers.get("x-bates-key") !== env.BATES_KEY) return new Response("Forbidden", { status: 403 });
    let body: { messages?: unknown };
    try {
      body = await req.json();
    } catch {
      return new Response("Bad request", { status: 400 });
    }
    if (!Array.isArray(body.messages) || body.messages.length === 0 || body.messages.length > 12) {
      return new Response("Bad request", { status: 400 });
    }
    try {
      const out = await env.AI.run(MODEL, { messages: body.messages, max_tokens: 300, temperature: 0.3 });
      return Response.json({ response: out.response ?? "" });
    } catch (e) {
      return Response.json({ error: String(e) }, { status: 502 });
    }
  },
};
