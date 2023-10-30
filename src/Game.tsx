import React, { useState, useEffect } from 'react';
import './Game.css';
import { useAppSelector } from './app/store';

const Game = () => {
  const playersData = useAppSelector(state => state.players.players)
  const minutesPerHalfData = useAppSelector(state => state.gameManagement)
  const [playersOnCourt, setPlayersOnCourt] = useState([]);
  const [playersOnBench, setPlayersOnBench] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [lastSubstitution, setLastSubstitution] = useState([]);
  const [timer, setTimer] = useState(minutesPerHalfData.minutesPerHalf * 60); 
  const handleRestartTimer = () => {
    // Reset the timer to its initial value (20 minutes)
    setTimer(minutesPerHalfData.minutesPerHalf * 60);
  };

  const initializePlayers = (num, miutesPerHalf) => {
    let substitutionCount = 0;

    const players = playersData.slice(0, num).map((player, index) => {
      const isSubstituted = index >= 5;
      if (isSubstituted) {
        substitutionCount++;
      }

      return {
        ...player,
        isSubstituted,
        timeOnCourt: 0, // Initialize to zero
        timeOnBench: 0, // Initialize to zero
        substitutions: 0, // Initialize to zero
        injured: false, // Initially, no players are injured
      };
    });

    players.forEach((player, index) => {
      if (index < 5) {
        player.substitutions = substitutionCount;
      }
    });

    return players;
  };

  const initializeStartingLineup = (players) => {
    const maxPlayersOnCourt = Math.min(5, players.length);
    const shuffledPlayers = shuffleArray(players);

    return shuffledPlayers.slice(0, maxPlayersOnCourt);
  };


  useEffect(() => {
    const initialPlayers = initializePlayers(playersData.length, minutesPerHalfData.minutesPerHalf);
    const initialStartingLineup = initializeStartingLineup(initialPlayers);

    setPlayersOnCourt([...initialStartingLineup]);
    setPlayersOnBench([...initialPlayers.filter(player => !initialStartingLineup.includes(player))]);
 }, [playersData, minutesPerHalfData.minutesPerHalf]);

  

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const updateSubs = () => {
    const updatedPlayersOnCourt = [...playersOnCourt]; // Copy the players on the court
    const updatedPlayersOnBench = [...playersOnBench]; // Copy the players on the bench
    const substitutedPlayers = [];
  
    lastSubstitution.forEach(substitutionInfo => {
      const [substituteName, originalPlayerName] = substitutionInfo
        .replace('Substitute ', '')
        .split(' for ');
  
      // Find the player objects for substitution
      const substitutePlayer = updatedPlayersOnBench.find(player => player.name === substituteName);
      const originalPlayer = updatedPlayersOnCourt.find(player => player.name === originalPlayerName);
  
      if (substitutePlayer && originalPlayer) {
        substitutedPlayers.push(substitutionInfo);
  
        // Update the players on the court and bench
        updatedPlayersOnCourt[updatedPlayersOnCourt.indexOf(originalPlayer)] = substitutePlayer;
        updatedPlayersOnBench[updatedPlayersOnBench.indexOf(substitutePlayer)] = originalPlayer;
      }
    });
  
    // Ensure there are always five players on the court
    while (updatedPlayersOnCourt.length < 5 && updatedPlayersOnBench.length > 0) {
      const substitutePlayer = updatedPlayersOnBench.shift();
      updatedPlayersOnCourt.push(substitutePlayer);
    }
  
    // Update the state with substituted players
    setPlayersOnCourt(updatedPlayersOnCourt);
    setPlayersOnBench(updatedPlayersOnBench);
    setLastSubstitution(substitutedPlayers);
  };
  
  

  const handleStartGame = () => {
    // Start the game
    setGameStarted(true);
  };

  useEffect(() => {
    // Countdown timer logic
    let countdown;

    if (gameStarted && timer > 0) {
      countdown = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(countdown);
      // You can add logic for when the timer reaches zero
    }

    // Cleanup the interval when the component unmounts or when the game ends
    return () => clearInterval(countdown);
  }, [gameStarted, timer]);

  const currentPlayers = [...playersOnCourt, ...playersOnBench];

  const handleSelectSubs = () => {
    const numSubstitutions = minutesPerHalfData.playersPerSubstitution;
    const substitutedPlayers = [];
  
    const updatedCourt = [...playersOnCourt];
    const updatedBench = [...playersOnBench];
    
  
    for (let i = 0; i < numSubstitutions; i++) {
      if (updatedCourt.length > 0 && updatedBench.length > 0) {
        const randomCourtIndex = Math.floor(Math.random() * updatedCourt.length);
        const randomBenchIndex = Math.floor(Math.random() * updatedBench.length);
        const courtPlayerToSubstitute = updatedCourt[randomCourtIndex];
        const benchPlayerToSubstitute = updatedBench[randomBenchIndex];
  
        substitutedPlayers.push(
          `Substitute ${benchPlayerToSubstitute.name} for ${courtPlayerToSubstitute.name}`
        );
  
        // Remove the substituted players from the court and bench
        updatedCourt.splice(randomCourtIndex, 1);
        updatedBench.splice(randomBenchIndex, 1);
      }
    }
  
    setLastSubstitution(substitutedPlayers);
  };

  const handleEmergencySubstitution = (injuredPlayer) => {
    // Select a player from the bench to replace the injured player
    const randomBenchIndex = Math.floor(Math.random() * playersOnBench.length);
    const substitutePlayer = playersOnBench[randomBenchIndex];
  
    // Make the substitution
    const updatedPlayersOnCourt = [...playersOnCourt];
    const updatedPlayersOnBench = [...playersOnBench];
  
    const injuredPlayerIndex = updatedPlayersOnCourt.findIndex(player => player.name === injuredPlayer.name);
    
    if (injuredPlayerIndex !== -1) {
      // Replace the injured player with the substitute
      updatedPlayersOnCourt[injuredPlayerIndex] = substitutePlayer;
      updatedPlayersOnBench[randomBenchIndex] = injuredPlayer;
      
      // Update the state with substituted players
      setPlayersOnCourt(updatedPlayersOnCourt);
      setPlayersOnBench(updatedPlayersOnBench);
    }
  };
  

  const markPlayerAsInjured = (player) => {
    // Update the player's injured status
    player.injured = true;
  
  };
  

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="page-container">
      <div className="content-container">
        <h2>Game Information</h2>
        {gameStarted && (
          <div className="timer">
            <span className="timer-value red big">{formatTime(timer)}</span>
            <div className="spacer"></div>
            <button onClick={handleRestartTimer} className="restart-button">Restart</button>
          </div>
        )}
        <div className="column-container">
          <div className="column">
            <p className="column-heading">Current Players on the Court:</p>
            <ul>
              {playersOnCourt.map((player, index) => (
                <li key={index}>
                  {player.name}
                  {gameStarted && (
                    <button onClick={() => handleEmergencySubstitution(player)} className="injured-button">
                    x
                    </button>
                  )}
                </li>
              ))}
            </ul>

          </div>
          <div className="column">
            <p className="column-heading">Players on the Bench:</p>
            <ul>
              {playersOnBench.map((player, index) => (
                <li key={index}>
                  {player.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
        {gameStarted && (
          <div className="substitution-info">
            <h3>Substitutions</h3>
            {lastSubstitution && lastSubstitution.length > 0 && (
              <ul>
                {lastSubstitution.map((pair, pairIndex) => (
                  <li key={pairIndex}>
                    {pair}
                  </li>
                ))}
              </ul>
            )}
            <div className="substitution-buttons">
              <button onClick={handleSelectSubs} className="select-subs-button">Select Subs</button>
              <div className="spacer"></div>
              <button onClick={updateSubs} className="update-subs-button">Update Subs</button>
            </div>
          </div>
        )}
        {!gameStarted && (
          <button onClick={handleStartGame}>Start Game</button>
        )}
               
        <div className="player-stats-container">
          <h3>Player Statistics</h3>
          <table>
            <thead>
              <tr>
                <th>Player Name</th>
                <th>Minutes on Court</th>
                <th>Substitutions</th>
              </tr>
            </thead>
            <tbody>
              {currentPlayers.map((player, index) => (
                <tr key={index}>
                  <td>{player.name}</td>
                  <td>{player.timeOnCourt} minutes</td>
                  <td>{player.substitutions}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Game;

//






































































