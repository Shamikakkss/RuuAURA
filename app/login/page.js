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
                    className="btn-luxury bg-brand-gold text-brand-black px-8 py-4 rounded-sm hover:bg-brand-gold-light text-xs">
                Go to Account <ChevronRight size={13} />
              </Link>
            </div>
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
}
