"use client";

import { useCallback, useRef, useState } from "react";
import { site, type Film as FilmT } from "@/content/site";
import { Picture } from "./Picture";
import { Reveal } from "./Reveal";

const offsets = ["lg:mt-0", "lg:mt-24", "lg:mt-10"];

function playerUrl(id: string) {
  const p = new URLSearchParams({
    autoplay: "1",
    controls: "1",
    progress_bar: "1",
    play_button: "1",
    volume_control: "1",
    fullscreen_button: "1",
    music_info: "0",
    description: "0",
    rel: "0",
    native_context_menu: "0",
    closed_caption: "1",
  });
  return `https://www.tiktok.com/player/v1/${id}?${p.toString()}`;
}

/** Warm the TikTok connection only once someone shows intent. */
function usePreconnect() {
  const done = useRef(false);
  return useCallback(() => {
    if (done.current) return;
    done.current = true;
    for (const href of ["https://www.tiktok.com", "https://www.tiktokcdn.com"]) {
      const l = document.createElement("link");
      l.rel = "preconnect";
      l.href = href;
      l.crossOrigin = "";
      document.head.appendChild(l);
    }
  }, []);
}

export function Film() {
  const { label, heading, note, films, profileCta, playLabel } = site.film;
  const [active, setActive] = useState<string | null>(null);
  const warm = usePreconnect();

  return (
    <section id="film" aria-labelledby="film-title" className="cv-auto overflow-hidden bg-ink py-24 text-ivory md:py-36 lg:py-44">
      <div className="px-page mx-auto max-w-[1680px]">
        <Reveal as="header" className="mb-12 grid gap-6 md:mb-20 md:grid-cols-2 md:items-end">
          <div>
            <p className="label text-gold-light">{label}</p>
            <h2 id="film-title" className="font-display mt-6 text-[clamp(2.6rem,9vw,5.75rem)] leading-none">
              {heading}
            </h2>
          </div>
          <div className="md:justify-self-end md:text-right">
            <p className="font-display max-w-[34ch] text-[0.9375rem] italic text-ivory-dim md:ml-auto">{note}</p>
            <a
              href={site.contact.tiktokUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="press label mt-5 inline-flex min-h-11 items-center gap-3 text-gold-light hover:text-ivory"
            >
              {profileCta} {site.contact.tiktokHandle}
              <span aria-hidden className="h-px w-6 bg-current" />
            </a>
          </div>
        </Reveal>
      </div>

      {/* Phones: native scroll-snap track with the next film peeking. Desktop: a staggered row. */}
      <ul
        className="snap-track px-page scroll-px-[max(1.25rem,env(safe-area-inset-left))] md:scroll-px-10 mx-auto flex max-w-[1680px] gap-4 overflow-x-auto pb-4 md:gap-6 lg:grid lg:grid-cols-3 lg:gap-10 lg:overflow-visible xl:gap-16"
        aria-label="Films"
      >
        {films.map((f, i) => (
          <li key={f.id} className={`w-[72vw] max-w-[22rem] shrink-0 snap-start md:w-[40vw] lg:w-auto lg:max-w-none ${offsets[i] ?? ""}`}>
            <FilmCard film={f} active={active === f.id} onPlay={() => setActive(f.id)} onIntent={warm} playLabel={playLabel} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function FilmCard({
  film,
  active,
  onPlay,
  onIntent,
  playLabel,
}: {
  film: FilmT;
  active: boolean;
  onPlay: () => void;
  onIntent: () => void;
  playLabel: string;
}) {
  return (
    <figure>
      <div className="relative aspect-[9/16] w-full overflow-hidden bg-teal-deep">
        {active ? (
          <iframe
            src={playerUrl(film.id)}
            title={`${film.title}, a film of The Peacock Mansion on TikTok`}
            allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            className="absolute inset-0 h-full w-full border-0"
          />
        ) : (
          <button
            type="button"
            onClick={onPlay}
            onPointerEnter={onIntent}
            onFocus={onIntent}
            onTouchStart={onIntent}
            className="group absolute inset-0 block h-full w-full text-left"
          >
            <Picture
              image={film.poster}
              aspect="9 / 16"
              sizes="(min-width:1024px) 30vw, (min-width:768px) 40vw, 72vw"
              decorative
              className="absolute inset-0 !aspect-auto h-full"
              imgClassName="transition-transform duration-[1400ms] ease-[var(--ease-out)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-[1.04]"
            />
            <span aria-hidden className="absolute inset-0 bg-[linear-gradient(to_top,rgb(22_20_15/0.75),rgb(22_20_15/0)_55%)]" />
            <span className="press absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/80 bg-ink/45 text-ivory transition-colors duration-300 group-hover:border-gold-light group-hover:text-gold-light">
              <svg viewBox="0 0 24 24" className="ml-1 h-5 w-5" fill="currentColor" aria-hidden>
                <path d="M7 4.5v15l12-7.5z" />
              </svg>
            </span>
            <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
              <span className="font-display text-xl leading-tight md:text-2xl">
                <span className="sr-only">{playLabel} </span>
                {film.title}
              </span>
              <span className="label shrink-0 text-gold-light">
                {film.length}
                <span className="sr-only">. Loads the TikTok player.</span>
              </span>
            </span>
          </button>
        )}
      </div>
    </figure>
  );
}
