# Design: The Peacock Mansion website

## Thesis

An illustrated monograph of a white-marble house. Ivory pages, deep ink, a thread of gold leaf, one note of peacock teal from the salon curtains and chandelier glass. Photographs lead; text whispers. One action everywhere: talk to the house on WhatsApp. (Full reasoning in `RESEARCH.md`.)

## Visual system

### Palette (from the photographs)

| Token | Hex | Source in the photos | Use |
| --- | --- | --- | --- |
| `ivory` | `#F4EFE6` | marble floors, plaster panels | page background |
| `stone` | `#E9E1D3` | warm marble veining, limestone urns | alternate section background |
| `ink` | `#16140F` | black lacquer doors, dark drapes | text, dark sections |
| `ink-soft` | `#57514A` | shadowed plaster | secondary text |
| `gold` | `#A07F45` | gilt mirrors, console legs | hairlines, ornaments, large display only |
| `gold-text` | `#7A5C2A` | | small labels on ivory |
| `gold-light` | `#C9A86A` | candlelight on gilt | labels on dark |
| `teal` | `#0D3634` | salon curtains, chandelier glass | Enquire section, focus ring on dark |

Measured contrast: ink/ivory 16.1, ink-soft/ivory 6.8, gold-text/ivory 5.4, gold-text/stone 4.8, ivory/teal 11.5, gold-light/teal 5.8, gold-light/ink 8.1. Plain `gold` (3.3 on ivory) is used only for ornaments and display text above 24 px.

### Type

- Display: **Bodoni Moda** (variable, optical size axis), via `next/font/google`. High contrast, French-Didone voice that matches the Rococo interiors. Used large, light-to-regular weight, tight leading, italics for emphasis.
- Text: **Jost** (variable), via `next/font/google`. Geometric, Futura-like; pairs with Didone serifs in the French tradition. Labels in small caps style: 11–12 px, uppercase, tracking 0.24em.
- Scale (fluid with `clamp`): display-xl (hero name) 15vw on phones → ~10rem at 1920; display-l 2.5–5.5rem; display-m 1.75–3rem; body 1rem/1.0625rem; label 0.6875–0.75rem.
- Only `display: swap` subsets `latin`, preloaded by `next/font`.

### Ornament

One original SVG ornament: a fan of thin gold strokes, abstracted from a peacock's raised tail (the house's own embroidered emblem is a peacock fan). Used three times at most: logo mark, section divider in The house, footer. Thin 1 px gold hairlines separate content. No icon rows.

### Grid and spacing

- 4-column grid on phones (gutter 20 px, margin `max(20px, safe-area)`), 8 columns at 768, 12 columns at 1024+. Max content width 1680 px; images may bleed to the viewport edge.
- Section rhythm: 96 px on phones, 160–200 px on desktop. Space is deliberately uneven between sections to avoid template rhythm.
- Captions: italic Bodoni 0.875rem with a numeral ("No. 03 · The upper gallery").

## Page and component design

All copy comes from `content/site.ts`. Word budget is enforced by a script (`scripts/count-words.mjs`) that counts every visible string in the content file.

### Header (`components/Header.tsx`)
- Fixed, transparent over the hero with ivory text, turning ivory background with ink text after the hero (IntersectionObserver on the hero sentinel; no scroll listeners).
- Left: fan mark + wordmark "The Peacock Mansion" (Bodoni). Then three anchors: House, Gallery, Enquire. Right (≥768 px): "WhatsApp" outline button.
- Phones: the logo and the three anchors share one row, with the anchors in 11 px tracked caps and 44 px tall hit areas. The WhatsApp action lives in the sticky bottom bar instead of the header. No hamburger menu: three links do not need one.

### Hero (`components/Hero.tsx`, client)
- `section` 100svh/100dvh, ink background. Image `fountain-dusk` with `priority`, `fetchPriority="high"`, `sizes="100vw"`, object-position tuned so the fountain stays in frame on portrait phones.
- **Signature moment: "the arch opens".** On load the photograph is clipped to the shape of the mansion's arched black doors (`clip-path: inset(… round 50vw 50vw 0 0)` → full rectangle) over 1.6 s with `--ease-in-out`, while the name rises line by line from behind a mask (timeline below). The image is painted from the first frame inside the arch (never `opacity: 0`), so LCP is not delayed. Under reduced motion the image is shown full-bleed immediately.
- Slow image treatment (no video, or video skipped): 24 s ease-out scale 1.08 → 1.0 and a soft vertical ink gradient at the bottom only (for text legibility; no blur).
- Video slot (`HeroVideo`): rendered only if `public/media/video/hero.mp4` or `.webm` exists (checked on the server at build time with `fs.existsSync`). On the client, the `<video>` element is mounted only after `requestIdleCallback`, and only when motion is allowed, `saveData` is false and `effectiveType` is `4g` (or unknown). `muted playsInline loop preload="none" poster=…`. It fades in over the image once `canplay` fires.
- Content bottom-left aligned (never centered over imagery): label "Kumasi · Ghana", name in display-xl over two lines ("The Peacock / Mansion"), one line, one button "Plan your day" → `#enquire`.
- Scroll cue: a 1 px gold line that slowly draws downward. Decorative, `aria-hidden`.

