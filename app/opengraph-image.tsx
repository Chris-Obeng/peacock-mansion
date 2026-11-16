import fs from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import sharp from "sharp";
import { site } from "@/content/site";

export const alt = "The three-tier fountain at dusk in front of The Peacock Mansion, Kumasi, Ghana.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const root = process.cwd();
  const [photo, regular, italic, sans] = await Promise.all([
    sharp(path.join(root, "public/media/images/fountain-dusk.jpg"))
      .resize(1200, 630, { fit: "cover", position: "left" })
      .jpeg({ quality: 78 })
      .toBuffer(),
    fs.readFile(path.join(root, "assets/fonts/BodoniModa-Regular.ttf")),
    fs.readFile(path.join(root, "assets/fonts/BodoniModa-Italic.ttf")),
    fs.readFile(path.join(root, "assets/fonts/Jost-Medium.ttf")),
  ]);
  const bg = `data:image/jpeg;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#16140f" }}>
        <img src={bg} width={1200} height={630} alt="" style={{ position: "absolute", inset: 0, objectFit: "cover" }} />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(22,20,15,0.85) 0%, rgba(22,20,15,0.35) 45%, rgba(22,20,15,0) 70%)",
          }}
        />
        <div style={{ position: "absolute", left: 64, bottom: 56, display: "flex", flexDirection: "column", color: "#f4efe6" }}>
          <div style={{ fontFamily: "Jost", fontSize: 18, letterSpacing: 5, color: "#c9a86a", textTransform: "uppercase" }}>
            Kumasi · Ghana
          </div>
          <div style={{ fontFamily: "Bodoni", fontSize: 104, lineHeight: 0.95, marginTop: 18, display: "flex" }}>The Peacock</div>
          <div style={{ fontFamily: "Bodoni", fontStyle: "italic", fontSize: 104, lineHeight: 0.95, display: "flex" }}>Mansion</div>
          <div style={{ fontFamily: "Jost", fontSize: 22, marginTop: 22, color: "rgba(244,239,230,0.9)", maxWidth: 640 }}>
            {site.hero.line}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Bodoni", data: regular, style: "normal", weight: 400 },
        { name: "Bodoni", data: italic, style: "italic", weight: 400 },
        { name: "Jost", data: sans, style: "normal", weight: 500 },
      ],
    },
  );
}
