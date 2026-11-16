# Media sources (v3)

All photographs and films on the site now come from the owner. The originals are in `media-source/` (added by the owner on 16 Nov 2026). Earlier listing photos from Airbnb and Booking.com have been removed.

Processing: `scripts/media-manifest.mjs` lists every photo, its source file or film frame, and its crop. `npm run media` writes the web masters to `public/media/images/`; next/image serves them as AVIF/WebP at the right size.

## Hero reel (hosted on ImageKit)

Cut by `scripts/hero-reel.mjs` from the two films the owner chose:

- "A King and his Queen in beautiful kente" (TikTok 7646124566938504470)
- "Another Peacock Mansion love story! Okatakyie & his beautiful Queen" (TikTok 7700613218561068311)

Twelve shots, 18 seconds, silent, looping. The second film is slowed to 80% for a calmer pace. Letterbox bars removed.

| File | Size | URL |
| --- | --- | --- |
| `hero-wide.mp4` (1600×720, landscape screens) | 3.5 MB | https://ik.imagekit.io/eofreoilt/peacock-mansion/hero/hero-wide.mp4 |
| `hero-tall.mp4` (540×960, phones) | 2.0 MB | https://ik.imagekit.io/eofreoilt/peacock-mansion/hero/hero-tall.mp4 |

The site requests both with `?tr=orig-true`, so ImageKit delivers the uploaded file unchanged and uses no video-processing units. One play costs about 2–3.5 MB of the 20 GB monthly bandwidth.

## Photographs used

Selected from the 62 images supplied: sharp, well composed, the house visible, no visible platform UI.

| Group | Slugs |
| --- | --- |
| White weddings | lantern-couple, lantern-bride, lantern-couple-full, statues-bride, vintage-car, veil-flight, bridesmaids, mirror-couple, veil-kiss, veil-profile, balcony-bride, balcony-couple, piano-couple, groomsmen, garden-dinner |
| Traditional | kente-men, kente-bride*, kente-embrace*, drummers* |
| Portraits | white-corset, mermaid-train, blue-tulle, sequin-fan, stair-overhead, stair-gold, lace-back, ombre-gown |
| The house | aerial-fountain*, facade-below*, facade-aerial*, salon-couple*, floating-stair, night-facade, fountain-dusk, bust |
| Film posters | film-1078, film-4470, film-8311, film-0070, film-3606, film-8742, film-0150, film-5286 (all stills from the films) |

\* Still frame taken from one of the owner's films.

Left out: interior listing-style shots (bedrooms, sofas, TV walls) that look like rental photos, the duplicate staircase shot, a dim décor setup, the round logo (used separately), and the bathtub shot.

## Studio marks and credits

Several photographs carried a studio signature or an app overlay icon at the bottom edge. Those were cropped for composition, and the studio is credited on the gallery page and in the lightbox:

| Photographs | Studio credited |
| --- | --- |
| white-corset, mermaid-train, blue-tulle | HenryGenesiz Studios |
| sequin-fan, stair-overhead, stair-gold | Bangscoe Visuals |

The "Ka" signature on `bridesmaids` and app overlay icons on `veil-kiss`, `veil-profile` and `balcony-bride` were also cropped; tell me the studio names and I'll add credits for those too.

**Please confirm in writing (WhatsApp is fine) that each studio and couple is happy for these photographs and films to appear on the website.** Posting them on TikTok does not by itself cover use on the site.

## Films (play from TikTok when tapped)

7663946510849101078, 7646124566938504470, 7700613218561068311, 7687533660697890070, 7646064036861283606, 7698813625812798742, 7695003263481040150, 7653055027111595286. The other 14 films supplied stay on TikTok.

## Logo

`public/media/logo-mark.png` (emblem) and `public/media/logo.png` (emblem and name) are cut from the owner's logo file with the white background removed.
