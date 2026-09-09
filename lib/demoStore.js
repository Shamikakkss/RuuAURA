import { SEED_BOOKINGS } from "@/data/mockData";

export const BOOKING_STORAGE_KEY = "ruuaura_bookings";
export const NOTIFICATION_STORAGE_KEY = "ruuaura_notifications";

const SEED_NOTIFICATIONS = [
  {
    id: "notif-1",
    type: "booking",
    title: "Appointment Confirmed",
    message: "Your Signature Couture Haircut with Elena Rostova on Sep 12 at 10:00 AM has been confirmed.",
    time: "2 hours ago",
    read: false,
  },
  {
    id: "notif-2",
    type: "reminder",
    title: "Upcoming Appointment Reminder",
    message: "Reminder: Your Caviar & Gold Radiance Facial with Sophia Chen is on Sep 14 at 2:30 PM.",
    time: "1 day ago",
    read: false,
  },
  {
    id: "notif-3",
    type: "info",
    title: "Welcome to RuuAURA",
    message: "Thank you for joining RuuAURA Beauty Sanctuary. Book your first appointment to begin your journey.",
    time: "3 days ago",
    read: true,
  },
];

function readJson(key, fallback) {
  if (typeof window === "undefined") return fallback;
  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function getStoredBookings() {
  return readJson(BOOKING_STORAGE_KEY, SEED_BOOKINGS);
}

export function saveBookings(bookings) {
  writeJson(BOOKING_STORAGE_KEY, bookings);
  return bookings;
}

export function addStoredBooking(booking) {
  return saveBookings([booking, ...getStoredBookings()]);
}

export function updateStoredBooking(id, changes) {
  return saveBookings(
    getStoredBookings().map((booking) =>
      booking.id === id ? { ...booking, ...changes } : booking
    )
  );
}

export function getStoredNotifications() {
  return readJson(NOTIFICATION_STORAGE_KEY, SEED_NOTIFICATIONS);
}

export function saveNotifications(notifications) {
  writeJson(NOTIFICATION_STORAGE_KEY, notifications);
  return notifications;
}

export function addStoredNotification(notification) {
  return saveNotifications([notification, ...getStoredNotifications()]);
}

export function markAllNotificationsRead() {
  return saveNotifications(
    getStoredNotifications().map((notification) => ({
      ...notification,
      read: true,
    }))
  );
}
