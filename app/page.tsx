import Link from "next/link";
import { FilmPlayer } from "@/src/components/FilmPlayer";
import { GalleryGrid } from "@/src/components/GalleryGrid";
import { Hero } from "@/src/components/Hero";
import { Photo } from "@/src/components/Photo";
import { Reveal } from "@/src/components/Reveal";
import { gallery } from "@/src/content/gallery";
import { founders } from "@/src/content/team";
import { testimonials } from "@/src/content/testimonials";
import { site } from "@/src/content/site";

export const metadata = {
  title: { absolute: "Raj&Ved.co | Wedding Photography & Cinematic Films" },
  description: site.description,
  alternates: { canonical: "/" },
};

const philosophy = [
  { title: "We wait for the quiet bits.", body: "[DRAFT] The vows are only part of the day. We spend our time on the glances between events, the grandmother who cannot stop smiling, the hands that help with a zip." },
  { title: "We ask before we shoot.", body: "[DRAFT] Before the wedding we learn the rituals, the family rules and the moments that matter most to you, so we never need to ask during them." },
  { title: "We edit for the feeling.", body: "[DRAFT] Warm, honest colour and very few effects. The film should feel like being back in the room, not like watching an advert." },
];

export default function Home() {
  return (
    <>
      <Hero />

      {/* 2. Introduction */}
      <section id="introduction" aria-labelledby="intro-title" className="px-5 py-24 sm:px-10 lg:py-36">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Photo assetId="the-founders" alt="[REPLACE: intro photograph] The founders in soft morning light" sizes="(min-width: 1024px) 55vw, 100vw" fill className="object-cover" />
            </div>
          </Reveal>
          <Reveal className="lg:col-span-5" delay={0.1}>
            <p className="text-sm tracking-[0.2em] uppercase text-ink-soft">Who we are</p>
            <h2 id="intro-title" className="font-display mt-4 text-4xl font-light sm:text-5xl text-balance">
              Two friends who love a good wedding and a quieter frame.
            </h2>
            <p className="mt-6 text-lg text-ink-soft">
              [DRAFT] We are Raj and Ved. We photograph and film weddings across India, and we would rather be part of your family&rsquo;s day than a camera in the corner.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 3. The film (olive full-bleed) */}
      <section aria-labelledby="film-title" className="relative grain bg-olive px-5 py-24 text-ivory sm:px-10 lg:py-32">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="text-sm tracking-[0.2em] uppercase text-ivory-soft">The film</p>
            <h2 id="film-title" className="font-display mt-4 mb-10 text-4xl font-light sm:text-5xl">
              One wedding, told slowly.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <FilmPlayer />
          </Reveal>
        </div>
      </section>

      {/* 4. Gallery preview */}
      <section aria-labelledby="gallery-title" className="px-5 py-24 sm:px-10 lg:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <h2 id="gallery-title" className="font-display text-4xl font-light sm:text-5xl">From the gallery</h2>
            <Link href="/gallery" className="min-h-11 inline-flex items-center text-base underline underline-offset-4">
              See the full gallery
            </Link>
          </div>
          <GalleryGrid items={gallery} showFilter={false} limit={5} />
        </div>
      </section>

      {/* 5. Our story (sand) */}
      <section aria-labelledby="story-title" className="bg-sand px-5 py-24 sm:px-10 lg:py-32">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-[3/4] overflow-hidden">
                <Photo assetId="chaturved" alt="Chaturved smiling in a pale blue kurta against a red brick wall" sizes="25vw" fill className="object-cover" />
              </div>
                <div className="relative mt-12 aspect-[3/4] overflow-hidden">
                <Photo assetId="rajesh" alt="Rajesh framing a shot with a cinema camera outdoors" sizes="25vw" fill className="object-cover" />
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 id="story-title" className="font-display text-4xl font-light sm:text-5xl">Our story</h2>
            <p className="mt-6 text-lg text-ink-soft">
              [DRAFT] We started together at a cousin&rsquo;s wedding, arguing over a single lens. We have been arguing, and making films, ever since.
            </p>
            <ul className="mt-8 space-y-6">
              {founders.map((f) => (
                <li key={f.name}>
                  <p className="font-display text-2xl">{f.name}</p>
                  <p className="text-sm text-ink-soft">{f.role}</p>
                </li>
              ))}
            </ul>
            <Link href="/about" className="mt-10 inline-flex min-h-11 items-center text-base underline underline-offset-4">
              Read more about us
            </Link>
          </Reveal>
        </div>
      </section>

      {/* 6. Testimonials */}
      <section aria-labelledby="kind-words" className="px-5 py-24 sm:px-10 lg:py-32">
        <div className="mx-auto max-w-5xl">
          <h2 id="kind-words" className="sr-only">Kind words</h2>
          <div className="space-y-20">
            {testimonials.map((t, i) => (
              <Reveal key={t.names} delay={i * 0.05}>
                <figure>
                  <blockquote className="font-display text-3xl leading-snug font-light italic sm:text-4xl">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-6 text-sm text-ink-soft">
                    <span className="font-medium text-ink">{t.names}</span> · {t.city} · {t.venue}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Philosophy (olive) */}
      <section aria-labelledby="approach-title" className="relative grain bg-olive-deep px-5 py-24 text-ivory sm:px-10 lg:py-32">
        <div className="mx-auto max-w-6xl">
          <h2 id="approach-title" className="font-display mb-16 text-4xl font-light sm:text-5xl">How we work</h2>
          <div className="grid gap-12 md:grid-cols-3">
            {philosophy.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <p className="text-sm text-marigold">0{i + 1}</p>
                <h3 className="font-display mt-3 text-3xl font-light">{p.title}</h3>
                <p className="mt-4 text-ivory-soft">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Team */}
      <section aria-labelledby="team-title" className="px-5 py-24 sm:px-10 lg:py-32">
        <div className="mx-auto max-w-6xl">
          <h2 id="team-title" className="font-display mb-12 text-4xl font-light sm:text-5xl">The people behind the lens</h2>
          <div className="grid gap-10 md:grid-cols-2">
            {founders.map((f, i) => (
              <Reveal key={f.name} delay={i * 0.1}>
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Photo assetId={f.portraitAssetId} alt={`${f.name} portrait placeholder [REPLACE: founder portrait]`} sizes="(min-width: 768px) 50vw, 100vw" fill className="object-cover" />
                </div>
                <p className="font-display mt-6 text-3xl">{f.name}</p>
                <p className="text-sm text-ink-soft">{f.role}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Call to action (olive) */}
      <section aria-labelledby="cta-title" className="relative grain bg-olive px-5 py-24 text-ivory sm:px-10 lg:py-32">
        <Reveal className="mx-auto max-w-4xl text-center">
          <h2 id="cta-title" className="font-display text-5xl font-light sm:text-7xl">Tell us about your day.</h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-ivory-soft">
            [DRAFT] The dates, the venue, the rituals you are most excited about. We will reply within two working days.
          </p>
          <Link href="/contact" className="mt-10 inline-flex min-h-12 items-center rounded-full bg-ivory px-8 text-base font-medium text-ink transition-colors duration-400 hover:bg-sand">
            Start an enquiry
          </Link>
        </Reveal>
      </section>
    </>
  );
}
