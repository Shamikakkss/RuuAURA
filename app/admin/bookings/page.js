"use client";
import { useState } from "react";
import AdminSidebar from "../AdminSidebar";
import Link from "next/link";
import { SEED_BOOKINGS } from "@/data/mockData";
import {
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Search,
  Filter,
  Eye,
  Check,
  X,
  Phone,
  Mail,
  User,
} from "lucide-react";

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState(SEED_BOOKINGS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedBooking, setSelectedBooking] = useState(null);

  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.clientName.toLowerCase().includes(search.toLowerCase()) ||
      b.serviceTitle.toLowerCase().includes(search.toLowerCase()) ||
      b.artisanName.toLowerCase().includes(search.toLowerCase()) ||
      b.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || b.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const updateStatus = (id, newStatus) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
    );
    if (selectedBooking && selectedBooking.id === id) {
      setSelectedBooking((prev) => ({ ...prev, status: newStatus }));
    }
  };

  return (
    <div className="min-h-screen bg-brand-darkest text-brand-cream flex">
      <AdminSidebar />

      <main className="flex-1 p-6 md:p-10 overflow-x-hidden">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-brand-border">
          <div>
            <div className="flex items-center gap-2 text-xs text-brand-gold uppercase tracking-widest mb-1">
              <span>Admin Sanctuary</span>
              <span>•</span>
              <span>Appointments</span>
            </div>
            <h1
              style={{ fontFamily: "var(--font-cinzel)" }}
              className="text-2xl md:text-3xl font-light text-brand-cream tracking-wide"
            >
              Booking Management
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/booking"
              target="_blank"
              className="px-4 py-2 bg-brand-gold text-brand-dark text-xs font-semibold tracking-wider uppercase hover:bg-brand-gold-light transition-all rounded"
            >
              + Create New Booking
            </Link>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
          <div className="relative md:col-span-2">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted"
            />
            <input
              type="text"
              placeholder="Search by client, artisan, service or booking ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-brand-surface border border-brand-border rounded px-4 py-3 pl-11 text-sm text-brand-cream focus:outline-none focus:border-brand-gold transition-colors"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter size={16} className="text-brand-muted shrink-0" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-brand-surface border border-brand-border rounded px-4 py-3 text-sm text-brand-cream focus:outline-none focus:border-brand-gold transition-colors cursor-pointer"
            >
              <option value="All">All Statuses ({bookings.length})</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-brand-surface border border-brand-border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-brand-dark text-brand-muted text-xs uppercase tracking-wider border-b border-brand-border">
                <tr>
                  <th className="px-6 py-4">Booking ID</th>
                  <th className="px-6 py-4">Client</th>
                  <th className="px-6 py-4">Service & Artisan</th>
                  <th className="px-6 py-4">Date & Time</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border">
                {filteredBookings.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-brand-muted">
                      No reservations found matching your criteria.
                    </td>
                  </tr>
                ) : (
                  filteredBookings.map((b) => (
                    <tr
                      key={b.id}
                      className="hover:bg-brand-dark/40 transition-colors cursor-pointer"
                      onClick={() => setSelectedBooking(b)}
                    >
                      <td className="px-6 py-4 font-mono text-xs text-brand-gold font-medium">
                        {b.id}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-brand-cream">{b.clientName}</div>
                        <div className="text-xs text-brand-muted">{b.clientPhone}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-brand-cream">{b.serviceTitle}</div>
                        <div className="text-xs text-brand-gold/80">Artisan: {b.artisanName}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-brand-cream">{b.date}</div>
                        <div className="text-xs text-brand-muted flex items-center gap-1">
                          <Clock size={12} /> {b.time} ({b.duration})
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium text-brand-cream">{b.price}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                            b.status === "Confirmed"
                              ? "bg-emerald-950/70 text-emerald-300 border border-emerald-800"
                              : b.status === "Pending"
                              ? "bg-amber-950/70 text-amber-300 border border-amber-800"
                              : b.status === "Completed"
                              ? "bg-blue-950/70 text-blue-300 border border-blue-800"
                              : "bg-red-950/70 text-red-300 border border-red-800"
                          }`}
                        >
                          {b.status === "Confirmed" && <CheckCircle size={12} />}
                          {b.status === "Pending" && <AlertCircle size={12} />}
                          {b.status === "Completed" && <Check size={12} />}
                          {b.status === "Cancelled" && <XCircle size={12} />}
                          {b.status}
                        </span>
                      </td>
                      <td
                        className="px-6 py-4 text-right space-x-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {b.status === "Pending" && (
                          <button
                            onClick={() => updateStatus(b.id, "Confirmed")}
                            title="Approve Booking"
                            className="p-1.5 rounded bg-emerald-900/60 hover:bg-emerald-700 text-emerald-200 transition-colors"
                          >
                            <Check size={14} />
                          </button>
                        )}
                        {b.status !== "Cancelled" && b.status !== "Completed" && (
                          <button
                            onClick={() => updateStatus(b.id, "Cancelled")}
                            title="Cancel Booking"
                            className="p-1.5 rounded bg-red-900/60 hover:bg-red-700 text-red-200 transition-colors"
                          >
                            <X size={14} />
                          </button>
                        )}
                        <button
                          onClick={() => setSelectedBooking(b)}
                          title="View Details"
                          className="p-1.5 rounded bg-brand-dark border border-brand-border hover:border-brand-gold text-brand-muted hover:text-brand-cream transition-colors"
                        >
                          <Eye size={14} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Details Drawer / Modal */}
        {selectedBooking && (
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedBooking(null)}
          >
            <div
              className="bg-brand-surface border border-brand-gold/40 rounded-lg p-6 md:p-8 max-w-lg w-full relative shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedBooking(null)}
                className="absolute top-4 right-4 text-brand-muted hover:text-brand-cream"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-2 text-xs text-brand-gold tracking-widest uppercase mb-2">
                <span>Reservation Details</span>
                <span>•</span>
                <span className="font-mono">{selectedBooking.id}</span>
              </div>

              <h2
                style={{ fontFamily: "var(--font-cinzel)" }}
                className="text-xl font-medium text-brand-cream mb-4"
              >
                {selectedBooking.serviceTitle}
              </h2>

              <div className="space-y-4 text-sm divide-y divide-brand-border">
                <div className="pt-2 grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-xs text-brand-muted block">Status</span>
                    <span className="font-semibold text-brand-gold">
                      {selectedBooking.status}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-brand-muted block">Price</span>
                    <span className="font-semibold text-brand-cream">
                      {selectedBooking.price}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-brand-muted block">Date</span>
                    <span className="text-brand-cream">{selectedBooking.date}</span>
                  </div>
                  <div>
                    <span className="text-xs text-brand-muted block">Time & Duration</span>
                    <span className="text-brand-cream">
                      {selectedBooking.time} ({selectedBooking.duration})
                    </span>
                  </div>
                </div>

                <div className="pt-4 space-y-2">
                  <span className="text-xs text-brand-muted block uppercase tracking-wider">
                    Client Information
                  </span>
                  <div className="flex items-center gap-2 text-brand-cream">
                    <User size={14} className="text-brand-gold" /> {selectedBooking.clientName}
                  </div>
                  <div className="flex items-center gap-2 text-brand-cream">
                    <Mail size={14} className="text-brand-gold" /> {selectedBooking.clientEmail}
                  </div>
                  <div className="flex items-center gap-2 text-brand-cream">
                    <Phone size={14} className="text-brand-gold" /> {selectedBooking.clientPhone}
                  </div>
                </div>

                <div className="pt-4">
                  <span className="text-xs text-brand-muted block uppercase tracking-wider mb-1">
                    Special Client Notes
                  </span>
                  <p className="text-brand-cream/80 bg-brand-dark p-3 rounded text-xs leading-relaxed italic">
                    "{selectedBooking.notes || "No special requests provided."}"
                  </p>
                </div>

                <div className="pt-4 flex items-center justify-between gap-3">
                  <div className="flex gap-2">
                    {selectedBooking.status !== "Confirmed" && (
                      <button
                        onClick={() => updateStatus(selectedBooking.id, "Confirmed")}
                        className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-xs text-white rounded font-medium transition-colors"
                      >
                        Set Confirmed
                      </button>
                    )}
                    {selectedBooking.status !== "Completed" && (
                      <button
                        onClick={() => updateStatus(selectedBooking.id, "Completed")}
                        className="px-3 py-1.5 bg-blue-700 hover:bg-blue-600 text-xs text-white rounded font-medium transition-colors"
                      >
                        Set Completed
                      </button>
                    )}
                    {selectedBooking.status !== "Cancelled" && (
                      <button
                        onClick={() => updateStatus(selectedBooking.id, "Cancelled")}
                        className="px-3 py-1.5 bg-red-800 hover:bg-red-700 text-xs text-white rounded font-medium transition-colors"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                  <button
                    onClick={() => setSelectedBooking(null)}
                    className="text-xs text-brand-muted hover:text-brand-cream px-3 py-1.5"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
