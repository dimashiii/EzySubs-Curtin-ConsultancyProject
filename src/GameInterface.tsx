import React from 'react';

const GameInterface = ({ players, gameTime, startingLineup, benchPlayers, playingTime, selectSubstitutions, performSubstitutions }) => {
  // Function to handle substitutions (call this when a substitution button is clicked)
  const handleSubstitution = () => {
    // Implement your code to handle substitutions here
    const substitutions = selectSubstitutions(startingLineup, benchPlayers, players);
    performSubstitutions(substitutions, startingLineup, benchPlayers);
  };

  // Function to format time in MM:SS format
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="game-interface">
      <h2>Game Interface</h2>
      <div className="game-info">
        <p>Game Time: {formatTime(gameTime)}</p>
        <p>Current Players on the Court: {startingLineup.join(', ')}</p>
        <p>Players on the Bench: {benchPlayers.join(', ')}</p>
      </div>
      <div className="player-list">
        <h3>Player Playing Time Summary:</h3>
        <ul>
          {Object.keys(playingTime).map((player) => (
            <li key={player}>
              {player}: {formatTime(playingTime[player])}
            </li>
          ))}
        </ul>
      </div>
      <button onClick={handleSubstitution}>Substitute</button>
    </div>
  );
};

export default GameInterface;

