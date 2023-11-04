import React, { useState, useEffect } from 'react';
import './Game.css';
import { useAppSelector } from './app/store';

const Game = () => {
  const playersData = useAppSelector((state) => state.players.players);
  const minutesPerHalfData = useAppSelector((state) => state.gameManagement);
  const [playersOnCourt, setPlayersOnCourt] = useState([]);
  const [playersOnBench, setPlayersOnBench] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [lastSubstitution, setLastSubstitution] = useState([]);
  const [playerStatistics, setPlayerStatistics] = useState([]);
  const [timer, setTimer] = useState(minutesPerHalfData.minutesPerHalf * 60);

  const handleRestartTimer = () => {
    // Reset the timer to its initial value (20 minutes)
    setTimer(minutesPerHalfData.minutesPerHalf * 60);
  };

  const initializePlayers = (num, minutesPerHalf) => {
    const players = playersData.slice(0, num).map((player, index) => {
      const isSubstituted = index >= 5;
      return {
        ...player,
        isSubstituted,
        timeOnCourt: 0, // New: Track player's time on court (in seconds)
        timeOnBench: 0,
        substitutions: 0,
        injured: false,
        lastOnCourt: 0, // New: Track the time when the player was last on the court (in seconds)
      };
    });

    return players;
  };

  const initializeStartingLineup = (players) => {
    const maxPlayersOnCourt = Math.min(5, players.length);
    const shuffledPlayers = shuffleArray(players);

    return shuffledPlayers.slice(0, maxPlayersOnCourt);
  };

  const updatePlayerStatistics = () => {
    // Create an array of player statistics
    const stats = playersData.map((player) => {
      const playerOnCourt = playersOnCourt.find((p) => p.name === player.name);
      const playerOnBench = playersOnBench.find((p) => p.name === player.name);

      return {
        name: player.name,
        timeOnCourt: formatTime(
          playerOnCourt ? playerOnCourt.timeOnCourt : 0
        ),
        substitutions:
          (playerOnCourt ? playerOnCourt.substitutions : 0) +
          (playerOnBench ? playerOnBench.substitutions : 0),
      };
    });

    setPlayerStatistics(stats);
  };

  useEffect(() => {
    const initialPlayers = initializePlayers(
      playersData.length,
      minutesPerHalfData.minutesPerHalf
    );
    const initialStartingLineup = initializeStartingLineup(initialPlayers);

    setPlayersOnCourt([...initialStartingLineup]);
    setPlayersOnBench([
      ...initialPlayers.filter((player) =>
        !initialStartingLineup.includes(player)
      ),
    ]);
  }, [playersData, minutesPerHalfData.minutesPerHalf]);

  useEffect(() => {
    // Update player statistics when a substitution occurs
    updatePlayerStatistics();
  }, [playersOnCourt, playersOnBench]);

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
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

        // Increment substitutions count for the substituted players
        substitutePlayer.substitutions++;
        originalPlayer.substitutions++;
      }
    });

    while (updatedPlayersOnCourt.length < 5 && updatedPlayersOnBench.length > 0) {
      const substitutePlayer = updatedPlayersOnBench.shift();
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
        setTimeout(() => {
          setTimer((prevTimer) => {
            const currentTime = Math.max(0, prevTimer - 1);
  
            // New: Update player's "Time on Court" when the player is on the bench
            playersOnCourt.forEach((player) => {
              if (player.lastOnCourt > 0) {
                player.timeOnCourt += 1; // Increment time on court
              }
            });
  
            playersOnCourt.forEach((player) => {
              player.lastOnCourt = currentTime;
            });
  
            return currentTime;
          });
        }, 1000); // Delay the update by 1 second
      });
    } else if (timer === 0) {
      clearInterval(countdown);
    }
  }, [gameStarted, timer, playersOnCourt]);
  

  const currentPlayers = [...playersOnCourt, ...playersOnBench];

  const handleSelectSubs = () => {
    const numSubstitutions = minutesPerHalfData.playersPerSubstitution;
    const substitutedPlayers = [];

    const updatedCourt = [...playersOnCourt];
    const updatedBench = [...playersOnBench];

    for (let i = 0; i < numSubstitutions; i++) {
      if (updatedCourt.length > 0 && updatedBench.length > 0) {
        const randomCourtIndex = Math.floor(
          Math.random() * updatedCourt.length
        );
        const randomBenchIndex = Math.floor(
          Math.random() * updatedBench.length
        );
        const courtPlayerToSubstitute = updatedCourt[randomCourtIndex];
        const benchPlayerToSubstitute = updatedBench[randomBenchIndex];

        substitutedPlayers.push(
          `Substitute ${benchPlayerToSubstitute.name} for ${courtPlayerToSubstitute.name}`
        );

        updatedCourt.splice(randomCourtIndex, 1);
        updatedBench.splice(randomBenchIndex, 1);
      }
    }

    setLastSubstitution(substitutedPlayers);
  };

  const handleEmergencySubstitution = (injuredPlayer) => {
    const randomBenchIndex = Math.floor(Math.random() * playersOnBench.length);
    const substitutePlayer = playersOnBench[randomBenchIndex];

    const updatedPlayersOnCourt = [...playersOnCourt];
    const updatedPlayersOnBench = [...playersOnBench];

    const injuredPlayerIndex = updatedPlayersOnCourt.findIndex(
      (player) => player.name === injuredPlayer.name
    );

    if (injuredPlayerIndex !== -1) {
      updatedPlayersOnCourt[injuredPlayerIndex] = substitutePlayer;
      updatedPlayersOnBench[randomBenchIndex] = injuredPlayer;

      setPlayersOnCourt(updatedPlayersOnCourt);
      setPlayersOnBench(updatedPlayersOnBench);

      // Increment substitutions count for both the injured player and the substitute player
      injuredPlayer.substitutions++;
      substitutePlayer.substitutions++;
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
            <span className="timer-value red big">{formatTime(timer)}</span>
            <div className="spacer"></div>
            <button onClick={handleRestartTimer} className="restart-button">
              Restart
            </button>
          </div>
        )}
        <div className="column-container">
          <div className="column">
            <p className="column-heading">Current Players on the Court:</p>
            <ul>
              {playersOnCourt.map((player, index) => (
                <li key={index}>
                  {player.name} ({formatTime(player.timeOnCourt)})
                  {gameStarted && (
                    <button
                      onClick={() => handleEmergencySubstitution(player)}
                      className="injured-button"
                    >
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
                  <li key={pairIndex}>{pair}</li>
                ))}
              </ul>
            )}
            <div className="substitution-buttons">
              <button
                onClick={handleSelectSubs}
                className="select-subs-button"
              >
                Select Subs
              </button>
              <div className="spacer"></div>
              <button onClick={updateSubs} className="update-subs-button">
                Update Subs
              </button>
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
                <th>Time on Court</th>
                <th>Substitutions</th>
              </tr>
            </thead>
            <tbody>
              {playerStatistics.map((player, index) => (
                <tr key={index}>
                  <td>{player.name}</td>
                  <td>{player.timeOnCourt}</td>
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









































































