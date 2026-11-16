// Mobile Lighthouse run (default Moto G Power emulation + simulated slow 4G).
// Usage: scripts/with-server.sh node scripts/lighthouse.mjs
import fs from "node:fs";
import lighthouse from "lighthouse";
import { chromium } from "playwright";

const URL_ = process.env.BASE_URL ?? "http://localhost:3000";
const runs = Number(process.env.RUNS ?? 3);
fs.mkdirSync(".artifacts", { recursive: true });

const browser = await chromium.launch({ args: ["--no-sandbox", "--remote-debugging-port=9223"] });
const results = [];
for (let i = 0; i < runs; i++) {
  const r = await lighthouse(URL_, { port: 9223, output: "html", logLevel: "error" }, undefined);
  const c = r.lhr.categories;
  const score = (k) => Math.round((c[k]?.score ?? 0) * 100);
  const row = {
    performance: score("performance"),
    accessibility: score("accessibility"),
    "best-practices": score("best-practices"),
    seo: score("seo"),
    LCP: r.lhr.audits["largest-contentful-paint"].displayValue,
    CLS: r.lhr.audits["cumulative-layout-shift"].displayValue,
    TBT: r.lhr.audits["total-blocking-time"].displayValue,
    bytes: r.lhr.audits["total-byte-weight"].displayValue,
  };
  results.push(row);
  console.log(`run ${i + 1}`, JSON.stringify(row));
  if (i === runs - 1) {
    fs.writeFileSync(".artifacts/lighthouse-mobile.html", r.report);
    const fails = Object.values(r.lhr.audits)
      .filter((a) => a.score !== null && a.score < 0.9 && a.scoreDisplayMode !== "informative" && a.scoreDisplayMode !== "notApplicable")
      .map((a) => `${a.id}: ${a.title} ${a.displayValue ?? ""}`);
    console.log("Audits under 0.9:\n " + fails.join("\n "));
  }
}
await browser.close();
const med = (k) => results.map((r) => r[k]).sort((a, b) => a - b)[Math.floor(results.length / 2)];
console.log("median", { performance: med("performance"), accessibility: med("accessibility"), "best-practices": med("best-practices"), seo: med("seo") });
