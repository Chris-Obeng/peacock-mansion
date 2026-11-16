import { site } from "@/content/site";
import { Panel } from "./Panel";

/**
 * The value proposition. A statement in the frieze, then four reasons, each hung
 * with its own photograph. Image sides alternate on wide screens.
 */
export function House() {
  const { heading, intro, reasons, stats } = site.house;
  return (
    <section id="house" aria-labelledby="house-title" className="cv-auto bg-plaster py-24 md:py-32 lg:py-40">
      <div className="px-page mx-auto max-w-[1720px]">
        <div className="grid gap-8 md:grid-cols-12 md:gap-x-6">
          <h2 id="house-title" className="font-display text-[clamp(2.5rem,10vw,3.5rem)] leading-[1.02] tracking-[-0.02em] md:col-span-6 md:text-[clamp(3rem,5.2vw,5.5rem)]">
            {heading}
          </h2>
          <p className="max-w-[46ch] text-[1.0625rem] leading-relaxed text-ink-soft md:col-span-5 md:col-start-8 md:self-end md:text-lg">{intro}</p>
        </div>

        <ol className="mt-16 flex flex-col gap-16 md:mt-24 md:gap-28">
          {reasons.map((r, i) => {
            const flip = i % 2 === 1;
            return (
              <li key={r.title} className="grid items-center gap-7 md:grid-cols-12 md:gap-x-6">
                <Panel
                  image={r.image}
                  sizes="(min-width: 768px) 46vw, 100vw"
                  className={`aspect-[4/5] md:col-span-6 md:aspect-[5/6] lg:col-span-5 ${flip ? "md:order-2 md:col-start-7 lg:col-start-8" : ""} ${i === 3 ? "!aspect-[4/3] md:!aspect-[5/4]" : ""}`}
                  mat={12}
                  radius={18}
                  drift
                />
                <div className={`md:col-span-5 ${flip ? "md:order-1 md:col-start-1 lg:col-start-2 lg:col-span-5" : "md:col-start-8 lg:col-start-8"}`}>
                  <span aria-hidden className="block h-px w-12 bg-gilt" />
                  <h3 className="font-display mt-6 text-[clamp(1.75rem,6vw,2.25rem)] leading-tight md:text-[clamp(2rem,2.8vw,2.75rem)]">{r.title}</h3>
                  <p className="mt-4 max-w-[40ch] text-[1.0625rem] leading-relaxed text-ink-soft">{r.line}</p>
                </div>
              </li>
            );
          })}
        </ol>

        <dl className="mt-20 grid border-y border-gilt/45 md:mt-28 md:grid-cols-3">
          {stats.map((s, i) => (
            <div key={s.label} className={`flex items-baseline gap-4 py-6 md:flex-col md:gap-2 md:px-8 md:py-10 ${i > 0 ? "border-t border-gilt/30 md:border-l md:border-t-0" : ""}`}>
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-display num shrink-0 text-[2.25rem] leading-none md:text-[3rem]">{s.value}</dd>
              <dd className="text-[0.9375rem] text-ink-soft">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
