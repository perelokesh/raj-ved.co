"use client";

import { Turnstile } from "@marsidev/react-turnstile";
import { useRef, useState, useTransition, type FormEvent } from "react";
import { submitEnquiry } from "@/src/lib/enquiry-action";
import { BUDGETS, EVENTS, SERVICES, SOURCES, validateEnquiry, type EnquiryErrors, type EnquiryInput } from "@/src/lib/enquiry";
import { whatsappLink } from "@/src/lib/whatsapp";

const empty: EnquiryInput = {
  names: "",
  email: "",
  phone: "",
  weddingDate: "",
  cityVenue: "",
  events: [],
  service: "",
  budget: "",
  source: "",
  message: "",
  website: "",
};

const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const fieldClass =
  "mt-2 w-full rounded-sm border border-ink/25 bg-ivory px-4 py-3 text-base text-ink placeholder:text-ink-soft/70 focus:border-olive focus:outline-none aria-[invalid=true]:border-red-800";

// Enquiry form. Validation is shared with the server (src/lib/enquiry.ts).
// Inline errors show on blur and on submit; submit focuses the first error.
export function ContactForm() {
  const [values, setValues] = useState<EnquiryInput>(empty);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [status, setStatus] = useState<{ kind: "idle" | "ok" | "error"; message: string }>({ kind: "idle", message: "" });
  const [token, setToken] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  function set<K extends keyof EnquiryInput>(key: K, value: EnquiryInput[K]) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  function blurValidate(key: keyof EnquiryInput) {
    const all = validateEnquiry({ ...values });
    setErrors((e) => ({ ...e, [key]: all[key] }));
  }

  function toggleEvent(name: string) {
    const next = values.events.includes(name) ? values.events.filter((n) => n !== name) : [...values.events, name];
    set("events", next);
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validateEnquiry(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setStatus({ kind: "error", message: "Please check the highlighted fields." });
      const first = formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]');
      first?.focus();
      return;
    }
    startTransition(async () => {
      const result = await submitEnquiry(values, token);
      if (result.ok) {
        setStatus({ kind: "ok", message: result.message });
        setValues(empty);
        setErrors({});
      } else {
        setStatus({ kind: "error", message: result.message });
        if (result.fieldErrors) setErrors(result.fieldErrors);
      }
    });
  }

  const invalid = (key: keyof EnquiryInput) => (errors[key] ? { "aria-invalid": true } : {});
  const describe = (key: keyof EnquiryInput) => (errors[key] ? { "aria-describedby": `${key}-error` } : {});
  const Err = ({ k }: { k: keyof EnquiryInput }) =>
    errors[k] ? (
      <p id={`${k}-error`} className="mt-2 text-sm text-red-800">
        {errors[k]}
      </p>
    ) : null;

  if (status.kind === "ok") {
    return (
      <div role="status" aria-live="polite" className="rounded-sm border border-olive/30 bg-sand p-8">
        <p className="font-display text-3xl font-light">Thank you.</p>
        <p className="mt-3 text-ink-soft">{status.message}</p>
        <a className="mt-6 inline-flex min-h-11 items-center underline underline-offset-4" href={whatsappLink()} target="_blank" rel="noopener noreferrer">
          Or message us on WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-8" aria-label="Enquiry form">
      {/* Honeypot: hidden from people and screen readers, filled only by bots. */}
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label>
          Website
          <input tabIndex={-1} autoComplete="off" value={values.website} onChange={(e) => set("website", e.target.value)} />
        </label>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium">Your names</span>
          <input className={fieldClass} name="names" autoComplete="name" value={values.names} onChange={(e) => set("names", e.target.value)} onBlur={() => blurValidate("names")} {...invalid("names")} {...describe("names")} />
          <Err k="names" />
        </label>
        <label className="block">
          <span className="text-sm font-medium">Email</span>
          <input className={fieldClass} type="email" name="email" autoComplete="email" value={values.email} onChange={(e) => set("email", e.target.value)} onBlur={() => blurValidate("email")} {...invalid("email")} {...describe("email")} />
          <Err k="email" />
        </label>
        <label className="block">
          <span className="text-sm font-medium">Phone or WhatsApp</span>
          <input className={fieldClass} type="tel" name="phone" autoComplete="tel" placeholder="+91 …" value={values.phone} onChange={(e) => set("phone", e.target.value)} onBlur={() => blurValidate("phone")} {...invalid("phone")} {...describe("phone")} />
          <Err k="phone" />
        </label>
        <label className="block">
          <span className="text-sm font-medium">Wedding date(s)</span>
          <input className={fieldClass} name="weddingDate" placeholder="e.g. 14 to 16 February 2027" value={values.weddingDate} onChange={(e) => set("weddingDate", e.target.value)} onBlur={() => blurValidate("weddingDate")} {...invalid("weddingDate")} {...describe("weddingDate")} />
          <Err k="weddingDate" />
        </label>
        <label className="block sm:col-span-2">
          <span className="text-sm font-medium">City and venue</span>
          <input className={fieldClass} name="cityVenue" value={values.cityVenue} onChange={(e) => set("cityVenue", e.target.value)} onBlur={() => blurValidate("cityVenue")} {...invalid("cityVenue")} {...describe("cityVenue")} />
          <Err k="cityVenue" />
        </label>
      </div>

      <fieldset aria-describedby={errors.events ? "events-error" : undefined} {...(errors.events ? { "aria-invalid": true } : {})}>
        <legend className="text-sm font-medium">Which events?</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {EVENTS.map((ev) => (
            <label key={ev} className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-ink/25 px-4 has-[:checked]:border-olive has-[:checked]:bg-olive has-[:checked]:text-ivory">
              <input type="checkbox" className="sr-only" checked={values.events.includes(ev)} onChange={() => toggleEvent(ev)} />
              {ev}
            </label>
          ))}
        </div>
        <Err k="events" />
      </fieldset>

      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium">Service</span>
          <select className={fieldClass} name="service" value={values.service} onChange={(e) => set("service", e.target.value)} onBlur={() => blurValidate("service")} {...invalid("service")} {...describe("service")}>
            <option value="">Choose one</option>
            {SERVICES.map((s) => <option key={s}>{s}</option>)}
          </select>
          <Err k="service" />
        </label>
        <label className="block">
          <span className="text-sm font-medium">Budget range</span>
          <select className={fieldClass} name="budget" value={values.budget} onChange={(e) => set("budget", e.target.value)} onBlur={() => blurValidate("budget")} {...invalid("budget")} {...describe("budget")}>
            <option value="">Choose one</option>
            {BUDGETS.map((b) => <option key={b}>{b}</option>)}
          </select>
          <Err k="budget" />
        </label>
        <label className="block sm:col-span-2">
          <span className="text-sm font-medium">How did you hear about us?</span>
          <select className={fieldClass} name="source" value={values.source} onChange={(e) => set("source", e.target.value)}>
            <option value="">Optional</option>
            {SOURCES.map((s) => <option key={s}>{s}</option>)}
          </select>
        </label>
      </div>

      <label className="block">
        <span className="text-sm font-medium">Tell us about your day</span>
        <textarea className={`${fieldClass} min-h-40`} name="message" value={values.message} onChange={(e) => set("message", e.target.value)} onBlur={() => blurValidate("message")} {...invalid("message")} {...describe("message")} />
        <Err k="message" />
      </label>

      {siteKey ? (
        <Turnstile siteKey={siteKey} onSuccess={setToken} options={{ theme: "light" }} />
      ) : (
        <p className="text-xs text-ink-soft">Bot check is off in development (set NEXT_PUBLIC_TURNSTILE_SITE_KEY to enable Turnstile).</p>
      )}

      <div role="status" aria-live="polite" className="min-h-6 text-sm">
        {status.kind === "error" && <span className="text-red-800">{status.message}</span>}
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <button type="submit" disabled={pending} className="min-h-12 rounded-full bg-olive px-8 text-base font-medium text-ivory transition-colors duration-400 hover:bg-olive-deep disabled:opacity-60">
          {pending ? "Sending…" : "Send enquiry"}
        </button>
        <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="min-h-12 inline-flex items-center px-2 text-base underline underline-offset-4">
          Prefer WhatsApp?
        </a>
      </div>
    </form>
  );
}
