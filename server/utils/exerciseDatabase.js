const exercises = {
  strength: {
    beginner: [
      {
        name: 'Wall Push-ups',
        sets: 2,
        reps: '8-12',
        restTime: 60,
        muscleGroups: ['chest', 'arms'],
        equipment: 'none',
        instructions: 'Stand arm\'s length from wall, place palms against wall, push body towards and away from wall.'
      },
      {
        name: 'Chair Squats',
        sets: 2,
        reps: '8-12',
        restTime: 60,
        muscleGroups: ['legs', 'glutes'],
        equipment: 'chair',
        instructions: 'Sit down and stand up from chair without using hands for support.'
      },
      {
        name: 'Modified Plank',
        sets: 2,
        duration: 20,
        restTime: 45,
        muscleGroups: ['core'],
        equipment: 'none',
        instructions: 'Hold plank position on knees instead of toes.'
      }
    ],
    intermediate: [
      {
        name: 'Push-ups',
        sets: 3,
        reps: '10-15',
        restTime: 75,
        muscleGroups: ['chest', 'triceps', 'shoulders'],
        equipment: 'none',
        instructions: 'Keep body straight, lower chest to ground, push back up.'
      },
      {
        name: 'Goblet Squats',
        sets: 3,
        reps: '12-15',
        restTime: 90,
        muscleGroups: ['legs', 'glutes', 'core'],
        equipment: 'dumbbell',
        instructions: 'Hold weight at chest, squat down keeping chest up, return to standing.'
      },
      {
        name: 'Bent-over Rows',
        sets: 3,
        reps: '10-12',
        restTime: 90,
        muscleGroups: ['back', 'biceps'],
        equipment: 'dumbbells',
        instructions: 'Hinge at hips, row weights to chest, squeeze shoulder blades.'
      }
    ],
    advanced: [
      {
        name: 'Weighted Push-ups',
        sets: 4,
        reps: '8-12',
        restTime: 120,
        muscleGroups: ['chest', 'triceps', 'shoulders'],
        equipment: 'weight plate',
        instructions: 'Perform push-ups with weight plate on back.'
      },
      {
        name: 'Bulgarian Split Squats',
        sets: 4,
        reps: '10-12',
        restTime: 90,
        muscleGroups: ['legs', 'glutes'],
        equipment: 'bench',
        instructions: 'Rear foot elevated, lunge down on front leg, return to start.'
      },
      {
        name: 'Pull-ups',
        sets: 4,
        reps: '6-10',
        restTime: 120,
        muscleGroups: ['back', 'biceps'],
        equipment: 'pull-up bar',
        instructions: 'Hang from bar, pull body up until chin over bar, lower with control.'
      }
    ]
  },
  cardio: {
    beginner: [
      {
        name: 'Marching in Place',
        duration: 300,
        muscleGroups: ['legs'],
        equipment: 'none',
        instructions: 'Lift knees high while marching in place, pump arms naturally.'
      },
      {
        name: 'Step-ups',
        sets: 3,
        reps: '10 each leg',
        restTime: 60,
        muscleGroups: ['legs', 'glutes'],
        equipment: 'step',
        instructions: 'Step up onto platform with one foot, step down, alternate legs.'
      }
    ],
    intermediate: [
      {
        name: 'Mountain Climbers',
        sets: 4,
        duration: 30,
        restTime: 30,
        muscleGroups: ['full body'],
        equipment: 'none',
        instructions: 'Start in plank, alternate bringing knees to chest rapidly.'
      },
      {
        name: 'Burpees',
        sets: 3,
        reps: '8-12',
        restTime: 60,
        muscleGroups: ['full body'],
        equipment: 'none',
        instructions: 'Squat down, jump back to plank, push-up, jump feet forward, jump up.'
      }
    ],
    advanced: [
      {
        name: 'Sprint Intervals',
        sets: 6,
        duration: 30,
        restTime: 90,
        muscleGroups: ['legs'],
        equipment: 'none',
        instructions: 'Sprint at maximum effort for duration, rest between intervals.'
      },
      {
        name: 'Plyometric Box Jumps',
        sets: 4,
        reps: '8-10',
        restTime: 120,
        muscleGroups: ['legs', 'glutes'],
        equipment: 'box',
        instructions: 'Jump explosively onto box, step down, repeat.'
      }
    ]
  }
};

module.exports = exercises;