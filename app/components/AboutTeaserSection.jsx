import Link from "next/link";
import { MapPin, Phone, Clock, ChevronRight } from "lucide-react";

export default function AboutTeaserSection() {
  return (
    <section className="section-pad bg-brand-dark relative overflow-hidden">
      <div className="container-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Text */}
          <div>
            <p className="section-label mb-5">Our Philosophy</p>
            <h2
              style={{ fontFamily: "var(--font-serif)" }}
              className="text-4xl md:text-5xl font-semibold text-brand-cream leading-tight mb-8"
            >
              Where Artistry Meets
              <br />
              <em className="text-brand-gold not-italic">Sanctuary</em>
            </h2>
            <p className="text-brand-muted leading-relaxed mb-6">
              Born from a passion for transformative beauty, RuuAURA is not merely a salon — it is a private sanctuary where the world&apos;s finest techniques, botanicals, and artisanship converge in intimate Dehiwala.
            </p>
            <p className="text-brand-muted leading-relaxed mb-10">
              Each experience is a bespoke ritual, crafted by master artisans trained in the ateliers of Paris, Milan, Tokyo and beyond. We believe beauty is personal, profound, and deeply intentional.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/about"
                className="btn-luxury bg-brand-gold text-brand-black px-8 py-4 rounded-sm hover:bg-brand-gold-light"
              >
                Our Story
                <ChevronRight size={13} />
              </Link>
              <Link
                href="/booking"
                className="btn-luxury border border-brand-border text-brand-cream-muted px-8 py-4 rounded-sm hover:border-brand-gold hover:text-brand-gold"
              >
                Book a Session
              </Link>
            </div>
          </div>

          {/* Visual Pillars */}
          <div className="grid grid-cols-2 gap-4">
            {[
              {
                icon: "✦",
                title: "Bespoke Rituals",
                desc: "Every service is individually tailored to your unique beauty profile.",
              },
              {
                icon: "◈",
                title: "Master Artisans",
                desc: "Internationally trained specialists with a combined 50+ years of expertise.",
              },
              {
                icon: "◎",
                title: "Organic Luxury",
                desc: "Certified botanical formulations from Valmont, Balmain, and beyond.",
              },
              {
                icon: "⟡",
                title: "Private Sanctuary",
                desc: "An exclusive, curated environment designed for complete sensory transformation.",
              },
            ].map((pillar) => (
              <div
                key={pillar.title}
                className="glass-card rounded-sm p-6 group hover:border-brand-gold/30 transition-all duration-400"
              >
                <span className="text-2xl text-brand-gold block mb-4 group-hover:scale-110 transition-transform duration-300">
                  {pillar.icon}
                </span>
                <h4
                  style={{ fontFamily: "var(--font-cinzel)" }}
                  className="text-xs tracking-widest uppercase text-brand-cream mb-3 font-medium"
                >
                  {pillar.title}
                </h4>
                <p className="text-xs text-brand-muted leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
