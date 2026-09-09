"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, ChevronRight } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/staff", label: "Artisans" },
  { href: "/about", label: "About" },
  { href: "/location", label: "Location" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const isActive = (href) => pathname === href;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-brand-black/95 backdrop-blur-md border-b border-brand-border/60 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="container-luxury flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none group">
            <span
              style={{ fontFamily: "var(--font-cinzel)" }}
              className="text-2xl font-bold text-brand-cream tracking-widest group-hover:text-brand-gold transition-colors duration-300"
            >
              RuuAURA
            </span>
            <span
              style={{ fontFamily: "var(--font-cinzel)" }}
              className="text-[8px] tracking-[0.4em] text-brand-gold uppercase mt-0.5"
            >
              Beauty Sanctuary
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs tracking-widest uppercase font-medium transition-colors duration-300 relative group ${
                  isActive(link.href)
                    ? "text-brand-gold"
                    : "text-brand-cream-muted hover:text-brand-cream"
                }`}
                style={{ fontFamily: "var(--font-cinzel)" }}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-brand-gold transition-all duration-300 ${
                    isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/login"
              className="text-xs tracking-widest uppercase text-brand-muted hover:text-brand-cream transition-colors duration-300"
              style={{ fontFamily: "var(--font-cinzel)" }}
            >
              Sign In
            </Link>
            <Link
              href="/booking"
              className="btn-luxury bg-brand-gold text-brand-black px-6 py-3 rounded-sm hover:bg-brand-gold-light"
            >
              Book Now
              <ChevronRight size={13} />
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMenuOpen(true)}
            className="lg:hidden text-brand-cream hover:text-brand-gold transition-colors p-2"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-[100] flex">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
            onClick={() => setMenuOpen(false)}
          />
          {/* Panel */}
          <div className="relative ml-auto w-[85vw] max-w-sm h-full bg-brand-dark border-l border-brand-border flex flex-col animate-slide-in-left">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-brand-border">
              <span
                style={{ fontFamily: "var(--font-cinzel)" }}
                className="text-lg font-bold text-brand-cream tracking-widest"
              >
                RuuAURA
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                className="text-brand-muted hover:text-brand-cream transition-colors p-1"
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>

            {/* Nav Links */}
            <nav className="flex-1 flex flex-col gap-1 p-6">
              {NAV_LINKS.map((link, i) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center justify-between py-4 border-b border-brand-border/40 text-sm tracking-widest uppercase font-medium transition-colors duration-300 ${
                    isActive(link.href)
                      ? "text-brand-gold"
                      : "text-brand-cream-muted hover:text-brand-cream"
                  }`}
                  style={{ fontFamily: "var(--font-cinzel)", animationDelay: `${i * 60}ms` }}
                >
                  {link.label}
                  <ChevronRight size={14} className="opacity-40" />
                </Link>
              ))}
            </nav>

            {/* Mobile CTAs */}
            <div className="p-6 flex flex-col gap-3 border-t border-brand-border">
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="btn-luxury border border-brand-border text-brand-cream px-6 py-4 rounded-sm w-full hover:border-brand-gold hover:text-brand-gold"
              >
                Sign In
              </Link>
              <Link
                href="/booking"
                onClick={() => setMenuOpen(false)}
                className="btn-luxury bg-brand-gold text-brand-black px-6 py-4 rounded-sm w-full hover:bg-brand-gold-light"
              >
                Book Appointment
                <ChevronRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
