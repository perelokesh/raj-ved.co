// Validation shared by the client form and the server action, so the rules
// cannot drift. Pure functions only: no secrets, no server imports.

export const EVENTS = ["Haldi", "Mehendi", "Sangeet", "Wedding", "Reception"] as const;
export const SERVICES = ["Photography", "Cinematography", "Both"] as const;
export const BUDGETS = ["Under ₹2 lakh", "₹2–5 lakh", "₹5–10 lakh", "Above ₹10 lakh", "Not sure yet"] as const;
export const SOURCES = ["Instagram", "WhatsApp", "A friend or family", "A venue or planner", "Search", "Other"] as const;

export type EnquiryInput = {
  names: string;
  email: string;
  phone: string;
  weddingDate: string;
  cityVenue: string;
  events: string[];
  service: string;
  budget: string;
  source: string;
  message: string;
  website?: string; // honeypot, must stay empty
};

export type EnquiryErrors = Partial<Record<keyof EnquiryInput, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^[+0-9 ()-]{8,20}$/;

export function validateEnquiry(input: EnquiryInput): EnquiryErrors {
  const errors: EnquiryErrors = {};
  if (input.names.trim().length < 2) errors.names = "Please tell us both names.";
  if (!EMAIL.test(input.email.trim())) errors.email = "Enter an email we can reply to.";
  if (!PHONE.test(input.phone.trim())) errors.phone = "Enter a phone number with country code.";
  if (!input.weddingDate.trim()) errors.weddingDate = "Tell us the date or the month you have in mind.";
  if (input.cityVenue.trim().length < 2) errors.cityVenue = "Tell us the city or venue.";
  if (input.events.length === 0) errors.events = "Pick at least one event.";
  if (!(SERVICES as readonly string[]).includes(input.service)) errors.service = "Choose a service.";
  if (!(BUDGETS as readonly string[]).includes(input.budget)) errors.budget = "Choose a budget range.";
  if (input.message.trim().length < 10) errors.message = "A few sentences help us reply properly.";
  if (input.message.length > 2000) errors.message = "Please keep the message under 2000 characters.";
  return errors;
}
