// models/Child.ts
import mongoose from 'mongoose';

const ChildSchema = new mongoose.Schema({
  name: String,
  age: Number,
  avatar: String,
  level: Number,
  progress: Number,
  joinDate: String,
  completedActivities: Number,
  lastActivity: {
    name: String,
    date: String,
    score: Number
  },
  interests: [String],
  notes: String
});

export default mongoose.models.Child || mongoose.model('Child', ChildSchema);
