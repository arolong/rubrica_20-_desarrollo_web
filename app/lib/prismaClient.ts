// Try to load the generated local Prisma client first (used in dev),
// otherwise fall back to the package-installed @prisma/client (used in production builds).
// This keeps imports stable across environments.
/* eslint-disable @typescript-eslint/ban-ts-comment */
let PrismaClient: any;
try {
  // generated client path used when running `npx prisma generate --schema=prisma/schema.prisma`
  // in local dev (output configured to ../app/generated/prisma)
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  PrismaClient = require('../generated/prisma').PrismaClient;
} catch (e) {
  // fallback to package @prisma/client (Netlify builds generate client into node_modules)
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  PrismaClient = require('@prisma/client').PrismaClient;
}

const prisma = new PrismaClient();
export default prisma;
