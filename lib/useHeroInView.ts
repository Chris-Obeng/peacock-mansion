"use client";

import { useEffect, useState } from "react";

/** True while the hero still covers the top of the viewport. No scroll listeners. */
export function useHeroInView(offsetPx = 72): boolean {
  const [inView, setInView] = useState(true);
  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(Boolean(entry?.isIntersecting)),
      { rootMargin: `-${offsetPx}px 0px 0px 0px`, threshold: 0 },
    );
    io.observe(hero);
    return () => io.disconnect();
  }, [offsetPx]);
  return inView;
}
