// Your PlayerInputForm component

import React, { useMemo, useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { useAppDispatch, useAppSelector } from './app/store';
import { updatePlayer, deletePlayer, addPlayer } from './app/features/playerData/playersSlice';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const PlayerInputForm = ({ onNext }) => {
  const dispatch = useAppDispatch();
  const players = useAppSelector((state) => state.players.players);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const findPlayer = useMemo(() => {
    return (id) => {
      return players.find((player) => player.id === id);
    };
  }, [players]);

  const handleNext = () => {
    onNext(players);
  };

  const handleInputChange = (e, playerId, field) => {
    const player = findPlayer(playerId);
    const newPlayer = { ...player };
    newPlayer[field] = e.target.value;
    dispatch(updatePlayer(newPlayer));
  };

  const handleDeletePlayer = (playerId) => {
    dispatch(deletePlayer(playerId));
  };

  const handleAddPlayer = () => {
    dispatch(addPlayer());
  };

  return (
    <Container className="page-container" sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      padding: 2
    }}>
      <Box
        className="content-container"
        sx={{
          width: '100%',
          maxWidth: isMobile ? 350 : 800
        }}
      >
        <Typography variant='h4' align="center">Team Information</Typography>
        <Box sx={{ maxHeight: 500, overflow: 'auto', width: '100%' }}>
          <Stack spacing={2}>
            
            {players.map((player, index) => (
              <Box
                key={player.id}
                sx={{
                  display: 'flex',
                  flexDirection: isMobile ? 'column' : 'row',
                  alignItems: 'center',
                  width: '100%'
                }}
              >
                <TextField
                  fullWidth
                  type="text"
                  label={`Player ${index + 1} Name`}
                  variant="outlined"
                  value={player.name}
                  onChange={(e) => handleInputChange(e, player.id, 'name')}
                  required
                  sx={{ width: isMobile ? '100%' : '70%' }}
                />
                <TextField
                  select
                  label="Size"
                  value={player.size}
                  onChange={(e) => handleInputChange(e, player.id, 'size')}
                  variant="outlined"
                  required
                  sx={{ width: isMobile ? '100%' : '30%', mt: isMobile ? 2 : 0, ml: 2 }}
                >
                  <MenuItem value="">Select Size</MenuItem>
                  <MenuItem value="Big">Big</MenuItem>
                  <MenuItem value="Small">Small</MenuItem>
                </TextField>
                <Button variant="outlined" sx={{ ml: 2 }} onClick={() => handleDeletePlayer(player.id)}>
                  x
                </Button>
              </Box>
            ))}
            
            <Button variant="outlined" sx={{ ml: 2 }} onClick={handleAddPlayer}>
              ADD
            </Button>
            <Button variant="contained" onClick={handleNext}>
              Save/Next
            </Button>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
};

export default PlayerInputForm;







