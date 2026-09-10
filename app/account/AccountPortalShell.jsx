"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Calendar, LayoutDashboard, LogOut, User, Bell, Sparkles, ArrowLeft } from "lucide-react";
import { useAuth } from "@/lib/authStore";

const NAV_ITEMS = [
  { href: "/account", label: "Dashboard", icon: LayoutDashboard },
  { href: "/account/bookings", label: "My Bookings", icon: Calendar },
  { href: "/account/profile", label: "Profile", icon: User },
  { href: "/account/notifications", label: "Notifications", icon: Bell },
];

export default function AccountPortalShell({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const signOut = () => {
    logout();
    router.push("/login");
  };

  return (
    <main className="account-portal min-h-screen bg-brand-black text-brand-cream px-3 py-3 md:px-6 md:py-6">
      <div className="mx-auto flex min-h-[calc(100vh-1.5rem)] max-w-[82rem] flex-col overflow-hidden border border-brand-gold/25 bg-brand-black shadow-2xl md:min-h-[calc(100vh-3rem)]">
        <header className="flex items-center justify-between gap-4 border-b border-brand-border bg-brand-surface px-5 py-4 md:px-8">
          <Link href="/account" className="shrink-0">
            <span className="block text-xl font-bold tracking-[0.16em] text-brand-cream" style={{ fontFamily: "var(--font-cinzel)" }}>RuuAURA</span>
            <span className="block text-[8px] uppercase tracking-[0.34em] text-brand-gold" style={{ fontFamily: "var(--font-cinzel)" }}>Member Sanctuary Portal</span>
          </Link>
          <div className="hidden items-center gap-2 rounded-full border border-brand-gold/25 bg-brand-gold/10 px-3 py-1.5 text-[10px] uppercase tracking-widest text-brand-gold sm:flex">
            <Sparkles size={11} /> {user.tier || "Sanctuary Member"}
          </div>
          <Link href="/" className="inline-flex items-center gap-2 border border-brand-border px-3 py-2 text-[10px] uppercase tracking-widest text-brand-muted transition-colors hover:border-brand-gold hover:text-brand-gold">
            <ArrowLeft size={13} /> <span className="hidden sm:inline">Return to Sanctuary</span><span className="sm:hidden">Return</span>
          </Link>
        </header>

        <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
          <aside className="w-full shrink-0 border-b border-brand-border bg-brand-dark lg:w-64 lg:border-b-0 lg:border-r">
            <div className="flex items-center gap-3 border-b border-brand-border p-5 lg:block lg:text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-brand-gold/40 bg-brand-gold/10 text-sm font-bold text-brand-gold lg:mx-auto lg:mb-3" style={{ fontFamily: "var(--font-cinzel)" }}>
                <span suppressHydrationWarning>{user.initials || "JS"}</span>
              </div>
              <div className="min-w-0">
                <p suppressHydrationWarning className="truncate text-sm font-semibold text-brand-cream" style={{ fontFamily: "var(--font-serif)" }}>{user.name || "Sanctuary Member"}</p>
                <p suppressHydrationWarning className="truncate text-[11px] text-brand-muted">{user.email || "guest@ruuaura.lk"}</p>
              </div>
            </div>
            <nav className="flex overflow-x-auto p-3 lg:block lg:space-y-1 lg:p-4">
              {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
                const active = pathname === href;
                return (
                  <Link key={href} href={href} className={`flex min-w-max items-center gap-2 border-l-2 px-3 py-3 text-xs uppercase tracking-widest transition-colors lg:w-full ${active ? "border-brand-gold bg-brand-gold/10 text-brand-gold" : "border-transparent text-brand-muted hover:bg-brand-surface hover:text-brand-cream"}`}>
                    <Icon size={15} /> <span>{label}</span>
                    {label === "Notifications" && <span className="ml-auto rounded-full bg-brand-gold/20 px-1.5 py-0.5 text-[9px] text-brand-gold">2</span>}
                  </Link>
                );
              })}
            </nav>
            <button onClick={signOut} className="hidden items-center gap-2 border-t border-brand-border px-7 py-5 text-xs uppercase tracking-widest text-brand-muted transition-colors hover:text-red-400 lg:flex lg:w-full"><LogOut size={15} /> Sign Out</button>
          </aside>

          <section className="min-w-0 flex-1 bg-brand-black p-5 md:p-8 lg:p-10">{children}</section>
        </div>
      </div>
    </main>
  );
}
