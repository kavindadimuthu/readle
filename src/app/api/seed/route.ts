// src/app/api/seed/route.ts
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Child from '@/models/Child';

export async function GET() {
    console.log('Seeding database...');
  await connectDB();

  // Delete old data (optional)
  await Child.deleteMany({});

  // Seed new data
  await Child.insertMany([
    {
      name: "Emma",
      age: 8,
      avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=150&h=150&fit=crop&crop=face",
      level: 3,
      progress: 78,
      joinDate: "January 15, 2023",
      completedActivities: 12,
      lastActivity: { name: "Beginning Sounds", date: "June 22, 2023", score: 92 },
      interests: ["Animals", "Space", "Dinosaurs"],
      notes: "Emma enjoys interactive activities and responds well to visual learning materials."
    },
    {
      name: "Noah",
      age: 7,
      avatar: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=150&h=150&fit=crop&crop=face",
      level: 2,
      progress: 65,
      joinDate: "March 8, 2023",
      completedActivities: 8,
      lastActivity: { name: "CVC Words", date: "June 20, 2023", score: 78 },
      interests: ["Cars", "Superheroes", "Sports"],
      notes: "Noah benefits from shorter, more frequent practice sessions. He enjoys rewards and badges."
    },
    {
      name: "Olivia",
      age: 9,
      avatar: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=150&h=150&fit=crop&crop=face",
      level: 4,
      progress: 92,
      joinDate: "October 22, 2022",
      completedActivities: 15,
      lastActivity: { name: "Simple Sentences", date: "June 21, 2023", score: 95 },
      interests: ["Music", "Art", "Mythology"],
      notes: "Olivia is a motivated reader who thrives with challenging content. Consider advancing her to higher levels."
    }
  ]);

  return NextResponse.json({ message: 'Database seeded successfully!' });
}
