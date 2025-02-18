const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  workoutId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workout',
    required: true
  },
  completedAt: {
    type: Date,
    default: Date.now
  },
  duration: Number,
  caloriesBurned: Number,
  exercises: [{
    exerciseId: String,
    setsCompleted: Number,
    repsCompleted: [Number],
    weightUsed: [Number],
    notes: String
  }],
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  notes: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Progress', progressSchema);