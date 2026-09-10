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
    <footer className="bg-brand-dark border-t border-brand-border relative overflow-hidden isolate" style={{ zIndex: 1 }}>
      {/* Ambient Glow — behind all content */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-gold/5 rounded-full blur-[100px] pointer-events-none z-0" />

      {/* Booking CTA Bar */}
        <div className="footer-cta-bar border-b border-brand-border">
          <div className="container-luxury footer-cta-inner flex flex-col md:flex-row items-center justify-between gap-6">
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
        <div className="container-luxury footer-main relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 xl:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex flex-col leading-none mb-6">
              <span
                style={{ fontFamily: "var(--font-cinzel)" }}
                className="text-2xl font-bold text-brand-cream tracking-widest"
              >
                RuuAURA
              </span>
              <span
                style={{ fontFamily: "var(--font-cinzel)" }}
                className="text-[8px] tracking-[0.4em] text-brand-gold uppercase mt-0.5"
              >
                Beauty Sanctuary
              </span>
            </Link>
            <p className="text-brand-muted text-sm leading-relaxed mb-6">
              A sanctuary of haute coiffure and aesthetic radiance in the heart of Dehiwala. Where artistry meets luxury.
            </p>
            <div className="flex items-center gap-3">
              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-brand-border flex items-center justify-center text-brand-muted hover:border-brand-gold hover:text-brand-gold hover:bg-brand-gold/10 transition-all duration-300 rounded-sm"
                aria-label="Instagram"
                title="Instagram"
              >
                <Instagram size={15} />
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-brand-border flex items-center justify-center text-brand-muted hover:border-brand-gold hover:text-brand-gold hover:bg-brand-gold/10 transition-all duration-300 rounded-sm"
                aria-label="Facebook"
                title="Facebook"
              >
                <Facebook size={15} />
              </a>

              {/* TikTok */}
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-brand-border flex items-center justify-center text-brand-muted hover:border-brand-gold hover:text-brand-gold hover:bg-brand-gold/10 transition-all duration-300 rounded-sm"
                aria-label="TikTok"
                title="TikTok"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .57.04.84.11V9.41a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.46V13a8.16 8.16 0 0 0 5.77 2.29V11.8a4.84 4.84 0 0 1-3.77-1.88V6.69h3.77z"/>
                </svg>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/94771234567"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-brand-border flex items-center justify-center text-brand-muted hover:border-brand-gold hover:text-brand-gold hover:bg-brand-gold/10 transition-all duration-300 rounded-sm"
                aria-label="WhatsApp"
                title="WhatsApp Concierge"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
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
                    className="text-sm text-brand-muted hover:text-brand-cream transition-colors duration-300 whitespace-nowrap"
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
                  142 Galle Road, Dehiwala, Sri Lanka
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
        <div className="footer-bottom border-t border-brand-border relative z-10">
          <div className="container-luxury footer-bottom-inner flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex flex-col gap-1 text-center md:text-left">
            <p className="text-xs text-brand-muted">
              © {year} RuuAURA. All rights reserved.
            </p>
            <p className="text-[11px] text-brand-muted/70">
              Designed &amp; Developed by{" "}
              <a
                href="https://shamikakkss.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-gold hover:underline hover:text-brand-cream transition-colors"
              >
                Sachintha
              </a>
            </p>
          </div>
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
