import { useMemo } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { useAppDispatch, useAppSelector } from './app/store';
import { updatePlayer } from './app/features/playerData/playersSlice';

const PlayerInputForm = ({ onNext }) => {
  const dispatch = useAppDispatch();
  const players = useAppSelector((state) => state.players.players);

  const findPlayer = useMemo(() => {
    return (id) => {
      return players.find((player) => player.id === id);
    };
  }, [players]);


  const handleNext = () => {
    onNext(players);
  };

  const handleInputChange = (e, playerId, field) => {
    const player = findPlayer(playerId)
    const newPlayer = {...player}
    newPlayer[field] = e.target.value;
    dispatch(updatePlayer(newPlayer))
  };

  return (
    <Container className="page-container" sx={{ alignContent: 'center'}}> {/* Use the page-container class for consistent styling */}
      <Box className="content-container"> {/* Use the content-container class for consistent styling */}
        <Typography variant='h4'>Team Information</Typography>
        <Box sx={{ maxHeight: 500, overflow: 'auto'}}>
          <Stack spacing={1}>
            {players.map( (player, index) => (
              <Box key={player.id} sx={{ display:'flex'}}> {/* Use the input-container class for consistent styling */}
                <input
                  type="text"
                  placeholder={`Player ${index + 1} Name`}
                  value={player.name}
                  onChange={(e) => handleInputChange(e, player.id, 'name')}
                  required
                />
                <select
                  value={player.size}
                  onChange={(e) => handleInputChange(e, player.id, 'size')}
                  required
                >
                  <option value="">Select Size</option>
                  <option value="Big">Big</option>
                  <option value="Small">Small</option>
                </select>
              </Box>
            ))}
            <button type="button" onClick={handleNext}>
              Next
            </button>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
};

export default PlayerInputForm;





