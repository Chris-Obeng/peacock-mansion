// Every word, link and media path on the site lives here.
// Facts come only from RESEARCH.md and the owner's own media. Never add a bedroom
// count, a swimming pool, a capacity, a price or a street address.
import { media, type MediaSlug } from "./media.generated";

export interface SiteImage {
  slug: MediaSlug;
  alt: string;
  /** CSS object-position, e.g. "50% 30%" */
  position?: string;
}

export type GalleryTag = "weddings" | "traditional" | "portraits" | "house";

export interface GalleryImage extends SiteImage {
  tags: GalleryTag[];
}

export interface Film {
  id: string;
  title: string;
  length: string;
  poster: SiteImage;
}

const WHATSAPP_NUMBER = "233596112287";
const wa = (text?: string) => `https://wa.me/${WHATSAPP_NUMBER}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

/** Descriptive alt text, written once per photograph. */
export const alt: Record<MediaSlug, string> = {
  "hero-wide": "A bride in purple and gold kente, adorned with gold jewellery, holds a beaded fan inside the mansion.",
  "hero-tall": "A bride in purple and gold kente, adorned with gold jewellery, holds a beaded fan inside the mansion.",
  "lantern-couple": "A bride in a beaded ivory gown and a groom in a white suit pose against a black iron lantern post on the porch at dusk.",
  "lantern-bride": "A bride in an off-shoulder beaded gown stands beside the lit iron lanterns on the front porch, statues behind her.",
  "lantern-couple-full": "A couple in ivory and white stand by the lanterns on the porch at dusk, white statues on either side.",
  "statues-bride": "A bride in a crystal-embroidered gown holds a bouquet beneath the iron lanterns, with marble cherubs and statues behind her.",
  "vintage-car": "A couple in black evening wear stand in front of a vintage green Mercedes in the driveway, lanterns and statues behind.",
  "veil-flight": "A groom in a white tuxedo jacket holds the bride as her long veil lifts in the air beside a gilt console.",
  "bridesmaids": "A bride in a white satin gown with a long train turns from her bridesmaids, dressed in champagne gowns, under dark drapes.",
  "mirror-couple": "A bride with a bouquet of dried flowers and a groom in a white tuxedo jacket stand before a gilt mirror between two globes.",
  "veil-kiss": "A groom kisses the bride's forehead beneath her cathedral veil, with the garden lanterns blurred behind them.",
  "veil-profile": "A bride in lace, seen in profile through her veil, in soft monochrome light.",
  "balcony-bride": "A veiled bride in long-sleeved lace holds white roses at the curved balcony rail.",
  "balcony-couple": "A bride and groom embrace on the curved balcony in front of the rounded glass wall of the mansion.",
  "piano-couple": "A bride in a white veil sits at a black grand piano while the groom in white agbada stands beside her.",
  "groomsmen": "A groom in a white suit stands with ten groomsmen in black on the driveway in front of the mansion.",
  "garden-dinner": "Long dinner tables laid with white flowers and gold-rimmed plates under a white canopy in the garden.",
  "kente-men": "Two men in red and pink kente cloth walk past the iron lanterns on the porch.",
  "kente-bride": "A bride in purple and gold kente, heavy with gold jewellery, smiles over a beaded fan.",
  "kente-embrace": "A groom in kente holds his smiling bride from behind at a traditional wedding.",
  "drummers": "Four drummers in traditional cloth play in front of the mansion during a ceremony.",
  "white-corset": "A bride in a high-collared lace corset gown leans on a fluted white column.",
  "mermaid-train": "A bride in a long-sleeved mermaid gown stands in the salon, her organza train spread across the marble floor.",
  "blue-tulle": "A woman in an ice-blue corset gown with a lace skirt stands at the foot of the marble staircase.",
  "sequin-fan": "A smiling woman in a pink sequinned gown holds a green beaded fan against a white panelled wall.",
  "stair-overhead": "Seen from above, a woman in a gold and green kente gown rests on the glass staircase, holding a fan.",
  "stair-gold": "A woman in a gold and green kente gown descends the marble staircase beneath a crystal chandelier.",
  "lace-back": "A woman in a sheer lace gown with an open back leans on the glass staircase rail.",
  "ombre-gown": "A woman in a pink-to-orange ombré gown with a long train stands in the bay window between dark drapes.",
  "aerial-fountain": "The three-tier fountain and its round, shell-edged basin seen from directly above, set in the lawn.",
  "facade-below": "The white columned façade and curved balcony of the mansion seen from below, with an iron lantern.",
  "floating-stair": "The floating marble staircase curving up under warm light in the entrance hall.",
  "night-facade": "The mansion's lit façade and boundary wall at night, framed by palm trees.",
  "fountain-dusk": "The three-tier white fountain at dusk with the columned façade behind it.",
  "bust": "A classical bronze bust with a white draped stole on a marble pedestal.",
  "salon-couple": "A couple in red kente and agbada share a laugh in the salon beneath a crystal chandelier.",
  "facade-aerial": "An aerial view of the white mansion with its columns, curved glass gallery and the fountain in the garden.",
  "film-1078": "The tiers of the white fountain in front of the mansion.",
  "film-4470": "A bride in purple and gold kente holding a beaded fan.",
  "film-8311": "A bride in a pink lace gown with a fan on the lawn by the lanterns.",
  "film-0070": "A bride in a dark embroidered cape and a groom in a turban and robes stand by the façade.",
  "film-8742": "A couple in matching purple attire face each other, foreheads close.",
  "film-5286": "A white ball gown on a stand in the salon.",
  "film-3606": "A bride in a beaded gown and her groom embrace, laughing, outside the mansion.",
  "film-0150": "A groom in green and gold kente stands with family at his traditional wedding.",
};

const img = (slug: MediaSlug, position?: string): SiteImage => ({ slug, alt: alt[slug], position });

export const site = {
  name: "The Peacock Mansion",
  description:
    "A private French Rococo mansion in Kumasi, Ghana, for traditional weddings, white weddings, bridal shoots and stays. Check your date on WhatsApp.",
  locale: "en_GH",

  contact: {
    whatsappNumber: WHATSAPP_NUMBER,
    whatsappUrl: wa(),
    checkDateUrl: wa("Hello, The Peacock Mansion. I would like to check a date."),
    phoneDisplay: "+233 59 611 2287",
    phoneHref: "tel:+233596112287",
    tiktokUrl: "https://www.tiktok.com/@peacockmansion",
    tiktokHandle: "@peacockmansion",
  },

  /** Public listings, used only for structured data `sameAs`. */
  listings: [
    "https://www.airbnb.com/rooms/47817091",
    "https://www.airbnb.com/rooms/47822494",
    "https://www.booking.com/hotel/gh/the-peacock-mansion.html",
  ],

  nav: [
    { label: "The house", href: "/#house" },
    { label: "Films", href: "/#films" },
    { label: "Gallery", href: "/gallery" },
  ],
  navCta: "Check a date",
  skipLink: "Skip to content",
  mobileBar: "Check your date on WhatsApp",

  hero: {
    heading: "Your wedding, in a Rococo mansion that is yours alone.",
    line: "Traditional ceremonies, white weddings and bridal shoots in a private French-style mansion in Kumasi.",
    cta: "Check your date",
    secondary: "Watch a wedding",
    proof: "Followed by 17,000 people on TikTok for the weddings filmed here.",
    pause: "Pause film",
    play: "Play film",
    video: {
      wide: "https://ik.imagekit.io/eofreoilt/peacock-mansion/hero/hero-wide.mp4?tr=orig-true",
      tall: "https://ik.imagekit.io/eofreoilt/peacock-mansion/hero/hero-tall.mp4?tr=orig-true",
    },
    posterWide: img("hero-wide", "72% 40%"),
    posterTall: img("hero-tall", "50% 25%"),
  },

  house: {
    heading: "One address for the whole day.",
    intro:
      "A wedding usually means a hotel for dressing, a hall for the ceremony and a third place for photographs. Here the bride dresses upstairs, the families meet in the salon, the portraits happen on the staircase and the party moves out to the garden.",
    reasons: [
      {
        title: "Every room is already dressed",
        line: "Chandeliers, gilt mirrors, marble floors and carved statues. You spend on flowers and fashion, not on building a set.",
        image: img("mirror-couple"),
      },
      {
        title: "Made for the camera",
        line: "The fountain, the floating staircase and the lantern-lit porch are why Kumasi's photographers and filmmakers keep coming back.",
        image: img("lantern-couple"),
      },
      {
        title: "Get ready under the same roof",
        line: "En-suite bedrooms with Jacuzzis, so the bridal party can stay the night before and dress on site.",
        image: img("veil-flight"),
      },
      {
        title: "Private and secure",
        line: "The whole house is yours, behind gates, CCTV and electric fencing, in a quiet neighbourhood of Kumasi.",
        image: img("facade-aerial"),
      },
    ],
    stats: [
      { value: "20 min", label: "from Kumasi International Airport" },
      { value: "5.0", label: "guest rating on Airbnb" },
      { value: "230K", label: "views on our most-watched wedding film" },
    ],
  },

  occasions: {
    heading: "What we host",
    items: [
      {
        key: "traditional",
        title: "Traditional weddings",
        line: "Room for both families, the drummers and every gift, with the lanterns and the fountain waiting for the portraits.",
        cta: "Ask about a traditional wedding",
        message: "Hello, The Peacock Mansion. I would like to ask about a traditional wedding.",
        images: [img("kente-embrace"), img("kente-men")],
      },
      {
        key: "white",
        title: "White weddings",
        line: "Vows in the salon, portraits on the staircase and by the lanterns, then dinner in the garden.",
        cta: "Ask about a white wedding",
        message: "Hello, The Peacock Mansion. I would like to ask about a white wedding.",
        images: [img("veil-kiss"), img("garden-dinner")],
      },
      {
        key: "shoots",
        title: "Bridal and fashion shoots",
        line: "Gilt mirrors, the marble stair, statues and the fountain, a few steps apart, for brides, designers and studios.",
        cta: "Ask about a shoot",
        message: "Hello, The Peacock Mansion. I would like to ask about a bridal or fashion shoot.",
        images: [img("white-corset"), img("stair-gold")],
      },
      {
        key: "stays",
        title: "Stays and celebrations",
        line: "Book the whole house for the night before the wedding, a family visit or a birthday.",
        cta: "Ask about a stay",
        message: "Hello, The Peacock Mansion. I would like to ask about a stay.",
        images: [img("floating-stair"), img("night-facade")],
      },
    ],
  },

  films: {
    heading: "Weddings filmed at the house",
    line: "Real couples and the studios who filmed them. Tap a film to play it here.",
    more: "More films on TikTok",
    playLabel: "Play",
    items: [
      { id: "7663946510849101078", title: "Vintage bridal", length: "1:29", poster: img("film-1078") },
      { id: "7646124566938504470", title: "A king and his queen in kente", length: "1:18", poster: img("film-4470") },
      { id: "7700613218561068311", title: "Okatakyie and his queen", length: "1:20", poster: img("film-8311") },
      { id: "7687533660697890070", title: "Yasmin and Sadick", length: "1:18", poster: img("film-0070") },
      { id: "7646064036861283606", title: "White lace and a devoted gaze", length: "0:57", poster: img("film-3606") },
      { id: "7698813625812798742", title: "A symphony of love", length: "1:03", poster: img("film-8742") },
      { id: "7695003263481040150", title: "Piano, cello and kente", length: "1:11", poster: img("film-0150") },
      { id: "7653055027111595286", title: "Elegance in every detail", length: "0:31", poster: img("film-5286") },
    ] satisfies Film[],
  },

  lenses: {
    heading: "Through their lenses",
    line: "Photographs from couples who celebrated here and the studios who shot them.",
    cta: "See the full gallery",
    images: [
      img("lantern-bride"),
      img("kente-bride"),
      img("balcony-couple"),
      img("statues-bride"),
      img("sequin-fan"),
      img("vintage-car"),
      img("groomsmen"),
    ],
  },

  proof: {
    quote:
      "My stay at the Peacock Mansion was fantastic! The rooms were impeccably clean, with comfortable beds… incredibly friendly and accommodating, going above and beyond.",
    by: "Chrissy, United States",
    source: "Guest review on Booking.com",
  },

  steps: {
    heading: "Checking a date takes a minute.",
    items: [
      { title: "Send your date", line: "Tell us the date, the occasion and how many guests, on WhatsApp." },
      { title: "Get the rate", line: "We reply with availability and the rate for your guest count." },
      { title: "Make it yours", line: "Visit the house if you would like to see it first, then confirm your date." },
    ],
  },

  faq: {
    heading: "Questions couples ask",
    items: [
      {
        q: "Can the bridal party stay the night before?",
        a: "Yes. The bedrooms are en-suite with Jacuzzis, air-conditioning and fast Wi-Fi, so you can dress and be photographed without leaving the house.",
      },
      {
        q: "Can we bring our own photographer and videographer?",
        a: "Yes. Photography and videography are charged separately from the event, so ask for the rate when you send your date.",
      },
      {
        q: "Do you provide catering?",
        a: "We work with a professional caterer who can cook for your guests. Menus are priced by the number of dishes you choose.",
      },
      {
        q: "How many guests can we bring?",
        a: "The rate depends on your guest count. Tell us yours and we will send the rate card that fits.",
      },
      {
        q: "How do our guests get there?",
        a: "The house is about 20 minutes from Kumasi International Airport and 10 minutes from Santasi Roundabout. We can arrange a van for your group with our car hire partner.",
      },
    ],
  },

  enquire: {
    heading: "Check your date.",
    line: "Four answers and the message writes itself. You send it on WhatsApp.",
    preview: "Your message",
    fields: {
      name: { label: "Your name", error: "Please tell us your name." },
      date: { label: "Date", hint: "Leave it blank if the day is not fixed yet.", error: "Please choose a date from today onwards." },
      occasion: { label: "Occasion", placeholder: "Choose one", error: "Please choose an occasion." },
      guests: { label: "Guests", error: "Please enter a number of guests between 1 and 500." },
    },
    occasionOptions: ["Traditional wedding", "White wedding", "Bridal or fashion shoot", "Stay", "Birthday or celebration", "Something else"],
    submit: "Send on WhatsApp",
    privacy: "Nothing is stored here. The message opens in WhatsApp for you to send.",
    message: {
      greeting: "Hello, The Peacock Mansion. I would like to check a date.",
      name: "Name",
      occasion: "Occasion",
      date: "Date",
      dateUnknown: "Not fixed yet",
      guests: "Guests",
    },
  },

  visit: {
    heading: "Kumasi",
    lines: [
      "Ashanti Region, Ghana. A quiet, secure neighbourhood about 20 minutes by car from Kumasi International Airport.",
      "Directions are shared on WhatsApp once your visit is arranged.",
    ],
    image: img("facade-below"),
    contacts: [
      { label: "WhatsApp", value: "+233 59 611 2287", key: "whatsapp" },
      { label: "Call", value: "+233 59 611 2287", key: "phone" },
      { label: "TikTok", value: "@peacockmansion", key: "tiktok" },
    ],
  },

  gallery: {
    title: "Gallery",
    heading: "The house, through the lenses of the couples who celebrated here.",
    filters: [
      { key: "all", label: "All" },
      { key: "weddings", label: "White weddings" },
      { key: "traditional", label: "Traditional" },
      { key: "portraits", label: "Portraits" },
      { key: "house", label: "The house" },
    ],
    note: "Photographs by the couples' own studios. Credits appear where the studio signed the frame.",
    cta: "Like what you see? Check your date.",
    open: "Open photograph",
    images: [
      { ...img("lantern-couple"), tags: ["weddings"] },
      { ...img("kente-bride"), tags: ["traditional"] },
      { ...img("veil-kiss"), tags: ["weddings"] },
      { ...img("aerial-fountain"), tags: ["house"] },
      { ...img("white-corset"), tags: ["portraits"] },
      { ...img("kente-men"), tags: ["traditional"] },
      { ...img("statues-bride"), tags: ["weddings"] },
      { ...img("stair-overhead"), tags: ["portraits"] },
      { ...img("balcony-couple"), tags: ["weddings", "house"] },
      { ...img("mirror-couple"), tags: ["weddings"] },
      { ...img("drummers"), tags: ["traditional"] },
      { ...img("sequin-fan"), tags: ["portraits"] },
      { ...img("vintage-car"), tags: ["weddings"] },
      { ...img("floating-stair"), tags: ["house"] },
      { ...img("veil-flight"), tags: ["weddings"] },
      { ...img("kente-embrace"), tags: ["traditional"] },
      { ...img("mermaid-train"), tags: ["portraits"] },
      { ...img("groomsmen"), tags: ["weddings"] },
      { ...img("lantern-bride"), tags: ["weddings"] },
      { ...img("salon-couple"), tags: ["traditional"] },
      { ...img("ombre-gown"), tags: ["portraits"] },
      { ...img("facade-aerial"), tags: ["house"] },
      { ...img("bridesmaids"), tags: ["weddings"] },
      { ...img("stair-gold"), tags: ["portraits"] },
      { ...img("piano-couple"), tags: ["weddings"] },
      { ...img("garden-dinner"), tags: ["weddings", "house"] },
      { ...img("blue-tulle"), tags: ["portraits"] },
      { ...img("veil-profile"), tags: ["weddings"] },
      { ...img("night-facade"), tags: ["house"] },
      { ...img("lace-back"), tags: ["portraits"] },
      { ...img("balcony-bride"), tags: ["weddings"] },
      { ...img("lantern-couple-full"), tags: ["weddings"] },
      { ...img("fountain-dusk"), tags: ["house"] },
      { ...img("bust"), tags: ["house"] },
    ] satisfies GalleryImage[],
  },

  footer: { place: "Kumasi, Ghana" },
} as const;

export { media, wa };
export type Site = typeof site;
