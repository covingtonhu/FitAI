import React from 'react';
import { Container, Typography, Box, Button, Grid, Card, CardContent } from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

const HomePage = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <FitnessCenterIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
          <Typography variant="h2" component="h1" gutterBottom>
            FitAI
          </Typography>
          <Typography variant="h5" component="h2" color="text.secondary" gutterBottom>
            Your Personal AI Fitness Assistant
          </Typography>
          <Typography variant="body1" sx={{ mt: 2, mb: 4 }}>
            Get personalized workout plans, track your progress, and achieve your fitness goals with AI-powered guidance.
          </Typography>
          <Button variant="contained" size="large" sx={{ mr: 2 }}>
            Get Started
          </Button>
          <Button variant="outlined" size="large">
            Learn More
          </Button>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Personalized Plans
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  AI creates custom workout routines based on your fitness level, goals, and available time.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Progress Tracking
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Monitor your improvements with detailed analytics and performance insights.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Smart Adjustments
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Plans automatically adapt based on your progress and feedback.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default HomePage;