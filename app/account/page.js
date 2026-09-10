"use client";
import { useState } from "react";
import AccountHeader from "./AccountHeader";
import Footer from "@/app/components/Footer";
import AccountSidebar from "./AccountSidebar";
import Link from "next/link";
import {
  Calendar, Bell, ChevronRight, Clock, CheckCircle,
  AlertCircle, XCircle, ArrowRight, User, Sparkles
} from "lucide-react";
import { useAuth } from "@/lib/authStore";
import { getStoredBookings, updateStoredBooking } from "@/lib/demoStore";

function StatusBadge({ status }) {
  const map = {
    Confirmed: { cls: "badge-confirmed", icon: CheckCircle, label: "Confirmed" },
    Pending:   { cls: "badge-pending",   icon: AlertCircle, label: "Pending"   },
    Completed: { cls: "badge-completed", icon: CheckCircle, label: "Completed" },
    Cancelled: { cls: "badge-cancelled", icon: XCircle,     label: "Cancelled" },
  };
  const { cls, icon: Icon, label } = map[status] || map.Pending;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${cls}`}
      style={{ fontFamily: "var(--font-cinzel)" }}
    >
      <Icon size={11} />
      {label}
    </span>
  );
}

export default function AccountPage() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState(() => getStoredBookings());
  const upcoming  = bookings.filter((b) => b.status !== "Completed" && b.status !== "Cancelled");
  const next      = upcoming[0];

  const cancelNext = () => {
    if (!next || !window.confirm(`Cancel ${next.serviceTitle}?`)) return;
    setBookings(updateStoredBooking(next.id, { status: "Cancelled" }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-brand-black">
      <AccountHeader />

      <main className="flex-1 pt-24 pb-24">
        <div className="container-luxury">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <AccountSidebar />

            <div className="flex-1 flex flex-col gap-6 min-w-0">

              {/* ── Welcome Banner (editorial hero treatment) ── */}
              <div className="relative overflow-hidden rounded-sm border border-brand-border min-h-[260px] flex items-center">
                {/* Background image */}
                <div
                  className="absolute inset-0 bg-cover bg-center saturate-[.9]"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1600&auto=format&fit=crop')",
                  }}
                />
                {/* Scrim for legibility */}
                <div className="absolute inset-0 bg-gradient-to-r from-brand-black/95 via-brand-black/60 to-brand-black/25" />
                {/* Decorative crossed gold lines, echoing the homepage hero */}
                <svg
                  className="absolute -top-16 left-[6%] w-32 h-[150%] opacity-40 pointer-events-none"
                  viewBox="0 0 100 300"
                  aria-hidden="true"
                >
                  <line x1="0" y1="0" x2="100" y2="300" stroke="#c5a365" strokeWidth="1" />
                  <line x1="100" y1="0" x2="0" y2="300" stroke="#c5a365" strokeWidth="1" />
                </svg>

                <div className="relative z-10 p-8 md:p-11">
                  <p
                    className="text-[11px] tracking-[0.3em] uppercase text-brand-gold mb-4"
                    style={{ fontFamily: "var(--font-cinzel)" }}
                  >
                    Sanctuary Member Dashboard
                  </p>
                  <h1
                    className="font-semibold text-brand-cream leading-[1.05] mb-4"
                    style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(32px, 5vw, 50px)" }}
                  >
                    Welcome back,
                    <em className="block italic font-medium">{user.name ? user.name.split(" ")[0] : "Jane"}.</em>
                  </h1>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-brand-cream-muted">
                    <span>Member since 2024</span>
                    <span className="inline-block w-px h-3 bg-brand-border" />
                    <span>{bookings.length} appointments</span>
                  </div>
                </div>
              </div>

              {/* ── Stats ── */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Total Bookings", value: bookings.length, icon: Calendar     },
                  { label: "Upcoming",        value: upcoming.length, icon: Clock        },
                  { label: "Completed",       value: bookings.filter((b) => b.status === "Completed").length, icon: CheckCircle },
                  { label: "Notifications",   value: "View",          icon: Bell         },
                ].map(({ label, value, icon: Icon }) => (
                  <div key={label} className="glass-card rounded-sm p-5 text-center group hover:border-brand-gold/25 transition-all duration-300">
                    <div className="w-9 h-9 rounded-full bg-brand-gold/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-brand-gold/20 transition-colors">
                      <Icon size={16} className="text-brand-gold" />
                    </div>
                    <p
                      className="text-2xl font-bold text-brand-cream mb-1"
                      style={{ fontFamily: "var(--font-cinzel)" }}
                    >
                      {value}
                    </p>
                    <p className="text-xs text-brand-muted leading-snug">{label}</p>
                  </div>
                ))}
              </div>

              {/* ── Next Appointment ── */}
              {next ? (
                <div className="glass-card rounded-sm p-6 relative overflow-hidden">
                  {/* Gold shimmer top edge */}
                  <div className="absolute top-0 left-0 right-0 h-px gold-line" />
                  <div className="pointer-events-none absolute top-0 right-0 w-56 h-40 bg-brand-gold/5 blur-[60px] rounded-full" />

                  <div className="flex items-center justify-between mb-5 relative z-10">
                    <p className="section-label" style={{ fontFamily: "var(--font-cinzel)" }}>
                      ✦&nbsp;Next Appointment
                    </p>
                    <Link
                      href="/account/bookings"
                      className="text-xs text-brand-muted hover:text-brand-gold transition-colors flex items-center gap-1"
                    >
                      View all <ChevronRight size={12} />
                    </Link>
                  </div>

                  <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between relative z-10">
                    <div className="min-w-0 flex-1">
                      <h3
                        className="text-xl font-semibold text-brand-cream mb-1"
                        style={{ fontFamily: "var(--font-serif)" }}
                      >
                        {next.serviceTitle}
                      </h3>
                      <p className="text-sm text-brand-muted mb-4">
                        with {next.artisanName} · {next.duration}
                      </p>
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="inline-flex items-center gap-1.5 text-sm text-brand-cream-muted">
                          <Calendar size={13} className="text-brand-gold shrink-0" />
                          {new Date(next.date + "T12:00:00").toLocaleDateString("en-US", {
                            weekday: "long", month: "long", day: "numeric",
                          })}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-sm text-brand-cream-muted">
                          <Clock size={13} className="text-brand-gold shrink-0" />
                          {next.time}
                        </span>
                        <StatusBadge status={next.status} />
                      </div>
                    </div>

                    <div className="flex gap-3 flex-shrink-0">
                      <button
                        onClick={cancelNext}
                        className="btn-luxury border border-brand-border text-brand-muted px-5 py-2.5 rounded-sm hover:border-red-400/50 hover:text-red-400 text-xs"
                      >
                        Cancel
                      </button>
                      <Link
                        href="/booking"
                        className="btn-luxury bg-brand-gold text-brand-black px-5 py-2.5 rounded-sm hover:bg-brand-gold-light text-xs"
                      >
                        Reschedule
                      </Link>
                    </div>
                  </div>

                  <p
                    className="mt-5 pt-4 border-t border-brand-border/50 text-[10px] tracking-widest uppercase text-brand-muted/50 relative z-10"
                    style={{ fontFamily: "var(--font-cinzel)" }}
                  >
                    Ref: {next.id}
                  </p>
                </div>
              ) : (
                <div className="glass-card rounded-sm p-10 flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-full bg-brand-gold/10 flex items-center justify-center mb-4">
                    <Calendar size={24} className="text-brand-gold/60" />
                  </div>
                  <p className="text-brand-muted text-sm mb-4">No upcoming appointments</p>
                  <Link
                    href="/booking"
                    className="btn-luxury bg-brand-gold text-brand-black px-6 py-2.5 rounded-sm hover:bg-brand-gold-light text-xs"
                  >
                    Book Now
                  </Link>
                </div>
              )}

              {/* ── Quick Actions ── */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    href:  "/booking",
                    icon:  Calendar,
                    title: "Book New Appointment",
                    desc:  "Reserve your next sanctuary session",
                  },
                  {
                    href:  "/account/profile",
                    icon:  User,
                    title: "Update Profile",
                    desc:  "Manage your contact information",
                  },
                ].map(({ href, icon: Icon, title, desc }) => (
                  <Link
                    key={href}
                    href={href}
                    className="glass-card rounded-sm p-6 flex items-center gap-4 group hover:border-brand-gold/40 transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-full bg-brand-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-gold/20 transition-colors">
                      <Icon size={18} className="text-brand-gold" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4
                        className="text-sm font-semibold text-brand-cream mb-0.5 group-hover:text-brand-gold transition-colors"
                        style={{ fontFamily: "var(--font-serif)" }}
                      >
                        {title}
                      </h4>
                      <p className="text-xs text-brand-muted">{desc}</p>
                    </div>
                    <ArrowRight
                      size={16}
                      className="text-brand-muted group-hover:text-brand-gold group-hover:translate-x-1 transition-all duration-300 flex-shrink-0"
                    />
                  </Link>
                ))}
              </div>

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
