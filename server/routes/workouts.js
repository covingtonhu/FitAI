const express = require('express');
const Workout = require('../models/Workout');
const auth = require('../middleware/auth');

const router = express.Router();

const generateWorkoutPlan = (userProfile, preferences) => {
  const { fitnessLevel, goals, availableTime, injuries } = userProfile;
  const { workoutType, duration } = preferences;

  const workoutTemplates = {
    strength: {
      beginner: [
        { name: 'Push-ups', sets: 3, reps: '8-12', restTime: 60, muscleGroups: ['chest', 'triceps'], equipment: 'bodyweight' },
        { name: 'Squats', sets: 3, reps: '12-15', restTime: 60, muscleGroups: ['legs', 'glutes'], equipment: 'bodyweight' },
        { name: 'Plank', sets: 3, duration: 30, restTime: 45, muscleGroups: ['core'], equipment: 'bodyweight' }
      ],
      intermediate: [
        { name: 'Bench Press', sets: 4, reps: '8-10', restTime: 90, muscleGroups: ['chest', 'triceps'], equipment: 'barbell' },
        { name: 'Deadlifts', sets: 4, reps: '6-8', restTime: 120, muscleGroups: ['back', 'legs'], equipment: 'barbell' },
        { name: 'Pull-ups', sets: 3, reps: '6-10', restTime: 90, muscleGroups: ['back', 'biceps'], equipment: 'pull-up bar' }
      ],
      advanced: [
        { name: 'Weighted Squats', sets: 5, reps: '5-6', restTime: 180, muscleGroups: ['legs', 'glutes'], equipment: 'barbell' },
        { name: 'Overhead Press', sets: 4, reps: '6-8', restTime: 120, muscleGroups: ['shoulders', 'triceps'], equipment: 'barbell' },
        { name: 'Weighted Pull-ups', sets: 4, reps: '5-8', restTime: 150, muscleGroups: ['back', 'biceps'], equipment: 'pull-up bar' }
      ]
    },
    cardio: {
      beginner: [
        { name: 'Brisk Walking', duration: 20, muscleGroups: ['legs'], equipment: 'none' },
        { name: 'Stationary Bike', duration: 15, muscleGroups: ['legs'], equipment: 'bike' },
        { name: 'Jumping Jacks', sets: 3, duration: 30, restTime: 30, muscleGroups: ['full body'], equipment: 'bodyweight' }
      ],
      intermediate: [
        { name: 'Jogging', duration: 25, muscleGroups: ['legs'], equipment: 'none' },
        { name: 'HIIT Intervals', sets: 5, duration: 60, restTime: 60, muscleGroups: ['full body'], equipment: 'bodyweight' },
        { name: 'Rowing Machine', duration: 20, muscleGroups: ['full body'], equipment: 'rowing machine' }
      ],
      advanced: [
        { name: 'Running', duration: 35, muscleGroups: ['legs'], equipment: 'none' },
        { name: 'Sprint Intervals', sets: 8, duration: 30, restTime: 90, muscleGroups: ['legs'], equipment: 'none' },
        { name: 'Burpees', sets: 5, reps: '10-15', restTime: 45, muscleGroups: ['full body'], equipment: 'bodyweight' }
      ]
    }
  };

  const selectedTemplate = workoutTemplates[workoutType] || workoutTemplates.strength;
  const exercises = selectedTemplate[fitnessLevel] || selectedTemplate.beginner;

  return {
    name: `${workoutType.charAt(0).toUpperCase() + workoutType.slice(1)} Workout`,
    description: `Personalized ${workoutType} workout for ${fitnessLevel} level`,
    type: workoutType,
    difficulty: fitnessLevel,
    duration: duration || 45,
    exercises: exercises.map(ex => ({
      ...ex,
      instructions: `Perform ${ex.name} with proper form. ${injuries.length ? 'Modify as needed for injuries.' : ''}`
    })),
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