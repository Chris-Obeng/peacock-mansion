import fs from "node:fs";
import path from "node:path";
import { getImageProps } from "next/image";
import { media, site } from "@/content/site";
import { HeroVideo } from "./HeroVideo";

/** Checked at build time: the film slot only renders once the owner adds the files. */
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

const PORTRAIT = "(orientation: portrait)";
const LANDSCAPE = "(orientation: landscape)";
// Portrait frames are covered by height, so size by the viewport height times the crop's aspect.
const PORTRAIT_SIZES = "82vh";
const LANDSCAPE_SIZES = "max(100vw, 150vh)";

export function Hero() {
  const { image, portrait, label, nameLines, line, cta } = site.hero;
  const wide = media[image.slug];
  const tall = media[portrait.slug];
  const video = videoFiles();
  const hasVideo = Boolean(video.mp4 || video.webm);

  // Art direction: the portrait crop keeps the fountain centred on phones.
  const common = { alt: image.alt, fill: true, quality: 55 } as const;
  const { props: wideProps } = getImageProps({ ...common, src: wide.src, sizes: LANDSCAPE_SIZES });
  const { props: tallProps } = getImageProps({ ...common, src: tall.src, sizes: PORTRAIT_SIZES });
  const { style: _ignored, ...imgProps } = wideProps;
  void _ignored;

  return (
    <section
      id="hero"
      aria-label={site.name}
      className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-ink pt-[calc(5.5rem+env(safe-area-inset-top))] text-ivory"
    >
      <link rel="preload" as="image" media={PORTRAIT} imageSrcSet={tallProps.srcSet} imageSizes={PORTRAIT_SIZES} fetchPriority="high" />
      <link rel="preload" as="image" media={LANDSCAPE} imageSrcSet={wideProps.srcSet} imageSizes={LANDSCAPE_SIZES} fetchPriority="high" />

      {/* Signature moment: the photograph opens out of the mansion's arched doorway. */}
      <div className="hero-arch absolute inset-0 -z-10">
        <div
          className="hero-settle absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url("${wide.blurDataURL}")` }}
        >
          <picture>
            <source media={PORTRAIT} srcSet={tallProps.srcSet} sizes={PORTRAIT_SIZES} />
            <img
              {...imgProps}
              alt={image.alt}
              fetchPriority="high"
              loading="eager"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover object-[50%_50%] landscape:object-[var(--pos)]"
              style={{ ["--pos" as string]: image.position }}
            />
          </picture>
          {hasVideo && <HeroVideo {...video} position={image.position} />}
        </div>
        {/* Legibility: a gentle ink fall-off at the base only, never a blur. */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(to_top,rgb(22_20_15/0.82)_0%,rgb(22_20_15/0.45)_32%,rgb(22_20_15/0)_62%),linear-gradient(to_bottom,rgb(22_20_15/0.45)_0%,rgb(22_20_15/0)_18%)]"
        />
      </div>

      <div className="px-page mx-auto w-full max-w-[1680px] pb-[calc(2.5rem+env(safe-area-inset-bottom))] md:pb-16 lg:pb-20">
        <p className="label hero-fade mb-5 text-gold-light md:mb-7 [@media(orientation:landscape)_and_(max-height:500px)]:mb-3" style={{ ["--d" as string]: "900ms" }}>
          {label}
        </p>
        <h1 className="font-display text-[clamp(3.25rem,min(15.5vw,19svh),10.5rem)] md:text-[clamp(3.25rem,min(13vw,17svh),10rem)] leading-[0.9] tracking-[-0.03em]">
          {nameLines.map((l, i) => (
            <span key={l} className="block overflow-hidden pb-[0.06em]">
              <span className="hero-line" style={{ ["--d" as string]: `${450 + i * 130}ms` }}>
                {i === 1 ? <em className="italic">{l}</em> : l}
              </span>
            </span>
          ))}
        </h1>
        <div
          className="hero-fade mt-6 [@media(orientation:landscape)_and_(max-height:500px)]:mt-4 flex flex-col gap-7 md:mt-10 md:flex-row md:items-end md:justify-between"
          style={{ ["--d" as string]: "1000ms" }}
        >
          <p className="hero-line-copy max-w-[30ch] text-[1.0625rem] leading-relaxed text-ivory/90 md:text-lg">{line}</p>
          <a
            href="#enquire"
            className="press label inline-flex min-h-12 w-fit items-center gap-4 bg-ivory px-7 text-ink hover:bg-gold-light"
          >
            {cta}
            <span aria-hidden className="h-px w-8 bg-ink" />
          </a>
        </div>
      </div>

      <span aria-hidden className="hero-draw absolute bottom-0 right-[max(1.25rem,4vw)] hidden h-16 w-px bg-gold-light md:block" />
    </section>
  );
}
