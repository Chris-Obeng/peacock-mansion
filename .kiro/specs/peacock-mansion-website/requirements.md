# Requirements: The Peacock Mansion website

## Introduction

A single-page marketing site for The Peacock Mansion, a French Rococo-style private mansion in Kumasi, Ghana, used for intimate weddings, traditional ceremonies, photoshoots and private stays. The site's job is to turn interest into qualified WhatsApp enquiries. First viewer: the property manager. Main audience: couples and families planning ceremonies, plus photographers and videographers, mostly on phones and mobile data in Ghana.

Facts come only from `RESEARCH.md`. Anything marked unverified there must not appear.

## Requirements

### R1. Page structure

**User story:** As a visitor, I want a short, ordered page so I can understand the house and enquire quickly.

1. The page SHALL contain, in order: Hero, The house, Gallery, Occasions, Film, Enquire, Visit, then a minimal footer.
2. Navigation SHALL contain only the logo, three anchor links (House, Gallery, Enquire) and one WhatsApp button.
3. On viewports under 768 px a sticky bottom WhatsApp bar SHALL be shown and SHALL respect the bottom safe-area inset. It SHALL NOT appear at 768 px or wider.
4. Visible copy for the whole page SHALL stay under about 250 words (excluding alt text, form labels and the legal line).

### R2. Hero

1. The hero SHALL fill the viewport using `dvh` units, show the name, one line of copy and one button.
2. The hero SHALL include a video slot that reads `/media/video/hero.webm` and `/media/video/hero.mp4` with a poster, rendered only when those files exist at build time.
3. The video SHALL NOT autoplay when `prefers-reduced-motion: reduce`, `navigator.connection.saveData` is true, or the effective connection type is `slow-2g`, `2g` or `3g`. In those cases, and while no video exists, a slow image treatment SHALL be shown instead.
4. The hero SHALL include one signature reveal animation that does not delay the largest contentful paint or block interaction.

### R3. The house

1. The section SHALL be image-led with two or three short lines of original copy that state only verified features.

### R4. Gallery

1. The gallery SHALL show 10 to 14 images in a considered, asymmetric editorial layout (not a uniform grid).
2. Each image SHALL open an accessible lightbox: a modal dialog with focus moved inside, focus trapped, `Esc` to close, arrow keys and swipe to move, visible previous/next/close buttons of at least 44 × 44 px, and focus returned to the opening thumbnail on close.
3. The lightbox SHALL announce position (for example "4 of 12") and the image's alt text as a caption.

### R5. Occasions

1. The section SHALL present exactly three occasions: intimate weddings, traditional ceremonies, photoshoots.
2. Each SHALL be text-light (a title and at most one short line) and SHALL NOT be three identical cards.

### R6. Film

1. The section SHALL show the top two or three TikTok videos using TikTok's official embed player, behind a click-to-load facade so no TikTok code or iframe loads before the visitor taps.
2. Only one video SHALL play at a time: opening a second video SHALL unload the first.
3. TikTok videos SHALL NOT be downloaded or re-hosted. Facade posters SHALL use the site's own images and be labelled honestly.
4. A link to the TikTok profile SHALL be present.

### R7. Enquire

1. A short form SHALL collect name, date, occasion and guest count.
2. Submitting SHALL open `https://wa.me/233596112287` with a prefilled message containing those answers, in a new tab.
3. Fields SHALL have visible labels, native input types, and inline validation messages linked with `aria-describedby`. No data SHALL be stored or sent anywhere else.

### R8. Visit

1. The section SHALL state the location (Kumasi, Ashanti Region, Ghana), the approximate airport drive time, and contact options (WhatsApp, phone, TikTok).
2. The exact address SHALL NOT be invented; the section SHALL say directions are shared on WhatsApp.

### R9. Content and media

1. All copy, links and media paths SHALL live in one typed content file.
2. Gallery and section images SHALL be 14 to 20 selected listing photos, at least 1600 px wide at source, sharp, well lit, without watermarks, platform UI or identifiable guests, saved locally under `/public/media/images`. No hotlinking.
3. Images SHALL be served as responsive AVIF/WebP with display sizes under about 300 KB, blur placeholders, and real descriptive alt text.
4. `MEDIA_SOURCES.md` SHALL list each image's source URL, why it was chosen, and the status "placeholder, pending owner's original", plus the gaps the owner must fill.

### R10. Design

1. Palette SHALL derive from the photography: marble ivory, ink black, gold leaf and deep peacock teal.
2. Typography SHALL use one high-contrast display serif and one clean sans loaded through `next/font`.
3. The hard "no" list SHALL be respected: no purple or blue gradients, glassmorphism, blobs, emoji, generic icon rows, three identical feature cards, centered text over blurred backgrounds, stock photography, lorem ipsum, or the phrases "dream wedding" and "unforgettable".
4. Motion SHALL be slow fades, gentle parallax and one signature moment, and SHALL be disabled or reduced under `prefers-reduced-motion`.

### R11. Responsiveness

1. The layout SHALL be designed at 375 px first, then 768, 1024, 1440 and 1920 px or wider, and SHALL work at 360, 390 and 430 px, in landscape phones, tablets and ultra-wide screens.
2. There SHALL be no horizontal scroll at any width.
3. Tap targets SHALL be at least 44 px. Nothing SHALL depend on hover.

### R12. Performance

1. Below-the-fold images SHALL lazy-load. Only the hero image SHALL be preloaded.
2. Mobile Lighthouse SHALL score Performance ≥ 90 and Accessibility, Best Practices and SEO ≥ 95.
3. The hero video budget SHALL be under 4 MB (documented for the owner).

### R13. Accessibility

1. Text SHALL meet WCAG AA contrast.
2. The page SHALL use semantic landmarks (`header`, `nav`, `main`, `section` with headings, `footer`), a skip link, and a visible focus style.

### R14. SEO

1. The page SHALL include title, description, canonical URL, Open Graph and Twitter metadata, a 1200 × 630 Open Graph image, and `EventVenue` JSON-LD containing only verified facts.
2. `robots.txt` and `sitemap.xml` SHALL be generated.

### R15. Verification

1. Playwright screenshots SHALL be taken at 375, 768, 1280 and 1920 px; flaws SHALL be fixed and re-checked.
2. A final summary SHALL list what was built, what is still placeholder, and exactly which files the owner must supply.
