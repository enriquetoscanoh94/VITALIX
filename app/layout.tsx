import type { Metadata } from "next";
import { Hanken_Grotesk, Kaushan_Script } from "next/font/google";
import "./globals.css";

// Cuerpo y titulares comparten familia (una sans en varios pesos).
const sans = Hanken_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
});

// Acento manuscrito para una palabra clave por sección (estilo IG de Vitalix).
const script = Kaushan_Script({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["400"],
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
      <body className={`${sans.variable} ${script.variable}`}>{children}</body>
    </html>
  );
}
