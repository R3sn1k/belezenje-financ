"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Shirt,
  Plus,
  Search,
  Edit,
  Trash2,
  Save,
  X,
  Upload,
} from "lucide-react";

interface Dres {
  id: number;
  ime_igralca: string;
  klub: string;
  sezona: string;
  velikost: string;
  cena_prodajna: number;
  zaloga: number;
  slika?: string; // base64 slika
}

// Naloži obstoječe drese iz localStorage
const loadFromStorage = (): Dres[] => {
  const saved = localStorage.getItem("dresovi");
  if (saved) return JSON.parse(saved);
  // začetni podatki, če še nič ni shranjeno
  return [
    {
      id: 1,
      ime_igralca: "Lionel Messi",
      klub: "Inter Miami",
      sezona: "2024/25",
      velikost: "M",
      cena_prodajna: 119.99,
      zaloga: 8,
    },
    {
      id: 2,
      ime_igralca: "Cristiano Ronaldo",
      klub: "Al Nassr",
      sezona: "2024/25",
      velikost: "L",
      cena_prodajna: 129.99,
      zaloga: 3,
    },
    {
      id: 3,
      ime_igralca: "Luka Dončić",
      klub: "Dallas Mavericks",
      sezona: "2024/25",
      velikost: "XL",
      cena_prodajna: 99.99,
      zaloga: 15,
    },
  ];
};

