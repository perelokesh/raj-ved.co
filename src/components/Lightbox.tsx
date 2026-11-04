"use client";

import { useEffect, useRef, useState } from "react";
import { assets } from "@/src/content/assets";
import type { GalleryItem } from "@/src/content/gallery";
import { Photo } from "./Photo";

type Props = { items: GalleryItem[]; index: number | null; onIndex: (i: number | null) => void };

// Full-screen gallery viewer: arrow keys, swipe, Escape, counter, neighbour preload,
// focus trapped inside and returned to the thumbnail that opened it.
export function Lightbox({ items, index, onIndex }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);
  const [restoreFocusTo, setRestoreFocusTo] = useState<HTMLElement | null>(null);
  const open = index !== null;

  useEffect(() => {
    if (index === null) return;
    setRestoreFocusTo(document.activeElement as HTMLElement | null);
    document.body.style.overflow = "hidden";
    dialogRef.current?.querySelector<HTMLElement>("button")?.focus();
    return () => {
      document.body.style.overflow = "";
    };
    // Only react to open/close, not every index change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (open) return;
    restoreFocusTo?.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Preload the neighbours so arrow navigation feels instant.
  useEffect(() => {
    if (index === null) return;
    for (const offset of [-1, 1]) {
      const n = items[index + offset];
      if (!n) continue;
      const img = new window.Image();
      img.src = assets[n.assetId].src;
    }
  }, [index, items]);

  useEffect(() => {
    if (index === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onIndex(null);
      if (e.key === "ArrowRight") onIndex(Math.min(index! + 1, items.length - 1));
      if (e.key === "ArrowLeft") onIndex(Math.max(index! - 1, 0));
      if (e.key === "Tab") {
        const focusable = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>("button") ?? []);
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [index, items.length, onIndex]);

  if (index === null) return null;
  const item = items[index];

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${item.category} photograph ${index + 1} of ${items.length}`}
      className="fixed inset-0 z-[70] flex flex-col bg-ink/95 text-ivory"
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) < 48) return;
        onIndex(dx < 0 ? Math.min(index + 1, items.length - 1) : Math.max(index - 1, 0));
      }}
    >
      <div className="flex items-center justify-between px-4 py-3 sm:px-8">
        <p className="text-sm text-ivory-soft" aria-live="polite">
          {index + 1} / {items.length} · {item.category}
        </p>
        <button type="button" onClick={() => onIndex(null)} className="min-h-11 min-w-11 px-3 text-sm">
          Close
        </button>
      </div>

      <div className="relative flex flex-1 items-center justify-center px-14 sm:px-20">
        <button
          type="button"
          onClick={() => onIndex(Math.max(index - 1, 0))}
          disabled={index === 0}
          aria-label="Previous photograph"
          className="absolute left-2 top-1/2 min-h-11 min-w-11 -translate-y-1/2 rounded-full border border-ivory/30 disabled:opacity-30 sm:left-6"
        >
          ←
        </button>
        <div className="relative h-full max-h-[78svh] w-full">
          <Photo
            key={item.assetId}
            assetId={item.assetId}
            alt={item.alt}
            sizes="100vw"
            fill
            className="object-contain"
          />
        </div>
        <button
          type="button"
          onClick={() => onIndex(Math.min(index + 1, items.length - 1))}
          disabled={index === items.length - 1}
          aria-label="Next photograph"
          className="absolute right-2 top-1/2 min-h-11 min-w-11 -translate-y-1/2 rounded-full border border-ivory/30 disabled:opacity-30 sm:right-6"
        >
          →
        </button>
      </div>
      <p className="px-4 pb-4 text-center text-sm text-ivory-soft sm:px-8">{item.alt}</p>
    </div>
  );
}
