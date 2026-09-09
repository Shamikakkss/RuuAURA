import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import BookingCTA from "@/app/components/BookingCTA";
import LocationTeaser from "@/app/components/LocationTeaser";
import { MapPin, Clock, Phone, Mail, Car } from "lucide-react";

export const metadata = {
  title: "Location & Hours — RuuAURA Beauty Sanctuary",
  description:
    "Visit RuuAURA at 142 Galle Road, Dehiwala, Sri Lanka. Find our hours, directions, and contact details.",
};

export default function LocationPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-40 pb-20 bg-brand-dark overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(197,163,101,0.07)_0%,transparent_55%)]" />
          <div className="absolute top-0 left-0 right-0 gold-line" />
          <div className="container-luxury relative z-10 text-center">
            <p className="section-label mb-5">Find Us</p>
            <h1
              style={{ fontFamily: "var(--font-serif)" }}
              className="text-5xl md:text-6xl font-semibold text-brand-cream mb-6"
            >
              Visit the Sanctuary
            </h1>
            <p className="text-brand-muted max-w-lg mx-auto text-lg leading-relaxed">
              Nestled in the heart of Dehiwala, the RuuAURA sanctuary awaits. We&apos;re accessible by private vehicle, rideshare, and public transport.
            </p>
          </div>
        </section>

        <LocationTeaser />

        {/* Getting Here */}
        <section className="section-pad bg-brand-dark border-t border-brand-border">
          <div className="container-luxury">
            <div className="text-center mb-14">
              <p className="section-label mb-4">Getting Here</p>
              <h2
                style={{ fontFamily: "var(--font-serif)" }}
                className="text-3xl md:text-4xl font-semibold text-brand-cream"
              >
                Directions & Parking
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: Car,
                  title: "By Car",
                  steps: [
                    "Located along Galle Road in Dehiwala",
                    "We are located at No. 142, Galle Road",
                    "Complimentary valet parking available",
                  ],
                },
                {
                  icon: MapPin,
                  title: "Landmarks",
                  steps: [
                    "Near Dehiwala Junction",
                    "Direct access from Marine Drive & Galle Road",
                    "Private entrance with designated concierge valet",
                  ],
                },
                {
                  icon: Phone,
                  title: "Need Help?",
                  steps: [
                    "Call us on +94 11 234 5678",
                    "WhatsApp: +94 77 987 6543",
                    "We're happy to guide you in",
                  ],
                },
              ].map(({ icon: Icon, title, steps }) => (
                <div key={title} className="glass-card rounded-sm p-7">
                  <div className="w-10 h-10 border border-brand-gold/30 flex items-center justify-center rounded-sm mb-5">
                    <Icon size={15} className="text-brand-gold" />
                  </div>
                  <h3
                    style={{ fontFamily: "var(--font-cinzel)" }}
                    className="text-xs tracking-widest uppercase text-brand-cream mb-4 font-semibold"
                  >
                    {title}
                  </h3>
                  <ul className="flex flex-col gap-3">
                    {steps.map((s, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-brand-muted">
                        <span className="text-brand-gold mt-0.5 shrink-0">→</span>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <BookingCTA />
      </main>
      <Footer />
    </>
  );
}
