import React, { useState, useEffect } from 'react';
import './Game.css';
import { useAppSelector } from './app/store';

const Game = () => {
  const playersData = useAppSelector(state => state.players.players);
  const minutesPerHalfData = useAppSelector(state => state.gameManagement);
  const [playersOnCourt, setPlayersOnCourt] = useState([]);
  const [playersOnBench, setPlayersOnBench] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [lastSubstitution, setLastSubstitution] = useState([]);
  const [timer, setTimer] = useState(minutesPerHalfData.minutesPerHalf * 60); 
  const [playerStatistics, setPlayerStatistics] = useState([]);

  

  // Create state to track player exclusion
  const [excludedPlayers, setExcludedPlayers] = useState([]);

  // Create state to track player timers
  const [playerTimers, setPlayerTimers] = useState({});

  // Toggle player exclusion when "play pause" button is clicked
  const togglePlayerExclusion = (player) => {
    if (excludedPlayers.includes(player)) {
      setExcludedPlayers(excludedPlayers.filter((p) => p !== player));
    } else {
      setExcludedPlayers([...excludedPlayers, player]);
    }
  };

  // Button component with common styling
  const CommonButton = ({ player, onClick, isExcluded }) => {
    return (
      <button
        onClick={() => onClick(player)}
        className={`common-button ${isExcluded ? 'excluded' : 'rest'}`}
      >
        {player.name} {isExcluded ? "II" : "▶"}
      </button>
    );
  };

  const updatePlayerStatistics = () => {
    const stats = playersData.map((player) => {
      const playerOnCourt = playersOnCourt.find((p) => p.name === player.name);
      const playerOnBench = playersOnBench.find((p) => p.name === player.name);

      return {
        name: player.name,
        timeOnCourt: formatTime(playerTimers[player.name] || 0),
        substitutions:
          (playerOnCourt ? playerOnCourt.substitutions : 0) +
          (playerOnBench ? playerOnBench.substitutions : 0),
      };
    });

    setPlayerStatistics(stats);
  };

  const handleRestartTimer = () => {
    setTimer(minutesPerHalfData.minutesPerHalf * 60);
  };

  const initializePlayers = (num, miutesPerHalf) => {
    let substitutionCount = 0;

    const players = playersData.slice(0, num).map((player, index) => {
      const isSubstituted = index >= 5;
      if (isSubstituted) {
        
      }

      return {
        ...player,
        isSubstituted,
        timeOnCourt: 0,
        timeOnBench: 0,
        substitutions: 0,
        injured: false,
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

    // Initialize player timers
    const timers = {};
    initialPlayers.forEach(player => {
      timers[player.name] = 0;
    });
    setPlayerTimers(timers);
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
    const updatedPlayersOnCourt = [...playersOnCourt];
    const updatedPlayersOnBench = [...playersOnBench];
    const substitutedPlayers = [];
  
    lastSubstitution.forEach((substitutionInfo) => {
      const [substituteName, originalPlayerName] = substitutionInfo
        .replace('Substitute ', '')
        .split(' for ');
  
      const substitutePlayer = updatedPlayersOnBench.find(
        (player) => player.name === substituteName
      );
      const originalPlayer = updatedPlayersOnCourt.find(
        (player) => player.name === originalPlayerName
      );
  
      if (substitutePlayer && originalPlayer) {
        substitutedPlayers.push(substitutionInfo);
  
        // Update the players on the court and bench
        updatedPlayersOnCourt[
          updatedPlayersOnCourt.indexOf(originalPlayer)
        ] = substitutePlayer;
        updatedPlayersOnBench[
          updatedPlayersOnBench.indexOf(substitutePlayer)
        ] = originalPlayer;
  
        // Increment substitutions count for both the substituted player and the substitute player
        originalPlayer.substitutions++;
        substitutePlayer.substitutions++;
      }
    });
  
    while (updatedPlayersOnCourt.length < 5 && updatedPlayersOnBench.length > 0) {
      const substitutePlayer = updatedPlayersOnBench.shift();
      substitutePlayer.substitutions = 0; // Reset the substitution count to 0
      updatedPlayersOnCourt.push(substitutePlayer);
    }
  
    setPlayersOnCourt(updatedPlayersOnCourt);
    setPlayersOnBench(updatedPlayersOnBench);
    setLastSubstitution(substitutedPlayers);
  };

  const handleStartGame = () => {
    setGameStarted(true);
  };

  useEffect(() => {
    let countdown;

    if (gameStarted && timer > 0) {
      countdown = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);

        // Update player timers for players on the court
        const updatedPlayerTimers = { ...playerTimers };
        playersOnCourt.forEach(player => {
          updatedPlayerTimers[player.name] = (updatedPlayerTimers[player.name] || 0) + 1;
        });
        setPlayerTimers(updatedPlayerTimers);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(countdown);
    }

    return () => clearInterval(countdown);
  }, [gameStarted, timer, playerTimers, playersOnCourt]);

  const handleSelectSubs = () => {
    const numSubstitutions = minutesPerHalfData.playersPerSubstitution;
    const substitutedPlayers = [];

    const availableBenchPlayers = playersOnBench.filter(
      (player) => !excludedPlayers.includes(player)
    );

    const updatedCourt = [...playersOnCourt];

    for (let i = 0; i < numSubstitutions; i++) {
      if (updatedCourt.length > 0 && availableBenchPlayers.length > 0) {
        const randomCourtIndex = Math.floor(Math.random() * updatedCourt.length);
        const randomBenchIndex = Math.floor(Math.random() * availableBenchPlayers.length);
        const courtPlayerToSubstitute = updatedCourt[randomCourtIndex];
        const benchPlayerToSubstitute = availableBenchPlayers[randomBenchIndex];

        if (!excludedPlayers.includes(courtPlayerToSubstitute)) {
          substitutedPlayers.push(
            `Substitute ${benchPlayerToSubstitute.name} for ${courtPlayerToSubstitute.name}`
          );

          updatedCourt.splice(randomCourtIndex, 1);
          availableBenchPlayers.splice(randomBenchIndex, 1);
        }
      }
    }

    setLastSubstitution(substitutedPlayers);
  };

  const handleEmergencySubstitution = (injuredPlayer) => {
    const randomBenchIndex = Math.floor(Math.random() * playersOnBench.length);
    const substitutePlayer = playersOnBench[randomBenchIndex];
  
    const updatedPlayersOnCourt = [...playersOnCourt];
    const updatedPlayersOnBench = [...playersOnBench];
  
    const injuredPlayerIndex = updatedPlayersOnCourt.findIndex(player => player.name === injuredPlayer.name);
    
    if (injuredPlayerIndex !== -1) {
      updatedPlayersOnCourt[injuredPlayerIndex] = substitutePlayer;
      updatedPlayersOnBench[randomBenchIndex] = injuredPlayer;
  
      // Increment substitutions count for the substituted player and the substitute player
      injuredPlayer.substitutions++;
      substitutePlayer.substitutions++;
  
      setPlayersOnCourt(updatedPlayersOnCourt);
      setPlayersOnBench(updatedPlayersOnBench);
    }
  };

  const markPlayerAsInjured = (player) => {
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
            <div className="spacer"></div>
            <div className="spacer"></div>
            <div className="spacer"></div>
            <div className="spacer"></div>
            <div className="spacer"></div>
            <div className="spacer"></div>
            <div className="spacer"></div>
            <div className="spacer"></div>
            <div className="spacer"></div>
            <div className="spacer"></div>
            <span className="timer-value red big">{formatTime(timer)}</span>
            <div className="spacer"></div>
            <button onClick={handleRestartTimer} className="restart-button">Restart</button>
            <div className="spacer"></div>
            
          </div>

        )}
        <div className="column-container">
          <div className="column">
            <p className="column-heading">Current Players on the Court:</p>
            <div className="player-button-container">
              {playersOnCourt.map((player, index) => (
                <CommonButton
                  key={index}
                  player={player}
                  onClick={handleEmergencySubstitution}
                  isExcluded={excludedPlayers.includes(player)}
                />
              ))}
            </div>
          </div>
          <div className="column">
            <p className="column-heading">Players on the Bench:</p>
            <ul>
              {playersOnBench.map((player, index) => (
                <li key={index}>
                  <CommonButton
                    player={player}
                    onClick={togglePlayerExclusion}
                    isExcluded={excludedPlayers.includes(player)}
                  />
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
              {playersData.map((player, index) => (
                <tr key={index}>
                  <td>{player.name}</td>
                  <td>{formatTime(playerTimers[player.name] || 0)} </td>
                  <td>{(playersOnCourt.find((p) => p.name === player.name)?.substitutions || 0) +
                    (playersOnBench.find((p) => p.name === player.name)?.substitutions || 0)}</td>
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













































































