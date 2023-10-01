import React, { useState } from 'react';

const PlayerInputForm = ({ numPlayers, onNext }) => {
  const [playerData, setPlayerData] = useState(Array(numPlayers).fill({ name: '', size: '' }));

  const handleNext = () => {
    onNext(playerData);
  };

  const handleInputChange = (e, index, field) => {
    const newPlayerData = [...playerData];
    newPlayerData[index] = { ...newPlayerData[index], [field]: e.target.value };
    setPlayerData(newPlayerData);
  };

  return (
    <div className="page-container"> {/* Use the page-container class for consistent styling */}
      <div className="content-container"> {/* Use the content-container class for consistent styling */}
        <h2>Please enter player names and sizes:</h2>
        <form>
          {Array.from({ length: numPlayers }, (_, index) => (
            <div key={index} className="input-container"> {/* Use the input-container class for consistent styling */}
              <input
                type="text"
                placeholder={`Player ${index + 1} Name`}
                value={playerData[index].name}
                onChange={(e) => handleInputChange(e, index, 'name')}
                required
              />
              <select
                value={playerData[index].size}
                onChange={(e) => handleInputChange(e, index, 'size')}
                required
              >
                <option value="">Select Size</option>
                <option value="Big">Big</option>
                <option value="Small">Small</option>
              </select>
            </div>
          ))}
          <button type="button" onClick={handleNext}>
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default PlayerInputForm;





