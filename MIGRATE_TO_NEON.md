MIGRACIÓN A NEON (Postgres) - pasos rápidos

1. Crear la base de datos en Neon y copiar la connection string.

2. Copia .env.neon.example a .env (o exporta DATABASE_URL) y pega la connection string:

    DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE?schema=public"

3. Generar cliente Prisma y aplicar migraciones (usa el schema Postgres alternativo):

    npx prisma generate --schema=prisma/schema.postgres.prisma
    npx prisma migrate deploy --schema=prisma/schema.postgres.prisma

Nota: si tus migraciones fueron generadas para SQLite y fallan, puedes usar:

    npx prisma db push --schema=prisma/schema.postgres.prisma

4. Generar cliente si es necesario:

    npx prisma generate --schema=prisma/schema.postgres.prisma

5. Ejecutar el script de seed para migrar datos desde dev.db:

    npm run seed:neon

6. Verifica la aplicación apuntando a Neon (localmente exportando DATABASE_URL) y prueba npm run build.

7. En Netlify:
   - Añade la variable DATABASE_URL en Site settings → Environment.
   - Asegura que en build se ejecuta: npx prisma generate --schema=prisma/schema.postgres.prisma

Puedo aplicar los pasos automáticamente si me pegas la connection string, o guiarte paso a paso.
