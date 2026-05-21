import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const items = await prisma.maintenance.findMany({ include: { asset: true }, orderBy: { scheduledAt: 'desc' } });
    return NextResponse.json(items);
  } catch (err) {
    console.error('GET /api/mantenimientos error:', err);
    return NextResponse.json({ error: 'Failed to fetch maintenances' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { assetId, type, scheduledAt, notes } = body;
    if (!assetId || !type || !scheduledAt) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });

    const maint = await prisma.maintenance.create({ data: {
      assetId,
      type,
      scheduledAt: new Date(scheduledAt),
      notes: notes ?? null,
    }});

    // mark asset as in maintenance
    await prisma.asset.update({ where: { id: assetId }, data: { status: 'MAINTENANCE' } });

    // simple notification placeholder
    console.log(`Maintenance created for asset ${assetId} (id: ${maint.id})`);

    return NextResponse.json(maint, { status: 201 });
  } catch (err) {
    console.error('POST /api/mantenimientos error:', err);
    return NextResponse.json({ error: 'Failed to create maintenance' }, { status: 500 });
  }
}
