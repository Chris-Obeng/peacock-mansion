import { getImageProps } from "next/image";
import { media, site } from "@/content/site";
import { HeroVideo } from "./HeroVideo";
import { Moulding } from "./Moulding";

const PORTRAIT = "(orientation: portrait)";
const LANDSCAPE = "(orientation: landscape)";

/**
 * Full-bleed hero reel from the house's own wedding films. A gilt moulding draws
 * itself around the screen on arrival, so the film hangs like a painting.
 */
export function Hero() {
  const { heading, line, cta, secondary, proof, video, posterWide, posterTall, pause, play } = site.hero;
  const w = media[posterWide.slug];
  const t = media[posterTall.slug];
  const common = { alt: posterWide.alt, fill: true, quality: 60 } as const;
  const { props: wideProps } = getImageProps({ ...common, src: w.src, sizes: "100vw" });
  const { props: tallProps } = getImageProps({ ...common, src: t.src, sizes: "(orientation: portrait) 100vw" });
  const { style: _s, ...imgProps } = wideProps;
  void _s;

  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-lacquer text-ivory">
      <link rel="preload" as="image" media={PORTRAIT} imageSrcSet={tallProps.srcSet} imageSizes="100vw" fetchPriority="high" />
      <link rel="preload" as="image" media={LANDSCAPE} imageSrcSet={wideProps.srcSet} imageSizes="100vw" fetchPriority="high" />

      <div className="absolute inset-0 -z-10">
        <picture>
          <source media={PORTRAIT} srcSet={tallProps.srcSet} sizes="100vw" />
          <img
            {...imgProps}
            alt={posterWide.alt}
            fetchPriority="high"
            loading="eager"
            decoding="async"
            className="hero-still absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: posterWide.position }}
          />
        </picture>
        <HeroVideo wide={video.wide} tall={video.tall} pauseLabel={pause} playLabel={play} />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(to_top,rgb(15_21_23/0.96)_0%,rgb(15_21_23/0.88)_34%,rgb(15_21_23/0.45)_56%,rgb(15_21_23/0)_74%),linear-gradient(to_bottom,rgb(15_21_23/0.55)_0%,rgb(15_21_23/0)_20%)] md:bg-[linear-gradient(to_right,rgb(15_21_23/0.8)_0%,rgb(15_21_23/0.45)_42%,rgb(15_21_23/0)_68%),linear-gradient(to_top,rgb(15_21_23/0.7)_0%,rgb(15_21_23/0)_40%),linear-gradient(to_bottom,rgb(15_21_23/0.5)_0%,rgb(15_21_23/0)_20%)]"
        />
      </div>

      {/* Signature: the gilt moulding draws around the screen like a picture frame. */}
      <div aria-hidden className="pointer-events-none absolute inset-[max(0.625rem,env(safe-area-inset-left))] top-[calc(0.625rem+env(safe-area-inset-top))] md:inset-5">
        <Moulding lines={[{ inset: 0.5, radius: 22 }, { inset: 6, radius: 16, width: 0.6 }]} drawOn="mount" duration={2400} className="text-gilt-light/80" />
      </div>

      <div className="px-page mx-auto w-full max-w-[1720px] pb-[calc(5.5rem+env(safe-area-inset-bottom))] md:pb-20 lg:pb-24">
        <h1 id="hero-title" className="hero-rise font-display max-w-[13ch] text-[clamp(2.25rem,10vw,4rem)] leading-[1.04] tracking-[-0.025em] md:max-w-[12ch] md:text-[clamp(3.25rem,5.4vw,6rem)] [@media(orientation:landscape)_and_(max-height:500px)]:text-[2.4rem]">
          {heading}
        </h1>
        <p className="hero-rise mt-5 max-w-[38ch] text-[1.0625rem] leading-relaxed text-ivory/85 md:mt-7 md:text-lg" style={{ ["--d" as string]: "160ms" }}>
          {line}
        </p>
        <div className="hero-rise mt-7 flex flex-wrap items-center gap-x-3 gap-y-3 md:mt-10" style={{ ["--d" as string]: "300ms" }}>
          <a
            href={site.contact.checkDateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="press inline-flex min-h-14 items-center justify-center whitespace-nowrap bg-gilt-light px-8 text-[1rem] font-medium text-lacquer hover:bg-ivory"
          >
            {cta}
          </a>
          <a
            href="#films"
            className="press inline-flex min-h-12 items-center justify-center gap-3 px-2 text-[1rem] text-ivory underline decoration-gilt-light/70 underline-offset-[0.35em] hover:text-gilt-light md:min-h-14 md:px-6 md:no-underline md:ring-1 md:ring-ivory/45"
          >
            <svg aria-hidden viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
              <path d="M7 4.5v15l12-7.5z" />
            </svg>
            {secondary}
          </a>
        </div>
        <p className="hero-rise mt-7 text-[0.875rem] text-ivory/70 [@media(orientation:landscape)_and_(max-height:500px)]:hidden" style={{ ["--d" as string]: "420ms" }}>
          {proof}
        </p>
      </div>
    </section>
  );
}
