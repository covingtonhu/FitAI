const express = require('express');
const Workout = require('../models/Workout');
const auth = require('../middleware/auth');
const exerciseDB = require('../utils/exerciseDatabase');

const router = express.Router();

const generateWorkoutPlan = (userProfile, preferences) => {
  const { fitnessLevel, goals, availableTime, injuries } = userProfile;
  const { workoutType, duration } = preferences;

  const selectedExercises = exerciseDB[workoutType] || exerciseDB.strength;
  const exercises = selectedExercises[fitnessLevel] || selectedExercises.beginner;

  const adjustedExercises = exercises.map(exercise => {
    const adjustedExercise = { ...exercise };

    if (injuries && injuries.length > 0) {
      if (injuries.includes('knee') && exercise.muscleGroups.includes('legs')) {
        adjustedExercise.instructions += ' Modify for knee injury - reduce range of motion.';
      }
      if (injuries.includes('back') && exercise.muscleGroups.includes('back')) {
        adjustedExercise.instructions += ' Modify for back injury - maintain neutral spine.';
      }
    }

    return adjustedExercise;
  });

  return {
    name: `${workoutType.charAt(0).toUpperCase() + workoutType.slice(1)} Workout`,
    description: `Personalized ${workoutType} workout for ${fitnessLevel} level`,
    type: workoutType,
    difficulty: fitnessLevel,
    duration: duration || 45,
    exercises: adjustedExercises,
    calories: Math.round((duration || 45) * (fitnessLevel === 'beginner' ? 6 : fitnessLevel === 'intermediate' ? 8 : 10)),
    isGenerated: true,
    tags: [workoutType, fitnessLevel, ...goals]
  };
};

router.post('/generate', auth, async (req, res) => {
  try {
    const { workoutType, duration, goals } = req.body;
    const userProfile = req.user.profile || {};

    const workoutData = generateWorkoutPlan(userProfile, {
      workoutType: workoutType || 'strength',
      duration: duration || 45,
      goals: goals || userProfile.goals || []
    });

    const workout = new Workout({
      ...workoutData,
      userId: req.user._id
    });

    await workout.save();

    res.json({
      message: 'Workout plan generated successfully',
      workout
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const workouts = await Workout.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const workout = await Workout.findOne({ _id: req.params.id, userId: req.user._id });
    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }
    res.json(workout);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;