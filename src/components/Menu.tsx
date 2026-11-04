"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { site } from "@/src/content/site";
import { ease } from "@/src/lib/motion";

const links = [
  { href: "/", label: "Home" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

const FOCUSABLE = 'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])';

// Full-screen menu: clip-path reveal, focus trapped, scroll locked, Escape closes,
// focus returns to the trigger on close.
export function Menu({ onOpenChange }: { onOpenChange?: (open: boolean) => void }) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const titleId = useId();
  // MotionConfig only drops transform animations; the clip-path wipe needs this too.
  const reduce = useReducedMotion();

  function set(next: boolean) {
    setOpen(next);
    onOpenChange?.(next);
  }

  useEffect(() => {
    set(false);
    // Close after navigation.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusables = () =>
      Array.from(panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []);
    focusables()[0]?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        set(false);
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      triggerRef.current?.focus();
    };
    // set is stable enough for this effect; it is recreated per render but only reads refs.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={titleId}
        onClick={() => set(true)}
        className="min-h-11 rounded-full px-4 text-sm tracking-wide underline-offset-4 hover:underline"
      >
        Menu
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={titleId}
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 z-[60] flex flex-col bg-olive-deep text-ivory"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: reduce ? 0 : 0.8, ease }}
          >
            <div className="flex items-center justify-between px-5 py-4 sm:px-10">
              <span className="font-display text-2xl">{site.name}</span>
              <button
                type="button"
                onClick={() => set(false)}
                className="min-h-11 min-w-11 rounded-full px-4 text-sm tracking-wide"
              >
                Close
              </button>
            </div>

            <nav aria-label="Main" className="flex flex-1 flex-col justify-center px-5 sm:px-10">
              <ul className="space-y-1">
                {links.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease, delay: 0.25 + i * 0.06 }}
                  >
                    <Link
                      href={l.href}
                      aria-current={pathname === l.href ? "page" : undefined}
                      className="font-display block py-1 text-5xl leading-tight font-light sm:text-7xl"
                    >
                      {l.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <div className="flex flex-wrap gap-6 px-5 pb-8 text-sm text-ivory-soft sm:px-10">
              <a className="min-h-11 py-3" href={site.social.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
              <a className="min-h-11 py-3" href={site.social.youtube} target="_blank" rel="noopener noreferrer">YouTube</a>
              <a className="min-h-11 py-3" href={site.social.vimeo} target="_blank" rel="noopener noreferrer">Vimeo</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
