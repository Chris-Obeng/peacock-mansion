# The Peacock Mansion

Single-page site for The Peacock Mansion, a private French Rococo-style house in Kumasi, Ghana. Its one job is to start WhatsApp conversations about weddings, traditional ceremonies, photoshoots and stays.

- Research and verified facts: [`RESEARCH.md`](RESEARCH.md)
- Spec: [`.kiro/specs/peacock-mansion-website/`](.kiro/specs/peacock-mansion-website/) (requirements, design, tasks)
- Photo sources and owner to-do list: [`MEDIA_SOURCES.md`](MEDIA_SOURCES.md)
- All copy, links and media paths: [`content/site.ts`](content/site.ts)

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Motion · `next/image` + sharp · `next/font` (Bodoni Moda, Jost). No database, no auth, no tracking.

## Commands

```bash
npm install
npm run dev               # local development
npm run build && npm start

npm run media:fetch       # download listing originals into .media-src/ (git-ignored)
npm run media             # crop/resize masters into public/media/images + blur placeholders

# Verification (each starts a temporary production server)
scripts/with-server.sh node scripts/screenshots.mjs          # 11 viewports, overflow, tap targets, words, lightbox, form, film
scripts/with-server.sh node scripts/check-image-weights.mjs  # every served image < 300 KB
scripts/with-server.sh node scripts/lighthouse.mjs           # mobile Lighthouse x3
```

Output goes to `.artifacts/` (git-ignored).

## Deploy

Deploy to any Node host that runs `next start` (Vercel works with no config). Set `NEXT_PUBLIC_SITE_URL` to the final domain so canonical URLs, the sitemap, Open Graph and JSON-LD point at it. Responsive AVIF/WebP images are generated on demand by Next's image optimizer and cached, so the very first visitor after a deploy waits slightly longer for images.
