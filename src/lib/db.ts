// lib/db.ts
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || "your_connection_string_here";

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in your environment variables");
}

export async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;

  return mongoose.connect(MONGODB_URI);
}
