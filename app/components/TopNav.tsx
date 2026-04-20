import Link from "next/link";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/activos", label: "Activos" },
  { href: "/categorias", label: "Categorias" },
  { href: "/mantenimientos", label: "Mantenimientos" },
];

export default function TopNav() {
  return (
    <nav className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-6 pt-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#6b705c]">
          Gestion de activos tecnologicos
        </p>
        <h1 className="mt-2 text-2xl font-semibold text-[#151515]">
          Activos Tech
        </h1>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-full border border-black/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#3c3c3c] transition hover:border-black/30"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
