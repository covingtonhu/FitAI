import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  Button,
  Stack
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

const WorkoutCard = ({ workout, onViewDetails, onStartWorkout }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component="h3" gutterBottom>
          {workout.name}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {workout.description}
        </Typography>

        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          <Chip
            label={workout.type}
            color="primary"
            size="small"
          />
          <Chip
            label={workout.difficulty}
            color="secondary"
            size="small"
          />
          {workout.isGenerated && (
            <Chip
              label="AI Generated"
              color="success"
              size="small"
            />
          )}
        </Stack>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <AccessTimeIcon fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              {workout.duration} min
            </Typography>
          </Box>

          {workout.calories && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <LocalFireDepartmentIcon fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                {workout.calories} cal
              </Typography>
            </Box>
          )}
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {workout.exercises.length} exercises
        </Typography>

        <Typography variant="caption" color="text.secondary">
          Created: {formatDate(workout.createdAt)}
        </Typography>
      </CardContent>

      <Box sx={{ p: 2, pt: 0 }}>
        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            fullWidth
            onClick={() => onStartWorkout(workout)}
          >
            Start Workout
          </Button>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => onViewDetails(workout)}
          >
            View Details
          </Button>
        </Stack>
      </Box>
    </Card>
  );
};

export default WorkoutCard;