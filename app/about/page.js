import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import BookingCTA from "@/app/components/BookingCTA";

export const metadata = {
  title: "About RuuAURA — Our Story & Philosophy",
  description:
    "Discover the story of RuuAURA Beauty Sanctuary — Colombo's premier luxury beauty destination. Learn about our philosophy, artisans, and commitment to transformative beauty.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-40 pb-0 bg-brand-dark overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(197,163,101,0.07)_0%,transparent_55%)]" />
          <div className="absolute top-0 left-0 right-0 gold-line" />
          <div className="container-luxury relative z-10 text-center pb-20">
            <p className="section-label mb-5">Our Story</p>
            <h1
              style={{ fontFamily: "var(--font-serif)" }}
              className="text-5xl md:text-7xl font-semibold text-brand-cream mb-6 leading-tight"
            >
              The Sanctuary <br />
              <em className="text-brand-gold not-italic">Behind the Name</em>
            </h1>
            <p className="text-brand-muted max-w-2xl mx-auto text-lg leading-relaxed">
              RuuAURA was born from a conviction that beauty is not a surface phenomenon — it is an aura, a radiance that emanates from within. Our sanctuary exists to reveal that radiance.
            </p>
          </div>
          <div className="relative h-[400px] md:h-[560px] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1522337360801-4c6afed2adf5?q=80&w=2670&auto=format&fit=crop"
              alt="RuuAURA Sanctuary Interior"
              fill
              className="object-cover opacity-60"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-brand-dark/30" />
          </div>
        </section>

        {/* Philosophy */}
        <section className="section-pad bg-brand-black">
          <div className="container-luxury">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="section-label mb-5">Philosophy</p>
                <h2
                  style={{ fontFamily: "var(--font-serif)" }}
                  className="text-4xl font-semibold text-brand-cream mb-8"
                >
                  Beauty as a Sacred Ritual
                </h2>
                <div className="space-y-5 text-brand-muted leading-relaxed">
                  <p>
                    We believe that beauty care is one of the most intimate forms of self-care — a ritual that deserves reverence, artistry, and an environment that honours the experience.
                  </p>
                  <p>
                    RuuAURA was conceived as a counterpoint to the ordinary salon. Every element — from the handpicked Italian stone surfaces to the curated aromatherapy ambient scenting — is designed to create a state of elevated well-being.
                  </p>
                  <p>
                    Our artisans are not just technicians. They are artists who have studied their craft in the ateliers of Paris, the colour labs of Milan, the spa traditions of Tokyo and Singapore, and they bring that global perspective to every appointment.
                  </p>
                </div>
              </div>

              {/* Values */}
              <div className="flex flex-col gap-5">
                {[
                  {
                    num: "01",
                    title: "Bespoke Intention",
                    desc: "No two guests are alike. Every service begins with a deep consultation to understand your unique anatomy, lifestyle, and beauty aspiration.",
                  },
                  {
                    num: "02",
                    title: "Master Craftsmanship",
                    desc: "Our artisans maintain active relationships with the world's leading beauty ateliers, ensuring continuous evolution of their craft.",
                  },
                  {
                    num: "03",
                    title: "Ethical Luxury",
                    desc: "All formulations used are certified cruelty-free, sustainably sourced, and aligned with our commitment to conscious beauty.",
                  },
                  {
                    num: "04",
                    title: "The Sanctuary Experience",
                    desc: "Privacy, silence, and serenity. Your appointment is your sanctuary moment — protected from interruption and distraction.",
                  },
                ].map((v) => (
                  <div key={v.num} className="flex gap-6 group">
                    <span
                      style={{ fontFamily: "var(--font-cinzel)" }}
                      className="text-3xl font-bold text-brand-gold/20 group-hover:text-brand-gold/50 transition-colors duration-300 leading-none shrink-0 w-12"
                    >
                      {v.num}
                    </span>
                    <div>
                      <h4
                        style={{ fontFamily: "var(--font-cinzel)" }}
                        className="text-xs tracking-widest uppercase text-brand-cream mb-2 font-medium"
                      >
                        {v.title}
                      </h4>
                      <p className="text-sm text-brand-muted leading-relaxed">{v.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Quote */}
        <section className="py-20 bg-brand-dark border-y border-brand-border relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(197,163,101,0.06)_0%,transparent_60%)]" />
          <div className="container-luxury text-center relative z-10">
            <span className="text-5xl text-brand-gold/30 block mb-6">&quot;</span>
            <blockquote
              style={{ fontFamily: "var(--font-serif)" }}
              className="text-2xl md:text-3xl font-medium text-brand-cream max-w-3xl mx-auto leading-relaxed"
            >
              We do not create beauty. We{" "}
              <em className="text-brand-gold not-italic">reveal</em> it — the aura that was always yours.
            </blockquote>
            <p
              style={{ fontFamily: "var(--font-cinzel)" }}
              className="text-xs tracking-widest uppercase text-brand-muted mt-8"
            >
              — Founder, RuuAURA
            </p>
          </div>
        </section>

        {/* Timeline */}
        <section className="section-pad bg-brand-black">
          <div className="container-luxury">
            <div className="text-center mb-16">
              <p className="section-label mb-4">Our Journey</p>
              <h2
                style={{ fontFamily: "var(--font-serif)" }}
                className="text-4xl font-semibold text-brand-cream"
              >
                Milestones of Excellence
              </h2>
            </div>
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-brand-border" />
              {[
                { year: "2016", title: "The Vision", desc: "RuuAURA is founded with a single private studio and a radical commitment to bespoke luxury." },
                { year: "2018", title: "Expansion", desc: "Full sanctuary opens in Colombo 07 with six treatment rooms and a curated retail space." },
                { year: "2020", title: "International Artisans", desc: "Three internationally acclaimed artisans join the team from Paris, Dubai and Tokyo." },
                { year: "2022", title: "Bridal Division", desc: "Launch of the exclusive bridal and editorial department with Camille Laurent at its helm." },
                { year: "2024", title: "Certified Organic", desc: "RuuAURA achieves full organic certification and introduces the Botanical Sanctuary spa menu." },
              ].map((m, i) => (
                <div key={m.year} className={`relative flex gap-8 md:gap-0 mb-12 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 top-2 w-2 h-2 bg-brand-gold rounded-full -translate-x-1/2 ring-4 ring-brand-black" />
                  {/* Content */}
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                    <div className="glass-card rounded-sm p-5">
                      <span
                        style={{ fontFamily: "var(--font-cinzel)" }}
                        className="text-xs tracking-widest uppercase text-brand-gold block mb-2"
                      >
                        {m.year}
                      </span>
                      <h4
                        style={{ fontFamily: "var(--font-serif)" }}
                        className="text-lg font-semibold text-brand-cream mb-2"
                      >
                        {m.title}
                      </h4>
                      <p className="text-sm text-brand-muted leading-relaxed">{m.desc}</p>
                    </div>
                  </div>
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
