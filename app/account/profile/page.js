"use client";
import { useState } from "react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import AccountSidebar from "../AccountSidebar";
import { Save, CheckCircle } from "lucide-react";

export default function ProfilePage() {
  const [form, setForm] = useState({
    name: "Jane Sterling",
    email: "jane.sterling@example.com",
    phone: "+94 77 123 4567",
    whatsapp: "+94 77 123 4567",
  });
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20 bg-brand-black min-h-screen">
        <div className="container-luxury">
          <div className="flex flex-col lg:flex-row gap-8">
            <AccountSidebar />
            <div className="flex-1">
              <div className="glass-card rounded-sm p-8">
                <p style={{ fontFamily: "var(--font-cinzel)" }}
                   className="text-xs tracking-widest uppercase text-brand-gold mb-2">My Profile</p>
                <h2 style={{ fontFamily: "var(--font-serif)" }}
                    className="text-2xl font-semibold text-brand-cream mb-8">
                  Personal Information
                </h2>

                {saved && (
                  <div className="flex items-center gap-3 p-3 bg-brand-success/10 border border-brand-success/30 rounded-sm mb-6">
                    <CheckCircle size={16} className="text-green-400 shrink-0" />
                    <p className="text-sm text-green-400">Profile updated successfully.</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {[
                    { label: "Full Name", id: "p-name", key: "name", type: "text" },
                    { label: "Email Address", id: "p-email", key: "email", type: "email" },
                    { label: "Phone Number", id: "p-phone", key: "phone", type: "tel" },
                    { label: "WhatsApp Number", id: "p-wa", key: "whatsapp", type: "tel" },
                  ].map(({ label, id, key, type }) => (
                    <div key={id} className="flex flex-col gap-2">
                      <label htmlFor={id}
                             style={{ fontFamily: "var(--font-cinzel)" }}
                             className="text-xs tracking-widest uppercase text-brand-muted">
                        {label}
                      </label>
                      <input
                        id={id}
                        type={type}
                        value={form[key]}
                        onChange={set(key)}
                        className="input-luxury"
                        disabled={saving}
                      />
                    </div>
                  ))}

                  <div className="md:col-span-2 flex justify-end mt-2">
                    <button
                      type="submit"
                      disabled={saving}
                      className="btn-luxury bg-brand-gold text-brand-black px-8 py-4 rounded-sm hover:bg-brand-gold-light disabled:opacity-60 text-xs"
                    >
                      {saving ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-brand-black/30 border-t-brand-black rounded-full animate-spin" />
                          Saving...
                        </span>
                      ) : (
                        <>Save Changes <Save size={13} /></>
                      )}
                    </button>
                  </div>
                </form>
              </div>

              {/* Danger Zone */}
              <div className="glass-card rounded-sm p-6 mt-6 border-brand-error/20">
                <p style={{ fontFamily: "var(--font-cinzel)" }}
                   className="text-xs tracking-widest uppercase text-brand-error mb-3">
                  Danger Zone
                </p>
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-brand-cream mb-1">Delete Account</p>
                    <p className="text-xs text-brand-muted">
                      Permanently delete your account and all associated data. This action cannot be undone.
                    </p>
                  </div>
                  <button className="btn-luxury border border-brand-error/40 text-brand-error px-6 py-3 rounded-sm hover:bg-brand-error/10 text-xs flex-shrink-0">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
