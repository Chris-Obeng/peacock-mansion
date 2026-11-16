import { site } from "@/content/site";
import { Picture } from "./Picture";
import { Reveal } from "./Reveal";

const hrefFor = {
  whatsapp: site.contact.whatsappUrl,
  phone: site.contact.phoneHref,
  tiktok: site.contact.tiktokUrl,
} as const;

export function Visit() {
  const { label, heading, lines, image, contacts } = site.visit;
  return (
    <section id="visit" aria-labelledby="visit-title" className="cv-auto bg-ivory py-24 md:py-36 lg:py-44">
      <div className="px-page mx-auto grid max-w-[1680px] grid-cols-4 gap-x-5 md:grid-cols-8 md:gap-x-6 lg:grid-cols-12">
        <Reveal className="col-span-4 md:col-span-5 lg:col-span-6">
          <p className="label text-gold-text">{label}</p>
          <h2 id="visit-title" className="font-display mt-6 text-[clamp(4rem,17vw,12rem)] italic leading-[0.85] tracking-[-0.03em]">
            {heading}
          </h2>
          <div className="mt-10 max-w-[40ch] space-y-4 text-[1.0625rem] leading-relaxed text-ink-soft">
            {lines.map((l) => (
              <p key={l}>{l}</p>
            ))}
          </div>

          <address className="mt-12 not-italic">
            <ul className="border-t border-ink/15">
              {contacts.map((c) => {
                const external = c.key !== "phone";
                return (
                  <li key={c.key} className="border-b border-ink/15">
                    <a
                      href={hrefFor[c.key]}
                      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="group flex min-h-16 items-center justify-between gap-4 py-3 transition-colors duration-300 hover:text-gold-text"
                    >
                      <span className="label text-gold-text">{c.label}</span>
                      <span className="text-[1.0625rem] tracking-[0.04em] tabular-nums md:text-lg">{c.value}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </address>
        </Reveal>

        <Reveal className="col-span-3 col-start-2 mt-16 md:col-span-3 md:col-start-6 md:mt-24 lg:col-span-4 lg:col-start-8 lg:mt-12" delay={0.1}>
          <Picture image={image} aspect="3 / 4" sizes="(min-width:1024px) 32vw, (min-width:768px) 36vw, 75vw" />
        </Reveal>
      </div>
    </section>
  );
}
