// Visual + layout verification. Usage: npm run build && npm start, then `npm run shots`.
// Writes full-page screenshots to .artifacts/shots and prints overflow, tap-target,
// word-count and lightbox-keyboard checks. Exits non-zero on failure.
import fs from "node:fs";
import { chromium } from "playwright";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const OUT = ".artifacts/shots";
fs.mkdirSync(OUT, { recursive: true });

const viewports = [
  { name: "360", width: 360, height: 780, mobile: true },
  { name: "375", width: 375, height: 812, mobile: true },
  { name: "390", width: 390, height: 844, mobile: true },
  { name: "430", width: 430, height: 932, mobile: true },
  { name: "landscape-844", width: 844, height: 390, mobile: true },
  { name: "768", width: 768, height: 1024, mobile: true },
  { name: "1024", width: 1024, height: 768 },
  { name: "1280", width: 1280, height: 800 },
  { name: "1440", width: 1440, height: 900 },
  { name: "1920", width: 1920, height: 1080 },
  { name: "2560", width: 2560, height: 1440 },
];
const only = process.argv[2]?.split(",");
let failures = 0;

const browser = await chromium.launch({ args: ["--no-sandbox"] });

for (const vp of viewports.filter((v) => !only || only.includes(v.name))) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1,
    isMobile: Boolean(vp.mobile),
    hasTouch: Boolean(vp.mobile),
    reducedMotion: "reduce", // settle reveals for stable full-page screenshots
  });
  const page = await ctx.newPage();
  await page.goto(BASE, { waitUntil: "networkidle" });
  // Full-page capture does not trigger content-visibility rendering; force it for the screenshot only.
  await page.addStyleTag({ content: ".cv-auto{content-visibility:visible!important}" });
  // Walk the page so lazy images and in-view reveals resolve.
  const h = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < h; y += Math.round(vp.height * 0.7)) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await page.waitForTimeout(120);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(400);

  const report = await page.evaluate(() => {
    const docW = document.documentElement.scrollWidth;
    const small = [];
    for (const el of document.querySelectorAll("a, button, input, select, textarea")) {
      const r = el.getBoundingClientRect();
      const s = getComputedStyle(el);
      if (s.display === "none" || s.visibility === "hidden" || r.width === 0) continue;
      if (el.closest("[inert]") || el.closest("dialog:not([open])")) continue;
      if (el.matches('a[href="#main"]')) continue; // skip link is off-screen until focused
      if (r.height < 44 || r.width < 44) small.push(`${el.tagName.toLowerCase()} "${(el.textContent || el.getAttribute("aria-label") || "").trim().slice(0, 30)}" ${Math.round(r.width)}x${Math.round(r.height)}`);
    }
    const clipped = [];
    for (const el of document.querySelectorAll("header a, header button, main h1, main h2, main p, main a, main button")) {
      const r = el.getBoundingClientRect();
      if (r.width === 0 || el.closest("#films ul, [role=tablist], [role=group]")) continue; // the film track scrolls sideways by design
      if (r.right > window.innerWidth + 0.5 || r.left < -0.5) clipped.push(`${el.tagName.toLowerCase()} "${(el.textContent || "").trim().slice(0, 24)}" ${Math.round(r.left)}..${Math.round(r.right)}`);
    }
    return { docW, winW: window.innerWidth, small, clipped };
  });
  const overflow = report.docW > report.winW || report.clipped.length > 0;
  if (overflow || report.small.length) failures++;
  if (report.clipped.length) console.log("  clipped at edge:", report.clipped);
  console.log(`\n[${vp.name}] scrollWidth ${report.docW} / viewport ${report.winW} ${overflow ? "OVERFLOW" : "ok"}`);
  if (report.small.length) console.log("  small tap targets:", report.small);

  await page.screenshot({ path: `${OUT}/${vp.name}-full.jpg`, fullPage: true, type: "jpeg", quality: 70 });
  if (["375", "1440"].includes(vp.name)) {
    await page.goto(BASE + "/gallery", { waitUntil: "networkidle" });
    for (let y = 0; y < 9000; y += 700) { await page.evaluate((yy) => window.scrollTo(0, yy), y); await page.waitForTimeout(80); }
    await page.evaluate(() => window.scrollTo(0, 0)); await page.waitForTimeout(400);
    const gw = await page.evaluate(() => document.documentElement.scrollWidth);
    if (gw > vp.width) { failures++; console.log("  gallery OVERFLOW", gw); }
    await page.screenshot({ path: `${OUT}/${vp.name}-gallery.jpg`, fullPage: true, type: "jpeg", quality: 70 });
    await page.goto(BASE, { waitUntil: "networkidle" });
  }
  await page.screenshot({ path: `${OUT}/${vp.name}-hero.jpg`, type: "jpeg", quality: 75 });
  await ctx.close();
}

