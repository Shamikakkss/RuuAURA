"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// ==========================================
// MOCK DATA & IMAGES (From user's specification)
// ==========================================
const SLIDER_IMAGES = [
  "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=2574&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600334129128-685c5582fc35?q=80&w=2670&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=2669&auto=format&fit=crop",
];

const SERVICES = [
  {
    id: "srv-1",
    title: "Signature Haircut",
    price: "From $85",
    desc: "Tailored to your unique bone structure and lifestyle.",
    img: "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "srv-2",
    title: "Balayage & Color",
    price: "From $150",
    desc: "Multi-dimensional color for a natural, sun-kissed look.",
    img: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "srv-3",
    title: "Spa & Facial",
    price: "From $120",
    desc: "Rejuvenating treatments using organic, premium products.",
    img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "srv-4",
    title: "Bridal Styling",
    price: "Custom",
    desc: "Flawless hair and makeup for your most important day.",
    img: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000&auto=format&fit=crop",
  },
];

const TEAM_MEMBERS = [
  {
    name: "Elena Rostova",
    role: "Creative Director",
    img: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Julian Vance",
    role: "Master Colorist",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Sophia Chen",
    role: "Senior Stylist",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop",
  },
];

const AVAILABILITY = [
  { day: "Monday", hours: "Closed (Rest Day)" },
  { day: "Tuesday - Friday", hours: "9:00 AM - 8:00 PM" },
  { day: "Saturday", hours: "9:00 AM - 6:00 PM" },
  { day: "Sunday", hours: "10:00 AM - 4:00 PM" },
];

// ==========================================
// SVGs
// ==========================================
const MenuIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
  >
    <line x1="4" y1="8" x2="20" y2="8" />
    <line x1="4" y1="16" x2="20" y2="16" />
  </svg>
);

const CloseIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const CalendarIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

// ==========================================
// ANIMATION HELPERS
// ==========================================
const RevealText = ({ children, delay = 0, className = "" }) => (
  <div className="overflow-hidden">
    <motion.div
      initial={{ y: "100%", opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease: [0.6, 0.01, 0.05, 0.95], delay }}
      className={className}
    >
      {children}
    </motion.div>
  </div>
);

const FadeIn = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-10%" }}
    transition={{ duration: 0.8, ease: "easeOut", delay }}
    className={className}
  >
    {children}
  </motion.div>
);

