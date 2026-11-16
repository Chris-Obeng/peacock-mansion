import { site } from "@/content/site";
import { Moulding } from "./Moulding";

/** A guest's own words, then the three steps from first message to a held date. */
export function Proof() {
  const { quote, by, source } = site.proof;
  const { heading, items } = site.steps;
  return (
    <section aria-labelledby="steps-title" className="cv-auto bg-lacquer py-24 text-ivory md:py-32 lg:py-40">
      <div className="px-page mx-auto max-w-[1720px]">
        <figure className="relative mx-auto max-w-5xl px-6 py-14 text-center md:px-16 md:py-20">
          <Moulding lines={[{ inset: 0.5, radius: 22 }, { inset: 6, radius: 16, width: 0.6 }]} className="text-gilt-light/70" />
          <blockquote className="font-display text-[clamp(1.5rem,5.6vw,2.25rem)] leading-[1.3] md:text-[clamp(2rem,3.2vw,3rem)]">
            <p>
              <span aria-hidden className="text-gilt-light">“</span>
              {quote}
              <span aria-hidden className="text-gilt-light">”</span>
            </p>
          </blockquote>
          <figcaption className="mt-8 text-[0.9375rem] text-mist">
            <span className="text-ivory">{by}</span>, {source}
          </figcaption>
        </figure>

        <div className="mt-24 grid gap-12 md:mt-32 md:grid-cols-12 md:gap-x-6">
          <h2 id="steps-title" className="font-display text-[clamp(2.25rem,9vw,3.25rem)] leading-[1.04] tracking-[-0.02em] md:col-span-4 md:text-[clamp(2.5rem,3.8vw,4rem)]">
            {heading}
          </h2>
          <ol className="grid gap-10 md:col-span-8 md:grid-cols-3 md:gap-8">
            {items.map((s, i) => (
              <li key={s.title} className="border-t border-gilt-light/50 pt-6">
                <span className="font-display num block text-[2.5rem] leading-none text-gilt-light">{i + 1}</span>
                <h3 className="font-display mt-5 text-[1.5rem] leading-tight">{s.title}</h3>
                <p className="mt-3 max-w-[32ch] text-[1rem] leading-relaxed text-mist">{s.line}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
