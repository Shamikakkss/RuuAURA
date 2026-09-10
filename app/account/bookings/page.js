"use client";
import { useState, useEffect } from "react";
import AccountPortalShell from "../AccountPortalShell";
import { Calendar, Clock } from "lucide-react";
import { getStoredBookings, updateStoredBooking } from "@/lib/demoStore";
import { SEED_BOOKINGS } from "@/data/mockData";

export default function BookingsPage() {
  const [bookings, setBookings] = useState(SEED_BOOKINGS);

  useEffect(() => {
    setBookings(getStoredBookings());
  }, []);
  const upcoming = bookings.filter((booking) => ["Confirmed", "Pending"].includes(booking.status));
  const past = bookings.filter((booking) => !["Confirmed", "Pending"].includes(booking.status));
  const cancel = (booking) => {
    if (window.confirm(`Cancel ${booking.serviceTitle}?`)) setBookings(updateStoredBooking(booking.id, { status: "Cancelled" }));
  };
  const group = (items, title) => <section className="mb-8"><p className="mb-4 text-[10px] uppercase tracking-[0.25em] text-brand-gold">{title} ({items.length})</p>{items.length ? <div className="space-y-4">{items.map((booking) => <article key={booking.id} className="border border-brand-border bg-brand-surface p-5 md:p-6"><div className="flex flex-col justify-between gap-5 md:flex-row md:items-center"><div><div className="mb-2 flex flex-wrap items-center gap-3"><span className={`border px-2.5 py-1 text-[10px] uppercase tracking-widest ${booking.status === "Confirmed" ? "border-brand-success/40 text-brand-success" : booking.status === "Pending" ? "border-brand-gold/40 text-brand-gold" : "border-brand-border text-brand-muted"}`}>{booking.status}</span><span className="text-[10px] uppercase tracking-widest text-brand-muted">{booking.id}</span></div><h2 className="text-xl text-brand-cream" style={{ fontFamily: "var(--font-serif)" }}>{booking.serviceTitle}</h2><p className="mt-1 text-sm text-brand-muted">Artisan: <span className="text-brand-cream">{booking.artisanName}</span> · {booking.duration}</p><div className="mt-4 flex flex-wrap gap-4 text-xs text-brand-muted"><span><Calendar size={13} className="mr-2 inline text-brand-gold" />{booking.date}</span><span><Clock size={13} className="mr-2 inline text-brand-gold" />{booking.time}</span></div></div>{title.startsWith("Upcoming") && <button onClick={() => cancel(booking)} className="border border-brand-error/40 px-4 py-2.5 text-xs text-brand-error hover:bg-brand-error/10">Cancel Appointment</button>}</div></article>)}</div> : <div className="border border-brand-border bg-brand-surface p-8 text-sm text-brand-muted">No appointments in this section.</div>}</section>;
  return <AccountPortalShell><div className="mx-auto max-w-5xl"><div className="mb-8 border-b border-brand-border pb-6"><p className="mb-2 text-[10px] uppercase tracking-[0.25em] text-brand-gold">Appointment history</p><h1 className="text-3xl text-brand-cream" style={{ fontFamily: "var(--font-serif)" }}>Your Sanctuary Appointments</h1><p className="mt-2 text-sm text-brand-muted">Manage your scheduled rituals and view past visits.</p></div>{group(upcoming, "Upcoming Appointments")}{group(past, "Past Appointments")}</div></AccountPortalShell>;
}
