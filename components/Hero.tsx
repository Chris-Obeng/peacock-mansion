import fs from "node:fs";
import path from "node:path";
import { getImageProps } from "next/image";
import { media, site } from "@/content/site";
import { DatePlaque } from "./DatePlaque";
import { HeroVideo } from "./HeroVideo";
import { Moulding } from "./Moulding";

/** Checked at build time: the film slot renders only once the owner adds the files. */
function videoFiles() {
  const pub = path.join(process.cwd(), "public");
  const has = (p: string) => fs.existsSync(path.join(pub, p));
  const v = site.hero.video;
  return {
    mp4: has(v.mp4) ? v.mp4 : undefined,
    webm: has(v.webm) ? v.webm : undefined,
    poster: has(v.poster) ? v.poster : undefined,
  };
}

const PORTRAIT = "(max-aspect-ratio: 1/1)";
const LANDSCAPE = "(min-aspect-ratio: 1/1)";
const PORTRAIT_SIZES = "(min-width: 768px) 80vw, 92vw";
const LANDSCAPE_SIZES = "(min-width: 1280px) 88vw, 94vw";
const MAT = 14;
const R = 26;

/**
 * First viewport: the name set like an inscription on the frieze, the fountain
 * hung below it in a Louis XV panel, and a lacquer plaque with a working date field.
 */
export function Hero() {
  const { image, portrait, nameLines, line } = site.hero;
  const wide = media[image.slug];
  const tall = media[portrait.slug];
  const video = videoFiles();
  const hasVideo = Boolean(video.mp4 || video.webm);

  const common = { alt: image.alt, fill: true, quality: 60 } as const;
  const { props: wideProps } = getImageProps({ ...common, src: wide.src, sizes: LANDSCAPE_SIZES });
  const { props: tallProps } = getImageProps({ ...common, src: tall.src, sizes: PORTRAIT_SIZES });
  const { style: _style, ...imgProps } = wideProps;
  void _style;

  return (
    <section
      id="top"
      aria-label={site.name}
      className="relative flex min-h-[100svh] flex-col bg-plaster pt-[calc(4rem+env(safe-area-inset-top))] md:pt-[calc(4.5rem+env(safe-area-inset-top))]"
    >
      <span id="top-sentinel" aria-hidden className="absolute inset-x-0 top-0 h-2" />
      <link rel="preload" as="image" media={PORTRAIT} imageSrcSet={tallProps.srcSet} imageSizes={PORTRAIT_SIZES} fetchPriority="high" />
      <link rel="preload" as="image" media={LANDSCAPE} imageSrcSet={wideProps.srcSet} imageSizes={LANDSCAPE_SIZES} fetchPriority="high" />

      <div className="px-page mx-auto flex w-full max-w-[1720px] flex-1 flex-col">
        <header className="pt-5 text-center md:pt-6 lg:pt-4">
          <h1 className="inscription text-[clamp(2.75rem,14vw,5.25rem)] md:whitespace-nowrap md:text-[clamp(4rem,min(7.4vw,14svh),9.5rem)]">
            <span className="block md:inline">{nameLines[0]}</span> <span className="block md:inline">{nameLines[1]}</span>
          </h1>
          <p className="mx-auto mt-4 max-w-[34ch] text-[0.9375rem] leading-relaxed text-ink-soft md:mt-5 md:max-w-[52ch] md:text-base">
            {line}
          </p>
        </header>

        <div className="relative mt-6 flex min-h-[19rem] flex-1 flex-col pb-[calc(2.25rem+env(safe-area-inset-bottom))] md:mt-8 md:pb-14 landscape:min-h-[15rem]">
          <div className="relative min-h-0 flex-1">
            <div className="notched absolute overflow-hidden bg-lacquer" style={{ inset: MAT, ["--r" as string]: `${R}px` }}>
              <picture>
                <source media={PORTRAIT} srcSet={tallProps.srcSet} sizes={PORTRAIT_SIZES} />
                <img
                  {...imgProps}
                  alt={image.alt}
                  fetchPriority="high"
                  loading="eager"
                  decoding="async"
                  className="drift absolute inset-0 h-full w-full object-cover"
                  style={{ objectPosition: image.position }}
                />
              </picture>
              {hasVideo && <HeroVideo {...video} position={image.position} />}
            </div>
            <Moulding lines={[{ inset: 0.5, radius: R + 10 }, { inset: 6, radius: R + 5 }]} drawOn="mount" duration={2000} className="text-gilt" />
          </div>
          <div className="relative -mt-9 px-6 md:-mt-11">
            <DatePlaque />
          </div>
        </div>
      </div>
    </section>
  );
}
