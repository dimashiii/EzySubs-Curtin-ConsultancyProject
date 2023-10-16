import React from 'react';
import { useAppDispatch, useAppSelector } from './app/store';
import { updateGameData } from './app/features/gameManagement/gameManagementSlice';

const MinutesPerHalfInput = ({ onMinutesPerHalfSubmit }) => {
  const gameManagement = useAppSelector((state) => state.gameManagement);
  const { minutesPerHalf, minutesToSubstitute, playersPerSubstitution }  = gameManagement;
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onMinutesPerHalfSubmit(minutesPerHalf, minutesToSubstitute, playersPerSubstitution); // Pass all values to the parent component
  };

  const handleInputChange = (e, field) => {
    const newGameManagement = {...gameManagement}
    console.log(`------newGameManagement------`, newGameManagement)
    console.log(`------field------`, field)
    newGameManagement[field] = e.target.value;
    console.log(`------newGameManagement after------`, newGameManagement)
    dispatch(updateGameData(newGameManagement))
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
              onChange={(e) => handleInputChange(e, 'minutesPerHalf')}
            />
          </div>
          <div className="input-container">
            <label htmlFor="minutesToSubstitute">Minutes to substitute:</label>
            <input
              type="number"
              id="minutesToSubstitute"
              value={minutesToSubstitute}
              onChange={(e) => handleInputChange(e, 'minutesToSubstitute')}
            />
          </div>
          <div className="input-container">
            <label htmlFor="playersPerSubstitution">Number of players per substitution:</label>
            <input
              type="number"
              id="playersPerSubstitution"
              value={playersPerSubstitution}
              onChange={(e) => handleInputChange(e, 'playersPerSubstitution')}
            />
          </div>
          <button type="submit">Next</button>
        </form>
      </div>
    </div>
  );
};

export default MinutesPerHalfInput;
