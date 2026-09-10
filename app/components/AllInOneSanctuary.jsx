"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/lib/authStore";
import AccountModal from "@/app/components/AccountModal";

// ==========================================
// MOCK DATA & IMAGES (From user's specification)
// ==========================================
const SLIDER_IMAGES = [
  "/images/background/mostafa_meraji-salon-6964527_1920.jpg",
  "/images/background/sunriseforever-beauty-salon-4043096_1920.jpg",
  "/images/background/female-hairstylist-drying-curly-girl-s-hair-using-big-plastic-brush.jpg",
];

const SERVICES = [
  {
    id: "srv-1",
    title: "Signature Haircut",
    price: "From $85",
    desc: "Tailored to your unique bone structure and lifestyle.",
    img: "/images/gallery/client-doing-hair-cut-barber-shop-salon.jpg",
  },
  {
    id: "srv-2",
    title: "Balayage & Color",
    price: "From $150",
    desc: "Multi-dimensional color for a natural, sun-kissed look.",
    img: "/images/gallery/female-hairstylist-drying-curly-girl-s-hair-using-big-plastic-brush.jpg",
  },
  {
    id: "srv-3",
    title: "Spa & Facial",
    price: "From $120",
    desc: "Rejuvenating treatments using organic, premium products.",
    img: "/images/gallery/cosmetologist-applying-mask-face-client-beauty-salon.jpg",
  },
  {
    id: "srv-4",
    title: "Bridal Styling",
    price: "Custom",
    desc: "Flawless hair and makeup for your most important day.",
    img: "/images/gallery/mostafa_meraji-barber-shop-7021798_1920.jpg",
  },
];

const TEAM_MEMBERS = [
  {
    name: "Elena Rostova",
    role: "Creative Director & Hair Architect",
    specialty: "Parisian Runway Architecture",
    img: "/images/staff/io-images-person-1824147.svg",
  },
  {
    name: "Julian Vance",
    role: "Master Colorist & Balayage Artisan",
    specialty: "Milan Dimensional Balayage",
    img: "/images/staff/io-images-person-1824147.svg",
  },
  {
    name: "Sophia Chen",
    role: "Senior Holistic Aesthetician",
    specialty: "Tokyo Lymphatic Facial Sculpting",
    img: "/images/staff/io-images-person-1824147.svg",
  },
  {
    name: "Camille Laurent",
    role: "Lead Bridal & Couture Stylist",
    specialty: "Haute Couture Bridal Design",
    img: "/images/staff/io-images-person-1824147.svg",
  },
];

const GALLERY_ITEMS = [
  {
    title: "Sanctuary Grand Atelier",
    category: "Ambiance",
    desc: "Private consultation suites crafted in natural Italian stone and ambient aroma.",
    img: "/images/gallery/mostafa_meraji-salon-6964527_1920.jpg",
  },
  {
    title: "Editorial Haircut & Architecture",
    category: "Hair Artistry",
    desc: "Bespoke dry and wet precision sectioning tailored to individual face shape.",
    img: "/images/gallery/client-doing-hair-cut-barber-shop-salon.jpg",
  },
  {
    title: "Couture Styling & Blowdry",
    category: "Styling",
    desc: "Volumizing velvet finish with cold-pressed organic botanical oils.",
    img: "/images/gallery/female-hairstylist-drying-curly-girl-s-hair-using-big-plastic-brush.jpg",
  },
  {
    title: "Cellular Rejuvenation Ritual",
    category: "Spa & Facial",
    desc: "Deep peptide infusion and lymphatic microcurrent sculpting.",
    img: "/images/gallery/cosmetologist-applying-mask-face-client-beauty-salon.jpg",
  },
  {
    title: "Aura Private VIP Suite",
    category: "Ambiance",
    desc: "Intimate private quarters with dedicated barista and concierge service.",
    img: "/images/gallery/sunriseforever-beauty-salon-4043096_1920.jpg",
  },
  {
    title: "Barber & Grooming Suite",
    category: "Grooming",
    desc: "Executive men's grooming and tailored beard sculpting.",
    img: "/images/gallery/mostafa_meraji-barber-shop-7021798_1920.jpg",
  },
];

const AVAILABILITY = [
  { day: "Monday", hours: "Closed (Rest Day)" },
  { day: "Tuesday - Friday", hours: "9:00 AM - 8:00 PM" },
  { day: "Saturday", hours: "9:00 AM - 6:00 PM" },
  { day: "Sunday", hours: "10:00 AM - 4:00 PM" },
];

