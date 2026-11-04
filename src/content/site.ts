// Site-wide settings. Placeholder values are marked [REPLACE] and come from the client.

export const site = {
  name: "Raj&Ved.co",
  legalName: "Raj&Ved.",
  url: "https://raj-ved.co", // [DOMAIN]
  tagline: "want us at your big day ?",
  description:
    "Raj&Ved.co is a wedding photography and cinematography studio. We stay for the quiet bits.",
  locale: "en_IN",
  // [EMAIL]
  email: "hello@raj-ved.co",
  // [NUMBER] international format, digits only for wa.me links
  whatsapp: "919014384214",
  // [CITIES]
  cities: ["Delhi", "Mumbai", "Udaipur", "Jaipur"],
  // [LOCATION]
  location: "[LOCATION] — based in India, working across the country",
  // [LINKS] social profiles
  social: {
    instagram: "https://www.instagram.com/rajved.co/",
    youtube: "https://www.youtube.com/",
    vimeo: "https://vimeo.com/",
  },
  // Plausible: only loaded when NEXT_PUBLIC_PLAUSIBLE_DOMAIN is set.
  plausibleDomain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ?? "",
  prototypeBadge: process.env.NEXT_PUBLIC_PROTOTYPE_BADGE === "true",
  smoothScroll: process.env.NEXT_PUBLIC_SMOOTH_SCROLL === "true",
} as const;

export type FilmSource =
  | { type: "vimeo"; id: string }
  | { type: "file"; src: string; poster: string; captions: string };

// The full wedding film. PLACEHOLDER: this is a synthetic cut assembled from stills.
// Swap `source` for { type: "vimeo", id } once the real film exists.
export const film: {
  title: string;
  caption: string;
  placeholder: boolean;
  source: FilmSource;
  durationLabel: string;
} = {
  title: "[DRAFT] A wedding in Udaipur", // [NAMES] [LOCATION]
  caption: "[DRAFT] Priya & Arjun · Udaipur · a monsoon week in October",
  placeholder: true,
  source: {
    type: "file",
    src: "/media/film/full-film-placeholder-1080p.mp4",
    poster: "/media/hero/marigold-garland-glow.jpg",
    captions: "/media/film/full-film-placeholder.vtt",
  },
  durationLabel: "1 min 28 s",
};
