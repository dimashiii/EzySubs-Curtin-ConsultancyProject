import React, { useState } from 'react';

const HomeScreen = ({ onStart }) => {
  const [showInstructions, setShowInstructions] = useState(false);

  const toggleInstructions = () => {
    setShowInstructions(!showInstructions);
  };

  return (
    <div className="page-container">
      <div className="content-container wider-container rounded-container">
        <h3>Home Screen</h3>
        <button onClick={onStart} className="start-button">
          Start Game
        </button>
        <p className="instructions-link" onClick={toggleInstructions}>
          Instructions
        </p>
        {showInstructions && (
          <div className="instructions-box scrollable-instructions-box">
            <h3>Instructions</h3>
            <div className="instructions-text">
              <h4>Number of Players Screen</h4>
              <p>1. Enter the number of players on your team.</p>
              <p>2. Click the "Next" button.</p>

              <h4>Player Input Screen</h4>
              <p>1. Enter player names and select their sizes.</p>
              <p>2. Click the "Next" button.</p>

              <h4>Substitution Setup</h4>
              <p>1. Enter the desired "Minutes per Half".</p>
              <p>2. Specify the "Number of players per substitution".</p>
              <p>3. Click the "Next" button.</p>

              <h4>Game Information Screen</h4>
              <p>1. Click the "Start Game" button to initiate the game timer.</p>
              <p>2. During the game, you can "Restart" the timer if needed.</p>
              <p>3. Click the "Select Subs" button to select the number of substitutions specified from the bench.</p>
              <p>4. Click "Update Subs" to perform the substitutions.</p>
              <p>5. Under players on court, click the player name for emergency substitutions (e.g., injury).</p>
              <p>6. Once the player is on the bench, click the pause button to exclude them from being selected.</p>
              <p>7. Press the play button next to their name to include them back into substitutions.</p>
              <p>8. More than one player can be paused on the bench.</p>
              <p>9. Single substitutions can be done by clicking the player name on the court at any time and not paused.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeScreen;






