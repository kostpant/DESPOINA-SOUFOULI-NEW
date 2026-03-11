import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Δέσποινα Σοφούλη Hair Salon | Balayage Specialist Corinth",
  description: "Premier hair salon in Corinth (Κόρινθος) specializing in Balayage, women's & men's haircuts, and professional styling. Visit us at Patron 45.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        suppressHydrationWarning
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          playfair.variable,
          inter.variable
        )}
      >
        <Navigation />
        <main>{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HairSalon",
              "name": "Δέσποινα Σοφούλη Hair Salon",
              "image": "https://despoinasofouli.gr/og-image.jpg", // Placeholder
              "description": "Expert Balayage, Professional Styling & Transformations in Corinth. Premier hair salon specializing in modern techniques.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Πατρών 45",
                "addressLocality": "Corinth",
                "addressRegion": "Korinthia",
                "postalCode": "20131",
                "addressCountry": "GR"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 37.9398516,
                "longitude": 22.9328572
              },
              "url": "https://despoinasofouli.gr",
              "telephone": "+302741022221",
              "priceRange": "€€",
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Tuesday", "Thursday", "Friday"],
                  "opens": "09:00",
                  "closes": "21:00"
                },
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": "Saturday",
                  "opens": "09:00",
                  "closes": "16:00"
                }
              ]
            })
          }}
        />
      </body>
    </html>
  );
}
