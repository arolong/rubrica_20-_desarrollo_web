# Entregables - MVP Sistema de Gestion de Activos Tecnologicos

## Propuesta

Se propone un MVP web para la gestion de activos tecnologicos que permita controlar inventario, categorias y mantenimientos. El prototipo prioriza la trazabilidad basica del activo (codigo, estado, ubicacion, responsable) y su ciclo de mantenimiento (tipo, estado y fechas), con una interfaz clara para consulta rapida.

### Diseno visual
- Estetica sobria y academica, con fondo claro y tarjetas suaves.
- Paleta base en verdes desaturados y acentos dorados para resaltar acciones.
- Tipografia limpia y legible; enfasis en jerarquia visual con titulos grandes y etiquetas en mayusculas.
- Componentes clave: dashboard con indicadores, tablas de inventario y formularios rapidos.

## Herramientas a utilizar
- Next.js (App Router) para UI y rutas.
- Tailwind CSS para estilos y consistencia visual.
- Prisma + SQLite para modelo de datos y migraciones.
- Git/GitHub para control de versiones.

## Alcances y objetivos
### Alcances
- Gestion de activos (listado, detalle visual y estados).
- Gestion de categorias con conteo por tipo.
- Gestion de mantenimientos (agenda y registro rapido).
- Modelo de datos base con relaciones entre activos, categorias y mantenimientos.

### Objetivos
- Validar la estructura del sistema antes de una fase completa.
- Definir el modelo de datos minimo para inventario y mantenimiento.
- Presentar una UI funcional para comunicacion del flujo del sistema.

## Muestra de codigo (aprox. 25%)
Se selecciona una muestra representativa del MVP: navegacion, vistas principales y esquema de datos.

