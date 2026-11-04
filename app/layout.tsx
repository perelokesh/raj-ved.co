import type { Metadata, Viewport } from "next";
import "@fontsource/cormorant-garamond/300.css";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/300-italic.css";
import "@fontsource/cormorant-garamond/400-italic.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import Script from "next/script";
import type { ReactNode } from "react";
import { Footer } from "@/src/components/Footer";
import { Header } from "@/src/components/Header";
import { JsonLd } from "@/src/components/JsonLd";
import { MotionProvider } from "@/src/components/MotionProvider";
import { PrototypeBadge } from "@/src/components/PrototypeBadge";
import { site } from "@/src/content/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Raj&Ved.co | Wedding Photography & Cinematic Films",
    template: "%s · Raj&Ved.co",
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: site.locale,
    url: site.url,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Raj&Ved.co wedding photography and films" }],
  },
  twitter: { card: "summary_large_image", images: ["/og.jpg"] },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.jpg" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F6F2E9",
};

const professionalService = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  alternateName: site.legalName,
  url: site.url,
  email: site.email,
  description: site.description,
  areaServed: "IN",
  serviceType: ["Wedding photography", "Wedding cinematography"],
  sameAs: [site.social.instagram, site.social.youtube, site.social.vimeo],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-ink focus:px-4 focus:py-3 focus:text-ivory"
        >
          Skip to content
        </a>
        <MotionProvider>
          <Header />
          <main id="main" tabIndex={-1} className="min-h-screen">
            {children}
          </main>
        </MotionProvider>
        <Footer />
        <PrototypeBadge />
        <JsonLd data={professionalService} />
        {site.plausibleDomain && (
          <Script src="https://plausible.io/js/script.js" data-domain={site.plausibleDomain} strategy="afterInteractive" />
        )}
      </body>
    </html>
  );
}
