import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[70svh] flex-col items-center justify-center px-5 text-center">
      <p className="text-sm tracking-[0.2em] uppercase text-ink-soft">404</p>
      <h1 className="font-display mt-4 text-5xl font-light">This page stepped out of the frame.</h1>
      <Link href="/" className="mt-8 inline-flex min-h-11 items-center underline underline-offset-4">Back to the home page</Link>
    </section>
  );
}
