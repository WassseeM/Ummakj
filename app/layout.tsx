import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap"
});

const sans = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap"
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-mono",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ummakj.com"),
  title: "UMMAKJ Architecture Studio — Creating Architecture Beyond Time",
  description:
    "UMMAKJ Architecture Studio designs timeless residences, interiors and landscapes — architecture, interior design and landscape composed as a single hand.",
  keywords: [
    "architecture studio",
    "luxury architecture",
    "residential architecture",
    "interior design",
    "landscape architecture",
    "master planning"
  ],
  openGraph: {
    title: "UMMAKJ Architecture Studio",
    description: "Creating Architecture Beyond Time.",
    type: "website",
    locale: "en_GB"
  },
  twitter: {
    card: "summary_large_image",
    title: "UMMAKJ Architecture Studio",
    description: "Creating Architecture Beyond Time."
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body className="bg-bg text-ink antialiased">
        <a
          href="#projects"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-accent focus:px-4 focus:py-2 focus:text-black"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
