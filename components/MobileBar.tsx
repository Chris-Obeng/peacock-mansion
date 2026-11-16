"use client";

import { site } from "@/content/site";
import { useIdInView } from "@/lib/useInView";

/** Phones only. Hidden while the hero, with its own date plaque, is on screen. */
export function MobileBar({ alwaysShown = false }: { alwaysShown?: boolean }) {
  const overHero = useIdInView("top", "0px 0px -40% 0px", !alwaysShown);
  const shown = alwaysShown || !overHero;
  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 bg-lacquer pb-[env(safe-area-inset-bottom)] shadow-[0_-1px_0_rgb(207_178_122/0.5)] transition-transform duration-[400ms] ease-[var(--ease-out)] md:hidden ${
        shown ? "translate-y-0" : "translate-y-full"
      }`}
      inert={!shown}
    >
      <a
        href={site.contact.checkDateUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="press flex min-h-14 items-center justify-center gap-3 px-6 text-[1rem] text-ivory"
      >
        <svg aria-hidden viewBox="0 0 24 24" className="h-[18px] w-[18px] text-gilt-light" fill="currentColor">
          <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.4.8 3.2.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3z" />
        </svg>
        {site.mobileBar}
      </a>
    </div>
  );
}
