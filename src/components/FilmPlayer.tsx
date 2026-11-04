"use client";

import { useState } from "react";
import { filmTranscript } from "@/src/content/film.transcript";
import { film } from "@/src/content/site";
import { Photo } from "./Photo";

// Poster with a play button. The Vimeo iframe (dnt=1) is only created after the
// click. Captions and a transcript are always visible. Placeholder film in prototype.
export function FilmPlayer() {
  const [playing, setPlaying] = useState(false);
  const source = film.source;

  return (
    <div>
      <div className="relative aspect-video overflow-hidden bg-ink">
        {!playing ? (
          <>
            <Photo assetId="marigold-garland-glow" alt="[REPLACE: film poster] Marigold garland glowing in warm light" sizes="(min-width: 1024px) 80vw, 100vw" fill className="object-cover" />
            <div className="absolute inset-0 bg-ink/30" aria-hidden="true" />
            <button
              type="button"
              onClick={() => setPlaying(true)}
              className="absolute inset-0 m-auto flex h-20 w-20 min-h-11 items-center justify-center rounded-full border border-ivory/80 bg-ink/40 text-ivory transition-transform duration-500 hover:scale-105 focus-visible:outline-marigold"
              aria-label={`Play film: ${film.title}`}
            >
              <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7 fill-current" aria-hidden="true">
                <path d="M7 4.5v15l12-7.5z" />
              </svg>
            </button>
          </>
        ) : source.type === "vimeo" ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://player.vimeo.com/video/${source.id}?dnt=1&autoplay=1`}
            title={film.title}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <video
            className="absolute inset-0 h-full w-full"
            src={source.src}
            poster={source.poster}
            controls
            autoPlay
            playsInline
            preload="metadata"
          >
            <track kind="captions" src={source.captions} srcLang="en" label="English" default />
          </video>
        )}
      </div>

      <p className="mt-4 text-sm text-ivory-soft">
        {film.caption} · {film.durationLabel}
        {film.placeholder && <span className="ml-2 rounded-full bg-sand px-2 py-0.5 text-xs text-ink">Placeholder film</span>}
      </p>

      <details className="mt-6 rounded-sm border border-ink/10 bg-sand p-5 text-ink">
        <summary className="min-h-11 cursor-pointer text-sm font-medium">Transcript</summary>
        <ol className="mt-4 space-y-3 text-sm text-ink-soft">
          {filmTranscript.map((line) => (
            <li key={line.time} className="grid grid-cols-[3.5rem_1fr] gap-3">
              <span className="font-mono text-xs text-ink">{line.time}</span>
              <span>{line.text}</span>
            </li>
          ))}
        </ol>
      </details>
    </div>
  );
}
