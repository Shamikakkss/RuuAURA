"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Priya Mendis",
    role: "Regular Client",
    text: "RuuAURA transformed my hair beyond imagination. Elena's technique is absolutely unmatched — the precision, the consultation, the final result. I've never felt more confident walking out of a salon.",
    rating: 5,
    service: "Signature Couture Haircut",
  },
  {
    id: 2,
    name: "Nadia Wijesinghe",
    role: "Bridal Client",
    text: "Camille created my dream wedding look with such artistry and care. Every detail was considered, and I felt like a true bride in the most editorial sense. Absolutely magical experience.",
    rating: 5,
    service: "Grand Haute Bridal Styling",
  },
  {
    id: 3,
    name: "Amara Jayaweera",
    role: "Spa Enthusiast",
    text: "The Caviar & Gold Facial with Sophia is unlike any treatment I've had globally. The sanctuary itself feels like stepping into another world — serene, luxurious, transformative.",
    rating: 5,
    service: "Caviar & Gold Radiance Facial",
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setCurrent((c) => (c + 1) % TESTIMONIALS.length);
  const t = TESTIMONIALS[current];

  return (
    <section className="section-pad bg-brand-black relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(197,163,101,0.05)_0%,transparent_65%)]" />

      <div className="container-luxury relative z-10">
        <div className="text-center mb-16">
          <p className="section-label mb-4">From Our Clients</p>
          <h2
            style={{ fontFamily: "var(--font-serif)" }}
            className="text-4xl md:text-5xl font-semibold text-brand-cream"
          >
            Stories of Transformation
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="text-center relative glass-card rounded-sm px-8 md:px-16 py-14">
            {/* Quote icon */}
            <div className="flex justify-center mb-8">
              <div className="w-12 h-12 border border-brand-gold/30 flex items-center justify-center rounded-sm">
                <Quote size={20} className="text-brand-gold" />
              </div>
            </div>

            {/* Stars */}
            <div className="flex justify-center gap-1 mb-8">
              {Array.from({ length: t.rating }).map((_, i) => (
                <span key={i} className="text-brand-gold text-lg">★</span>
              ))}
            </div>

            {/* Text */}
            <p
              style={{ fontFamily: "var(--font-serif)" }}
              className="text-lg md:text-xl text-brand-cream-muted leading-relaxed italic mb-8"
            >
              &quot;{t.text}&quot;
            </p>

            {/* Service tag */}
            <p
              style={{ fontFamily: "var(--font-cinzel)" }}
              className="text-[9px] tracking-widest uppercase text-brand-gold mb-4"
            >
              {t.service}
            </p>

            {/* Author */}
            <div className="gold-line w-12 mx-auto mb-4" />
            <p
              style={{ fontFamily: "var(--font-serif)" }}
              className="text-base font-semibold text-brand-cream"
            >
              {t.name}
            </p>
            <p className="text-xs text-brand-muted mt-1">{t.role}</p>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="w-10 h-10 border border-brand-border flex items-center justify-center text-brand-muted hover:border-brand-gold hover:text-brand-gold transition-all duration-300 rounded-sm"
            >
              <ChevronLeft size={16} />
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Testimonial ${i + 1}`}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i === current ? "w-6 bg-brand-gold" : "w-2 bg-brand-border"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              aria-label="Next testimonial"
              className="w-10 h-10 border border-brand-border flex items-center justify-center text-brand-muted hover:border-brand-gold hover:text-brand-gold transition-all duration-300 rounded-sm"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
