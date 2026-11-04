import type { MetadataRoute } from "next";
import { site } from "@/src/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/gallery", "/about", "/services", "/faq", "/contact", "/privacy"];
  return routes.map((path) => ({ url: `${site.url}${path}`, lastModified: new Date(), changeFrequency: "monthly", priority: path === "" ? 1 : 0.7 }));
}
