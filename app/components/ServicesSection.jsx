import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Clock, Star } from "lucide-react";
import { SERVICES } from "@/data/mockData";

export default function ServicesSection() {
  const featured = SERVICES.slice(0, 3);

  return (
    <section className="section-pad bg-brand-black relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-brand-gold/4 rounded-full blur-[140px] pointer-events-none" />

      <div className="container-luxury relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
          <div>
            <p className="section-label mb-4">Signature Curations</p>
            <h2
              style={{ fontFamily: "var(--font-serif)" }}
              className="text-4xl md:text-5xl font-semibold text-brand-cream leading-tight"
            >
              Artisan Services <br />
              <em className="text-brand-gold not-italic">Curated for You</em>
            </h2>
          </div>
          <Link
            href="/services"
            className="btn-luxury border border-brand-border text-brand-cream-muted px-6 py-3 rounded-sm hover:border-brand-gold hover:text-brand-gold text-sm flex-shrink-0"
          >
            All Services
            <ChevronRight size={13} />
          </Link>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {/* Stats Bar */}
        <div className="mt-20 border border-brand-border/50 rounded-sm grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-brand-border/50">
          {[
            { label: "Artisan Services", value: "20+" },
            { label: "Expert Artisans", value: "12" },
            { label: "Happy Clients", value: "4,800+" },
            { label: "Years of Excellence", value: "8+" },
          ].map((stat) => (
            <div key={stat.label} className="py-8 px-6 text-center group hover:bg-brand-gold/5 transition-colors duration-300">
              <p
                style={{ fontFamily: "var(--font-cinzel)" }}
                className="text-3xl md:text-4xl font-bold text-gold-gradient mb-2"
              >
                {stat.value}
              </p>
              <p className="text-xs tracking-widest uppercase text-brand-muted">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service }) {
  return (
    <Link
      href={`/services#${service.id}`}
      className="group bg-brand-surface border border-brand-border/60 rounded-sm overflow-hidden hover:border-brand-gold/40 transition-all duration-500 block"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden img-hover-color">
        <Image
          src={service.fallback}
          alt={service.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        {/* Tag */}
        {service.tag && (
          <div className="absolute top-4 left-4 z-10">
            <span
              style={{ fontFamily: "var(--font-cinzel)" }}
              className="text-[9px] tracking-widest uppercase bg-brand-gold text-brand-black px-3 py-1.5 font-semibold"
            >
              {service.tag}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <p
          style={{ fontFamily: "var(--font-cinzel)" }}
          className="text-[9px] tracking-widest uppercase text-brand-gold mb-3"
        >
          {service.category === "hair"
            ? "Hair Architecture"
            : service.category === "spa"
            ? "Skin & Spa"
            : service.category === "bridal"
            ? "Bridal & Editorial"
            : "Nail Artistry"}
        </p>
        <h3
          style={{ fontFamily: "var(--font-serif)" }}
          className="text-xl font-semibold text-brand-cream mb-3 group-hover:text-brand-gold transition-colors duration-300"
        >
          {service.title}
        </h3>
        <p className="text-sm text-brand-muted leading-relaxed mb-5 line-clamp-2">
          {service.desc}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs text-brand-muted">
            <span className="flex items-center gap-1.5">
              <Clock size={12} className="text-brand-gold" />
              {service.duration}
            </span>
          </div>
          <span
            style={{ fontFamily: "var(--font-serif)" }}
            className="text-xl font-semibold text-brand-gold"
          >
            {service.price}
          </span>
        </div>
      </div>
    </Link>
  );
}
