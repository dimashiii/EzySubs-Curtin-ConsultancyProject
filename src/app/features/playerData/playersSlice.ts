import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface Player {
    id: number;
    name: string;
    size: string;
}

export interface PlayerState {
  players: Player[];
}

const initialState: PlayerState = {
  players: [],
}

export const playersSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    createPlayers: (state, action: PayloadAction<Player[]>) => {
        state.players = action.payload;
    },
    updatePlayer: (state, action: PayloadAction<Player>) => {
        const index = state.players.findIndex(player => player.id === action.payload.id);
        if (index !== -1) {
            state.players[index] = action.payload;
        }
    }
  },
})

// Action creators are generated for each case reducer function
export const { createPlayers, updatePlayer } = playersSlice.actions

export const selectPlayers = (state: { players: PlayerState }) => state.players.players

export default playersSlice.reducer