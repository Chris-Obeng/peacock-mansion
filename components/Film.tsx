"use client";

import { useCallback, useRef, useState } from "react";
import { site, type Film as FilmT } from "@/content/site";
import { Moulding } from "./Moulding";
import { Panel } from "./Panel";

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

/** Three films behind three doors: arched frames in black lacquer, one playing at a time. */
export function Film() {
  const { heading, line: note, items: films, more: profileCta, playLabel } = site.films;
  const [active, setActive] = useState<string | null>(null);
  const warm = usePreconnect();
  const track = useRef<HTMLUListElement>(null);
  const step = (dir: number) => track.current?.scrollBy({ left: dir * track.current.clientWidth * 0.8, behavior: "smooth" });

  return (
    <section id="films" aria-labelledby="film-title" className="cv-auto overflow-hidden bg-lacquer py-24 text-ivory md:py-32 lg:py-40">
      <div className="px-page mx-auto max-w-[1720px]">
        <div className="mb-12 grid gap-5 md:mb-16 md:grid-cols-12 md:items-end md:gap-x-6">
          <h2 id="film-title" className="font-display text-[clamp(2.25rem,8.4vw,3.25rem)] leading-none md:col-span-7 md:text-[clamp(2.75rem,4.6vw,4.75rem)]">
            {heading}
          </h2>
          <div className="md:col-span-5 md:text-right">
            <p className="max-w-[40ch] text-[0.9375rem] leading-relaxed text-mist md:ml-auto">{note}</p>
            <a
              href={site.contact.tiktokUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex min-h-11 items-center text-[0.9375rem] text-gilt-light underline decoration-gilt/60 underline-offset-[0.35em] hover:text-ivory"
            >
              {profileCta}
            </a>
          </div>
        </div>
      </div>

      <div className="px-page mx-auto mb-6 hidden max-w-[1720px] justify-end gap-2 md:flex">
        {[-1, 1].map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => step(d)}
            aria-label={d < 0 ? "Previous films" : "Next films"}
            className="press flex h-12 w-12 items-center justify-center rounded-full text-ivory ring-1 ring-ivory/40 hover:bg-ivory hover:text-lacquer"
          >
            <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d={d < 0 ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} />
            </svg>
          </button>
        ))}
      </div>
      <ul
        ref={track}
        className="snap-track px-page mx-auto flex max-w-[1720px] scroll-px-5 gap-4 overflow-x-auto pb-4 md:scroll-px-10 md:gap-6 lg:gap-8"
        aria-label="Films"
      >
        {films.map((f) => (
          <li key={f.id} className="w-[70vw] max-w-[20rem] shrink-0 snap-start md:w-[36vw] lg:w-[22vw] lg:max-w-[24rem]">
            <FilmDoor film={f} active={active === f.id} onPlay={() => setActive(f.id)} onIntent={warm} playLabel={playLabel} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function FilmDoor({
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
      <div className="relative aspect-[9/17]">
        {active ? (
          <>
            <div className="arched absolute overflow-hidden bg-lacquer-2" style={{ inset: 10 }}>
              <iframe
                src={playerUrl(film.id)}
                title={`${film.title}, a film of The Peacock Mansion on TikTok`}
                allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                className="absolute inset-x-0 bottom-0 h-[calc(100%-6%)] w-full border-0"
              />
            </div>
            <Moulding shape="arch" lines={[{ inset: 0.5 }, { inset: 4.5 }]} drawOn="mount" className="text-gilt-light" />
          </>
        ) : (
          <button
            type="button"
            onClick={onPlay}
            onPointerEnter={onIntent}
            onFocus={onIntent}
            onTouchStart={onIntent}
            className="group absolute inset-0 block h-full w-full text-left"
          >
            <Panel
              image={film.poster}
              shape="arch"
              mat={10}
              sizes="(min-width:1024px) 30vw, (min-width:768px) 42vw, 74vw"
              decorative
              lineClass="text-gilt-light"
              className="absolute inset-0"
              imgClassName="transition-transform duration-[1400ms] ease-[var(--ease-out)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-[1.04]"
            >
              <span aria-hidden className="absolute inset-0 bg-[linear-gradient(to_top,rgb(15_21_23/0.8),rgb(15_21_23/0)_50%)]" />
              <span className="press absolute left-1/2 top-[54%] flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-lacquer/55 text-ivory ring-1 ring-gilt-light/80 transition-colors duration-300 group-hover:bg-gilt-light group-hover:text-lacquer">
                <svg viewBox="0 0 24 24" className="ml-1 h-5 w-5" fill="currentColor" aria-hidden>
                  <path d="M7 4.5v15l12-7.5z" />
                </svg>
              </span>
              <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
                <span className="font-display text-[1.375rem] leading-tight md:text-2xl">
                  <span className="sr-only">{playLabel} </span>
                  {film.title}
                </span>
                <span className="num shrink-0 text-[0.875rem] text-gilt-light">
                  {film.length}
                  <span className="sr-only">. Loads the TikTok player.</span>
                </span>
              </span>
            </Panel>
          </button>
        )}
      </div>
    </figure>
  );
}
