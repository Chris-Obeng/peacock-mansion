import { site } from "@/content/site";
import { Ornament } from "./Ornament";

export function Footer() {
  return (
    <footer className="bg-ink pb-[calc(5.5rem+env(safe-area-inset-bottom))] pt-14 text-ivory-dim md:pb-14">
      <div className="px-page mx-auto flex max-w-[1680px] flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <Ornament className="h-7 w-7 text-gold-light" />
          <span className="font-display text-lg text-ivory">{site.name}</span>
        </div>
        <p className="label !tracking-[0.18em]">
          © {new Date().getFullYear()} {site.name} · {site.footer.place}
        </p>
        <a
          href={site.contact.tiktokUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="label inline-flex min-h-11 items-center text-gold-light hover:text-ivory"
        >
          TikTok {site.contact.tiktokHandle}
        </a>
      </div>
    </footer>
  );
}
