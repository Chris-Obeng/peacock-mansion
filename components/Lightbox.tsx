"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type PointerEvent as RPointerEvent } from "react";
import { media } from "@/content/media.generated";
import type { SiteImage } from "@/content/site";

interface LightboxProps {
  images: readonly SiteImage[];
  index: number | null;
  onIndex: (i: number) => void;
  onClose: () => void;
}

const SWIPE_DISTANCE = 60;
const SWIPE_VELOCITY = 0.11; // px per ms: a quick flick is enough

export function Lightbox({ images, index, onIndex, onClose }: LightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ id: number; x: number; t: number; dx: number } | null>(null);
  const [swiped, setSwiped] = useState(false);
  const count = images.length;
  const open = index !== null;

  const go = useCallback(
    (delta: number, viaSwipe = false) => {
      if (index === null) return;
      setSwiped(viaSwipe);
      onIndex((index + delta + count) % count);
    },
    [index, count, onIndex],
  );

  // Open / close the native modal: focus trap, Esc, inert page and top layer for free.
  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (open && !d.open) {
      if (typeof d.showModal === "function") d.showModal();
      else d.setAttribute("open", "");
      document.documentElement.style.overflow = "hidden";
    } else if (!open && d.open) {
      d.close();
    }
  }, [open]);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    const handleClose = () => {
      document.documentElement.style.overflow = "";
      onClose();
    };
    d.addEventListener("close", handleClose);
    return () => d.removeEventListener("close", handleClose);
  }, [onClose]);

  // Keyboard: instant swaps, no animation (Emil: never animate keyboard-driven actions).
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    } else if (e.key === "Home") {
      e.preventDefault();
      onIndex(0);
    } else if (e.key === "End") {
      e.preventDefault();
      onIndex(count - 1);
    }
  };

  // Swipe: the photo follows the finger 1:1, then commits or settles back.
  const setX = (x: number, settle: boolean) => {
    const el = stageRef.current;
    if (!el) return;
    el.style.transition = settle ? "transform 220ms var(--ease-out)" : "none";
    el.style.transform = x ? `translate3d(${x}px,0,0)` : "";
  };
  const onPointerDown = (e: RPointerEvent<HTMLDivElement>) => {
    if (drag.current || e.button !== 0) return; // ignore extra fingers
    drag.current = { id: e.pointerId, x: e.clientX, t: performance.now(), dx: 0 };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: RPointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    d.dx = e.clientX - d.x;
    setX(d.dx, false);
  };
  const endDrag = (e: RPointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    drag.current = null;
    const v = Math.abs(d.dx) / Math.max(1, performance.now() - d.t);
    if (Math.abs(d.dx) >= SWIPE_DISTANCE || (Math.abs(d.dx) > 12 && v > SWIPE_VELOCITY)) {
      setX(0, false);
      go(d.dx < 0 ? 1 : -1, true);
    } else {
      setX(0, true);
    }
  };

  const current = index === null ? null : images[index];
  const neighbours = index === null ? [] : [images[(index + 1) % count], images[(index - 1 + count) % count]];

  return (
    <dialog
      ref={dialogRef}
      className="lightbox"
      aria-label="Photograph viewer"
      aria-describedby="lightbox-caption"
      onKeyDown={onKeyDown}
      onClick={(e) => {
        if (e.target === e.currentTarget) dialogRef.current?.close();
      }}
    >
      {current && index !== null && (
        <div className="grid h-full grid-rows-[auto_1fr_auto] pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
          <div className="px-page flex h-16 items-center justify-between">
            <p className="label text-gold-light" aria-live="polite" aria-atomic="true">
              <span className="sr-only">Photograph </span>
              {String(index + 1).padStart(2, "0")} <span className="text-ivory/50">/ {String(count).padStart(2, "0")}</span>
            </p>
            <button
              type="button"
              autoFocus
              onClick={() => dialogRef.current?.close()}
              className="press label -mr-3 inline-flex min-h-12 min-w-12 items-center justify-center gap-3 px-3 text-ivory hover:text-gold-light"
            >
              Close
              <svg aria-hidden viewBox="0 0 16 16" className="h-4 w-4" stroke="currentColor" strokeWidth="1.25">
                <path d="M2 2l12 12M14 2L2 14" />
              </svg>
            </button>
          </div>

          <div
            className="relative min-h-0 touch-pan-y select-none"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
          >
            <div ref={stageRef} className="absolute inset-0 mx-4 md:mx-24">
              <Image
                key={current.slug + index}
                src={media[current.slug].src}
                alt={current.alt}
                fill
                sizes="100vw"
                quality={65}
                loading="eager"
                draggable={false}
                className={`object-contain ${swiped ? "animate-[fade_220ms_var(--ease-out)_both]" : ""}`}
              />
            </div>
            {neighbours.map(
              (n) =>
                n && (
                  <Image
                    key={`pre-${n.slug}`}
                    src={media[n.slug].src}
                    alt=""
                    aria-hidden
                    fill
                    sizes="100vw"
                    quality={65}
                    className="pointer-events-none object-contain opacity-0"
                  />
                ),
            )}

            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous photograph"
              className="press absolute left-1 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center text-ivory hover:text-gold-light md:flex md:left-6"
            >
              <Chevron dir="left" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next photograph"
              className="press absolute right-1 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center text-ivory hover:text-gold-light md:flex md:right-6"
            >
              <Chevron dir="right" />
            </button>
          </div>

          <div className="px-page flex min-h-24 items-center gap-4 py-4 md:min-h-28">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous photograph"
              className="press -ml-3 flex h-12 w-12 shrink-0 items-center justify-center text-ivory md:hidden"
            >
              <Chevron dir="left" />
            </button>
            <p id="lightbox-caption" className="font-display mx-auto max-w-[60ch] flex-1 text-center text-[0.9375rem] italic leading-snug text-ivory/85 md:text-base">
              {current.alt}
            </p>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next photograph"
              className="press -mr-3 flex h-12 w-12 shrink-0 items-center justify-center text-ivory md:hidden"
            >
              <Chevron dir="right" />
            </button>
          </div>
        </div>
      )}
    </dialog>
  );
}

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1">
      <path d={dir === "left" ? "M15 4L7 12l8 8" : "M9 4l8 8-8 8"} />
    </svg>
  );
}
