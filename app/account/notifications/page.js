"use client";
import { useState, useEffect } from "react";
import AccountPortalShell from "../AccountPortalShell";
import { Bell, Calendar, Info } from "lucide-react";
import { getStoredNotifications, markAllNotificationsRead, SEED_NOTIFICATIONS } from "@/lib/demoStore";

const ICONS = { booking: Calendar, reminder: Bell, info: Info };

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(SEED_NOTIFICATIONS);

  useEffect(() => {
    setNotifications(getStoredNotifications());
  }, []);
  const unread = notifications.filter((notification) => !notification.read).length;
  return <AccountPortalShell><div className="mx-auto max-w-5xl"><div className="mb-8 flex items-end justify-between border-b border-brand-border pb-6"><div><p className="mb-2 text-[10px] uppercase tracking-[0.25em] text-brand-gold">Member updates</p><h1 className="text-3xl text-brand-cream" style={{ fontFamily: "var(--font-serif)" }}>Notifications</h1><p className="mt-2 text-sm text-brand-muted">{unread} unread notifications</p></div>{unread > 0 && <button onClick={() => setNotifications(markAllNotificationsRead())} className="text-[10px] uppercase tracking-widest text-brand-gold hover:text-brand-cream">Mark all as read</button>}</div><div className="space-y-3">{notifications.map((notification) => { const Icon = ICONS[notification.type] || Bell; return <article key={notification.id} className={`flex gap-4 border p-5 ${notification.read ? "border-brand-border bg-brand-surface/40" : "border-brand-gold/30 bg-brand-surface"}`}><div className={`flex h-9 w-9 shrink-0 items-center justify-center border ${notification.read ? "border-brand-border text-brand-muted" : "border-brand-gold/30 bg-brand-gold/10 text-brand-gold"}`}><Icon size={15} /></div><div className="min-w-0 flex-1"><div className="flex justify-between gap-3"><h2 className={`text-sm font-semibold ${notification.read ? "text-brand-muted" : "text-brand-cream"}`}>{notification.title}</h2><span className="shrink-0 text-[10px] text-brand-muted">{notification.time}</span></div><p className="mt-2 text-xs leading-relaxed text-brand-muted">{notification.message}</p></div></article>; })}</div></div></AccountPortalShell>;
}
