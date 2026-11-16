import { site } from "@/content/site";

export interface Enquiry {
  name: string;
  occasion: string;
  date: string; // ISO yyyy-mm-dd or ""
  guests: string;
}

function formatDate(iso: string): string {
  const [y, mo, d] = iso.split("-").map(Number);
  if (!y || !mo || !d) return iso;
  return new Date(Date.UTC(y, mo - 1, d)).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function buildEnquiryMessage(e: Enquiry): string {
  const t = site.enquire.message;
  return [
    t.greeting,
    "",
    `${t.name}: ${e.name.trim()}`,
    `${t.occasion}: ${e.occasion}`,
    `${t.date}: ${e.date ? formatDate(e.date) : t.dateUnknown}`,
    `${t.guests}: ${e.guests}`,
  ].join("\n");
}

export function whatsappLink(text?: string): string {
  const base = site.contact.whatsappUrl;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
