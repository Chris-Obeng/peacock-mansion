import { site } from "@/content/site";
import { Picture } from "./Picture";
import { Reveal } from "./Reveal";

/** Three rows that deliberately do not match: image size, side and ratio change each time. */
const rows = [
  {
    image: "col-span-4 md:col-span-5 lg:col-span-6 lg:col-start-1",
    text: "col-span-4 md:col-span-3 md:col-start-6 md:self-end lg:col-span-4 lg:col-start-8",
    aspect: "4 / 3",
    sizes: "(min-width:1024px) 48vw, (min-width:768px) 60vw, 100vw",
  },
  {
    image: "col-span-3 col-start-2 md:col-span-3 md:col-start-6 md:row-start-1 lg:col-span-3 lg:col-start-9",
    text: "col-span-4 md:col-span-4 md:col-start-1 md:row-start-1 md:self-center lg:col-span-4 lg:col-start-3",
    aspect: "4 / 5",
    sizes: "(min-width:1024px) 24vw, (min-width:768px) 36vw, 75vw",
  },
  {
    image: "col-span-4 md:col-span-4 md:col-start-2 lg:col-span-4 lg:col-start-2",
    text: "col-span-4 md:col-span-3 md:col-start-6 md:self-start md:pt-16 lg:col-span-4 lg:col-start-7 lg:pt-32",
    aspect: "1 / 1",
    sizes: "(min-width:1024px) 32vw, (min-width:768px) 48vw, 100vw",
  },
];

export function Occasions() {
  const { label, heading, items } = site.occasions;
  return (
    <section id="occasions" aria-labelledby="occasions-title" className="cv-auto bg-ivory py-24 md:py-36 lg:py-48">
      <div className="px-page mx-auto max-w-[1680px]">
        <Reveal as="header" className="mb-16 max-w-3xl md:mb-24">
          <p className="label text-gold-text">{label}</p>
          <h2 id="occasions-title" className="font-display mt-6 text-[clamp(2.4rem,8vw,5rem)] leading-[1.02]">
            {heading}
          </h2>
        </Reveal>

        <ol className="flex flex-col gap-24 md:gap-32 lg:gap-40">
          {items.map((item, i) => {
            const r = rows[i]!;
            return (
              <li key={item.title} className="grid grid-cols-4 gap-x-5 gap-y-8 md:grid-cols-8 md:gap-x-6 lg:grid-cols-12">
                <Reveal className={r.image}>
                  <Picture image={item.image} aspect={r.aspect} sizes={r.sizes} />
                </Reveal>
                <Reveal className={r.text} delay={0.12}>
                  <span aria-hidden className="font-display block text-[clamp(3.5rem,10vw,7rem)] italic leading-none text-gold">
                    {item.numeral}
                  </span>
                  <h3 className="font-display mt-4 text-[clamp(1.75rem,4.5vw,2.75rem)] leading-tight">{item.title}</h3>
                  <span className="hairline mt-5 block w-12 text-gold" aria-hidden />
                  <p className="mt-5 max-w-[32ch] text-[1.0625rem] leading-relaxed text-ink-soft">{item.line}</p>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
