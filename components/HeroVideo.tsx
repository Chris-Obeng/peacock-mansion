"use client";

import { useEffect, useRef, useState } from "react";

interface NetworkInformation {
  saveData?: boolean;
  effectiveType?: string;
}

/** Decides on the client whether the hero film may play. */
function canPlayVideo(): boolean {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  const conn = (navigator as Navigator & { connection?: NetworkInformation }).connection;
  if (conn?.saveData) return false;
  if (conn?.effectiveType && conn.effectiveType !== "4g") return false;
  return true;
}

/**
 * Mounts the hero film only after the page is idle, and only on fast, non-saveData
 * connections without reduced motion. Otherwise the still image stays.
 */
export function HeroVideo({
  mp4,
  webm,
  poster,
  position,
}: {
  mp4?: string;
  webm?: string;
  poster?: string;
  position?: string;
}) {
  const [mount, setMount] = useState(false);
  const [ready, setReady] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!canPlayVideo()) return;
    const start = () => setMount(true);
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(start, { timeout: 2500 });
      return () => window.cancelIdleCallback(id);
    }
    const t = setTimeout(start, 1500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!mount || !ref.current) return;
    ref.current.play().catch(() => setMount(false));
  }, [mount]);

  if (!mount) return null;
  return (
    <video
      ref={ref}
      className="hero-video absolute inset-0 h-full w-full object-cover"
      style={{ objectPosition: position }}
      data-ready={ready}
      muted
      loop
      playsInline
      preload="auto"
      poster={poster}
      onCanPlay={() => setReady(true)}
      aria-hidden
      tabIndex={-1}
    >
      {webm && <source src={webm} type="video/webm" />}
      {mp4 && <source src={mp4} type="video/mp4" />}
    </video>
  );
}