// ==========================================
// CUSTOM CURSOR
// ==========================================
const CustomCursor = () => {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    const moveCursor = (e) => {
      if (cursorRef.current && dotRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX - 16}px, ${
          e.clientY - 16
        }px, 0)`;
        dotRef.current.style.transform = `translate3d(${e.clientX - 4}px, ${
          e.clientY - 4
        }px, 0)`;
      }
    };

    const handleHover = () => {
      if (cursorRef.current)
        cursorRef.current.classList.add(
          "scale-[2]",
          "bg-brand-gold",
          "bg-opacity-20",
          "border-transparent"
        );
    };
    const handleLeave = () => {
      if (cursorRef.current)
        cursorRef.current.classList.remove(
          "scale-[2]",
          "bg-brand-gold",
          "bg-opacity-20",
          "border-transparent"
        );
    };

    window.addEventListener("mousemove", moveCursor);

    const interactables = document.querySelectorAll("a, button, input, select, textarea");
    interactables.forEach((el) => {
      el.addEventListener("mouseenter", handleHover);
      el.addEventListener("mouseleave", handleLeave);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      interactables.forEach((el) => {
        el.removeEventListener("mouseenter", handleHover);
        el.removeEventListener("mouseleave", handleLeave);
      });
    };
  });

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-8 h-8 border border-brand-cream/30 rounded-full pointer-events-none z-[9999] transition-transform duration-300 ease-out hidden md:block"
        style={{ willChange: "transform" }}
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-brand-gold rounded-full pointer-events-none z-[9999] hidden md:block"
        style={{ willChange: "transform" }}
      />
    </>
  );
};

// ==========================================
// HERO SLIDER
// ==========================================
const HeroSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SLIDER_IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-brand-black">
      <AnimatePresence initial={false}>
        <motion.img
          key={currentIndex}
          src={SLIDER_IMAGES[currentIndex]}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.6, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 1.5, ease: "easeInOut" },
            scale: { duration: 6, ease: "linear" },
          }}
          className="absolute inset-0 w-full h-full object-cover"
          alt="Salon Interior"
        />
      </AnimatePresence>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent opacity-80" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end pb-20 md:pb-32 px-6 md:px-16 z-10">
        <div className="max-w-4xl">
          <RevealText>
            <h2 className="text-brand-gold font-sans tracking-[0.25em] text-xs md:text-sm uppercase mb-4">
              RuuAURA Beauty Sanctuary
            </h2>
          </RevealText>
          <RevealText delay={0.2}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif leading-tight text-brand-cream">
              Elegance,
              <br /> <span className="italic font-light">Redefined.</span>
            </h1>
          </RevealText>
          <RevealText delay={0.4}>
            <p className="mt-6 text-brand-cream/70 font-sans text-sm md:text-base max-w-md font-light leading-relaxed">
              Experience the pinnacle of luxury grooming and beauty treatments in
              a space designed for your absolute comfort.
            </p>
          </RevealText>
        </div>
      </div>

      {/* Slider Indicators */}
      <div className="absolute bottom-8 right-6 md:right-16 flex gap-3 z-10">
        {SLIDER_IMAGES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-0.5 transition-all duration-500 ${
              currentIndex === idx ? "w-12 bg-brand-gold" : "w-6 bg-brand-cream/30"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

// ==========================================
// NAVIGATION COMPONENT (RuuAURA + Sign In)
// ==========================================
const Navigation = ({ currentRoute, setRoute }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 3 Primary Nav Links: Home, About Us, Services
  const navLinks = [
    { name: "Home", id: "home" },
    { name: "About Us", id: "about" },
    { name: "Services", id: "services" },
  ];

  const drawerLinks = [
    { name: "Home", id: "home" },
    { name: "About Us", id: "about" },
    { name: "Services", id: "services" },
    { name: "The Team", id: "team" },
  ];

  const handleNavigate = (id) => {
    setRoute(id);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Top Bar */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-brand-black/95 py-4 backdrop-blur-sm"
            : "bg-transparent py-6 md:py-8"
        }`}
      >
        <div className="container mx-auto px-6 md:px-16 flex justify-between items-center">
          {/* Logo: RuuAURA */}
          <div
            className="cursor-pointer group select-none flex items-center"
            onClick={() => handleNavigate("home")}
          >
            <div className="text-2xl md:text-3xl font-serif tracking-wider text-brand-cream group-hover:text-brand-gold transition-colors font-bold">
              RuuAURA<span className="text-brand-gold">.</span>
            </div>
          </div>

          {/* 3 Main Navigation Links in Center */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavigate(link.id)}
                className={`text-xs font-sans tracking-[0.2em] uppercase transition-colors relative py-1 ${
                  currentRoute === link.id
                    ? "text-brand-gold font-semibold"
                    : "text-brand-cream/80 hover:text-brand-gold"
                }`}
              >
                {link.name}
                {currentRoute === link.id && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 w-full h-[1.5px] bg-brand-gold"
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Right Actions: Login Button + Book Now + Menu */}
          <div className="flex items-center gap-4 md:gap-6">
            <Link
              href="/login"
              className="text-xs font-sans tracking-[0.15em] uppercase text-brand-cream/90 hover:text-brand-gold transition-colors px-3 py-2 border border-white/20 hover:border-brand-gold/60"
            >
              Sign In
            </Link>

            <button
              onClick={() => handleNavigate("booking")}
              className="text-brand-black bg-brand-gold px-5 md:px-6 py-2 md:py-2.5 text-xs tracking-[0.2em] uppercase font-semibold hover:bg-white transition-colors duration-300"
            >
              Book Now
            </button>

            <button
              onClick={() => setIsOpen(true)}
              className="text-brand-cream hover:text-brand-gold transition-colors flex items-center gap-2.5 uppercase text-xs tracking-widest font-sans pl-1"
            >
              <span className="hidden md:block">Menu</span>
              <MenuIcon />
            </button>
          </div>
        </div>
      </header>

      {/* Full Screen Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.6, 0.01, -0.05, 0.95] }}
            className="fixed inset-0 bg-brand-dark z-[60] flex flex-col justify-between py-8 px-6 md:px-24 overflow-y-auto"
          >
            {/* Drawer Header */}
            <div className="w-full flex justify-between items-center">
              <div
                className="cursor-pointer flex items-center"
                onClick={() => handleNavigate("home")}
              >
                <div className="text-2xl md:text-3xl font-serif tracking-wider text-brand-cream font-bold">
                  RuuAURA<span className="text-brand-gold">.</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-brand-cream hover:text-brand-gold transition-colors flex items-center gap-3 uppercase text-xs tracking-widest"
              >
                <span className="hidden md:block">Close</span>
                <CloseIcon />
              </button>
            </div>

            {/* Navigation items */}
            <div className="my-auto py-8">
              <nav className="flex flex-col gap-4 md:gap-7">
                {drawerLinks.map((link, i) => (
                  <div key={link.id} className="overflow-hidden">
                    <motion.div
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "100%" }}
                      transition={{
                        duration: 0.5,
                        delay: 0.2 + i * 0.1,
                        ease: "easeOut",
                      }}
                    >
                      <button
                        onClick={() => handleNavigate(link.id)}
                        className={`text-4xl md:text-6xl font-serif transition-colors text-left group flex items-center gap-6 ${
                          currentRoute === link.id
                            ? "text-brand-gold italic"
                            : "text-brand-cream hover:text-brand-gold hover:italic"
                        }`}
                      >
                        <span className="text-xs font-sans text-brand-muted mb-4 md:mb-8 hidden md:block group-hover:text-brand-gold transition-colors">
                          0{i + 1}
                        </span>
                        {link.name}
                      </button>
                    </motion.div>
                  </div>
                ))}

                {/* Direct Portals Section */}
                <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t border-white/10">
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="text-xs font-sans tracking-widest uppercase text-brand-gold hover:text-white transition-colors py-2 px-4 border border-brand-gold/40"
                  >
                    Client Sign In
                  </Link>
                  <Link
                    href="/account"
                    onClick={() => setIsOpen(false)}
                    className="text-xs font-sans tracking-widest uppercase text-brand-cream/80 hover:text-brand-gold transition-colors py-2 px-4 border border-white/10"
                  >
                    Customer Account
                  </Link>
                  <Link
                    href="/admin"
                    onClick={() => setIsOpen(false)}
                    className="text-xs font-sans tracking-widest uppercase text-brand-cream/60 hover:text-brand-gold transition-colors py-2 px-4 border border-white/10"
                  >
                    Admin Portal
                  </Link>
                </div>

                {/* Mobile Book Now Link in Menu */}
                <div className="md:hidden overflow-hidden mt-4">
                  <button
                    onClick={() => handleNavigate("booking")}
                    className="text-brand-black bg-brand-gold px-8 py-4 text-xs tracking-[0.2em] uppercase font-semibold w-full"
                  >
                    Book an Appointment
                  </button>
                </div>
              </nav>
            </div>

            {/* Drawer Footer info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-xs text-brand-muted font-sans flex flex-col md:flex-row justify-between gap-4 pt-6 border-t border-white/10"
            >
              <div>
                <p className="text-brand-cream mb-1">Location</p>
                <p>142 Ward Place, Colombo 07</p>
              </div>
              <div>
                <p className="text-brand-cream mb-1">Contact</p>
                <p>info@ruuaura.lk • +94 77 123 4567</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// ==========================================
// HOME PAGE VIEW
// ==========================================
const HomePage = ({ setRoute }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <HeroSlider />

      {/* Brief Intro Section */}
      <section className="py-24 md:py-40 px-6 md:px-16 container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="w-full md:w-1/3">
            <RevealText>
              <h3 className="font-sans text-brand-gold uppercase tracking-widest text-xs mb-4">
                Our Philosophy
              </h3>
            </RevealText>
            <RevealText delay={0.2}>
              <h2 className="text-3xl md:text-5xl font-serif leading-tight">
                Artistry in <br />
                <span className="italic text-brand-gold">every detail.</span>
              </h2>
            </RevealText>
          </div>
          <div className="w-full md:w-1/2 md:mt-12">
            <FadeIn delay={0.4}>
              <p className="text-brand-cream/80 font-sans font-light leading-relaxed text-lg mb-8">
                We believe beauty is not just a service, but an experience. At
                RuuAURA, our master stylists and therapists craft personalized
                treatments in an environment of pure tranquility and luxury.
              </p>
              <button
                onClick={() => {
                  setRoute("about");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="inline-flex items-center gap-3 text-sm tracking-widest font-sans uppercase border-b border-brand-gold pb-1 hover:text-brand-gold transition-colors"
              >
                Discover Our Story <ArrowRightIcon />
              </button>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="px-6 md:px-16 pb-24 md:pb-40 container mx-auto">
        <FadeIn>
          <div className="w-full h-[60vh] md:h-[80vh] relative overflow-hidden group">
            <img
              src="https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=2670&auto=format&fit=crop"
              className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
              alt="Salon Experience"
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>
        </FadeIn>
      </section>
    </motion.div>
  );
};

