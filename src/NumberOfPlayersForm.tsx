import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import { useAppDispatch } from './app/store';
import { createPlayers } from './app/features/playerData/playersSlice';

const NumberOfPlayersForm = ({ onNext }) => {
  const dispatch = useAppDispatch();
  const [numPlayers, setNumPlayers] = useState(0);

  const handleAddPlayersCount = (e) => {
    setNumPlayers(parseInt(e.target.value, 10));
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (numPlayers >= 6) {
      createNewPlayers(numPlayers);
      onNext(10);
    } else {
      // Display an error message or prevent the form submission
      alert('Minimum allowable players is 6. Please enter a valid number.');
    }
  };

  const createNewPlayers = (playersCount) => {
    // Given the player count, generate a new array of players and dispatch it to the store using the action addPlayers
    const newPlayers = Array.from({ length: playersCount }, (_, index) => ({
      name: '',
      size: '',
      id: index,
    }));
    console.log('players: ', newPlayers)
    dispatch(createPlayers(newPlayers));
  }

  return (
    <Container className="page-container">
      <Box className="content-container">
        <Typography variant="h4" component="h2" gutterBottom>
          Number of players:
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
          <Button type="submit" variant="contained" color="primary">
            Next
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default NumberOfPlayersForm;



