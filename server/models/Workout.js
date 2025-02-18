const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  sets: Number,
  reps: String,
  weight: Number,
  duration: Number,
  restTime: Number,
  instructions: String,
  muscleGroups: [String],
  equipment: String
});

const workoutSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: String,
  type: {
    type: String,
    enum: ['strength', 'cardio', 'flexibility', 'hiit', 'yoga'],
    required: true
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  exercises: [exerciseSchema],
  calories: Number,
  isGenerated: {
    type: Boolean,
    default: false
  },
  tags: [String]
}, {
  timestamps: true
});

module.exports = mongoose.model('Workout', workoutSchema);