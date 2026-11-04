"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MenuHost } from "./MenuHost";

type Tone = "hero" | "top" | "solid";

// Top bar on every page. Ivory text while it sits over the dark hero ([data-hero]),
// ink text at the top of light pages, and a solid ivory bar once the page scrolls,
// so the logo and Menu stay readable over olive, sand and photo sections alike.
// No backdrop-filter here: it would trap the fixed full-screen menu inside the bar.
export function Header() {
  const pathname = usePathname();
  const [tone, setTone] = useState<Tone>(pathname === "/" ? "hero" : "top");

  useEffect(() => {
    function update() {
      const hero = document.querySelector("[data-hero]");
      const heroBottom = hero ? hero.getBoundingClientRect().bottom : 0;
      setTone(heroBottom > 72 ? "hero" : window.scrollY > 8 ? "solid" : "top");
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  const toneClass =
    tone === "hero" ? "text-ivory" : tone === "solid" ? "bg-ivory/95 text-ink shadow-[0_1px_0_rgba(20,23,14,0.08)]" : "text-ink";

  return (
    <header className={`fixed inset-x-0 top-0 z-40 transition-[background-color,color,box-shadow] duration-400 ${toneClass}`}>
      <div className="flex items-center justify-between px-5 py-4 sm:px-10">
        <Link href="/" className="font-display text-2xl tracking-wide" aria-label="Raj&Ved.co home">
          Raj&amp;Ved<span className="text-marigold">.co</span>
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className="hidden min-h-11 items-center rounded-full border border-current px-4 text-sm tracking-wide sm:inline-flex"
          >
            Enquire
          </Link>
          <MenuHost />
        </div>
      </div>
    </header>
  );
}
