import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const cats = await prisma.category.findMany({ orderBy: { name: 'asc' } });
    return NextResponse.json(cats);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description } = body;
    if (!name) return NextResponse.json({ error: 'Name required' }, { status: 400 });
    const cat = await prisma.category.create({ data: { name, description: description ?? null } });
    return NextResponse.json(cat, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
  }
}
