import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import playersReducer from '../features/playerData/playersSlice'
import gameManagementReducer from '../features/gameManagement/gameManagementSlice'

const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({
    players: playersReducer,
    gameManagement: gameManagementReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

const createStore = () => configureStore({
    reducer: persistedReducer,
})

const store = createStore();

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {playerData: PlayerDataState, gameManagement: GameManagementState}
export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store);

export default store;
