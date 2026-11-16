"use client";

import { useEffect, useRef, useState } from "react";

export type MouldingShape = "panel" | "arch";

export interface MouldingLine {
  /** Distance from the box edge, px. */
  inset: number;
  /** Concave corner radius (panel) — ignored for arches. */
  radius?: number;
  width?: number;
  opacity?: number;
}

interface MouldingProps {
  shape?: MouldingShape;
  lines: MouldingLine[];
  className?: string;
  /** Draw on first view (default) or immediately. */
  drawOn?: "view" | "mount";
  /** Draw duration in ms. */
  duration?: number;
  /** For form fields: false leaves a gap in the line until the field is answered. */
  closed?: boolean;
}

/** Rectangle with concave quarter-circle corners (Louis XV panel). */
function panelPath(w: number, h: number, d: number, r: number) {
  const x0 = d, y0 = d, x1 = w - d, y1 = h - d;
  const k = Math.max(0, Math.min(r, (x1 - x0) / 2, (y1 - y0) / 2));
  return [
    `M${x0 + k},${y0}`,
    `L${x1 - k},${y0}`,
    `A${k},${k} 0 0 0 ${x1},${y0 + k}`,
    `L${x1},${y1 - k}`,
    `A${k},${k} 0 0 0 ${x1 - k},${y1}`,
    `L${x0 + k},${y1}`,
    `A${k},${k} 0 0 0 ${x0},${y1 - k}`,
    `L${x0},${y0 + k}`,
    `A${k},${k} 0 0 0 ${x0 + k},${y0}`,
    "Z",
  ].join(" ");
}

/** Round-headed arch, like the house's black doors. */
function archPath(w: number, h: number, d: number) {
  const x0 = d, x1 = w - d, y0 = d, y1 = h - d;
  const a = (x1 - x0) / 2;
  const cy = y0 + a;
  return `M${x0},${y1} L${x0},${cy} A${a},${a} 0 0 1 ${x1},${cy} L${x1},${y1} Z`;
}

/**
 * The gilt moulding. Measures its box, draws one or two hairlines concentric
 * with the photograph's notched (or arched) edge, and draws them in once.
 */
export function Moulding({
  shape = "panel",
  lines,
  className = "",
  drawOn = "view",
  duration,
  closed,
}: MouldingProps) {
  const ref = useRef<SVGSVGElement>(null);
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => {
      if (!e) return;
      const { width, height } = e.contentRect;
      setSize((prev) => (prev && prev.w === width && prev.h === height ? prev : { w: width, h: height }));
    });
    ro.observe(el);
    let io: IntersectionObserver | undefined;
    if (drawOn === "mount") {
      requestAnimationFrame(() => requestAnimationFrame(() => setDrawn(true)));
    } else {
      io = new IntersectionObserver(
        ([e]) => {
          if (e?.isIntersecting) {
            setDrawn(true);
            io?.disconnect();
          }
        },
        { rootMargin: "0px 0px -12% 0px" },
      );
      io.observe(el);
    }
    return () => {
      ro.disconnect();
      io?.disconnect();
    };
  }, [drawOn]);

  const paths =
    size && size.w > 8 && size.h > 8
      ? lines.map((l) => ({
          d: shape === "arch" ? archPath(size.w, size.h, l.inset) : panelPath(size.w, size.h, l.inset, l.radius ?? 12),
          l,
        }))
      : [];

  return (
    <svg
      ref={ref}
      aria-hidden
      className={`moulding pointer-events-none absolute inset-0 h-full w-full overflow-visible ${className}`}
      data-drawn={drawn && paths.length > 0}
      data-closed={closed === undefined ? undefined : String(closed)}
      style={duration ? ({ ["--draw" as string]: `${duration}ms` } as React.CSSProperties) : undefined}
    >
      {paths.map(({ d, l }, i) => (
        <path key={i} d={d} pathLength={1} stroke="currentColor" strokeWidth={l.width ?? (i === 0 ? 1 : 0.6)} opacity={l.opacity ?? (i === 0 ? 1 : 0.75)} />
      ))}
    </svg>
  );
}
