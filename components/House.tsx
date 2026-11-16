import { site } from "@/content/site";
import { Panel } from "./Panel";

/**
 * A wall elevation: the words sit in the frieze, the photographs hang below it
 * in three panels of one height, narrow, wide, narrow, as real boiserie does.
 */
export function House() {
  const { heading, lines, images } = site.house;
  return (
    <section id="house" aria-labelledby="house-title" className="cv-auto bg-plaster py-24 md:py-32 lg:py-40">
      <div className="px-page mx-auto max-w-[1720px]">
        <div className="grid gap-8 md:grid-cols-12 md:gap-x-6 md:gap-y-0">
          <h2 id="house-title" className="font-display text-[clamp(2.25rem,8.4vw,3.25rem)] leading-[1.04] md:col-span-7 md:text-[clamp(2.75rem,4.6vw,4.75rem)] lg:col-span-6">
            {heading}
          </h2>
          <div className="space-y-4 text-[1.0625rem] leading-relaxed text-ink-soft md:col-span-5 md:col-start-8 md:self-end lg:col-span-4 lg:col-start-9">
            {lines.map((l) => (
              <p key={l}>{l}</p>
            ))}
          </div>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-3 md:mt-20 md:grid-cols-12 md:gap-4 lg:gap-5">
          <Panel
            image={images.main}
            sizes="(min-width: 768px) 50vw, 100vw"
            className="col-span-2 aspect-[5/4] md:order-2 md:col-span-6 md:aspect-auto md:h-[min(42vw,46rem)]"
            mat={14}
            radius={18}
            drift
          />
          <Panel
            image={images.tall}
            sizes="(min-width: 768px) 25vw, 50vw"
            className="aspect-[3/4] md:order-1 md:col-span-3 md:aspect-auto md:h-[min(42vw,46rem)]"
          />
          <Panel
            image={images.detail}
            sizes="(min-width: 768px) 25vw, 50vw"
            className="aspect-[3/4] md:order-3 md:col-span-3 md:aspect-auto md:h-[min(42vw,46rem)]"
          />
        </div>
      </div>
    </section>
  );
}
