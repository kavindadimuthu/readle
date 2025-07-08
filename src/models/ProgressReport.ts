// src/models/ProgressReport.ts
import mongoose from 'mongoose';

const ProgressReportSchema = new mongoose.Schema({
  childId: { type: mongoose.Schema.Types.ObjectId, ref: 'Child', required: true },
  reportPeriod: String, // e.g., "6 weeks"
  progressData: [
    {
      date: String,
      phonics: Number,
      spelling: Number,
      reading: Number,
      comprehension: Number
    }
  ],
  activityHistory: [
    {
      period: String,
      Phonics: Number,
      Spelling: Number,
      Reading: Number,
      Comprehension: Number
    }
  ],
  weeklyStats: {
    totalActivities: Number,
    totalTimeSpent: String,
    correctAnswers: Number,
    skillImprovement: String
  }
});

export default mongoose.models.ProgressReport || mongoose.model("ProgressReport", ProgressReportSchema);
