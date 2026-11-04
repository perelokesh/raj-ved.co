import type { Metadata } from "next";
import { site } from "@/src/content/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How Raj&Ved. handles the details you send us.",
  alternates: { canonical: "/privacy" },
};

export default function Privacy() {
  return (
    <section className="px-5 pt-32 pb-24 sm:px-10">
      <div className="mx-auto max-w-2xl space-y-6 text-lg">
        <p className="rounded-sm bg-sand p-4 text-base">[DRAFT] This privacy notice is a placeholder and must be reviewed by a lawyer before launch.</p>
        <h1 className="font-display text-5xl font-light">Privacy</h1>
        <p>We use the details you send through the enquiry form only to reply to you and to plan your wedding. We do not sell them.</p>
        <p>Our website analytics (Plausible) do not use cookies. The film may load a Vimeo player only when you press play, and Vimeo may set its own cookies at that point.</p>
        <p>To ask us to delete your details, email <a className="underline underline-offset-4" href={`mailto:${site.email}`}>{site.email}</a>.</p>
        <p className="text-sm text-ink-soft">Legal entity: {site.legalName}. [BUSINESS NAME AND REGISTRATION]</p>
      </div>
    </section>
  );
}
