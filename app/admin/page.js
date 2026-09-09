import AdminSidebar from "./AdminSidebar";
import Link from "next/link";
import { Calendar, Clock, CheckCircle, AlertCircle, TrendingUp, Users, Scissors, ChevronRight } from "lucide-react";
import { SEED_BOOKINGS, SERVICES, ARTISANS } from "@/data/mockData";

export const metadata = {
  title: "Admin Dashboard — RuuAURA",
  description: "RuuAURA admin dashboard for managing bookings, services, and staff.",
};

function StatusBadge({ status }) {
  const map = {
    Confirmed: "badge-confirmed",
    Pending: "badge-pending",
    Completed: "badge-completed",
    Cancelled: "badge-cancelled",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-sm text-xs font-medium ${map[status] || map.Pending}`}
          style={{ fontFamily: "var(--font-cinzel)" }}>
      {status}
    </span>
  );
}

export default function AdminDashboard() {
  const pending = SEED_BOOKINGS.filter((b) => b.status === "Pending");
  const confirmed = SEED_BOOKINGS.filter((b) => b.status === "Confirmed");
  const completed = SEED_BOOKINGS.filter((b) => b.status === "Completed");

  const stats = [
    { label: "Pending Bookings", value: pending.length, icon: AlertCircle, color: "text-yellow-400" },
    { label: "Confirmed Today", value: confirmed.length, icon: CheckCircle, color: "text-green-400" },
    { label: "Services Offered", value: SERVICES.length, icon: Scissors, color: "text-brand-gold" },
    { label: "Active Artisans", value: ARTISANS.length, icon: Users, color: "text-blue-400" },
  ];

  return (
    <div className="flex min-h-screen bg-brand-black">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-brand-dark border-b border-brand-border px-8 py-4 flex items-center justify-between">
          <div>
            <p style={{ fontFamily: "var(--font-cinzel)" }}
               className="text-xs tracking-widest uppercase text-brand-muted">Admin</p>
            <h1 style={{ fontFamily: "var(--font-serif)" }}
                className="text-xl font-semibold text-brand-cream">Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-brand-muted hidden md:block">
              {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
            </span>
            <Link href="/booking"
                  className="btn-luxury bg-brand-gold text-brand-black px-5 py-2.5 rounded-sm hover:bg-brand-gold-light text-xs">
              + New Booking
            </Link>
          </div>
        </header>

        {/* Main */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="glass-card rounded-sm p-5">
                <Icon size={20} className={`${color} mb-3`} />
                <p style={{ fontFamily: "var(--font-cinzel)" }}
                   className="text-3xl font-bold text-brand-cream mb-1">{value}</p>
                <p className="text-xs text-brand-muted">{label}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Recent Bookings Table */}
            <div className="xl:col-span-2 glass-card rounded-sm overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-brand-border">
                <p style={{ fontFamily: "var(--font-cinzel)" }}
                   className="text-xs tracking-widest uppercase text-brand-gold">Recent Bookings</p>
                <Link href="/admin/bookings"
                      className="text-xs text-brand-muted hover:text-brand-gold transition-colors flex items-center gap-1">
                  View All <ChevronRight size={12} />
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-brand-border/50">
                      {["Ref", "Client", "Service", "Date", "Artisan", "Status"].map((h) => (
                        <th key={h} className="px-4 py-3 text-left"
                            style={{ fontFamily: "var(--font-cinzel)" }}>
                          <span className="text-[9px] tracking-widest uppercase text-brand-muted">{h}</span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {SEED_BOOKINGS.map((b, i) => (
                      <tr key={b.id} className={`border-b border-brand-border/30 hover:bg-brand-gold/3 transition-colors ${
                        i === SEED_BOOKINGS.length - 1 ? "border-b-0" : ""
                      }`}>
                        <td className="px-4 py-3.5">
                          <span style={{ fontFamily: "var(--font-cinzel)" }}
                                className="text-xs text-brand-gold">{b.id}</span>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className="text-sm text-brand-cream">{b.clientName}</span>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className="text-sm text-brand-muted max-w-[160px] block truncate">{b.serviceTitle}</span>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className="text-xs text-brand-muted whitespace-nowrap">
                            {new Date(b.date + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })} · {b.time}
                          </span>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className="text-xs text-brand-muted">{b.artisanName}</span>
                        </td>
                        <td className="px-4 py-3.5">
                          <StatusBadge status={b.status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Info */}
            <div className="flex flex-col gap-4">
              {/* Pending Actions */}
              <div className="glass-card rounded-sm p-5">
                <p style={{ fontFamily: "var(--font-cinzel)" }}
                   className="text-xs tracking-widest uppercase text-brand-gold mb-4">
                  Pending Actions
                </p>
                {pending.length === 0 ? (
                  <p className="text-sm text-brand-muted">No pending bookings.</p>
                ) : (
                  <div className="flex flex-col gap-3">
                    {pending.map((b) => (
                      <div key={b.id} className="p-3 bg-brand-warning/5 border border-brand-warning/20 rounded-sm">
                        <p className="text-sm text-brand-cream font-medium mb-0.5">{b.clientName}</p>
                        <p className="text-xs text-brand-muted">{b.serviceTitle}</p>
                        <p style={{ fontFamily: "var(--font-cinzel)" }}
                           className="text-[10px] tracking-widest uppercase text-yellow-400/70 mt-2">{b.id}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Services Summary */}
              <div className="glass-card rounded-sm p-5">
                <p style={{ fontFamily: "var(--font-cinzel)" }}
                   className="text-xs tracking-widest uppercase text-brand-gold mb-4">Top Services</p>
                <div className="flex flex-col gap-3">
                  {SERVICES.slice(0, 4).map((s) => (
                    <div key={s.id} className="flex items-center justify-between gap-3">
                      <span className="text-xs text-brand-muted truncate">{s.title}</span>
                      <span style={{ fontFamily: "var(--font-serif)" }}
                            className="text-sm text-brand-gold font-semibold shrink-0">{s.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
