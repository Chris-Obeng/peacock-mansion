"use client";

import { useCallback, useRef, useState } from "react";
import { site } from "@/content/site";
import { Lightbox } from "./Lightbox";
import { Picture } from "./Picture";
import { Reveal } from "./Reveal";

/**
 * Editorial contact-sheet layout. Each entry: mobile (2 cols) / tablet (8 cols) / desktop (12 cols)
 * placement, frame aspect and responsive sizes. Deliberately uneven.
 */
const layout: { cls: string; aspect: string; sizes: string }[] = [
  { cls: "col-span-2 md:col-span-5 lg:col-span-7 lg:col-start-1", aspect: "aspect-[4/3] md:aspect-[4/3]", sizes: "(min-width:1024px) 56vw, (min-width:768px) 60vw, 100vw" },
  { cls: "md:col-span-3 md:mt-24 lg:col-span-4 lg:col-start-9 lg:mt-28", aspect: "aspect-[3/4] md:aspect-[3/4]", sizes: "(min-width:1024px) 32vw, (min-width:768px) 36vw, 50vw" },
  { cls: "mt-10 md:col-span-4 md:col-start-2 md:mt-0 lg:col-span-5 lg:col-start-2", aspect: "aspect-[3/4] md:aspect-[3/4]", sizes: "(min-width:1024px) 40vw, (min-width:768px) 48vw, 50vw" },
  { cls: "col-span-2 md:col-span-3 md:col-start-6 md:mt-32 lg:col-span-3 lg:col-start-8 lg:mt-40", aspect: "aspect-[3/4] md:aspect-[3/4]", sizes: "(min-width:1024px) 24vw, (min-width:768px) 36vw, 100vw" },
  { cls: "md:col-span-3 md:col-start-1 lg:col-span-4 lg:col-start-1", aspect: "aspect-[3/4] md:aspect-[3/4]", sizes: "(min-width:1024px) 32vw, (min-width:768px) 36vw, 50vw" },
  { cls: "mt-10 md:col-span-5 md:col-start-4 md:mt-20 lg:col-span-7 lg:col-start-6 lg:mt-24", aspect: "aspect-[3/4] md:aspect-[4/3]", sizes: "(min-width:1024px) 56vw, (min-width:768px) 60vw, 50vw" },
  { cls: "col-span-2 md:col-span-6 md:col-start-2 lg:col-span-7 lg:col-start-3", aspect: "aspect-[4/3] md:aspect-[4/3]", sizes: "(min-width:1024px) 56vw, (min-width:768px) 72vw, 100vw" },
  { cls: "md:col-span-3 md:col-start-1 md:mt-0 lg:col-span-3 lg:col-start-10 lg:mt-48", aspect: "aspect-[3/4] md:aspect-[3/4]", sizes: "(min-width:1024px) 24vw, (min-width:768px) 36vw, 50vw" },
  { cls: "mt-10 md:col-span-3 md:col-start-5 md:mt-28 lg:col-span-3 lg:col-start-1 lg:mt-16", aspect: "aspect-[3/4] md:aspect-[4/5]", sizes: "(min-width:1024px) 24vw, (min-width:768px) 36vw, 50vw" },
  { cls: "col-span-2 md:col-span-4 md:col-start-1 lg:col-span-6 lg:col-start-5", aspect: "aspect-[4/3] md:aspect-[4/3]", sizes: "(min-width:1024px) 48vw, (min-width:768px) 60vw, 100vw" },
  { cls: "md:col-span-4 md:col-start-5 md:mt-24 lg:col-span-5 lg:col-start-2 lg:mt-6", aspect: "aspect-[3/4] md:aspect-[4/3]", sizes: "(min-width:1024px) 40vw, (min-width:768px) 48vw, 50vw" },
  { cls: "mt-10 md:col-span-4 md:col-start-2 md:mt-0 lg:col-span-4 lg:col-start-8 lg:mt-36", aspect: "aspect-[3/4] md:aspect-[4/3]", sizes: "(min-width:1024px) 32vw, (min-width:768px) 48vw, 50vw" },
];

export function Gallery() {
  const { label, heading, hint, images } = site.gallery;
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
    <section id="gallery" aria-labelledby="gallery-title" className="cv-auto bg-stone py-24 md:py-36 lg:py-44">
      <div className="px-page mx-auto max-w-[1680px]">
        <Reveal as="header" className="mb-14 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="label text-gold-text">{label}</p>
            <h2 id="gallery-title" className="font-display mt-6 text-[clamp(2.6rem,9vw,5.75rem)] leading-none">
              {heading}
            </h2>
          </div>
          <p className="font-display text-[0.9375rem] italic text-ink-soft">{hint}</p>
        </Reveal>

        <ul className="grid grid-cols-2 items-start gap-x-3 gap-y-3 md:grid-cols-8 md:gap-x-6 md:gap-y-6 lg:grid-cols-12 lg:gap-y-10">
          {images.map((img, i) => {
            const l = layout[i % layout.length]!;
            return (
              <li key={`${img.slug}-${i}`} className={l.cls}>
                <button
                  ref={(el) => {
                    buttons.current[i] = el;
                  }}
                  type="button"
                  onClick={() => {
                    lastOpened.current = i;
                    setIndex(i);
                  }}
                  aria-label={`Open photograph ${i + 1} of ${images.length}: ${img.alt}`}
                  aria-haspopup="dialog"
                  className="group block w-full text-left"
                >
                  <Picture
                    image={img}
                    aspectClass={l.aspect}
                    sizes={l.sizes}
                    decorative
                    imgClassName="transition-transform duration-[1200ms] ease-[var(--ease-out)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-[1.03]"
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <Lightbox images={images} index={index} onIndex={onIndex} onClose={onClose} />
    </section>
  );
}
