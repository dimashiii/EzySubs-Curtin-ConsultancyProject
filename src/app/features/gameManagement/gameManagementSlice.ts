import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface GameManagementState {
  minutesPerHalf: number;
  minutesToSubstitute: number;
  playersPerSubstitution: number;
  substitutionMinutes: number; // ✅ New field
}

const initialState: GameManagementState = {
  minutesPerHalf: 0,
  minutesToSubstitute: 0,
  playersPerSubstitution: 0,
  substitutionMinutes: 0, // ✅ Initialize it here too
};

export const gameManagementSlice = createSlice({
  name: 'gameManagement',
  initialState,
  reducers: {
    updateGameData: (state, action: PayloadAction<GameManagementState>) => {
      state.minutesPerHalf = action.payload.minutesPerHalf;
      state.minutesToSubstitute = action.payload.minutesToSubstitute;
      state.playersPerSubstitution = action.payload.playersPerSubstitution;
      state.substitutionMinutes = action.payload.substitutionMinutes; // ✅ Update from payload
    },
    resetGameData: () => initialState,
  },
});

export const { updateGameData, resetGameData } = gameManagementSlice.actions;
export default gameManagementSlice.reducer;