export default function ZalogaPage() {
  const [dresovi, setDresovi] = useState<Dres[]>(loadFromStorage());
  const [filter, setFilter] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [slikaPreview, setSlikaPreview] = useState<string | null>(null);

  const [form, setForm] = useState<Omit<Dres, "id">>({
    ime_igralca: "",
    klub: "",
    sezona: "",
    velikost: "M",
    cena_prodajna: 0,
    zaloga: 0,
    slika: "",
  });

  // Shrani v localStorage ob vsaki spremembi
  useEffect(() => {
    localStorage.setItem("dresovi", JSON.stringify(dresovi));
  }, [dresovi]);

  const filtered = dresovi.filter(
    (d) =>
      d.ime_igralca.toLowerCase().includes(filter.toLowerCase()) ||
      d.klub.toLowerCase().includes(filter.toLowerCase())
  );

  // Pretvorba slike v base64
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setForm({ ...form, slika: base64 });
      setSlikaPreview(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleAdd = () => {
    const novi: Dres = { id: Date.now(), ...form };
    setDresovi([...dresovi, novi]);
    setShowForm(false);
    resetForm();
  };

  const handleEdit = (dres: Dres) => {
    setEditingId(dres.id);
    setForm({
      ime_igralca: dres.ime_igralca,
      klub: dres.klub,
      sezona: dres.sezona,
      velikost: dres.velikost,
      cena_prodajna: dres.cena_prodajna,
      zaloga: dres.zaloga,
      slika: dres.slika || "",
    });
    setSlikaPreview(dres.slika || null);
  };

  const handleSave = () => {
    setDresovi(
      dresovi.map((d) =>
        d.id === editingId ? { ...d, ...form } : d
      )
    );
    setEditingId(null);
    resetForm();
  };

  const handleDelete = (id: number) => {
    setDresovi(dresovi.filter((d) => d.id !== id));
  };

  const resetForm = () => {
    setForm({
      ime_igralca: "",
      klub: "",
      sezona: "",
      velikost: "M",
      cena_prodajna: 0,
      zaloga: 0,
      slika: "",
    });
    setSlikaPreview(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* HEADER Z GUMBOM NAZAJ */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div className="flex items-center gap-4">
            <Link href="/">
              <button className="bg-white text-blue-900 px-5 py py-3 rounded-full font-bold hover:bg-yellow-400 transition-all shadow-lg flex items-center gap-2">
                ← Nazaj na začetno stran
              </button>
            </Link>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white">
              Zaloga Dresov
            </h1>
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="bg-yellow-400 text-blue-900 px-6 py-3 rounded-full font-bold hover:bg-yellow-300 transition-all flex items-center gap-3 shadow-lg"
          >
            <Plus className="w-6 h-6" />
            Dodaj nov dres
          </button>
        </div>

        {/* Iskalnik */}
        <div className="relative mb-8 max-w-md">
          <Search className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Išči po igralcu ali klubu..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-slate-800 text-white rounded-xl border border-slate-700 focus:ring-2 focus:ring-yellow-400 outline-none"
          />
        </div>

        {/* Seznam dresov */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((dres) => (
            <div
              key={dres.id}
              className="bg-slate-800 rounded-2xl overflow-hidden shadow-xl border border-slate-700 hover:border-yellow-400 transition-all"
            >
              {/* Slika */}
              <div className="h-64 relative">
                {dres.slika ? (
                  <img
                    src={dres.slika}
                    alt={dres.ime_igralca}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="bg-gray-700 h-full flex items-center justify-center">
                    <Shirt className="w-24 h-24 text-gray-500" />
                  </div>
                )}
              </div>

              <div className="p-6">
                {editingId === dres.id ? (
                  <div className="space-y-3">
                    <input
                      value={form.ime_igralca}
                      onChange={(e) =>
                        setForm({ ...form, ime_igralca: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-slate-700 text-white rounded-lg"
                      placeholder="Igralec"
                    />
                    <input
                      value={form.klub}
                      onChange={(e) =>
                        setForm({ ...form, klub: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-slate-700 text-white rounded-lg"
                      placeholder="Klub"
                    />
                    <div className="flex gap-2">
                      <input
                        value={form.velikost}
                        onChange={(e) =>
                          setForm({ ...form, velikost: e.target.value })
                        }
                        className="w-20 px-3 py-2 bg-slate-700 text-white rounded-lg"
                        placeholder="Vel."
                      />
                      <input
                        type="number"
                        value={form.cena_prodajna}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            cena_prodajna: Number(e.target.value),
                          })
                        }
                        className="flex-1 px-3 py-2 bg-slate-700 text-white rounded-lg"
                        placeholder="Cena €"
                      />
                    </div>
                    <input
                      type="number"
                      value={form.zaloga}
                      onChange={(e) =>
                        setForm({ ...form, zaloga: Number(e.target.value) })
                      }
                      className="w-full px-3 py-2 bg-slate-700 text-white rounded-lg"
                      placeholder="Zaloga"
                    />

                    {/* Zamenjava slike pri urejanju */}
                    <label className="block">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <div className="bg-blue-600 py-2 px-4 rounded-lg cursor-pointer hover:bg-blue-700 flex items-center justify-center gap-2">
                        <Upload className="w-5 h-5" /> Zamenjaj sliko
                      </div>
                    </label>
                    {slikaPreview && (
                      <img
                        src={slikaPreview}
                        alt="Preview"
                        className="w-full h-32 object-cover rounded-lg mt-2"
                      />
                    )}

                    <div className="flex gap-2">
                      <button
                        onClick={handleSave}
                        className="flex-1 bg-green-600 py-2 rounded-lg flex items-center justify-center gap-2"
                      >
                        <Save className="w-5 h-5" /> Shrani
                      </button>
                      <button
                        onClick={() => {
                          setEditingId(null);
                          resetForm();
                        }}
                        className="flex-1 bg-gray-600 py-2 rounded-lg"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h3 className="text-xl font-bold text-white">
                      {dres.ime_igralca}
                    </h3>
                    <p className="text-gray-300 text-sm">
                      {dres.klub} • {dres.sezona}
                    </p>
                    <div className="mt-3 flex justify-between items-end">
                      <div>
                        <p className="text-gray-400 text-xs">Velikost</p>
                        <p className="text-2xl font-bold text-yellow-400">
                          {dres.velikost}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-400 text-xs">Cena</p>
                        <p className="text-3xl font-bold text-white">
                          €{dres.cena_prodajna}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <div>
                        <p className="text-xs text-gray-400">Na zalogi</p>
                        <p className="text-2xl font-bold text-white">
                          {dres.zaloga}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(dres)}
                          className="bg-blue-600 p-3 rounded-lg hover:bg-blue-700"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(dres.id)}
                          className="bg-red-600 p-3 rounded-lg hover:bg-red-700"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* MODAL – DODAJ NOV DRES */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-2xl p-8 max-w-md w-full max-h-screen overflow-y-auto">
              <h2 className="text-2xl font-bold text-white mb-6">
                Dodaj nov dres
              </h2>
              <div className="space-y-4">
                <input
                  placeholder="Ime igralca"
                  value={form.ime_igralca}
                  onChange={(e) =>
                    setForm({ ...form, ime_igralca: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg"
                />
                <input
                  placeholder="Klub"
                  value={form.klub}
                  onChange={(e) => setForm({ ...form, klub: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg"
                />
                <input
                  placeholder="Sezona (npr. 2024/25)"
                  value={form.sezona}
                  onChange={(e) => setForm({ ...form, sezona: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg"
                />
                <input
                  placeholder="Velikost"
                  value={form.velikost}
                  onChange={(e) =>
                    setForm({ ...form, velikost: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg"
                />
                <input
                  type="number"
                  placeholder="Cena (€)"
                  value={form.cena_prodajna || ""}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      cena_prodajna: Number(e.target.value),
                    })
                  }
                  className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg"
                />
                <input
                  type="number"
                  placeholder="Zaloga"
                  value={form.zaloga || ""}
                  onChange={(e) =>
                    setForm({ ...form, zaloga: Number(e.target.value) })
                  }
                  className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg"
                />

                {/* NALAGANJE SLIKE */}
                <label className="block">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <div className="bg-yellow-400 text-blue-900 py-3 px-6 rounded-lg cursor-pointer hover:bg-yellow-300 flex items-center justify-center gap-2 font-bold">
                    <Upload className="w-5 h-5" /> Naloži sliko dresa
                  </div>
                </label>
                {slikaPreview && (
                  <img
                    src={slikaPreview}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                )}
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleAdd}
                  className="flex-1 bg-yellow-400 text-blue-900 py-3 rounded-lg font-bold"
                >
                  Dodaj dres
                </button>
                <button
                  onClick={() => {
                    setShowForm(false);
                    resetForm();
                  }}
                  className="flex-1 bg-gray-600 py-3 rounded-lg"
                >
                  Prekliči
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}