"use client";

import { useEffect, useState } from 'react';
import TopNav from '../components/TopNav';

type Maintenance = any;

export default function MantenimientosPage() {
  const [items, setItems] = useState<Maintenance[]>([]);
  const [assets, setAssets] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ assetId: '', type: 'PREVENTIVE', scheduledAt: '', notes: '' });

  useEffect(() => { fetchAll(); }, []);

  async function fetchAll() {
    setLoading(true);
    try {
      const [r1, r2] = await Promise.all([fetch('/api/mantenimientos'), fetch('/api/activos')]);
      if (r1.ok) setItems(await r1.json());
      if (r2.ok) setAssets(await r2.json());
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!form.assetId || !form.scheduledAt) return alert('Seleccione activo y fecha');
    const res = await fetch('/api/mantenimientos', { 
      method: 'POST', 
      headers: { 'Content-Type':'application/json' }, 
      body: JSON.stringify(form) 
    });
    if (res.ok) { 
      setForm({ assetId: '', type: 'PREVENTIVE', scheduledAt: '', notes: '' }); 
      fetchAll(); 
    } else {
      alert('Error');
    }
  }

  return (
    <div className="min-h-full bg-[#f5f4ef]">
      <TopNav />
      <main className="mx-auto w-full max-w-6xl px-6 pb-16 pt-10">
        <section className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#6b705c]">Mantenimientos</p>
              <h2 className="mt-2 text-3xl font-semibold text-[#151515]">Programar mantenimiento</h2>
            </div>
          </div>

          <form onSubmit={handleCreate} className="mt-6 grid gap-3 sm:grid-cols-4">
            <select 
              required 
              value={form.assetId} 
              onChange={e => setForm({ ...form, assetId: e.target.value })} 
              className="rounded-lg border p-2 text-sm"
            >
              <option value="">Seleccionar activo</option>
              {assets.map(a => <option key={a.id} value={a.id}>{a.code ?? a.id} - {a.name}</option>)}
            </select>
            <select 
              value={form.type} 
              onChange={e => setForm({ ...form, type: e.target.value })} 
              className="rounded-lg border p-2 text-sm"
            >
              <option value="PREVENTIVE">Preventivo</option>
              <option value="CORRECTIVE">Correctivo</option>
            </select>
            <input 
              type="date" 
              required 
              value={form.scheduledAt} 
              onChange={e => setForm({ ...form, scheduledAt: e.target.value })} 
              className="rounded-lg border p-2 text-sm"
            />
            <button type="submit" className="rounded-lg bg-[#2f6b62] px-4 py-2 text-sm font-semibold text-white">
              Agendar
            </button>
          </form>

          <div className="mt-8 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#f8f6f2] text-xs uppercase tracking-[0.2em] text-[#777]">
                <tr>
                  <th className="px-4 py-3">Activo</th>
                  <th className="px-4 py-3">Tipo</th>
                  <th className="px-4 py-3">Fecha</th>
                  <th className="px-4 py-3">Notas</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {loading ? (
                  <tr><td colSpan={4} className="px-4 py-6 text-center">Cargando...</td></tr>
                ) : items.length === 0 ? (
                  <tr><td colSpan={4} className="px-4 py-6 text-center">Sin mantenimientos</td></tr>
                ) : (
                  items.map(m => (
                    <tr key={m.id} className="hover:bg-[#fbfaf7]">
                      <td className="px-4 py-4">{m.asset?.name || m.assetId}</td>
                      <td className="px-4 py-4">{m.type}</td>
                      <td className="px-4 py-4">{m.scheduledAt ? new Date(m.scheduledAt).toLocaleDateString() : '-'}</td>
                      <td className="px-4 py-4">{m.notes ?? '-'}</td>
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
