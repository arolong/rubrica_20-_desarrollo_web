# Sistema de Gestión de Activos Tecnológicos - Proyecto Completo

## 📋 Descripción

Sistema web completo para la gestión de activos tecnológicos que permite:
- **Inventario**: Crear, listar, editar y eliminar activos con código, nombre, categoría, ubicación y responsable.
- **Categorías**: Administrar categorías de activos.
- **Mantenimiento**: Programar y registrar mantenimientos (preventivo/correctivo) con fechas y notas.
- **Dashboard**: Vista panorámica con indicadores de estado, inventario reciente y actividad.

## 🛠 Stack Tecnológico

| Componente | Tecnología |
|---|---|
| Framework Frontend | Next.js 16.2.4 (App Router) |
| UI Library | React 19.x |
| Estilos | Tailwind CSS v4 |
| ORM | Prisma 5.x |
| Base de Datos (Dev) | SQLite (dev.db) |
| Base de Datos (Prod) | PostgreSQL (Neon) |
| Deployment | Netlify |
| Versionado | Git/GitHub |

## ✅ Características Implementadas

### 1. API REST (6 endpoints)
- ✅ `GET/POST /api/activos` — Listar y crear activos
- ✅ `GET/PUT/DELETE /api/activos/[id]` — Detalle, editar y eliminar activo
- ✅ `GET/POST /api/categorias` — Listar y crear categorías
- ✅ `GET/PUT/DELETE /api/categorias/[id]` — Detalle, editar y eliminar categoría
- ✅ `GET/POST /api/mantenimientos` — Listar y crear mantenimientos
- ✅ `GET/PUT/DELETE /api/mantenimientos/[id]` — Detalle, editar y eliminar mantenimiento

### 2. Páginas UI
- ✅ **Dashboard** (`/dashboard`) — Indicadores, tabla de inventario reciente, formulario de mantenimiento rápido
- ✅ **Activos** (`/activos`) — Listado con filtro por categoría, formulario crear, tabla con links a detalle
- ✅ **Detalle Activo** (`/activos/[id]`) — Mostrar datos, editar y eliminar
- ✅ **Categorías** (`/categorias`) — Listado, crear, eliminar
- ✅ **Mantenimientos** (`/mantenimientos`) — Listado, programar mantenimientos por activo

### 3. Funcionalidad de Botones
- ✅ **"Nuevo activo"** (Dashboard) → Link a `/activos`
- ✅ **"Ver reportes"** (Dashboard) → Deshabilitado con tooltip (no implementado)
- ✅ **"Filtrar"** (Dashboard/Activos) → Filtro por estado/categoría con select dropdown
- ✅ **"Exportar"** (Dashboard/Activos) → Descarga CSV de tabla filtrada

### 4. Base de Datos
- ✅ **Prisma Migrations** — `20260420173825_init` aplicada a Neon
- ✅ **Seed Script** — `prisma/seed.js` para poblar desde SQLite a Neon
- ✅ **Dos esquemas** — `prisma/schema.prisma` (SQLite/dev) y `prisma/schema.postgres.prisma` (Postgres/prod)
- ✅ **Modelos** — Category, Asset, Maintenance con relaciones bidireccionales

### 5. Deploy & DevOps
- ✅ **Netlify** — Deploy automático, configurado en `netlify.toml`
- ✅ **Build Config** — Next.js plugin, Prisma generate para Postgres
- ✅ **Environment Variables** — `DATABASE_URL` configurada en Netlify
- ✅ **Live URL** — https://rubricadesarrolloweb.netlify.app

### 6. Seguridad & Mantenimiento
- ✅ **Rotación de credenciales Neon** — Nueva password configurada, antigua en pendiente de revocación
- ✅ **Migraciones versionadas** — Control de cambios en BD
- ✅ **Git commits** — Historial limpio con mensajes descriptivos

## 📁 Estructura del Proyecto

