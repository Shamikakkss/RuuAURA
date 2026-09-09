"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { HERO_SLIDES } from "@/data/mockData";

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback(
    (index) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrent(index);
      setTimeout(() => setIsTransitioning(false), 700);
    },
    [isTransitioning]
  );

  const next = useCallback(() => {
    goTo((current + 1) % HERO_SLIDES.length);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = HERO_SLIDES[current];

  return (
    <section className="relative h-screen min-h-[640px] max-h-[1080px] overflow-hidden">
      {/* Background Slides */}
      {HERO_SLIDES.map((s, i) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-[1200ms] ease-in-out ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={s.fallback}
            alt={s.subtitle}
            fill
            className="object-cover"
            priority={i === 0}
            sizes="100vw"
          />
          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container-luxury w-full">
          <div className="max-w-2xl">
            {/* Tagline */}
            <p
              key={`tag-${current}`}
              className="section-label mb-6 animate-fade-in-up"
            >
              {slide.tagline}
            </p>

            {/* Gold line */}
            <div className="w-16 h-px bg-brand-gold mb-8 animate-fade-in-up" style={{ animationDelay: "100ms" }} />

            {/* Title */}
            <h1
              key={`title-${current}`}
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-wider text-brand-cream mb-6 animate-fade-in-up leading-none"
              style={{ animationDelay: "150ms", fontFamily: "var(--font-cinzel)" }}
            >
              RUU
              <span className="text-gold-gradient">AURA</span>
            </h1>

            {/* Subtitle */}
            <p
              key={`sub-${current}`}
              className="text-lg md:text-xl text-brand-cream-muted leading-relaxed mb-10 animate-fade-in-up max-w-xl"
              style={{ animationDelay: "200ms", fontFamily: "var(--font-serif)" }}
            >
              {slide.subtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: "280ms" }}>
              <Link
                href="/booking"
                className="btn-luxury bg-brand-gold text-brand-black px-8 py-4 rounded-sm hover:bg-brand-gold-light text-sm"
              >
                Reserve Your Session
                <ChevronRight size={14} />
              </Link>
              <Link
                href="/services"
                className="btn-luxury border border-brand-cream/30 text-brand-cream px-8 py-4 rounded-sm hover:border-brand-gold hover:text-brand-gold text-sm"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Controls */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
            className={`transition-all duration-400 rounded-full ${
              i === current
                ? "w-8 h-1.5 bg-brand-gold"
                : "w-1.5 h-1.5 bg-brand-muted hover:bg-brand-cream"
            }`}
          />
        ))}
      </div>

      {/* Prev/Next Arrows (Desktop) */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="hidden lg:flex absolute left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 border border-brand-border/60 items-center justify-center text-brand-muted hover:border-brand-gold hover:text-brand-gold transition-all duration-300 rounded-sm"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 border border-brand-border/60 items-center justify-center text-brand-muted hover:border-brand-gold hover:text-brand-gold transition-all duration-300 rounded-sm"
      >
        <ChevronRight size={18} />
      </button>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 right-8 z-20 hidden lg:flex flex-col items-center gap-2">
        <span
          style={{ fontFamily: "var(--font-cinzel)" }}
          className="text-[9px] tracking-[0.25em] text-brand-muted uppercase rotate-90 origin-center"
        >
          Scroll
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-brand-gold/60 to-transparent" />
      </div>
    </section>
  );
}
