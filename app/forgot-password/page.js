"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle, ChevronRight, Mail } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("loading");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setStatus("success");
  };

  return (
    <main className="min-h-screen bg-brand-black flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-brand-muted hover:text-brand-gold transition-colors mb-12"
        >
          <ArrowLeft size={14} /> Back to sign in
        </Link>

        <div className="glass-card rounded-sm p-7 md:p-10">
          <div className="w-12 h-12 border border-brand-gold/30 bg-brand-gold/10 rounded-full flex items-center justify-center mb-6">
            {status === "success" ? (
              <CheckCircle size={20} className="text-brand-gold" />
            ) : (
              <Mail size={20} className="text-brand-gold" />
            )}
          </div>

          <p className="section-label mb-3">Account Recovery</p>
          <h1
            style={{ fontFamily: "var(--font-serif)" }}
            className="text-3xl font-semibold text-brand-cream mb-3"
          >
            {status === "success" ? "Check your inbox" : "Reset your password"}
          </h1>

          {status === "success" ? (
            <>
              <p className="text-sm text-brand-muted leading-relaxed mb-8">
                If an account exists for <span className="text-brand-cream">{email}</span>, a recovery link will arrive shortly.
              </p>
              <Link
                href="/login"
                className="btn-luxury bg-brand-gold text-brand-black px-6 py-3 rounded-sm hover:bg-brand-gold-light text-xs w-full"
              >
                Return to Sign In <ChevronRight size={13} />
              </Link>
            </>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <p className="text-sm text-brand-muted leading-relaxed">
                Enter your email and we&apos;ll send instructions to restore access to your account.
              </p>
              <div className="flex flex-col gap-2">
                <label htmlFor="recovery-email" className="text-xs tracking-widest uppercase text-brand-muted">
                  Email Address
                </label>
                <input
                  id="recovery-email"
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="your@email.com"
                  disabled={status === "loading"}
                  className="input-luxury"
                />
              </div>
              <button
                type="submit"
                disabled={status === "loading"}
                className="btn-luxury bg-brand-gold text-brand-black px-6 py-3 rounded-sm hover:bg-brand-gold-light text-xs w-full disabled:opacity-60"
              >
                {status === "loading" ? "Sending Instructions..." : "Send Recovery Link"}
                {status !== "loading" && <ChevronRight size={13} />}
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
