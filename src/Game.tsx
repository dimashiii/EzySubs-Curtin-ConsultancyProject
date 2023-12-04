import React, { useState, useEffect } from 'react';
import './Game.css';
import { useAppSelector } from './app/store';
import { Container, Box, Typography, Button, Grid, Table, TableHead, TableRow, TableCell, TableBody, Stack } from '@mui/material';
import { useRef } from 'react';
import alarmSound from './alarm.wav';
import './declarations.d.ts';


const Game = () => {
  const playersData = useAppSelector(state => state.players.players);
  const minutesPerHalfData = useAppSelector(state => state.gameManagement);
  const [playersOnCourt, setPlayersOnCourt] = useState([]);
  const [playersOnBench, setPlayersOnBench] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [lastSubstitution, setLastSubstitution] = useState([]);
  const [timer, setTimer] = useState(minutesPerHalfData.minutesPerHalf * 60); 
  const [playerStatistics, setPlayerStatistics] = useState([]);

  const [showStatistics, setShowStatistics] = useState(false);
  const minutesToSubstitute = minutesPerHalfData.minutesToSubstitute; // Declare minutesToSubstitute here

  const alarmRef = useRef(new Audio(alarmSound));

  const handleShowStatistics = () => {
    setShowStatistics((prevShowStatistics) => !prevShowStatistics);
  };
  
  const handleRestartApp = () => {
    // Reload the entire page to restart the app
    window.location.reload();
  };
  

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
    const playerNameWithSuffix = `${player.name} ${player.size === 'Big' ? '(b)' : '(s)'}`;
    return (
      <button
        onClick={() => onClick(player)}
        className={`common-button ${isExcluded ? 'excluded' : 'rest'}`}
      >
        {playerNameWithSuffix} {isExcluded ? "II" : "▶"}
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

    // Ensure balance of big and small players
  const numBigPlayers = Math.max(2, Math.floor(num / 3)); // Ensure at least 2 big players
  const numSmallPlayers = num - numBigPlayers;

  let bigPlayersOnCourt = 0;
  let smallPlayersOnCourt = 0;

  players.forEach((player) => {
    if (player.size === 'Big' && bigPlayersOnCourt < numBigPlayers) {
      player.isSubstituted = false; // Set as not substituted
      bigPlayersOnCourt++;
    } else if (player.size === 'Small' && smallPlayersOnCourt < numSmallPlayers) {
      player.isSubstituted = false; // Set as not substituted
      smallPlayersOnCourt++;
    } else {
      player.isSubstituted = true; // Set as substituted for extra players
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
    setLastSubstitution([]);
  };

  const handleStartGame = () => {
    setGameStarted(true);
  };

  useEffect(() => {
    let countdown;

    // Play the alarm sound every specified minutesToSubstitute minutes
    if (timer % (minutesToSubstitute * 60) === 0) {
      alarmRef.current.play();
    }

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
  }, [gameStarted, timer, playerTimers, playersOnCourt, minutesPerHalfData.minutesToSubstitute]);




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

      // Check if the substitute player is excluded
    if (excludedPlayers.includes(substitutePlayer)) {
      // Retry the substitution if the substitute player is excluded
      handleEmergencySubstitution(injuredPlayer);
      return;
    }
  
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
    <Container className="page-container" maxWidth="lg">
      <Box className="content-container" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant="h4" gutterBottom>Game Information</Typography>

          {gameStarted && (
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                  <Typography className="timer-value red big" component="span" variant="h6">{formatTime(timer)}</Typography>
                  <Stack direction="row" spacing={2} sx={{ my: 2 }}>
                  <Box sx={{ my: 2 }}>
                      <Button variant="outlined" onClick={handleRestartTimer}>Reset Time</Button>
                  </Box>
                      <Button variant="contained" onClick={handleRestartApp}>Start Again</Button>
                  </Stack>
              </Box>
          )}

          <Box sx={{ maxHeight: 'calc(100vh - 300px)', overflow: 'auto'}}>

            <Grid container spacing={3} sx={{ my: 2 }}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom> Players on the Court:</Typography>
                    <Box>
                        {playersOnCourt.map((player, index) => (
                            <CommonButton
                                key={index}
                                player={player}
                                onClick={handleEmergencySubstitution}
                                isExcluded={excludedPlayers.includes(player)}
                            />
                        ))}
                    </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom>Players on the Bench:</Typography>
                    <Box component="ul">
                        {playersOnBench.map((player, index) => (
                            <li key={index}>
                                <CommonButton
                                    player={player}
                                    onClick={togglePlayerExclusion}
                                    isExcluded={excludedPlayers.includes(player)}
                                />
                            </li>
                        ))}
                    </Box>
                </Grid>
            </Grid>

            {gameStarted && (
                <Box sx={{ my: 2 }}>
                    <Typography variant="h5" gutterBottom>Substitutions</Typography>
                    {lastSubstitution && lastSubstitution.length > 0 && (
                        <Box component="ul">
                            {lastSubstitution.map((pair, pairIndex) => (
                                <li key={pairIndex}>{pair}</li>
                            ))}
                        </Box>
                    )}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 2 }}>
                        <Button variant="outlined" onClick={handleSelectSubs}>Select Subs</Button>
                        <Button variant="contained" onClick={updateSubs}>Update Subs</Button>
                        <Button variant="contained" onClick={handleShowStatistics}>Statistics</Button>
                    </Box>
                </Box>
            )}

            {!gameStarted && (
                <Button variant="contained" onClick={handleStartGame} size="large">Start Game</Button>
            )}

            {/* Conditionally render player statistics section */}
            {showStatistics && gameStarted && (
              <Box sx={{ width: '100%', overflowX: 'auto', my: 2 }}>
                <Typography variant="h5" gutterBottom>Player Statistics</Typography>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Player Name</TableCell>
                      <TableCell>Minutes on Court</TableCell>
                      <TableCell>Substitutions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {playersData.map((player, index) => (
                      <TableRow key={index}>
                        <TableCell>{player.name}</TableCell>
                        <TableCell>{formatTime(playerTimers[player.name] || 0)}</TableCell>
                        <TableCell>{(playersOnCourt.find((p) => p.name === player.name)?.substitutions || 0) +
                          (playersOnBench.find((p) => p.name === player.name)?.substitutions || 0)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            )}
          </Box>
        </Box>
      </Container>
  );
};

export default Game;
