import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { GalleryWall } from "@/components/GalleryWall";
import { Header } from "@/components/Header";
import { MobileBar } from "@/components/MobileBar";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `Gallery · ${site.name}, Kumasi`,
  description: "Weddings, traditional ceremonies and bridal portraits photographed at The Peacock Mansion in Kumasi, Ghana.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  const g = site.gallery;
  return (
    <>
      <a href="#main" className="fixed left-4 top-4 z-50 -translate-y-24 bg-lacquer px-4 py-3 text-[0.9375rem] text-ivory focus:translate-y-[env(safe-area-inset-top)]">
        {site.skipLink}
      </a>
      <Header />
      <main id="main" className="bg-plaster pb-24 pt-[calc(4rem+env(safe-area-inset-top))] md:pb-32 md:pt-[calc(4.5rem+env(safe-area-inset-top))]">
        <div className="px-page mx-auto max-w-[1720px]">
          <header className="py-14 md:py-20">
            <h1 className="font-display text-[clamp(2.75rem,12vw,4rem)] leading-none tracking-[-0.02em] md:text-[clamp(4rem,7vw,7rem)]">{g.title}</h1>
            <p className="mt-6 max-w-[42ch] text-[1.0625rem] leading-relaxed text-ink-soft md:text-lg">{g.heading}</p>
          </header>
          <GalleryWall />
          <p className="mt-10 max-w-[60ch] text-[0.875rem] text-ink-soft">{g.note}</p>
          <div className="mt-16 flex flex-col items-start gap-6 border-t border-gilt/50 pt-12 md:flex-row md:items-center md:justify-between">
            <p className="font-display text-[clamp(1.75rem,6vw,2.5rem)] leading-tight">{g.cta}</p>
            <a
              href={site.contact.checkDateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="press inline-flex min-h-14 items-center bg-lacquer px-8 text-[1rem] text-ivory hover:bg-teal"
            >
              {site.hero.cta}
            </a>
          </div>
        </div>
      </main>
      <Footer />
      <MobileBar alwaysShown />
    </>
  );
}
