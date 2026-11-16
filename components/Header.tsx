"use client";

import { site } from "@/content/site";
import { useHeroInView } from "@/lib/useHeroInView";
import { Ornament } from "./Ornament";

export function Header() {
  const overHero = useHeroInView();
  const solid = !overHero;

  return (
    <header
      data-solid={solid}
      className={`fixed inset-x-0 top-0 z-40 pt-[env(safe-area-inset-top)] transition-[background-color,color,box-shadow] duration-300 ${
        solid ? "bg-ivory text-ink shadow-[0_1px_0_rgb(22_20_15/0.1)]" : "bg-transparent text-ivory"
      }`}
    >
      <div className="px-page mx-auto flex h-16 max-w-[1680px] items-center justify-between gap-3 md:h-[4.5rem]">
        <a href="#hero" className="press -ml-1 flex min-h-11 min-w-11 shrink-0 items-center gap-2.5 pl-1 pr-2" aria-label={`${site.name}, back to top`}>
          <Ornament className={`h-7 w-7 shrink-0 md:h-8 md:w-8 ${solid ? "text-gold" : "text-gold-light"}`} />
          <span className="font-display hidden text-[0.8125rem] leading-[1.05] xxs:block xs:text-[0.9375rem] md:inline md:text-lg md:leading-none">
            <span className="block md:inline">The Peacock</span> <span className="block md:inline">Mansion</span>
          </span>
        </a>

        <nav aria-label="Main" className="flex items-center">
          <ul className="-mr-1.5 flex items-center gap-0.5 xs:gap-2 md:mr-0 md:gap-6">
            {site.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="label inline-flex min-h-11 min-w-11 items-center justify-center px-1.5 !tracking-[0.14em] opacity-90 transition-opacity duration-300 hover:opacity-100 xs:px-2 md:!tracking-[0.24em]"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={site.contact.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`press label ml-6 hidden min-h-11 items-center border px-5 md:inline-flex ${
              solid ? "border-ink/80 hover:bg-ink hover:text-ivory" : "border-ivory/70 hover:bg-ivory hover:text-ink"
            }`}
          >
            {site.navCta}
          </a>
        </nav>
      </div>
    </header>
  );
}
