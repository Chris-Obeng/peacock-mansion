// Builds the hero reel from the owner's two hero films:
//   K = "A King and his Queen in beautiful kente" [7646124566938504470]
//   O = "Another Peacock Mansion love story! Okatakyie & his Queen" [7700613218561068311]
// Output (silent, looping): wide 1600x720 for landscape screens, tall 540x960 for phones,
// plus a poster JPEG for each. Usage: FFMPEG=/path/to/ffmpeg node scripts/hero-reel.mjs
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const FF = process.env.FFMPEG ?? "ffmpeg";
const SRC = path.resolve("media-source/videos");
const OUT = path.resolve(process.env.OUT ?? ".media-build/hero");
fs.mkdirSync(OUT, { recursive: true });

const file = (id) => {
  const f = fs.readdirSync(SRC).find((n) => n.includes(`[${id}]`));
  if (!f) throw new Error(`missing source video ${id}`);
  return path.join(SRC, f);
};
const K = { file: file("7646124566938504470"), y: 108, fps: 24, speed: 1 };
const O = { file: file("7700613218561068311"), y: 108, fps: 30, speed: 1.25 }; // 30 fps played at 24 = gentle slow motion

// [source, start s, end s, portrait crop centre 0..1]
export const segments = [
  [K, 6.7, 8.0, 0.6], //   bride in kente with a fan
  [K, 0.05, 1.6, 0.42], // the façade from below
  [O, 1.15, 2.15, 0.5], // the fountain garden
  [O, 2.35, 3.25, 0.46], // above the fountain
  [O, 3.4, 4.3, 0.45], //  couple in the salon
  [K, 5.55, 6.55, 0.42], // gold on kente
  [O, 31.25, 32.4, 0.6], // couple by the lanterns
  [K, 14.1, 15.9, 0.45], // the bride, close
  [O, 44.25, 45.8, 0.55], // bride with a fan on the lawn
  [K, 8.15, 9.15, 0.72], // an embrace
  [K, 54.0, 56.5, 0.47], // the kiss behind the fan
  [K, 62.5, 64.6, 0.45], // the veil
];

const H = 864; // active picture height after removing letterbox (1920x864)
const TALL_W = Math.round((H * 9) / 16 / 2) * 2; // 486

function render(kind) {
  const parts = segments.map(([s, , , cx], i) => {
    const crop =
      kind === "wide"
        ? `crop=1920:${H}:0:${s.y},scale=1600:720:flags=lanczos`
        : `crop=${TALL_W}:${H}:${Math.max(0, Math.min(1920 - TALL_W, Math.round(cx * 1920 - TALL_W / 2)))}:${s.y},scale=540:960:flags=lanczos,unsharp=5:5:0.6`;
    return `[${i}:v]${crop},setpts=${s.speed}*(PTS-STARTPTS),fps=24,format=yuv420p,setsar=1[v${i}]`;
  });
  const inputs = segments.flatMap(([s, a, b]) => ["-ss", String(a), "-t", String(b - a), "-i", s.file]);
  const graph = `${parts.join(";")};${segments.map((_, i) => `[v${i}]`).join("")}concat=n=${segments.length}:v=1:a=0,fade=t=in:st=0:d=0.6[out]`;
  const out = path.join(OUT, `hero-${kind}.mp4`);
  execFileSync(FF, [
    "-y", "-hide_banner", "-loglevel", "error", ...inputs,
    "-filter_complex", graph, "-map", "[out]", "-an",
    "-c:v", "libx264", "-profile:v", "high", "-preset", "slow",
    "-crf", kind === "wide" ? "24" : "25", "-maxrate", kind === "wide" ? "1800k" : "1000k", "-bufsize", "3600k",
    "-movflags", "+faststart", out,
  ]);
  // Poster: a frame from the first shot, after the fade-in.
  execFileSync(FF, ["-y", "-hide_banner", "-loglevel", "error", "-ss", "0.9", "-i", out, "-frames:v", "1", "-q:v", "3", path.join(OUT, `hero-${kind}-poster.jpg`)]);
  const mb = (fs.statSync(out).size / 1048576).toFixed(2);
  console.log(`${kind}: ${out} ${mb} MB`);
}

render("wide");
render("tall");
const total = segments.reduce((t, [s, a, b]) => t + (b - a) * s.speed, 0);
console.log(`reel length ${total.toFixed(1)} s`);
