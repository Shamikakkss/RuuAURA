"use client";
import { useState } from "react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import AccountSidebar from "./AccountSidebar";
import Link from "next/link";
import { Calendar, Bell, ChevronRight, Clock, CheckCircle, AlertCircle, XCircle } from "lucide-react";
import { getStoredBookings, updateStoredBooking } from "@/lib/demoStore";

function StatusBadge({ status }) {
  const map = {
    Confirmed: { cls: "badge-confirmed", icon: CheckCircle, label: "Confirmed" },
    Pending: { cls: "badge-pending", icon: AlertCircle, label: "Pending" },
    Completed: { cls: "badge-completed", icon: CheckCircle, label: "Completed" },
    Cancelled: { cls: "badge-cancelled", icon: XCircle, label: "Cancelled" },
  };
  const { cls, icon: Icon, label } = map[status] || map.Pending;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-xs font-medium ${cls}`}
          style={{ fontFamily: "var(--font-cinzel)" }}>
      <Icon size={11} />
      {label}
    </span>
  );
}

export default function AccountPage() {
  const [bookings, setBookings] = useState(() => getStoredBookings());
  const upcoming = bookings.filter((b) => b.status !== "Completed" && b.status !== "Cancelled");
  const next = upcoming[0];

  const cancelNext = () => {
    if (!next || !window.confirm(`Cancel ${next.serviceTitle}?`)) return;
    setBookings(updateStoredBooking(next.id, { status: "Cancelled" }));
  };

  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20 bg-brand-black min-h-screen">
        <div className="container-luxury">
          <div className="flex flex-col lg:flex-row gap-8">
            <AccountSidebar />

            <div className="flex-1 flex flex-col gap-6">
              {/* Welcome */}
              <div className="glass-card rounded-sm p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-brand-gold/5 rounded-full blur-[60px] pointer-events-none" />
                <p style={{ fontFamily: "var(--font-cinzel)" }}
                   className="text-[10px] tracking-widest uppercase text-brand-gold mb-2">Welcome Back</p>
                <h1 style={{ fontFamily: "var(--font-serif)" }}
                    className="text-2xl font-semibold text-brand-cream mb-1">
                  Jane Sterling
                </h1>
                <p className="text-sm text-brand-muted">Sanctuary Member since 2024 · 3 appointments</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Total Bookings", value: bookings.length, icon: Calendar },
                  { label: "Upcoming", value: upcoming.length, icon: Clock },
                  { label: "Completed", value: bookings.filter((b) => b.status === "Completed").length, icon: CheckCircle },
                  { label: "Notifications", value: "View", icon: Bell },
                ].map(({ label, value, icon: Icon }) => (
                  <div key={label} className="glass-card rounded-sm p-5 text-center">
                    <Icon size={18} className="text-brand-gold mx-auto mb-3" />
                    <p style={{ fontFamily: "var(--font-cinzel)" }}
                       className="text-2xl font-bold text-brand-cream mb-1">{value}</p>
                    <p className="text-xs text-brand-muted">{label}</p>
                  </div>
                ))}
              </div>

              {/* Next Appointment */}
              {next && (
                <div className="glass-card rounded-sm p-6">
                  <div className="flex items-center justify-between mb-5">
                    <p style={{ fontFamily: "var(--font-cinzel)" }}
                       className="text-xs tracking-widest uppercase text-brand-gold">
                      Next Appointment
                    </p>
                    <Link href="/account/bookings"
                          className="text-xs text-brand-muted hover:text-brand-gold transition-colors flex items-center gap-1">
                      View all <ChevronRight size={12} />
                    </Link>
                  </div>
                  <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                    <div>
                      <h3 style={{ fontFamily: "var(--font-serif)" }}
                          className="text-xl font-semibold text-brand-cream mb-1">
                        {next.serviceTitle}
                      </h3>
                      <p className="text-sm text-brand-muted mb-3">
                        with {next.artisanName} · {next.duration}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-sm">
                        <span className="flex items-center gap-1.5 text-brand-cream-muted">
                          <Calendar size={13} className="text-brand-gold" />
                          {new Date(next.date + "T12:00:00").toLocaleDateString("en-US", {
                            weekday: "long", month: "long", day: "numeric",
                          })}
                        </span>
                        <span className="flex items-center gap-1.5 text-brand-cream-muted">
                          <Clock size={13} className="text-brand-gold" />
                          {next.time}
                        </span>
                        <StatusBadge status={next.status} />
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button onClick={cancelNext} className="btn-luxury border border-brand-border text-brand-muted px-5 py-2.5 rounded-sm hover:border-red-400/40 hover:text-red-400 text-xs">
                        Cancel
                      </button>
                      <Link href="/booking"
                            className="btn-luxury bg-brand-gold text-brand-black px-5 py-2.5 rounded-sm hover:bg-brand-gold-light text-xs">
                        Reschedule
                      </Link>
                    </div>
                  </div>
                  <p style={{ fontFamily: "var(--font-cinzel)" }}
                     className="mt-4 text-[10px] tracking-widest uppercase text-brand-muted">
                    Ref: {next.id}
                  </p>
                </div>
              )}

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/booking"
                      className="glass-card rounded-sm p-6 group hover:border-brand-gold/40 transition-all duration-300 block">
                  <Calendar size={20} className="text-brand-gold mb-3" />
                  <h4 style={{ fontFamily: "var(--font-serif)" }}
                      className="text-base font-semibold text-brand-cream mb-1 group-hover:text-brand-gold transition-colors">
                    Book New Appointment
                  </h4>
                  <p className="text-xs text-brand-muted">Reserve your next sanctuary session</p>
                </Link>
                <Link href="/account/profile"
                      className="glass-card rounded-sm p-6 group hover:border-brand-gold/40 transition-all duration-300 block">
                  <Bell size={20} className="text-brand-gold mb-3" />
                  <h4 style={{ fontFamily: "var(--font-serif)" }}
                      className="text-base font-semibold text-brand-cream mb-1 group-hover:text-brand-gold transition-colors">
                    Update Profile
                  </h4>
                  <p className="text-xs text-brand-muted">Manage your contact information</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
