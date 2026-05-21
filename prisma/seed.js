// prisma/seed.js
// Usage: set DATABASE_URL="postgres://..." && node prisma/seed.js
require('dotenv/config');
const sqlite3 = require('sqlite3');
const { PrismaClient } = require('@prisma/client');

const sqlitePath = process.env.SQLITE_DB_PATH || './dev.db';
const db = new sqlite3.Database(sqlitePath, sqlite3.OPEN_READONLY);
const prisma = new PrismaClient();

function all(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}

async function seed() {
  try {
    console.log('Connecting to target DB (Prisma -> DATABASE_URL)');
    await prisma.$connect();

    console.log('Reading tables from sqlite:', sqlitePath);
    const tables = await all("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'");
    const names = tables.map(t => t.name);
    console.log('Found tables:', names);

    if (names.includes('Category')) {
      const categories = await all('SELECT * FROM Category');
      console.log(`Seeding ${categories.length} categories`);
      for (const c of categories) {
        await prisma.category.upsert({
          where: { id: c.id },
          update: {},
          create: {
            id: c.id,
            name: c.name,
            description: c.description ?? null,
            createdAt: c.createdAt ? new Date(c.createdAt) : undefined,
            updatedAt: c.updatedAt ? new Date(c.updatedAt) : undefined,
          },
        });
      }
    }

    if (names.includes('Asset')) {
      const assets = await all('SELECT * FROM Asset');
      console.log(`Seeding ${assets.length} assets`);
      for (const a of assets) {
        await prisma.asset.upsert({
          where: { id: a.id },
          update: {},
          create: {
            id: a.id,
            code: a.code,
            name: a.name,
            status: a.status,
            serial: a.serial ?? null,
            purchaseDate: a.purchaseDate ? new Date(a.purchaseDate) : null,
            location: a.location,
            owner: a.owner,
            categoryId: a.categoryId,
            createdAt: a.createdAt ? new Date(a.createdAt) : undefined,
            updatedAt: a.updatedAt ? new Date(a.updatedAt) : undefined,
          },
        });
      }
    }

    if (names.includes('Maintenance')) {
      const maints = await all('SELECT * FROM Maintenance');
      console.log(`Seeding ${maints.length} maintenances`);
      for (const m of maints) {
        await prisma.maintenance.upsert({
          where: { id: m.id },
          update: {},
          create: {
            id: m.id,
            assetId: m.assetId,
            type: m.type,
            status: m.status,
            scheduledAt: m.scheduledAt ? new Date(m.scheduledAt) : undefined,
            completedAt: m.completedAt ? new Date(m.completedAt) : null,
            notes: m.notes ?? null,
            createdAt: m.createdAt ? new Date(m.createdAt) : undefined,
          },
        });
      }
    }

    console.log('Seed finished.');
  } catch (err) {
    console.error('Seed error:', err);
  } finally {
    db.close();
    await prisma.$disconnect();
  }
}

seed();
