import type { Metadata } from "next";
import { DM_Sans, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const sans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const serif = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Vitalix | Jugos naturales y shots funcionales",
  description:
    "Fresh Packs, jugos naturales y shots funcionales hechos en Charleston, SC. Ordena directamente por WhatsApp.",
  openGraph: {
    title: "Vitalix | Lo natural se siente mejor",
    description:
      "Jugos naturales, Fresh Packs y shots funcionales en Charleston, SC.",
    type: "website",
    images: [{ url: "/og.png", width: 1733, height: 909, alt: "Vitalix" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vitalix | Lo natural se siente mejor",
    description:
      "Jugos naturales, Fresh Packs y shots funcionales en Charleston, SC.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={`${sans.variable} ${serif.variable}`}>{children}</body>
    </html>
  );
}
