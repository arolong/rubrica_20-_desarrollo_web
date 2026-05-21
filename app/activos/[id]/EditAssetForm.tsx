"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  asset: any;
};

export default function EditAssetForm({ asset }: Props) {
  const router = useRouter();
  const [form, setForm] = useState({
    code: asset.code ?? asset.id,
    name: asset.name ?? "",
    location: asset.location ?? "",
    owner: asset.owner ?? "",
    categoryId: asset.categoryId ?? asset.category?.id ?? "",
    serial: asset.serial ?? "",
    purchaseDate: asset.purchaseDate ? new Date(asset.purchaseDate).toISOString().slice(0,10) : "",
    status: asset.status ?? "",
  });
  const [loading, setLoading] = useState(false);

  function updateField(k: string, v: string) {
    setForm(prev => ({ ...prev, [k]: v }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // basic validation
    if (!form.code.trim() || !form.name.trim() || !form.location.trim() || !form.owner.trim() || !form.categoryId.trim()) {
      alert('Por favor completa los campos obligatorios');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/activos/${asset.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form }),
      });
      if (!res.ok) throw new Error('Error updating');
      router.push('/activos');
    } catch (err) {
      alert('No se pudo actualizar el activo');
    } finally { setLoading(false); }
  }

  async function handleDelete() {
    if (!confirm('Eliminar activo?')) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/activos/${asset.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      router.push('/activos');
    } catch (err) {
      alert('No se pudo eliminar');
    } finally { setLoading(false); }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 rounded-2xl bg-[#fafaf7] p-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <input value={form.code} onChange={e => updateField('code', e.target.value)} placeholder="Codigo" className="rounded-lg border p-2" />
        <input value={form.name} onChange={e => updateField('name', e.target.value)} placeholder="Nombre" className="rounded-lg border p-2" />
        <input value={form.location} onChange={e => updateField('location', e.target.value)} placeholder="Ubicacion" className="rounded-lg border p-2" />
        <input value={form.owner} onChange={e => updateField('owner', e.target.value)} placeholder="Responsable" className="rounded-lg border p-2" />
        <input value={form.serial} onChange={e => updateField('serial', e.target.value)} placeholder="Serie" className="rounded-lg border p-2" />
        <input value={form.purchaseDate} onChange={e => updateField('purchaseDate', e.target.value)} type="date" className="rounded-lg border p-2" />
      </div>
      <div className="mt-4 flex gap-2">
        <button type="submit" disabled={loading} className="rounded-full bg-[#2f6b62] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white">{loading ? 'Guardando...' : 'Guardar'}</button>
        <button type="button" onClick={handleDelete} disabled={loading} className="rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em]">Eliminar</button>
      </div>
    </form>
  );
}
