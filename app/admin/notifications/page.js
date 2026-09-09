"use client";
import { useState } from "react";
import AdminSidebar from "../AdminSidebar";
import Link from "next/link";
import {
  Bell,
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock,
  Trash2,
  CheckCheck,
} from "lucide-react";

const ADMIN_NOTIFICATIONS_SEED = [
  {
    id: 1,
    title: "New Luxury Reservation Received",
    desc: "Amara Perera requested Caviar & Gold Radiance Facial with Sophia Chen on Sep 14, 2026.",
    time: "10 minutes ago",
    unread: true,
    type: "booking",
    link: "/admin/bookings",
  },
  {
    id: 2,
    title: "Reschedule Request",
    desc: "Jane Sterling submitted a date change for Signature Couture Haircut.",
    time: "2 hours ago",
    unread: true,
    type: "alert",
    link: "/admin/bookings",
  },
  {
    id: 3,
    title: "Appointment Completed",
    desc: "Julian Vance completed Dimensional Balayage for Jane Sterling. Invoice settled.",
    time: "1 day ago",
    unread: false,
    type: "success",
    link: "/admin/bookings",
  },
  {
    id: 4,
    title: "Artisan Schedule Update",
    desc: "Camille Laurent added special bridal consultation slots for the upcoming weekend.",
    time: "2 days ago",
    unread: false,
    type: "info",
    link: "/admin/staff",
  },
];

export default function AdminNotificationsPage() {
  const [notifications, setNotifications] = useState(ADMIN_NOTIFICATIONS_SEED);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const unreadCount = notifications.filter((n) => n.unread).length;

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
              <span>System Alerts</span>
            </div>
            <h1
              style={{ fontFamily: "var(--font-cinzel)" }}
              className="text-2xl md:text-3xl font-light text-brand-cream tracking-wide"
            >
              Activity & Notifications
            </h1>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="flex items-center gap-2 px-4 py-2 bg-brand-surface border border-brand-gold/40 text-xs text-brand-gold hover:bg-brand-gold hover:text-brand-dark transition-all rounded"
            >
              <CheckCheck size={14} /> Mark All as Read ({unreadCount})
            </button>
          )}
        </div>

        {/* Notifications List */}
        <div className="space-y-4 my-8 max-w-4xl">
          {notifications.length === 0 ? (
            <div className="bg-brand-surface border border-brand-border rounded-lg p-12 text-center text-brand-muted">
              <Bell size={32} className="mx-auto mb-3 opacity-30" />
              <p>No notifications at this time.</p>
            </div>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                className={`p-5 rounded-lg border transition-all flex items-start gap-4 ${
                  n.unread
                    ? "bg-brand-surface border-brand-gold/40 shadow-sm"
                    : "bg-brand-dark/50 border-brand-border"
                }`}
              >
                <div className="p-2.5 rounded-full bg-brand-dark border border-brand-border shrink-0 mt-0.5">
                  {n.type === "booking" && (
                    <Calendar size={18} className="text-brand-gold" />
                  )}
                  {n.type === "alert" && (
                    <AlertCircle size={18} className="text-amber-400" />
                  )}
                  {n.type === "success" && (
                    <CheckCircle size={18} className="text-emerald-400" />
                  )}
                  {n.type === "info" && (
                    <Clock size={18} className="text-blue-400" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3
                      className={`text-sm font-medium ${
                        n.unread ? "text-brand-cream" : "text-brand-cream/80"
                      }`}
                    >
                      {n.title}
                    </h3>
                    <span className="text-[11px] text-brand-muted shrink-0">
                      {n.time}
                    </span>
                  </div>

                  <p className="text-xs text-brand-muted leading-relaxed mb-3">
                    {n.desc}
                  </p>

                  <div className="flex items-center gap-4">
                    <Link
                      href={n.link}
                      className="text-xs text-brand-gold hover:underline font-medium"
                    >
                      View in Dashboard →
                    </Link>
                  </div>
                </div>

                <button
                  onClick={() => deleteNotification(n.id)}
                  className="p-1.5 text-brand-muted hover:text-red-400 transition-colors shrink-0"
                  title="Dismiss notification"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
