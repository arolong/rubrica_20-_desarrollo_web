"use client";

import { useState } from "react";
import Link from "next/link";
import TopNav from "../components/TopNav";

const stats = [
  { label: "Activos activos", value: "128" },
  { label: "En mantenimiento", value: "7" },
  { label: "Por renovar", value: "12" },
  { label: "Incidencias", value: "3" },
];

const assets = [
  {
    code: "AT-0031",
    name: "Laptop Dell 5420",
    type: "Computo",
    status: "Operativo",
    area: "Administracion",
    updated: "2026-04-12",
  },
  {
    code: "AT-0044",
    name: "AP UniFi U6",
    type: "Red",
    status: "Operativo",
    area: "Biblioteca",
    updated: "2026-04-09",
  },
  {
    code: "AT-0020",
    name: "Impresora HP 402",
    type: "Impresion",
    status: "Mantenimiento",
    area: "Secretaria",
    updated: "2026-04-05",
  },
  {
    code: "AT-0101",
    name: "Switch Cisco 2960",
    type: "Red",
    status: "Baja",
    area: "Data Center",
    updated: "2026-03-28",
  },
];

const activities = [
  {
    title: "Mantenimiento preventivo",
    detail: "Laptop Dell 5420",
    date: "Hoy 09:20",
  },
  { title: "Alta de activo", detail: "Tablet Samsung A9", date: "Ayer" },
  {
    title: "Cambio de ubicacion",
    detail: "AP UniFi U6",
    date: "Ayer",
  },
];

export default function DashboardPage() {
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const filteredAssets = statusFilter
    ? assets.filter((a) => a.status === statusFilter)
    : assets;

  const downloadCSV = () => {
    const csv =
      "Codigo,Activo,Tipo,Estado,Area,Actualizacion\n" +
      filteredAssets
        .map((a) => `${a.code},${a.name},${a.type},${a.status},${a.area},${a.updated}`)
        .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "activos.csv";
    link.click();
  };
  return (
    <div className="min-h-full bg-[#f5f4ef]">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-32 right-0 h-80 w-80 rounded-full bg-[#f0c778]/40 blur-3xl" />
        <div className="pointer-events-none absolute left-0 top-32 h-96 w-96 rounded-full bg-[#7bb6a7]/35 blur-3xl" />
        <TopNav />
        <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 pt-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#6b705c]">
              Panorama general
            </p>
            <h2 className="mt-3 text-4xl font-semibold leading-tight text-[#151515] sm:text-5xl">
              Controla inventario, mantenimiento y
              <span className="block text-[#2f6b62]">ciclo de vida</span>
            </h2>
          </div>
          <div className="hidden items-center gap-3 sm:flex">
            <button disabled title="Reportes en desarrollo" className="rounded-full border border-black/10 px-5 py-2 text-sm font-medium text-[#999] cursor-not-allowed transition">
              Ver reportes
            </button>
            <Link href="/activos" className="inline-block rounded-full bg-[#2f6b62] px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#25564f]">
              Nuevo activo
            </Link>
          </div>
        </header>

        <section className="mx-auto w-full max-w-6xl px-6 pb-8 pt-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-black/5 bg-white/80 p-5 shadow-sm backdrop-blur"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7f7f7f]">
                  {item.label}
                </p>
                <p className="mt-4 text-3xl font-semibold text-[#1f1f1f]">
                  {item.value}
                </p>
                <p className="mt-2 text-sm text-[#6b6b6b]">
                  Actualizado hace 10 min
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <main className="mx-auto grid w-full max-w-6xl gap-6 px-6 pb-16 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-xl font-semibold text-[#1f1f1f]">
                Inventario reciente
              </h3>
              <p className="text-sm text-[#6f6f6f]">
                Seguimiento rapido de activos con alertas visibles.
              </p>
            </div>
            <div className="flex gap-2">
              <select 
                value={statusFilter || ""}
                onChange={(e) => setStatusFilter(e.target.value || null)}
                className="rounded-full border border-black/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#3c3c3c] bg-white cursor-pointer transition hover:border-black/30"
              >
                <option value="">Todos los estados</option>
                <option value="Operativo">Operativo</option>
                <option value="Mantenimiento">Mantenimiento</option>
                <option value="Baja">Baja</option>
              </select>
              <button
                onClick={downloadCSV}
                className="rounded-full bg-[#f0c778] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#151515] transition hover:bg-[#e8bb66]"
                title="Descargar CSV"
              >
                Exportar
              </button>
            </div>
          </div>
          <div className="mt-6 overflow-hidden rounded-2xl border border-black/5">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#f8f6f2] text-xs uppercase tracking-[0.2em] text-[#777]">
                <tr>
                  <th className="px-4 py-3">Codigo</th>
                  <th className="px-4 py-3">Activo</th>
                  <th className="px-4 py-3">Tipo</th>
                  <th className="px-4 py-3">Estado</th>
                  <th className="px-4 py-3">Area</th>
                  <th className="px-4 py-3">Actualizacion</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {filteredAssets.map((asset) => (
                  <tr key={asset.code} className="hover:bg-[#fbfaf7]">
                    <td className="px-4 py-4 font-semibold text-[#2a2a2a]">
                      {asset.code}
                    </td>
                    <td className="px-4 py-4 text-[#1f1f1f]">
                      {asset.name}
                    </td>
                    <td className="px-4 py-4 text-[#5f5f5f]">
                      {asset.type}
                    </td>
                    <td className="px-4 py-4">
                      <span className="rounded-full bg-[#f3f3f3] px-3 py-1 text-xs font-semibold text-[#3a3a3a]">
                        {asset.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-[#5f5f5f]">
                      {asset.area}
                    </td>
                    <td className="px-4 py-4 text-[#6f6f6f]">
                      {asset.updated}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <aside className="flex flex-col gap-6">
          <section className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-[#1f1f1f]">
              Nuevo mantenimiento
            </h3>
            <p className="mt-2 text-sm text-[#6f6f6f]">
              Registra tareas en menos de 2 minutos.
            </p>
            <form className="mt-5 grid gap-4">
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
          </section>

          <section className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[#1f1f1f]">
                Actividad reciente
              </h3>
              <button className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2f6b62]">
                Ver todo
              </button>
            </div>
            <div className="mt-4 space-y-4">
              {activities.map((item) => (
                <div key={item.title} className="rounded-2xl bg-[#f8f6f2] p-4">
                  <p className="text-sm font-semibold text-[#2a2a2a]">
                    {item.title}
                  </p>
                  <p className="text-xs text-[#6b6b6b]">{item.detail}</p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#9a9a9a]">
                    {item.date}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </main>
    </div>
  );
}
