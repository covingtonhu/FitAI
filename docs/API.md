# FitAI API Documentation

## Authentication Endpoints

### POST /api/auth/register
Register a new user account.

**Body:**
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

### POST /api/auth/login
Login with email and password.

**Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

### GET /api/auth/me
Get current user profile (requires authentication).

## Workout Endpoints

### POST /api/workouts/generate
Generate a new AI workout plan.

**Body:**
```json
{
  "workoutType": "strength|cardio|flexibility|hiit|yoga",
  "duration": "number (minutes)",
  "goals": ["array of fitness goals"]
}
```

### GET /api/workouts
Get user's workout history.

### GET /api/workouts/:id
Get specific workout details.

## Progress Endpoints

### POST /api/progress
Record workout completion.

### GET /api/progress
Get workout progress history.

### GET /api/progress/stats
Get fitness statistics and analytics.

## Profile Endpoints

### GET /api/profile
Get user profile.

### PUT /api/profile/fitness-profile
Update fitness profile with goals, level, etc.