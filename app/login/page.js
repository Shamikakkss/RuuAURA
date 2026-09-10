"use client";
import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, ChevronRight, LogIn } from "lucide-react";

import { loginUser } from "@/lib/authStore";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setError("");
    await new Promise((r) => setTimeout(r, 800));
    // Accept valid demo password
    if (form.password.length < 4) {
      setError("Please enter a password with at least 4 characters.");
      setStatus("idle");
    } else {
      const emailName = form.email.split("@")[0] || "Jane Sterling";
      const formattedName = emailName.charAt(0).toUpperCase() + emailName.slice(1);
      loginUser({
        email: form.email,
        name: formattedName.includes(".") ? formattedName.replace(".", " ") : (form.email.includes("jane") ? "Jane Sterling" : formattedName),
        initials: (form.email.includes("jane") ? "JS" : formattedName.slice(0, 2).toUpperCase()),
      });
      setStatus("success");
    }
  };

  const handleGoogleLogin = async () => {
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 800));
    loginUser({
      name: "Jane Sterling",
      email: "jane.sterling@gmail.com",
      phone: "+94 77 123 4567",
      whatsapp: "+94 77 123 4567",
      tier: "Sanctuary Member",
    });
    setStatus("success");
  };

  return (
    <div className="min-h-screen bg-brand-black flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1200&auto=format&fit=crop')",
          }}
        />
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
            &quot;Your sanctuary moment begins with a single step.&quot;
          </blockquote>
          <p style={{ fontFamily: "var(--font-cinzel)" }}
             className="text-xs tracking-widest uppercase text-brand-gold">
            — The RuuAURA Experience
          </p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* Mobile Logo */}
        <Link href="/" className="flex flex-col leading-none mb-10 lg:hidden">
          <span style={{ fontFamily: "var(--font-cinzel)" }}
                className="text-2xl font-bold text-brand-cream tracking-widest">RuuAURA</span>
          <span style={{ fontFamily: "var(--font-cinzel)" }}
                className="text-[8px] tracking-[0.4em] text-brand-gold uppercase mt-0.5">Beauty Sanctuary</span>
        </Link>

        <div className="w-full max-w-md">
          <p className="section-label mb-3">Welcome Back</p>
          <h1 style={{ fontFamily: "var(--font-serif)" }}
              className="text-3xl font-semibold text-brand-cream mb-8">
            Sign In to Your Account
          </h1>

          {status === "success" ? (
            <div className="text-center py-8">
              <div className="w-14 h-14 bg-brand-success/15 border border-brand-success/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <LogIn size={22} className="text-green-400" />
              </div>
              <p style={{ fontFamily: "var(--font-serif)" }} className="text-xl text-brand-cream mb-2">Welcome back!</p>
              <p className="text-brand-muted text-sm mb-6">You&apos;re now signed in to RuuAURA.</p>
              <Link href="/account"
                    className="btn-luxury bg-brand-gold text-brand-black px-8 py-4 rounded-sm hover:bg-brand-gold-light text-xs font-semibold uppercase tracking-widest">
                Return to Sanctuary <ChevronRight size={13} />
              </Link>
            </div>
          ) : (
            <>
              {/* Google Sign In Button */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={status === "loading"}
                className="w-full flex items-center justify-center gap-3 px-6 py-3.5 rounded-sm bg-brand-surface hover:bg-brand-card border border-white/15 hover:border-brand-gold/40 text-brand-cream text-xs uppercase tracking-wider font-sans font-medium transition-all duration-300 shadow-sm mb-6"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Continue with Google</span>
              </button>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 h-px bg-white/10" />
                <span
                  style={{ fontFamily: "var(--font-cinzel)" }}
                  className="text-[10px] tracking-widest uppercase text-brand-muted"
                >
                  Or Sign In with Email
                </span>
                <div className="flex-1 h-px bg-white/10" />
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {error && (
                <div className="p-3 bg-brand-error/10 border border-brand-error/30 rounded-sm">
                  <p className="text-sm text-red-400">{error}</p>
                </div>
              )}

              <div className="flex flex-col gap-2">
                <label htmlFor="login-email"
                       style={{ fontFamily: "var(--font-cinzel)" }}
                       className="text-xs tracking-widest uppercase text-brand-muted">
                  Email Address
                </label>
                <input
                  id="login-email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className="input-luxury"
                  disabled={status === "loading"}
                />
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="login-pass"
                         style={{ fontFamily: "var(--font-cinzel)" }}
                         className="text-xs tracking-widest uppercase text-brand-muted">
                    Password
                  </label>
                  <Link href="/forgot-password"
                        className="text-xs text-brand-muted hover:text-brand-gold transition-colors">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    id="login-pass"
                    type={showPass ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    value={form.password}
                    onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                    className="input-luxury pr-12"
                    disabled={status === "loading"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-muted hover:text-brand-cream transition-colors"
                    aria-label={showPass ? "Hide password" : "Show password"}
                  >
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="btn-luxury bg-brand-gold text-brand-black px-8 py-4 rounded-sm hover:bg-brand-gold-light w-full disabled:opacity-60 mt-2"
              >
                {status === "loading" ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-brand-black/30 border-t-brand-black rounded-full animate-spin" />
                    Signing In...
                  </span>
                ) : (
                  <>Sign In <ChevronRight size={13} /></>
                )}
              </button>

              <p className="text-center text-sm text-brand-muted">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="text-brand-gold hover:underline">
                  Create one
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
