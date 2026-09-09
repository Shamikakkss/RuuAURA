import Link from "next/link";
import { MapPin, Clock, Phone, ChevronRight } from "lucide-react";

export default function LocationTeaser() {
  return (
    <section className="section-pad bg-brand-surface relative overflow-hidden">
      <div className="container-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Map Placeholder */}
          <div className="relative">
            <div className="relative aspect-[4/3] bg-brand-card rounded-sm border border-brand-border overflow-hidden group">
              <iframe
                title="RuuAURA Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.7985!2d79.8613!3d6.9022!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNTQnMDguMCJOIDc5wrA1MScwNi44IkU!5e0!3m2!1sen!2slk!4v1234567890"
                className="w-full h-full opacity-70 group-hover:opacity-90 transition-opacity duration-500"
                style={{ border: 0, filter: "invert(0.9) hue-rotate(180deg) saturate(0.3)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              {/* Pin overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-10 h-10 bg-brand-gold rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  <MapPin size={18} className="text-brand-black" />
                </div>
              </div>
            </div>
          </div>

          {/* Info */}
          <div>
            <p className="section-label mb-5">Find Us</p>
            <h2
              style={{ fontFamily: "var(--font-serif)" }}
              className="text-4xl md:text-5xl font-semibold text-brand-cream mb-8"
            >
              Visit the Sanctuary
            </h2>

            <div className="flex flex-col gap-5 mb-10">
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 border border-brand-gold/30 flex items-center justify-center rounded-sm shrink-0 mt-0.5">
                  <MapPin size={15} className="text-brand-gold" />
                </div>
                <div>
                  <p
                    style={{ fontFamily: "var(--font-cinzel)" }}
                    className="text-xs tracking-widest uppercase text-brand-gold mb-1"
                  >
                    Address
                  </p>
                  <p className="text-brand-cream-muted">
                    42 Rosmead Place, Colombo 07, Sri Lanka
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-9 h-9 border border-brand-gold/30 flex items-center justify-center rounded-sm shrink-0 mt-0.5">
                  <Clock size={15} className="text-brand-gold" />
                </div>
                <div>
                  <p
                    style={{ fontFamily: "var(--font-cinzel)" }}
                    className="text-xs tracking-widest uppercase text-brand-gold mb-2"
                  >
                    Hours
                  </p>
                  <div className="flex flex-col gap-1 text-sm text-brand-muted">
                    <span>Mon – Fri: 10:00 AM – 8:00 PM</span>
                    <span>Saturday: 9:00 AM – 9:00 PM</span>
                    <span>Sunday: 10:00 AM – 6:00 PM</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-9 h-9 border border-brand-gold/30 flex items-center justify-center rounded-sm shrink-0 mt-0.5">
                  <Phone size={15} className="text-brand-gold" />
                </div>
                <div>
                  <p
                    style={{ fontFamily: "var(--font-cinzel)" }}
                    className="text-xs tracking-widest uppercase text-brand-gold mb-1"
                  >
                    Reservations
                  </p>
                  <a
                    href="tel:+94112345678"
                    className="text-brand-cream-muted hover:text-brand-gold transition-colors"
                  >
                    +94 11 234 5678
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-luxury bg-brand-gold text-brand-black px-6 py-3 rounded-sm hover:bg-brand-gold-light"
              >
                Get Directions
                <ChevronRight size={13} />
              </a>
              <Link
                href="/contact"
                className="btn-luxury border border-brand-border text-brand-cream-muted px-6 py-3 rounded-sm hover:border-brand-gold hover:text-brand-gold"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
