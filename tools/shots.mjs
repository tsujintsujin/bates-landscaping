// Clean page screenshots from headless Chrome, at exact desktop and phone widths.
//
// Why this exists: Justin's Chrome window (the one the Claude-in-Chrome tools drive) is usually maximized and
// behind his other windows. Maximized = resize_window is ignored (no real 390px test). Hidden = document.hidden
// is true, so smooth scrolling, IntersectionObserver callbacks and lazy images stall, and screenshots come out
// stale or torn (a blank band above the header). This script sidesteps both. Use Chrome MCP for clicking and
// reading the live page; use this for proof images.
//
// Usage (dev server must be running):
//   node tools/shots.mjs <outDir> [path=/]
// Writes <outDir>/desktop-NN.jpg (1440x900) and mobile-NN.jpg (390x844 @2x), one per ~viewport of scroll,
// and prints innerWidth vs scrollWidth for each (equal = no horizontal overflow).
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const OUT = resolve(process.argv[2] ?? "shots");
const URL = "http://localhost:3012" + (process.argv[3] ?? "/");
mkdirSync(OUT, { recursive: true });

const chrome = spawn("C:/Program Files/Google/Chrome/Application/chrome.exe", [
  "--headless=new",
  "--remote-debugging-port=9333",
  `--user-data-dir=${OUT}/.profile`,
  "--hide-scrollbars",
  "about:blank",
]);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
await sleep(2500);

const targets = await (await fetch("http://127.0.0.1:9333/json")).json();
const ws = new WebSocket(targets.find((t) => t.type === "page").webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));
let id = 0;
const pending = new Map();
ws.onmessage = (m) => {
  const d = JSON.parse(m.data);
  pending.get(d.id)?.(d.result);
  pending.delete(d.id);
};
const send = (method, params = {}) =>
  new Promise((r) => {
    pending.set(++id, r);
    ws.send(JSON.stringify({ id, method, params }));
  });
const evalJs = async (expr) =>
  (await send("Runtime.evaluate", { expression: expr, awaitPromise: true, returnByValue: true })).result.value;

for (const [name, w, h, mobile] of [
  ["desktop", 1440, 900, false],
  ["mobile", 390, 844, true],
]) {
  await send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: mobile ? 2 : 1, mobile });
  await send("Page.navigate", { url: URL });
  await sleep(4000);
  const total = await evalJs("document.documentElement.scrollHeight");
  console.log(name, "innerWidth", await evalJs("innerWidth"), "scrollWidth", await evalJs("document.documentElement.scrollWidth"), "pageHeight", total);
  let i = 0;
  for (let y = 0; y < total; y += Math.round(h * 0.9)) {
    await evalJs(`scrollTo(0, ${y})`);
    await sleep(1400); // let lazy images and scroll-scrubbed animations settle
    const { data } = await send("Page.captureScreenshot", { format: "jpeg", quality: 80 });
    writeFileSync(`${OUT}/${name}-${String(i++).padStart(2, "0")}.jpg`, Buffer.from(data, "base64"));
  }
}

ws.close();
chrome.kill();
process.exit(0);
