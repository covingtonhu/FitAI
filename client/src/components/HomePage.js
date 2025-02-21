import React from 'react';
import { Container, Typography, Box, Button, Grid, Card, CardContent, AppBar, Toolbar } from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

const HomePage = ({ user, onLogout }) => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <FitnessCenterIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            FitAI
          </Typography>
          <Typography variant="body1" sx={{ mr: 2 }}>
            Welcome, {user?.username}!
          </Typography>
          <Button color="inherit" onClick={onLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h3" component="h1" gutterBottom>
              Your Fitness Dashboard
            </Typography>
            <Typography variant="h6" component="h2" color="text.secondary" gutterBottom>
              Ready to start your workout journey?
            </Typography>
            <Button variant="contained" size="large" sx={{ mr: 2 }}>
              Generate New Workout
            </Button>
            <Button variant="outlined" size="large">
              View My Workouts
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
    </>
  );
};

export default HomePage;