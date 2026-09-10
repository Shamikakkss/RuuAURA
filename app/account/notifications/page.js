"use client";
import { useState } from "react";
import AccountHeader from "../AccountHeader";
import Footer from "@/app/components/Footer";
import AccountSidebar from "../AccountSidebar";
import { Bell, Calendar, CheckCircle, Info } from "lucide-react";
import { getStoredNotifications, markAllNotificationsRead } from "@/lib/demoStore";

const ICON_MAP = {
  booking: Calendar,
  reminder: Bell,
  info: Info,
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(() => getStoredNotifications());
  const items = notifications;
  const unread = items.filter((n) => !n.read);

  return (
    <>
      <AccountHeader />
      <main className="pt-24 pb-20 bg-brand-black min-h-screen">
        <div className="container-luxury">
          <div className="flex flex-col lg:flex-row gap-8">
            <AccountSidebar />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p style={{ fontFamily: "var(--font-cinzel)" }}
                     className="text-xs tracking-widest uppercase text-brand-gold mb-1">
                    Notifications
                  </p>
                  <h2 style={{ fontFamily: "var(--font-serif)" }}
                      className="text-2xl font-semibold text-brand-cream">
                    {unread.length > 0 ? `${unread.length} Unread` : "All Caught Up"}
                  </h2>
                </div>
                {unread.length > 0 && (
                    <button
                      onClick={() => setNotifications(markAllNotificationsRead())}
                      style={{ fontFamily: "var(--font-cinzel)" }}
                          className="text-xs tracking-widest uppercase text-brand-muted hover:text-brand-gold transition-colors">
                    Mark All Read
                  </button>
                )}
              </div>

              {items.length === 0 ? (
                <div className="glass-card rounded-sm p-12 text-center">
                  <Bell size={36} className="text-brand-muted mx-auto mb-4" />
                  <p style={{ fontFamily: "var(--font-serif)" }} className="text-lg text-brand-cream mb-2">No notifications</p>
                  <p className="text-sm text-brand-muted">You&apos;re all caught up. Check back after your next appointment.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {items.map((notif) => {
                    const Icon = ICON_MAP[notif.type] || Bell;
                    return (
                      <div
                        key={notif.id}
                        className={`glass-card rounded-sm p-5 flex gap-4 transition-all duration-300 hover:border-brand-gold/30 ${
                          !notif.read ? "border-brand-gold/20 bg-brand-gold/3" : ""
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-sm flex items-center justify-center shrink-0 ${
                          !notif.read ? "bg-brand-gold/15 border border-brand-gold/30" : "bg-brand-surface border border-brand-border"
                        }`}>
                          <Icon size={15} className={!notif.read ? "text-brand-gold" : "text-brand-muted"} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-3 mb-1">
                            <h4 className={`text-sm font-medium ${!notif.read ? "text-brand-cream" : "text-brand-muted"}`}>
                              {notif.title}
                            </h4>
                            {!notif.read && (
                              <span className="w-2 h-2 bg-brand-gold rounded-full shrink-0 mt-1.5" />
                            )}
                          </div>
                          <p className="text-xs text-brand-muted leading-relaxed mb-2">
                            {notif.message}
                          </p>
                          <p style={{ fontFamily: "var(--font-cinzel)" }}
                             className="text-[10px] tracking-widest uppercase text-brand-muted/60">
                            {notif.time}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
