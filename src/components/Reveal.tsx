"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

// Fades and lifts content in once it scrolls into view. The server renders it
// visible, so no-JS visitors, crawlers and slow hydration never see blank sections.
// After hydration, only blocks still below the fold are hidden (off-screen, so no
// flash) and revealed on scroll. Reduced motion skips it. Styles: globals.css.
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    el.dataset.reveal = "hidden";
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.dataset.reveal = "shown";
        io.disconnect();
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const style = delay ? ({ "--reveal-delay": `${delay}s` } as CSSProperties) : undefined;

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
