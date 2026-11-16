"use client";

import { useCallback, useRef, useState } from "react";
import { site } from "@/content/site";
import { Lightbox } from "./Lightbox";
import { Panel } from "./Panel";

/**
 * A salon hang: frames of different sizes packed edge to edge on one wall, the
 * way paintings hang in the house. Square grid units; [column, row] placements
 * for phones (4 columns) and for tablets and desktops (12 columns).
 */
const hang: { m: [string, string]; d: [string, string]; sizes: string }[] = [
  { m: ["1 / span 4", "1 / span 3"], d: ["1 / span 5", "1 / span 4"], sizes: "(min-width:768px) 42vw, 100vw" },
  { m: ["1 / span 4", "7 / span 3"], d: ["6 / span 4", "1 / span 3"], sizes: "(min-width:768px) 34vw, 100vw" },
  { m: ["1 / span 2", "4 / span 3"], d: ["10 / span 3", "1 / span 4"], sizes: "(min-width:768px) 25vw, 50vw" },
  { m: ["3 / span 2", "4 / span 3"], d: ["6 / span 2", "4 / span 3"], sizes: "(min-width:768px) 17vw, 50vw" },
  { m: ["3 / span 2", "12 / span 2"], d: ["8 / span 2", "4 / span 3"], sizes: "(min-width:768px) 17vw, 50vw" },
  { m: ["1 / span 2", "10 / span 4"], d: ["1 / span 3", "5 / span 5"], sizes: "(min-width:768px) 25vw, 50vw" },
  { m: ["3 / span 2", "10 / span 2"], d: ["4 / span 2", "5 / span 3"], sizes: "(min-width:768px) 17vw, 50vw" },
  { m: ["1 / span 4", "17 / span 2"], d: ["10 / span 3", "5 / span 2"], sizes: "(min-width:768px) 25vw, 100vw" },
  { m: ["1 / span 4", "14 / span 3"], d: ["6 / span 5", "7 / span 3"], sizes: "(min-width:768px) 42vw, 100vw" },
  { m: ["1 / span 2", "19 / span 2"], d: ["11 / span 2", "7 / span 3"], sizes: "(min-width:768px) 17vw, 50vw" },
  { m: ["3 / span 2", "19 / span 2"], d: ["4 / span 2", "8 / span 2"], sizes: "(min-width:768px) 17vw, 50vw" },
];

export function Gallery() {
  const { heading, hint, images } = site.gallery;
  const [index, setIndex] = useState<number | null>(null);
  const lastOpened = useRef(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  const onClose = useCallback(() => {
    setIndex(null);
    buttons.current[lastOpened.current]?.focus({ preventScroll: true });
  }, []);
  const onIndex = useCallback((i: number) => {
    lastOpened.current = i;
    setIndex(i);
  }, []);

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="cv-auto bg-plaster-deep py-24 md:py-32 lg:py-40">
      <div className="px-page mx-auto max-w-[1720px]">
        <div className="mb-10 flex flex-col gap-3 md:mb-14 md:flex-row md:items-baseline md:justify-between">
          <h2 id="gallery-title" className="font-display text-[clamp(2.25rem,8.4vw,3.25rem)] leading-none md:text-[clamp(2.75rem,4.6vw,4.75rem)]">
            {heading}
          </h2>
          <p className="text-[0.9375rem] text-ink-soft">{hint}</p>
        </div>

        <div className="@container">
          <ul className="grid grid-cols-4 gap-2.5 [grid-auto-rows:calc((100cqw-3*0.625rem)/4)] md:grid-cols-12 md:gap-3.5 md:[grid-auto-rows:calc((100cqw-11*0.875rem)/12)]">
            {images.map((img, i) => {
              const h = hang[i]!;
              return (
                <li
                  key={`${img.slug}-${i}`}
                  className="[grid-column:var(--mc)] [grid-row:var(--mr)] md:[grid-column:var(--dc)] md:[grid-row:var(--dr)]"
                  style={
                    {
                      ["--mc" as string]: h.m[0],
                      ["--mr" as string]: h.m[1],
                      ["--dc" as string]: h.d[0],
                      ["--dr" as string]: h.d[1],
                    } as React.CSSProperties
                  }
                >
                  <button
                    ref={(el) => {
                      buttons.current[i] = el;
                    }}
                    type="button"
                    onClick={() => onIndex(i)}
                    aria-label={`Open photograph ${i + 1} of ${images.length}: ${img.alt}`}
                    aria-haspopup="dialog"
                    className="group block h-full w-full"
                  >
                    <Panel
                      image={img}
                      sizes={h.sizes}
                      decorative
                      mat={8}
                      radius={10}
                      className="h-full w-full"
                      imgClassName="transition-transform duration-[1200ms] ease-[var(--ease-out)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-[1.035]"
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <Lightbox images={images} index={index} onIndex={onIndex} onClose={onClose} />
    </section>
  );
}
