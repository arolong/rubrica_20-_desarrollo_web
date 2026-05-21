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
    const [r1, r2] = await Promise.all([fetch('/api/mantenimientos'), fetch('/api/activos')]);
    if (r1.ok) setItems(await r1.json());
    if (r2.ok) setAssets(await r2.json());
    setLoading(false);
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!form.assetId || !form.scheduledAt) return alert('Seleccione activo y fecha');
    const res = await fetch('/api/mantenimientos', { method: 'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify(form) });
    if (res.ok) { setForm({ assetId: '', type: 'PREVENTIVE', scheduledAt: '', notes: '' }); fetchAll(); } else alert('Error');
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
            <select required value={form.assetId} onChange={e => setForm({ ...form, assetId: e.target.value })} className="rounded-lg border p-2">
              <option value="">Seleccionar activo</option>
              {assets.map(a => <option key={a.id} value={a.id}>{a.code ?? a.id} — {a.name}</option>)}
            </select>
            <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className="rounded-lg border p-2">
              <option value="PREVENTIVE">Preventivo</option>
              <option value="CORRECTIVE">Correctivo</option>
              <option value="WARRANTY">Garantía</option>
            </select>
            <input required type="date" value={form.scheduledAt} onChange={e => setForm({ ...form, scheduledAt: e.target.value })} className="rounded-lg border p-2" />
            <input placeholder="Notas" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} className="rounded-lg border p-2" />
            <div className="sm:col-span-4 mt-2">
              <button type="submit" className="rounded-full bg-[#2f6b62] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white">Crear mantenimiento</button>
            </div>
          </form>

          <div className="mt-6">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#f8f6f2] text-xs uppercase tracking-[0.2em] text-[#777]"><tr><th className="px-4 py-3">Activo</th><th className="px-4 py-3">Tipo</th><th className="px-4 py-3">Estado</th><th className="px-4 py-3">Fecha</th><th className="px-4 py-3">Notas</th></tr></thead>
              <tbody className="divide-y divide-black/5">
                {loading ? (<tr><td colSpan={5} className="px-4 py-6">Cargando...</td></tr>) : items.length === 0 ? (<tr><td colSpan={5} className="px-4 py-6">Sin mantenimientos</td></tr>) : items.map(m => (
                  <tr key={m.id} className="hover:bg-[#fbfaf7]"><td className="px-4 py-4">{m.asset?.code ?? m.assetId} — {m.asset?.name}</td><td className="px-4 py-4">{m.type}</td><td className="px-4 py-4">{m.status}</td><td className="px-4 py-4">{new Date(m.scheduledAt).toISOString().slice(0,10)}</td><td className="px-4 py-4">{m.notes ?? '-'}</td></tr>
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

const tasks = [
  {
    id: "MT-2001",
    asset: "Laptop Dell 5420",
    type: "Preventivo",
    status: "En curso",
    owner: "Carlos Ospina",
    date: "2026-04-20",
  },
  {
    id: "MT-2002",
    asset: "Impresora HP 402",
    type: "Correctivo",
    status: "Pendiente",
    owner: "Area TI",
    date: "2026-04-18",
  },
  {
    id: "MT-1997",
    asset: "AP UniFi U6",
    type: "Preventivo",
    status: "Finalizado",
    owner: "Soporte TI",
    date: "2026-04-10",
  },
];

export default function MantenimientosPage() {
  return (
    <div className="min-h-full bg-[#f5f4ef]">
      <TopNav />
      <main className="mx-auto w-full max-w-6xl px-6 pb-16 pt-10">
        <section className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#6b705c]">
                Mantenimientos
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-[#151515]">
                Agenda y seguimiento
              </h2>
              <p className="mt-2 text-sm text-[#6f6f6f]">
                Controla preventivos, correctivos y garantias.
              </p>
            </div>
            <button className="rounded-full bg-[#2f6b62] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white">
              Nuevo mantenimiento
            </button>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_0.6fr]">
            <div className="overflow-hidden rounded-2xl border border-black/5">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#f8f6f2] text-xs uppercase tracking-[0.2em] text-[#777]">
                  <tr>
                    <th className="px-4 py-3">Codigo</th>
                    <th className="px-4 py-3">Activo</th>
                    <th className="px-4 py-3">Tipo</th>
                    <th className="px-4 py-3">Estado</th>
                    <th className="px-4 py-3">Responsable</th>
                    <th className="px-4 py-3">Fecha</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  {tasks.map((task) => (
                    <tr key={task.id} className="hover:bg-[#fbfaf7]">
                      <td className="px-4 py-4 font-semibold text-[#2a2a2a]">
                        {task.id}
                      </td>
                      <td className="px-4 py-4 text-[#1f1f1f]">
                        {task.asset}
                      </td>
                      <td className="px-4 py-4 text-[#5f5f5f]">
                        {task.type}
                      </td>
                      <td className="px-4 py-4">
                        <span className="rounded-full bg-[#f3f3f3] px-3 py-1 text-xs font-semibold text-[#3a3a3a]">
                          {task.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-[#5f5f5f]">
                        {task.owner}
                      </td>
                      <td className="px-4 py-4 text-[#6f6f6f]">
                        {task.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="rounded-2xl bg-[#f8f6f2] p-5">
              <h3 className="text-lg font-semibold text-[#1f1f1f]">
                Registro rapido
              </h3>
              <p className="mt-2 text-sm text-[#6f6f6f]">
                Deja programado el siguiente mantenimiento.
              </p>
              <form className="mt-4 grid gap-3">
                <input
                  className="h-11 rounded-xl border border-black/10 px-4 text-sm outline-none transition focus:border-[#2f6b62]"
                  placeholder="Codigo del activo"
                />
                <input
                  className="h-11 rounded-xl border border-black/10 px-4 text-sm outline-none transition focus:border-[#2f6b62]"
                  placeholder="Responsable"
                />
                <select className="h-11 rounded-xl border border-black/10 px-4 text-sm text-[#5f5f5f] outline-none transition focus:border-[#2f6b62]">
                  <option>Tipo de mantenimiento</option>
                  <option>Preventivo</option>
                  <option>Correctivo</option>
                  <option>Garantia</option>
                </select>
                <button className="h-11 rounded-xl bg-[#2f6b62] text-sm font-semibold text-white transition hover:bg-[#25564f]">
                  Registrar
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
