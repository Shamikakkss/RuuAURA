import Link from "next/link";
import { MapPin, Clock, Phone, ChevronRight } from "lucide-react";

export default function LocationTeaser() {
  return (
    <section className="section-pad bg-brand-surface relative overflow-hidden">
      <div className="container-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Map Image & Preview */}
          <div className="relative">
            <div className="relative aspect-[4/3] bg-brand-card rounded-sm border border-brand-gold/20 overflow-hidden group shadow-2xl">
              <img
                src="/images/location/dehiwala-sanctuary-map.jpg"
                alt="RuuAURA Sanctuary Map - 142 Galle Road, Dehiwala"
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-transparent to-transparent pointer-events-none" />
              
              {/* Badge */}
              <div className="absolute top-4 left-4 bg-brand-black/90 px-4 py-2.5 border border-brand-gold/30 backdrop-blur-md">
                <p className="text-[11px] font-serif text-brand-gold font-medium tracking-wide">RuuAURA Sanctuary</p>
                <p className="text-[10px] font-sans text-brand-cream/80">142 Galle Road, Dehiwala</p>
              </div>

              {/* View interactive on Maps */}
              <div className="absolute bottom-4 right-4">
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-brand-gold/90 hover:bg-brand-gold text-brand-black px-4 py-2 text-[11px] uppercase tracking-widest font-semibold transition-colors shadow-lg"
                >
                  <MapPin size={13} />
                  Open Live Map
                </a>
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
                    142 Galle Road, Dehiwala, Sri Lanka
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
