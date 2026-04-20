import TopNav from "../../components/TopNav";

const assetDetail = {
  id: "AT-0031",
  name: "Laptop Dell 5420",
  category: "Computo",
  status: "Operativo",
  location: "Administracion",
  owner: "Luisa Mendez",
  purchaseDate: "2025-02-10",
  serial: "DL5420-8844-XY",
  notes: "Equipo asignado a area administrativa.",
};

export default function ActivoDetallePage({
  params,
}: {
  params: { id: string };
}) {
  const asset = { ...assetDetail, id: params.id };

  return (
    <div className="min-h-full bg-[#f5f4ef]">
      <TopNav />
      <main className="mx-auto w-full max-w-5xl px-6 pb-16 pt-10">
        <section className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#6b705c]">
                Detalle del activo
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-[#151515]">
                {asset.name}
              </h2>
              <p className="mt-2 text-sm text-[#6f6f6f]">Codigo {asset.id}</p>
            </div>
            <span className="rounded-full bg-[#f3f3f3] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#3a3a3a]">
              {asset.status}
            </span>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-[#f8f6f2] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7f7f7f]">
                Categoria
              </p>
              <p className="mt-2 text-lg font-semibold text-[#1f1f1f]">
                {asset.category}
              </p>
            </div>
            <div className="rounded-2xl bg-[#f8f6f2] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7f7f7f]">
                Ubicacion
              </p>
              <p className="mt-2 text-lg font-semibold text-[#1f1f1f]">
                {asset.location}
              </p>
            </div>
            <div className="rounded-2xl bg-[#f8f6f2] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7f7f7f]">
                Responsable
              </p>
              <p className="mt-2 text-lg font-semibold text-[#1f1f1f]">
                {asset.owner}
              </p>
            </div>
            <div className="rounded-2xl bg-[#f8f6f2] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7f7f7f]">
                Fecha de compra
              </p>
              <p className="mt-2 text-lg font-semibold text-[#1f1f1f]">
                {asset.purchaseDate}
              </p>
            </div>
            <div className="rounded-2xl bg-[#f8f6f2] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7f7f7f]">
                Serie
              </p>
              <p className="mt-2 text-lg font-semibold text-[#1f1f1f]">
                {asset.serial}
              </p>
            </div>
            <div className="rounded-2xl bg-[#f8f6f2] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7f7f7f]">
                Observaciones
              </p>
              <p className="mt-2 text-sm text-[#5f5f5f]">{asset.notes}</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
