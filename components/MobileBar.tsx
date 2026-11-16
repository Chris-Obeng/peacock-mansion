"use client";

import { site } from "@/content/site";
import { useHeroInView } from "@/lib/useHeroInView";

/** Phones only. Hidden while the hero (with its own button) is on screen. */
export function MobileBar() {
  const overHero = useHeroInView(0);
  const shown = !overHero;
  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 bg-ink pb-[env(safe-area-inset-bottom)] transition-transform duration-[400ms] ease-[var(--ease-out)] md:hidden ${
        shown ? "translate-y-0" : "translate-y-full"
      }`}
      inert={!shown}
    >
      <a
        href={site.contact.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="press label flex min-h-14 items-center justify-center gap-3 px-6 text-ivory"
      >
        <span className="h-px w-6 bg-gold-light" aria-hidden />
        {site.mobileBar}
        <span className="h-px w-6 bg-gold-light" aria-hidden />
      </a>
    </div>
  );
}
