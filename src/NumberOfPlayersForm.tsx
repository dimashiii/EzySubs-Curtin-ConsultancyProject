import React, { useState } from 'react';
import { useAppDispatch } from './app/store';
import { createPlayers } from './app/features/playerData/playersSlice';

const NumberOfPlayersForm = ({ onNext }) => {
  const dispatch = useAppDispatch();
  const [numPlayers, setNumPlayers] = useState(0);

  const handleAddPlayersCount = (e) => {
    setNumPlayers(parseInt(e.target.value, 10));
  }
  
  const handleSubmit = () => {
    createNewPlayers(numPlayers);
    onNext(10);
  };

  const createNewPlayers = (playersCount: number) => {
    // Given the player count, generate a new array of players and dispatch it to the store using the action addPlayers
    const newPlayers = Array.from({ length: playersCount }, (_, index: number) => ({
      name: '',
      size: '',
      id: index,
    }));
    console.log('players: ', newPlayers)
    dispatch(createPlayers(newPlayers))
  }

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
              onChange={handleAddPlayersCount}
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


