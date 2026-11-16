import { Bodoni_Moda, Jost } from "next/font/google";

/**
 * High-contrast Didone display serif; the optical-size axis keeps hairlines intact at large sizes.
 * Only the upright cut is preloaded: it paints the hero name. Italic and Jost swap in without
 * layout shift thanks to next/font's metric-matched fallbacks.
 */
export const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  style: ["normal"],
  axes: ["opsz"],
  display: "swap",
  variable: "--font-bodoni",
});

export const bodoniItalic = Bodoni_Moda({
  subsets: ["latin"],
  style: ["italic"],
  axes: ["opsz"],
  display: "swap",
  preload: false,
  variable: "--font-bodoni-italic",
});

/** Geometric sans in the Futura tradition, for labels and practical text. */
export const jost = Jost({
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-jost",
});
