"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Calendar, Scissors, Users, Bell, Settings, LogOut, ChevronRight } from "lucide-react";

const ADMIN_NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/bookings", label: "Bookings", icon: Calendar },
  { href: "/admin/services", label: "Services", icon: Scissors },
  { href: "/admin/staff", label: "Staff", icon: Users },
  { href: "/admin/notifications", label: "Notifications", icon: Bell },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 flex-shrink-0 hidden lg:flex flex-col bg-brand-dark border-r border-brand-border min-h-screen sticky top-0">
      {/* Brand */}
      <div className="p-6 border-b border-brand-border">
        <Link href="/" className="flex flex-col leading-none">
          <span style={{ fontFamily: "var(--font-cinzel)" }}
                className="text-xl font-bold text-brand-cream tracking-widest">RUUAURA</span>
          <span style={{ fontFamily: "var(--font-cinzel)" }}
                className="text-[8px] tracking-[0.4em] text-brand-gold uppercase mt-0.5">Admin</span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4">
        {ADMIN_NAV.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-5 py-3.5 text-sm transition-all duration-300 ${
                isActive
                  ? "bg-brand-gold/10 text-brand-gold border-r-2 border-brand-gold"
                  : "text-brand-muted hover:text-brand-cream hover:bg-brand-surface/50"
              }`}
            >
              <Icon size={16} className={isActive ? "text-brand-gold" : ""} />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-brand-border p-4">
        <Link href="/" className="flex items-center gap-3 px-2 py-2.5 text-sm text-brand-muted hover:text-red-400 transition-colors">
          <LogOut size={15} />
          <span>Sign Out</span>
        </Link>
      </div>
    </aside>
  );
}
