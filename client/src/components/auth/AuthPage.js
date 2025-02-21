import React, { useState } from 'react';
import { Container } from '@mui/material';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthPage = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);

  const handleSwitchToRegister = () => setIsLogin(false);
  const handleSwitchToLogin = () => setIsLogin(true);

  return (
    <Container maxWidth="sm">
      {isLogin ? (
        <LoginForm
          onLogin={onLogin}
          onSwitchToRegister={handleSwitchToRegister}
        />
      ) : (
        <RegisterForm
          onRegister={onLogin}
          onSwitchToLogin={handleSwitchToLogin}
        />
      )}
    </Container>
  );
};

export default AuthPage;