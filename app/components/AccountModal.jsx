"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, LayoutDashboard, Calendar, User, Bell, LogOut,
  Sparkles, Clock, CheckCircle, AlertCircle, XCircle,
  Phone, ArrowRight, ShieldCheck, ChevronRight
} from "lucide-react";
import { useAuth } from "@/lib/authStore";
import {
  getStoredBookings, updateStoredBooking,
  getStoredNotifications, markAllNotificationsRead
} from "@/lib/demoStore";

export default function AccountModal({ isOpen, onClose }) {
  const { user, logout, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard"); // 'dashboard' | 'bookings' | 'profile' | 'notifications'
  
  // Bookings state
  const [bookings, setBookings] = useState([]);
  // Notifications state
  const [notifications, setNotifications] = useState([]);
  
  // Profile form
  const [profileForm, setProfileForm] = useState({
    name: user.name || "Jane Sterling",
    email: user.email || "jane.sterling@example.com",
    phone: user.phone || "+94 77 123 4567",
    whatsapp: user.whatsapp || "+94 77 123 4567",
  });
  const [profileSaved, setProfileSaved] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setBookings(getStoredBookings());
      setNotifications(getStoredNotifications());
      setProfileForm({
        name: user.name || "Jane Sterling",
        email: user.email || "jane.sterling@example.com",
        phone: user.phone || "+94 77 123 4567",
        whatsapp: user.whatsapp || "+94 77 123 4567",
      });
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, user]);

  if (!isOpen) return null;

  const upcomingBookings = bookings.filter(
    (b) => b.status === "Confirmed" || b.status === "Pending"
  );
  const pastBookings = bookings.filter(
    (b) => b.status === "Completed" || b.status === "Cancelled"
  );
  const unreadNotifs = notifications.filter((n) => !n.read);

  const handleCancelBooking = (booking) => {
    if (!window.confirm(`Cancel your appointment for ${booking.serviceTitle}?`)) return;
    const updated = updateStoredBooking(booking.id, { status: "Cancelled" });
    setBookings(updated);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile(profileForm);
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
  };

  const handleSignOut = () => {
    logout();
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 md:p-10">
        {/* Backdrop with luxury blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-brand-black/85 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl h-[90vh] max-h-[850px] bg-brand-card/95 border border-brand-gold/30 rounded-md shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden z-10"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-brand-black/60">
            <div className="flex items-center gap-4">
              <div className="flex flex-col">
                <span
                  style={{ fontFamily: "var(--font-cinzel)" }}
                  className="text-lg font-bold text-brand-cream tracking-widest leading-none"
                >
                  RuuAURA
                </span>
                <span
                  style={{ fontFamily: "var(--font-cinzel)" }}
                  className="text-[7px] tracking-[0.3em] text-brand-gold uppercase mt-0.5"
                >
                  Member Sanctuary Portal
                </span>
              </div>
              <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-[10px] text-brand-gold font-sans font-medium">
                <Sparkles size={10} />
                {user.tier || "Sanctuary Member"}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-brand-muted hover:text-brand-cream hover:bg-white/5 border border-white/10 rounded-sm transition-colors uppercase tracking-widest font-sans"
              >
                <X size={14} />
                <span>Return to Sanctuary</span>
              </button>
            </div>
          </div>

          {/* Modal Body: Sidebar Tabs + Content Area */}
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Sidebar Navigation */}
            <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-white/10 bg-brand-dark/50 p-4 md:p-6 flex flex-col justify-between shrink-0">
              <div className="flex flex-col gap-6">
                {/* User Mini Card */}
                <div className="flex items-center gap-3.5 p-3 rounded-sm bg-white/5 border border-white/10">
                  <div className="w-11 h-11 rounded-full bg-brand-gold/15 border border-brand-gold/40 flex items-center justify-center shrink-0">
                    <span
                      className="text-sm font-bold text-brand-gold"
                      style={{ fontFamily: "var(--font-cinzel)" }}
                    >
                      {user.initials || "JS"}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p
                      className="text-sm font-medium text-brand-cream truncate"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      {user.name}
                    </p>
                    <p className="text-[11px] text-brand-muted truncate">
                      {user.email}
                    </p>
                  </div>
                </div>

                {/* Nav tabs */}
                <nav className="flex flex-row md:flex-col gap-1 overflow-x-auto">
                  {[
                    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
                    {
                      id: "bookings",
                      label: "My Bookings",
                      icon: Calendar,
                      badge: upcomingBookings.length,
                    },
                    { id: "profile", label: "Profile", icon: User },
                    {
                      id: "notifications",
                      label: "Notifications",
                      icon: Bell,
                      badge: unreadNotifs.length,
                    },
                  ].map(({ id, label, icon: Icon, badge }) => {
                    const active = activeTab === id;
                    return (
                      <button
                        key={id}
                        onClick={() => setActiveTab(id)}
                        className={`flex items-center justify-between px-3.5 py-3 rounded-sm text-xs tracking-wider uppercase font-sans transition-all duration-200 text-left ${
                          active
                            ? "bg-brand-gold text-brand-black font-semibold shadow-md"
                            : "text-brand-muted hover:text-brand-cream hover:bg-white/5"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon size={15} />
                          <span>{label}</span>
                        </div>
                        {badge > 0 && (
                          <span
                            className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                              active
                                ? "bg-brand-black text-brand-gold font-bold"
                                : "bg-brand-gold/20 text-brand-gold"
                            }`}
                          >
                            {badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Bottom Sign Out */}
              <div className="pt-4 mt-4 border-t border-white/10 hidden md:block">
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-2.5 text-xs text-brand-muted hover:text-red-400 w-full px-3 py-2 transition-colors uppercase tracking-wider font-sans"
                >
                  <LogOut size={14} />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-5 md:p-8 bg-brand-black/40">
              {/* ── TAB 1: DASHBOARD ── */}
              {activeTab === "dashboard" && (
                <div className="flex flex-col gap-6">
                  {/* Hero banner */}
                  <div className="relative overflow-hidden rounded-sm border border-brand-gold/20 p-6 md:p-8 bg-gradient-to-r from-brand-surface via-brand-dark to-brand-card">
                    <div className="relative z-10">
                      <p
                        className="text-[10px] tracking-[0.25em] uppercase text-brand-gold mb-2"
                        style={{ fontFamily: "var(--font-cinzel)" }}
                      >
                        Exclusive Sanctuary Membership
                      </p>
                      <h2
                        className="text-2xl md:text-3xl font-semibold text-brand-cream mb-2"
                        style={{ fontFamily: "var(--font-serif)" }}
                      >
                        Welcome, {user.name.split(" ")[0]}
                      </h2>
                      <p className="text-xs md:text-sm text-brand-muted max-w-xl mb-4">
                        Your private sanctuary portal is ready. View upcoming rituals, schedule personal consultations, and manage your bespoke preferences.
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <button
                          onClick={() => setActiveTab("bookings")}
                          className="bg-brand-gold text-brand-black text-xs uppercase tracking-widest font-semibold px-4 py-2 hover:bg-white transition-colors"
                        >
                          View Appointments
                        </button>
                        <Link
                          href="/booking"
                          onClick={onClose}
                          className="border border-brand-gold/40 text-brand-gold hover:bg-brand-gold/10 text-xs uppercase tracking-widest px-4 py-2 transition-colors"
                        >
                          + Reserve New Ritual
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Summary Stats */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-4 rounded-sm bg-brand-surface/70 border border-white/5">
                      <p className="text-[10px] uppercase text-brand-muted tracking-wider">Total Rituals</p>
                      <p className="text-2xl font-serif text-brand-cream mt-1">{bookings.length}</p>
                    </div>
                    <div className="p-4 rounded-sm bg-brand-surface/70 border border-white/5">
                      <p className="text-[10px] uppercase text-brand-muted tracking-wider">Upcoming</p>
                      <p className="text-2xl font-serif text-brand-gold mt-1">{upcomingBookings.length}</p>
                    </div>
                    <div className="p-4 rounded-sm bg-brand-surface/70 border border-white/5">
                      <p className="text-[10px] uppercase text-brand-muted tracking-wider">Sanctuary Tier</p>
                      <p className="text-sm font-cinzel text-brand-gold mt-2 font-semibold">Gold Member</p>
                    </div>
                    <div className="p-4 rounded-sm bg-brand-surface/70 border border-white/5">
                      <p className="text-[10px] uppercase text-brand-muted tracking-wider">Concierge</p>
                      <p className="text-xs text-brand-cream mt-2 font-mono">+94 77 123 4567</p>
                    </div>
                  </div>

                  {/* Next Up Ritual preview */}
                  <div>
                    <h3
                      className="text-xs uppercase tracking-widest text-brand-gold mb-3 font-semibold"
                      style={{ fontFamily: "var(--font-cinzel)" }}
                    >
                      Next Scheduled Ritual
                    </h3>
                    {upcomingBookings.length > 0 ? (
                      <div className="p-5 rounded-sm bg-brand-card border border-brand-gold/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <span className="text-[10px] uppercase tracking-widest text-brand-gold font-mono">
                            {upcomingBookings[0].status}
                          </span>
                          <h4 className="text-lg font-serif text-brand-cream font-medium mt-1">
                            {upcomingBookings[0].serviceTitle}
                          </h4>
                          <p className="text-xs text-brand-muted mt-1">
                            With {upcomingBookings[0].artisan} • {upcomingBookings[0].date} at {upcomingBookings[0].time}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleCancelBooking(upcomingBookings[0])}
                            className="text-xs text-brand-muted hover:text-red-400 border border-white/10 px-3 py-1.5 transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => setActiveTab("bookings")}
                            className="text-xs bg-brand-gold text-brand-black font-semibold px-4 py-1.5 hover:bg-white transition-colors"
                          >
                            Details
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="p-6 text-center border border-dashed border-white/15 rounded-sm">
                        <p className="text-sm text-brand-muted">No upcoming appointments.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ── TAB 2: MY BOOKINGS ── */}
              {activeTab === "bookings" && (
                <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3
                        className="text-xl font-serif text-brand-cream font-medium"
                      >
                        Your Sanctuary Reservations
                      </h3>
                      <p className="text-xs text-brand-muted">
                        Manage your couture sessions and personal schedules
                      </p>
                    </div>
                    <Link
                      href="/booking"
                      onClick={onClose}
                      className="bg-brand-gold text-brand-black text-xs uppercase tracking-widest font-semibold px-4 py-2 hover:bg-white transition-colors"
                    >
                      + Book Ritual
                    </Link>
                  </div>

                  {/* Upcoming list */}
                  <div className="flex flex-col gap-3">
                    <p className="text-xs uppercase tracking-widest text-brand-gold font-semibold font-cinzel">
                      Upcoming ({upcomingBookings.length})
                    </p>
                    {upcomingBookings.length === 0 ? (
                      <p className="text-xs text-brand-muted italic">No upcoming reservations.</p>
                    ) : (
                      upcomingBookings.map((b) => (
                        <div
                          key={b.id}
                          className="p-4 rounded-sm bg-brand-surface border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-gold/15 text-brand-gold font-mono">
                                {b.status}
                              </span>
                              <span className="text-xs text-brand-muted">{b.duration}</span>
                            </div>
                            <h4 className="text-base font-serif text-brand-cream mt-1">
                              {b.serviceTitle}
                            </h4>
                            <p className="text-xs text-brand-muted mt-1">
                              Artisan: <strong className="text-brand-cream">{b.artisan}</strong> • {b.date} at {b.time}
                            </p>
                          </div>
                          <button
                            onClick={() => handleCancelBooking(b)}
                            className="text-xs text-red-400 hover:text-red-300 border border-red-500/20 hover:border-red-500/40 px-3 py-1.5 self-start sm:self-center transition-colors"
                          >
                            Cancel Appointment
                          </button>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Past list */}
                  {pastBookings.length > 0 && (
                    <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
                      <p className="text-xs uppercase tracking-widest text-brand-muted font-semibold font-cinzel">
                        Past Rituals ({pastBookings.length})
                      </p>
                      {pastBookings.map((b) => (
                        <div
                          key={b.id}
                          className="p-3.5 rounded-sm bg-brand-dark/40 border border-white/5 flex items-center justify-between opacity-75"
                        >
                          <div>
                            <h4 className="text-sm font-serif text-brand-cream">{b.serviceTitle}</h4>
                            <p className="text-[11px] text-brand-muted">
                              {b.artisan} • {b.date} • <span className="font-mono">{b.status}</span>
                            </p>
                          </div>
                          <span className="text-xs font-mono text-brand-gold">{b.price}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* ── TAB 3: PROFILE ── */}
              {activeTab === "profile" && (
                <div className="flex flex-col gap-6 max-w-xl">
                  <div>
                    <h3 className="text-xl font-serif text-brand-cream font-medium">
                      Member Profile & Preferences
                    </h3>
                    <p className="text-xs text-brand-muted">
                      Update your contact information for reservation reminders
                    </p>
                  </div>

                  {profileSaved && (
                    <div className="p-3 bg-brand-gold/15 border border-brand-gold/30 rounded-sm flex items-center gap-2 text-xs text-brand-gold">
                      <CheckCircle size={14} />
                      <span>Profile updated successfully!</span>
                    </div>
                  )}

                  <form onSubmit={handleSaveProfile} className="flex flex-col gap-4">
                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-brand-muted block mb-1.5 font-cinzel">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={profileForm.name}
                        onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                        className="input-luxury w-full"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-brand-muted block mb-1.5 font-cinzel">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={profileForm.email}
                        onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                        className="input-luxury w-full"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[11px] uppercase tracking-wider text-brand-muted block mb-1.5 font-cinzel">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={profileForm.phone}
                          onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                          className="input-luxury w-full"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] uppercase tracking-wider text-brand-muted block mb-1.5 font-cinzel">
                          WhatsApp
                        </label>
                        <input
                          type="tel"
                          value={profileForm.whatsapp}
                          onChange={(e) => setProfileForm({ ...profileForm, whatsapp: e.target.value })}
                          className="input-luxury w-full"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="mt-2 bg-brand-gold text-brand-black text-xs uppercase tracking-widest font-semibold px-6 py-3 hover:bg-white transition-colors self-start"
                    >
                      Save Profile Changes
                    </button>
                  </form>
                </div>
              )}

              {/* ── TAB 4: NOTIFICATIONS ── */}
              {activeTab === "notifications" && (
                <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-serif text-brand-cream font-medium">
                        Sanctuary Notifications
                      </h3>
                      <p className="text-xs text-brand-muted">
                        Appointment confirmations, arrival reminders & updates
                      </p>
                    </div>
                    {unreadNotifs.length > 0 && (
                      <button
                        onClick={() => setNotifications(markAllNotificationsRead())}
                        className="text-xs uppercase tracking-widest text-brand-gold hover:underline"
                      >
                        Mark All as Read
                      </button>
                    )}
                  </div>

                  <div className="flex flex-col gap-3">
                    {notifications.length === 0 ? (
                      <p className="text-xs text-brand-muted italic">No notifications.</p>
                    ) : (
                      notifications.map((n) => (
                        <div
                          key={n.id}
                          className={`p-4 rounded-sm border transition-colors ${
                            n.read
                              ? "bg-brand-dark/30 border-white/5 opacity-80"
                              : "bg-brand-surface border-brand-gold/30"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="text-xs font-serif font-semibold text-brand-cream">
                                {n.title}
                              </p>
                              <p className="text-xs text-brand-muted mt-1 leading-relaxed">
                                {n.message}
                              </p>
                            </div>
                            <span className="text-[10px] text-brand-muted shrink-0 font-mono">
                              {n.time}
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
