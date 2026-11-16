"use client";

import { m, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

/** Gentle scroll-linked drift for secondary images. Off under reduced motion. */
export function Parallax({ children, distance = 48, className }: { children: ReactNode; distance?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  return (
    <div ref={ref} className={className}>
      <m.div style={reduce ? undefined : { y }} className="will-change-transform">
        {children}
      </m.div>
    </div>
  );
}
