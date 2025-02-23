import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Box,
  Button,
  Alert,
  CircularProgress
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import WorkoutCard from './WorkoutCard';
import WorkoutGeneratorForm from './WorkoutGeneratorForm';
import { workoutAPI } from '../../services/api';

const WorkoutList = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [generatorOpen, setGeneratorOpen] = useState(false);

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      const response = await workoutAPI.getWorkouts();
      setWorkouts(response.data);
    } catch (error) {
      setError('Failed to load workouts');
    } finally {
      setLoading(false);
    }
  };

  const handleWorkoutGenerated = (newWorkout) => {
    setWorkouts([newWorkout, ...workouts]);
  };

  const handleStartWorkout = (workout) => {
    console.log('Starting workout:', workout.name);
  };

  const handleViewDetails = (workout) => {
    console.log('Viewing workout details:', workout._id);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1">
            My Workouts
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setGeneratorOpen(true)}
          >
            Generate New Workout
          </Button>
        </Box>

        {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

        {workouts.length === 0 ? (
          <Box textAlign="center" sx={{ py: 6 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No workouts yet
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Generate your first AI-powered workout plan to get started!
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => setGeneratorOpen(true)}
            >
              Generate First Workout
            </Button>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {workouts.map((workout) => (
              <Grid item xs={12} sm={6} md={4} key={workout._id}>
                <WorkoutCard
                  workout={workout}
                  onViewDetails={handleViewDetails}
                  onStartWorkout={handleStartWorkout}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      <WorkoutGeneratorForm
        open={generatorOpen}
        onClose={() => setGeneratorOpen(false)}
        onWorkoutGenerated={handleWorkoutGenerated}
      />
    </Container>
  );
};

export default WorkoutList;