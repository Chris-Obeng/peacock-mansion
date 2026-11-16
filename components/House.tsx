import { site } from "@/content/site";
import { Ornament } from "./Ornament";
import { Parallax } from "./Parallax";
import { Picture } from "./Picture";
import { Reveal } from "./Reveal";

export function House() {
  const { label, heading, lines, images } = site.house;
  return (
    <section id="house" aria-labelledby="house-title" className="cv-auto relative bg-ivory py-24 md:py-36 lg:py-48">
      <div className="px-page mx-auto grid max-w-[1680px] grid-cols-4 gap-x-5 md:grid-cols-8 md:gap-x-6 lg:grid-cols-12">
        <Reveal as="header" className="col-span-4 md:col-span-6 lg:col-span-5 lg:row-start-1 lg:self-end lg:pb-10">
          <p className="label text-gold-text">{label}</p>
          <h2 id="house-title" className="font-display mt-6 text-[clamp(2.6rem,9vw,5.75rem)] leading-[0.98] lg:text-[clamp(3.25rem,4.4vw,5.5rem)]">
            {heading.map((l, i) => (
              <span key={l} className="block">
                {i === 2 ? <em className="italic text-gold-text">{l}</em> : l}
              </span>
            ))}
          </h2>
        </Reveal>

        <Reveal className="col-span-4 -mx-5 mt-12 md:col-span-7 md:col-start-2 md:mx-0 md:mt-16 lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1 lg:mt-0 lg:self-start">
          <Picture image={images.main} aspect="5 / 4" sizes="(min-width: 1024px) 56vw, (min-width: 768px) 84vw, 100vw" />
        </Reveal>

        <div className="col-span-4 mt-12 md:col-span-5 md:col-start-2 md:mt-16 lg:col-span-4 lg:col-start-1 lg:row-start-2 lg:row-span-2 lg:mt-14">
          <Ornament className="mb-8 h-9 w-9 text-gold" />
          {lines.map((l) => (
            <p key={l} className="mb-5 max-w-[38ch] text-[1.0625rem] leading-relaxed text-ink-soft">
              {l}
            </p>
          ))}
        </div>

        <Parallax distance={40} className="col-span-2 mt-16 md:col-span-3 md:col-start-2 md:mt-24 lg:col-span-3 lg:col-start-6 lg:row-start-3 lg:mt-24">
          <Picture image={images.tall} aspect="3 / 4" sizes="(min-width: 1024px) 24vw, (min-width: 768px) 36vw, 50vw" />
        </Parallax>

        <Parallax distance={-32} className="col-span-2 mt-40 md:col-span-3 md:col-start-6 md:mt-56 lg:col-span-3 lg:col-start-10 lg:row-start-3 lg:mt-56">
          <Picture image={images.detail} aspect="4 / 5" sizes="(min-width: 1024px) 24vw, (min-width: 768px) 36vw, 50vw" />
        </Parallax>
      </div>
    </section>
  );
}