const PRICING_CATEGORIES = [
  {
    category: "Haute Coiffure & Styling",
    items: [
      {
        name: "Signature Haircut & Consultation",
        price: "$85",
        duration: "60 mins",
        desc: "Precision bespoke cut tailored to bone structure, texture and personal aesthetic.",
      },
      {
        name: "Editorial Blowdry & Finishing",
        price: "$65",
        duration: "45 mins",
        desc: "Volumizing or glass-finish blowout using botanical thermal protectants.",
      },
      {
        name: "K-Gloss & Molecular Repair Ritual",
        price: "$140",
        duration: "90 mins",
        desc: "Intense cellular keratin and peptide infusion for supreme luster and strength.",
      },
    ],
  },
  {
    category: "Artisan Color & Balayage",
    items: [
      {
        name: "Bespoke Balayage & French Gloss",
        price: "$150",
        duration: "180 mins",
        desc: "Hand-painted multi-dimensional illumination with customized tone gloss.",
      },
      {
        name: "Full Scalp Lightening & Tone",
        price: "$175",
        duration: "150 mins",
        desc: "Pure platinum or champagne blonde transformation with bond protector.",
      },
      {
        name: "Root Shadow & Chromatic Melt",
        price: "$95",
        duration: "75 mins",
        desc: "Seamless regrowth blending and chromatic balance.",
      },
    ],
  },
  {
    category: "Cellular Skin & Spa Rituals",
    items: [
      {
        name: "Caviar & 24K Gold Rejuvenation Facial",
        price: "$160",
        duration: "75 mins",
        desc: "Deep cellular renewal using freeze-dried marine peptides and microcurrent.",
      },
      {
        name: "Botanical Lymphatic Glow Treatment",
        price: "$120",
        duration: "60 mins",
        desc: "Organic cold-pressed oils and jade sculpting for contour and radiance.",
      },
      {
        name: "Aromatic Sanctuary Body Polish & Massage",
        price: "$145",
        duration: "90 mins",
        desc: "Volcanic mineral scrub followed by warm basalt stone therapy.",
      },
    ],
  },
  {
    category: "Bridal & Haute Couture",
    items: [
      {
        name: "The Grand Bridal Heritage Package",
        price: "Custom",
        duration: "Half / Full Day",
        desc: "Complete bridal hair architecture, couture makeup, skin prep & dressing ritual.",
      },
      {
        name: "Pre-Wedding Radiant Glow Intensive",
        price: "$280",
        duration: "3.5 hrs",
        desc: "Multi-stage facial, hair glossing, and relaxing wellness therapy.",
      },
    ],
  },
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
// NAVIGATION COMPONENT (RuuAURA + Dynamic Member Auth)
// ==========================================
const Navigation = ({ currentRoute, setRoute, onOpenAccount }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isLoggedIn, user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 3 Primary Nav Links: Home, About Us, Services (Header stays clean)
  const navLinks = [
    { name: "Home", id: "home" },
    { name: "About Us", id: "about" },
    { name: "Services", id: "services" },
  ];

  // Menu Drawer links (Includes Location, Prices, Gallery, etc.)
  const drawerLinks = [
    { name: "Home", id: "home" },
    { name: "About Us", id: "about" },
    { name: "Services & Curations", id: "services" },
    { name: "Pricing & Treatments", id: "prices" },
    { name: "The Team & Artisans", id: "team" },
    { name: "Sanctuary Gallery", id: "gallery" },
    { name: "Location & Hours", id: "location" },
    { name: "Contact & Concierge", id: "contact" },
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
              Ruu<span className="text-brand-gold">AURA</span><span className="text-brand-gold">.</span>
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

          {/* Right Actions: Member Profile / Login + Book Now + Menu */}
          <div className="flex items-center gap-3 md:gap-5">
            {isLoggedIn ? (
              /* Signed In Profile Button */
              <button
                onClick={() => onOpenAccount?.("dashboard")}
                title={`${user.name} — Member Portal`}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/40 hover:bg-brand-gold/20 hover:border-brand-gold transition-all duration-300 group"
              >
                <div className="w-6 h-6 rounded-full bg-brand-gold/25 border border-brand-gold/50 flex items-center justify-center">
                  <span
                    className="text-[9px] font-bold text-brand-gold group-hover:text-brand-gold-light"
                    style={{ fontFamily: "var(--font-cinzel)" }}
                  >
                    {user.initials || "JS"}
                  </span>
                </div>
                <span
                  style={{ fontFamily: "var(--font-cinzel)" }}
                  className="text-[11px] uppercase tracking-wider text-brand-gold font-medium hidden sm:inline"
                >
                  Account
                </span>
              </button>
            ) : (
              <Link
                href="/login"
                className="text-xs font-sans tracking-[0.15em] uppercase text-brand-cream/90 hover:text-brand-gold transition-colors px-3 py-1.5 border border-white/20 hover:border-brand-gold/60"
              >
                Sign In
              </Link>
            )}

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
                  Ruu<span className="text-brand-gold">AURA</span><span className="text-brand-gold">.</span>
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
                <div className="flex flex-wrap items-center gap-4 mt-6 pt-6 border-t border-white/10">
                  {isLoggedIn ? (
                    <>
                      <button
                        onClick={() => {
                          setIsOpen(false);
                          onOpenAccount?.("dashboard");
                        }}
                        className="text-xs font-sans tracking-widest uppercase text-brand-black bg-brand-gold hover:bg-white font-semibold transition-colors py-2.5 px-5"
                      >
                        Member Dashboard ({user?.name ? user.name.split(" ")[0] : "Member"})
                      </button>
                      <button
                        onClick={() => {
                          logout();
                          setIsOpen(false);
                        }}
                        className="text-xs font-sans tracking-widest uppercase text-brand-muted hover:text-red-400 transition-colors py-2.5 px-4 border border-white/10 hover:border-red-500/30"
                      >
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <Link
                      href="/login"
                      onClick={() => setIsOpen(false)}
                      className="text-xs font-sans tracking-widest uppercase text-brand-gold hover:text-white transition-colors py-2 px-4 border border-brand-gold/40"
                    >
                      Client Sign In
                    </Link>
                  )}
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
                <p>142 Galle Road, Dehiwala</p>
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
              src="/images/gallery/mostafa_meraji-salon-6964527_1920.jpg"
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
                src="/images/background/client-doing-hair-cut-barber-shop-salon.jpg"
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {TEAM_MEMBERS.map((member, idx) => (
          <FadeIn key={idx} delay={0.15 * idx}>
            <div
              className="group cursor-pointer bg-brand-dark/50 border border-white/5 hover:border-brand-gold/40 transition-all duration-500 p-4 flex flex-col justify-between h-full"
              onClick={onBook}
            >
              <div className="w-full aspect-[3/4] overflow-hidden mb-6 bg-brand-dark relative flex items-center justify-center">
                {member.img.endsWith(".svg") ? (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-brand-dark via-brand-black/90 to-brand-dark">
                    <div className="w-20 h-20 rounded-full border border-brand-gold/40 bg-brand-black flex items-center justify-center mb-3 group-hover:scale-110 group-hover:border-brand-gold transition-all duration-500 shadow-xl">
                      <svg
                        className="w-10 h-10 text-brand-gold/80"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                        />
                      </svg>
                    </div>
                    <span className="text-[9px] font-sans tracking-[0.25em] uppercase text-brand-gold/80">
                      RuuAURA Artisan
                    </span>
                  </div>
                ) : (
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale opacity-85 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-[11px] uppercase tracking-widest text-brand-gold">
                    Book with {member.name.split(" ")[0]} →
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-serif text-brand-cream group-hover:text-brand-gold transition-colors mb-1">
                  {member.name}
                </h3>
                <p className="text-[11px] font-sans tracking-[0.15em] uppercase text-brand-gold font-medium mb-1">
                  {member.role}
                </p>
                <p className="text-xs font-sans text-brand-cream/60 font-light">
                  {member.specialty}
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
// GALLERY PAGE VIEW
// ==========================================
const GalleryPage = ({ setRoute }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = ["all", "Ambiance", "Hair Artistry", "Styling", "Spa & Facial", "Bridal"];

  const filteredGallery =
    selectedCategory === "all"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) =>
          selectedCategory === "Ambiance"
            ? item.category.includes("Ambiance")
            : item.category.toLowerCase().includes(selectedCategory.toLowerCase())
        );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="pt-32 pb-24 md:pt-48 md:pb-40 px-6 md:px-16 container mx-auto min-h-screen"
    >
      <div className="max-w-3xl mb-12 md:mb-16">
        <RevealText>
          <h1 className="text-5xl md:text-8xl font-serif mb-6">
            Sanctuary <span className="italic text-brand-gold">Gallery.</span>
          </h1>
        </RevealText>
        <FadeIn delay={0.3}>
          <p className="text-brand-cream/70 font-sans font-light text-lg">
            A visual journey through the haute coiffure, serene wellness suites, and radiant beauty artistry of RuuAURA Dehiwala.
          </p>
        </FadeIn>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-3 mb-12 pb-6 border-b border-white/10">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedCategory(cat)}
            className={`text-xs font-sans tracking-widest uppercase py-2 px-5 transition-all ${
              selectedCategory === cat
                ? "bg-brand-gold text-brand-black font-semibold"
                : "border border-white/20 text-brand-cream/70 hover:border-brand-gold/60"
            }`}
          >
            {cat === "all" ? "All Visuals" : cat}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredGallery.map((item, idx) => (
          <FadeIn key={idx} delay={0.1 * idx}>
            <div className="group cursor-pointer bg-brand-dark border border-white/5 hover:border-brand-gold/40 transition-all duration-500 overflow-hidden flex flex-col justify-between">
              <div className="w-full h-72 md:h-80 overflow-hidden relative">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-85 group-hover:opacity-100"
                />
                <div className="absolute top-4 left-4 bg-brand-black/90 px-3 py-1 text-[10px] uppercase tracking-widest text-brand-gold font-sans border border-brand-gold/30 backdrop-blur-sm">
                  {item.category}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-serif text-brand-cream group-hover:text-brand-gold transition-colors mb-2">
                  {item.title}
                </h3>
                <p className="text-xs font-sans text-brand-cream/60 font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* Booking CTA Banner */}
      <FadeIn delay={0.4} className="mt-20 p-8 md:p-12 bg-brand-dark border border-brand-gold/30 flex flex-col md:flex-row justify-between items-center gap-8">
        <div>
          <h4 className="text-2xl font-serif text-brand-cream mb-2">
            Experience the Sanctuary in Person
          </h4>
          <p className="text-sm font-sans text-brand-cream/70 font-light max-w-xl">
            Book your private consultation or beauty ritual in our Dehiwala sanctuary today.
          </p>
        </div>
        <button
          onClick={() => {
            setRoute("booking");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="bg-brand-gold text-brand-black px-8 py-3.5 text-xs font-sans uppercase tracking-widest font-semibold hover:bg-white transition-colors whitespace-nowrap"
        >
          Reserve Your Visit
        </button>
      </FadeIn>
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
              142 Galle Road, Dehiwala
              <br />
              Western Province, Sri Lanka
            </p>
            <p className="text-brand-cream/90 text-base font-light mb-6">
              +94 77 123 4567
              <br />
              info@ruuaura.lk
            </p>
            {/* Simulated Map Box */}
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noreferrer"
              className="block w-full h-48 bg-brand-dark overflow-hidden relative group border border-brand-gold/20"
            >
              <img
                src="/images/location/dehiwala-map-placeholder.jpg"
                alt="Map View - 142 Galle Road, Dehiwala"
                className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-brand-black/85 group-hover:bg-brand-gold group-hover:text-brand-black px-4 py-2 text-xs uppercase tracking-widest text-brand-gold font-sans backdrop-blur-sm border border-brand-gold/30 transition-colors">
                  View on Maps ↗
                </div>
              </div>
            </a>
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
// PRICING & TREATMENTS PAGE VIEW
// ==========================================
const PricesPage = ({ onSelectService, setRoute }) => {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredCategories =
    activeCategory === "all"
      ? PRICING_CATEGORIES
      : PRICING_CATEGORIES.filter((c) => c.category === activeCategory);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="pt-32 pb-24 md:pt-48 md:pb-40 px-6 md:px-16 container mx-auto min-h-screen"
    >
      <div className="max-w-3xl mb-12 md:mb-16">
        <RevealText>
          <h1 className="text-5xl md:text-8xl font-serif mb-6">
            Pricing & <span className="italic text-brand-gold">Menu.</span>
          </h1>
        </RevealText>
        <FadeIn delay={0.3}>
          <p className="text-brand-cream/70 font-sans font-light text-lg">
            A comprehensive overview of our signature rituals, hair architecture,
            and cellular therapies. Select any treatment to reserve your time.
          </p>
        </FadeIn>
      </div>

      {/* Category filter pills */}
      <div className="flex flex-wrap gap-3 mb-16 pb-6 border-b border-white/10">
        <button
          onClick={() => setActiveCategory("all")}
          className={`text-xs font-sans tracking-widest uppercase py-2 px-5 transition-all ${
            activeCategory === "all"
              ? "bg-brand-gold text-brand-black font-semibold"
              : "border border-white/20 text-brand-cream/70 hover:border-brand-gold/60"
          }`}
        >
          All Offerings
        </button>
        {PRICING_CATEGORIES.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => setActiveCategory(cat.category)}
            className={`text-xs font-sans tracking-widest uppercase py-2 px-5 transition-all ${
              activeCategory === cat.category
                ? "bg-brand-gold text-brand-black font-semibold"
                : "border border-white/20 text-brand-cream/70 hover:border-brand-gold/60"
            }`}
          >
            {cat.category}
          </button>
        ))}
      </div>

      {/* Pricing list */}
      <div className="flex flex-col gap-16">
        {filteredCategories.map((catGroup, cIdx) => (
          <div key={cIdx} className="flex flex-col gap-8">
            <h3 className="text-2xl md:text-3xl font-serif text-brand-gold border-b border-brand-gold/30 pb-3">
              {catGroup.category}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {catGroup.items.map((item, iIdx) => (
                <FadeIn key={iIdx} delay={0.1 * iIdx}>
                  <div className="p-6 md:p-8 bg-brand-dark/80 border border-white/5 hover:border-brand-gold/40 transition-colors flex flex-col justify-between group h-full">
                    <div>
                      <div className="flex justify-between items-start gap-4 mb-3">
                        <h4 className="text-xl font-serif text-brand-cream group-hover:text-brand-gold transition-colors">
                          {item.name}
                        </h4>
                        <div className="text-right whitespace-nowrap">
                          <span className="text-brand-gold font-sans font-medium text-lg">
                            {item.price}
                          </span>
                        </div>
                      </div>
                      <span className="inline-block text-[10px] font-sans uppercase tracking-widest text-brand-muted mb-3 bg-white/5 px-2.5 py-1">
                        ⏱ {item.duration}
                      </span>
                      <p className="text-sm font-sans text-brand-cream/60 font-light leading-relaxed mb-6">
                        {item.desc}
                      </p>
                    </div>

                    <button
                      onClick={() => onSelectService({ title: item.name })}
                      className="inline-flex items-center justify-between text-xs font-sans uppercase tracking-[0.15em] text-brand-gold group-hover:text-white pt-4 border-t border-white/10 transition-colors w-full"
                    >
                      <span>Reserve Treatment</span>
                      <ArrowRightIcon />
                    </button>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Consultation Banner */}
      <FadeIn delay={0.4} className="mt-20 p-8 md:p-12 bg-brand-dark border border-brand-gold/30 flex flex-col md:flex-row justify-between items-center gap-8">
        <div>
          <h4 className="text-2xl font-serif text-brand-cream mb-2">
            Looking for a Bespoke Package?
          </h4>
          <p className="text-sm font-sans text-brand-cream/70 font-light max-w-xl">
            Our creative directors provide tailored consultations for bridal ateliers, editorial shoots, and complete aesthetic restyling.
          </p>
        </div>
        <button
          onClick={() => {
            setRoute("contact");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="bg-brand-gold text-brand-black px-8 py-3.5 text-xs font-sans uppercase tracking-widest font-semibold hover:bg-white transition-colors whitespace-nowrap"
        >
          Consult Concierge
        </button>
      </FadeIn>
    </motion.div>
  );
};

// ==========================================
// LOCATION & HOURS PAGE VIEW
// ==========================================
const LocationPage = ({ setRoute }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="pt-32 pb-24 md:pt-48 md:pb-40 px-6 md:px-16 container mx-auto min-h-screen"
    >
      <div className="max-w-3xl mb-16 md:mb-20">
        <RevealText>
          <h1 className="text-5xl md:text-8xl font-serif mb-6">
            Our <span className="italic text-brand-gold">Sanctuary.</span>
          </h1>
        </RevealText>
        <FadeIn delay={0.3}>
          <p className="text-brand-cream/70 font-sans font-light text-lg">
            Nestled in the heart of Dehiwala, RuuAURA offers a serene private retreat away from the city&apos;s tempo.
          </p>
        </FadeIn>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        {/* Left column: Address & Hours */}
        <FadeIn delay={0.2} className="flex flex-col gap-10">
          <div>
            <h3 className="text-xs font-sans tracking-[0.2em] uppercase text-brand-gold mb-3">
              Sanctuary Address
            </h3>
            <p className="text-2xl font-serif text-brand-cream mb-2">
              142 Galle Road, Dehiwala
            </p>
            <p className="text-sm font-sans text-brand-cream/60 font-light">
              Western Province, Sri Lanka • Dehiwala Sanctuary
            </p>
          </div>

          <div>
            <h3 className="text-xs font-sans tracking-[0.2em] uppercase text-brand-gold mb-4 flex items-center gap-2">
              <CalendarIcon /> Operating Hours
            </h3>
            <div className="flex flex-col gap-3.5 bg-brand-dark p-6 border border-white/5 text-sm font-sans font-light">
              {AVAILABILITY.map((schedule, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center text-brand-cream/90 pb-2.5 border-b border-white/5 last:border-none last:pb-0"
                >
                  <span className="text-brand-cream/80">{schedule.day}</span>
                  <span
                    className={
                      schedule.hours.includes("Closed")
                        ? "text-brand-muted"
                        : "text-brand-gold font-medium"
                    }
                  >
                    {schedule.hours}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-sans tracking-[0.2em] uppercase text-brand-gold mb-3">
              Amenities & Valet
            </h3>
            <ul className="text-sm font-sans text-brand-cream/70 font-light flex flex-col gap-2">
              <li>✦ Complimentary Private Valet Parking</li>
              <li>✦ Individual VIP Styling Suites</li>
              <li>✦ Organic Refreshment & Tea Atelier</li>
              <li>✦ High-Speed Fiber WiFi & Charging Docks</li>
            </ul>
          </div>

          <div className="pt-4 flex gap-4">
            <button
              onClick={() => {
                setRoute("booking");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="bg-brand-gold text-brand-black px-8 py-3.5 text-xs font-sans uppercase tracking-[0.2em] font-semibold hover:bg-white transition-colors"
            >
              Reserve a Session
            </button>
            <button
              onClick={() => {
                setRoute("contact");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="border border-white/20 px-8 py-3.5 text-xs font-sans uppercase tracking-[0.2em] font-semibold text-brand-cream hover:border-brand-gold hover:text-brand-gold transition-colors"
            >
              Contact Desk
            </button>
          </div>
        </FadeIn>

        {/* Right column: Interactive Map Simulation */}
        <FadeIn delay={0.4} className="flex flex-col gap-6">
          <div className="w-full h-[450px] bg-brand-dark border border-brand-gold/20 relative overflow-hidden group shadow-2xl">
            <img
              src="/images/location/dehiwala-sanctuary-map.jpg"
              alt="Dehiwala Sanctuary Location Map"
              className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-transparent to-transparent pointer-events-none" />
            
            <div className="absolute top-6 left-6 bg-brand-black/90 p-4 border border-brand-gold/30 backdrop-blur-md max-w-xs">
              <p className="text-xs font-serif text-brand-gold mb-1">RuuAURA Sanctuary</p>
              <p className="text-[11px] font-sans text-brand-cream/80 font-light">142 Galle Road, Dehiwala</p>
              <p className="text-[10px] font-sans text-brand-muted mt-2">Private entrance with designated concierge valet</p>
            </div>

            <div className="absolute bottom-6 right-6">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-brand-gold text-brand-black px-5 py-2.5 text-xs uppercase tracking-widest font-semibold hover:bg-white transition-colors"
              >
                Open in Google Maps →
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </motion.div>
  );
};

// ==========================================
// CONTACT & CONCIERGE PAGE VIEW
// ==========================================
const ContactPage = ({ setRoute }) => {
  const [formSent, setFormSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => {
      setFormSent(false);
      e.target.reset();
    }, 4000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="pt-32 pb-24 md:pt-48 md:pb-40 px-6 md:px-16 container mx-auto min-h-screen"
    >
      <div className="max-w-3xl mb-16 md:mb-20">
        <RevealText>
          <h1 className="text-5xl md:text-8xl font-serif mb-6">
            Connect with <span className="italic text-brand-gold">Concierge.</span>
          </h1>
        </RevealText>
        <FadeIn delay={0.3}>
          <p className="text-brand-cream/70 font-sans font-light text-lg">
            Have questions regarding treatments, private events, or bridal bookings? Our dedicated team is at your service.
          </p>
        </FadeIn>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        {/* Left: Contact Info */}
        <FadeIn delay={0.2} className="flex flex-col gap-10">
          <div>
            <h3 className="text-xs font-sans tracking-[0.2em] uppercase text-brand-gold mb-3">
              Direct Inquiries
            </h3>
            <p className="text-2xl font-serif text-brand-cream mb-1">
              +94 77 123 4567
            </p>
            <p className="text-sm font-sans text-brand-cream/70 font-light mb-6">
              info@ruuaura.lk • concierge@ruuaura.lk
            </p>

            <a
              href="https://wa.me/94771234567"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 bg-brand-dark border border-brand-gold/40 text-brand-gold px-6 py-3 text-xs uppercase tracking-widest hover:bg-brand-gold hover:text-brand-black transition-colors"
            >
              <span>Chat on WhatsApp</span>
              <ArrowRightIcon />
            </a>
          </div>

          <div className="border-t border-white/10 pt-8">
            <h3 className="text-xs font-sans tracking-[0.2em] uppercase text-brand-gold mb-2">
              Sanctuary Concierge Desk
            </h3>
            <p className="text-sm font-sans text-brand-cream/80 font-light mb-2">
              142 Galle Road, Dehiwala, Sri Lanka
            </p>
            <p className="text-xs font-sans text-brand-muted">
              Tuesday – Sunday: 9:00 AM – 8:00 PM
            </p>
          </div>

          <div className="border-t border-white/10 pt-8">
            <h3 className="text-xs font-sans tracking-[0.2em] uppercase text-brand-gold mb-3">
              Looking for Immediate Appointment?
            </h3>
            <button
              onClick={() => {
                setRoute("booking");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="bg-brand-gold text-brand-black px-6 py-3 text-xs uppercase tracking-widest font-semibold hover:bg-white transition-colors"
            >
              Book Online Now
            </button>
          </div>
        </FadeIn>

        {/* Right: Message Form */}
        <FadeIn delay={0.4}>
          <div className="bg-brand-dark p-8 md:p-12 border border-white/5 relative">
            <AnimatePresence>
              {formSent && (
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
                    Message Dispatched
                  </h3>
                  <p className="text-brand-cream/70 font-sans font-light">
                    Our concierge has received your note and will reply within 1 business day.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <h3 className="text-2xl font-serif text-brand-cream mb-6">
              Send an Inquiry
            </h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-brand-muted mb-2">
                  Your Name
                </label>
                <input
                  required
                  type="text"
                  placeholder="Elena Vance"
                  className="w-full bg-transparent border-b border-white/20 py-2 text-brand-cream placeholder-brand-muted/30 focus:outline-none focus:border-brand-gold transition-colors font-sans text-base"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-brand-muted mb-2">
                    Email Address
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="elena@example.com"
                    className="w-full bg-transparent border-b border-white/20 py-2 text-brand-cream placeholder-brand-muted/30 focus:outline-none focus:border-brand-gold transition-colors font-sans text-base"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-brand-muted mb-2">
                    Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    placeholder="+94 7X XXX XXXX"
                    className="w-full bg-transparent border-b border-white/20 py-2 text-brand-cream placeholder-brand-muted/30 focus:outline-none focus:border-brand-gold transition-colors font-sans text-base"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-brand-muted mb-2">
                  Inquiry Topic
                </label>
                <select
                  required
                  className="w-full bg-brand-dark border-b border-white/20 py-2 text-brand-cream focus:outline-none focus:border-brand-gold transition-colors font-sans text-base appearance-none rounded-none cursor-pointer"
                >
                  <option value="">Select topic...</option>
                  <option value="treatments">Treatment Consultation</option>
                  <option value="bridal">Bridal & Couture Package</option>
                  <option value="events">Private Sanctuary Event</option>
                  <option value="other">General Inquiries</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-brand-muted mb-2">
                  Message
                </label>
                <textarea
                  required
                  rows="3"
                  placeholder="How may our concierge assist you?"
                  className="w-full bg-transparent border-b border-white/20 py-2 text-brand-cream placeholder-brand-muted/30 focus:outline-none focus:border-brand-gold transition-colors font-sans text-base resize-none"
                />
              </div>

              <button
                type="submit"
                className="mt-2 bg-brand-gold text-brand-black px-8 py-4 text-xs tracking-[0.2em] uppercase font-semibold hover:bg-white transition-colors duration-300 w-full md:w-auto self-start cursor-pointer"
              >
                Send Message
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
const Footer = ({ setRoute, onOpenAccount }) => {
  const { isLoggedIn } = useAuth();
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
              Ruu<span className="text-brand-gold">AURA</span><span className="text-brand-gold">.</span>
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
              setRoute("prices");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="text-xs font-sans tracking-widest uppercase text-brand-cream/70 hover:text-brand-gold transition-colors"
          >
            Pricing
          </button>
          <button
            onClick={() => {
              setRoute("gallery");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="text-xs font-sans tracking-widest uppercase text-brand-cream/70 hover:text-brand-gold transition-colors"
          >
            Gallery
          </button>
          <button
            onClick={() => {
              setRoute("location");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="text-xs font-sans tracking-widest uppercase text-brand-cream/70 hover:text-brand-gold transition-colors"
          >
            Location
          </button>
          <button
            onClick={() => {
              setRoute("contact");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="text-xs font-sans tracking-widest uppercase text-brand-cream/70 hover:text-brand-gold transition-colors"
          >
            Contact
          </button>
          {isLoggedIn ? (
            <button
              onClick={() => onOpenAccount?.("dashboard")}
              className="text-xs font-sans tracking-widest uppercase text-brand-gold hover:text-white transition-colors font-medium"
            >
              My Account
            </button>
          ) : (
            <Link
              href="/login"
              className="text-xs font-sans tracking-widest uppercase text-brand-cream/70 hover:text-brand-gold transition-colors"
            >
              Sign In
            </Link>
          )}
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
        <div className="flex flex-col gap-1 text-center md:text-left">
          <p>© 2026 RuuAURA. All rights reserved.</p>
          <p className="normal-case tracking-normal text-[11px] text-brand-cream/60">
            Designed &amp; Developed by{" "}
            <a
              href="https://shamikakkss.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-gold hover:underline hover:text-white transition-colors"
            >
              Sachintha
            </a>
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <span className="text-brand-cream/60">142 Galle Road, Dehiwala</span>
          <div className="flex items-center gap-2.5">
            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 border border-white/15 flex items-center justify-center text-brand-muted hover:border-brand-gold hover:text-brand-gold hover:bg-brand-gold/10 transition-all duration-300 rounded-sm"
              aria-label="Instagram"
              title="Instagram"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>

            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 border border-white/15 flex items-center justify-center text-brand-muted hover:border-brand-gold hover:text-brand-gold hover:bg-brand-gold/10 transition-all duration-300 rounded-sm"
              aria-label="Facebook"
              title="Facebook"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>

            {/* TikTok */}
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 border border-white/15 flex items-center justify-center text-brand-muted hover:border-brand-gold hover:text-brand-gold hover:bg-brand-gold/10 transition-all duration-300 rounded-sm"
              aria-label="TikTok"
              title="TikTok"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .57.04.84.11V9.41a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.46V13a8.16 8.16 0 0 0 5.77 2.29V11.8a4.84 4.84 0 0 1-3.77-1.88V6.69h3.77z"/>
              </svg>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/94771234567"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 border border-white/15 flex items-center justify-center text-brand-muted hover:border-brand-gold hover:text-brand-gold hover:bg-brand-gold/10 transition-all duration-300 rounded-sm"
              aria-label="WhatsApp"
              title="WhatsApp Concierge"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
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
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [accountTab, setAccountTab] = useState("dashboard");

  const handleOpenAccount = (tab = "dashboard") => {
    setAccountTab(tab);
    setIsAccountOpen(true);
  };

  useEffect(() => {
    // Check URL parameters for direct modal open
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const modalParam = params.get("modal");
      const accountParam = params.get("account");
      if (modalParam) {
        handleOpenAccount(modalParam);
      } else if (accountParam === "true" || accountParam === "1") {
        handleOpenAccount("dashboard");
      }
    }

    // Custom event listener for anywhere in the app
    const handleCustomOpen = (e) => {
      const tab = e.detail?.tab || "dashboard";
      handleOpenAccount(tab);
    };
    window.addEventListener("ruuaura_open_account", handleCustomOpen);

    return () => {
      window.removeEventListener("ruuaura_open_account", handleCustomOpen);
    };
  }, []);

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
      case "prices":
        return (
          <PricesPage
            key="prices"
            onSelectService={handleSelectServiceAndBook}
            setRoute={setCurrentRoute}
          />
        );
      case "team":
        return <TeamPage key="team" onBook={() => setCurrentRoute("booking")} />;
      case "gallery":
        return <GalleryPage key="gallery" setRoute={setCurrentRoute} />;
      case "location":
        return <LocationPage key="location" setRoute={setCurrentRoute} />;
      case "contact":
        return <ContactPage key="contact" setRoute={setCurrentRoute} />;
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
      <Navigation
        currentRoute={currentRoute}
        setRoute={setCurrentRoute}
        onOpenAccount={handleOpenAccount}
      />

      <main className="w-full min-h-screen">
        <AnimatePresence mode="wait">{renderPage()}</AnimatePresence>
      </main>

      <Footer
        setRoute={setCurrentRoute}
        onOpenAccount={handleOpenAccount}
      />

      {/* Global Synchronized Luxury Account Modal */}
      <AccountModal
        isOpen={isAccountOpen}
        initialTab={accountTab}
        onClose={() => setIsAccountOpen(false)}
      />
    </div>
  );
}
