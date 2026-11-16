"use client";

import { m } from "motion/react";
import type { ReactNode } from "react";

/**
 * One entrance per container: a slow fade and short rise the first time the block
 * enters view. MotionConfig reducedMotion="user" drops the rise and keeps the fade.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "header" | "li" | "figure";
}) {
  const Tag = m[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.9, delay, ease: [0.23, 1, 0.32, 1] }}
    >
      {children}
    </Tag>
  );
}
