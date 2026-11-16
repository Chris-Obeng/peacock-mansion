import fs from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import sharp from "sharp";
import { site } from "@/content/site";

export const alt = "The Peacock Mansion, Kumasi: the three-tier fountain at dusk hung in a gilt-moulded panel.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Concave-corner panel path (Louis XV moulding) for the share card. */
function panel(x0: number, y0: number, x1: number, y1: number, k: number) {
  return `M${x0 + k},${y0} L${x1 - k},${y0} A${k},${k} 0 0 0 ${x1},${y0 + k} L${x1},${y1 - k} A${k},${k} 0 0 0 ${x1 - k},${y1} L${x0 + k},${y1} A${k},${k} 0 0 0 ${x0},${y1 - k} L${x0},${y0 + k} A${k},${k} 0 0 0 ${x0 + k},${y0} Z`;
}

export default async function OpengraphImage() {
  const root = process.cwd();
  const W = 600;
  const H = 520;
  const R = 26;
  const mask = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><path d="${panel(0, 0, W, H, R)}" fill="#fff"/></svg>`);
  const [photo, light, italic, sans] = await Promise.all([
    sharp(path.join(root, "public/media/images/fountain-dusk.jpg"))
      .resize(W, H, { fit: "cover", position: "left" })
      .composite([{ input: mask, blend: "dest-in" }])
      .png()
      .toBuffer(),
    fs.readFile(path.join(root, "assets/fonts/Zodiak-Light.ttf")),
    fs.readFile(path.join(root, "assets/fonts/Zodiak-LightItalic.ttf")),
    fs.readFile(path.join(root, "assets/fonts/Switzer-Regular.ttf")),
  ]);
  const src = `data:image/png;base64,${photo.toString("base64")}`;
  const px = 560;
  const py = 55;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#edeeea" }}>
        <img src={src} width={W} height={H} alt="" style={{ position: "absolute", left: px, top: py }} />
        <svg width="1200" height="630" style={{ position: "absolute", left: 0, top: 0 }}>
          <path d={panel(px - 13, py - 13, px + W + 13, py + H + 13, R + 12)} fill="none" stroke="#a9884e" strokeWidth="1.5" />
          <path d={panel(px - 7, py - 7, px + W + 7, py + H + 7, R + 6)} fill="none" stroke="#a9884e" strokeWidth="0.8" opacity="0.75" />
        </svg>
        <div style={{ position: "absolute", left: 64, top: 120, width: 440, display: "flex", flexDirection: "column", color: "#161b1c" }}>
          <div style={{ fontFamily: "Zodiak", fontSize: 92, lineHeight: 0.95, letterSpacing: -2, display: "flex" }}>The Peacock</div>
          <div style={{ fontFamily: "Zodiak", fontStyle: "italic", fontSize: 92, lineHeight: 0.95, letterSpacing: -2, display: "flex" }}>Mansion</div>
          <div style={{ fontFamily: "Switzer", fontSize: 24, lineHeight: 1.45, marginTop: 34, color: "#4e5654", display: "flex" }}>
            {site.hero.line}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Zodiak", data: light, style: "normal", weight: 300 },
        { name: "Zodiak", data: italic, style: "italic", weight: 300 },
        { name: "Switzer", data: sans, style: "normal", weight: 400 },
      ],
    },
  );
}
