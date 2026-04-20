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
