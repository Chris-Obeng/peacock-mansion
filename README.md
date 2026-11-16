# The Peacock Mansion

Single-page site for The Peacock Mansion, a private French Rococo-style house in Kumasi, Ghana. Its one job is to start WhatsApp conversations about weddings, traditional ceremonies, photoshoots and stays.

- Research and verified facts: [`RESEARCH.md`](RESEARCH.md)
- Spec: [`.kiro/specs/peacock-mansion-website/`](.kiro/specs/peacock-mansion-website/) (requirements, design, tasks)
- Photo sources and owner to-do list: [`MEDIA_SOURCES.md`](MEDIA_SOURCES.md)
- All copy, links and media paths: [`content/site.ts`](content/site.ts)

## Stack

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, Motion (lightbox swipe only), `next/image` + sharp, `next/font/local` (Zodiak and Switzer from Indian Type Foundry). No database, no auth, no tracking.

Design system: [`DESIGN.md`](DESIGN.md). Product facts: [`PRODUCT.md`](PRODUCT.md).

Font licence: Zodiak and Switzer are used under the ITF Free Font License (`app/fonts/ITF-FFL-License.txt`), which allows self-hosting on your own website but not redistributing the font files. Keep this repository private.

## Commands

```bash
npm install
npm run dev               # local development
npm run build && npm start

FFMPEG=/path/to/ffmpeg npm run media      # photos + film stills from media-source/ into public/media/images
FFMPEG=/path/to/ffmpeg npm run hero:reel  # cut the hero reel (wide + tall) into .media-build/hero

# Verification (each starts a temporary production server)
scripts/with-server.sh node scripts/screenshots.mjs          # 11 viewports, overflow, tap targets, words, lightbox, form, film
scripts/with-server.sh node scripts/check-image-weights.mjs  # every served image < 300 KB
scripts/with-server.sh node scripts/lighthouse.mjs           # mobile Lighthouse x3
```

Output goes to `.artifacts/` (git-ignored).

## Media

- `media-source/images` and `media-source/videos` hold the owner's originals. They are not served; `public/` only gets the processed photos.
- The hero reel lives on ImageKit at `ik.imagekit.io/eofreoilt/peacock-mansion/hero/`. It is requested with `?tr=orig-true`, so ImageKit serves the file as uploaded and spends no video-processing units. To replace it, run `npm run hero:reel` and upload the two files to the same paths.
- The other films play from TikTok when tapped.

## Deploy

Deploy to any Node host that runs `next start` (Vercel works with no config). Set `NEXT_PUBLIC_SITE_URL` to the final domain so canonical URLs, the sitemap, Open Graph and JSON-LD point at it. Responsive AVIF/WebP images are generated on demand by Next's image optimizer and cached, so the very first visitor after a deploy waits slightly longer for images.
