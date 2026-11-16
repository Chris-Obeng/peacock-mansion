"use client";

import { useEffect, useRef, useState } from "react";

interface NetworkInformation {
  saveData?: boolean;
  effectiveType?: string;
}

function allowed(): boolean {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  const conn = (navigator as Navigator & { connection?: NetworkInformation }).connection;
  if (conn?.saveData) return false;
  if (conn?.effectiveType && conn.effectiveType !== "4g") return false;
  return true;
}

/**
 * The hero reel. Mounted only after the page is idle, on fast connections without
 * Data Saver or reduced motion; otherwise the poster stays. Picks the tall cut for
 * portrait screens and the wide cut for landscape, and can be paused (WCAG 2.2.2).
 */
export function HeroVideo({ wide, tall, pauseLabel, playLabel }: { wide: string; tall: string; pauseLabel: string; playLabel: string }) {
  const [src, setSrc] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!allowed()) return;
    const mq = window.matchMedia("(orientation: portrait)");
    const pick = () => setSrc(mq.matches ? tall : wide);
    let idle: number | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;
    if ("requestIdleCallback" in window) idle = window.requestIdleCallback(pick, { timeout: 2000 });
    else timer = setTimeout(pick, 1200);
    mq.addEventListener("change", pick);
    return () => {
      if (idle !== undefined) window.cancelIdleCallback(idle);
      if (timer) clearTimeout(timer);
      mq.removeEventListener("change", pick);
    };
  }, [wide, tall]);

  useEffect(() => {
    const v = ref.current;
    if (!src || !v) return;
    v.play().catch(() => setSrc(null));
  }, [src]);

  if (!src) return null;
  return (
    <>
      <video
        ref={ref}
        key={src}
        src={src}
        className="hero-video absolute inset-0 h-full w-full object-cover"
        data-ready={ready}
        muted
        loop
        playsInline
        autoPlay
        preload="auto"
        onCanPlay={() => setReady(true)}
        aria-hidden
        tabIndex={-1}
      />
      <button
        type="button"
        onClick={() => {
          const v = ref.current;
          if (!v) return;
          if (v.paused) {
            v.play();
            setPaused(false);
          } else {
            v.pause();
            setPaused(true);
          }
        }}
        aria-pressed={paused}
        className="press absolute bottom-[calc(1.25rem+env(safe-area-inset-bottom))] right-[max(1.25rem,env(safe-area-inset-right))] z-10 flex h-11 w-11 items-center justify-center rounded-full bg-lacquer/50 text-ivory ring-1 ring-ivory/50 hover:bg-lacquer/80 md:right-10"
      >
        <span className="sr-only">{paused ? playLabel : pauseLabel}</span>
        {paused ? (
          <svg aria-hidden viewBox="0 0 24 24" className="ml-0.5 h-4 w-4" fill="currentColor">
            <path d="M7 4.5v15l12-7.5z" />
          </svg>
        ) : (
          <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
            <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" />
          </svg>
        )}
      </button>
    </>
  );
}
