# Tasks: The Peacock Mansion website

- [x] 1. Phase 0 research (R9, R10)
  - [x] 1.1 TikTok profile, creator embed and oEmbed; rank videos by views
  - [x] 1.2 Both Airbnb listings, Booking.com, Expedia/Vrbo search results; record facts and conflicts
  - [x] 1.3 Reference sites (principles only); note blocked pages
  - [x] 1.4 Write `RESEARCH.md` with verified facts, unverified claims, mood, principles and thesis

- [x] 2. Spec
  - [x] 2.1 `requirements.md`
  - [x] 2.2 `design.md`
  - [x] 2.3 `tasks.md`

- [x] 3. Project scaffold (R9, R12)
  - [x] 3.1 Next.js (App Router) + TypeScript + Tailwind v4 + Motion; ESLint; `.gitignore`
  - [x] 3.2 `next.config.ts` image formats/device sizes, security headers
  - [x] 3.3 Tokens in `app/globals.css` (`@theme`), fonts via `next/font` in `app/fonts.ts`

- [x] 4. Media (R9)
  - [x] 4.1 `scripts/fetch-media.mjs`: download the selected originals into git-ignored `.media-src/`
  - [x] 4.2 `scripts/process-images.mjs`: masters, crops, blur placeholders, `content/media.generated.ts`
  - [x] 4.3 `MEDIA_SOURCES.md`: source URL, reason, status per image; list of gaps and owner files
  - [x] 4.4 `public/media/video/README.md`: hero video spec (≤ 4 MB, sizes, codecs)

- [x] 5. Content (R1, R9)
  - [x] 5.1 `content/site.ts`: all copy, links, alt text, media paths, typed
  - [x] 5.2 `scripts/count-words.mjs`: assert visible words < 250

- [x] 6. Components (R1–R8, R10, R11, R13)
  - [x] 6.1 `Ornament`, `Reveal` (in-view fade), `SiteImage` wrapper
  - [x] 6.2 `Header` with solid state after hero; skip link
  - [x] 6.3 `Hero` with arch reveal, Ken Burns fallback, `HeroVideo` with saveData/connection checks
  - [x] 6.4 `House` with parallax pair
  - [x] 6.5 `Gallery` + `Lightbox` (`<dialog>`, keys, swipe, focus return, live position)
  - [x] 6.6 `Occasions` (three unalike rows)
  - [x] 6.7 `Film` + `TikTokFacade` (one at a time, preconnect on intent)
  - [x] 6.8 `Enquire` form → WhatsApp prefilled message, validation
  - [x] 6.9 `Visit`, `Footer`, `MobileBar`

- [x] 7. SEO (R14)
  - [x] 7.1 Metadata, canonical, OG/Twitter
  - [x] 7.2 `opengraph-image.tsx` with bundled Bodoni Moda font
  - [x] 7.3 `EventVenue` JSON-LD, `robots.ts`, `sitemap.ts`, `icon.svg`

- [x] 8. Verification (R11, R12, R15)
  - [x] 8.1 `lint`, `typecheck`, `build`
  - [x] 8.2 `scripts/screenshots.mjs`: 360/375/390/430/768/1024/1280/1440/1920/2560 + landscape; overflow and tap-target checks; lightbox keyboard test
  - [x] 8.3 Review screenshots, fix flaws, re-run
  - [x] 8.4 `scripts/check-image-weights.mjs`: every served image under 300 KB
  - [x] 8.5 Lighthouse mobile: Performance ≥ 90, A11y/BP/SEO ≥ 95; fix and re-run
  - [x] 8.6 Commit, push branch, open PR; final summary with owner file list

## Verification results (16 Nov 2026)

- Screenshots at 360, 375, 390, 430, 844×390 landscape, 768, 1024, 1280, 1440, 1920, 2560: no horizontal overflow, nothing clipped at the edge, every tap target ≥ 44 px. Fixes made after review: art-directed portrait hero crop, mobile gallery aspect ratios, gallery no longer repeats the Occasions photos, phone numbers set in Jost (Bodoni's "+" was too thin), header wordmark collapses to the mark below 368 px, compact hero on landscape phones, opaque lightbox, eager lightbox image.
- Visible copy: 197 words (budget 250).
- Lightbox: keyboard open, arrow navigation, focus trap, Esc, focus returned to thumbnail.
- Enquiry form: validation on empty submit; valid submit opens `wa.me/233596112287` with the prefilled message.
- Film: no TikTok requests before a tap; one player at a time.
- Images: all AVIF, largest 112 KB (phone @3x hero).
- Mobile Lighthouse (5 runs, warm): Performance 96, Accessibility 100, Best Practices 100, SEO 100. Cold first run after a fresh server start scores 89 because the image optimizer encodes the hero AVIF on first request.

## v2: Boiserie redesign (owner feedback: v1 looked generic)

- [x] Install design skills: Emil Kowalski (MIT), Anthropic `frontend-design` (Apache 2.0), Impeccable (Apache 2.0)
- [x] Study live references: Airelles Le Grand Contrôle, Hôtel de Crillon, The Fife Arms, Terreno, Cliveden, Belmond Cipriani, Awwwards hotel category (principles only)
- [x] PRODUCT.md (inferred from the brief), Impeccable concept roll, seven grounded directions, direction contract
- [x] Fonts: Zodiak + Switzer, self-hosted via next/font/local
- [x] Moulding system (Panel, Moulding, arch, plaque, field)
- [x] Rebuild every section in the Boiserie world; hero date plaque as the working first-viewport action; live WhatsApp message preview
- [x] Motion: gilt line draw, CSS scroll-driven drift; Motion only for the lightbox swipe
- [x] OG image redrawn in the new world
- [x] Verification: 11 viewports pass, 222 words, Lighthouse mobile 97/100/100/100, all images AVIF ≤ 139 KB, Impeccable detector clean
- [x] DESIGN.md

## v3: the owner's own media and conversion copy

- [x] Hero reel cut from the two films the owner chose (wide + tall), hosted on ImageKit with orig-true delivery
- [x] 37 photographs hand-picked from the owner's folder plus film stills; studio credits kept
- [x] Two pages: home and /gallery (filters, masonry, lightbox)
- [x] Conversion copy: value proposition, four reasons, occasion-specific WhatsApp prompts, proof, steps, FAQ, enquiry form; "small" removed
- [x] Checks: 11 viewports + gallery pass, lightbox/form/film tests pass, Lighthouse mobile 100/100/100/100, images AVIF ≤ 91 KB, Impeccable detector clean
