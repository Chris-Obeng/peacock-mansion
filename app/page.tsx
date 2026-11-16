import { Enquire } from "@/components/Enquire";
import { Faq } from "@/components/Faq";
import { Film } from "@/components/Film";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { House } from "@/components/House";
import { Lenses } from "@/components/Lenses";
import { MobileBar } from "@/components/MobileBar";
import { Occasions } from "@/components/Occasions";
import { Proof } from "@/components/Proof";
import { Visit } from "@/components/Visit";
import { media, site } from "@/content/site";
import { siteUrl } from "@/lib/siteUrl";

function jsonLd() {
  const base = siteUrl();
  const abs = (p: string) => new URL(p, base).toString();
  // Only facts verified in RESEARCH.md: no capacity, bedroom count or street address.
  const data = {
    "@context": "https://schema.org",
    "@type": "EventVenue",
    "@id": abs("/#venue"),
    name: site.name,
    description: site.description,
    url: abs("/"),
    telephone: "+233596112287",
    image: [media["lantern-couple"].src, media["facade-aerial"].src, media["kente-bride"].src].map(abs),
    address: { "@type": "PostalAddress", addressLocality: "Kumasi", addressRegion: "Ashanti Region", addressCountry: "GH" },
    sameAs: [site.contact.tiktokUrl, ...site.listings],
    potentialAction: { "@type": "CommunicateAction", name: "Check a date on WhatsApp", target: site.contact.checkDateUrl },
  };
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function Page() {
  return (
    <>
      <a href="#main" className="fixed left-4 top-4 z-50 -translate-y-24 bg-lacquer px-4 py-3 text-[0.9375rem] text-ivory focus:translate-y-[env(safe-area-inset-top)]">
        {site.skipLink}
      </a>
      <Header overlay />
      <main id="main">
        <Hero />
        <House />
        <Occasions />
        <Film />
        <Lenses />
        <Proof />
        <Faq />
        <Enquire />
        <Visit />
      </main>
      <Footer />
      <MobileBar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd() }} />
    </>
  );
}
