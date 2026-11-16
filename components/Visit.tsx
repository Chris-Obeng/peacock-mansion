import { site } from "@/content/site";
import { Panel } from "./Panel";

const hrefFor = {
  whatsapp: site.contact.whatsappUrl,
  phone: site.contact.phoneHref,
  tiktok: site.contact.tiktokUrl,
} as const;

/** The way in: the place set large, the facts ruled like a visiting card, and the door. */
export function Visit() {
  const { heading, lines, image, contacts } = site.visit;
  return (
    <section id="visit" aria-labelledby="visit-title" className="cv-auto bg-plaster py-24 md:py-32 lg:py-40">
      <div className="px-page mx-auto grid max-w-[1720px] gap-14 md:grid-cols-12 md:gap-x-6">
        <div className="md:col-span-7 lg:col-span-6">
          <h2 id="visit-title" className="inscription text-[clamp(4.25rem,21vw,7rem)] md:text-[clamp(6rem,12vw,12rem)]">
            {heading}
          </h2>
          <div className="mt-8 max-w-[44ch] space-y-4 text-[1.0625rem] leading-relaxed text-ink-soft">
            {lines.map((l) => (
              <p key={l}>{l}</p>
            ))}
          </div>
          <address className="mt-12 not-italic">
            <ul className="border-t border-gilt/50">
              {contacts.map((c) => {
                const external = c.key !== "phone";
                return (
                  <li key={c.key} className="border-b border-gilt/50">
                    <a
                      href={hrefFor[c.key]}
                      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="group flex min-h-16 items-center justify-between gap-4 py-3"
                    >
                      <span className="text-[0.9375rem] text-gilt-text">{c.label}</span>
                      <span className="num font-display text-[1.25rem] transition-colors duration-300 group-hover:text-teal md:text-[1.5rem]">
                        {c.value}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </address>
        </div>
        <div className="md:col-span-4 md:col-start-9 md:self-end">
          <Panel
            image={image}
            shape="arch"
            mat={12}
            sizes="(min-width: 768px) 32vw, 80vw"
            className="mx-auto aspect-[3/4.4] w-[80%] max-w-sm md:w-full"
          />
        </div>
      </div>
    </section>
  );
}
