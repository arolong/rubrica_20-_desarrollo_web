"use client";

import { useEffect, useState } from "react";
import TopNav from "../components/TopNav";

type Category = { id: string; name: string; description?: string };

export default function CategoriasPage() {
  const [cats, setCats] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', description: '' });

  useEffect(() => { fetchCats(); }, []);

  async function fetchCats() {
    setLoading(true);
    const res = await fetch('/api/categorias');
    if (res.ok) setCats(await res.json());
    setLoading(false);
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) return alert('Nombre requerido');
    const res = await fetch('/api/categorias', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    if (res.ok) { setForm({ name: '', description: '' }); fetchCats(); } else alert('Error');
  }

  async function handleDelete(id: string) {
    if (!confirm('Eliminar categoría?')) return;
    const res = await fetch(`/api/categorias/${id}`, { method: 'DELETE' });
    if (res.ok) fetchCats(); else alert('Error');
  }

  return (
    <div className="min-h-full bg-[#f5f4ef]">
      <TopNav />
      <main className="mx-auto w-full max-w-4xl px-6 pb-16 pt-10">
        <section className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#6b705c]">Categorias</p>
              <h2 className="mt-2 text-2xl font-semibold text-[#151515]">Gestionar categorias</h2>
            </div>
          </div>

          <form onSubmit={handleCreate} className="mt-6 grid gap-3 sm:grid-cols-3">
            <input required placeholder="Nombre" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="rounded-lg border p-2" />
            <input placeholder="Descripcion" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="rounded-lg border p-2" />
            <div className="flex gap-2">
              <button type="submit" className="rounded-full bg-[#2f6b62] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white">Crear</button>
            </div>
          </form>

          <div className="mt-6">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#f8f6f2] text-xs uppercase tracking-[0.2em] text-[#777]"><tr><th className="px-4 py-3">Nombre</th><th className="px-4 py-3">Descripcion</th><th className="px-4 py-3">Acciones</th></tr></thead>
              <tbody className="divide-y divide-black/5">
                {loading ? (<tr><td colSpan={3} className="px-4 py-6">Cargando...</td></tr>) : cats.length === 0 ? (<tr><td colSpan={3} className="px-4 py-6">Sin categorias</td></tr>) : cats.map(c => (
                  <tr key={c.id} className="hover:bg-[#fbfaf7]"><td className="px-4 py-4">{c.name}</td><td className="px-4 py-4">{c.description ?? '-'}</td><td className="px-4 py-4"><button onClick={() => handleDelete(c.id)} className="rounded-full border px-3 py-1 text-xs">Eliminar</button></td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
import TopNav from "../components/TopNav";

const categories = [
  { name: "Computo", count: 48, highlight: "Equipos de escritorio y portatiles" },
  { name: "Red", count: 22, highlight: "Routers, switches, puntos de acceso" },
  { name: "Impresion", count: 16, highlight: "Impresoras y consumibles" },
  { name: "Moviles", count: 12, highlight: "Tablets y celulares" },
];

export default function CategoriasPage() {
  return (
    <div className="min-h-full bg-[#f5f4ef]">
      <TopNav />
      <main className="mx-auto w-full max-w-6xl px-6 pb-16 pt-10">
        <section className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#6b705c]">
                Categorias
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-[#151515]">
                Clasificacion de activos
              </h2>
              <p className="mt-2 text-sm text-[#6f6f6f]">
                Ordena el inventario por tipo y nivel de uso.
              </p>
            </div>
            <button className="rounded-full bg-[#2f6b62] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white">
              Nueva categoria
            </button>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {categories.map((category) => (
              <div
                key={category.name}
                className="rounded-2xl border border-black/5 bg-[#f8f6f2] p-5"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7f7f7f]">
                  {category.name}
                </p>
                <p className="mt-3 text-3xl font-semibold text-[#151515]">
                  {category.count}
                </p>
                <p className="mt-2 text-sm text-[#6f6f6f]">
                  {category.highlight}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
