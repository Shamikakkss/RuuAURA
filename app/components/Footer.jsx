import Link from "next/link";
import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from "lucide-react";

const FOOTER_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/staff", label: "Artisans" },
  { href: "/about", label: "About" },
  { href: "/location", label: "Location" },
  { href: "/contact", label: "Contact" },
  { href: "/booking", label: "Book Appointment" },
];

const HOURS = [
  { day: "Monday – Friday", time: "10:00 AM – 8:00 PM" },
  { day: "Saturday", time: "9:00 AM – 9:00 PM" },
  { day: "Sunday", time: "10:00 AM – 6:00 PM" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-brand-dark border-t border-brand-border relative overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-gold/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Booking CTA Bar */}
      <div className="border-b border-brand-border">
        <div className="container-luxury py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="section-label mb-2">Ready for your transformation?</p>
            <h3
              style={{ fontFamily: "var(--font-serif)" }}
              className="text-2xl md:text-3xl font-semibold text-brand-cream"
            >
              Reserve Your Private Appointment
            </h3>
          </div>
          <Link
            href="/booking"
            className="btn-luxury bg-brand-gold text-brand-black px-8 py-4 rounded-sm hover:bg-brand-gold-light flex-shrink-0"
          >
            Book Now
          </Link>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container-luxury py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex flex-col leading-none mb-6">
              <span
                style={{ fontFamily: "var(--font-cinzel)" }}
                className="text-2xl font-bold text-brand-cream tracking-widest"
              >
                RUUAURA
              </span>
              <span
                style={{ fontFamily: "var(--font-cinzel)" }}
                className="text-[8px] tracking-[0.4em] text-brand-gold uppercase mt-0.5"
              >
                Beauty Sanctuary
              </span>
            </Link>
            <p className="text-brand-muted text-sm leading-relaxed mb-6">
              A sanctuary of haute coiffure and aesthetic radiance in the heart of Colombo 07. Where artistry meets luxury.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-brand-border flex items-center justify-center text-brand-muted hover:border-brand-gold hover:text-brand-gold transition-all duration-300 rounded-sm"
                aria-label="Instagram"
              >
                <Instagram size={15} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-brand-border flex items-center justify-center text-brand-muted hover:border-brand-gold hover:text-brand-gold transition-all duration-300 rounded-sm"
                aria-label="Facebook"
              >
                <Facebook size={15} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4
              style={{ fontFamily: "var(--font-cinzel)" }}
              className="text-xs tracking-widest uppercase text-brand-gold mb-6"
            >
              Navigation
            </h4>
            <ul className="flex flex-col gap-3">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-brand-muted hover:text-brand-cream transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4
              style={{ fontFamily: "var(--font-cinzel)" }}
              className="text-xs tracking-widest uppercase text-brand-gold mb-6"
            >
              Opening Hours
            </h4>
            <ul className="flex flex-col gap-4">
              {HOURS.map((h) => (
                <li key={h.day} className="flex flex-col gap-1">
                  <span className="text-xs text-brand-cream-muted font-medium">{h.day}</span>
                  <span className="text-sm text-brand-muted flex items-center gap-2">
                    <Clock size={12} className="text-brand-gold shrink-0" />
                    {h.time}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              style={{ fontFamily: "var(--font-cinzel)" }}
              className="text-xs tracking-widest uppercase text-brand-gold mb-6"
            >
              Contact
            </h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <MapPin size={14} className="text-brand-gold shrink-0 mt-0.5" />
                <span className="text-sm text-brand-muted">
                  42 Rosmead Place, Colombo 07, Sri Lanka
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={14} className="text-brand-gold shrink-0" />
                <a
                  href="tel:+94112345678"
                  className="text-sm text-brand-muted hover:text-brand-cream transition-colors"
                >
                  +94 11 234 5678
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={14} className="text-brand-gold shrink-0" />
                <a
                  href="mailto:hello@ruuaura.lk"
                  className="text-sm text-brand-muted hover:text-brand-cream transition-colors"
                >
                  hello@ruuaura.lk
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-brand-border">
        <div className="container-luxury py-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-brand-muted">
            © {year} RuuAURA Beauty Sanctuary. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-xs text-brand-muted hover:text-brand-cream transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-brand-muted hover:text-brand-cream transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
