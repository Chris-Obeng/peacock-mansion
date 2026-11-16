// Single source of truth for which listing photos the site uses, where they came from,
// and how they are cropped. Read by fetch-media.mjs, process-images.mjs and MEDIA_SOURCES.md.
// Status of every entry: placeholder, pending owner's original.

const L1 = "https://www.airbnb.com/rooms/47817091";
const L2 = "https://www.airbnb.com/rooms/47822494";
const raw = (u) => u.replace("/im/pictures/", "/pictures/"); // full-resolution original

/** @typedef {{left:number, top:number, width:number, height:number}} Crop  fractions of the source */
/** @type {{slug:string, listing:string, source:string, crop?:Crop, from?:string, reason:string}[]} */
export const manifest = [
  {
    slug: "fountain-dusk",
    listing: L2,
    source: raw("https://a0.muscache.com/im/pictures/miso/Hosting-47822494/original/09ea5ba4-5750-4561-842c-4f1061f3a15a.jpeg"),
    reason: "The three-tier fountain at dusk with the jets running and the lit façade behind. The single strongest image of the house; matches the top TikTok video. Hero and Open Graph image.",
  },
  {
    slug: "fountain-portrait",
    listing: L2,
    from: "fountain-dusk",
    source: raw("https://a0.muscache.com/im/pictures/miso/Hosting-47822494/original/09ea5ba4-5750-4561-842c-4f1061f3a15a.jpeg"),
    crop: { left: 0.06, top: 0, width: 0.54, height: 1 },
    reason: "Portrait crop of the same frame, centred on the fountain, for the first film poster.",
  },
  {
    slug: "salon",
    listing: L2,
    source: raw("https://a0.muscache.com/im/pictures/hosting/Hosting-47822494/original/49923ff1-ccd4-42f6-8de9-5f2f8cfe7116.jpeg"),
    reason: "Main salon: tufted blush sofa, marble table, staircase and arched doors behind. Shows scale and the Rococo furniture in one frame.",
  },
  {
    slug: "statue-gallery",
    listing: L2,
    source: raw("https://a0.muscache.com/im/pictures/hosting/Hosting-47822494/original/85be4e0a-ab4b-4c73-bae0-e18a99edd31f.jpeg"),
    reason: "Marble figure on the upper gallery under two chandeliers. Symmetrical, bright, reads as a ceremony space.",
  },
  {
    slug: "upper-gallery",
    listing: L2,
    source: raw("https://a0.muscache.com/im/pictures/hosting/Hosting-47822494/original/36755757-53db-4edd-8772-5c9b35582024.jpeg"),
    reason: "The gallery landing with the teal-glass chandelier, plaster rose and arched black door. Source of the teal in the palette.",
  },
  {
    slug: "peacock-urn",
    listing: L2,
    source: raw("https://a0.muscache.com/im/pictures/hosting/Hosting-47822494/original/8edeca1f-4288-4eef-b487-7089bcd06a52.jpeg"),
    crop: { left: 0, top: 0.22, width: 1, height: 0.78 },
    reason: "A peacock perched on a carved garden urn beside an iron lantern post. Proves the name. Cropped to remove a satellite dish at the top.",
  },
  {
    slug: "urns-night",
    listing: L2,
    source: raw("https://a0.muscache.com/im/pictures/hosting/Hosting-47822494/original/ff53beba-d51a-41ba-a63a-b14a9f564dc8.jpeg"),
    reason: "Row of lit urns along the boundary wall at night. Strong vertical rhythm and contrast for the editorial layout.",
  },
  {
    slug: "gilt-mirror",
    listing: L2,
    source: raw("https://a0.muscache.com/im/pictures/miso/Hosting-47822494/original/d339bf1a-c529-42d1-9ec3-ac2670b9266d.jpeg"),
    reason: "Gilt Rococo mirror and console with bronze figures. Gold-leaf reference for the palette; the backdrop bridal portraits use most.",
  },
  {
    slug: "bronze-relief",
    listing: L2,
    source: raw("https://a0.muscache.com/im/pictures/hosting/Hosting-47822494/original/17f51418-eb30-4972-b862-6b73657ba92a.jpeg"),
    reason: "African bronze figure beneath a classical plaster medallion. Shows the African and European mix the owner describes.",
  },
  {
    slug: "carved-headboard",
    listing: L2,
    source: raw("https://a0.muscache.com/im/pictures/hosting/Hosting-47822494/original/452acec7-f503-4240-a060-64b0010e5208.jpeg"),
    reason: "Close view of a carved headboard with gold-embroidered pillows. The stay, told through detail rather than a bedroom count.",
  },
  {
    slug: "carved-nightstand",
    listing: L2,
    source: raw("https://a0.muscache.com/im/pictures/hosting/Hosting-47822494/original/605b488b-4159-4016-a7ce-9b9c3b404024.jpeg"),
    reason: "Carved bedside cabinet with rose garlands. Texture and craft at small size.",
  },
  {
    slug: "dining-hall",
    listing: L2,
    source: raw("https://a0.muscache.com/im/pictures/hosting/Hosting-47822494/original/f4636ee7-f6be-4a11-b894-5c1b1b66ea01.jpeg"),
    reason: "Gilt dining set on marble with the staircase and fireplace beyond. Suits family gatherings and traditional ceremonies.",
  },
  {
    slug: "salon-above",
    listing: L2,
    source: raw("https://a0.muscache.com/im/pictures/hosting/Hosting-47822494/original/a754152e-7a17-47d5-bbfe-ed667599ab6f.jpeg"),
    reason: "The double-height salon seen from the gallery, with the peacock plaster relief. Shows ceiling height and the bridal-film setting.",
  },
  {
    slug: "arched-door",
    listing: L1,
    source: raw("https://a0.muscache.com/im/pictures/hosting/Hosting-47817091/original/72a2661e-b896-4899-809a-244cfb492ff6.jpeg"),
    reason: "Arched black-lacquer door in white plaster. Source of the hero's arch reveal; used in Visit.",
  },
  {
    slug: "console-pair",
    listing: L1,
    source: raw("https://a0.muscache.com/im/pictures/hosting/Hosting-47817091/original/e5f31067-6901-4ee1-809b-240e0ca15fbf.jpeg"),
    reason: "Carved console between two gilt chairs under a cherub mirror. Calm, symmetrical portrait backdrop.",
  },
  {
    slug: "peacock-emblem",
    listing: L2,
    source: raw("https://a0.muscache.com/im/pictures/hosting/Hosting-47822494/original/0153824f-3ad2-4644-b2f7-494833f2f4e0.jpeg"),
    crop: { left: 0.18, top: 0.12, width: 0.64, height: 0.76 },
    reason: "The house's own gold peacock-fan emblem embroidered on linen. Inspired the site ornament; used beside the enquiry form.",
  },
];
