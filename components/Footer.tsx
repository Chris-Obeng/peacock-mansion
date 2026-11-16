import { site } from "@/content/site";
import { Ornament } from "./Ornament";

export function Footer() {
  return (
    <footer className="bg-lacquer pb-[calc(5.5rem+env(safe-area-inset-bottom))] pt-14 text-mist md:pb-14">
      <div className="px-page mx-auto flex max-w-[1720px] flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <Ornament className="h-8 w-8 text-gilt-light" />
          <span className="font-display text-lg text-ivory">{site.name}</span>
        </div>
        <p className="text-[0.875rem]">
          © {new Date().getFullYear()} {site.name}, {site.footer.place}
        </p>
        <a
          href={site.contact.tiktokUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center text-[0.875rem] text-gilt-light underline decoration-gilt/60 hover:text-ivory"
        >
          TikTok {site.contact.tiktokHandle}
        </a>
      </div>
    </footer>
  );
}
