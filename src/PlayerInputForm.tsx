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

  const handleDeleteLastPlayer = () => {
    const lastPlayerId = players[players.length - 1]?.id;
    if (lastPlayerId) {
      dispatch(deletePlayer(lastPlayerId));
    }
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
        <Typography variant='h4' align="center">Team </Typography>
        <Box sx={{ maxHeight: 500, overflow: 'auto', width: '100%' }}>
          <Stack spacing={2}>
            
            {players.map((player, index) => (
              <Box
                key={player.id}
                sx={{
                  display: 'flex',
                  flexDirection: isMobile ? 'column' : 'row',
                  
                  width: '100%'
                }}
              >
                <TextField
                  fullWidth
                  type="text"
                  label={`Player ${index + 1} `}
                  variant="outlined"
                  value={player.name}
                  onChange={(e) => handleInputChange(e, player.id, 'name')}
                  required
                  sx={{ width: '45%', border: 1, borderColor: 'primary.main', borderRadius: 1, marginBottom: 2, textAlign: 'left'}}
                  
                />
                <TextField
                  select
                  label="Size"
                  value={player.size}
                  onChange={(e) => handleInputChange(e, player.id, 'size')}
                  variant="outlined"
                  required
                  sx={{ width: '25%', mt: isMobile ? 2 : 0, ml: 2, border: 1, borderColor: 'primary.main', borderRadius: 1, marginBottom: 2 }}

                  
                >
                  <MenuItem value="">Select Size</MenuItem>
                  <MenuItem value="Big">Big</MenuItem>
                  <MenuItem value="Small">Sml</MenuItem>
                </TextField>
              </Box>
            ))}
            
            <Stack direction="column" spacing={2}>
              <Button variant="outlined" sx={{ width: '100%' }} onClick={handleAddPlayer}>
              
                ADD
              </Button>
              <Button variant="outlined" sx={{ width: '100%' }} onClick={handleDeleteLastPlayer}>
                Remove
              </Button>
              <Button variant="contained" sx={{ width: '100%' }} onClick={handleNext}>
                Save/Next
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
};

export default PlayerInputForm;









