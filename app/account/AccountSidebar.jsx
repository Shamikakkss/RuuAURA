"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Calendar, User, Bell, LogOut, Sparkles } from "lucide-react";

const ACCOUNT_NAV = [
  { href: "/account",               label: "Dashboard",     icon: LayoutDashboard },
  { href: "/account/bookings",      label: "My Bookings",   icon: Calendar        },
  { href: "/account/profile",       label: "Profile",       icon: User            },
  { href: "/account/notifications", label: "Notifications", icon: Bell            },
];

// Demo user — replace with real auth data when available
const USER = {
  name:   "Jane Sterling",
  email:  "jane@example.com",
  initials: "JS",
  tier:   "Sanctuary Member",
};

export default function AccountSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full lg:w-60 flex-shrink-0 flex flex-col gap-3">

      {/* ── Profile Card ── */}
      <div className="glass-card rounded-sm p-5 relative overflow-hidden">
        {/* subtle glow */}
        <div className="pointer-events-none absolute -top-6 -right-6 w-24 h-24 rounded-full bg-brand-gold/8 blur-[40px]" />
        <div className="absolute top-0 left-0 right-0 h-px gold-line" />

        <div className="relative z-10 flex flex-col items-center text-center gap-3">
          {/* Avatar */}
          <div className="w-14 h-14 rounded-full bg-brand-gold/15 border border-brand-gold/30 flex items-center justify-center">
            <span
              className="text-lg font-bold text-brand-gold"
              style={{ fontFamily: "var(--font-cinzel)" }}
            >
              {USER.initials}
            </span>
          </div>

          {/* Name & email */}
          <div>
            <p
              className="text-sm font-semibold text-brand-cream leading-snug"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {USER.name}
            </p>
            <p className="text-[11px] text-brand-muted mt-0.5 truncate max-w-[160px]">
              {USER.email}
            </p>
          </div>

          {/* Tier badge */}
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-[10px] text-brand-gold"
                style={{ fontFamily: "var(--font-cinzel)" }}>
            <Sparkles size={9} />
            {USER.tier}
          </span>
        </div>
      </div>

      {/* ── Navigation ── */}
      <nav className="glass-card rounded-sm overflow-hidden">
        {ACCOUNT_NAV.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-5 py-4 text-sm transition-all duration-300 border-l-2 ${
                isActive
                  ? "bg-brand-gold/10 text-brand-gold border-brand-gold font-medium"
                  : "text-brand-muted hover:text-brand-cream hover:bg-brand-surface/60 border-transparent"
              }`}
            >
              <Icon size={16} className={isActive ? "text-brand-gold" : ""} />
              <span>{label}</span>
            </Link>
          );
        })}

        <div className="border-t border-brand-border">
          <Link
            href="/login"
            className="flex items-center gap-3 px-5 py-4 text-sm text-brand-muted hover:text-red-400 hover:bg-red-400/5 transition-all duration-300 border-l-2 border-transparent"
          >
            <LogOut size={15} />
            <span>Sign Out</span>
          </Link>
        </div>
      </nav>

    </aside>
  );
}
