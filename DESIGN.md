# Design system: Boiserie

The site is built as the house's own panelled wall. Photographs hang in Louis XV mouldings with concave corners and a drawn gilt line, the way paintings hang in the salon. This file documents the built system (v2). The direction contract lives in `.impeccable/surfaces/app-page-tsx.md`.

## Palette

Sampled from the listing photographs, not from a template.

| Token | Hex | From | Use |
| --- | --- | --- | --- |
| `plaster` | `#EDEEEA` | cool white of the wall panels | page ground |
| `plaster-deep` | `#E1E3DE` | panel recess in shadow | gallery wall, photo mats |
| `lacquer` | `#0F1517` | the black arched doors | film section, plaque, footer, WhatsApp button |
| `teal` | `#0E3A3B` | salon curtains, chandelier glass | the enquiry wall |
| `gilt` | `#A9884E` | gold leaf on mirrors and consoles | moulding lines on plaster (decorative only) |
| `gilt-light` | `#CFB27A` | candlelight on gilt | lines, labels and buttons on dark |
| `gilt-text` | `#74582A` | | small text on plaster (5.7:1) |
| `ink` / `ink-soft` | `#161B1C` / `#4E5654` | | text (14.9:1 / 6.5:1) |
| `ivory` / `mist` | `#EEEDE6` / `#AEB9B5` | | text on dark (15.7:1 / 9.1:1 on lacquer, 5.6:1+ on teal) |

Colour strategy: plaster carries most of the page; lacquer and teal each own one whole region. Gold appears only as line and as the primary button.

## Type

- **Zodiak** (Indian Type Foundry, ITF Free Font License), variable 100–900 with a separate italic. Wide, high-contrast, with a curled italic and ampersand. Used for the inscriptions (hero name, "Kumasi") at weight 250 and for headings at 300.
- **Switzer** (ITF), variable. The practical voice: body, labels, controls. Sentence case only.
- Self-hosted woff2 via `next/font/local` in `app/fonts.ts`. Only the upright Zodiak is preloaded. Fallbacks avoid names that start with a digit: next/font writes them unquoted, and an unquoted `Bodoni 72` invalidates the whole stack.
- No eyebrow labels, no section numbers, no all-caps, no middle-dot meta strings.

## The moulding

- **Panel** (`components/Panel.tsx`): a mat of wall, a photograph cut with four concave corners (`.notched`, a CSS mask of four radial gradients), and two gilt hairlines drawn by `components/Moulding.tsx`. The lines are measured with a ResizeObserver and drawn as SVG paths with `pathLength=1`, so one CSS transition draws any size.
- **Arch**: the same frame with a round head, after the house's black doors. Used for the films and the Visit door.
- **Plaque**: a small lacquer panel with one inner gilt line. Holds the hero's date field.
- **Field**: on the teal wall, each input is a small panel. A faint line shows the field; a full gilt line draws around it once the field is answered.

## Composition

| Section | Structure |
| --- | --- |
| Hero | Inscription centred on the frieze; the fountain hung below in a wide (landscape) or tall (portrait) panel; the date plaque set into its lower moulding. |
| The house | A wall elevation: heading and copy in the frieze, three panels of one height below (narrow, wide, narrow). |
| Gallery | A salon hang: 11 frames packed edge to edge on a square grid (4 columns on phones, 12 from 768 px). |
| Occasions | One fixed frame; three tabs change what hangs in it. |
| Film | Three arched frames on lacquer; one TikTok player at a time. |
| Enquire | Teal wall; four field panels; the WhatsApp message writes itself in a plaster card as you type. |
| Visit | "Kumasi" inscription, contact rows ruled in gilt, the arched door. |

## Motion

One authored moment: the gilt line draws itself around each frame the first time it enters view (1.5 s, `cubic-bezier(0.77, 0, 0.175, 1)`; the hero frame 2 s on load). Content is never hidden waiting for it. Supporting motion:

- Photographs drift slightly inside their frames on scroll, using CSS scroll-driven animation (`animation-timeline: view()`), so no JavaScript runs. Browsers without support show a still photo.
- The hero plaque settles in at 500 ms.
- Occasions crossfade (420 ms).
- Lightbox: 260 ms open; arrow keys swap instantly; swipe uses Motion's drag with a spring, loaded only when the lightbox first opens.
- Buttons press to `scale(0.97)`; hover only on fine pointers.
- `prefers-reduced-motion`: lines appear already drawn, no drift, no settle.

## Browser surfaces

Selection is teal on ivory, the caret is gilt, focus rings are a 1.5 px gilt outline, the scrollbar is gilt on plaster, numerals in dates and phone numbers are tabular.
