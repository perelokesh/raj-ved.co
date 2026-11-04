# Decisions

- **Synthetic media, not stock.** No Pexels, Unsplash or Pixabay keys, and stock photos can't be licence-checked from here. All imagery is generated locally (`scripts/generate-placeholders.mjs`), so no identifiable people appear anywhere. Every slot is `placeholder: true`.
- **Hero is a 12 s Ken Burns loop** rendered with ffmpeg from a still, with a separate 720x1280 mobile cut. The loop is seamless because the zoom follows a sine curve.
- **Full film is a 88 s placeholder** assembled from stills with cross-fades and no audio. Captions are in `public/media/film/full-film-placeholder.vtt`.
- **Fonts self-hosted** through `@fontsource` (Cormorant Garamond and Inter) rather than `next/font/local`, because they come from npm and need no manual download.
- **Tailwind v4 tokens** live in `app/globals.css`. The old v3 `tailwind.config.ts` was removed because v4 ignores it.
- **Contact flow** re-validates on the server with the same `src/lib/enquiry.ts` rules. Without `RESEND_API_KEY` or `TURNSTILE_SECRET_KEY` it logs a notice and returns a mock success.
- **Server action lives in `src/lib/enquiry-action.ts`**, not `src/app`, so there is a single route tree under `app/`.
- **Text contrast checked** with WCAG formulas: ink-soft on ivory 7.0:1, ivory-soft on olive 6.3:1, ivory-soft on ink 14:1.
- **Git:** work is on local branch `prototype/cinematic-site` with no commits, per your instruction. Nothing is pushed.
