import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const assets = await prisma.asset.findMany({ include: { category: true } });
    return NextResponse.json(assets);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch assets' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { code, name, status, serial, purchaseDate, location, owner, categoryId } = body;
    if (!code || !name || !location || !owner || !categoryId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const asset = await prisma.asset.create({
      data: {
        code,
        name,
        status: status || undefined,
        serial: serial ?? null,
        purchaseDate: purchaseDate ? new Date(purchaseDate) : null,
        location,
        owner,
        categoryId,
      },
    });

    return NextResponse.json(asset, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to create asset' }, { status: 500 });
  }
}
