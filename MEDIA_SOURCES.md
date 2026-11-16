# Media sources

> v2 note: the photographs are now hung in moulded frames (see DESIGN.md). Hero uses #1 on landscape screens and #2 on portrait screens; the OG image uses #1.

Every photograph on the site is a **placeholder, pending the owner's original**. All of them are host-uploaded listing photos of The Peacock Mansion, downloaded at full resolution (originals are 3024–5712 px wide), saved locally and served from `/public/media/images`. Nothing is hotlinked.

Selection rules: sharp, well lit, at least 1600 px wide at source, no watermark or platform UI, no identifiable guests. Crops and the download URLs are defined in [`scripts/media-manifest.mjs`](scripts/media-manifest.mjs). Re-create everything with `npm run media:fetch && npm run media`.

Listing pages: Airbnb [47817091](https://www.airbnb.com/rooms/47817091) (L1) and Airbnb [47822494](https://www.airbnb.com/rooms/47822494) (L2). Booking.com photos were reviewed but are capped at 1280 px, so none were used.

| # | File | Source | Listing | Why it was chosen | Used in | Status |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | `fountain-dusk.jpg` | [original](https://a0.muscache.com/pictures/miso/Hosting-47822494/original/09ea5ba4-5750-4561-842c-4f1061f3a15a.jpeg) | L2 | Three-tier fountain at dusk, jets running, lit façade. Strongest image of the house; matches the top TikTok video. | Hero (landscape), gallery, OG image | placeholder, pending owner's original |
| 2 | `fountain-portrait.jpg` | same as #1, portrait crop | L2 | Portrait crop centred on the fountain. | Hero (portrait), film poster 1 | placeholder, pending owner's original |
| 3 | `salon.jpg` | [original](https://a0.muscache.com/pictures/hosting/Hosting-47822494/original/49923ff1-ccd4-42f6-8de9-5f2f8cfe7116.jpeg) | L2 | Main salon with Rococo furniture, staircase and arched doors in one frame. | The house, gallery | placeholder, pending owner's original |
| 4 | `statue-gallery.jpg` | [original](https://a0.muscache.com/pictures/hosting/Hosting-47822494/original/85be4e0a-ab4b-4c73-bae0-e18a99edd31f.jpeg) | L2 | Marble figure on the upper gallery under chandeliers; symmetrical, reads as a ceremony space. | Occasions: weddings | placeholder, pending owner's original |
| 5 | `upper-gallery.jpg` | [original](https://a0.muscache.com/pictures/hosting/Hosting-47822494/original/36755757-53db-4edd-8772-5c9b35582024.jpeg) | L2 | Gallery landing with teal-glass chandelier; source of the teal in the palette. | Gallery | placeholder, pending owner's original |
| 6 | `peacock-urn.jpg` | [original](https://a0.muscache.com/pictures/hosting/Hosting-47822494/original/8edeca1f-4288-4eef-b487-7089bcd06a52.jpeg) | L2 | A peacock on a carved urn. Proves the name. Cropped to remove a satellite dish. | The house, gallery | placeholder, pending owner's original |
| 7 | `urns-night.jpg` | [original](https://a0.muscache.com/pictures/hosting/Hosting-47822494/original/ff53beba-d51a-41ba-a63a-b14a9f564dc8.jpeg) | L2 | Lit urns along the wall at night; strong vertical rhythm. | The house, gallery, film poster 3 | placeholder, pending owner's original |
| 8 | `gilt-mirror.jpg` | [original](https://a0.muscache.com/pictures/miso/Hosting-47822494/original/d339bf1a-c529-42d1-9ec3-ac2670b9266d.jpeg) | L2 | Gilt mirror and console with bronze figures; the gold reference, a favourite bridal backdrop. | Occasions: photoshoots | placeholder, pending owner's original |
| 9 | `bronze-relief.jpg` | [original](https://a0.muscache.com/pictures/hosting/Hosting-47822494/original/17f51418-eb30-4972-b862-6b73657ba92a.jpeg) | L2 | African bronze beneath a classical plaster medallion; the house's mix of traditions. | Gallery | placeholder, pending owner's original |
| 10 | `carved-headboard.jpg` | [original](https://a0.muscache.com/pictures/hosting/Hosting-47822494/original/452acec7-f503-4240-a060-64b0010e5208.jpeg) | L2 | Carved headboard, gold-embroidered pillows; the stay told through detail. | Gallery | placeholder, pending owner's original |
| 11 | `carved-nightstand.jpg` | [original](https://a0.muscache.com/pictures/hosting/Hosting-47822494/original/605b488b-4159-4016-a7ce-9b9c3b404024.jpeg) | L2 | Carved bedside cabinet; texture and craft. | Gallery | placeholder, pending owner's original |
| 12 | `dining-hall.jpg` | [original](https://a0.muscache.com/pictures/hosting/Hosting-47822494/original/f4636ee7-f6be-4a11-b894-5c1b1b66ea01.jpeg) | L2 | Gilt dining set with staircase and fireplace; suits family gatherings. | Occasions: traditional ceremonies | placeholder, pending owner's original |
| 13 | `salon-above.jpg` | [original](https://a0.muscache.com/pictures/hosting/Hosting-47822494/original/a754152e-7a17-47d5-bbfe-ed667599ab6f.jpeg) | L2 | Double-height salon from above, peacock plaster relief; the setting of the bridal film. | Gallery, film poster 2 | placeholder, pending owner's original |
| 14 | `arched-door.jpg` | [original](https://a0.muscache.com/pictures/hosting/Hosting-47817091/original/72a2661e-b896-4899-809a-244cfb492ff6.jpeg) | L1 | Arched black door in plaster; inspired the hero's arch reveal. | Gallery, Visit | placeholder, pending owner's original |
| 15 | `console-pair.jpg` | [original](https://a0.muscache.com/pictures/hosting/Hosting-47817091/original/e5f31067-6901-4ee1-809b-240e0ca15fbf.jpeg) | L1 | Console between gilt chairs under a cherub mirror; calm portrait backdrop. | Gallery | placeholder, pending owner's original |
| 16 | `peacock-emblem.jpg` | [original](https://a0.muscache.com/pictures/hosting/Hosting-47822494/original/0153824f-3ad2-4644-b2f7-494833f2f4e0.jpeg) | L2 | The house's own gold peacock emblem on linen; inspired the site ornament. | Gallery | placeholder, pending owner's original |

## Deliberately not used

- **Bridal and couple portraits from the listings** (for example the black-and-white bride at the window, the shoes between veiled busts). These are the most beautiful frames, but they carry a photographer's watermark and/or show identifiable guests. Removing a photographer's mark is not acceptable, so they stay off the site until the owner supplies clean, licensed versions.
- **Exterior façade shots** (driveway, lanterns, gates). Only available at 1280 px or below.
- **Kitchen, bathrooms, TV walls, appliances.** They do not support the occasions the site is selling.
- **TikTok videos.** Not downloaded. The film section uses TikTok's official player behind a click-to-load facade.

## Placeholder slots the owner must fill

| Slot | Path | What to supply |
| --- | --- | --- |
| Hero film | `public/media/video/hero.mp4` and `public/media/video/hero.webm` | 8–15 s silent loop, see [`public/media/video/README.md`](public/media/video/README.md). Under 4 MB each. |
| Hero film poster | `public/media/video/hero-poster.jpg` | First frame of the film, 1920 × 1080 JPEG, under 250 KB. |
| Originals for every photo above | `.media-src/<slug>.jpg`, then `npm run media` | The owner's own full-resolution files with the same subject. Keep the slug names, or edit `scripts/media-manifest.mjs`. |
| Bridal photography (recommended) | add to `scripts/media-manifest.mjs` + `content/site.ts` | 3–6 licensed bridal or couple portraits taken at the house, with written permission from the photographer and the couple. |
| A façade or driveway photo (recommended) | as above | One sharp daylight exterior, at least 2400 px wide. |

The pages that were blocked during research (DesignRush, behind a Cloudflare check; the TikTok video grid, which refuses automated browsers) were not bypassed. Neither was a photo source.
