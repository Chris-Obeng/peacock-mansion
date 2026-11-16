"use client";

import { site } from "@/content/site";
import { useIdInView } from "@/lib/useInView";
import { Ornament } from "./Ornament";

export function Header() {
  const atTop = useIdInView("top-sentinel");
  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 bg-plaster/95 pt-[env(safe-area-inset-top)] transition-[box-shadow] duration-300 supports-[backdrop-filter]:bg-plaster/90 ${
        atTop ? "" : "shadow-[0_1px_0_rgb(169_136_78/0.45)]"
      }`}
    >
      <div className="px-page mx-auto flex h-16 max-w-[1720px] items-center justify-between gap-2 md:h-[4.5rem]">
        <a href="#top" className="press -ml-2 flex min-h-11 min-w-11 shrink-0 items-center gap-3 px-2" aria-label={`${site.name}, back to top`}>
          <Ornament className="h-8 w-8 shrink-0 text-gilt" />
          <span className="font-display hidden text-[1.0625rem] leading-none tracking-[-0.01em] sm:inline md:text-lg">{site.name}</span>
        </a>
        <nav aria-label="Main" className="flex items-center">
          <ul className="-mr-2 flex items-center md:mr-0 md:gap-3">
            {site.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="inline-flex min-h-11 items-center px-2 text-[0.875rem] text-ink-soft decoration-gilt underline-offset-[0.4em] transition-colors duration-300 hover:text-ink hover:underline md:px-3 md:text-[0.9375rem]"
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
            className="press ml-4 hidden min-h-11 items-center bg-lacquer px-6 text-[0.9375rem] text-ivory hover:bg-teal md:inline-flex"
          >
            {site.navCta}
          </a>
        </nav>
      </div>
    </header>
  );
}
