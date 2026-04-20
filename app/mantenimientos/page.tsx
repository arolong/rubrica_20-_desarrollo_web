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
