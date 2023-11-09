import { useState } from 'react';
import './App.css';
import HomeScreen from './HomeScreen';
import NumberOfPlayersForm from './NumberOfPlayersForm';
import PlayerInputForm from './PlayerInputForm';
import MinutesPerHalfInput from './MinutesPerHalfInput';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Game from './Game';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('home');

  const handleNumPlayersSubmit = (num) => {
    setCurrentScreen('playerInput');
  };

  const handlePlayerDataSubmit = (data) => {
    setCurrentScreen('minutesPerHalfInput');
  };

  const handleMinutesPerHalfSubmit = (data) => {
    setCurrentScreen('game');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen onStart={() => setCurrentScreen('numPlayers')} />;
      case 'numPlayers':
        return <NumberOfPlayersForm onNext={handleNumPlayersSubmit} />;
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
    // <div className="App">
    <Container maxWidth="sm">
      {/* <header className="App-header"> */}
      <Box>
        {renderScreen()}
      </Box>
      {/* </header> */}
    </Container>
  );
};

export default App;


