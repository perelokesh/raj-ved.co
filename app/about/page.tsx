import type { Metadata } from "next";
import Link from "next/link";
import { Photo } from "@/src/components/Photo";
import { Reveal } from "@/src/components/Reveal";
import { crew, founders } from "@/src/content/team";

export const metadata: Metadata = {
  title: "About",
  description: "Who we are, how we work, and the small crew behind every Raj&Ved film and gallery.",
  alternates: { canonical: "/about" },
};

export default function About() {
  return (
    <>
      <section className="px-5 pt-32 pb-20 sm:px-10">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm tracking-[0.2em] uppercase text-ink-soft">About</p>
          <h1 className="font-display mt-4 text-5xl font-light sm:text-7xl text-balance">We would rather be part of the family than in the corner.</h1>
          <p className="mt-8 text-lg text-ink-soft">
            [DRAFT] Raj&Ved. started with two friends and one borrowed lens. Today we run a small studio with a tight crew, because a wedding is easier to hold when the people holding the cameras know each other well.
          </p>
        </div>
      </section>

      <section className="px-5 pb-24 sm:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="relative aspect-[21/9] overflow-hidden">
            <Photo assetId="chaturved" alt="Chaturved smiling in a pale blue kurta against a red brick wall" sizes="100vw" fill className="object-cover object-[50%_30%]" />
          </div>
        </div>
      </section>

      <section className="bg-sand px-5 py-24 sm:px-10">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2">
          {founders.map((f, i) => (
            <Reveal key={f.name} delay={i * 0.1}>
              <div className="relative aspect-[4/5] overflow-hidden">
                <Photo assetId={f.portraitAssetId} alt={`${f.name} portrait placeholder [REPLACE: founder portrait]`} sizes="(min-width: 768px) 45vw, 100vw" fill className="object-cover" />
              </div>
              <h2 className="font-display mt-6 text-4xl font-light">{f.name}</h2>
              <p className="text-sm text-ink-soft">{f.role}</p>
              <p className="mt-4 text-lg">{f.bio}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-5 py-24 sm:px-10">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-4xl font-light">The crew</h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {crew.map((c, i) => (
              <li key={i} className="border-t border-ink/15 py-4">
                <p className="font-medium">{c.name}</p>
                <p className="text-sm text-ink-soft">{c.role}</p>
              </li>
            ))}
          </ul>
          <Link href="/services" className="mt-12 inline-flex min-h-11 items-center text-base underline underline-offset-4">See how we work with you</Link>
        </div>
      </section>
    </>
  );
}
