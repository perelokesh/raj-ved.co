import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/src/content/services";

export const metadata: Metadata = {
  title: "Services",
  description: "Wedding photography, cinematography, or both from one coordinated team. Ask for a quote.",
  alternates: { canonical: "/services" },
};

export default function Services() {
  return (
    <section className="px-5 pt-32 pb-24 sm:px-10">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm tracking-[0.2em] uppercase text-ink-soft">Services</p>
        <h1 className="font-display mt-4 mb-6 text-5xl font-light sm:text-7xl">Photography, film, or both.</h1>
        <p className="mb-16 max-w-xl text-lg text-ink-soft">[DRAFT] We quote each wedding on its own events and dates. Prices are not listed here because no two weddings are the same.</p>

        <div className="space-y-16">
          {services.map((s) => (
            <article key={s.slug} className="grid gap-8 border-t border-ink/15 pt-10 md:grid-cols-12">
              <div className="md:col-span-5">
                <h2 className="font-display text-4xl font-light">{s.name}</h2>
                <p className="mt-4 text-ink-soft">{s.summary}</p>
              </div>
              <div className="md:col-span-7">
                <h3 className="text-sm font-medium tracking-wide uppercase">What is included</h3>
                <ul className="mt-4 list-disc space-y-2 pl-5">
                  {s.includes.map((item) => <li key={item}>{item}</li>)}
                </ul>
                <Link href="/contact" className="mt-8 inline-flex min-h-11 items-center text-base underline underline-offset-4">
                  Ask for a quote
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
