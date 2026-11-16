// v3: every photograph on the site, picked by hand from the owner's folder
// (media-source/images) and from frames of the owner's films (media-source/videos).
// Crops are fractions of the source. `credit` names the studio whose mark was
// cropped out of the frame, so the site can credit them instead.

const I = (f) => ({ file: `media-source/images/${f}` });
const V = (id, t, crop) => ({ video: id, t, crop });
const K = "7646124566938504470"; // A King and his Queen in beautiful kente
const O = "7700613218561068311"; // Another Peacock Mansion love story (Okatakyie)
// Active picture of the two landscape films, without the letterbox bars.
const LB = { left: 0, top: 108 / 1080, width: 1, height: 864 / 1080 };
// A 4:5 portrait cut from a letterboxed landscape frame, centred at x.
const portrait = (x) => {
  const w = (864 * 0.8) / 1920;
  return { left: Math.max(0, Math.min(1 - w, x - w / 2)), top: 108 / 1080, width: w, height: 864 / 1080 };
};

/** @type {{slug:string, crop?:{left:number,top:number,width:number,height:number}, credit?:string, file?:string, video?:string, t?:number}[]} */
export const manifest = [
  // Hero posters: the first frame of the hero reel, so the film fades in without a jump.
  { slug: "hero-wide", ...V(K, 7.55, LB) },
  { slug: "hero-tall", ...V(K, 7.55, { left: 0.6 - 486 / 1920 / 2, top: 108 / 1080, width: 486 / 1920, height: 864 / 1080 }) },

  // Weddings
  { slug: "lantern-couple", ...I("261a7781-aea0-4ca1-8534-8045de141ec1.avif") },
  { slug: "lantern-bride", ...I("3e641f6f-4173-4a6f-a3e3-360ca1c80596.jpeg") },
  { slug: "lantern-couple-full", ...I("c85213d9-65a3-4136-8023-969e141e31bd.avif") },
  { slug: "statues-bride", ...I("9393eb70-0fd9-4c82-aa5a-928d1d849509.avif") },
  { slug: "vintage-car", ...I("2a231e48-4007-4595-9d2f-62a81b9b61b6.avif") },
  { slug: "veil-flight", ...I("Screenshot 2026-11-16 143641.png"), crop: { left: 0.012, top: 0.01, width: 0.976, height: 0.98 } },
  { slug: "bridesmaids", ...I("Screenshot 2026-11-16 144201.png"), crop: { left: 0.012, top: 0.012, width: 0.976, height: 0.85 } },
  { slug: "mirror-couple", ...I("Screenshot 2026-11-16 144234.png"), crop: { left: 0.012, top: 0.012, width: 0.976, height: 0.976 } },
  { slug: "veil-kiss", ...I("Screenshot 2026-11-16 144944.png"), crop: { left: 0, top: 0, width: 1, height: 0.86 } },
  { slug: "veil-profile", ...I("Screenshot 2026-11-16 144858.png"), crop: { left: 0, top: 0, width: 1, height: 0.87 } },
  { slug: "balcony-bride", ...I("Screenshot 2026-11-16 145100.png"), crop: { left: 0, top: 0, width: 1, height: 0.86 } },
  { slug: "balcony-couple", ...I("Screenshot 2026-11-16 145132.png") },
  { slug: "piano-couple", ...I("922681612.jpg") },
  { slug: "groomsmen", ...I("ec5ab309-7ad2-4187-986f-0e65b1579d22.jpeg") },
  { slug: "garden-dinner", ...I("bf59f5d1-ad8b-4a51-95dd-a34db90392c8.avif") },

  // Traditional ceremonies
  { slug: "kente-men", ...I("5441a711-a1ac-4083-babf-0653ee272440.avif"), crop: { left: 0.02, top: 0.016, width: 0.96, height: 0.968 } },
  { slug: "kente-bride", ...V(K, 7.3, portrait(0.6)) },
  { slug: "kente-embrace", ...V(K, 8.6, portrait(0.72)) },
  { slug: "drummers", ...V(K, 13.2, LB) },

  // Portraits and fashion
  { slug: "white-corset", ...I("Screenshot 2026-11-16 145848.png"), crop: { left: 0.01, top: 0.012, width: 0.98, height: 0.93 }, credit: "HenryGenesiz Studios" },
  { slug: "mermaid-train", ...I("Screenshot 2026-11-16 145800.png"), crop: { left: 0, top: 0, width: 1, height: 0.88 }, credit: "HenryGenesiz Studios" },
  { slug: "blue-tulle", ...I("Screenshot 2026-11-16 145902.png"), crop: { left: 0.01, top: 0.012, width: 0.98, height: 0.88 }, credit: "HenryGenesiz Studios" },
  { slug: "sequin-fan", ...I("Screenshot 2026-11-16 145402.png"), crop: { left: 0, top: 0, width: 1, height: 0.9 }, credit: "Bangscoe Visuals" },
  { slug: "stair-overhead", ...I("Screenshot 2026-11-16 145431.png"), crop: { left: 0, top: 0, width: 1, height: 0.9 }, credit: "Bangscoe Visuals" },
  { slug: "stair-gold", ...I("Screenshot 2026-11-16 145447.png"), crop: { left: 0, top: 0.02, width: 1, height: 0.86 }, credit: "Bangscoe Visuals" },
  { slug: "lace-back", ...I("Screenshot 2026-11-16 144614.png") },
  { slug: "ombre-gown", ...I("816360301.jpg") },

  // The house
  { slug: "aerial-fountain", ...V(O, 2.75, LB) },
  { slug: "facade-below", ...V(K, 0.6, LB) },
  { slug: "floating-stair", ...I("498755341.jpg") },
  { slug: "night-facade", ...I("475583004.jpg") },
  { slug: "fountain-dusk", ...I("475582867.jpg") },
  { slug: "bust", ...I("ff7e4690-76f3-4c54-b867-308a975edb46.avif") },
  { slug: "salon-couple", ...V(O, 3.85, LB) },

  // Film posters (portrait stills from each film)
  { slug: "film-1078", ...V("7663946510849101078", 0.3, { left: 0, top: 0.15, width: 1, height: 0.703 }) },
  { slug: "film-4470", ...V(K, 7.0, portrait(0.6)) },
  { slug: "film-8311", ...V(O, 45, portrait(0.57)) },
  { slug: "film-0070", ...V("7687533660697890070", 40, { left: 0, top: 0.14, width: 1, height: 0.703 }) },
  { slug: "film-8742", ...V("7698813625812798742", 50.5, { left: 0.62 - 0.2 / 2 - 0.1, top: 52 / 1080, width: 0.4, height: 976 / 1080 }) },
  { slug: "film-5286", ...V("7653055027111595286", 0.3, { left: 0.3, top: 0, width: 0.4, height: 1 }) },
  { slug: "film-3606", ...V("7646064036861283606", 46, { left: 0, top: 0.15, width: 1, height: 0.703 }) },
  { slug: "film-0150", ...V("7695003263481040150", 33, { left: 0.35, top: 0, width: 0.4, height: 1 }) },
  { slug: "facade-aerial", ...V("7698813625812798742", 44, { left: 0, top: 52 / 1080, width: 1, height: 976 / 1080 }) },
];
