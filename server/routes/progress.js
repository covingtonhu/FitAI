const express = require('express');
const Progress = require('../models/Progress');
const Workout = require('../models/Workout');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, async (req, res) => {
  try {
    const {
      workoutId,
      duration,
      caloriesBurned,
      exercises,
      rating,
      notes
    } = req.body;

    const workout = await Workout.findOne({
      _id: workoutId,
      userId: req.user._id
    });

    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }

    const progress = new Progress({
      userId: req.user._id,
      workoutId,
      duration,
      caloriesBurned,
      exercises,
      rating,
      notes
    });

    await progress.save();

    res.status(201).json({
      message: 'Progress recorded successfully',
      progress
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const { limit = 20, skip = 0, workoutId } = req.query;

    const filter = { userId: req.user._id };
    if (workoutId) {
      filter.workoutId = workoutId;
    }

    const progress = await Progress.find(filter)
      .populate('workoutId', 'name type difficulty duration')
      .sort({ completedAt: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(skip));

    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/stats', auth, async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const matchCondition = { userId: req.user._id };

    if (startDate || endDate) {
      matchCondition.completedAt = {};
      if (startDate) matchCondition.completedAt.$gte = new Date(startDate);
      if (endDate) matchCondition.completedAt.$lte = new Date(endDate);
    }

    const stats = await Progress.aggregate([
      { $match: matchCondition },
      {
        $group: {
          _id: null,
          totalWorkouts: { $sum: 1 },
          totalDuration: { $sum: '$duration' },
          totalCalories: { $sum: '$caloriesBurned' },
          averageRating: { $avg: '$rating' }
        }
      }
    ]);

    const weeklyStats = await Progress.aggregate([
      { $match: matchCondition },
      {
        $group: {
          _id: {
            week: { $week: '$completedAt' },
            year: { $year: '$completedAt' }
          },
          workouts: { $sum: 1 },
          duration: { $sum: '$duration' },
          calories: { $sum: '$caloriesBurned' }
        }
      },
      { $sort: { '_id.year': -1, '_id.week': -1 } },
      { $limit: 12 }
    ]);

    res.json({
      overall: stats[0] || {
        totalWorkouts: 0,
        totalDuration: 0,
        totalCalories: 0,
        averageRating: 0
      },
      weekly: weeklyStats
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const progress = await Progress.findOne({
      _id: req.params.id,
      userId: req.user._id
    }).populate('workoutId');

    if (!progress) {
      return res.status(404).json({ error: 'Progress record not found' });
    }

    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;