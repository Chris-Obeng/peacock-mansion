// Downloads the full-resolution listing photos named in media-manifest.mjs into .media-src/.
// Run once: `npm run media:fetch`. Files are git-ignored; the processed results in
// public/media/images are committed.
import fs from "node:fs";
import path from "node:path";
import { manifest } from "./media-manifest.mjs";

const dir = path.resolve(".media-src");
fs.mkdirSync(dir, { recursive: true });

const unique = new Map();
for (const m of manifest) unique.set(m.from ?? m.slug, m.source);

for (const [slug, url] of unique) {
  const file = path.join(dir, `${slug}.jpg`);
  if (fs.existsSync(file)) {
    console.log("skip", slug);
    continue;
  }
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${slug}: HTTP ${res.status} for ${url}`);
  fs.writeFileSync(file, Buffer.from(await res.arrayBuffer()));
  console.log("got ", slug);
}
