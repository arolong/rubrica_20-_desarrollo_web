import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  try {
    const asset = await prisma.asset.findUnique({
      where: { id: params.id },
      include: { category: true, maintenance: true },
    });
    if (!asset) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(asset);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch asset' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const updates: any = {};
    const updatable = ['code', 'name', 'status', 'serial', 'purchaseDate', 'location', 'owner', 'categoryId'];
    for (const k of updatable) {
      if (k in body) updates[k] = body[k];
    }
    if (updates.purchaseDate) updates.purchaseDate = new Date(updates.purchaseDate);

    const asset = await prisma.asset.update({ where: { id: params.id }, data: updates });
    return NextResponse.json(asset);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update asset' }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.asset.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete asset' }, { status: 500 });
  }
}
