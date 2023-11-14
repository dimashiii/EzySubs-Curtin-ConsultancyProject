import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';
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
    <Container className="page-container"> {/* Use the page-container class for consistent styling */}
      <Box className="content-container"> {/* Use the content-container class for consistent styling */}
        <Typography variant="h4" component="h2" gutterBottom>
          Enter the number of players on the team:
        </Typography>
        <form onSubmit={handleSubmit}>
          
          <Input
              type="number"
              id="numPlayers"
              placeholder="Number of Players"
              value={numPlayers}
              onChange={handleAddPlayersCount}
              required
              sx={{ width: 1, border: 1, borderColor: 'primary.main', borderRadius: 1 }}
            />
            
          <button type="submit">Next</button>
        </form>
      </Box>
    </Container>
  );
};

export default NumberOfPlayersForm;


