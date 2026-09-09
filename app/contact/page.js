"use client";
import { useState } from "react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, AlertCircle } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));
    setStatus("success");
  };

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-40 pb-20 bg-brand-dark overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(197,163,101,0.07)_0%,transparent_55%)]" />
          <div className="absolute top-0 left-0 right-0 gold-line" />
          <div className="container-luxury relative z-10 text-center">
            <p className="section-label mb-5">Reach Out</p>
            <h1
              style={{ fontFamily: "var(--font-serif)" }}
              className="text-5xl md:text-6xl font-semibold text-brand-cream mb-6"
            >
              Contact the Sanctuary
            </h1>
            <p className="text-brand-muted max-w-lg mx-auto text-lg leading-relaxed">
              We'd love to hear from you. Send us a message and a member of the RuuAURA team will be in touch within one business day.
            </p>
          </div>
        </section>

        <section className="section-pad bg-brand-black">
          <div className="container-luxury">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              {/* Info */}
              <div className="lg:col-span-2 flex flex-col gap-8">
                <div>
                  <p className="section-label mb-6">Our Details</p>
                  <div className="flex flex-col gap-6">
                    {[
                      {
                        icon: MapPin,
                        label: "Address",
                        content: "42 Rosmead Place, Colombo 07\nSri Lanka",
                      },
                      {
                        icon: Phone,
                        label: "Phone",
                        content: "+94 11 234 5678",
                        href: "tel:+94112345678",
                      },
                      {
                        icon: Mail,
                        label: "Email",
                        content: "hello@ruuaura.lk",
                        href: "mailto:hello@ruuaura.lk",
                      },
                    ].map(({ icon: Icon, label, content, href }) => (
                      <div key={label} className="flex gap-4">
                        <div className="w-10 h-10 border border-brand-gold/30 flex items-center justify-center rounded-sm shrink-0">
                          <Icon size={15} className="text-brand-gold" />
                        </div>
                        <div>
                          <p
                            style={{ fontFamily: "var(--font-cinzel)" }}
                            className="text-[9px] tracking-widest uppercase text-brand-muted mb-1"
                          >
                            {label}
                          </p>
                          {href ? (
                            <a
                              href={href}
                              className="text-sm text-brand-cream-muted hover:text-brand-gold transition-colors whitespace-pre-line"
                            >
                              {content}
                            </a>
                          ) : (
                            <p className="text-sm text-brand-cream-muted whitespace-pre-line">{content}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hours */}
                <div className="glass-card rounded-sm p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <Clock size={15} className="text-brand-gold" />
                    <p
                      style={{ fontFamily: "var(--font-cinzel)" }}
                      className="text-xs tracking-widest uppercase text-brand-gold"
                    >
                      Opening Hours
                    </p>
                  </div>
                  <div className="flex flex-col gap-3">
                    {[
                      { day: "Monday – Friday", time: "10:00 AM – 8:00 PM" },
                      { day: "Saturday", time: "9:00 AM – 9:00 PM" },
                      { day: "Sunday", time: "10:00 AM – 6:00 PM" },
                    ].map((h) => (
                      <div key={h.day} className="flex justify-between text-sm">
                        <span className="text-brand-muted">{h.day}</span>
                        <span className="text-brand-cream-muted font-medium">{h.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Form */}
              <div className="lg:col-span-3">
                {status === "success" ? (
                  <div className="glass-card rounded-sm p-10 flex flex-col items-center justify-center text-center min-h-[400px]">
                    <div className="w-16 h-16 bg-brand-success/15 border border-brand-success/30 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle size={28} className="text-green-400" />
                    </div>
                    <h3
                      style={{ fontFamily: "var(--font-serif)" }}
                      className="text-2xl font-semibold text-brand-cream mb-3"
                    >
                      Message Received
                    </h3>
                    <p className="text-brand-muted max-w-sm leading-relaxed mb-6">
                      Thank you for reaching out. A member of the RuuAURA team will be in touch with you within one business day.
                    </p>
                    <button
                      onClick={() => { setStatus("idle"); setForm({ name: "", email: "", phone: "", message: "" }); }}
                      className="btn-luxury border border-brand-border text-brand-cream-muted px-6 py-3 rounded-sm hover:border-brand-gold hover:text-brand-gold text-xs"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="glass-card rounded-sm p-8 md:p-10">
                    <h3
                      style={{ fontFamily: "var(--font-serif)" }}
                      className="text-2xl font-semibold text-brand-cream mb-8"
                    >
                      Send a Message
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                      <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="text-xs text-brand-muted tracking-widest uppercase"
                               style={{ fontFamily: "var(--font-cinzel)" }}>Full Name *</label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Your full name"
                          className="input-luxury"
                          disabled={status === "submitting"}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-xs text-brand-muted tracking-widest uppercase"
                               style={{ fontFamily: "var(--font-cinzel)" }}>Email Address *</label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={form.email}
                          onChange={handleChange}
                          placeholder="your@email.com"
                          className="input-luxury"
                          disabled={status === "submitting"}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 mb-5">
                      <label htmlFor="phone" className="text-xs text-brand-muted tracking-widest uppercase"
                             style={{ fontFamily: "var(--font-cinzel)" }}>Phone Number</label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+94 77 000 0000"
                        className="input-luxury"
                        disabled={status === "submitting"}
                      />
                    </div>

                    <div className="flex flex-col gap-2 mb-8">
                      <label htmlFor="message" className="text-xs text-brand-muted tracking-widest uppercase"
                             style={{ fontFamily: "var(--font-cinzel)" }}>Message *</label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell us how we can help you..."
                        className="input-luxury resize-none"
                        disabled={status === "submitting"}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="btn-luxury bg-brand-gold text-brand-black px-8 py-4 rounded-sm hover:bg-brand-gold-light w-full disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {status === "submitting" ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-brand-black/30 border-t-brand-black rounded-full animate-spin" />
                          Sending...
                        </span>
                      ) : (
                        <>
                          Send Message
                          <Send size={13} />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
