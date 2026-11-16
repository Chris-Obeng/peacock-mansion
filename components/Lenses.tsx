import Link from "next/link";
import { site } from "@/content/site";
import { Panel } from "./Panel";

/**
 * Gallery teaser: seven photographs hung as a salon wall, ending on the link to
 * the full gallery. Phones get a two-column hang; wide screens a 12-column one.
 */
const hang: { m: string; d: [string, string]; sizes: string }[] = [
  { m: "col-span-2 row-span-3", d: ["1 / span 4", "1 / span 6"], sizes: "(min-width:768px) 34vw, 100vw" },
  { m: "row-span-2", d: ["5 / span 3", "1 / span 4"], sizes: "(min-width:768px) 25vw, 50vw" },
  { m: "row-span-2", d: ["8 / span 5", "1 / span 4"], sizes: "(min-width:768px) 42vw, 50vw" },
  { m: "row-span-2", d: ["5 / span 3", "5 / span 5"], sizes: "(min-width:768px) 25vw, 50vw" },
  { m: "row-span-2", d: ["8 / span 2", "5 / span 5"], sizes: "(min-width:768px) 17vw, 50vw" },
  { m: "row-span-2", d: ["10 / span 3", "5 / span 5"], sizes: "(min-width:768px) 25vw, 50vw" },
  { m: "row-span-2", d: ["1 / span 4", "7 / span 3"], sizes: "(min-width:768px) 34vw, 100vw" },
];

export function Lenses() {
  const { heading, line, cta, images } = site.lenses;
  return (
    <section id="lenses" aria-labelledby="lenses-title" className="cv-auto bg-plaster py-24 md:py-32 lg:py-40">
      <div className="px-page mx-auto max-w-[1720px]">
        <div className="mb-10 grid gap-5 md:mb-14 md:grid-cols-12 md:items-end md:gap-x-6">
          <h2 id="lenses-title" className="font-display text-[clamp(2.5rem,10vw,3.5rem)] leading-none tracking-[-0.02em] md:col-span-7 md:text-[clamp(3rem,5.2vw,5.5rem)]">
            {heading}
          </h2>
          <p className="max-w-[40ch] text-[1.0625rem] leading-relaxed text-ink-soft md:col-span-5 md:justify-self-end">{line}</p>
        </div>

        <div className="@container">
          <ul className="grid grid-cols-2 gap-2.5 [grid-auto-rows:calc((100cqw-0.625rem)/2/2.2)] md:grid-cols-12 md:gap-3.5 md:[grid-auto-rows:calc((100cqw-11*0.875rem)/12)]">
            {images.map((im, i) => (
              <li
                key={im.slug}
                className={`${hang[i]!.m} md:[grid-column:var(--c)] md:[grid-row:var(--r)]`}
                style={{ ["--c" as string]: hang[i]!.d[0], ["--r" as string]: hang[i]!.d[1] } as React.CSSProperties}
              >
                <Panel image={im} sizes={hang[i]!.sizes} mat={7} radius={10} className="h-full w-full" />
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 flex justify-center md:mt-16">
          <Link href="/gallery" className="press inline-flex min-h-14 items-center gap-4 bg-lacquer px-9 text-[1rem] text-ivory hover:bg-teal">
            {cta}
            <span aria-hidden className="h-px w-8 bg-gilt-light" />
          </Link>
        </div>
      </div>
    </section>
  );
}
