"use client";

import { LazyMotion, MotionConfig, m, type PanInfo } from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { media } from "@/content/media.generated";
import type { SiteImage } from "@/content/site";

interface LightboxProps {
  images: readonly SiteImage[];
  index: number | null;
  onIndex: (i: number) => void;
  onClose: () => void;
}

const SWIPE_DISTANCE = 80;
const SWIPE_VELOCITY = 400; // px per second: a quick flick is enough
const loadFeatures = () =>
  import("./motion-features").then((mod) => mod.default);

export function Lightbox({ images, index, onIndex, onClose }: LightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
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

  // Swipe: the photo follows the finger 1:1 (Motion drag), springs back or commits on release.
  const onDragEnd = (_: unknown, info: PanInfo) => {
    const dx = info.offset.x;
    const v = info.velocity.x;
    if (Math.abs(dx) > SWIPE_DISTANCE || Math.abs(v) > SWIPE_VELOCITY)
      go(dx < 0 || v < -SWIPE_VELOCITY ? 1 : -1, true);
  };

  const current = index === null ? null : images[index];
  const neighbours =
    index === null
      ? []
      : [images[(index + 1) % count], images[(index - 1 + count) % count]];

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
        <LazyMotion features={loadFeatures} strict>
          <MotionConfig reducedMotion="user">
            <div className="grid h-full grid-rows-[auto_1fr_auto] pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
              <div className="px-page flex h-16 items-center justify-between">
                <p
                  className="num text-[0.9375rem] text-gilt-light"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  <span className="sr-only">Photograph </span>
                  {index + 1} <span className="text-mist">of {count}</span>
                </p>
                <button
                  type="button"
                  autoFocus
                  onClick={() => dialogRef.current?.close()}
                  className="press -mr-3 inline-flex min-h-12 min-w-12 items-center justify-center gap-3 px-3 text-[0.9375rem] text-ivory hover:text-gilt-light"
                >
                  Close
                  <svg
                    aria-hidden
                    viewBox="0 0 16 16"
                    className="h-4 w-4"
                    stroke="currentColor"
                    strokeWidth="1.25"
                  >
                    <path d="M2 2l12 12M14 2L2 14" />
                  </svg>
                </button>
              </div>

              <div className="relative min-h-0 touch-pan-y select-none">
                <m.div
                  key={index}
                  drag="x"
                  dragSnapToOrigin
                  dragElastic={0.5}
                  dragTransition={{ bounceStiffness: 380, bounceDamping: 34 }}
                  onDragEnd={onDragEnd}
                  className="absolute inset-0 mx-4 cursor-grab active:cursor-grabbing md:mx-24"
                >
                  <Image
                    key={current.slug + index}
                    src={media[current.slug].src}
                    alt={current.alt}
                    fill
                    sizes="100vw"
                    quality={65}
                    loading="eager"
                    draggable={false}
                    className={`pointer-events-none object-contain ${swiped ? "animate-[fade_220ms_var(--ease-out)_both]" : ""}`}
                  />
                </m.div>
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
                  className="press absolute left-1 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center text-ivory hover:text-gilt-light md:flex md:left-6"
                >
                  <Chevron dir="left" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next photograph"
                  className="press absolute right-1 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center text-ivory hover:text-gilt-light md:flex md:right-6"
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
                <p
                  id="lightbox-caption"
                  className="mx-auto max-w-[62ch] flex-1 text-center text-[0.9375rem] leading-snug text-mist md:text-base"
                >
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
          </MotionConfig>
        </LazyMotion>
      )}
    </dialog>
  );
}

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      <path d={dir === "left" ? "M15 4L7 12l8 8" : "M9 4l8 8-8 8"} />
    </svg>
  );
}
