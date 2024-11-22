import { configureStore } from '@reduxjs/toolkit';
import gamechainReducer from './gamechain/gamechainSlice';

export const store = configureStore({
  reducer: {
    gamechain: gamechainReducer,
  },
})