// ==========================================
// ABOUT US PAGE VIEW
// ==========================================
const AboutPage = ({ setRoute }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="pt-32 pb-24 md:pt-48 md:pb-40 px-6 md:px-16 container mx-auto min-h-screen"
    >
      <RevealText>
        <h1 className="text-5xl md:text-8xl font-serif mb-8 md:mb-16">
          The <span className="italic text-brand-gold">Sanctuary.</span>
        </h1>
      </RevealText>

      <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-start">
        <div className="w-full md:w-1/2">
          <FadeIn delay={0.2}>
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=1000&auto=format&fit=crop"
                className="w-full h-full object-cover"
                alt="Stylist at work"
              />
            </div>
          </FadeIn>
        </div>
        <div className="w-full md:w-1/2 md:pt-16 flex flex-col gap-8">
          <FadeIn delay={0.4}>
            <h3 className="font-sans text-brand-gold uppercase tracking-widest text-xs mb-2">
              Heritage
            </h3>
            <p className="text-brand-cream/80 font-sans font-light leading-relaxed text-lg">
              Established in 2026, RuuAURA was born from a desire to redefine the
              modern salon experience. We moved away from the chaotic, fast-paced
              environment to create a sanctuary where time slows down.
            </p>
          </FadeIn>
          <FadeIn delay={0.5}>
            <h3 className="font-sans text-brand-gold uppercase tracking-widest text-xs mb-2 mt-2">
              Expertise
            </h3>
            <p className="text-brand-cream/80 font-sans font-light leading-relaxed text-lg mb-6">
              Our team consists of internationally trained artisans who view
              their work as a form of art. Utilizing only premium, ethically
              sourced products, we ensure every treatment is an indulgence.
            </p>

            <div className="flex flex-wrap gap-4 pt-4 border-t border-white/10">
              <button
                onClick={() => {
                  setRoute("services");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="bg-brand-gold text-brand-black px-6 py-3 text-xs tracking-[0.2em] uppercase font-semibold hover:bg-white transition-colors duration-300"
              >
                Explore Curations
              </button>
              <button
                onClick={() => {
                  setRoute("team");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="border border-white/20 px-6 py-3 text-xs tracking-[0.2em] uppercase font-semibold text-brand-cream hover:border-brand-gold hover:text-brand-gold transition-colors duration-300"
              >
                Meet The Artisans
              </button>
            </div>
          </FadeIn>
        </div>
      </div>
    </motion.div>
  );
};

// ==========================================
// SERVICES PAGE VIEW
// ==========================================
const ServicesPage = ({ onSelectService }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="pt-32 pb-24 md:pt-48 md:pb-40 px-6 md:px-16 container mx-auto min-h-screen"
    >
      <div className="max-w-3xl mb-16 md:mb-24">
        <RevealText>
          <h1 className="text-5xl md:text-8xl font-serif mb-6">
            Our <span className="italic text-brand-gold">Curations.</span>
          </h1>
        </RevealText>
        <FadeIn delay={0.3}>
          <p className="text-brand-cream/70 font-sans font-light text-lg">
            A bespoke collection of treatments designed to elevate your natural
            beauty. Click any service to reserve your session.
          </p>
        </FadeIn>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
        {SERVICES.map((service, idx) => (
          <FadeIn key={idx} delay={0.2 * idx}>
            <div
              className="group cursor-pointer"
              onClick={() => onSelectService(service)}
            >
              <div className="img-zoom-container w-full h-80 md:h-[400px] mb-6 overflow-hidden relative">
                <img
                  src={service.img}
                  alt={service.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute bottom-4 right-4 bg-brand-black/90 text-brand-gold px-4 py-2 text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm border border-brand-gold/30">
                  Select & Reserve →
                </div>
              </div>
              <div className="flex justify-between items-end border-b border-white/10 pb-4 group-hover:border-brand-gold transition-colors duration-500">
                <div>
                  <h3 className="text-2xl font-serif mb-2 group-hover:text-brand-gold transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm font-sans text-brand-cream/60 font-light">
                    {service.desc}
                  </p>
                </div>
                <div className="text-brand-gold font-sans tracking-wider text-sm whitespace-nowrap ml-4">
                  {service.price}
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </motion.div>
  );
};

// ==========================================
// TEAM PAGE VIEW
// ==========================================
const TeamPage = ({ onBook }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="pt-32 pb-24 md:pt-48 md:pb-40 px-6 md:px-16 container mx-auto min-h-screen"
    >
      <div className="max-w-3xl mb-16 md:mb-24">
        <RevealText>
          <h1 className="text-5xl md:text-8xl font-serif mb-6">
            Our <span className="italic text-brand-gold">Artisans.</span>
          </h1>
        </RevealText>
        <FadeIn delay={0.3}>
          <p className="text-brand-cream/70 font-sans font-light text-lg leading-relaxed">
            Meet the visionaries behind Aura. A collective of internationally
            acclaimed stylists and wellness experts dedicated to perfecting your
            aesthetic.
          </p>
        </FadeIn>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {TEAM_MEMBERS.map((member, idx) => (
          <FadeIn key={idx} delay={0.2 * idx}>
            <div
              className="group cursor-pointer"
              onClick={onBook}
            >
              <div className="w-full aspect-[3/4] overflow-hidden mb-6 bg-brand-dark relative">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <span className="text-xs uppercase tracking-widest text-brand-gold">
                    Book with {member.name.split(" ")[0]} →
                  </span>
                </div>
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-serif text-brand-cream mb-1">
                  {member.name}
                </h3>
                <p className="text-xs font-sans tracking-[0.15em] uppercase text-brand-gold">
                  {member.role}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </motion.div>
  );
};

// ==========================================
// BOOKING PAGE VIEW
// ==========================================
const BookingPage = ({ preSelectedService }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedService, setSelectedService] = useState(
    preSelectedService?.title || ""
  );
  const [isSubmitted, setIsSubmitted] = useState(false);

  const timeSlots = [
    "10:00 AM",
    "11:30 AM",
    "01:00 PM",
    "03:30 PM",
    "05:00 PM",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedTime) {
      alert("Please select an arrival time slot.");
      return;
    }
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setSelectedDate("");
      setSelectedTime("");
      e.target.reset();
    }, 3500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="pt-32 pb-24 md:pt-48 md:pb-40 px-6 md:px-16 container mx-auto min-h-screen flex flex-col lg:flex-row gap-16 lg:gap-24"
    >
      {/* Left Column: Info & Location */}
      <div className="w-full lg:w-5/12 flex flex-col">
        <RevealText>
          <h1 className="text-5xl md:text-7xl font-serif mb-6">
            Reserve <br />
            <span className="italic text-brand-gold">Your Time.</span>
          </h1>
        </RevealText>
        <FadeIn delay={0.3}>
          <p className="text-brand-cream/70 font-sans font-light text-base mb-12">
            Secure your private session with our experts. Walk-ins are subject to
            availability, so we highly recommend booking in advance.
          </p>
        </FadeIn>

        <FadeIn delay={0.4} className="flex flex-col gap-10 border-t border-white/10 pt-10">
          {/* Availability Section */}
          <div>
            <h4 className="text-brand-gold uppercase text-xs tracking-widest mb-6 flex items-center gap-2">
              <CalendarIcon /> Availability
            </h4>
            <div className="flex flex-col gap-3 text-sm font-sans font-light">
              {AVAILABILITY.map((schedule, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center text-brand-cream/90"
                >
                  <span>{schedule.day}</span>
                  <span
                    className={
                      schedule.hours.includes("Closed")
                        ? "text-brand-muted"
                        : "text-white"
                    }
                  >
                    {schedule.hours}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Location Section */}
          <div>
            <h4 className="text-brand-gold uppercase text-xs tracking-widest mb-6 mt-4">
              Location & Contact
            </h4>
            <p className="text-brand-cream/90 text-base font-light mb-4">
              142 Ward Place, Colombo 07
              <br />
              Western Province, Sri Lanka
            </p>
            <p className="text-brand-cream/90 text-base font-light mb-6">
              +94 77 123 4567
              <br />
              info@aurabeauty.lk
            </p>
            {/* Simulated Map Box */}
            <div className="w-full h-48 bg-brand-dark overflow-hidden relative group">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000&auto=format&fit=crop"
                alt="Map View"
                className="w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity duration-500"
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="bg-brand-black/80 px-4 py-2 text-xs uppercase tracking-widest text-brand-gold font-sans backdrop-blur-sm border border-brand-gold/30">
                  View on Maps
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Right Column: Booking Form */}
      <div className="w-full lg:w-7/12 lg:pt-4">
        <FadeIn delay={0.5}>
          <div className="bg-brand-dark p-8 md:p-12 border border-white/5 relative overflow-hidden">
            {/* Success Message Overlay */}
            <AnimatePresence>
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-brand-dark z-20 flex flex-col items-center justify-center text-center p-8"
                >
                  <div className="w-16 h-16 rounded-full border border-brand-gold flex items-center justify-center text-brand-gold mb-6 text-2xl">
                    ✓
                  </div>
                  <h3 className="text-2xl font-serif text-brand-cream mb-2">
                    Booking Confirmed
                  </h3>
                  <p className="text-brand-cream/70 font-sans font-light">
                    We have received your request and will contact you shortly.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <h3 className="text-2xl font-serif text-brand-cream mb-8">
              Appointment Details
            </h3>
            <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-brand-muted mb-2">
                    Full Name
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Jane Doe"
                    className="w-full bg-transparent border-b border-white/20 py-2 text-brand-cream placeholder-brand-muted/30 focus:outline-none focus:border-brand-gold transition-colors font-sans text-base"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-brand-muted mb-2">
                    Phone Number
                  </label>
                  <input
                    required
                    type="tel"
                    placeholder="+94 7X XXX XXXX"
                    className="w-full bg-transparent border-b border-white/20 py-2 text-brand-cream placeholder-brand-muted/30 focus:outline-none focus:border-brand-gold transition-colors font-sans text-base"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-brand-muted mb-2">
                  Select Service
                </label>
                <select
                  required
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full bg-brand-dark border-b border-white/20 py-2 text-brand-cream focus:outline-none focus:border-brand-gold transition-colors font-sans text-base appearance-none rounded-none cursor-pointer"
                >
                  <option value="" disabled>
                    Choose a curation...
                  </option>
                  <option value="Signature Haircut">Signature Haircut ($85)</option>
                  <option value="Balayage & Color">Balayage & Color ($150)</option>
                  <option value="Spa & Facial">Spa & Facial ($120)</option>
                  <option value="Bridal Styling">Bridal Styling (Custom)</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-brand-muted mb-4">
                  Preferred Date & Time
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Custom date picker */}
                  <div className="relative">
                    <input
                      type="date"
                      required
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full bg-transparent border-b border-white/20 py-2 text-brand-cream focus:outline-none focus:border-brand-gold transition-colors font-sans text-base cursor-pointer [color-scheme:dark]"
                    />
                  </div>

                  {/* Time slots as selectable buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    {timeSlots.map((time) => (
                      <button
                        type="button"
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`py-2 text-xs font-sans tracking-wider border transition-colors ${
                          selectedTime === time
                            ? "bg-brand-gold border-brand-gold text-brand-black font-semibold"
                            : "border-white/20 text-brand-cream/70 hover:border-brand-gold/50"
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-brand-muted mb-2">
                  Special Requests (Optional)
                </label>
                <textarea
                  rows="2"
                  placeholder="Any specific details we should know?"
                  className="w-full bg-transparent border-b border-white/20 py-2 text-brand-cream placeholder-brand-muted/30 focus:outline-none focus:border-brand-gold transition-colors font-sans text-base resize-none"
                />
              </div>

              <button
                type="submit"
                className="mt-4 bg-brand-gold text-brand-black px-8 py-4 text-xs tracking-[0.2em] uppercase font-semibold hover:bg-white transition-colors duration-300 w-full md:w-auto self-start cursor-pointer"
              >
                Confirm Booking
              </button>
            </form>
          </div>
        </FadeIn>
      </div>
    </motion.div>
  );
};

// ==========================================
// FOOTER
// ==========================================
const Footer = ({ setRoute }) => {
  return (
    <footer className="bg-brand-dark pt-24 pb-12 px-6 md:px-16 container mx-auto">
      <div className="flex flex-col items-center justify-center border-b border-white/10 pb-16 mb-10 text-center">
        <RevealText>
          <div
            onClick={() => {
              setRoute("home");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="cursor-pointer group select-none flex flex-col items-center"
          >
            <h2 className="text-7xl md:text-[10rem] font-serif leading-none tracking-tight text-center text-brand-cream group-hover:text-brand-gold transition-colors duration-500 font-bold">
              RuuAURA<span className="text-brand-gold">.</span>
            </h2>
            <span className="text-xs md:text-sm font-sans tracking-[0.4em] uppercase text-brand-gold font-light mt-2">
              Beauty Sanctuary
            </span>
          </div>
        </RevealText>

        {/* Footer Navigation Links */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-10 mt-12">
          <button
            onClick={() => {
              setRoute("home");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="text-xs font-sans tracking-widest uppercase text-brand-cream/70 hover:text-brand-gold transition-colors"
          >
            Home
          </button>
          <button
            onClick={() => {
              setRoute("about");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="text-xs font-sans tracking-widest uppercase text-brand-cream/70 hover:text-brand-gold transition-colors"
          >
            About Us
          </button>
          <button
            onClick={() => {
              setRoute("services");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="text-xs font-sans tracking-widest uppercase text-brand-cream/70 hover:text-brand-gold transition-colors"
          >
            Services
          </button>
          <button
            onClick={() => {
              setRoute("team");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="text-xs font-sans tracking-widest uppercase text-brand-cream/70 hover:text-brand-gold transition-colors"
          >
            The Team
          </button>
          <Link
            href="/login"
            className="text-xs font-sans tracking-widest uppercase text-brand-cream/70 hover:text-brand-gold transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/account"
            className="text-xs font-sans tracking-widest uppercase text-brand-cream/70 hover:text-brand-gold transition-colors"
          >
            Account
          </Link>
          <button
            onClick={() => {
              setRoute("booking");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="text-xs font-sans tracking-widest uppercase text-brand-gold hover:text-white transition-colors font-semibold"
          >
            Reserve Session
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center text-xs font-sans tracking-widest text-brand-muted uppercase gap-4">
        <p>© 2026 RuuAURA. All rights reserved.</p>
        <div className="flex items-center gap-8">
          <span className="text-brand-cream/60">142 Ward Place, Colombo 07</span>
          <div className="flex gap-6">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-brand-gold transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-brand-gold transition-colors"
            >
              Facebook
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// ==========================================
// MASTER ALL-IN-ONE COMPONENT
// ==========================================
export default function AllInOneSanctuary() {
  const [currentRoute, setCurrentRoute] = useState("home");
  const [selectedService, setSelectedService] = useState(null);

  const handleSelectServiceAndBook = (service) => {
    setSelectedService(service);
    setCurrentRoute("booking");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPage = () => {
    switch (currentRoute) {
      case "home":
        return <HomePage key="home" setRoute={setCurrentRoute} />;
      case "about":
        return <AboutPage key="about" setRoute={setCurrentRoute} />;
      case "services":
        return (
          <ServicesPage
            key="services"
            onSelectService={handleSelectServiceAndBook}
          />
        );
      case "team":
        return <TeamPage key="team" onBook={() => setCurrentRoute("booking")} />;
      case "booking":
        return (
          <BookingPage
            key="booking"
            preSelectedService={selectedService}
          />
        );
      default:
        return <HomePage key="home" setRoute={setCurrentRoute} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-black text-brand-cream selection:bg-brand-gold selection:text-brand-black">
      <CustomCursor />
      <Navigation currentRoute={currentRoute} setRoute={setCurrentRoute} />

      <main className="w-full min-h-screen">
        <AnimatePresence mode="wait">{renderPage()}</AnimatePresence>
      </main>

      <Footer setRoute={setCurrentRoute} />
    </div>
  );
}
