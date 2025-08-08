import React from 'react';
import { useAppDispatch, useAppSelector } from './app/store';
import { updateGameData } from './app/features/gameManagement/gameManagementSlice';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';

const MinutesPerHalfInput = ({ onMinutesPerHalfSubmit }) => {
  const gameManagement = useAppSelector((state) => state.gameManagement);
  const {
    minutesPerHalf,
    minutesToSubstitute,
    playersPerSubstitution,
    substitutionMinutes
  } = gameManagement;

  const dispatch = useAppDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    onMinutesPerHalfSubmit(
      minutesPerHalf,
      minutesToSubstitute,
      playersPerSubstitution,
      substitutionMinutes
    );
  };

  const handleInputChange = (e, field) => {
    const newGameManagement = { ...gameManagement, [field]: e.target.value };
    dispatch(updateGameData(newGameManagement));
  };

  return (
    <Container className="page-container">
      <Box className="content-container">
        <Typography variant="h4" gutterBottom>
          Settings
        </Typography>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label htmlFor="minutesPerHalf">Minutes per half:</label>
            <Input
              type="number"
              id="minutesPerHalf"
              value={minutesPerHalf}
              onChange={(e) => handleInputChange(e, 'minutesPerHalf')}
              sx={{ width: '30%', border: 1, borderColor: 'primary.main', borderRadius: 1, marginBottom: 2 }}
            />
          </div>

          <div className="input-container">
            <label htmlFor="minutesToSubstitute">Alarm Interval:</label>
            <Input
              type="number"
              id="minutesToSubstitute"
              value={minutesToSubstitute}
              onChange={(e) => handleInputChange(e, 'minutesToSubstitute')}
              sx={{ width: '30%', border: 1, borderColor: 'primary.main', borderRadius: 1, marginBottom: 2 }}
            />
          </div>

          <div className="input-container">
            <label htmlFor="playersPerSubstitution">Players per substitution:</label>
            <Input
              type="number"
              id="playersPerSubstitution"
              value={playersPerSubstitution}
              onChange={(e) => handleInputChange(e, 'playersPerSubstitution')}
              sx={{ width: '30%', border: 1, borderColor: 'primary.main', borderRadius: 1, marginBottom: 2 }}
            />
          </div>

          <div className="input-container">
            <label htmlFor="substitutionMinutes">Substitution Minutes:</label>
            <Input
              type="number"
              id="substitutionMinutes"
              value={substitutionMinutes || ''}
              onChange={(e) => handleInputChange(e, 'substitutionMinutes')}
              sx={{ width: '30%', border: 1, borderColor: 'primary.main', borderRadius: 1, marginBottom: 2 }}
            />
          </div>

          <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
            Next
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default MinutesPerHalfInput;







