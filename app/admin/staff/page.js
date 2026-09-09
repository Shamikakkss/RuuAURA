"use client";
import { useState } from "react";
import AdminSidebar from "../AdminSidebar";
import Image from "next/image";
import { ARTISANS } from "@/data/mockData";
import { Users, Star, Plus, Mail, Calendar, Check, X, Award } from "lucide-react";

export default function AdminStaffPage() {
  const [artisansList, setArtisansList] = useState(ARTISANS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newArtisan, setNewArtisan] = useState({
    name: "",
    role: "",
    specialty: "",
    exp: "",
    rating: "5.00 ★",
  });

  const handleSave = (e) => {
    e.preventDefault();
    if (!newArtisan.name || !newArtisan.role) return;
    const item = {
      ...newArtisan,
      id: editingId || `art-${Date.now()}`,
      active: true,
      fallback:
        "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=1000&auto=format&fit=crop",
    };
    setArtisansList((prev) => editingId ? prev.map((artisan) => artisan.id === editingId ? { ...artisan, ...item } : artisan) : [item, ...prev]);
    setIsModalOpen(false);
    setEditingId(null);
    setNewArtisan({
      name: "",
      role: "",
      specialty: "",
      exp: "",
      rating: "5.00 ★",
    });
  };

  const handleEdit = (artisan) => {
    setEditingId(artisan.id);
    setNewArtisan(artisan);
    setIsModalOpen(true);
  };

  const handleToggleActive = (id) => {
    setArtisansList((prev) => prev.map((artisan) => artisan.id === id ? { ...artisan, active: artisan.active === false } : artisan));
  };

  return (
    <div className="min-h-screen bg-brand-darkest text-brand-cream flex">
      <AdminSidebar />

      <main className="flex-1 p-6 pt-24 md:p-10 overflow-x-hidden">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-brand-border">
          <div>
            <div className="flex items-center gap-2 text-xs text-brand-gold uppercase tracking-widest mb-1">
              <span>Admin Sanctuary</span>
              <span>•</span>
              <span>Staff & Masters</span>
            </div>
            <h1
              style={{ fontFamily: "var(--font-cinzel)" }}
              className="text-2xl md:text-3xl font-light text-brand-cream tracking-wide"
            >
              Artisans & Stylists
            </h1>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-brand-gold text-brand-dark text-xs font-semibold tracking-wider uppercase hover:bg-brand-gold-light transition-all rounded shadow-lg"
          >
            <Plus size={16} /> Register Artisan
          </button>
        </div>

        {/* Artisans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6 my-8">
          {artisansList.map((art) => (
            <div
              key={art.id}
              className="bg-brand-surface border border-brand-border rounded-lg p-6 flex flex-col sm:flex-row gap-6 hover:border-brand-gold/40 transition-all duration-300"
            >
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-lg overflow-hidden shrink-0 border border-brand-border/60 bg-brand-dark">
                <Image
                  src={art.fallback || art.img}
                  alt={art.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3
                      style={{ fontFamily: "var(--font-cinzel)" }}
                      className="text-lg font-medium text-brand-cream"
                    >
                      {art.name}
                    </h3>
                    <span className="flex items-center gap-1 text-xs text-amber-400 font-semibold bg-brand-dark px-2 py-0.5 rounded border border-brand-border">
                      <Star size={11} className="fill-amber-400" />
                      {art.rating}
                    </span>
                  </div>

                  <p className="text-xs text-brand-gold font-medium mb-2">
                    {art.role}
                  </p>
                  <p className="text-xs text-brand-muted mb-2">
                    <span className="text-brand-cream font-medium">Specialty:</span>{" "}
                    {art.specialty}
                  </p>
                  <p className="text-xs text-brand-muted">
                    <span className="text-brand-cream font-medium">Experience:</span>{" "}
                    {art.exp}
                  </p>
                </div>

                <div className="pt-4 border-t border-brand-border/60 mt-4 flex items-center justify-between text-xs">
                  <span className="text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {art.active === false ? "Archived" : "Available for Bookings"}
                  </span>
                  <div className="flex gap-2">
                    <button onClick={() => handleToggleActive(art.id)} className="text-brand-gold text-xs px-2 py-1 rounded">
                      {art.active === false ? "Restore" : "Archive"}
                    </button>
                    <button onClick={() => handleEdit(art)} className="text-brand-muted hover:text-brand-gold text-xs px-2 py-1 rounded">
                      Edit
                    </button>
                    <button
                      onClick={() =>
                        setArtisansList((prev) => prev.filter((a) => a.id !== art.id))
                      }
                      className="text-brand-muted hover:text-red-400 text-xs px-2 py-1 rounded"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal: Register Artisan */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-brand-surface border border-brand-gold/40 rounded-lg p-6 md:p-8 max-w-lg w-full relative">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-brand-muted hover:text-brand-cream"
              >
                <X size={20} />
              </button>

              <h2
                style={{ fontFamily: "var(--font-cinzel)" }}
                className="text-xl font-light text-brand-cream mb-6"
              >
                {editingId ? "Edit Master Artisan" : "Register Master Artisan"}
              </h2>

              <form onSubmit={handleSave} className="space-y-4 text-sm">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-brand-muted mb-1">
                    Artisan Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newArtisan.name}
                    onChange={(e) =>
                      setNewArtisan({ ...newArtisan, name: e.target.value })
                    }
                    placeholder="e.g. Master Hiroshi Tanaka"
                    className="w-full bg-brand-dark border border-brand-border rounded px-3.5 py-2 text-xs text-brand-cream focus:outline-none focus:border-brand-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-brand-muted mb-1">
                    Role / Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={newArtisan.role}
                    onChange={(e) =>
                      setNewArtisan({ ...newArtisan, role: e.target.value })
                    }
                    placeholder="e.g. Senior Color Director"
                    className="w-full bg-brand-dark border border-brand-border rounded px-3.5 py-2 text-xs text-brand-cream focus:outline-none focus:border-brand-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-brand-muted mb-1">
                    Artistic Specialty
                  </label>
                  <input
                    type="text"
                    value={newArtisan.specialty}
                    onChange={(e) =>
                      setNewArtisan({ ...newArtisan, specialty: e.target.value })
                    }
                    placeholder="e.g. Japanese Head Spa & Precision Cuts"
                    className="w-full bg-brand-dark border border-brand-border rounded px-3.5 py-2 text-xs text-brand-cream focus:outline-none focus:border-brand-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-brand-muted mb-1">
                    Experience & Background
                  </label>
                  <input
                    type="text"
                    value={newArtisan.exp}
                    onChange={(e) =>
                      setNewArtisan({ ...newArtisan, exp: e.target.value })
                    }
                    placeholder="e.g. 10+ Years (Tokyo & London)"
                    className="w-full bg-brand-dark border border-brand-border rounded px-3.5 py-2 text-xs text-brand-cream focus:outline-none focus:border-brand-gold"
                  />
                </div>

                <div className="pt-4 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-xs text-brand-muted hover:text-brand-cream"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-brand-gold text-brand-dark text-xs font-semibold rounded uppercase tracking-wider hover:bg-brand-gold-light transition-all"
                  >
                    Save Artisan
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