### The house (`components/House.tsx`)
- Ivory. Asymmetric composition: tall portrait (`statue-gallery` or `urns-night`) offset left, landscape (`salon`) offset right and lower, small detail (`peacock-urn`) overlapping the gutter. Gentle parallax (±40 px) on the two secondary images via Motion `useScroll`/`useTransform`; disabled under reduced motion.
- Copy: section label, a two-line display heading, and two short lines. Facts only: fountain, marble, chandeliers, floating staircase, peacocks in the garden.

### Gallery (`components/Gallery.tsx`, `components/Lightbox.tsx`)
- 12 images in an editorial "contact sheet" layout: CSS grid with named spans so images vary in size and aspect (2 large, 4 medium, 6 small), with a few vertical offsets. On phones: a two-column masonry-like flow with one full-width image every fourth item.
- Each item is a `<button>` wrapping `next/image` (lazy, blur placeholder, `sizes` per span) with `aria-label="Open image 4 of 12: <alt>"`.
- Lightbox: native `<dialog>` opened with `showModal()` (built-in focus trap, `Esc`, top layer, inert background). Contains the current image (`sizes="100vw"`, `object-contain`), caption with alt text and "4 / 12" in an `aria-live="polite"` region, previous/next/close buttons 48 × 48 px, arrow-key handling, pointer swipe (threshold 40 px), preloads the neighbour images. Focus returns to the thumbnail on close (handled by `dialog` + explicit `focus()`).

### Occasions (`components/Occasions.tsx`)
- Stone background. Three rows, deliberately unalike: each row has an oversized numeral (I, II, III in Bodoni italic gold), a title, one line, and one image whose size and side alternate (left-large, right-small, left-medium). On phones each row stacks: image, then numeral + title + line, with images at different aspect ratios (4:5, 1:1, 3:4).
- Images: weddings → `statue-gallery`; traditional ceremonies → `salon`; photoshoots → `gilt-mirror`.

### Film (`components/Film.tsx`, `components/TikTokFacade.tsx`)
- Ink background, ivory text. Three 9:16 facades. On phones a horizontal scroll-snap track with the next card peeking (no carousel library; Embla is unnecessary). At ≥1024 a three-column row with staggered vertical offsets.
- Facade: our own poster image + film title + length + a round play control (48 px). On tap, the facade is replaced by an iframe to `https://www.tiktok.com/player/v1/{id}?autoplay=1&description=0&music_info=0&rel=0&controls=1` with `allow="autoplay; fullscreen; encrypted-media; picture-in-picture"` and a title. State lives in `Film` (`activeId`), so opening one resets the others to facades: one video at a time.
- `<link rel="preconnect">` to `https://www.tiktok.com` is added only on first pointer-enter/focus of a facade.
- Caption under posters states the poster is a still of the house, not a frame of the film. Link: "More on TikTok @peacockmansion".

### Enquire (`components/Enquire.tsx`, client)
- Teal background, ivory text, gold-light labels. Left: display heading and one line. Right: form.
- Fields: Name (`text`, `autocomplete="name"`), Date (`date`, `min` = today), Occasion (`select`: Intimate wedding, Traditional ceremony, Photoshoot, Private stay, Something else), Guests (`number`, `inputmode="numeric"`, min 1, max 500). All required except date (couples may not have one): date optional with "Not fixed yet" allowed.
- Inputs: underline style, 48 px tall, 16 px text (prevents iOS zoom), visible focus ring in gold-light.
- Submit "Send on WhatsApp" builds:
  ```
  Hello, The Peacock Mansion. I'd like to enquire.
  Name: …
  Occasion: …
  Date: … (or "Not fixed yet")
  Guests: …
  ```
  and opens `https://wa.me/233596112287?text=<encoded>` with `window.open(url, '_blank', 'noopener')`, falling back to `location.href` if blocked. Validation uses the Constraint Validation API with custom messages rendered under each field.

