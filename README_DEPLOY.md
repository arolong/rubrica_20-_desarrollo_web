# Despliegue a Netlify — Guía rápida

Pasos para desplegar esta aplicación en Netlify usando Neon (Postgres):

1) Rotar credenciales Neon (URGENTE)
   - Antes de publicar, entra al dashboard de Neon y rota la contraseña/clave que usaste aquí.
   - Actualiza la connection string en Netlify (ver paso 3) y en tu entorno local si es necesario.

2) Variables de entorno en Netlify
   - En Netlify Site → Site settings → Build & deploy → Environment, añade:
     - `DATABASE_URL` = `postgresql://USER:NEW_PASSWORD@HOST:PORT/DATABASE?schema=public`
     - cualquier `NEXT_PUBLIC_*` que uses.

3) Configuración de build
   - El repositorio incluye `netlify.toml` que ejecuta `npx prisma generate --schema=prisma/schema.postgres.prisma && npm run build`.
   - El plugin `@netlify/plugin-nextjs` está añadido como dependencia de desarrollo.

4) Migraciones en producción
   - En la primera vez, asegura que las migraciones están aplicadas en Neon:
     - Ejecuta en CI o en una terminal con `DATABASE_URL` apuntando a Neon:

       npx prisma generate --schema=prisma/schema.postgres.prisma
       npx prisma migrate deploy --schema=prisma/schema.postgres.prisma

5) Seed (opcional)
   - Si necesitas poblar datos en prod, usa el script `npm run seed:neon` con `DATABASE_URL` apuntando a Neon.

6) Push y activar deploy
   - Haz commit y push a tu repo remoto y conecta el repo en Netlify (o activa deploy manualmente).

7) Monitoreo y backups
   - Configura backups en Neon y revisa logs/alertas en Netlify.

Notas de seguridad
   - Nunca subas `DATABASE_URL` al repositorio. Usa siempre variables de entorno en Netlify.
   - Rota la credencial que compartiste con el asistente antes de producción.
