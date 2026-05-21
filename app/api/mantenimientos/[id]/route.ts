import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(_req: Request, context: any) {
  try {
    const params = await Promise.resolve(context.params);
    const m = await prisma.maintenance.findUnique({ where: { id: params.id }, include: { asset: true } });
    if (!m) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(m);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch maintenance' }, { status: 500 });
  }
}

export async function PUT(request: Request, context: any) {
  try {
    const params = await Promise.resolve(context.params);
    const body = await request.json();
    const updates: any = {};
    const allowed = ['status', 'type', 'scheduledAt', 'completedAt', 'notes'];
    for (const k of allowed) if (k in body) updates[k] = body[k];
    if (updates.scheduledAt) updates.scheduledAt = new Date(updates.scheduledAt);
    if (updates.completedAt) updates.completedAt = new Date(updates.completedAt);

    const m = await prisma.maintenance.update({ where: { id: params.id }, data: updates });

    if (updates.status === 'DONE') {
      await prisma.asset.update({ where: { id: m.assetId }, data: { status: 'ACTIVE' } });
    }

    return NextResponse.json(m);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update maintenance' }, { status: 500 });
  }
}

export async function DELETE(_req: Request, context: any) {
  try {
    const params = await Promise.resolve(context.params);
    await prisma.maintenance.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete maintenance' }, { status: 500 });
  }
}