### Visit (`components/Visit.tsx`)
- Ivory. Large display "Kumasi" with the line "Ashanti Region, Ghana. About twenty minutes from Kumasi International Airport. Directions are shared on WhatsApp once your visit is confirmed." Contact list: WhatsApp, Call (`tel:+233596112287`), TikTok. Image: `arched-door` as a narrow vertical crop.

### Footer (`components/Footer.tsx`)
- One line: ornament, "© 2026 The Peacock Mansion", "Kumasi, Ghana", TikTok. Bottom padding includes the mobile bar height + safe area.

### Mobile WhatsApp bar (`components/MobileBar.tsx`)
- `position: fixed; bottom: 0`, visible below 768 px only, ink background, full-width 56 px button "Enquire on WhatsApp", padding-bottom `env(safe-area-inset-bottom)`. Hidden while the hero is in view (so the hero button is the single action), revealed with a slow slide after.

## Motion rules

Built against Emil Kowalski's skills (`animate`, `choreograph`, `mobile-native`, `emil-design-eng`), installed in `.kiro/skills/`.

**Tokens** (`app/globals.css`, one family for the whole site):
- `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)` for every entrance and exit.
- `--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1)` for on-screen movement (the arch opening).
- Never `ease-in`. No `transition: all`. Only `transform`, `opacity` and `clip-path` animate.

**Gate (should it animate?):**

| Element | Frequency | Decision | Purpose |
| --- | --- | --- | --- |
| Hero arch opening + name | Once per visit | Animate, CSS keyframes (compositor; the page is busy loading) | Delight, marketing |
| Section reveals on scroll | Once per section | Animate the section's lead block only, Motion `whileInView`, 0.9 s, 24 px rise | Preventing a jarring change |
| Parallax in The house | Continuous, scroll-linked | Two secondary images only, ±48 px, Motion `useScroll` | Depth |
| Lightbox open/close | Occasional | 240 ms fade + `scale(0.97 → 1)`, centred origin (modal exemption) | Spatial consistency |
| Lightbox next/prev by arrow key | Many times in a row | **No animation**: instant swap (keyboard rule) | — |
| Lightbox swipe | Gesture | Image follows the finger 1:1, settles 220 ms `--ease-out` | Feedback |
| Buttons | Frequent | `:active` `scale(0.97)` 140 ms; hover colour only, behind `(hover: hover) and (pointer: fine)` | Feedback |
| Header solid state | Once per direction | 300 ms background/colour | State indication |
| Mobile WhatsApp bar | Once | `translateY(100%) → 0`, 400 ms `--ease-out` | Spatial consistency |
| Gallery thumbnails, occasions rows, film cards | — | **No stagger.** One entrance per container | — |

**Hero timeline (choreograph):**

| Element | Role | Starts | Duration | Motion | Relationship |
| --- | --- | --- | --- | --- | --- |
| Photograph inside arch | Lead | 0 ms | 1600 ms | `clip-path` arch → full rect, image `scale(1.12 → 1.04)` | — |
| "The Peacock" | Support | 450 ms | 1100 ms | mask rise 100% → 0 | Overlaps lead |
| "Mansion" | Support | 580 ms | 1100 ms | mask rise | Overlaps line 1 (130 ms step, marketing tier) |
| Label, line, button | Support | 900 ms | 700 ms | fade + 12 px rise | Overlaps, one beat |
| Gold scroll line | Decoration | 1400 ms | 900 ms | `scaleY` draw | Lands as the arch settles |
| Header | Static | — | — | — | Visible and usable from frame one |

Nothing blocks interaction: the button is clickable from the first frame. Under `prefers-reduced-motion: reduce` all movement collapses to a 400 ms opacity fade, Ken Burns and parallax are off, and the arch starts fully open.

**Mobile platform layer (`mobile-native`):** `viewport-fit=cover`, `theme-color` matching the ink hero, `-webkit-tap-highlight-color: transparent`, `touch-action: manipulation` on controls, `user-select: none` on buttons only, 16 px inputs, hero at `100svh` (stable while the URL bar moves; the lightbox uses `100dvh`), safe-area padding on the header and bottom bar, film track uses native scroll-snap.

Motion is imported as `m` with `LazyMotion` + `domAnimation` to keep the bundle small, under `MotionConfig reducedMotion="user"`.

