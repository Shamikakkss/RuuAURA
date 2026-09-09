"use client";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronRight,
  ChevronLeft,
  Clock,
  Check,
  CheckCircle,
  Calendar,
  User,
  Star,
} from "lucide-react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import {
  SERVICES,
  ARTISANS,
  SERVICE_CATEGORIES,
  TIME_SLOTS,
} from "@/data/mockData";
import { addStoredBooking, addStoredNotification } from "@/lib/demoStore";

const STEPS = [
  { id: 1, label: "Service" },
  { id: 2, label: "Artisan" },
  { id: 3, label: "Date & Time" },
  { id: 4, label: "Your Details" },
  { id: 5, label: "Review" },
];

function generateBookingId() {
  return "RA-" + new Date().getFullYear() + "-" + Math.floor(1000 + Math.random() * 8999);
}

function BookingContent() {
  const params = useSearchParams();
  const [step, setStep] = useState(1);
  const [booking, setBooking] = useState(() => ({
    service: SERVICES.find((service) => service.id === params.get("service")) || null,
    artisan: ARTISANS.find((artisan) => artisan.id === params.get("artisan")) || null,
    date: "",
    time: "",
    name: "",
    email: "",
    phone: "",
    whatsapp: "",
    notes: "",
  }));
  const [confirmed, setConfirmed] = useState(null);
  const [catFilter, setCatFilter] = useState("all");
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const goNext = () => setStep((s) => Math.min(s + 1, 5));
  const goPrev = () => setStep((s) => Math.max(s - 1, 1));

  const canProceed = () => {
    if (step === 1) return !!booking.service;
    if (step === 2) return true; // artisan is optional
    if (step === 3) return booking.date && booking.time;
    if (step === 4) {
      return booking.name.trim() && booking.email.trim() && booking.phone.trim();
    }
    return true;
  };

  const validateStep4 = () => {
    const errs = {};
    if (!booking.name.trim()) errs.name = "Name is required";
    if (!booking.email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(booking.email)) errs.email = "Invalid email";
    if (!booking.phone.trim()) errs.phone = "Phone is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleConfirm = async () => {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1800));
    const ref = generateBookingId();
    const record = {
      id: ref,
      serviceTitle: booking.service.title,
      price: booking.service.price,
      duration: booking.service.duration,
      artisanName: booking.artisan?.name || "Any Available Artisan",
      date: booking.date,
      time: booking.time,
      clientName: booking.name,
      clientEmail: booking.email,
      clientPhone: booking.phone,
      notes: booking.notes,
      status: "Pending",
      createdAt: new Date().toISOString().split("T")[0],
    };
    addStoredBooking(record);
    addStoredNotification({
      id: `notif-${ref}`,
      type: "booking",
      title: "Booking Request Received",
      message: `Your ${booking.service.title} request for ${booking.date} at ${booking.time} is awaiting confirmation.`,
      time: "Just now",
      read: false,
    });
    setConfirmed({ ...booking, ref, status: "Pending" });
    setSubmitting(false);
  };

  // Get today's date in YYYY-MM-DD
  const [dateRange] = useState(() => {
    const now = new Date();
    const today = now.toISOString().split("T")[0];
    const maxDate = new Date(now.getTime() + 60 * 86400000)
      .toISOString()
      .split("T")[0];
    return { today, maxDate };
  });
  const { today, maxDate } = dateRange;

  if (confirmed) {
    return <BookingSuccess booking={confirmed} />;
  }

  return (
    <div className="min-h-screen bg-brand-black">
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="container-luxury">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="section-label mb-4">Private Appointment</p>
            <h1
              style={{ fontFamily: "var(--font-serif)" }}
              className="text-4xl md:text-5xl font-semibold text-brand-cream"
            >
              Reserve Your Session
            </h1>
          </div>

          {/* Stepper */}
          <div className="flex items-center justify-center mb-12 overflow-x-auto pb-2">
            {STEPS.map((s, i) => (
              <div key={s.id} className="flex items-center gap-0">
                <div className="flex flex-col items-center gap-1.5">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 ${
                      step > s.id
                        ? "bg-brand-gold text-brand-black"
                        : step === s.id
                        ? "bg-brand-gold/20 border-2 border-brand-gold text-brand-gold"
                        : "bg-brand-surface border border-brand-border text-brand-muted"
                    }`}
                    style={{ fontFamily: "var(--font-cinzel)" }}
                  >
                    {step > s.id ? <Check size={13} /> : s.id}
                  </div>
                  <span
                    className={`text-[9px] tracking-widest uppercase whitespace-nowrap ${
                      step >= s.id ? "text-brand-gold" : "text-brand-muted"
                    }`}
                    style={{ fontFamily: "var(--font-cinzel)" }}
                  >
                    {s.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className={`w-16 md:w-24 h-px mx-3 mb-4 transition-all duration-300 ${
                      step > s.id ? "bg-brand-gold" : "bg-brand-border"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step Content */}
          <div className="max-w-4xl mx-auto">
            {step === 1 && (
              <ServiceStep
                booking={booking}
                setBooking={setBooking}
                catFilter={catFilter}
                setCatFilter={setCatFilter}
              />
            )}
            {step === 2 && (
              <ArtisanStep booking={booking} setBooking={setBooking} />
            )}
            {step === 3 && (
              <DateTimeStep
                booking={booking}
                setBooking={setBooking}
                today={today}
                maxDate={maxDate}
              />
            )}
            {step === 4 && (
              <DetailsStep
                booking={booking}
                setBooking={setBooking}
                errors={errors}
              />
            )}
            {step === 5 && (
              <ReviewStep booking={booking} />
            )}
          </div>

          {/* Navigation */}
          <div className="max-w-4xl mx-auto mt-10 flex items-center justify-between border-t border-brand-border pt-8">
            <button
              onClick={goPrev}
              disabled={step === 1}
              className="btn-luxury border border-brand-border text-brand-muted px-6 py-3 rounded-sm hover:border-brand-gold hover:text-brand-gold disabled:opacity-30 disabled:pointer-events-none text-xs"
            >
              <ChevronLeft size={13} />
              Back
            </button>
            {step < 5 ? (
              <button
                onClick={() => {
                  if (step === 4 && !validateStep4()) return;
                  if (canProceed()) goNext();
                }}
                disabled={!canProceed()}
                className="btn-luxury bg-brand-gold text-brand-black px-8 py-3 rounded-sm hover:bg-brand-gold-light disabled:opacity-40 disabled:cursor-not-allowed text-xs"
              >
                Continue
                <ChevronRight size={13} />
              </button>
            ) : (
              <button
                onClick={handleConfirm}
                disabled={submitting}
                className="btn-luxury bg-brand-gold text-brand-black px-8 py-3 rounded-sm hover:bg-brand-gold-light disabled:opacity-60 text-xs"
              >
                {submitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-brand-black/30 border-t-brand-black rounded-full animate-spin" />
                    Confirming...
                  </span>
                ) : (
                  <>Confirm Booking <Check size={13} /></>
                )}
              </button>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

// ── Step 1: Service Selection ──────────────────────────────────────
function ServiceStep({ booking, setBooking, catFilter, setCatFilter }) {
  const filtered =
    catFilter === "all"
      ? SERVICES
      : SERVICES.filter((s) => s.category === catFilter);

  return (
    <div>
      <h2
        style={{ fontFamily: "var(--font-serif)" }}
        className="text-2xl font-semibold text-brand-cream mb-2"
      >
        Choose Your Service
      </h2>
      <p className="text-sm text-brand-muted mb-6">
        Select the service you&apos;d like to book.
      </p>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {SERVICE_CATEGORIES.map((c) => (
          <button
            key={c.id}
            onClick={() => setCatFilter(c.id)}
            style={{ fontFamily: "var(--font-cinzel)" }}
            className={`text-[10px] tracking-widest uppercase px-4 py-2 border rounded-sm transition-all duration-300 ${
              catFilter === c.id
                ? "bg-brand-gold text-brand-black border-brand-gold"
                : "border-brand-border text-brand-muted hover:border-brand-gold/40 hover:text-brand-cream"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Service Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((service) => {
          const isSelected = booking.service?.id === service.id;
          return (
            <button
              key={service.id}
              onClick={() => setBooking((b) => ({ ...b, service }))}
              className={`flex gap-4 items-start p-4 rounded-sm border text-left transition-all duration-300 group ${
                isSelected
                  ? "border-brand-gold bg-brand-gold/8"
                  : "border-brand-border bg-brand-surface hover:border-brand-gold/40"
              }`}
            >
              <div className="relative w-20 h-20 rounded-sm overflow-hidden flex-shrink-0">
                <Image
                  src={service.fallback}
                  alt={service.title}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h4
                    style={{ fontFamily: "var(--font-serif)" }}
                    className={`text-base font-semibold leading-snug ${
                      isSelected ? "text-brand-gold" : "text-brand-cream"
                    }`}
                  >
                    {service.title}
                  </h4>
                  {isSelected && (
                    <div className="w-5 h-5 bg-brand-gold rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={10} className="text-brand-black" />
                    </div>
                  )}
                </div>
                <p className="text-xs text-brand-muted mt-1 line-clamp-2 leading-relaxed">
                  {service.desc}
                </p>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-xs text-brand-muted flex items-center gap-1">
                    <Clock size={11} className="text-brand-gold" />
                    {service.duration}
                  </span>
                  <span
                    style={{ fontFamily: "var(--font-serif)" }}
                    className="text-base font-semibold text-brand-gold"
                  >
                    {service.price}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Step 2: Artisan Selection ──────────────────────────────────────
function ArtisanStep({ booking, setBooking }) {
  return (
    <div>
      <h2
        style={{ fontFamily: "var(--font-serif)" }}
        className="text-2xl font-semibold text-brand-cream mb-2"
      >
        Choose Your Artisan
      </h2>
      <p className="text-sm text-brand-muted mb-6">
        Select a preferred artisan, or choose &quot;Any Available&quot; for the next available specialist.
      </p>

      {/* Any Available */}
      <button
        onClick={() => setBooking((b) => ({ ...b, artisan: null }))}
        className={`w-full flex items-center gap-4 p-4 mb-4 rounded-sm border text-left transition-all duration-300 ${
          booking.artisan === null
            ? "border-brand-gold bg-brand-gold/8"
            : "border-brand-border bg-brand-surface hover:border-brand-gold/40"
        }`}
      >
        <div className="w-12 h-12 border border-brand-border rounded-full flex items-center justify-center">
          <User size={18} className="text-brand-muted" />
        </div>
        <div className="flex-1">
          <p
            style={{ fontFamily: "var(--font-serif)" }}
            className={`font-semibold ${booking.artisan === null ? "text-brand-gold" : "text-brand-cream"}`}
          >
            Any Available Artisan
          </p>
          <p className="text-xs text-brand-muted mt-0.5">
            We&apos;ll assign the most suitable available specialist for your service.
          </p>
        </div>
        {booking.artisan === null && (
          <div className="w-5 h-5 bg-brand-gold rounded-full flex items-center justify-center shrink-0">
            <Check size={10} className="text-brand-black" />
          </div>
        )}
      </button>

      {/* Artisans */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ARTISANS.map((artisan) => {
          const isSelected = booking.artisan?.id === artisan.id;
          return (
            <button
              key={artisan.id}
              onClick={() => setBooking((b) => ({ ...b, artisan }))}
              className={`flex gap-4 items-start p-4 rounded-sm border text-left transition-all duration-300 ${
                isSelected
                  ? "border-brand-gold bg-brand-gold/8"
                  : "border-brand-border bg-brand-surface hover:border-brand-gold/40"
              }`}
            >
              <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0 border border-brand-border">
                <Image
                  src={artisan.fallback}
                  alt={artisan.name}
                  fill
                  className="object-cover object-top"
                  sizes="56px"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p
                      style={{ fontFamily: "var(--font-serif)" }}
                      className={`font-semibold text-base leading-snug ${
                        isSelected ? "text-brand-gold" : "text-brand-cream"
                      }`}
                    >
                      {artisan.name}
                    </p>
                    <p
                      style={{ fontFamily: "var(--font-cinzel)" }}
                      className="text-[9px] tracking-widest uppercase text-brand-gold mt-0.5"
                    >
                      {artisan.role}
                    </p>
                  </div>
                  {isSelected && (
                    <div className="w-5 h-5 bg-brand-gold rounded-full flex items-center justify-center shrink-0">
                      <Check size={10} className="text-brand-black" />
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <Star size={10} className="text-brand-gold fill-brand-gold" />
                  <span className="text-xs text-brand-muted">{artisan.rating.replace(" ★", "")} · {artisan.exp}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Step 3: Date & Time ──────────────────────────────────────
function DateTimeStep({ booking, setBooking, today, maxDate }) {
  const allSlots = [
    ...TIME_SLOTS.morning.map((t) => ({ t, group: "Morning" })),
    ...TIME_SLOTS.afternoon.map((t) => ({ t, group: "Afternoon" })),
    ...TIME_SLOTS.evening.map((t) => ({ t, group: "Evening" })),
  ];
  const unavailableSlots = booking.date
    ? new Date(`${booking.date}T12:00:00`).getDay() === 1
      ? allSlots.map(({ t }) => t)
      : allSlots.filter((_, index) => (new Date(`${booking.date}T12:00:00`).getDate() + index) % 5 === 0).map(({ t }) => t)
    : [];
  const availableSlots = allSlots.filter(({ t }) => !unavailableSlots.includes(t));

  return (
    <div>
      <h2
        style={{ fontFamily: "var(--font-serif)" }}
        className="text-2xl font-semibold text-brand-cream mb-2"
      >
        Select Date & Time
      </h2>
      <p className="text-sm text-brand-muted mb-8">
        Choose your preferred date and time slot. All appointments are subject to availability.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Date */}
        <div>
          <label
            htmlFor="booking-date"
            style={{ fontFamily: "var(--font-cinzel)" }}
            className="text-xs tracking-widest uppercase text-brand-muted mb-3 block"
          >
            Preferred Date
          </label>
          <input
            id="booking-date"
            type="date"
            min={today}
            max={maxDate}
            value={booking.date}
            onChange={(e) => setBooking((b) => ({ ...b, date: e.target.value, time: "" }))}
            className="input-luxury"
          />
          <p className="text-[11px] text-brand-muted mt-2">
            Appointments are available within the next 60 days. Mondays are reserved for private editorial work.
          </p>
          {booking.date && (
            <p className="text-xs text-brand-gold mt-2 flex items-center gap-1.5">
              <Calendar size={11} />
              {new Date(booking.date + "T12:00:00").toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          )}
        </div>

        {/* Time */}
        <div>
          <p
            style={{ fontFamily: "var(--font-cinzel)" }}
            className="text-xs tracking-widest uppercase text-brand-muted mb-3"
          >
            Available Time Slots
          </p>
          {!booking.date ? (
            <p className="text-sm text-brand-muted py-4">Please select a date first</p>
          ) : (
            <div className="flex flex-col gap-4">
              {availableSlots.length === 0 && (
                <div className="border border-brand-gold/30 bg-brand-gold/5 p-4 text-sm text-brand-gold">
                  No availability remains for this date. Please choose another date.
                </div>
              )}
              {["Morning", "Afternoon", "Evening"].map((group) => {
                const slots = allSlots.filter((s) => s.group === group);
                return (
                  <div key={group}>
                    <p
                      style={{ fontFamily: "var(--font-cinzel)" }}
                      className="text-[9px] tracking-widest uppercase text-brand-muted mb-2"
                    >
                      {group}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {slots.map(({ t }) => (
                        <button
                          key={t}
                          disabled={unavailableSlots.includes(t)}
                          onClick={() => setBooking((b) => ({ ...b, time: t }))}
                          className={`px-4 py-2 text-xs rounded-sm border transition-all duration-300 ${
                            unavailableSlots.includes(t)
                              ? "border-brand-border/40 text-brand-muted/40 line-through cursor-not-allowed"
                              : booking.time === t
                              ? "bg-brand-gold text-brand-black border-brand-gold font-semibold"
                              : "border-brand-border text-brand-muted hover:border-brand-gold/40 hover:text-brand-cream"
                          }`}
                          style={{ fontFamily: "var(--font-cinzel)" }}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Step 4: Customer Details ──────────────────────────────────────
function DetailsStep({ booking, setBooking, errors }) {
  const set = (key) => (e) => setBooking((b) => ({ ...b, [key]: e.target.value }));

  return (
    <div>
      <h2
        style={{ fontFamily: "var(--font-serif)" }}
        className="text-2xl font-semibold text-brand-cream mb-2"
      >
        Your Details
      </h2>
      <p className="text-sm text-brand-muted mb-8">
        Please provide your contact information so we can confirm your appointment.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Full Name *" id="b-name" error={errors.name}>
          <input
            id="b-name"
            type="text"
            placeholder="Your full name"
            value={booking.name}
            onChange={set("name")}
            className={`input-luxury ${errors.name ? "border-brand-error" : ""}`}
          />
        </Field>

        <Field label="Email Address *" id="b-email" error={errors.email}>
          <input
            id="b-email"
            type="email"
            placeholder="your@email.com"
            value={booking.email}
            onChange={set("email")}
            className={`input-luxury ${errors.email ? "border-brand-error" : ""}`}
          />
        </Field>

        <Field label="Phone Number *" id="b-phone" error={errors.phone}>
          <input
            id="b-phone"
            type="tel"
            placeholder="+94 77 000 0000"
            value={booking.phone}
            onChange={set("phone")}
            className={`input-luxury ${errors.phone ? "border-brand-error" : ""}`}
          />
        </Field>

        <Field label="WhatsApp Number (Optional)" id="b-wa">
          <input
            id="b-wa"
            type="tel"
            placeholder="+94 77 000 0000"
            value={booking.whatsapp}
            onChange={set("whatsapp")}
            className="input-luxury"
          />
        </Field>

        <div className="md:col-span-2">
          <Field label="Special Requests / Notes (Optional)" id="b-notes">
            <textarea
              id="b-notes"
              rows={4}
              placeholder="Allergies, preferences, special requests..."
              value={booking.notes}
              onChange={set("notes")}
              className="input-luxury resize-none"
            />
          </Field>
        </div>
      </div>

      <div className="mt-6 p-4 bg-brand-gold/5 border border-brand-gold/20 rounded-sm">
        <p className="text-xs text-brand-muted leading-relaxed">
          <span className="text-brand-gold font-medium">Note:</span> Your WhatsApp number is used for appointment reminders only and will not be used for marketing or authentication purposes. By proceeding, you agree to our booking and cancellation policy.
        </p>
      </div>
    </div>
  );
}

function Field({ label, id, error, children }) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        style={{ fontFamily: "var(--font-cinzel)" }}
        className="text-xs tracking-widest uppercase text-brand-muted"
      >
        {label}
      </label>
      {children}
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}

// ── Step 5: Review ──────────────────────────────────────
function ReviewStep({ booking }) {
  const rows = [
    { label: "Service", value: booking.service?.title || "—" },
    { label: "Duration", value: booking.service?.duration || "—" },
    { label: "Price", value: booking.service?.price || "—" },
    {
      label: "Artisan",
      value: booking.artisan ? booking.artisan.name : "Any Available",
    },
    {
      label: "Date",
      value: booking.date
        ? new Date(booking.date + "T12:00:00").toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : "—",
    },
    { label: "Time", value: booking.time || "—" },
    { label: "Name", value: booking.name || "—" },
    { label: "Email", value: booking.email || "—" },
    { label: "Phone", value: booking.phone || "—" },
    ...(booking.notes ? [{ label: "Notes", value: booking.notes }] : []),
  ];

  return (
    <div>
      <h2
        style={{ fontFamily: "var(--font-serif)" }}
        className="text-2xl font-semibold text-brand-cream mb-2"
      >
        Review Your Booking
      </h2>
      <p className="text-sm text-brand-muted mb-8">
        Please review your appointment details before confirming.
      </p>

      <div className="glass-card rounded-sm overflow-hidden">
        {rows.map((row, i) => (
          <div
            key={row.label}
            className={`flex gap-4 px-6 py-4 ${
              i < rows.length - 1 ? "border-b border-brand-border/40" : ""
            }`}
          >
            <span
              style={{ fontFamily: "var(--font-cinzel)" }}
              className="text-[10px] tracking-widest uppercase text-brand-muted w-28 shrink-0 pt-0.5"
            >
              {row.label}
            </span>
            <span className="text-sm text-brand-cream flex-1">{row.value}</span>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-brand-surface border border-brand-border rounded-sm">
        <p className="text-xs text-brand-muted leading-relaxed">
          By confirming, you agree to our{" "}
          <Link href="/terms" className="text-brand-gold hover:underline">
            Booking Policy
          </Link>
          . A confirmation email will be sent to <strong className="text-brand-cream">{booking.email}</strong> upon booking. Cancellations must be made at least 24 hours in advance.
        </p>
      </div>
    </div>
  );
}

// ── Success Screen ──────────────────────────────────────
function BookingSuccess({ booking }) {
  return (
    <div className="min-h-screen bg-brand-black">
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="container-luxury max-w-xl mx-auto text-center">
          {/* Icon */}
          <div className="w-20 h-20 bg-brand-gold/10 border border-brand-gold/30 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle size={36} className="text-brand-gold" />
          </div>

          <p className="section-label mb-4">Booking Request Received</p>
          <h1
            style={{ fontFamily: "var(--font-serif)" }}
            className="text-4xl font-semibold text-brand-cream mb-4"
          >
            Your Sanctuary Awaits
          </h1>
          <p className="text-brand-muted mb-2">
            A confirmation has been sent to{" "}
            <span className="text-brand-cream font-medium">{booking.email}</span>.
          </p>
          <p className="text-xs text-brand-muted mb-10">
            Booking Reference:{" "}
            <span
              style={{ fontFamily: "var(--font-cinzel)" }}
              className="text-brand-gold font-semibold tracking-widest"
            >
              {booking.ref}
            </span>
          </p>

          {/* Summary Card */}
          <div className="glass-card rounded-sm text-left mb-10 overflow-hidden">
            {[
              { label: "Service", value: booking.service?.title },
              {
                label: "Artisan",
                value: booking.artisan ? booking.artisan.name : "Any Available",
              },
              {
                label: "Date",
                value: new Date(booking.date + "T12:00:00").toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }),
              },
              { label: "Time", value: booking.time },
              { label: "Price", value: booking.service?.price },
              { label: "Status", value: booking.status },
            ].map((r, i, arr) => (
              <div
                key={r.label}
                className={`flex gap-4 px-6 py-4 ${i < arr.length - 1 ? "border-b border-brand-border/40" : ""}`}
              >
                <span
                  style={{ fontFamily: "var(--font-cinzel)" }}
                  className="text-[10px] tracking-widest uppercase text-brand-muted w-24 shrink-0 pt-0.5"
                >
                  {r.label}
                </span>
                <span
                  className={`text-sm font-medium ${
                    r.label === "Status" ? "text-green-400" : "text-brand-cream"
                  }`}
                >
                  {r.value}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="btn-luxury border border-brand-border text-brand-cream-muted px-8 py-4 rounded-sm hover:border-brand-gold hover:text-brand-gold text-xs"
            >
              Return Home
            </Link>
            <Link
              href="/account/bookings"
              className="btn-luxury bg-brand-gold text-brand-black px-8 py-4 rounded-sm hover:bg-brand-gold-light text-xs"
            >
              View My Bookings
              <ChevronRight size={13} />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-brand-black flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-brand-gold/30 border-t-brand-gold rounded-full animate-spin" />
        </div>
      }
    >
      <BookingContent />
    </Suspense>
  );
}
