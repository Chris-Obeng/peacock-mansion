"use client";

import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import { useIdInView } from "@/lib/useInView";

/**
 * Over the home hero the bar is transparent with ivory type; once the hero has
 * scrolled away (and on every other page) it settles on plaster.
 */
export function Header({ overlay = false }: { overlay?: boolean }) {
  const overHero = useIdInView("top", "-72px 0px 0px 0px", overlay);
  const clear = overlay && overHero;
  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 pt-[env(safe-area-inset-top)] transition-[background-color,color,box-shadow] duration-500 ${
        clear ? "bg-transparent text-ivory" : "bg-plaster/95 text-ink shadow-[0_1px_0_rgb(169_136_78/0.4)] backdrop-saturate-150"
      }`}
    >
      <div className="px-page mx-auto flex h-16 max-w-[1720px] items-center justify-between gap-2 md:h-[4.5rem]">
        <Link href="/" className="press -ml-2 flex min-h-11 min-w-11 shrink-0 items-center gap-3 px-2" aria-label={`${site.name}, home`}>
          <Image src="/media/logo-mark.png" alt="" width={40} height={32} className="h-8 w-auto" priority={false} />
          <span className="font-display hidden text-[1.0625rem] leading-none tracking-[-0.01em] sm:inline md:text-lg">{site.name}</span>
        </Link>
        <nav aria-label="Main" className="flex items-center">
          <ul className="-mr-2 flex items-center md:mr-0 md:gap-2">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`inline-flex min-h-11 items-center px-2 text-[0.875rem] underline-offset-[0.4em] transition-colors duration-300 hover:underline md:px-3 md:text-[0.9375rem] ${
                    clear ? "text-ivory/90 decoration-gilt-light hover:text-ivory" : "text-ink-soft decoration-gilt hover:text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href={site.contact.checkDateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`press ml-4 hidden min-h-11 items-center px-6 text-[0.9375rem] md:inline-flex ${
              clear ? "bg-ivory text-lacquer hover:bg-gilt-light" : "bg-lacquer text-ivory hover:bg-teal"
            }`}
          >
            {site.navCta}
          </a>
        </nav>
      </div>
    </header>
  );
}