// Word count of visible copy (excludes alt text and the form's own labels/hints/legal line).
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 }, reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto(BASE, { waitUntil: "networkidle" });
  const words = await page.evaluate(() => {
    const clone = document.body.cloneNode(true);
    clone.querySelectorAll("script, style, dialog, form, [aria-hidden='true'], a[href='#main'], .md\\:hidden").forEach((n) => n.remove());
    const text = clone.innerText || clone.textContent || "";
    return text.split(/\s+/).filter((w) => /[A-Za-z0-9]/.test(w)).length;
  });
  console.log(`\nVisible words (excluding form and alt text): ${words} ${words <= 700 ? "ok" : "OVER BUDGET"}`);
  if (words > 700) failures++;

  // Lightbox keyboard test, on the gallery page.
  await page.goto(BASE + "/gallery", { waitUntil: "networkidle" });
  const thumb = page.locator("main li button").nth(3);
  await thumb.scrollIntoViewIfNeeded();
  await thumb.focus();
  await page.keyboard.press("Enter");
  await page.waitForSelector("dialog.lightbox[open]");
  const pos1 = await page.locator("dialog.lightbox [aria-live]").innerText();
  await page.keyboard.press("ArrowRight");
  const pos2 = await page.locator("dialog.lightbox [aria-live]").innerText();
  await page.keyboard.press("Tab");
  const focusInside = await page.evaluate(() => Boolean(document.activeElement?.closest("dialog.lightbox")));
  await page.waitForFunction(() => {
    const img = document.querySelector("dialog.lightbox[open] img[alt]:not([alt=''])");
    return img && img.complete && img.naturalWidth > 0;
  });
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${OUT}/lightbox-1280.jpg`, type: "jpeg", quality: 75 });
  await page.keyboard.press("Escape");
  await page.waitForTimeout(100);
  const closed = await page.evaluate(() => !document.querySelector("dialog.lightbox[open]"));
  const focusBack = await page.evaluate(() => document.activeElement?.getAttribute("aria-label")?.slice(0, 40));
  const ok = /\b4 of/.test(pos1) && /\b5 of/.test(pos2) && focusInside && closed && /photograph 5 of/.test(focusBack ?? "");
  console.log(`Lightbox keyboard: open "${pos1.replace(/\s+/g, " ")}" -> next "${pos2.replace(/\s+/g, " ")}", focus trapped ${focusInside}, closed ${closed}, focus returned to "${focusBack}" ${ok ? "ok" : "FAIL"}`);
  if (!ok) failures++;

  // WhatsApp form test: intercept window.open.
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.evaluate(() => {
    window.__opened = null;
    window.open = (u) => {
      window.__opened = u;
      return {};
    };
  });
  await page.locator("#enquire button[type=submit]").click();
  const errs = await page.locator("#enquire [aria-invalid=true]").count();
  await page.locator("#enquire input[name=name]").fill("Ama Mensah");
  await page.locator("#enquire input[name=guests]").fill("40");
  await page.locator("#enquire select[name=occasion]").selectOption("Traditional wedding");
  await page.locator("#enquire button[type=submit]").click();
  const opened = await page.evaluate(() => window.__opened);
  const msg = opened ? decodeURIComponent(new URL(opened).searchParams.get("text") ?? "") : "";
  const formOk = errs === 3 && opened?.startsWith("https://wa.me/233596112287?text=") && msg.includes("Ama Mensah") && msg.includes("Not fixed yet");
  console.log(`Form: ${errs} errors on empty submit; opened ${opened?.slice(0, 40)}… ${formOk ? "ok" : "FAIL"}\n${msg}`);
  if (!formOk) failures++;

  // Film: one at a time.
  const items = page.locator("#films ul > li");
  const before = await page.locator("#films iframe").count();
  await items.nth(0).locator("button").click();
  await items.nth(1).locator("button").click();
  const iframes = await page.locator("#films iframe").count();
  const firstReset = (await items.nth(0).locator("button").count()) === 1;
  const filmOk = before === 0 && iframes === 1 && firstReset;
  console.log(`Film: ${before} iframes before tap, ${iframes} after opening two, first reset to facade ${firstReset} ${filmOk ? "ok" : "FAIL"}`);
  if (!filmOk) failures++;
  await ctx.close();
}

await browser.close();
console.log(failures ? `\n${failures} check(s) failed` : "\nAll checks passed");
process.exit(failures ? 1 : 0);
