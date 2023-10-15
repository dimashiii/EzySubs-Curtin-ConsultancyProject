import { configureStore } from '@reduxjs/toolkit'
import playersReducer from '../features/playerData/playersSlice'

const store = configureStore({
    reducer: {
        players: playersReducer,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {playerData: PlayerDataState}
export type AppDispatch = typeof store.dispatch

export default store;