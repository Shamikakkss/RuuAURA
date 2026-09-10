"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, Bell, CheckCircle, Clock, ChevronRight } from "lucide-react";
import AccountPortalShell from "./AccountPortalShell";
import { useAuth } from "@/lib/authStore";
import { getStoredBookings } from "@/lib/demoStore";
import { SEED_BOOKINGS } from "@/data/mockData";

export default function AccountPage() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState(SEED_BOOKINGS);

  useEffect(() => {
    setBookings(getStoredBookings());
  }, []);

  const upcoming = bookings.filter((booking) => ["Confirmed", "Pending"].includes(booking.status));
  const next = upcoming[0];
  const completed = bookings.filter((booking) => booking.status === "Completed").length;

  return (
    <AccountPortalShell>
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-col justify-between gap-5 border-b border-brand-border pb-6 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-[10px] uppercase tracking-[0.28em] text-brand-gold">Member dashboard</p>
            <h1 suppressHydrationWarning className="text-3xl text-brand-cream md:text-4xl" style={{ fontFamily: "var(--font-serif)" }}>Welcome, {user.name || "Sanctuary Member"}</h1>
            <p className="mt-2 text-sm text-brand-muted">Your private view of upcoming rituals and sanctuary privileges.</p>
          </div>
          <Link href="/booking" className="inline-flex items-center justify-center gap-2 bg-brand-gold px-5 py-3 text-[10px] font-semibold uppercase tracking-widest text-brand-black transition-colors hover:bg-brand-gold-light">+ Book New <ChevronRight size={13} /></Link>
        </div>
        <div className="mb-8 grid grid-cols-2 gap-3 md:grid-cols-4">
          {[{ label: "Total Bookings", value: bookings.length, icon: Calendar }, { label: "Upcoming", value: upcoming.length, icon: Clock }, { label: "Completed", value: completed, icon: CheckCircle }, { label: "Unread Notes", value: 2, icon: Bell }].map(({ label, value, icon: Icon }) => (
            <div key={label} className="border border-brand-border bg-brand-surface p-4 md:p-5"><Icon size={16} className="mb-4 text-brand-gold" /><p className="text-2xl text-brand-cream" style={{ fontFamily: "var(--font-cinzel)" }}>{value}</p><p className="mt-1 text-[10px] uppercase tracking-widest text-brand-muted">{label}</p></div>
          ))}
        </div>
        {next ? (
          <div className="border border-brand-gold/25 bg-brand-surface p-5 md:p-7">
            <div className="mb-6 flex items-center justify-between border-b border-brand-border pb-4"><p className="text-[10px] uppercase tracking-[0.25em] text-brand-gold">Next appointment</p><span className="border border-brand-gold/30 bg-brand-gold/10 px-2.5 py-1 text-[10px] uppercase tracking-widest text-brand-gold">{next.status}</span></div>
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><h2 className="text-2xl text-brand-cream" style={{ fontFamily: "var(--font-serif)" }}>{next.serviceTitle}</h2><p className="mt-2 text-sm text-brand-muted">with <span className="text-brand-cream">{next.artisanName}</span> · {next.duration}</p><div className="mt-5 flex flex-wrap gap-4 text-xs text-brand-muted"><span><Calendar size={13} className="mr-2 inline text-brand-gold" />{next.date}</span><span><Clock size={13} className="mr-2 inline text-brand-gold" />{next.time}</span></div></div><Link href="/account/bookings" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-brand-gold hover:text-brand-cream">Manage appointment <ChevronRight size={14} /></Link></div>
            <p className="mt-5 border-t border-brand-border pt-4 text-[10px] uppercase tracking-widest text-brand-muted">Reference: {next.id}</p>
          </div>
        ) : <div className="border border-brand-border bg-brand-surface p-8 text-center"><p className="text-brand-muted">No upcoming appointments yet.</p><Link href="/booking" className="mt-4 inline-block text-xs uppercase tracking-widest text-brand-gold">Reserve a ritual</Link></div>}
      </div>
    </AccountPortalShell>
  );
}
