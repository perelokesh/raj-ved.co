import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://raj-ved.co"),
  title: "RAJ&VED.co",
  description: "RAJ&VED.co is a wedding photography and cinematic videography studio capturing timeless love stories with elegance and emotion.",
  keywords: [
    "Raj Ved",
    "Raj&Ved",
    "Raj&Ved.Co",
    "wedding photography",
    "cinematic films",
    "videography",
    "wedding video",
    "premium wedding",
    "wedding filmmaker",
    "wedding cinematography",
  ],
  icons: {
    icon: "/RAJ & VED.CO  copy.jpg",
  },
  openGraph: {
    title: "RAJ&VED.co | Wedding Photography & Cinematic Films",
    description: "RAJ&VED.co is a wedding photography and cinematic videography studio capturing timeless love stories with elegance and emotion.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/RAJ & VED.CO  copy.jpg",
        width: 1200,
        height: 630,
        alt: "RAJ&VED.co - Wedding Photography & Cinematic Films",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Raj&Ved.Co | Wedding Photography & Cinematic Films",
    description: "Raj & Ved Co - Premium wedding photography and cinematic videography studio. Website coming soon.",
    images: ["/RAJ & VED.CO  copy.jpg"],
  },
  robots: "index, follow",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Raj & Ved Co",
    image: "/RAJ & VED.CO  copy.jpg",
    description: "Premium wedding photography and cinematic videography studio",
    url: "https://raj-ved.co",
    sameAs: [

    ],
    servicetype: ["Photography", "Videography", "Wedding Services"],
    areaServed: "IN",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
    },
  };

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="theme-color" content="#faf9f7" />
        <link rel="canonical" href="https://raj-ved.co" />
        <link rel="icon" href="/RAJ & VED.CO  copy.jpg" />
        
        {/* Schema.org Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
