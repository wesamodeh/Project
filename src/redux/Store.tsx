import { configureStore } from '@reduxjs/toolkit';
import storeConfig from './storeConfig';

// Create store instance
const store = configureStore(storeConfig);

// Get RootState and AppDispatch types from store
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export { store };
export type { RootState, AppDispatch };
