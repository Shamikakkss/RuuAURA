import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function BookingCTA() {
  return (
    <section className="relative py-32 overflow-hidden bg-brand-black">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(197,163,101,0.10)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560066984-138dadb4c035?q=40&w=800&auto=format&fit=crop')] bg-cover bg-center opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-brand-black/60 via-transparent to-brand-black/60" />

      {/* Decorative lines */}
      <div className="absolute top-0 left-0 right-0 gold-line" />
      <div className="absolute bottom-0 left-0 right-0 gold-line" />

      <div className="relative z-10 container-luxury text-center">
        <p className="section-label mb-6">Begin Your Journey</p>
        <h2
          style={{ fontFamily: "var(--font-cinzel)" }}
          className="text-5xl md:text-6xl lg:text-7xl font-bold text-brand-cream tracking-wider mb-6 leading-tight"
        >
          Reserve Your <br />
          <span className="text-gold-gradient">Private Session</span>
        </h2>
        <p
          style={{ fontFamily: "var(--font-serif)" }}
          className="text-lg md:text-xl text-brand-muted max-w-xl mx-auto mb-12 leading-relaxed"
        >
          Step into the sanctuary. Your bespoke beauty ritual awaits. Appointments available Monday through Sunday.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/booking"
            className="btn-luxury bg-brand-gold text-brand-black px-10 py-5 rounded-sm hover:bg-brand-gold-light text-sm"
          >
            Book Your Appointment
            <ChevronRight size={14} />
          </Link>
          <Link
            href="/services"
            className="btn-luxury border border-brand-cream/20 text-brand-cream px-10 py-5 rounded-sm hover:border-brand-gold hover:text-brand-gold text-sm"
          >
            Explore Services
          </Link>
        </div>
      </div>
    </section>
  );
}