## Media pipeline

- Source masters: originals from the listings (see `MEDIA_SOURCES.md`), downloaded once by `scripts/fetch-media.mjs` into a git-ignored `.media-src/` folder.
- `scripts/process-images.mjs` (sharp): auto-rotate, optional crop, resize to a master of at most 2560 px wide (JPEG q80, mozjpeg, progressive) in `public/media/images/<slug>.jpg`, and a 16 px blur placeholder (base64 WebP). It writes `content/media.generated.ts` with width, height and `blurDataURL` per slug.
- Responsive AVIF/WebP: `next/image` with `formats: ['image/avif', 'image/webp']` and `deviceSizes: [360, 414, 640, 768, 1080, 1280, 1600, 1920, 2560]`. Next's optimizer (sharp) generates each width in AVIF or WebP, negotiated per browser via the `Accept` header, and caches it. This avoids committing ~130 pre-sized files while giving the same result. The `sizes` attribute on each image keeps transferred bytes under 300 KB, checked by `scripts/check-image-weights.mjs` against the running server.
- Hosting note: the optimizer needs a Node host (Vercel, or `next start`). A static export would need a pre-generated set; not required here.
- Gallery and section images use `placeholder="blur"`.

## Data model (`content/site.ts`)

```ts
type ImageSlug = keyof typeof media; // from media.generated.ts
interface SiteImage { slug: ImageSlug; alt: string; caption?: string; position?: string }
interface Film { id: string; title: string; length: string; poster: SiteImage }
interface Occasion { numeral: string; title: string; line: string; image: SiteImage }
export const site: {
  name; tagline; description; url; contact: { whatsappNumber; whatsappUrl; phoneDisplay; tiktok };
  nav: { label; href }[];
  hero: { label; line; cta; image; video: { mp4; webm; poster } };
  house: { label; heading; lines; images };
  gallery: { label; heading; images };
  occasions: { label; heading; items: Occasion[] };
  film: { label; heading; note; films: Film[]; profileCta };
  enquire: { label; heading; line; fields; occasionOptions; submit; message };
  visit: { label; heading; lines; contactLabels };
  footer: { line };
}
```

## SEO

- `app/layout.tsx` `metadata`: title "The Peacock Mansion · Kumasi", description (≤155 chars), `metadataBase` from `NEXT_PUBLIC_SITE_URL` → `VERCEL_PROJECT_PRODUCTION_URL` → `http://localhost:3000`, canonical `/`, Open Graph (`type: website`, locale `en_GH`), Twitter `summary_large_image`.
- `app/opengraph-image.tsx`: `ImageResponse` 1200 × 630 rendered at build time from the hero master with the wordmark, using a locally bundled Bodoni Moda TTF.
- `app/icon.svg` from the fan ornament.
- JSON-LD `EventVenue`: name, description, url, image list, telephone, `address` (`addressLocality` Kumasi, `addressRegion` Ashanti, `addressCountry` GH), `sameAs` (TikTok, both Airbnb listings, Booking.com). No geo, rating, capacity or bedroom count.
- `app/robots.ts`, `app/sitemap.ts`.

## Performance budget

- JS: Motion via `LazyMotion` (~20 KB gz) + React/Next runtime. Every section is a server component except Hero, House parallax, Gallery/Lightbox, Film, Enquire, Header, MobileBar.
- Hero image: `sizes="100vw"`, quality 60, ≈120–220 KB AVIF on phones.
- No third-party requests until a TikTok facade is tapped. No web-font requests beyond the two self-hosted `next/font` files.
- `content-visibility: auto` on below-fold sections.

## Error handling and edge cases

- No video files → image treatment.
- `window.open` blocked → same-tab navigation.
- `date` input unsupported → falls back to text; validation still accepts empty.
- `<dialog>` and `showModal()` are supported in all evergreen browsers. If `showModal` is missing, the dialog is opened with the `open` attribute as a fixed full-screen layer.

## Testing and verification

- `npm run lint`, `npm run typecheck`, `npm run build`.
- `scripts/count-words.mjs`: visible word count < 250.
- `scripts/screenshots.mjs` (Playwright): full-page screenshots at 360, 375, 390, 430, 768, 1024, 1280, 1440, 1920, 2560 and landscape 844 × 390; asserts `scrollWidth <= innerWidth` at each, checks tap targets ≥ 44 px, and exercises the lightbox with the keyboard.
- Lighthouse mobile run against `next start`.
