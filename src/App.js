import React, { useState } from 'react';
import './App.css';
import HomeScreen from './HomeScreen';
import NumberOfPlayersForm from './NumberOfPlayersForm';
import PlayerInputForm from './PlayerInputForm';
import MinutesPerHalfInput from './MinutesPerHalfInput';
import Game from './Game';
import Timer from './Timer';


const App = () => {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [numPlayers, setNumPlayers] = useState(10);
  const [playerData, setPlayerData] = useState([]);
  const [minutesPerHalfData, setMinutesPerHalfData] = useState({
    minutesPerHalf: 20,
    minutesToSubstitute: 5,
    playersPerSubstitution: 2,
  });

  const handleNumPlayersSubmit = (num) => {
    setNumPlayers(num);
    setCurrentScreen('playerInput');
  };

  const handlePlayerDataSubmit = (data) => {
    setPlayerData(data);
    setCurrentScreen('minutesPerHalfInput');
  };

  const handleMinutesPerHalfSubmit = (data) => {
    setMinutesPerHalfData(data);
    setCurrentScreen('game');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen onStart={() => setCurrentScreen('numPlayers')} />;
      case 'numPlayers':
        return <NumberOfPlayersForm onNext={handleNumPlayersSubmit} />;
      case 'playerInput':
        return <PlayerInputForm numPlayers={numPlayers} onNext={handlePlayerDataSubmit} />;
      case 'minutesPerHalfInput':
        return <MinutesPerHalfInput onMinutesPerHalfSubmit={handleMinutesPerHalfSubmit} />;
      case 'game':
        return (
          <Game
            numPlayers={numPlayers}
            minutesPerHalfData={minutesPerHalfData}
            playerData={playerData}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Ezy Subs</h1>
        {renderScreen()}
      </header>
    </div>
  );
};

export default App;


