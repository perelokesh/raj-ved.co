import Link from "next/link";
import { site } from "@/src/content/site";
import { FooterLinks } from "./FooterLinks";

// Footer modelled on the approved reference: wordmark, contact, links, card.
// Columns sit side by side (not stacked) so no column is much taller than the
// others; that height mismatch is what created the empty space before.
export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ivory px-5 pt-12 pb-6 text-ink sm:px-10 lg:pt-14">
      <div className="mx-auto grid max-w-[1400px] items-center gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-12">
        {/* Block 1: giant wordmark */}
        <div className="lg:col-span-4">
          <p aria-label="Raj&Ved.co" className="font-sans text-[clamp(2.75rem,5.4vw,5.5rem)] leading-[0.82] font-extrabold tracking-[-0.04em]">
            <span className="block">RAJ&amp;VED</span>
            <span className="block">
              CO
              <span aria-hidden="true" className="ml-[0.06em] inline-block h-[0.16em] w-[0.16em] translate-y-[-0.02em] bg-marigold align-baseline" />
            </span>
          </p>
        </div>

        {/* Block 2: compact contact */}
        <div className="text-sm lg:col-span-3">
          <p>Based in India</p>
          <p className="mt-1 text-ink-soft">{site.cities.join(" · ")}</p>
          <p className="mt-4">
            <a className="inline-flex min-h-11 items-center font-semibold underline-offset-4 transition-colors duration-400 hover:text-olive hover:underline" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </p>
          <p>
            <a className="inline-flex min-h-11 items-center underline-offset-4 transition-colors duration-400 hover:text-olive hover:underline" href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer">
              WhatsApp us
            </a>
          </p>
          <ul className="mt-1 flex gap-1">
            <li>
              <a aria-label="Instagram" className="inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-400 hover:bg-sand hover:text-olive" href={site.social.instagram} target="_blank" rel="noopener noreferrer">
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
                </svg>
              </a>
            </li>
            <li>
              <a aria-label="YouTube" className="inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-400 hover:bg-sand hover:text-olive" href={site.social.youtube} target="_blank" rel="noopener noreferrer">
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="2" y="5" width="20" height="14" rx="4" />
                  <path d="M10 9.5v5l4.5-2.5z" fill="currentColor" />
                </svg>
              </a>
            </li>
            <li>
              <a aria-label="Vimeo" className="inline-flex h-11 w-11 items-center justify-center rounded-full text-xs font-semibold transition-colors duration-400 hover:bg-sand hover:text-olive" href={site.social.vimeo} target="_blank" rel="noopener noreferrer">
                V
              </a>
            </li>
          </ul>
        </div>

        {/* Block 3: links */}
        <div className="lg:col-span-2">
          <FooterLinks />
        </div>

        {/* Block 4: card */}
        <div className="lg:col-span-3">
          <Link href="/contact" aria-label="Want us at your big day? Start an enquiry" className="group relative block w-full max-w-xs md:ml-auto">
            {/* Back card layers, fanned out on hover */}
            <span aria-hidden="true" className="absolute inset-x-2 -top-2 h-full origin-top-right -rotate-[4deg] rounded-sm bg-olive-deep transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-rotate-[7deg]" />
            <span aria-hidden="true" className="absolute inset-x-0 -top-1 h-full origin-bottom-left rotate-[1.5deg] rounded-sm bg-olive transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-[3deg]" />

            {/* Front card */}
            <span className="relative flex aspect-[16/10] flex-col justify-between overflow-hidden rounded-sm bg-sand p-5 shadow-[0_10px_30px_-12px_rgba(20,23,14,0.4)] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1 sm:p-6">
              {/* Faint background script */}
              <span aria-hidden="true" className="pointer-events-none absolute -right-1 -bottom-4 font-display text-[5.5rem] leading-none font-light italic text-olive/10 select-none">
                Wedding
              </span>

              <span className="relative font-display text-2xl leading-[1.02] font-normal text-ink sm:text-3xl">
                Want us at
                <br />
                YOUR BIG DAY?
              </span>

              {/* Marigold ring: a band with a stone set on top */}
              <svg aria-hidden="true" viewBox="0 0 120 120" className="absolute right-4 bottom-4 h-[40%] w-auto text-marigold transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-rotate-12">
                <circle cx="60" cy="68" r="34" fill="none" stroke="currentColor" strokeWidth="7" />
                <path d="M48 30 L60 12 L72 30 L60 42 Z" fill="currentColor" />
              </svg>
            </span>
          </Link>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mx-auto mt-10 flex max-w-[1400px] flex-col gap-1 border-t border-ink/15 pt-3 text-xs text-ink-soft lg:flex-row lg:items-center lg:justify-between lg:gap-3">
        <p>
          © {year} {site.legalName}. All rights reserved.
        </p>
        <p className="flex gap-5">
          <span className="inline-flex min-h-11 items-center">Made with love by LOKAS</span>
        </p>
        <p className="font-display text-lg whitespace-nowrap text-ink">      
              <Link className="inline-flex min-h-11 items-center underline-offset-4 transition-colors duration-400 hover:text-olive hover:underline" href="/privacy">Privacy Policy</Link>
        </p>
      </div>
    </footer>
  );
}
