import { configureStore } from '@reduxjs/toolkit';
import articleReducer from './articleSlice';
import uiReducer from './uiSlice';

export const store = configureStore({
  reducer: {
    article: articleReducer,
    ui: uiReducer,
  },
});
