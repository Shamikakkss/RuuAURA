"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Calendar, User, Bell, LogOut } from "lucide-react";

const ACCOUNT_NAV = [
  { href: "/account", label: "Dashboard", icon: LayoutDashboard },
  { href: "/account/bookings", label: "My Bookings", icon: Calendar },
  { href: "/account/profile", label: "Profile", icon: User },
  { href: "/account/notifications", label: "Notifications", icon: Bell },
];

export default function AccountSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full lg:w-60 flex-shrink-0">
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
