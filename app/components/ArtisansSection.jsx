import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Star } from "lucide-react";
import { ARTISANS } from "@/data/mockData";

export default function ArtisansSection() {
  const featured = ARTISANS.slice(0, 4);

  return (
    <section className="section-pad bg-brand-dark relative overflow-hidden">
      <div className="container-luxury relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="section-label mb-4">The Masters Behind the Magic</p>
          <h2
            style={{ fontFamily: "var(--font-serif)" }}
            className="text-4xl md:text-5xl font-semibold text-brand-cream mb-4"
          >
            Meet Our Artisans
          </h2>
          <div className="gold-line w-24 mx-auto mt-6" />
        </div>

        {/* Artisan Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {featured.map((artisan, i) => (
            <ArtisanCard key={artisan.id} artisan={artisan} index={i} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            href="/staff"
            className="btn-luxury border border-brand-border text-brand-cream-muted px-8 py-4 rounded-sm hover:border-brand-gold hover:text-brand-gold text-sm"
          >
            Meet All Artisans
            <ChevronRight size={13} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function ArtisanCard({ artisan, index }) {
  return (
    <Link
      href="/staff"
      className="group relative overflow-hidden rounded-sm img-hover-color block"
    >
      {/* Image */}
      <div className="relative aspect-[3/4]">
        <Image
          src={artisan.fallback}
          alt={artisan.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      </div>

      {/* Info */}
      <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-400">
        <div className="flex items-center justify-between mb-1">
          <p className="text-[9px] tracking-widest uppercase text-brand-gold font-medium"
             style={{ fontFamily: "var(--font-cinzel)" }}>
            {artisan.rating}
          </p>
          <Star size={10} className="text-brand-gold fill-brand-gold" />
        </div>
        <h3
          style={{ fontFamily: "var(--font-serif)" }}
          className="text-base font-semibold text-brand-cream mb-1"
        >
          {artisan.name}
        </h3>
        <p className="text-xs text-brand-muted">{artisan.role}</p>
        <p
          className="text-xs text-brand-gold/70 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 leading-relaxed"
        >
          {artisan.specialty}
        </p>
      </div>
    </Link>
  );
}
