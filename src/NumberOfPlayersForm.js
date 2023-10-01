import React, { useState } from 'react';

const NumberOfPlayersForm = ({ onNext }) => {
  const [numPlayers, setNumPlayers] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(parseInt(numPlayers, 10));
  };

  return (
    <div className="page-container"> {/* Use the page-container class for consistent styling */}
      <div className="content-container"> {/* Use the content-container class for consistent styling */}
        <h2>Please enter the number of players on the team:</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-container"> {/* Use the input-container class for consistent styling */}
            <label htmlFor="numPlayers">Number of Players:</label>
            <input
              type="number"
              id="numPlayers"
              placeholder="Number of Players"
              value={numPlayers}
              onChange={(e) => setNumPlayers(e.target.value)}
              required
            />
          </div>
          <button type="submit">Next</button>
        </form>
      </div>
    </div>
  );
};

export default NumberOfPlayersForm;


