"use server";

import { Resend } from "resend";
import { site } from "@/src/content/site";
import { validateEnquiry, type EnquiryErrors, type EnquiryInput } from "@/src/lib/enquiry";

export type EnquiryResult =
  | { ok: true; message: string }
  | { ok: false; message: string; fieldErrors?: EnquiryErrors };

// Escape everything the visitor typed before it goes into an HTML email.
function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function verifyTurnstile(token: string | null): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.info("[enquiry] TURNSTILE_SECRET_KEY not set: skipping bot check (dev mock).");
    return true;
  }
  if (!token) return false;
  const body = new URLSearchParams({ secret, response: token });
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body });
  const json = (await res.json()) as { success?: boolean };
  return json.success === true;
}

function teamEmailHtml(i: EnquiryInput) {
  const rows: [string, string][] = [
    ["Names", i.names],
    ["Email", i.email],
    ["Phone / WhatsApp", i.phone],
    ["Wedding date(s)", i.weddingDate],
    ["City and venue", i.cityVenue],
    ["Events", i.events.join(", ")],
    ["Service", i.service],
    ["Budget", i.budget],
    ["Heard about us", i.source || "Not given"],
    ["Message", i.message],
  ];
  const items = rows
    .map(([k, v]) => `<tr><td style="padding:6px 12px 6px 0;color:#4f5440;vertical-align:top">${escapeHtml(k)}</td><td style="padding:6px 0;white-space:pre-wrap">${escapeHtml(v)}</td></tr>`)
    .join("");
  return `<div style="font-family:Georgia,serif;color:#14170e"><h2 style="font-weight:300">New enquiry</h2><table>${items}</table></div>`;
}

function autoReplyHtml(names: string) {
  return `<div style="font-family:Georgia,serif;color:#14170e;line-height:1.6">
<p>Dear ${escapeHtml(names)},</p>
<p>Thank you for writing to us. We read every enquiry ourselves, and we will reply within two working days.</p>
<p>In the meantime, feel free to reply to this email or message us on WhatsApp.</p>
<p>With warmth,<br/>Raj &amp; Ved</p></div>`;
}

export async function submitEnquiry(input: EnquiryInput, turnstileToken: string | null): Promise<EnquiryResult> {
  // Honeypot: bots fill hidden fields. Pretend success so they learn nothing.
  if (input.website && input.website.trim() !== "") {
    return { ok: true, message: "Thank you. We will be in touch." };
  }

  const fieldErrors = validateEnquiry(input);
  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, message: "Please check the highlighted fields.", fieldErrors };
  }

  if (!(await verifyTurnstile(turnstileToken))) {
    return { ok: false, message: "The security check did not pass. Please try again." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_TO_EMAIL;
  const from = process.env.ENQUIRY_FROM_EMAIL ?? `Raj&Ved <${site.email}>`;

  if (!apiKey || !to) {
    // Dev mock: no keys configured, so nothing is sent. Shown clearly in the server log.
    console.warn("[enquiry] RESEND_API_KEY or ENQUIRY_TO_EMAIL missing: enquiry not emailed (dev mock). Names:", input.names);
    return { ok: true, message: "Thank you. Your enquiry is saved (development mock: no email sent)." };
  }

  try {
    const resend = new Resend(apiKey);
    const [team, reply] = await Promise.all([
      resend.emails.send({
        from,
        to,
        replyTo: input.email,
        subject: `New enquiry from ${input.names}`,
        html: teamEmailHtml(input),
      }),
      resend.emails.send({
        from,
        to: input.email,
        subject: "Thank you for writing to Raj&Ved",
        html: autoReplyHtml(input.names),
      }),
    ]);
    if (team.error || reply.error) throw new Error(team.error?.message ?? reply.error?.message);
    return { ok: true, message: "Thank you. We have your enquiry and will reply within two working days." };
  } catch (err) {
    console.error("[enquiry] send failed", err);
    return { ok: false, message: "We could not send your enquiry just now. Please use WhatsApp instead." };
  }
}
