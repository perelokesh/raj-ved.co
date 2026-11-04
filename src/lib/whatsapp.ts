import { site } from "@/src/content/site";

// Builds a wa.me link with a pre-filled, friendly opener.
export function whatsappLink(message = "Hi Raj&Ved, we would love to talk about our wedding.") {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
