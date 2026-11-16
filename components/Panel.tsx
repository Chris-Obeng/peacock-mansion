import Image from "next/image";
import { media } from "@/content/media.generated";
import type { SiteImage } from "@/content/site";
import { Moulding, type MouldingShape } from "./Moulding";

interface PanelProps {
  image: SiteImage;
  sizes: string;
  /** Frame aspect class, e.g. "aspect-[4/5] lg:aspect-[16/10]". Omit when the parent sets the height. */
  aspect?: string;
  shape?: MouldingShape;
  /** px: photo inset from the frame edge, and notch radius. */
  mat?: number;
  radius?: number;
  quality?: 55 | 65 | 75;
  preload?: boolean;
  decorative?: boolean;
  /** Scroll-driven drift of the photo inside the frame. */
  drift?: boolean;
  drawOn?: "view" | "mount";
  duration?: number;
  /** Line colour class for the moulding (gilt on plaster, gilt-light on dark). */
  lineClass?: string;
  className?: string;
  imgClassName?: string;
  children?: React.ReactNode;
}

/**
 * A photograph hung like a painting in the house's panelling: a mat of wall,
 * a drawn gilt moulding, and the photo cut with concave Louis XV corners
 * (or a round head, for the door-shaped frames).
 */
export function Panel({
  image,
  sizes,
  aspect,
  shape = "panel",
  mat = 12,
  radius = 16,
  quality = 65,
  preload = false,
  decorative = false,
  drift = false,
  drawOn = "view",
  duration,
  lineClass = "text-gilt",
  className = "",
  imgClassName = "",
  children,
}: PanelProps) {
  const m = media[image.slug];
  return (
    <div className={`${/\b(absolute|fixed)\b/.test(className) ? "" : "relative"} ${aspect ?? ""} ${className}`}>
      <div
        className={`absolute overflow-hidden bg-plaster-deep ${shape === "arch" ? "arched" : "notched"}`}
        style={{ inset: mat, ["--r" as string]: `${radius}px` }}
      >
        <Image
          src={m.src}
          alt={decorative ? "" : image.alt}
          fill
          sizes={sizes}
          quality={quality}
          placeholder="blur"
          blurDataURL={m.blurDataURL}
          preload={preload}
          loading={preload ? undefined : "lazy"}
          className={`object-cover ${drift ? "drift" : ""} ${imgClassName}`}
          style={{ objectPosition: image.position ?? "50% 50%" }}
        />
        {children}
      </div>
      <Moulding
        shape={shape}
        lines={[
          { inset: 0.5, radius: radius + mat - 1 },
          { inset: Math.max(mat - 7, 3), radius: radius + 6 },
        ]}
        drawOn={drawOn}
        duration={duration}
        className={lineClass}
      />
    </div>
  );
}
