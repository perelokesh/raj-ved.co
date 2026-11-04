"use client";

import { useSyncExternalStore } from "react";

// True when the viewer asked for less data, is on a slow connection, or prefers
// reduced motion. The hero then shows the poster only (no autoplay).
type NetworkInfo = { saveData?: boolean; effectiveType?: string };

function subscribe(onChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  const conn = (navigator as Navigator & { connection?: EventTarget }).connection;
  mq.addEventListener("change", onChange);
  conn?.addEventListener("change", onChange);
  return () => {
    mq.removeEventListener("change", onChange);
    conn?.removeEventListener("change", onChange);
  };
}

function getSnapshot() {
  const conn = (navigator as Navigator & { connection?: NetworkInfo }).connection;
  const slow = conn?.effectiveType === "2g" || conn?.effectiveType === "slow-2g";
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return Boolean(conn?.saveData || slow || reduced);
}

export function useSaveData(): boolean {
  // On the server we render the poster-only path; the client swaps in autoplay if allowed.
  return useSyncExternalStore(subscribe, getSnapshot, () => true);
}
