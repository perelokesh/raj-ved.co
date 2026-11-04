"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { assets } from "@/src/content/assets";
import { ease } from "@/src/lib/motion";
import { useSaveData } from "@/src/lib/useSaveData";
import { Photo } from "./Photo";

// Full-viewport film hero. The poster is the LCP element. The video is added after
// first paint and is skipped on Data Saver, slow 2G and reduced motion (poster only).
// It pauses when off-screen or when the tab is hidden.
export function Hero() {
  const liteMode = useSaveData();
  const [ready, setReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (liteMode) return;
    // Defer the video request until after first paint.
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, [liteMode]);

  useEffect(() => {
    const video = videoRef.current;
    const wrap = wrapRef.current;
    if (!video || !wrap) return;

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !document.hidden) void video.play().catch(() => {});
      else video.pause();
    }, { threshold: 0.25 });
    io.observe(wrap);

    const onVis = () => {
      if (document.hidden) video.pause();
      else if (wrap.getBoundingClientRect().bottom > 0) void video.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [ready]);

  const poster = assets["chatty-mandap"];
  const headline = ["We stay for", "the quiet bits."];

  return (
    <section
      ref={wrapRef}
      data-hero
      aria-label="Introduction film"
      className="relative flex h-[100svh] min-h-[560px] w-full items-end overflow-hidden bg-ink text-ivory"
    >
      <div className="absolute inset-0">
        <Photo assetId="chatty-mandap" alt="[REPLACE: hero poster] Chatty mandap with warm light, deep olive and marigold tones" sizes="100vw" priority fill className="object-cover" />
      </div>

      {ready && !liteMode && (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster.src}
          aria-hidden="true"
          tabIndex={-1}
        >
          <source src="/media/film/hero-loop-mobile-720x1280.mp4" type="video/mp4" media="(max-width: 767px)" />
          <source src="/media/film/hero-loop-1920x1080.mp4" type="video/mp4" />
        </video>
      )}

      {/* Scrim: keeps the headline above AA contrast over bright frames. */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/30 to-ink/10" aria-hidden="true" />

      <div className="relative z-10 w-full px-5 pb-16 sm:px-10 sm:pb-24">
        <h1 className="font-display text-5xl leading-[1.02] font-light sm:text-7xl lg:text-8xl">
          {headline.map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.1, ease, delay: 0.15 + i * 0.12 }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.p
          className="mt-6 max-w-md text-base text-ivory-soft"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.6 }}
        >
          Wedding photography and cinematic films, made by two people who would rather be quiet than in the way.
        </motion.p>
      </div>

      <a
        href="#introduction"
        className="absolute bottom-5 right-5 z-10 hidden min-h-11 items-center gap-2 text-sm text-ivory-soft sm:flex sm:right-10"
      >
        Scroll
        <span aria-hidden="true" className="inline-block h-8 w-px bg-ivory-soft" />
      </a>
    </section>
  );
}
