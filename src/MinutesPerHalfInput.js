import React, { useState } from 'react';

const MinutesPerHalfInput = ({ onMinutesPerHalfSubmit }) => {
  const [minutesPerHalf, setMinutesPerHalf] = useState(0);
  const [minutesToSubstitute, setMinutesToSubstitute] = useState(0);
  const [playersPerSubstitution, setPlayersPerSubstitution] = useState(0); // New state for players per substitution

  const handleSubmit = (e) => {
    e.preventDefault();
    onMinutesPerHalfSubmit(minutesPerHalf, minutesToSubstitute, playersPerSubstitution); // Pass all values to the parent component
  };

  return (
    <div className="page-container">
      <div className="content-container">
        <h1>Ezy Subs</h1>
        <form onSubmit={handleSubmit}>
          <h2>Please enter the number of minutes per half, minutes for substitution, and players per substitution:</h2>
          <div className="input-container">
            <label htmlFor="minutesPerHalf">Minutes per half:</label>
            <input
              type="number"
              id="minutesPerHalf"
              value={minutesPerHalf}
              onChange={(e) => setMinutesPerHalf(e.target.value)}
            />
          </div>
          <div className="input-container">
            <label htmlFor="minutesToSubstitute">Minutes to substitute:</label>
            <input
              type="number"
              id="minutesToSubstitute"
              value={minutesToSubstitute}
              onChange={(e) => setMinutesToSubstitute(e.target.value)}
            />
          </div>
          <div className="input-container">
            <label htmlFor="playersPerSubstitution">Number of players per substitution:</label>
            <input
              type="number"
              id="playersPerSubstitution"
              value={playersPerSubstitution}
              onChange={(e) => setPlayersPerSubstitution(e.target.value)}
            />
          </div>
          <button type="submit">Next</button>
        </form>
      </div>
    </div>
  );
};

export default MinutesPerHalfInput;



