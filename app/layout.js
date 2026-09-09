import { Playfair_Display, Plus_Jakarta_Sans, Cinzel } from "next/font/google";
import "./globals.css";
import WhatsAppWidget from "./components/WhatsAppWidget";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "RuuAURA — Sanctuary of Haute Coiffure & Aesthetic Radiance | Dehiwala",
  description:
    "RuuAURA is Dehiwala's premier luxury beauty sanctuary offering bespoke hair architecture, artisan color, cellular spa rituals, and editorial bridal couture. Book your private appointment.",
  keywords:
    "luxury salon dehiwala, haute coiffure, balayage, spa, bridal hair makeup, dehiwala beauty studio",
  openGraph: {
    title: "RuuAURA — Luxury Beauty Sanctuary",
    description: "Bespoke hair architecture, spa rituals & bridal couture in Dehiwala.",
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${jakartaSans.variable} ${cinzel.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-brand-black text-brand-cream relative">
        {children}
        <WhatsAppWidget />
      </body>
    </html>
  );
}
