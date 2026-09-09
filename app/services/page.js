"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, ChevronRight, Search } from "lucide-react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import BookingCTA from "@/app/components/BookingCTA";
import { SERVICES, SERVICE_CATEGORIES } from "@/data/mockData";

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = SERVICES.filter((s) => {
    const matchCat = activeCategory === "all" || s.category === activeCategory;
    const matchSearch =
      !search ||
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.desc.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-40 pb-24 bg-brand-dark overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(197,163,101,0.07)_0%,transparent_55%)]" />
          <div className="absolute top-0 left-0 right-0 gold-line" />
          <div className="container-luxury relative z-10 text-center">
            <p className="section-label mb-5">Curated Experiences</p>
            <h1
              style={{ fontFamily: "var(--font-serif)" }}
              className="text-5xl md:text-6xl font-semibold text-brand-cream mb-6"
            >
              Our Artisan Services
            </h1>
            <p className="text-brand-muted max-w-xl mx-auto text-lg leading-relaxed">
              Every service is a bespoke ritual — meticulously crafted by world-class artisans using premium organic formulations.
            </p>
          </div>
        </section>

        {/* Filter & Search */}
        <section className="bg-brand-black sticky top-[68px] z-30 border-b border-brand-border">
          <div className="container-luxury py-5 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2">
              {SERVICE_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  style={{ fontFamily: "var(--font-cinzel)" }}
                  className={`text-[10px] tracking-widest uppercase px-4 py-2 border rounded-sm transition-all duration-300 ${
                    activeCategory === cat.id
                      ? "bg-brand-gold text-brand-black border-brand-gold"
                      : "border-brand-border text-brand-muted hover:border-brand-gold/40 hover:text-brand-cream"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative flex-shrink-0">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-muted pointer-events-none" />
              <input
                type="search"
                placeholder="Search services..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-luxury pl-9 w-64 py-2.5 text-sm"
              />
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="section-pad bg-brand-black">
          <div className="container-luxury">
            {filtered.length === 0 ? (
              <div className="text-center py-24">
                <p className="text-brand-muted text-lg">No services found matching your search.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((service) => (
                  <ServiceDetailCard key={service.id} service={service} />
                ))}
              </div>
            )}
          </div>
        </section>

        <BookingCTA />
      </main>
      <Footer />
    </>
  );
}

function ServiceDetailCard({ service }) {
  const catLabel = {
    hair: "Hair Architecture",
    spa: "Skin & Spa",
    bridal: "Bridal & Editorial",
    nails: "Nail Artistry",
  }[service.category] || service.category;

  return (
    <div
      id={service.id}
      className="bg-brand-surface border border-brand-border/60 rounded-sm overflow-hidden hover:border-brand-gold/40 transition-all duration-500 group flex flex-col"
    >
      {/* Image */}
      <div className="relative aspect-[16/9] overflow-hidden img-hover-color">
        <Image
          src={service.fallback}
          alt={service.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />
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
        {/* Category */}
        <div className="absolute top-4 right-4 z-10">
          <span className="text-[9px] tracking-widest uppercase bg-brand-black/70 text-brand-cream-muted px-2 py-1 backdrop-blur-sm"
                style={{ fontFamily: "var(--font-cinzel)" }}>
            {catLabel}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col p-6">
        <h3
          style={{ fontFamily: "var(--font-serif)" }}
          className="text-xl font-semibold text-brand-cream mb-3 group-hover:text-brand-gold transition-colors duration-300"
        >
          {service.title}
        </h3>
        <p className="text-sm text-brand-muted leading-relaxed mb-4 flex-1">
          {service.desc}
        </p>

        {/* Products */}
        <p className="text-xs text-brand-muted/70 mb-5 italic">
          Products: {service.products}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-brand-border/60">
          <div className="flex items-center gap-1.5 text-xs text-brand-muted">
            <Clock size={12} className="text-brand-gold" />
            {service.duration}
          </div>
          <span
            style={{ fontFamily: "var(--font-serif)" }}
            className="text-xl font-semibold text-brand-gold"
          >
            {service.price}
          </span>
        </div>

        <Link
          href={`/booking?service=${service.id}`}
          className="btn-luxury w-full mt-4 bg-brand-gold/10 border border-brand-gold/30 text-brand-gold py-3 rounded-sm hover:bg-brand-gold hover:text-brand-black transition-all duration-300 text-xs"
        >
          Book This Service
          <ChevronRight size={12} />
        </Link>
      </div>
    </div>
  );
}
