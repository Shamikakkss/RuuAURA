import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import AccountSidebar from "../AccountSidebar";
import Link from "next/link";
import { Calendar, Clock, ChevronRight, CheckCircle, AlertCircle, XCircle } from "lucide-react";
import { SEED_BOOKINGS } from "@/data/mockData";

export const metadata = {
  title: "My Bookings — RuuAURA Account",
};

function StatusBadge({ status }) {
  const map = {
    Confirmed: { cls: "badge-confirmed", icon: CheckCircle },
    Pending: { cls: "badge-pending", icon: AlertCircle },
    Completed: { cls: "badge-completed", icon: CheckCircle },
    Cancelled: { cls: "badge-cancelled", icon: XCircle },
  };
  const { cls, icon: Icon } = map[status] || map.Pending;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-xs font-medium ${cls}`}
          style={{ fontFamily: "var(--font-cinzel)" }}>
      <Icon size={11} />
      {status}
    </span>
  );
}

export default function BookingsPage() {
  const upcoming = SEED_BOOKINGS.filter((b) => b.status === "Confirmed" || b.status === "Pending");
  const past = SEED_BOOKINGS.filter((b) => b.status === "Completed" || b.status === "Cancelled");

  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20 bg-brand-black min-h-screen">
        <div className="container-luxury">
          <div className="flex flex-col lg:flex-row gap-8">
            <AccountSidebar />
            <div className="flex-1 flex flex-col gap-8">
              {/* Upcoming */}
              <div>
                <div className="flex items-center justify-between mb-5">
                  <p style={{ fontFamily: "var(--font-cinzel)" }}
                     className="text-xs tracking-widest uppercase text-brand-gold">
                    Upcoming Appointments
                  </p>
                  <Link href="/booking"
                        className="btn-luxury bg-brand-gold text-brand-black px-5 py-2.5 rounded-sm hover:bg-brand-gold-light text-xs">
                    + Book New
                  </Link>
                </div>
                {upcoming.length === 0 ? (
                  <EmptyState
                    title="No upcoming appointments"
                    desc="You don't have any scheduled appointments. Book your next sanctuary session."
                    cta="Book Now"
                    ctaHref="/booking"
                  />
                ) : (
                  <div className="flex flex-col gap-4">
                    {upcoming.map((b) => <BookingCard key={b.id} booking={b} />)}
                  </div>
                )}
              </div>

              {/* Past */}
              <div>
                <p style={{ fontFamily: "var(--font-cinzel)" }}
                   className="text-xs tracking-widest uppercase text-brand-muted mb-5">
                  Past Appointments
                </p>
                {past.length === 0 ? (
                  <p className="text-sm text-brand-muted py-4">No past appointments.</p>
                ) : (
                  <div className="flex flex-col gap-4">
                    {past.map((b) => <BookingCard key={b.id} booking={b} isPast />)}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function BookingCard({ booking, isPast = false }) {
  return (
    <div className={`glass-card rounded-sm p-6 ${isPast ? "opacity-70" : ""}`}>
      <div className="flex flex-col md:flex-row md:items-center gap-5 justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h3 style={{ fontFamily: "var(--font-serif)" }}
                className="text-lg font-semibold text-brand-cream">
              {booking.serviceTitle}
            </h3>
            <StatusBadge status={booking.status} />
          </div>
          <p className="text-sm text-brand-muted mb-3">
            with {booking.artisanName} · {booking.duration} · {booking.price}
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-brand-muted">
            <span className="flex items-center gap-1.5">
              <Calendar size={13} className="text-brand-gold" />
              {new Date(booking.date + "T12:00:00").toLocaleDateString("en-US", {
                weekday: "short", month: "short", day: "numeric", year: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={13} className="text-brand-gold" />
              {booking.time}
            </span>
          </div>
          <p style={{ fontFamily: "var(--font-cinzel)" }}
             className="text-[10px] tracking-widest uppercase text-brand-muted mt-3">
            {booking.id}
          </p>
        </div>

        {!isPast && (
          <div className="flex gap-3 shrink-0">
            <button className="btn-luxury border border-brand-border text-brand-muted px-4 py-2.5 rounded-sm hover:border-red-400/40 hover:text-red-400 text-xs">
              Cancel
            </button>
            <Link href="/booking"
                  className="btn-luxury border border-brand-gold/40 text-brand-gold px-4 py-2.5 rounded-sm hover:bg-brand-gold hover:text-brand-black text-xs">
              Reschedule
            </Link>
          </div>
        )}
        {isPast && (
          <Link href="/booking"
                className="btn-luxury bg-brand-gold/10 border border-brand-gold/30 text-brand-gold px-5 py-2.5 rounded-sm hover:bg-brand-gold hover:text-brand-black text-xs flex-shrink-0">
            Book Again
          </Link>
        )}
      </div>
    </div>
  );
}

function EmptyState({ title, desc, cta, ctaHref }) {
  return (
    <div className="glass-card rounded-sm p-12 text-center">
      <Calendar size={36} className="text-brand-muted mx-auto mb-4" />
      <h3 style={{ fontFamily: "var(--font-serif)" }} className="text-lg text-brand-cream mb-2">{title}</h3>
      <p className="text-sm text-brand-muted mb-6 max-w-xs mx-auto">{desc}</p>
      <Link href={ctaHref}
            className="btn-luxury bg-brand-gold text-brand-black px-6 py-3 rounded-sm hover:bg-brand-gold-light text-xs">
        {cta} <ChevronRight size={12} />
      </Link>
    </div>
  );
}
