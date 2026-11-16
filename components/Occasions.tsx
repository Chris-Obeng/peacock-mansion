"use client";

import Image from "next/image";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import { media } from "@/content/media.generated";
import { site } from "@/content/site";
import { Moulding } from "./Moulding";

const MAT = 14;
const R = 18;

/**
 * One fixed frame, three occasions. The frame never moves; only what hangs in it
 * changes, the way a room is dressed differently for each event.
 */
export function Occasions() {
  const { heading, items } = site.occasions;
  const [active, setActive] = useState(0);
  const uid = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const n = items.length;
    let next = -1;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (active + 1) % n;
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = (active - 1 + n) % n;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = n - 1;
    if (next < 0) return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }

  return (
    <section id="occasions" aria-labelledby="occasions-title" className="cv-auto bg-plaster py-24 md:py-32 lg:py-40">
      <div className="px-page mx-auto grid max-w-[1720px] gap-10 md:grid-cols-12 md:gap-x-6 lg:gap-x-10">
        <div className="md:col-span-5 md:self-center lg:col-span-4">
          <h2 id="occasions-title" className="font-display text-[clamp(2.25rem,8.4vw,3.25rem)] leading-[1.04] md:text-[clamp(2.5rem,3.9vw,4rem)]">
            {heading}
          </h2>

          <div role="tablist" aria-label={heading} aria-orientation="vertical" onKeyDown={onKeyDown} className="mt-10 border-t border-gilt/40 md:mt-14">
            {items.map((it, i) => {
              const selected = i === active;
              return (
                <button
                  key={it.title}
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  id={`${uid}-tab-${i}`}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  aria-controls={`${uid}-panel`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  className="group block w-full border-b border-gilt/40 py-5 text-left md:py-6"
                >
                  <span
                    className={`font-display block text-[1.75rem] leading-tight transition-colors duration-300 md:text-[2rem] ${
                      selected ? "text-ink" : "text-ink-soft/70 group-hover:text-ink"
                    }`}
                  >
                    {selected ? <em>{it.title}</em> : it.title}
                  </span>
                  <span
                    className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[var(--ease-out)] ${
                      selected ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <span className="overflow-hidden">
                      <span className="block max-w-[34ch] pt-2 text-[1rem] leading-relaxed text-ink-soft">{it.line}</span>
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div
          id={`${uid}-panel`}
          role="tabpanel"
          aria-labelledby={`${uid}-tab-${active}`}
          className="relative order-first aspect-[4/5] md:order-none md:col-span-7 md:aspect-auto md:min-h-[min(48vw,52rem)] lg:col-span-7 lg:col-start-6"
        >
          <div className="notched absolute overflow-hidden bg-plaster-deep" style={{ inset: MAT, ["--r" as string]: `${R}px` }}>
            {items.map((it, i) => {
              const m = media[it.image.slug];
              return (
                <div key={it.title} className="swap absolute inset-0" data-active={i === active} aria-hidden={i !== active}>
                  <Image
                    src={m.src}
                    alt={i === active ? it.image.alt : ""}
                    fill
                    sizes="(min-width: 768px) 58vw, 100vw"
                    quality={65}
                    placeholder="blur"
                    blurDataURL={m.blurDataURL}
                    loading="lazy"
                    className="object-cover"
                    style={{ objectPosition: (it.image as { position?: string }).position ?? "50% 50%" }}
                  />
                </div>
              );
            })}
          </div>
          <Moulding lines={[{ inset: 0.5, radius: R + MAT - 1 }, { inset: 7, radius: R + 6 }]} className="text-gilt" />
        </div>
      </div>
    </section>
  );
}
