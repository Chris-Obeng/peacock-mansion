"use client";

import Image from "next/image";
import { useCallback, useMemo, useRef, useState } from "react";
import { media } from "@/content/media.generated";
import { site, type GalleryTag } from "@/content/site";
import { Lightbox } from "./Lightbox";

type Filter = GalleryTag | "all";

/** The full gallery: filters, a masonry wall at each photo's own ratio, and the lightbox. */
export function GalleryWall() {
  const { filters, images, open } = site.gallery;
  const [filter, setFilter] = useState<Filter>("all");
  const [index, setIndex] = useState<number | null>(null);
  const last = useRef(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  const shown = useMemo(() => images.filter((im) => filter === "all" || (im.tags as readonly string[]).includes(filter)), [images, filter]);

  const onClose = useCallback(() => {
    setIndex(null);
    buttons.current[last.current]?.focus({ preventScroll: true });
  }, []);
  const onIndex = useCallback((i: number) => {
    last.current = i;
    setIndex(i);
  }, []);

  return (
    <>
      <div role="group" aria-label="Filter photographs" className="snap-track -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 md:mx-0 md:px-0">
        {filters.map((f) => {
          const on = f.key === filter;
          return (
            <button
              key={f.key}
              type="button"
              aria-pressed={on}
              onClick={() => setFilter(f.key as Filter)}
              className={`press min-h-11 shrink-0 snap-start whitespace-nowrap px-5 text-[0.9375rem] transition-colors duration-300 ${
                on ? "bg-lacquer text-ivory" : "text-ink-soft ring-1 ring-inset ring-gilt/50 hover:bg-plaster-deep hover:text-ink"
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>
      <p className="sr-only" aria-live="polite">
        {shown.length} photographs
      </p>

      <ul className="mt-8 columns-2 gap-2.5 md:mt-12 md:columns-3 md:gap-4 xl:columns-4">
        {shown.map((im, i) => {
          const m = media[im.slug];
          return (
            <li key={im.slug} className="mb-2.5 break-inside-avoid md:mb-4">
              <button
                ref={(el) => {
                  buttons.current[i] = el;
                }}
                type="button"
                onClick={() => onIndex(i)}
                aria-haspopup="dialog"
                aria-label={`${open} ${i + 1} of ${shown.length}: ${im.alt}`}
                className="group relative block w-full overflow-hidden bg-plaster-deep"
                style={{ aspectRatio: `${m.width} / ${m.height}` }}
              >
                <Image
                  src={m.src}
                  alt=""
                  fill
                  sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
                  quality={65}
                  placeholder="blur"
                  blurDataURL={m.blurDataURL}
                  loading={i < 4 ? "eager" : "lazy"}
                  className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-out)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-[1.03]"
                />
                {"credit" in m && m.credit && (
                  <span className="absolute bottom-2 right-2 bg-lacquer/60 px-2 py-0.5 text-[0.6875rem] text-ivory/90">{m.credit}</span>
                )}
              </button>
            </li>
          );
        })}
      </ul>

      <Lightbox images={shown} index={index} onIndex={onIndex} onClose={onClose} />
    </>
  );
}
