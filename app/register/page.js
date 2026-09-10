"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ChevronRight, CheckCircle, Sparkles } from "lucide-react";
import { loginUser } from "@/lib/authStore";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    whatsapp: "",
    interest: "Hair Architecture & Color",
    password: "",
    confirm: "",
  });
  const [sameAsPhone, setSameAsPhone] = useState(true);
  const [showPass, setShowPass] = useState(false);
  const [status, setStatus] = useState("idle");
  const [errors, setErrors] = useState({});

  const handlePhoneChange = (e) => {
    const val = e.target.value;
    setForm((f) => ({
      ...f,
      phone: val,
      whatsapp: sameAsPhone ? val : f.whatsapp,
    }));
  };

  const handleToggleSameAsPhone = (e) => {
    const checked = e.target.checked;
    setSameAsPhone(checked);
    if (checked) {
      setForm((f) => ({ ...f, whatsapp: f.phone }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Full name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Invalid email format";
    if (!form.phone.trim()) errs.phone = "Mobile phone is required";
    if (!form.password) errs.password = "Password is required";
    else if (form.password.length < 6) errs.password = "Minimum 6 characters";
    if (form.password !== form.confirm) errs.confirm = "Passwords do not match";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 1000));
    
    // Save new user & log in automatically
    loginUser({
      name: form.name,
      email: form.email,
      phone: form.phone,
      whatsapp: form.whatsapp || form.phone,
      interest: form.interest,
    });
    
    setStatus("success");
  };

  const handleGoogleAuth = async () => {
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 800));
    // Demo Google user simulation
    loginUser({
      name: "Jane Sterling",
      email: "jane.sterling@gmail.com",
      phone: "+94 77 123 4567",
      whatsapp: "+94 77 123 4567",
      tier: "Sanctuary Member",
    });
    setStatus("success");
  };

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  return (
    <div className="min-h-screen bg-brand-black flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=1200&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black/90 via-brand-black/60 to-transparent" />
        <div className="relative z-10 flex flex-col justify-end p-16">
          <Link href="/" className="flex flex-col leading-none mb-auto pt-8">
            <span
              style={{ fontFamily: "var(--font-cinzel)" }}
              className="text-2xl font-bold text-brand-cream tracking-widest"
            >
              RuuAURA
            </span>
            <span
              style={{ fontFamily: "var(--font-cinzel)" }}
              className="text-[8px] tracking-[0.4em] text-brand-gold uppercase mt-0.5"
            >
              Beauty Sanctuary
            </span>
          </Link>
          <blockquote
            style={{ fontFamily: "var(--font-serif)" }}
            className="text-2xl text-brand-cream leading-relaxed italic mb-4"
          >
            &quot;Join our private membership and let our artisans curate your bespoke beauty journey.&quot;
          </blockquote>
          <p
            style={{ fontFamily: "var(--font-cinzel)" }}
            className="text-xs tracking-widest uppercase text-brand-gold"
          >
            — The RuuAURA Sanctuary
          </p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 overflow-y-auto">
        <Link href="/" className="flex flex-col leading-none mb-8 lg:hidden">
          <span
            style={{ fontFamily: "var(--font-cinzel)" }}
            className="text-2xl font-bold text-brand-cream tracking-widest"
          >
            RuuAURA
          </span>
          <span
            style={{ fontFamily: "var(--font-cinzel)" }}
            className="text-[8px] tracking-[0.4em] text-brand-gold uppercase mt-0.5"
          >
            Beauty Sanctuary
          </span>
        </Link>

        <div className="w-full max-w-md my-auto">
          {status === "success" ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-brand-success/15 border border-brand-success/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={28} className="text-green-400" />
              </div>
              <h2
                style={{ fontFamily: "var(--font-serif)" }}
                className="text-3xl text-brand-cream mb-3 font-medium"
              >
                Welcome to Sanctuary
              </h2>
              <p className="text-brand-muted text-sm mb-8 leading-relaxed">
                Your RuuAURA membership account is active. You are now logged in and ready to access your personal dashboard.
              </p>
              <Link
                href="/"
                className="btn-luxury bg-brand-gold text-brand-black px-8 py-4 rounded-sm hover:bg-brand-gold-light text-xs font-semibold uppercase tracking-widest"
              >
                Enter Sanctuary & Dashboard <ChevronRight size={13} />
              </Link>
            </div>
          ) : (
            <>
              <p className="section-label mb-2">Member Registration</p>
              <h1
                style={{ fontFamily: "var(--font-serif)" }}
                className="text-3xl font-semibold text-brand-cream mb-6"
              >
                Create Your Account
              </h1>

              {/* ── Google Sign-Up Button ── */}
              <button
                type="button"
                onClick={handleGoogleAuth}
                disabled={status === "loading"}
                className="w-full flex items-center justify-center gap-3 px-6 py-3.5 rounded-sm bg-brand-surface hover:bg-brand-card border border-white/15 hover:border-brand-gold/40 text-brand-cream text-xs uppercase tracking-wider font-sans font-medium transition-all duration-300 shadow-sm mb-6"
              >
                {/* Google G SVG */}
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>

              {/* Divider */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 h-px bg-white/10" />
                <span
                  style={{ fontFamily: "var(--font-cinzel)" }}
                  className="text-[10px] tracking-widest uppercase text-brand-muted"
                >
                  Or Register with Email
                </span>
                <div className="flex-1 h-px bg-white/10" />
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Full Name */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="reg-name"
                    style={{ fontFamily: "var(--font-cinzel)" }}
                    className="text-xs tracking-widest uppercase text-brand-muted"
                  >
                    Full Name *
                  </label>
                  <input
                    id="reg-name"
                    type="text"
                    placeholder="Jane Sterling"
                    value={form.name}
                    onChange={set("name")}
                    className={`input-luxury ${errors.name ? "border-brand-error" : ""}`}
                    disabled={status === "loading"}
                  />
                  {errors.name && <p className="text-xs text-red-400">{errors.name}</p>}
                </div>

                {/* Email Address */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="reg-email"
                    style={{ fontFamily: "var(--font-cinzel)" }}
                    className="text-xs tracking-widest uppercase text-brand-muted"
                  >
                    Email Address *
                  </label>
                  <input
                    id="reg-email"
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={set("email")}
                    className={`input-luxury ${errors.email ? "border-brand-error" : ""}`}
                    disabled={status === "loading"}
                  />
                  {errors.email && <p className="text-xs text-red-400">{errors.email}</p>}
                </div>

                {/* Mobile Phone & WhatsApp Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="reg-phone"
                      style={{ fontFamily: "var(--font-cinzel)" }}
                      className="text-xs tracking-widest uppercase text-brand-muted"
                    >
                      Mobile Phone *
                    </label>
                    <input
                      id="reg-phone"
                      type="tel"
                      placeholder="+94 77 123 4567"
                      value={form.phone}
                      onChange={handlePhoneChange}
                      className={`input-luxury ${errors.phone ? "border-brand-error" : ""}`}
                      disabled={status === "loading"}
                    />
                    {errors.phone && <p className="text-xs text-red-400">{errors.phone}</p>}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="reg-whatsapp"
                        style={{ fontFamily: "var(--font-cinzel)" }}
                        className="text-xs tracking-widest uppercase text-brand-muted"
                      >
                        WhatsApp
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer text-[10px] text-brand-gold select-none">
                        <input
                          type="checkbox"
                          checked={sameAsPhone}
                          onChange={handleToggleSameAsPhone}
                          className="w-3 h-3 accent-brand-gold rounded cursor-pointer"
                        />
                        <span>Same as Mobile</span>
                      </label>
                    </div>
                    <input
                      id="reg-whatsapp"
                      type="tel"
                      placeholder="+94 77 123 4567"
                      value={sameAsPhone ? form.phone : form.whatsapp}
                      onChange={set("whatsapp")}
                      disabled={sameAsPhone || status === "loading"}
                      className="input-luxury disabled:opacity-60"
                    />
                  </div>
                </div>

                {/* Preferred Ritual Category */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="reg-interest"
                    style={{ fontFamily: "var(--font-cinzel)" }}
                    className="text-xs tracking-widest uppercase text-brand-muted"
                  >
                    Primary Beauty Interest
                  </label>
                  <select
                    id="reg-interest"
                    value={form.interest}
                    onChange={set("interest")}
                    className="input-luxury bg-brand-surface text-brand-cream cursor-pointer"
                    disabled={status === "loading"}
                  >
                    <option value="Hair Architecture & Color">Hair Architecture & Bespoke Coloring</option>
                    <option value="Skin & Cellular Spa Rituals">Skin & Cellular Spa Rituals</option>
                    <option value="Bridal & Editorial Couture">Bridal & Editorial Couture</option>
                    <option value="Nail Artistry & Aesthetics">Nail Artistry & Aesthetics</option>
                  </select>
                </div>

                {/* Password & Confirm */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="reg-pass"
                      style={{ fontFamily: "var(--font-cinzel)" }}
                      className="text-xs tracking-widest uppercase text-brand-muted"
                    >
                      Password *
                    </label>
                    <div className="relative">
                      <input
                        id="reg-pass"
                        type={showPass ? "text" : "password"}
                        placeholder="Min. 6 chars"
                        value={form.password}
                        onChange={set("password")}
                        className={`input-luxury pr-10 ${errors.password ? "border-brand-error" : ""}`}
                        disabled={status === "loading"}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPass((s) => !s)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-muted hover:text-brand-cream transition-colors"
                      >
                        {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                    {errors.password && <p className="text-xs text-red-400">{errors.password}</p>}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="reg-confirm"
                      style={{ fontFamily: "var(--font-cinzel)" }}
                      className="text-xs tracking-widest uppercase text-brand-muted"
                    >
                      Confirm Password *
                    </label>
                    <input
                      id="reg-confirm"
                      type={showPass ? "text" : "password"}
                      placeholder="Repeat password"
                      value={form.confirm}
                      onChange={set("confirm")}
                      className={`input-luxury ${errors.confirm ? "border-brand-error" : ""}`}
                      disabled={status === "loading"}
                    />
                    {errors.confirm && <p className="text-xs text-red-400">{errors.confirm}</p>}
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="btn-luxury bg-brand-gold text-brand-black px-8 py-4 rounded-sm hover:bg-brand-gold-light w-full disabled:opacity-60 mt-2 font-semibold uppercase tracking-widest text-xs"
                >
                  {status === "loading" ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-brand-black/30 border-t-brand-black rounded-full animate-spin" />
                      Creating Sanctuary Account...
                    </span>
                  ) : (
                    <>Create Account <ChevronRight size={13} /></>
                  )}
                </button>

                <p className="text-center text-xs text-brand-muted mt-2">
                  Already have an account?{" "}
                  <Link href="/login" className="text-brand-gold hover:underline font-medium">
                    Sign In
                  </Link>
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
