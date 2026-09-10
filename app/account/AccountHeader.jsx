"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Sparkles, LogOut, Calendar } from "lucide-react";
import { useAuth } from "@/lib/authStore";

export default function AccountHeader() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleSignOut = () => {
    logout();
    router.push("/login");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-brand-black/95 backdrop-blur-md border-b border-brand-border/60 py-3.5">
      <div className="container-luxury flex items-center justify-between gap-4">
        {/* Left: Brand + Portal Label */}
        <div className="flex items-center gap-4 md:gap-6">
          <Link href="/" className="flex flex-col leading-none group">
            <span
              style={{ fontFamily: "var(--font-cinzel)" }}
              className="text-xl md:text-2xl font-bold text-brand-cream tracking-widest group-hover:text-brand-gold transition-colors duration-300"
            >
              RuuAURA
            </span>
            <span
              style={{ fontFamily: "var(--font-cinzel)" }}
              className="text-[7px] md:text-[8px] tracking-[0.35em] text-brand-gold uppercase mt-0.5"
            >
              Beauty Sanctuary
            </span>
          </Link>

          <div className="hidden sm:flex items-center gap-2 pl-4 border-l border-brand-border/60">
            <span
              style={{ fontFamily: "var(--font-cinzel)" }}
              className="text-[10px] tracking-[0.2em] uppercase px-2.5 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/25 text-brand-gold font-medium inline-flex items-center gap-1.5"
            >
              <Sparkles size={10} />
              Member Portal
            </span>
          </div>
        </div>

        {/* Right Actions: Back to Sanctuary + User Profile / Logout */}
        <div className="flex items-center gap-3 md:gap-4">
          <Link
            href="/booking"
            className="hidden md:inline-flex items-center gap-1.5 text-xs text-brand-cream-muted hover:text-brand-gold transition-colors px-3 py-1.5 border border-white/10 hover:border-brand-gold/30 rounded-sm"
          >
            <Calendar size={13} className="text-brand-gold" />
            <span>Book Ritual</span>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-sans font-medium px-4 py-2 border border-brand-gold/30 bg-brand-gold/5 text-brand-gold hover:bg-brand-gold hover:text-brand-black transition-all duration-300 rounded-sm"
          >
            <ArrowLeft size={13} />
            <span>Return to Sanctuary</span>
          </Link>

          <button
            onClick={handleSignOut}
            title="Sign Out of Member Portal"
            className="w-9 h-9 flex items-center justify-center text-brand-muted hover:text-red-400 hover:bg-red-500/10 border border-white/10 hover:border-red-500/30 rounded-sm transition-colors"
          >
            <LogOut size={15} />
          </button>
        </div>
      </div>
    </header>
  );
}
