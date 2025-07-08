// src/app/api/children/route.ts
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Child from '@/models/Child';

export async function GET() {
  await connectDB();
  const children = await Child.find();
  return NextResponse.json(children);
}
