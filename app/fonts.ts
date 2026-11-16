import localFont from "next/font/local";

/**
 * Zodiak (Indian Type Foundry): a wide, high-contrast display serif whose curled
 * italic and ampersand carry the Rococo voice. Self-hosted under the ITF Free Font
 * License (app/fonts/ITF-FFL-License.txt).
 */
export const zodiak = localFont({
  src: [{ path: "./fonts/Zodiak-Variable.woff2", weight: "100 900", style: "normal" }],
  variable: "--font-zodiak",
  display: "swap",
  preload: true,
  fallback: ["Didot", "Georgia", "serif"],
});

export const zodiakItalic = localFont({
  src: [{ path: "./fonts/Zodiak-VariableItalic.woff2", weight: "100 900", style: "italic" }],
  variable: "--font-zodiak-italic",
  display: "swap",
  preload: false,
  fallback: ["Didot", "Georgia", "serif"],
});

/** Switzer (Indian Type Foundry): a calm neo-grotesque for the practical voice. */
export const switzer = localFont({
  src: [{ path: "./fonts/Switzer-Variable.woff2", weight: "100 900", style: "normal" }],
  variable: "--font-switzer",
  display: "swap",
  preload: false,
  fallback: ["Helvetica Neue", "Arial", "sans-serif"],
});