```
rubrica/
├── app/
│   ├── api/
│   │   ├── activos/
│   │   │   ├── route.ts          (GET/POST)
│   │   │   └── [id]/route.ts     (GET/PUT/DELETE)
│   │   ├── categorias/
│   │   │   ├── route.ts          (GET/POST)
│   │   │   └── [id]/route.ts     (GET/PUT/DELETE)
│   │   └── mantenimientos/
│   │       ├── route.ts          (GET/POST)
│   │       └── [id]/route.ts     (GET/PUT/DELETE)
│   ├── activos/
│   │   ├── page.tsx              (Listado + crear)
│   │   └── [id]/
│   │       ├── page.tsx          (Detalle + editar)
│   │       └── EditAssetForm.tsx (Formulario edición)
│   ├── categorias/page.tsx       (CRUD categorías)
│   ├── mantenimientos/page.tsx   (CRUD mantenimientos)
│   ├── dashboard/page.tsx        (Dashboard con filtro/export)
│   ├── components/TopNav.tsx     (Navegación)
│   ├── layout.tsx                (Layout base)
│   └── page.tsx                  (Home)
├── prisma/
│   ├── schema.prisma             (SQLite - dev)
│   ├── schema.postgres.prisma    (Postgres - prod)
│   ├── seed.js                   (Seed script)
│   └── migrations/
│       └── 20260420173825_init/  (Migration inicial)
├── public/                       (Archivos estáticos)
├── package.json                  (Dependencias + scripts)
├── tsconfig.json                 (TypeScript config)
├── next.config.ts                (Next.js config)
├── tailwind.config.ts            (Tailwind config)
├── prisma.config.ts              (Prisma config)
├── netlify.toml                  (Deploy config)
├── .env                          (Env vars dev)
├── ENTREGABLES.md                (Este archivo)
└── README.md / README_DEPLOY.md  (Documentación)
```

## 🚀 Cómo Usar

### Desarrollo Local
```bash
# Instalar dependencias
npm install

# Generar Prisma Client
npx prisma generate

# Aplicar migraciones locales
npx prisma migrate deploy

# Iniciar servidor dev
npm run dev
# Abierto en http://localhost:3000
```

### Build Producción
```bash
# Generar cliente Prisma para Postgres
npx prisma generate --schema=prisma/schema.postgres.prisma

# Build Next.js
next build
```

### Seed Neon (Producción)
```bash
# Requiere DATABASE_URL de Neon en .env
npm run seed:neon
```

## 📊 Datos de Ejemplo

El dashboard muestra:
- **128** activos activos
- **7** en mantenimiento
- **12** por renovar
- **3** incidencias

Tabla de inventario reciente con 4 activos de ejemplo (laptop, AP, impresora, switch).

## 🔒 Seguridad

- ✅ Credenciales de Neon rotadas (nueva password configurada en Netlify)
- ⚠️ **Pendiente**: Revocar credencial antigua en consola de Neon (Settings → Credentials)
- ✅ `DATABASE_URL` configurada en variables de entorno de Netlify (no en repo)
- ✅ Validaciones de entrada en formularios

## ⚙️ Configuración de Netlify

**Build Command:** `npx prisma generate --schema=prisma/schema.postgres.prisma && next build`

**Environment Variables:**
- `DATABASE_URL` = `postgresql://user:password@ep-XXX.neon.tech/neondb`

**Plugins:**
- @netlify/plugin-nextjs

## 📈 Commits Recientes

| Hash | Mensaje |
|---|---|
| da772d3 | feat: implement all button functionality - add filter, export, and navigation |
| 561702d | chore: fix build - remove duplicate exports and normalize API handlers |
| 62b09b9 | Netlify deploy successful |

## ✨ Pendientes Inmediatos

1. **[URGENTE]** Revocar credencial antigua en Neon Console:
   - Ir a https://console.neon.tech → Project → Settings → Credentials
   - Eliminar el rol/password anterior (no la nueva)

2. **[OPCIONAL]** Agregar para mayor completitud:
   - Pruebas automatizadas (Jest/Vitest)
   - ESLint y Prettier configurados
   - Observabilidad (logs, monitoreo)
   - Backups automáticos en Neon

## 🔗 URLs Importantes

- **Live App:** https://rubricadesarrolloweb.netlify.app
- **Neon Dashboard:** https://console.neon.tech
- **Netlify Site:** https://app.netlify.com

---

**Estado:** ✅ Proyecto completo y en producción
**Última actualización:** 2026-05-21
