# FitAI

An AI-powered personal fitness assistant that creates customized workout plans based on your fitness level, goals, and preferences.

## Features

- **AI Workout Generation**: Get personalized exercise routines tailored to your fitness level
- **Progress Tracking**: Monitor your workout completion and fitness improvements
- **User Profiles**: Set your fitness goals, level, and physical constraints
- **Exercise Database**: Comprehensive collection of exercises for all fitness levels
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Frontend**: React, Material-UI, Axios
- **Backend**: Node.js, Express, MongoDB
- **Authentication**: JWT-based authentication
- **Database**: MongoDB with Mongoose ODM

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)

### Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/FitAI.git
cd FitAI
```

2. Install dependencies
```bash
npm run install-deps
```

3. Set up environment variables
```bash
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
```

4. Start the development servers
```bash
npm run dev
```

The app will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Docker Deployment

Run with Docker Compose:

```bash
docker-compose up -d
```

## API Documentation

See [docs/API.md](docs/API.md) for detailed API documentation.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request