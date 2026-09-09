import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Star } from "lucide-react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import BookingCTA from "@/app/components/BookingCTA";
import { ARTISANS } from "@/data/mockData";

export const metadata = {
  title: "Our Artisans — RuuAURA Beauty Sanctuary",
  description:
    "Meet the world-class artisans at RuuAURA — master stylists, colorists, aestheticians and bridal specialists trained in Paris, Milan, Tokyo and beyond.",
};

export default function StaffPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-40 pb-24 bg-brand-dark overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(197,163,101,0.07)_0%,transparent_55%)]" />
          <div className="absolute top-0 left-0 right-0 gold-line" />
          <div className="container-luxury relative z-10 text-center">
            <p className="section-label mb-5">The Masters Behind the Magic</p>
            <h1
              style={{ fontFamily: "var(--font-serif)" }}
              className="text-5xl md:text-6xl font-semibold text-brand-cream mb-6"
            >
              Our Artisans
            </h1>
            <p className="text-brand-muted max-w-xl mx-auto text-lg leading-relaxed">
              Internationally trained specialists who bring the world's finest techniques to Colombo's most exclusive beauty sanctuary.
            </p>
          </div>
        </section>

        {/* Artisans Grid */}
        <section className="section-pad bg-brand-black">
          <div className="container-luxury">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {ARTISANS.map((artisan) => (
                <ArtisanDetailCard key={artisan.id} artisan={artisan} />
              ))}
            </div>
          </div>
        </section>

        {/* Philosophy Banner */}
        <section className="section-pad bg-brand-dark border-y border-brand-border">
          <div className="container-luxury text-center">
            <p className="section-label mb-6">Our Craft</p>
            <blockquote
              style={{ fontFamily: "var(--font-serif)" }}
              className="text-3xl md:text-4xl font-medium text-brand-cream-muted italic max-w-3xl mx-auto leading-relaxed"
            >
              "True beauty artistry is not about transformation — it is about{" "}
              <em className="text-brand-gold not-italic">revelation</em>. We simply unveil what was always there."
            </blockquote>
            <p
              style={{ fontFamily: "var(--font-cinzel)" }}
              className="text-xs tracking-widest uppercase text-brand-muted mt-8"
            >
              — The RuuAURA Philosophy
            </p>
          </div>
        </section>

        <BookingCTA />
      </main>
      <Footer />
    </>
  );
}

function ArtisanDetailCard({ artisan }) {
  return (
    <div className="bg-brand-surface border border-brand-border/60 rounded-sm overflow-hidden hover:border-brand-gold/40 transition-all duration-500 group flex flex-col md:flex-row">
      {/* Image */}
      <div className="relative w-full md:w-56 aspect-[4/3] md:aspect-auto overflow-hidden flex-shrink-0 img-hover-color">
        <Image
          src={artisan.fallback}
          alt={artisan.name}
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 100vw, 220px"
        />
      </div>

      {/* Content */}
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3
                style={{ fontFamily: "var(--font-serif)" }}
                className="text-2xl font-semibold text-brand-cream mb-1 group-hover:text-brand-gold transition-colors"
              >
                {artisan.name}
              </h3>
              <p
                style={{ fontFamily: "var(--font-cinzel)" }}
                className="text-[10px] tracking-widest uppercase text-brand-gold"
              >
                {artisan.role}
              </p>
            </div>
            <div className="flex items-center gap-1 bg-brand-gold/10 border border-brand-gold/20 px-2.5 py-1 rounded-sm">
              <Star size={10} className="text-brand-gold fill-brand-gold" />
              <span
                style={{ fontFamily: "var(--font-cinzel)" }}
                className="text-xs text-brand-gold font-semibold"
              >
                {artisan.rating.replace(" ★", "")}
              </span>
            </div>
          </div>

          <div className="space-y-3 mb-5">
            <div className="flex flex-col gap-0.5">
              <span
                style={{ fontFamily: "var(--font-cinzel)" }}
                className="text-[9px] tracking-widest uppercase text-brand-muted"
              >
                Specialty
              </span>
              <span className="text-sm text-brand-cream-muted">{artisan.specialty}</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span
                style={{ fontFamily: "var(--font-cinzel)" }}
                className="text-[9px] tracking-widest uppercase text-brand-muted"
              >
                Experience
              </span>
              <span className="text-sm text-brand-cream-muted">{artisan.exp}</span>
            </div>
          </div>
        </div>

        <Link
          href={`/booking?artisan=${artisan.id}`}
          className="btn-luxury bg-brand-gold/10 border border-brand-gold/30 text-brand-gold py-3 px-5 rounded-sm hover:bg-brand-gold hover:text-brand-black transition-all duration-300 text-xs w-full justify-center"
        >
          Book with {artisan.name.split(" ")[0]}
          <ChevronRight size={12} />
        </Link>
      </div>
    </div>
  );
}
