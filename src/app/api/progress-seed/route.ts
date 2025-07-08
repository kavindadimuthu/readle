// src/app/api/progress-seed/route.ts
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import ProgressReport from '@/models/ProgressReport';
import Child from '@/models/Child';

export async function GET() {
  await connectDB();

  const child = await Child.findOne({ name: "Emma" }); // or use an actual ID if known

  if (!child) {
    return NextResponse.json({ error: "Emma not found. Seed child data first." }, { status: 404 });
  }

  await ProgressReport.deleteMany({ childId: child._id });

  await ProgressReport.create({
    childId: child._id,
    reportPeriod: "6weeks",
    progressData: [
      { date: "Week 1", phonics: 45, spelling: 30, reading: 20, comprehension: 15 },
      { date: "Week 2", phonics: 52, spelling: 35, reading: 25, comprehension: 22 },
      { date: "Week 3", phonics: 60, spelling: 42, reading: 35, comprehension: 28 },
      { date: "Week 4", phonics: 65, spelling: 48, reading: 42, comprehension: 34 },
      { date: "Week 5", phonics: 72, spelling: 55, reading: 48, comprehension: 40 },
      { date: "Week 6", phonics: 78, spelling: 65, reading: 55, comprehension: 45 }
    ],
    activityHistory: [
      { period: "Week 1", Phonics: 5, Spelling: 3, Reading: 2, Comprehension: 1 },
      { period: "Week 2", Phonics: 4, Spelling: 4, Reading: 3, Comprehension: 2 },
      { period: "Week 3", Phonics: 7, Spelling: 3, Reading: 4, Comprehension: 2 },
      { period: "Week 4", Phonics: 6, Spelling: 5, Reading: 4, Comprehension: 3 }
    ],
    weeklyStats: {
      totalActivities: 18,
      totalTimeSpent: "4h 35m",
      correctAnswers: 82,
      skillImprovement: "+12%"
    }
  });

  return NextResponse.json({ message: "Progress data seeded successfully!" });
}
