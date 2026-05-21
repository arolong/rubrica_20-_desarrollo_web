"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import TopNav from "../components/TopNav";

type Asset = {
  id: string;
  code?: string;
  name: string;
  category?: { id: string; name: string } | null;
  status?: string;
  location?: string;
  owner?: string;
};

export default function ActivosPage() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ code: "", name: "", location: "", owner: "", categoryId: "" });

  useEffect(() => {
    fetchAssets();
    fetchCategories();
  }, []);

  async function fetchAssets() {
    setLoading(true);
    const res = await fetch('/api/activos');
    if (res.ok) setAssets(await res.json());
    setLoading(false);
  }

  async function fetchCategories() {
    const res = await fetch('/api/categorias');
    if (res.ok) setCategories(await res.json());
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch('/api/activos', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    if (res.ok) {
      setForm({ code: '', name: '', location: '', owner: '', categoryId: '' });
      setShowForm(false);
      fetchAssets();
    } else {
      alert('Error creating asset');
    }
  }

  return (
    <div className="min-h-full bg-[#f5f4ef]">
      <TopNav />
      <main className="mx-auto w-full max-w-6xl px-6 pb-16 pt-10">
        <section className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#6b705c]">Activos</p>
              <h2 className="mt-2 text-3xl font-semibold text-[#151515]">Inventario general</h2>
              <p className="mt-2 text-sm text-[#6f6f6f]">Gestiona estado, ubicacion y responsables por activo.</p>
            </div>
            <div className="flex gap-2">
              <button className="rounded-full border border-black/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#3c3c3c]">Filtrar</button>
              <button onClick={() => setShowForm(true)} className="rounded-full bg-[#2f6b62] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white">Nuevo activo</button>
            </div>
          </div>

          {showForm && (
            <form onSubmit={handleCreate} className="mt-6 grid gap-3 rounded-2xl bg-[#fafaf7] p-4">
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                <input required placeholder="Codigo" value={form.code} onChange={e => setForm({ ...form, code: e.target.value })} className="rounded-lg border p-2" />
                <input required placeholder="Nombre" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="rounded-lg border p-2" />
                <select required value={form.categoryId} onChange={e => setForm({ ...form, categoryId: e.target.value })} className="rounded-lg border p-2">
                  <option value="">Seleccionar categoria</option>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                <input required placeholder="Ubicacion" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} className="rounded-lg border p-2" />
                <input required placeholder="Responsable" value={form.owner} onChange={e => setForm({ ...form, owner: e.target.value })} className="rounded-lg border p-2" />
                <div className="flex gap-2">
                  <button type="submit" className="rounded-full bg-[#2f6b62] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white">Crear</button>
                  <button type="button" onClick={() => setShowForm(false)} className="rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em]">Cancelar</button>
                </div>
              </div>
            </form>
          )}

          <div className="mt-6 overflow-hidden rounded-2xl border border-black/5">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#f8f6f2] text-xs uppercase tracking-[0.2em] text-[#777]">
                <tr>
                  <th className="px-4 py-3">Codigo</th>
                  <th className="px-4 py-3">Activo</th>
                  <th className="px-4 py-3">Categoria</th>
                  <th className="px-4 py-3">Estado</th>
                  <th className="px-4 py-3">Ubicacion</th>
                  <th className="px-4 py-3">Responsable</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {loading ? (
                  <tr><td colSpan={6} className="px-4 py-6">Cargando...</td></tr>
                ) : assets.length === 0 ? (
                  <tr><td colSpan={6} className="px-4 py-6">No hay activos.</td></tr>
                ) : (
                  assets.map((asset) => (
                    <tr key={asset.id} className="hover:bg-[#fbfaf7]">
                      <td className="px-4 py-4 font-semibold text-[#2a2a2a]"><Link href={`/activos/${asset.id}`} className="text-[#2f6b62]">{asset.code ?? asset.id}</Link></td>
                      <td className="px-4 py-4 text-[#1f1f1f]">{asset.name}</td>
                      <td className="px-4 py-4 text-[#5f5f5f]">{asset.category?.name ?? '-'}</td>
                      <td className="px-4 py-4"><span className="rounded-full bg-[#f3f3f3] px-3 py-1 text-xs font-semibold text-[#3a3a3a]">{asset.status ?? '-'}</span></td>
                      <td className="px-4 py-4 text-[#5f5f5f]">{asset.location ?? '-'}</td>
                      <td className="px-4 py-4 text-[#5f5f5f]">{asset.owner ?? '-'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
