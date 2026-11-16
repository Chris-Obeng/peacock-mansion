// Every word, link and media path on the site lives here.
// Facts are limited to those verified in RESEARCH.md. Do not add bedroom counts,
// a swimming pool, capacities, prices or an address.
import { media, type MediaSlug } from "./media.generated";

export interface SiteImage {
  slug: MediaSlug;
  alt: string;
  /** CSS object-position, e.g. "30% 50%" */
  position?: string;
}

export interface Film {
  id: string;
  title: string;
  length: string;
  poster: SiteImage;
}

export interface Occasion {
  numeral: string;
  title: string;
  line: string;
  image: SiteImage;
}

const WHATSAPP_NUMBER = "233596112287";

const alt = {
  fountainDusk:
    "The three-tier white fountain at dusk, its jets arcing into a round shell-edged basin, with the columned façade and lit windows of the mansion behind.",
  fountainPortrait: "The three-tier white fountain at dusk with the columned façade behind.",
  salon:
    "The main salon: a tufted blush sofa and marble table on a patterned rug, with the staircase, arched doors and candelabra behind.",
  statueGallery:
    "A white marble figure on the upper gallery, framed by glass balustrades and two chandeliers, with an arched black door at the far end.",
  upperGallery:
    "The upper gallery landing under a chandelier of teal glass and gilt, with a plaster ceiling rose, gilt mirror and arched black door.",
  peacockUrn: "A peacock perched on a carved white garden urn beside a black iron lantern post.",
  urnsNight: "A row of white stone urns on pillars along the boundary wall, lit at night.",
  giltMirror:
    "A carved gilt mirror above a gilt console with a marble top, holding two small bronze figures, beside tall windows.",
  bronzeRelief:
    "A bronze figure of a boy carrying a water pot, standing beneath a classical plaster medallion on a white wall.",
  carvedHeadboard: "A carved grey-and-ivory headboard with garlands, above white pillows embroidered in gold.",
  carvedNightstand: "A carved ivory bedside cabinet with rose garlands and scrolled feet on a marble floor.",
  diningHall:
    "A gilt dining table and upholstered chairs on polished marble, with the staircase and a fireplace in the hall beyond.",
  salonAbove:
    "The double-height salon seen from the gallery above: sofas around a marble table, tall dark curtains and a plaster peacock relief on the wall.",
  archedDoor: "An arched black door with frosted panes set into ornate white plaster mouldings.",
  consolePair:
    "A carved black console with a marble top between two gilt chairs, beneath an ornate mirror, in a white panelled room.",
  peacockEmblem: "The house emblem, a gold peacock fan, embroidered on white linen above the words The Peacock Mansion.",
} as const;

