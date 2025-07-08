// src/app/api/children/[id]/route.ts
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Child from '@/models/Child';

interface Params {
  params: { id: string };
}

export async function GET(req: Request, { params }: Params) {
  await connectDB();
  const child = await Child.findById(params.id);
  if (!child) {
    return NextResponse.json({ error: "Child not found" }, { status: 404 });
  }
  return NextResponse.json(child);
}
