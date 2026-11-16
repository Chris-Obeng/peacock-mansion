"use client";

import { useEffect, useState } from "react";

/** Tracks whether the element with `id` intersects the viewport. No scroll listeners. */
export function useIdInView(id: string, rootMargin = "0px", initial = true): boolean {
  const [inView, setInView] = useState(initial);
  useEffect(() => {
    const el = document.getElementById(id);
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(Boolean(e?.isIntersecting)), { rootMargin, threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, [id, rootMargin]);
  return inView;
}
