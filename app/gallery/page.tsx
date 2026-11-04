import type { Metadata } from "next";
import { GalleryGrid } from "@/src/components/GalleryGrid";
import { gallery } from "@/src/content/gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description: "A curated selection of ceremony, portrait, detail and celebration photographs.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <section className="px-5 pt-32 pb-24 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm tracking-[0.2em] uppercase text-ink-soft">Gallery</p>
        <h1 className="font-display mt-4 mb-6 text-5xl font-light sm:text-7xl">Quiet, honest frames</h1>
        <p className="mb-14 max-w-xl text-lg text-ink-soft">[DRAFT] A selection from recent weddings. Filter by moment, then open any photograph to look closer.</p>
        <GalleryGrid items={gallery} />
      </div>
    </section>
  );
}
