// src/app/api/progress/[childId]/route.ts
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import ProgressReport from '@/models/ProgressReport';

type Params = { params: { childId: string } };

export async function GET(_req: Request, { params }: Params) {
  await connectDB();
  const report = await ProgressReport.findOne({ childId: params.childId });

  if (!report) {
    return NextResponse.json({ error: "Progress report not found" }, { status: 404 });
  }

  return NextResponse.json(report);
}
