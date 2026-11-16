// Loads the page on several devices, opens the lightbox, and asserts every image
// response is under the 300 KB display budget. Usage: scripts/with-server.sh node scripts/check-image-weights.mjs
import { chromium } from "playwright";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const LIMIT = 300 * 1024;
const devices = [
  { name: "phone 390 @3x", viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true },
  { name: "tablet 768 @2x", viewport: { width: 768, height: 1024 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
  { name: "desktop 1440 @2x", viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 },
  { name: "desktop 1920 @1x", viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 },
];

const browser = await chromium.launch({ args: ["--no-sandbox"] });
let over = 0;
for (const d of devices) {
  const ctx = await browser.newContext({ ...d, reducedMotion: "reduce" });
  const page = await ctx.newPage();
  const sizes = [];
  page.on("response", async (res) => {
    if (!["image", "media"].includes(res.request().resourceType()) || res.url().startsWith("data:") || res.url().endsWith(".mp4") || res.url().includes(".mp4?")) return;
    try {
      const body = await res.body();
      sizes.push({ url: decodeURIComponent(res.url().replace(BASE, "")), bytes: body.length, type: res.headers()["content-type"] });
    } catch {}
  });
  await page.goto(BASE, { waitUntil: "networkidle" });
  const h = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < h; y += 600) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await page.waitForTimeout(80);
  }
  await page.goto(BASE + "/gallery", { waitUntil: "networkidle" });
  for (let y = 0; y < 9000; y += 600) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await page.waitForTimeout(60);
  }
  await page.locator("main li button").first().click();
  await page.waitForTimeout(800);
  await page.keyboard.press("ArrowRight");
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(500);
  const max = sizes.reduce((a, b) => (b.bytes > a.bytes ? b : a), { bytes: 0 });
  const bad = sizes.filter((s) => s.bytes > LIMIT);
  over += bad.length;
  const total = sizes.reduce((a, s) => a + s.bytes, 0);
  const types = [...new Set(sizes.map((s) => s.type))].join(", ");
  console.log(`${d.name}: ${sizes.length} images, ${(total / 1024).toFixed(0)} KB total, largest ${(max.bytes / 1024).toFixed(0)} KB (${max.url?.slice(0, 70)}), types: ${types}`);
  for (const b of bad) console.log(`  OVER: ${(b.bytes / 1024).toFixed(0)} KB ${b.url}`);
  await ctx.close();
}
await browser.close();
console.log(over ? `${over} image(s) over budget` : "All images under 300 KB");
process.exit(over ? 1 : 0);
