"use client";
import { useState, useEffect } from "react";
import AccountPortalShell from "../AccountPortalShell";
import { Save, CheckCircle } from "lucide-react";
import { useAuth } from "@/lib/authStore";

export default function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const [form, setForm] = useState({
    name: user.name || "",
    email: user.email || "",
    phone: user.phone || "",
    whatsapp: user.whatsapp || "",
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setForm({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      whatsapp: user.whatsapp || "",
    });
  }, [user]);

  const save = (event) => {
    event.preventDefault();
    updateProfile(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <AccountPortalShell>
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 border-b border-brand-border pb-6">
          <p className="mb-2 text-[10px] uppercase tracking-[0.25em] text-brand-gold">Sanctuary identity</p>
          <h1 className="text-3xl text-brand-cream" style={{ fontFamily: "var(--font-serif)" }}>Personal Information</h1>
          <p className="mt-2 text-sm text-brand-muted">Google profile details are used as your starting account information and can be refined here.</p>
        </div>
        {saved && (
          <div className="mb-6 flex items-center gap-2 border border-brand-success/30 bg-brand-success/10 p-3 text-sm text-brand-success">
            <CheckCircle size={16} /> Profile updated successfully.
          </div>
        )}
        <form onSubmit={save} className="grid gap-5 md:grid-cols-2">
          {[
            { key: "name", label: "Full Name", type: "text" },
            { key: "email", label: "Email Address", type: "email" },
            { key: "phone", label: "Phone Number", type: "tel" },
            { key: "whatsapp", label: "WhatsApp Number", type: "tel" },
          ].map(({ key, label, type }) => (
            <label key={key} className="block">
              <span className="mb-2 block text-[10px] uppercase tracking-widest text-brand-muted">{label}</span>
              <input
                type={type}
                value={form[key]}
                onChange={(event) => setForm({ ...form, [key]: event.target.value })}
                className="input-luxury"
              />
            </label>
          ))}
          <div className="md:col-span-2">
            <button className="inline-flex items-center gap-2 bg-brand-gold px-6 py-3 text-xs font-semibold uppercase tracking-widest text-brand-black hover:bg-brand-gold-light">
              <Save size={14} /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </AccountPortalShell>
  );
}
