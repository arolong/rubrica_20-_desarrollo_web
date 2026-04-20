import Link from "next/link";
import TopNav from "../components/TopNav";

const assets = [
  {
    id: "AT-0031",
    name: "Laptop Dell 5420",
    category: "Computo",
    status: "Operativo",
    location: "Administracion",
    owner: "Luisa Mendez",
  },
  {
    id: "AT-0044",
    name: "AP UniFi U6",
    category: "Red",
    status: "Operativo",
    location: "Biblioteca",
    owner: "Soporte TI",
  },
  {
    id: "AT-0020",
    name: "Impresora HP 402",
    category: "Impresion",
    status: "Mantenimiento",
    location: "Secretaria",
    owner: "Alvaro Ruiz",
  },
  {
    id: "AT-0101",
    name: "Switch Cisco 2960",
    category: "Red",
    status: "Baja",
    location: "Data Center",
    owner: "Infraestructura",
  },
];

export default function ActivosPage() {
  return (
    <div className="min-h-full bg-[#f5f4ef]">
      <TopNav />
      <main className="mx-auto w-full max-w-6xl px-6 pb-16 pt-10">
        <section className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#6b705c]">
                Activos
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-[#151515]">
                Inventario general
              </h2>
              <p className="mt-2 text-sm text-[#6f6f6f]">
                Gestiona estado, ubicacion y responsables por activo.
              </p>
            </div>
            <div className="flex gap-2">
              <button className="rounded-full border border-black/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#3c3c3c]">
                Filtrar
              </button>
              <button className="rounded-full bg-[#2f6b62] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                Nuevo activo
              </button>
            </div>
          </div>

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
                {assets.map((asset) => (
                  <tr key={asset.id} className="hover:bg-[#fbfaf7]">
                    <td className="px-4 py-4 font-semibold text-[#2a2a2a]">
                      <Link
                        href={`/activos/${asset.id}`}
                        className="text-[#2f6b62]"
                      >
                        {asset.id}
                      </Link>
                    </td>
                    <td className="px-4 py-4 text-[#1f1f1f]">
                      {asset.name}
                    </td>
                    <td className="px-4 py-4 text-[#5f5f5f]">
                      {asset.category}
                    </td>
                    <td className="px-4 py-4">
                      <span className="rounded-full bg-[#f3f3f3] px-3 py-1 text-xs font-semibold text-[#3a3a3a]">
                        {asset.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-[#5f5f5f]">
                      {asset.location}
                    </td>
                    <td className="px-4 py-4 text-[#5f5f5f]">
                      {asset.owner}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
