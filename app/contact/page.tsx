import type { Metadata } from "next";
import { ContactForm } from "@/src/components/ContactForm";
import { site } from "@/src/content/site";
import { whatsappLink } from "@/src/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell us about your wedding dates, venue and events. We reply within two working days.",
  alternates: { canonical: "/contact" },
};

export default function Contact() {
  return (
    <section className="px-5 pt-32 pb-24 sm:px-10">
      <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="text-sm tracking-[0.2em] uppercase text-ink-soft">Enquire</p>
          <h1 className="font-display mt-4 text-5xl font-light sm:text-6xl">Tell us about your day.</h1>
          <p className="mt-6 text-ink-soft">[DRAFT] The more you tell us, the better we can reply. Nothing you send is shared outside the studio.</p>
          <dl className="mt-10 space-y-4 text-sm">
            <div><dt className="text-ink-soft">Email</dt><dd><a className="underline underline-offset-4" href={`mailto:${site.email}`}>{site.email}</a></dd></div>
            <div><dt className="text-ink-soft">WhatsApp</dt><dd><a className="underline underline-offset-4" href={whatsappLink()} target="_blank" rel="noopener noreferrer">Message us</a></dd></div>
          </dl>
        </div>
        <div className="relative lg:col-span-8">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
