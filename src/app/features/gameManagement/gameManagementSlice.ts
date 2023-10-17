import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface GameManagementState {
    minutesPerHalf: number;
    minutesToSubstitute: number;
    playersPerSubstitution: number;
}

const initialState: GameManagementState = {
    minutesPerHalf: 0,
    minutesToSubstitute: 0,
    playersPerSubstitution: 0,
}

export const gameManagementSlice = createSlice({
    name: 'gameManagement',
    initialState,
    reducers: {
        updateGameData: (state, action: PayloadAction<GameManagementState>) => {
            state.minutesPerHalf = action.payload.minutesPerHalf;
            state.minutesToSubstitute = action.payload.minutesToSubstitute;
            state.playersPerSubstitution = action.payload.playersPerSubstitution;
        }
    },
})

// Export action creators
export const { updateGameData } = gameManagementSlice.actions

// Export reducers as default export
export default gameManagementSlice.reducer