"use client";

import Image from "next/image";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import { media } from "@/content/media.generated";
import { site, wa } from "@/content/site";
import { Moulding } from "./Moulding";

/**
 * Four occasions in one fixed frame. Choosing one re-dresses the frame with its
 * own two photographs and a WhatsApp question written for that occasion.
 */
export function Occasions() {
  const { heading, items } = site.occasions;
  const [active, setActive] = useState(0);
  const uid = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const cur = items[active]!;

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const n = items.length;
    let next = -1;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (active + 1) % n;
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (active - 1 + n) % n;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = n - 1;
    if (next < 0) return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }

  return (
    <section id="occasions" aria-labelledby="occasions-title" className="cv-auto bg-plaster-deep py-24 md:py-32 lg:py-40">
      <div className="px-page mx-auto max-w-[1720px]">
        <h2 id="occasions-title" className="font-display text-[clamp(2.5rem,10vw,3.5rem)] leading-none tracking-[-0.02em] md:text-[clamp(3rem,5.2vw,5.5rem)]">
          {heading}
        </h2>

        <div
          role="tablist"
          aria-label={heading}
          onKeyDown={onKeyDown}
          className="snap-track -mx-5 mt-10 flex gap-2 overflow-x-auto px-5 pb-1 md:mx-0 md:mt-14 md:px-0"
        >
          {items.map((it, i) => {
            const selected = i === active;
            return (
              <button
                key={it.key}
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
                className={`press min-h-11 shrink-0 snap-start whitespace-nowrap px-5 text-[0.9375rem] transition-colors duration-300 ${
                  selected ? "bg-lacquer text-ivory" : "text-ink-soft ring-1 ring-inset ring-gilt/50 hover:bg-plaster hover:text-ink"
                }`}
              >
                {it.title}
              </button>
            );
          })}
        </div>

        <div
          id={`${uid}-panel`}
          role="tabpanel"
          aria-labelledby={`${uid}-tab-${active}`}
          className="mt-8 grid gap-8 md:mt-12 md:grid-cols-12 md:gap-x-6"
        >
          <div className="relative grid grid-cols-6 gap-3 md:col-span-8 md:gap-4">
            {items.map((it, i) => (
              <div key={it.key} className="swap col-span-6 col-start-1 row-start-1 grid grid-cols-6 gap-3 md:gap-4" data-active={i === active} aria-hidden={i !== active}>
                {it.images.map((im, k) => {
                  const m = media[im.slug];
                  return (
                    <div key={im.slug} className={`relative ${k === 0 ? "col-span-4 aspect-[4/5]" : "col-span-2 mt-auto aspect-[3/4]"}`}>
                      <div className="notched absolute overflow-hidden bg-plaster" style={{ inset: 8, ["--r" as string]: "12px" }}>
                        <Image
                          src={m.src}
                          alt={i === active ? im.alt : ""}
                          fill
                          sizes={k === 0 ? "(min-width: 768px) 44vw, 66vw" : "(min-width: 768px) 22vw, 33vw"}
                          quality={65}
                          placeholder="blur"
                          blurDataURL={m.blurDataURL}
                          loading="lazy"
                          className="object-cover"
                          style={{ objectPosition: im.position ?? "50% 40%" }}
                        />
                      </div>
                      <Moulding lines={[{ inset: 0.5, radius: 19 }, { inset: 4.5, radius: 15, width: 0.6 }]} className="text-gilt" />
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          <div className="md:col-span-4 md:self-end md:pb-6">
            <h3 className="font-display text-[clamp(1.875rem,7vw,2.5rem)] leading-tight md:text-[clamp(2rem,2.8vw,2.75rem)]">{cur.title}</h3>
            <p className="mt-4 max-w-[36ch] text-[1.0625rem] leading-relaxed text-ink-soft">{cur.line}</p>
            <a
              href={wa(cur.message)}
              target="_blank"
              rel="noopener noreferrer"
              className="press mt-8 inline-flex min-h-12 items-center bg-lacquer px-7 text-[0.9375rem] text-ivory hover:bg-teal"
            >
              {cur.cta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
