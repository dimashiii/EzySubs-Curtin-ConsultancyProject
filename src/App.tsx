import React, { useState } from 'react';
import './App.css';
import HomeScreen from './HomeScreen';
import PlayerInputForm from './PlayerInputForm';
import MinutesPerHalfInput from './MinutesPerHalfInput';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Game from './Game';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('home');

  const handlePlayerDataSubmit = () => {
    setCurrentScreen('minutesPerHalfInput');
  };

  const handleMinutesPerHalfSubmit = () => {
    setCurrentScreen('game');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen onStart={() => setCurrentScreen('playerInput')} />;
      case 'playerInput':
        return <PlayerInputForm onNext={handlePlayerDataSubmit} />;
      case 'minutesPerHalfInput':
        return <MinutesPerHalfInput onMinutesPerHalfSubmit={handleMinutesPerHalfSubmit} />;
      case 'game':
        return (
          <Game />
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="sm">
      <Box>
        {renderScreen()}
      </Box>
    </Container>
  );
};

export default App;



