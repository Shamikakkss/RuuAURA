"use client";
import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, ChevronRight, CheckCircle } from "lucide-react";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [status, setStatus] = useState("idle");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Invalid email";
    if (!form.phone.trim()) errs.phone = "Phone is required";
    if (!form.password) errs.password = "Password is required";
    else if (form.password.length < 8) errs.password = "Minimum 8 characters";
    if (form.password !== form.confirm) errs.confirm = "Passwords do not match";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 1600));
    setStatus("success");
  };

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  return (
    <div className="min-h-screen bg-brand-black flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center"
             style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=1200&auto=format&fit=crop')" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black/90 via-brand-black/60 to-transparent" />
        <div className="relative z-10 flex flex-col justify-end p-16">
          <Link href="/" className="flex flex-col leading-none mb-auto pt-8">
            <span style={{ fontFamily: "var(--font-cinzel)" }}
                  className="text-2xl font-bold text-brand-cream tracking-widest">RuuAURA</span>
            <span style={{ fontFamily: "var(--font-cinzel)" }}
                  className="text-[8px] tracking-[0.4em] text-brand-gold uppercase mt-0.5">Beauty Sanctuary</span>
          </Link>
          <blockquote style={{ fontFamily: "var(--font-serif)" }}
                      className="text-2xl text-brand-cream leading-relaxed italic mb-4">
            &quot;Join the sanctuary and let us curate your beauty journey.&quot;
          </blockquote>
          <p style={{ fontFamily: "var(--font-cinzel)" }}
             className="text-xs tracking-widest uppercase text-brand-gold">— The RuuAURA Community</p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 overflow-y-auto">
        <Link href="/" className="flex flex-col leading-none mb-10 lg:hidden">
          <span style={{ fontFamily: "var(--font-cinzel)" }}
                className="text-2xl font-bold text-brand-cream tracking-widest">RuuAURA</span>
          <span style={{ fontFamily: "var(--font-cinzel)" }}
                className="text-[8px] tracking-[0.4em] text-brand-gold uppercase mt-0.5">Beauty Sanctuary</span>
        </Link>

        <div className="w-full max-w-md">
          {status === "success" ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-brand-success/15 border border-brand-success/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={28} className="text-green-400" />
              </div>
              <h2 style={{ fontFamily: "var(--font-serif)" }} className="text-2xl text-brand-cream mb-3">
                Welcome to RuuAURA
              </h2>
              <p className="text-brand-muted text-sm mb-8">
                Your account has been created. Sign in to access your dashboard and book your first appointment.
              </p>
              <Link href="/login"
                    className="btn-luxury bg-brand-gold text-brand-black px-8 py-4 rounded-sm hover:bg-brand-gold-light text-xs">
                Sign In Now <ChevronRight size={13} />
              </Link>
            </div>
          ) : (
            <>
              <p className="section-label mb-3">Join the Sanctuary</p>
              <h1 style={{ fontFamily: "var(--font-serif)" }}
                  className="text-3xl font-semibold text-brand-cream mb-8">
                Create Your Account
              </h1>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {[
                  { label: "Full Name *", id: "reg-name", key: "name", type: "text", placeholder: "Your full name" },
                  { label: "Email Address *", id: "reg-email", key: "email", type: "email", placeholder: "your@email.com" },
                  { label: "Phone Number *", id: "reg-phone", key: "phone", type: "tel", placeholder: "+94 77 000 0000" },
                ].map(({ label, id, key, type, placeholder }) => (
                  <div key={id} className="flex flex-col gap-2">
                    <label htmlFor={id} style={{ fontFamily: "var(--font-cinzel)" }}
                           className="text-xs tracking-widest uppercase text-brand-muted">{label}</label>
                    <input
                      id={id}
                      type={type}
                      placeholder={placeholder}
                      value={form[key]}
                      onChange={set(key)}
                      className={`input-luxury ${errors[key] ? "border-brand-error" : ""}`}
                      disabled={status === "loading"}
                    />
                    {errors[key] && <p className="text-xs text-red-400">{errors[key]}</p>}
                  </div>
                ))}

                <div className="flex flex-col gap-2">
                  <label htmlFor="reg-pass" style={{ fontFamily: "var(--font-cinzel)" }}
                         className="text-xs tracking-widest uppercase text-brand-muted">Password *</label>
                  <div className="relative">
                    <input
                      id="reg-pass"
                      type={showPass ? "text" : "password"}
                      placeholder="Min. 8 characters"
                      value={form.password}
                      onChange={set("password")}
                      className={`input-luxury pr-12 ${errors.password ? "border-brand-error" : ""}`}
                      disabled={status === "loading"}
                    />
                    <button type="button" onClick={() => setShowPass((s) => !s)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-muted hover:text-brand-cream transition-colors">
                      {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {errors.password && <p className="text-xs text-red-400">{errors.password}</p>}
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="reg-confirm" style={{ fontFamily: "var(--font-cinzel)" }}
                         className="text-xs tracking-widest uppercase text-brand-muted">Confirm Password *</label>
                  <input
                    id="reg-confirm"
                    type="password"
                    placeholder="Repeat your password"
                    value={form.confirm}
                    onChange={set("confirm")}
                    className={`input-luxury ${errors.confirm ? "border-brand-error" : ""}`}
                    disabled={status === "loading"}
                  />
                  {errors.confirm && <p className="text-xs text-red-400">{errors.confirm}</p>}
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="btn-luxury bg-brand-gold text-brand-black px-8 py-4 rounded-sm hover:bg-brand-gold-light w-full disabled:opacity-60 mt-2"
                >
                  {status === "loading" ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-brand-black/30 border-t-brand-black rounded-full animate-spin" />
                      Creating Account...
                    </span>
                  ) : (
                    <>Create Account <ChevronRight size={13} /></>
                  )}
                </button>

                <p className="text-center text-sm text-brand-muted">
                  Already have an account?{" "}
                  <Link href="/login" className="text-brand-gold hover:underline">Sign in</Link>
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
