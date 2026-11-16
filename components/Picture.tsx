import Image from "next/image";
import { media } from "@/content/media.generated";
import type { SiteImage } from "@/content/site";

interface PictureProps {
  image: SiteImage;
  /** Responsive sizes hint; keeps transferred bytes under budget. */
  sizes: string;
  className?: string;
  imgClassName?: string;
  /** Aspect ratio of the frame, e.g. "4 / 5". Omit to use the photo's own ratio. */
  aspect?: string;
  /** Responsive aspect classes (e.g. "aspect-[3/4] lg:aspect-[4/3]"); overrides `aspect`. */
  aspectClass?: string;
  quality?: 55 | 65 | 75;
  preload?: boolean;
  /** Hide from assistive tech when the same photo is described nearby. */
  decorative?: boolean;
}

/** A framed, cropped photograph with a blur placeholder. Lazy unless preloaded. */
export function Picture({
  image,
  sizes,
  className = "",
  imgClassName = "",
  aspect,
  aspectClass,
  quality = 65,
  preload = false,
  decorative = false,
}: PictureProps) {
  const m = media[image.slug];
  return (
    <div
      className={`relative overflow-hidden bg-stone ${aspectClass ?? ""} ${className}`}
      style={aspectClass ? undefined : { aspectRatio: aspect ?? `${m.width} / ${m.height}` }}
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
        className={`object-cover ${imgClassName}`}
        style={{ objectPosition: image.position ?? "50% 50%" }}
      />
    </div>
  );
}
