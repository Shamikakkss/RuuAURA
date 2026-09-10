"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  X, LayoutDashboard, Calendar, User, Bell, LogOut,
  Sparkles, Clock, CheckCircle, AlertCircle, XCircle,
  ChevronRight, ArrowRight, Save
} from "lucide-react";
import { useAuth, DEFAULT_USER } from "@/lib/authStore";
import {
  getStoredBookings, updateStoredBooking,
  getStoredNotifications, markAllNotificationsRead,
  SEED_NOTIFICATIONS
} from "@/lib/demoStore";
import { SEED_BOOKINGS } from "@/data/mockData";

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

export default function AccountModal({ isOpen, onClose, initialTab = "dashboard" }) {
  const { user = DEFAULT_USER, logout, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState(initialTab || "dashboard"); // 'dashboard' | 'bookings' | 'profile' | 'notifications'
  
  // State initialization
  const [bookings, setBookings] = useState(SEED_BOOKINGS);
  const [notifications, setNotifications] = useState(SEED_NOTIFICATIONS);
  
  // Profile form state
  const [profileForm, setProfileForm] = useState({
    name: "Jane Sterling",
    email: "jane.sterling@example.com",
    phone: "+94 77 123 4567",
    whatsapp: "+94 77 123 4567",
  });
  const [profileSaved, setProfileSaved] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (initialTab) {
        setActiveTab(initialTab);
      }
      const refresh = window.setTimeout(() => {
        setBookings(getStoredBookings() || []);
        setNotifications(getStoredNotifications() || []);
        setProfileForm({
          name: user?.name || "Jane Sterling",
          email: user?.email || "jane.sterling@example.com",
          phone: user?.phone || "+94 77 123 4567",
          whatsapp: user?.whatsapp || "+94 77 123 4567",
        });
      }, 0);
      document.body.style.overflow = "hidden";
      return () => {
        window.clearTimeout(refresh);
        document.body.style.overflow = "";
      };
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, user]);

  if (!isOpen) return null;

  const upcoming = (bookings || []).filter(
    (b) => b && (b.status === "Confirmed" || b.status === "Pending")
  );
  const past = (bookings || []).filter(
    (b) => b && (b.status === "Completed" || b.status === "Cancelled")
  );
  const next = upcoming[0];
  const unreadNotifs = (notifications || []).filter((n) => n && !n.read);

  const cancelNext = (bookingToCancel) => {
    const target = bookingToCancel || next;
    if (!target || !window.confirm(`Cancel ${target.serviceTitle}?`)) return;
    const updated = updateStoredBooking(target.id, { status: "Cancelled" });
    setBookings(updated || []);
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

  const firstName = user?.name ? user.name.split(" ")[0] : "Jane";

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4 md:p-8">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/85 backdrop-blur-md transition-opacity duration-300"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-6xl h-[92vh] max-h-[900px] bg-[#0c0c0f] text-[#f5f2eb] border border-[#c5a365]/35 rounded-md shadow-2xl flex flex-col overflow-hidden z-10 animate-fade-in">
        
        {/* ── Modal Header Bar ── */}
        <div className="flex items-center justify-between px-5 sm:px-8 py-3.5 border-b border-[#2a2a32] bg-[#111115]">
          <div className="flex items-center gap-4">
            <div className="flex flex-col leading-none">
              <span
                style={{ fontFamily: "var(--font-cinzel)" }}
                className="text-lg sm:text-xl font-bold text-[#f5f2eb] tracking-widest"
              >
                RuuAURA
              </span>
              <span
                style={{ fontFamily: "var(--font-cinzel)" }}
                className="text-[7px] tracking-[0.35em] text-[#c5a365] uppercase mt-0.5"
              >
                Member Sanctuary Portal
              </span>
            </div>
            <span
              style={{ fontFamily: "var(--font-cinzel)" }}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c5a365]/10 border border-[#c5a365]/25 text-[10px] text-[#c5a365] font-medium"
            >
              <Sparkles size={10} />
              {user?.tier || "Sanctuary Member"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-widest font-sans font-medium bg-[#c5a365]/10 hover:bg-[#c5a365] text-[#c5a365] hover:text-[#070708] border border-[#c5a365]/40 rounded-sm transition-all duration-200"
            >
              <X size={14} />
              <span>Return to Sanctuary</span>
            </button>
          </div>
        </div>

        {/* ── Modal Content Area (Sidebar + Main) ── */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden bg-[#070708]">
          
          {/* ── Left Sidebar ── */}
          <aside className="w-full lg:w-64 border-b lg:border-b-0 lg:border-r border-[#2a2a32] bg-[#0e0e12] p-4 sm:p-5 flex flex-col justify-between shrink-0 overflow-y-auto">
            <div className="flex flex-col gap-4">
              
              {/* Profile Mini Card */}
              <div className="glass-card rounded-sm p-4 relative overflow-hidden border border-[#c5a365]/20 text-center flex flex-col items-center">
                <div className="w-13 h-13 rounded-full bg-[#c5a365]/15 border border-[#c5a365]/35 flex items-center justify-center mb-2.5">
                  <span
                    className="text-base font-bold text-[#c5a365]"
                    style={{ fontFamily: "var(--font-cinzel)" }}
                  >
                    {user?.initials || "JS"}
                  </span>
                </div>
                <p
                  className="text-sm font-semibold text-[#f5f2eb] leading-snug"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {user?.name || "Jane Sterling"}
                </p>
                <p className="text-[11px] text-[#83838d] mt-0.5 truncate max-w-[180px]">
                  {user?.email || "jane.sterling@example.com"}
                </p>
              </div>

              {/* Navigation Tabs */}
              <nav className="flex flex-row lg:flex-col gap-1.5 overflow-x-auto">
                {[
                  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
                  { id: "bookings", label: "My Bookings", icon: Calendar, count: upcoming.length },
                  { id: "profile", label: "Profile", icon: User },
                  { id: "notifications", label: "Notifications", icon: Bell, count: unreadNotifs.length },
                ].map(({ id, label, icon: Icon, count }) => {
                  const isActive = activeTab === id;
                  return (
                    <button
                      key={id}
                      onClick={() => setActiveTab(id)}
                      className={`flex items-center justify-between px-4 py-3 rounded-sm text-xs tracking-wider uppercase font-sans transition-all duration-200 border-l-2 text-left ${
                        isActive
                          ? "bg-[#c5a365]/15 text-[#c5a365] border-[#c5a365] font-semibold"
                          : "text-[#83838d] hover:text-[#f5f2eb] hover:bg-[#18181c] border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={15} className={isActive ? "text-[#c5a365]" : ""} />
                        <span>{label}</span>
                      </div>
                      {count > 0 && (
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                            isActive
                              ? "bg-[#c5a365] text-[#070708] font-bold"
                              : "bg-[#c5a365]/20 text-[#c5a365]"
                          }`}
                        >
                          {count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Sign Out Button */}
            <div className="pt-4 mt-4 border-t border-[#2a2a32]">
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2.5 text-xs text-[#83838d] hover:text-red-400 hover:bg-red-500/10 w-full px-4 py-3 rounded-sm transition-colors uppercase tracking-wider font-sans border border-transparent hover:border-red-500/20"
              >
                <LogOut size={14} />
                <span>Sign Out</span>
              </button>
            </div>
          </aside>

          {/* ── Right Content Area ── */}
          <main className="flex-1 overflow-y-auto p-5 sm:p-8 bg-[#070708]">
            
            {/* ═════════ TAB 1: DASHBOARD (EXACT http://localhost:3000/account) ═════════ */}
            {activeTab === "dashboard" && (
              <div className="flex flex-col gap-6 max-w-5xl mx-auto">
                
                {/* ── Welcome Banner ── */}
                <div className="relative overflow-hidden rounded-sm border border-[#2a2a32] min-h-[220px] sm:min-h-[260px] flex items-center p-6 sm:p-10">
                  {/* Background image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center saturate-[.9]"
                    style={{
                      backgroundImage:
                        "url('https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1600&auto=format&fit=crop')",
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#070708]/95 via-[#070708]/65 to-[#070708]/30" />
                  
                  {/* Decorative crossed gold lines */}
                  <svg
                    className="absolute -top-16 left-[6%] w-32 h-[150%] opacity-40 pointer-events-none"
                    viewBox="0 0 100 300"
                    aria-hidden="true"
                  >
                    <line x1="0" y1="0" x2="100" y2="300" stroke="#c5a365" strokeWidth="1" />
                    <line x1="100" y1="0" x2="0" y2="300" stroke="#c5a365" strokeWidth="1" />
                  </svg>

                  <div className="relative z-10">
                    <p
                      className="text-[11px] tracking-[0.3em] uppercase text-[#c5a365] mb-3 font-semibold"
                      style={{ fontFamily: "var(--font-cinzel)" }}
                    >
                      Sanctuary Member Dashboard
                    </p>
                    <h1
                      className="font-semibold text-[#f5f2eb] leading-[1.05] mb-3 text-3xl sm:text-4xl"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      Welcome back,
                      <em className="block italic font-medium">{firstName}.</em>
                    </h1>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-[#c8c4bc]">
                      <span>Member since 2024</span>
                      <span className="inline-block w-px h-3 bg-[#2a2a32]" />
                      <span>{bookings.length} appointments</span>
                    </div>
                  </div>
                </div>

                {/* ── Stats Cards ── */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { label: "Total Bookings", value: bookings.length, icon: Calendar },
                    { label: "Upcoming", value: upcoming.length, icon: Clock },
                    {
                      label: "Completed",
                      value: bookings.filter((b) => b.status === "Completed").length,
                      icon: CheckCircle,
                    },
                    { label: "Notifications", value: `${unreadNotifs.length} Unread`, icon: Bell },
                  ].map(({ label, value, icon: Icon }) => (
                    <div
                      key={label}
                      className="glass-card rounded-sm p-5 text-center group hover:border-[#c5a365]/30 transition-all duration-300 border border-[#2a2a32] bg-[#111115]"
                    >
                      <div className="w-9 h-9 rounded-full bg-[#c5a365]/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-[#c5a365]/20 transition-colors">
                        <Icon size={16} className="text-[#c5a365]" />
                      </div>
                      <p
                        className="text-2xl font-bold text-[#f5f2eb] mb-1"
                        style={{ fontFamily: "var(--font-cinzel)" }}
                      >
                        {value}
                      </p>
                      <p className="text-xs text-[#83838d] leading-snug">{label}</p>
                    </div>
                  ))}
                </div>

                {/* ── Next Appointment Card ── */}
                {next ? (
                  <div className="glass-card rounded-sm p-6 relative overflow-hidden border border-[#2a2a32] bg-[#111115]">
                    <div className="absolute top-0 left-0 right-0 h-px gold-line" />
                    <div className="pointer-events-none absolute top-0 right-0 w-56 h-40 bg-[#c5a365]/5 blur-[60px] rounded-full" />

                    <div className="flex items-center justify-between mb-5 relative z-10">
                      <p className="section-label" style={{ fontFamily: "var(--font-cinzel)" }}>
                        ✦&nbsp;Next Appointment
                      </p>
                      <button
                        onClick={() => setActiveTab("bookings")}
                        className="text-xs text-[#83838d] hover:text-[#c5a365] transition-colors flex items-center gap-1"
                      >
                        View all <ChevronRight size={12} />
                      </button>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between relative z-10">
                      <div className="min-w-0 flex-1">
                        <h3
                          className="text-xl font-semibold text-[#f5f2eb] mb-1"
                          style={{ fontFamily: "var(--font-serif)" }}
                        >
                          {next.serviceTitle}
                        </h3>
                        <p className="text-sm text-[#83838d] mb-4">
                          with {next.artisanName || next.artisan || "Master Artisan"} · {next.duration}
                        </p>
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="inline-flex items-center gap-1.5 text-sm text-[#c8c4bc]">
                            <Calendar size={13} className="text-[#c5a365] shrink-0" />
                            {next.date}
                          </span>
                          <span className="inline-flex items-center gap-1.5 text-sm text-[#c8c4bc]">
                            <Clock size={13} className="text-[#c5a365] shrink-0" />
                            {next.time}
                          </span>
                          <StatusBadge status={next.status} />
                        </div>
                      </div>

                      <div className="flex gap-3 flex-shrink-0">
                        <button
                          onClick={() => cancelNext(next)}
                          className="btn-luxury border border-[#2a2a32] text-[#83838d] px-5 py-2.5 rounded-sm hover:border-red-400/50 hover:text-red-400 text-xs"
                        >
                          Cancel
                        </button>
                        <Link
                          href="/booking"
                          onClick={onClose}
                          className="btn-luxury bg-[#c5a365] text-[#070708] px-5 py-2.5 rounded-sm hover:bg-[#e2c88f] text-xs font-semibold"
                        >
                          Reschedule
                        </Link>
                      </div>
                    </div>

                    <p
                      className="mt-5 pt-4 border-t border-[#2a2a32]/60 text-[10px] tracking-widest uppercase text-[#83838d]/60 relative z-10"
                      style={{ fontFamily: "var(--font-cinzel)" }}
                    >
                      Ref: {next.id}
                    </p>
                  </div>
                ) : (
                  <div className="glass-card rounded-sm p-10 flex flex-col items-center text-center border border-[#2a2a32] bg-[#111115]">
                    <div className="w-14 h-14 rounded-full bg-[#c5a365]/10 flex items-center justify-center mb-4">
                      <Calendar size={24} className="text-[#c5a365]/60" />
                    </div>
                    <p className="text-[#83838d] text-sm mb-4">No upcoming appointments</p>
                    <Link
                      href="/booking"
                      onClick={onClose}
                      className="btn-luxury bg-[#c5a365] text-[#070708] px-6 py-2.5 rounded-sm hover:bg-[#e2c88f] text-xs font-semibold"
                    >
                      Book Now
                    </Link>
                  </div>
                )}

                {/* ── Personal Profile & Contact Overview ── */}
                <div className="glass-card rounded-sm p-6 border border-[#2a2a32] bg-[#111115]">
                  <div className="flex items-center justify-between mb-4">
                    <p className="section-label" style={{ fontFamily: "var(--font-cinzel)" }}>
                      ✦&nbsp;Member Information & Contact
                    </p>
                    <button
                      onClick={() => setActiveTab("profile")}
                      className="text-xs text-[#c5a365] hover:text-[#e2c88f] transition-colors flex items-center gap-1 font-semibold uppercase tracking-wider"
                    >
                      Edit Details <ChevronRight size={12} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-3.5 rounded-sm bg-[#18181c] border border-white/5">
                      <p className="text-[10px] uppercase tracking-wider text-[#83838d] font-cinzel">Full Name</p>
                      <p className="text-sm font-serif font-medium text-[#f5f2eb] mt-1 truncate">{user?.name || "Jane Sterling"}</p>
                    </div>
                    <div className="p-3.5 rounded-sm bg-[#18181c] border border-white/5">
                      <p className="text-[10px] uppercase tracking-wider text-[#83838d] font-cinzel">Email Address</p>
                      <p className="text-sm font-sans text-[#c8c4bc] mt-1 truncate">{user?.email || "jane.sterling@example.com"}</p>
                    </div>
                    <div className="p-3.5 rounded-sm bg-[#18181c] border border-white/5">
                      <p className="text-[10px] uppercase tracking-wider text-[#83838d] font-cinzel">Mobile Phone</p>
                      <p className="text-sm font-mono text-[#f5f2eb] mt-1">{user?.phone || "+94 77 123 4567"}</p>
                    </div>
                    <div className="p-3.5 rounded-sm bg-[#18181c] border border-white/5">
                      <p className="text-[10px] uppercase tracking-wider text-[#83838d] font-cinzel">WhatsApp</p>
                      <p className="text-sm font-mono text-[#c5a365] mt-1">{user?.whatsapp || "+94 77 123 4567"}</p>
                    </div>
                  </div>
                </div>

                {/* ── Quick Actions ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link
                    href="/booking"
                    onClick={onClose}
                    className="glass-card rounded-sm p-6 flex items-center gap-4 group hover:border-[#c5a365]/40 transition-all duration-300 border border-[#2a2a32] bg-[#111115]"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#c5a365]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#c5a365]/20 transition-colors">
                      <Calendar size={18} className="text-[#c5a365]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4
                        className="text-sm font-semibold text-[#f5f2eb] mb-0.5 group-hover:text-[#c5a365] transition-colors"
                        style={{ fontFamily: "var(--font-serif)" }}
                      >
                        Book New Appointment
                      </h4>
                      <p className="text-xs text-[#83838d]">Reserve your next sanctuary session</p>
                    </div>
                    <ArrowRight
                      size={16}
                      className="text-[#83838d] group-hover:text-[#c5a365] group-hover:translate-x-1 transition-all duration-300 flex-shrink-0"
                    />
                  </Link>

                  <button
                    onClick={() => setActiveTab("profile")}
                    className="glass-card rounded-sm p-6 flex items-center gap-4 group hover:border-[#c5a365]/40 transition-all duration-300 border border-[#2a2a32] bg-[#111115] text-left"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#c5a365]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#c5a365]/20 transition-colors">
                      <User size={18} className="text-[#c5a365]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4
                        className="text-sm font-semibold text-[#f5f2eb] mb-0.5 group-hover:text-[#c5a365] transition-colors"
                        style={{ fontFamily: "var(--font-serif)" }}
                      >
                        Edit Contact Details
                      </h4>
                      <p className="text-xs text-[#83838d]">Update phone, WhatsApp & email</p>
                    </div>
                    <ArrowRight
                      size={16}
                      className="text-[#83838d] group-hover:text-[#c5a365] group-hover:translate-x-1 transition-all duration-300 flex-shrink-0"
                    />
                  </button>
                </div>
              </div>
            )}

            {/* ═════════ TAB 2: MY BOOKINGS ═════════ */}
            {activeTab === "bookings" && (
              <div className="flex flex-col gap-6 max-w-5xl mx-auto">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-serif text-[#f5f2eb] font-medium">
                      Your Sanctuary Appointments
                    </h3>
                    <p className="text-xs text-[#83838d] mt-1">
                      Manage your scheduled rituals and view past visits
                    </p>
                  </div>
                  <Link
                    href="/booking"
                    onClick={onClose}
                    className="btn-luxury bg-[#c5a365] text-[#070708] px-5 py-2.5 rounded-sm hover:bg-[#e2c88f] text-xs font-semibold"
                  >
                    + Book New
                  </Link>
                </div>

                <div className="flex flex-col gap-4">
                  <p
                    style={{ fontFamily: "var(--font-cinzel)" }}
                    className="text-xs tracking-widest uppercase text-[#c5a365] font-semibold"
                  >
                    Upcoming Appointments ({upcoming.length})
                  </p>

                  {upcoming.length === 0 ? (
                    <div className="p-8 text-center border border-dashed border-[#2a2a32] rounded-sm bg-[#111115]">
                      <p className="text-sm text-[#83838d]">No upcoming appointments scheduled.</p>
                    </div>
                  ) : (
                    upcoming.map((b) => (
                      <div
                        key={b.id}
                        className="glass-card rounded-sm p-5 border border-[#2a2a32] bg-[#111115] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div>
                          <div className="flex items-center gap-2.5 mb-1.5">
                            <StatusBadge status={b.status} />
                            <span className="text-xs text-[#83838d]">{b.duration}</span>
                          </div>
                          <h4
                            className="text-lg font-medium text-[#f5f2eb]"
                            style={{ fontFamily: "var(--font-serif)" }}
                          >
                            {b.serviceTitle}
                          </h4>
                          <p className="text-xs text-[#83838d] mt-1">
                            Artisan: <strong className="text-[#f5f2eb]">{b.artisanName || b.artisan || "Master Artisan"}</strong> • {b.date} at {b.time}
                          </p>
                        </div>
                        <button
                          onClick={() => cancelNext(b)}
                          className="text-xs text-red-400 hover:text-red-300 border border-red-500/20 hover:border-red-500/40 px-4 py-2 rounded-sm self-start sm:self-center transition-colors"
                        >
                          Cancel Appointment
                        </button>
                      </div>
                    ))
                  )}
                </div>

                {past.length > 0 && (
                  <div className="flex flex-col gap-4 pt-6 border-t border-[#2a2a32]">
                    <p
                      style={{ fontFamily: "var(--font-cinzel)" }}
                      className="text-xs tracking-widest uppercase text-[#83838d] font-semibold"
                    >
                      Past Appointments ({past.length})
                    </p>
                    {past.map((b) => (
                      <div
                        key={b.id}
                        className="p-4 rounded-sm bg-[#111115]/50 border border-[#2a2a32]/60 flex items-center justify-between opacity-80"
                      >
                        <div>
                          <h4 className="text-sm font-medium text-[#f5f2eb]">{b.serviceTitle}</h4>
                          <p className="text-xs text-[#83838d] mt-0.5">
                            {b.artisanName || b.artisan || "Artisan"} • {b.date} • {b.status}
                          </p>
                        </div>
                        <span className="text-xs font-mono text-[#c5a365]">{b.price}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ═════════ TAB 3: PROFILE ═════════ */}
            {activeTab === "profile" && (
              <div className="flex flex-col gap-6 max-w-2xl mx-auto">
                <div>
                  <h3 className="text-2xl font-serif text-[#f5f2eb] font-medium">
                    Personal Information
                  </h3>
                  <p className="text-xs text-[#83838d] mt-1">
                    Manage your contact details and sanctuary preferences
                  </p>
                </div>

                {profileSaved && (
                  <div className="flex items-center gap-3 p-3.5 bg-green-500/10 border border-green-500/30 rounded-sm text-green-400 text-sm">
                    <CheckCircle size={16} className="shrink-0" />
                    <span>Profile updated successfully.</span>
                  </div>
                )}

                <form onSubmit={handleSaveProfile} className="flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <label
                      style={{ fontFamily: "var(--font-cinzel)" }}
                      className="text-xs tracking-widest uppercase text-[#83838d]"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      className="input-luxury w-full"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      style={{ fontFamily: "var(--font-cinzel)" }}
                      className="text-xs tracking-widest uppercase text-[#83838d]"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={profileForm.email}
                      onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                      className="input-luxury w-full"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label
                        style={{ fontFamily: "var(--font-cinzel)" }}
                        className="text-xs tracking-widest uppercase text-[#83838d]"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={profileForm.phone}
                        onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                        className="input-luxury w-full"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label
                        style={{ fontFamily: "var(--font-cinzel)" }}
                        className="text-xs tracking-widest uppercase text-[#83838d]"
                      >
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
                    className="btn-luxury bg-[#c5a365] text-[#070708] px-8 py-3.5 rounded-sm hover:bg-[#e2c88f] text-xs font-semibold self-start mt-2"
                  >
                    Save Changes
                  </button>
                </form>
              </div>
            )}

            {/* ═════════ TAB 4: NOTIFICATIONS ═════════ */}
            {activeTab === "notifications" && (
              <div className="flex flex-col gap-6 max-w-3xl mx-auto">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-serif text-[#f5f2eb] font-medium">
                      Notifications
                    </h3>
                    <p className="text-xs text-[#83838d] mt-1">
                      {unreadNotifs.length > 0 ? `${unreadNotifs.length} Unread notifications` : "All caught up"}
                    </p>
                  </div>
                  {unreadNotifs.length > 0 && (
                    <button
                      onClick={() => setNotifications(markAllNotificationsRead())}
                      style={{ fontFamily: "var(--font-cinzel)" }}
                      className="text-xs tracking-widest uppercase text-[#c5a365] hover:underline"
                    >
                      Mark All as Read
                    </button>
                  )}
                </div>

                <div className="flex flex-col gap-3">
                  {notifications.length === 0 ? (
                    <div className="p-8 text-center border border-dashed border-[#2a2a32] rounded-sm bg-[#111115]">
                      <p className="text-sm text-[#83838d]">No notifications available.</p>
                    </div>
                  ) : (
                    notifications.map((n) => (
                      <div
                        key={n.id}
                        className={`p-4 rounded-sm border transition-colors ${
                          n.read
                            ? "bg-[#111115]/50 border-[#2a2a32]/40 opacity-70"
                            : "bg-[#111115] border-[#c5a365]/35"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm font-semibold text-[#f5f2eb] mb-1">
                              {n.title}
                            </p>
                            <p className="text-xs text-[#83838d] leading-relaxed">
                              {n.message}
                            </p>
                          </div>
                          <span className="text-[10px] text-[#83838d] shrink-0 font-mono">
                            {n.time}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

          </main>
        </div>
      </div>
    </div>
  );
}
