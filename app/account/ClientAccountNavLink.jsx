"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ClientAccountNavLink({ href, label, Icon }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-5 py-4 text-sm border-b border-brand-border/50 transition-all duration-300 ${
        isActive
          ? "bg-brand-gold/10 text-brand-gold border-l-2 border-l-brand-gold"
          : "text-brand-muted hover:text-brand-cream hover:bg-brand-surface/50"
      }`}
    >
      <Icon size={15} className={isActive ? "text-brand-gold" : ""} />
      <span>{label}</span>
    </Link>
  );
}
