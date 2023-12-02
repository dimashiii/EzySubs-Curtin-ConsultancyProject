// ./app/features/playerData/playersSlice.ts

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

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
};

export const playersSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    createPlayers: (state, action: PayloadAction<Player[]>) => {
      state.players = action.payload;
    },
    updatePlayer: (state, action: PayloadAction<Player>) => {
      const index = state.players.findIndex((player) => player.id === action.payload.id);
      if (index !== -1) {
        state.players[index] = action.payload;
      }
    },
    deletePlayer: (state, action: PayloadAction<number>) => {
      const playerIdToDelete = action.payload;
      state.players = state.players.filter((player) => player.id !== playerIdToDelete);
    },
    addPlayer: (state) => {
      const newPlayer: Player = {
        id: state.players.length + 1,
        name: '',
        size: '',
      };
      state.players.push(newPlayer);
    },
  },
});

export const { createPlayers, updatePlayer, deletePlayer, addPlayer } = playersSlice.actions;

export const selectPlayers = (state: { players: PlayerState }) => state.players.players;

export default playersSlice.reducer;

