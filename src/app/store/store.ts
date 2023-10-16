import { configureStore } from '@reduxjs/toolkit'
import playersReducer from '../features/playerData/playersSlice'
import gameManagementReducer from '../features/gameManagement/gameManagementSlice'

const store = configureStore({
    reducer: {
        players: playersReducer,
        gameManagement: gameManagementReducer,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {playerData: PlayerDataState, gameManagement: GameManagementState}
export type AppDispatch = typeof store.dispatch

export default store;
