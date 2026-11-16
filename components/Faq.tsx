import { site } from "@/content/site";

/** Objections answered before they become reasons not to write. Native <details>. */
export function Faq() {
  const { heading, items } = site.faq;
  return (
    <section id="questions" aria-labelledby="faq-title" className="cv-auto bg-plaster py-24 md:py-32 lg:py-40">
      <div className="px-page mx-auto grid max-w-[1720px] gap-10 md:grid-cols-12 md:gap-x-6">
        <h2 id="faq-title" className="font-display text-[clamp(2.25rem,9vw,3.25rem)] leading-[1.04] tracking-[-0.02em] md:col-span-4 md:text-[clamp(2.5rem,3.8vw,4rem)]">
          {heading}
        </h2>
        <div className="border-t border-gilt/50 md:col-span-8">
          {items.map((f) => (
            <details key={f.q} className="faq group border-b border-gilt/50">
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 text-left [&::-webkit-details-marker]:hidden">
                <span className="font-display text-[1.25rem] leading-snug md:text-[1.5rem]">{f.q}</span>
                <span aria-hidden className="relative h-4 w-4 shrink-0 text-gilt-text">
                  <span className="absolute left-0 top-1/2 h-px w-4 bg-current" />
                  <span className="absolute left-1/2 top-0 h-4 w-px bg-current transition-transform duration-300 ease-[var(--ease-out)] group-open:scale-y-0" />
                </span>
              </summary>
              <p className="max-w-[60ch] pb-7 text-[1.0625rem] leading-relaxed text-ink-soft">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
