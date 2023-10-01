import React, { useState } from 'react';

const PlayerForm = ({ onFormSubmit }) => {
  const [numPlayers, setNumPlayers] = useState(0); // Define 'numPlayers' state

  const [formData, setFormData] = useState({
    playerNames: [],
    playerSizes: [],
    minutesPerHalf: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'numPlayers') {
      setNumPlayers(parseInt(value, 10)); // Update 'numPlayers' state
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handlePlayerInputChange = (e, index) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const playerNames = [...prevData.playerNames];
      playerNames[index] = value;
      return {
        ...prevData,
        playerNames,
      };
    });
  };

  const handleSelectChange = (e, index) => {
    const { value } = e.target;
    setFormData((prevData) => {
      const playerSizes = [...prevData.playerSizes];
      playerSizes[index] = value;
      return {
        ...prevData,
        playerSizes,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFormSubmit(formData);
  };

  const renderPlayerFields = () => {
    const playerFields = [];
    for (let i = 0; i < numPlayers; i++) {
      playerFields.push(
        <div key={i}>
          <input
            type="text"
            name="playerNames"
            placeholder={`Player ${i + 1} Name`}
            value={formData.playerNames[i] || ''}
            onChange={(e) => handlePlayerInputChange(e, i)}
          />
          <select
            name="playerSizes"
            value={formData.playerSizes[i] || ''}
            onChange={(e) => handleSelectChange(e, i)}
          >
            <option value="">Select Size</option>
            <option value="Big">Big</option>
            <option value="Small">Small</option>
          </select>
        </div>
      );
    }
    return playerFields;
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        name="numPlayers"
        placeholder="Number of Players"
        value={numPlayers}
        onChange={handleInputChange}
      />
      {renderPlayerFields()}
      <input
        type="number"
        name="minutesPerHalf"
        placeholder="Minutes Per Half"
        value={formData.minutesPerHalf}
        onChange={handleInputChange}
      />
      <button type="submit">Start Game</button>
    </form>
  );
};

export default PlayerForm;



