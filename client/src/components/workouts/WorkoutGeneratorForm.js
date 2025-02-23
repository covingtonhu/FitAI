import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Alert,
  Slider,
  Typography
} from '@mui/material';
import { workoutAPI } from '../../services/api';

const WorkoutGeneratorForm = ({ open, onClose, onWorkoutGenerated }) => {
  const [formData, setFormData] = useState({
    workoutType: 'strength',
    duration: 45,
    goals: []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const workoutTypes = [
    { value: 'strength', label: 'Strength Training' },
    { value: 'cardio', label: 'Cardio' },
    { value: 'flexibility', label: 'Flexibility' },
    { value: 'hiit', label: 'HIIT' },
    { value: 'yoga', label: 'Yoga' }
  ];

  const handleChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value
    });
  };

  const handleDurationChange = (event, newValue) => {
    setFormData({
      ...formData,
      duration: newValue
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await workoutAPI.generateWorkout(formData);
      onWorkoutGenerated(response.data.workout);
      onClose();
      setFormData({
        workoutType: 'strength',
        duration: 45,
        goals: []
      });
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to generate workout');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Generate New Workout</DialogTitle>
      <DialogContent>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Box sx={{ mt: 2 }}>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Workout Type</InputLabel>
            <Select
              value={formData.workoutType}
              onChange={handleChange('workoutType')}
              label="Workout Type"
            >
              {workoutTypes.map((type) => (
                <MenuItem key={type.value} value={type.value}>
                  {type.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box sx={{ mb: 3 }}>
            <Typography gutterBottom>
              Duration: {formData.duration} minutes
            </Typography>
            <Slider
              value={formData.duration}
              onChange={handleDurationChange}
              min={15}
              max={90}
              step={5}
              marks={[
                { value: 15, label: '15min' },
                { value: 30, label: '30min' },
                { value: 45, label: '45min' },
                { value: 60, label: '60min' },
                { value: 90, label: '90min' }
              ]}
              valueLabelDisplay="auto"
            />
          </Box>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate Workout'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WorkoutGeneratorForm;