### Navegacion principal (TopNav)
```tsx
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

				## Estado actual del entregable (MVP)

				- Base de datos: migrada a Neon (Postgres). `prisma/schema.postgres.prisma` y `prisma/seed.js` incluidos.
				- APIs implementadas: `activos`, `categorias`, `mantenimientos` (GET/POST y endpoints por id: GET/PUT/DELETE).
				- UI implementada: listados y formularios para `activos`, `categorias` y `mantenimientos`.
				- Detalle de activo: muestra datos reales desde la BD y permite editar/eliminar desde la UI (`EditAssetForm`).
				- Scripts y config de despliegue: `netlify.toml`, `README_DEPLOY.md`, `build:prod` en `package.json`.
				- Seed/migraciones: `npm run seed:neon` disponible para poblar Neon desde `dev.db`.

				## Pendientes antes de producción

				- Rotar credenciales de Neon (urgente) y configurar `DATABASE_URL` en Netlify.
				- Completar pruebas automatizadas y linters; agregar CI si se desea.
				- Pulir navegación y estilos (`TopNav`) y validaciones UI adicionales.
				- Configurar observabilidad y backups para Neon.
				- Hacer commit final y push al repositorio remoto y activar deploy en Netlify.

				---

				Documento actualizado en el repo con el estado del MVP y pasos siguientes.

				## Cambios recientes

				- Correcciones del build: se eliminaron exports duplicados en `app/categorias/page.tsx` y `app/mantenimientos/page.tsx`.
				- Ajustes en las rutas API: firmas normalizadas en `app/api/*/[id]/route.ts` para resolver diferencias de tipos de `params` en versiones recientes de Next.js.
				- Commit y push: `561702dbfbb4f3c0241fa01550cdd637d0196725` (rama `main`) — cambios subidos al remoto.
				- Estado del build: `npm run build:prod` pasa localmente después de los arreglos.
				- Pendiente (urgente): rotar credenciales de Neon y configurar `DATABASE_URL` en Netlify (no incluir credenciales en el repo).

					</Link>
				))}
			</div>
		</nav>
	);
}
```

### Dashboard (resumen)
```tsx
const stats = [
	{ label: "Activos activos", value: "128" },
	{ label: "En mantenimiento", value: "7" },
	{ label: "Por renovar", value: "12" },
	{ label: "Incidencias", value: "3" },
];

const assets = [
	{ code: "AT-0031", name: "Laptop Dell 5420", type: "Computo" },
	{ code: "AT-0044", name: "AP UniFi U6", type: "Red" },
];

export default function DashboardPage() {
	return (
		<section className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm">
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
				{stats.map((item) => (
					<div key={item.label} className="rounded-2xl border border-black/5 bg-white/80 p-5">
						<p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7f7f7f]">
							{item.label}
						</p>
						<p className="mt-4 text-3xl font-semibold text-[#1f1f1f]">{item.value}</p>
					</div>
				))}
			</div>
			<div className="mt-6 overflow-hidden rounded-2xl border border-black/5">
				<table className="w-full text-left text-sm">
					<thead className="bg-[#f8f6f2] text-xs uppercase tracking-[0.2em] text-[#777]">
						<tr>
							<th className="px-4 py-3">Codigo</th>
							<th className="px-4 py-3">Activo</th>
							<th className="px-4 py-3">Tipo</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-black/5">
						{assets.map((asset) => (
							<tr key={asset.code} className="hover:bg-[#fbfaf7]">
								<td className="px-4 py-4 font-semibold text-[#2a2a2a]">{asset.code}</td>
								<td className="px-4 py-4 text-[#1f1f1f]">{asset.name}</td>
								<td className="px-4 py-4 text-[#5f5f5f]">{asset.type}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</section>
	);
}
```

### Listado de activos
```tsx
const assets = [
	{
		id: "AT-0031",
		name: "Laptop Dell 5420",
		category: "Computo",
		status: "Operativo",
		location: "Administracion",
		owner: "Luisa Mendez",
	},
];

export default function ActivosPage() {
	return (
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
						<td className="px-4 py-4 font-semibold text-[#2a2a2a]">{asset.id}</td>
						<td className="px-4 py-4 text-[#1f1f1f]">{asset.name}</td>
						<td className="px-4 py-4 text-[#5f5f5f]">{asset.category}</td>
						<td className="px-4 py-4">
							<span className="rounded-full bg-[#f3f3f3] px-3 py-1 text-xs font-semibold text-[#3a3a3a]">
								{asset.status}
							</span>
						</td>
						<td className="px-4 py-4 text-[#5f5f5f]">{asset.location}</td>
						<td className="px-4 py-4 text-[#5f5f5f]">{asset.owner}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
```

### Mantenimientos (registro rapido)
```tsx
const tasks = [
	{
		id: "MT-2001",
		asset: "Laptop Dell 5420",
		type: "Preventivo",
		status: "En curso",
		owner: "Carlos Ospina",
		date: "2026-04-20",
	},
];

export default function MantenimientosPage() {
	return (
		<div className="rounded-2xl bg-[#f8f6f2] p-5">
			<h3 className="text-lg font-semibold text-[#1f1f1f]">Registro rapido</h3>
			<form className="mt-4 grid gap-3">
				<input
					className="h-11 rounded-xl border border-black/10 px-4 text-sm outline-none transition focus:border-[#2f6b62]"
					placeholder="Codigo del activo"
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
	);
}
```

### Esquema de datos (Prisma)
```prisma
model Category {
	id          String   @id @default(cuid())
	name        String   @unique
	description String?
	assets      Asset[]
	createdAt   DateTime @default(now())
	updatedAt   DateTime @updatedAt
}

model Asset {
	id           String        @id @default(cuid())
	code         String        @unique
	name         String
	status       AssetStatus   @default(ACTIVE)
	serial       String?
	purchaseDate DateTime?
	location     String
	owner        String
	categoryId   String
	category     Category      @relation(fields: [categoryId], references: [id])
	maintenance  Maintenance[]
	createdAt    DateTime      @default(now())
	updatedAt    DateTime      @updatedAt
}

model Maintenance {
	id          String             @id @default(cuid())
	assetId     String
	asset       Asset              @relation(fields: [assetId], references: [id])
	type        MaintenanceType
	status      MaintenanceStatus  @default(PENDING)
	scheduledAt DateTime
	completedAt DateTime?
	notes       String?
	createdAt   DateTime           @default(now())
}
```
