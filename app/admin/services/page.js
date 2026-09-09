"use client";
import { useState } from "react";
import AdminSidebar from "../AdminSidebar";
import Image from "next/image";
import { SERVICES, SERVICE_CATEGORIES } from "@/data/mockData";
import {
  Scissors,
  Plus,
  Search,
  CheckCircle,
  Clock,
  Sparkles,
  Edit2,
  Trash2,
  X,
} from "lucide-react";

export default function AdminServicesPage() {
  const [servicesList, setServicesList] = useState(SERVICES);
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newService, setNewService] = useState({
    title: "",
    category: "hair",
    price: "",
    duration: "60 Min",
    tag: "Bespoke",
    desc: "",
    products: "",
  });

  const filteredServices = servicesList.filter((s) => {
    const matchesCategory =
      activeCategory === "all" || s.category === activeCategory;
    const matchesSearch =
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.desc.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddService = (e) => {
    e.preventDefault();
    if (!newService.title || !newService.price) return;
    const created = {
      ...newService,
      id: `srv-${Date.now()}`,
      rawPrice: parseInt(newService.price.replace(/[^0-9]/g, "")) || 100,
      fallback:
        "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1000&auto=format&fit=crop",
    };
    setServicesList((prev) => [created, ...prev]);
    setIsModalOpen(false);
    setNewService({
      title: "",
      category: "hair",
      price: "",
      duration: "60 Min",
      tag: "Bespoke",
      desc: "",
      products: "",
    });
  };

  const handleDelete = (id) => {
    setServicesList((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className="min-h-screen bg-brand-darkest text-brand-cream flex">
      <AdminSidebar />

      <main className="flex-1 p-6 md:p-10 overflow-x-hidden">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-brand-border">
          <div>
            <div className="flex items-center gap-2 text-xs text-brand-gold uppercase tracking-widest mb-1">
              <span>Admin Sanctuary</span>
              <span>•</span>
              <span>Rituals & Services</span>
            </div>
            <h1
              style={{ fontFamily: "var(--font-cinzel)" }}
              className="text-2xl md:text-3xl font-light text-brand-cream tracking-wide"
            >
              Services Directory
            </h1>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-brand-gold text-brand-dark text-xs font-semibold tracking-wider uppercase hover:bg-brand-gold-light transition-all rounded shadow-lg"
          >
            <Plus size={16} /> Add New Ritual
          </button>
        </div>

        {/* Categories Bar & Search */}
        <div className="flex flex-col lg:flex-row gap-4 my-8 items-stretch lg:items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {SERVICE_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-xs uppercase tracking-wider rounded transition-all ${
                  activeCategory === cat.id
                    ? "bg-brand-gold text-brand-dark font-medium"
                    : "bg-brand-surface border border-brand-border text-brand-muted hover:text-brand-cream"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="relative w-full lg:w-72">
            <Search
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-muted"
            />
            <input
              type="text"
              placeholder="Search services..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-brand-surface border border-brand-border rounded px-3.5 py-2 pl-10 text-xs text-brand-cream focus:outline-none focus:border-brand-gold transition-colors"
            />
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredServices.map((srv) => (
            <div
              key={srv.id}
              className="bg-brand-surface border border-brand-border rounded-lg overflow-hidden flex flex-col group hover:border-brand-gold/40 transition-all duration-300"
            >
              <div className="relative h-44 w-full bg-brand-dark overflow-hidden">
                <Image
                  src={srv.fallback || srv.img}
                  alt={srv.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-surface via-transparent to-transparent" />
                <span className="absolute top-3 left-3 bg-brand-dark/90 backdrop-blur-md border border-brand-gold/40 px-2.5 py-1 text-[10px] text-brand-gold uppercase tracking-wider font-semibold rounded">
                  {srv.tag || srv.category}
                </span>
                <span className="absolute bottom-3 right-3 text-lg font-bold text-brand-gold bg-brand-dark/80 px-2.5 py-1 rounded">
                  {srv.price}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3
                    style={{ fontFamily: "var(--font-cinzel)" }}
                    className="text-base font-medium text-brand-cream mb-2 line-clamp-1"
                  >
                    {srv.title}
                  </h3>
                  <p className="text-xs text-brand-muted line-clamp-2 leading-relaxed mb-4">
                    {srv.desc}
                  </p>
                </div>

                <div className="border-t border-brand-border/60 pt-4 flex items-center justify-between text-xs text-brand-muted">
                  <div className="flex items-center gap-1.5">
                    <Clock size={13} className="text-brand-gold" />
                    <span>{srv.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDelete(srv.id)}
                      className="p-1.5 hover:bg-red-950/50 hover:text-red-400 rounded transition-colors"
                      title="Delete Service"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal: Add Ritual */}
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
                Add New Luxury Ritual
              </h2>

              <form onSubmit={handleAddService} className="space-y-4 text-sm">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-brand-muted mb-1">
                    Service Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={newService.title}
                    onChange={(e) =>
                      setNewService({ ...newService, title: e.target.value })
                    }
                    placeholder="e.g. 24K Gold Cellular Rejuvenation"
                    className="w-full bg-brand-dark border border-brand-border rounded px-3.5 py-2 text-xs text-brand-cream focus:outline-none focus:border-brand-gold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-brand-muted mb-1">
                      Category
                    </label>
                    <select
                      value={newService.category}
                      onChange={(e) =>
                        setNewService({ ...newService, category: e.target.value })
                      }
                      className="w-full bg-brand-dark border border-brand-border rounded px-3.5 py-2 text-xs text-brand-cream focus:outline-none focus:border-brand-gold"
                    >
                      <option value="hair">Hair Architecture</option>
                      <option value="spa">Skin & Spa</option>
                      <option value="bridal">Bridal & Editorial</option>
                      <option value="nails">Nail Artistry</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-brand-muted mb-1">
                      Price *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="$120"
                      value={newService.price}
                      onChange={(e) =>
                        setNewService({ ...newService, price: e.target.value })
                      }
                      className="w-full bg-brand-dark border border-brand-border rounded px-3.5 py-2 text-xs text-brand-cream focus:outline-none focus:border-brand-gold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-brand-muted mb-1">
                      Duration
                    </label>
                    <input
                      type="text"
                      placeholder="60 Min"
                      value={newService.duration}
                      onChange={(e) =>
                        setNewService({ ...newService, duration: e.target.value })
                      }
                      className="w-full bg-brand-dark border border-brand-border rounded px-3.5 py-2 text-xs text-brand-cream focus:outline-none focus:border-brand-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-brand-muted mb-1">
                      Badge / Tag
                    </label>
                    <input
                      type="text"
                      placeholder="Master Artistry"
                      value={newService.tag}
                      onChange={(e) =>
                        setNewService({ ...newService, tag: e.target.value })
                      }
                      className="w-full bg-brand-dark border border-brand-border rounded px-3.5 py-2 text-xs text-brand-cream focus:outline-none focus:border-brand-gold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-brand-muted mb-1">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Ritual details and benefits..."
                    value={newService.desc}
                    onChange={(e) =>
                      setNewService({ ...newService, desc: e.target.value })
                    }
                    className="w-full bg-brand-dark border border-brand-border rounded px-3.5 py-2 text-xs text-brand-cream focus:outline-none focus:border-brand-gold resize-none"
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
                    Save Ritual
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
