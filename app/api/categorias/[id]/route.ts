import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(_req: Request, context: any) {
  try {
    const params = await Promise.resolve(context.params);
    const cat = await prisma.category.findUnique({ where: { id: params.id } });
    if (!cat) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(cat);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch category' }, { status: 500 });
  }
}

export async function PUT(request: Request, context: any) {
  try {
    const params = await Promise.resolve(context.params);
    const body = await request.json();
    const updates: any = {};
    if ('name' in body) updates.name = body.name;
    if ('description' in body) updates.description = body.description;
    const cat = await prisma.category.update({ where: { id: params.id }, data: updates });
    return NextResponse.json(cat);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update category' }, { status: 500 });
  }
}

export async function DELETE(_req: Request, context: any) {
  try {
    const params = await Promise.resolve(context.params);
    await prisma.category.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 });
  }
}

