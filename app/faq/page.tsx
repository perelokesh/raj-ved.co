import type { Metadata } from "next";
import { JsonLd } from "@/src/components/JsonLd";
import { faq } from "@/src/content/faq";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Booking, delivery, coverage and payment questions answered.",
  alternates: { canonical: "/faq" },
};

export default function Faq() {
  const structured = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return (
    <section className="px-5 pt-32 pb-24 sm:px-10">
      <JsonLd data={structured} />
      <div className="mx-auto max-w-3xl">
        <p className="text-sm tracking-[0.2em] uppercase text-ink-soft">FAQ</p>
        <h1 className="font-display mt-4 mb-12 text-5xl font-light sm:text-6xl">Questions we are asked</h1>
        <div className="divide-y divide-ink/15 border-y border-ink/15">
          {faq.map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-6 text-lg font-medium">
                {item.q}
                <span aria-hidden="true" className="text-2xl transition-transform duration-400 group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 pr-8 text-ink-soft">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