export const site = {
  name: "The Peacock Mansion",
  shortName: "Peacock Mansion",
  description:
    "A private French Rococo mansion in Kumasi, Ghana, for intimate weddings, traditional ceremonies and photoshoots. Enquire on WhatsApp.",
  locale: "en_GH",

  contact: {
    whatsappNumber: WHATSAPP_NUMBER,
    whatsappUrl: `https://wa.me/${WHATSAPP_NUMBER}`,
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
    { label: "House", href: "#house" },
    { label: "Gallery", href: "#gallery" },
    { label: "Enquire", href: "#enquire" },
  ],
  navCta: "WhatsApp",
  skipLink: "Skip to content",

  hero: {
    label: "Kumasi · Ghana",
    nameLines: ["The Peacock", "Mansion"],
    line: "A private Rococo house for small weddings, family ceremonies and the photographs that follow.",
    cta: "Plan your day",
    image: { slug: "fountain-dusk", alt: alt.fountainDusk, position: "28% 55%" } satisfies SiteImage,
    /** Art-directed crop for portrait screens. */
    portrait: { slug: "fountain-portrait", alt: alt.fountainPortrait } satisfies SiteImage,
    video: {
      mp4: "/media/video/hero.mp4",
      webm: "/media/video/hero.webm",
      poster: "/media/video/hero-poster.jpg",
    },
  },

  house: {
    label: "I · The house",
    heading: ["White marble,", "black lacquer,", "a little gold."],
    lines: [
      "Behind the gates, a three-tier fountain, carved urns and peacocks that keep their own hours in the garden.",
      "Inside, a floating staircase rises beneath chandeliers to a gallery made for vows, portraits and long dinners.",
    ],
    images: {
      main: { slug: "salon", alt: alt.salon },
      tall: { slug: "urns-night", alt: alt.urnsNight },
      detail: { slug: "peacock-urn", alt: alt.peacockUrn, position: "50% 30%" },
    } satisfies Record<string, SiteImage>,
  },

  gallery: {
    label: "II · Rooms and gardens",
    heading: "Look around.",
    hint: "Tap any photograph to open it.",
    images: [
      { slug: "upper-gallery", alt: alt.upperGallery },
      { slug: "bronze-relief", alt: alt.bronzeRelief },
      { slug: "urns-night", alt: alt.urnsNight },
      { slug: "salon-above", alt: alt.salonAbove },
      { slug: "arched-door", alt: alt.archedDoor },
      { slug: "carved-nightstand", alt: alt.carvedNightstand },
      { slug: "fountain-dusk", alt: alt.fountainDusk, position: "35% 50%" },
      { slug: "peacock-urn", alt: alt.peacockUrn, position: "50% 30%" },
      { slug: "peacock-emblem", alt: alt.peacockEmblem },
      { slug: "salon", alt: alt.salon },
      { slug: "carved-headboard", alt: alt.carvedHeadboard },
      { slug: "console-pair", alt: alt.consolePair },
    ] satisfies SiteImage[],
  },

  occasions: {
    label: "III · Occasions",
    heading: "Three ways to use the house.",
    items: [
      {
        numeral: "i",
        title: "Intimate weddings",
        line: "Vows on the gallery, dinner in the salon, the night upstairs.",
        image: { slug: "statue-gallery", alt: alt.statueGallery },
      },
      {
        numeral: "ii",
        title: "Traditional ceremonies",
        line: "Space for both families, from the knocking to the final toast.",
        image: { slug: "dining-hall", alt: alt.diningHall },
      },
      {
        numeral: "iii",
        title: "Photoshoots",
        line: "Bridal portraits and films against marble, gilt and that staircase.",
        image: { slug: "gilt-mirror", alt: alt.giltMirror },
      },
    ] satisfies Occasion[],
  },

  film: {
    label: "IV · On film",
    heading: "The house, moving.",
    note: "Posters are stills of the house. Films play from TikTok when tapped.",
    playLabel: "Play",
    profileCta: "More on TikTok",
    films: [
      {
        id: "7663946510849101078",
        title: "The fountain",
        length: "1:29",
        poster: { slug: "fountain-portrait", alt: alt.fountainPortrait, position: "50% 50%" },
      },
      {
        id: "7653055027111595286",
        title: "A bride in the salon",
        length: "0:31",
        poster: { slug: "salon-above", alt: alt.salonAbove },
      },
      {
        id: "7687533660697890070",
        title: "Arrival on horseback",
        length: "1:18",
        poster: { slug: "urns-night", alt: alt.urnsNight },
      },
    ] satisfies Film[],
  },

  enquire: {
    label: "V · Enquire",
    heading: "Tell us about your day.",
    line: "Four questions, then the conversation moves to WhatsApp.",
    image: { slug: "peacock-emblem", alt: alt.peacockEmblem } satisfies SiteImage,
    fields: {
      name: { label: "Your name", error: "Please tell us your name." },
      date: { label: "Date", hint: "Leave blank if it is not fixed yet.", error: "Please choose a date from today onwards." },
      occasion: { label: "Occasion", placeholder: "Choose one", error: "Please choose an occasion." },
      guests: { label: "Guests", error: "Please enter a number of guests between 1 and 500." },
    },
    occasionOptions: ["Intimate wedding", "Traditional ceremony", "Photoshoot", "Private stay", "Something else"],
    submit: "Send on WhatsApp",
    privacy: "Nothing is stored here. Your answers open in WhatsApp for you to send.",
    message: {
      greeting: "Hello, The Peacock Mansion. I would like to enquire.",
      name: "Name",
      occasion: "Occasion",
      date: "Date",
      dateUnknown: "Not fixed yet",
      guests: "Guests",
    },
  },

  visit: {
    label: "VI · Visit",
    heading: "Kumasi",
    lines: [
      "Ashanti Region, Ghana. A quiet, secure neighbourhood about twenty minutes by car from Kumasi International Airport.",
      "Directions are shared on WhatsApp once your visit is arranged.",
    ],
    image: { slug: "arched-door", alt: alt.archedDoor } satisfies SiteImage,
    contacts: [
      { label: "WhatsApp", value: "+233 59 611 2287", key: "whatsapp" },
      { label: "Call", value: "+233 59 611 2287", key: "phone" },
      { label: "TikTok", value: "@peacockmansion", key: "tiktok" },
    ],
  },

  footer: {
    place: "Kumasi, Ghana",
  },

  mobileBar: "Enquire on WhatsApp",
} as const;

export { media };
export type Site = typeof site;
