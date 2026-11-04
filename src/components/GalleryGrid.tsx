"use client";

import { useCallback, useState } from "react";
import { categories, type GalleryCategory, type GalleryItem } from "@/src/content/gallery";
import { Lightbox } from "./Lightbox";
import { Photo } from "./Photo";

// Editorial grid with a category filter. Tiles reveal softly; the first row is
// prioritised for LCP. Click or Enter opens the lightbox.
export function GalleryGrid({ items, showFilter = true, limit }: { items: GalleryItem[]; showFilter?: boolean; limit?: number }) {
  const [filter, setFilter] = useState<GalleryCategory | "All">("All");
  const [open, setOpen] = useState<number | null>(null);

  const visible = items
    .filter((i) => filter === "All" || i.category === filter)
    .slice(0, limit ?? Number.MAX_SAFE_INTEGER);

  const onIndex = useCallback((i: number | null) => setOpen(i), []);

  return (
    <div>
      {showFilter && (
        <div role="group" aria-label="Filter photographs" className="mb-10 flex flex-wrap gap-2">
          {/* Only offer categories that have at least one photo. */}
          {(["All", ...categories.filter((cat) => items.some((i) => i.category === cat))] as const).map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={filter === c}
              onClick={() => setFilter(c)}
              className={`min-h-11 rounded-full border px-4 text-sm transition-colors duration-400 ${
                filter === c ? "border-olive bg-olive text-ivory" : "border-ink/25 hover:border-ink"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      <ul className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {visible.map((item, i) => {
          return (
            <li key={item.assetId} className="mb-4 break-inside-avoid">
              <button
                type="button"
                onClick={() => setOpen(i)}
                className="group relative block w-full overflow-hidden focus-visible:outline-olive"
                aria-label={`Open photograph: ${item.category}. ${item.alt}`}
              >
                <Photo
                  assetId={item.assetId}
                  alt={item.alt}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  priority={i < 3}
                  className="h-auto w-full transition-transform duration-900 group-hover:scale-[1.02] motion-reduce:transition-none"
                />
              </button>
            </li>
          );
        })}
      </ul>

      <Lightbox items={visible} index={open} onIndex={onIndex} />
    </div>
  );
}
