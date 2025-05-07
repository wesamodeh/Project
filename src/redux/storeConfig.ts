import { configureStore } from '@reduxjs/toolkit';
import namesReducer from './namesSlice';

const storeConfig = {
  reducer: {
    names: namesReducer
  }
};

export default storeConfig; 