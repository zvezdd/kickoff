import { configureStore } from '@reduxjs/toolkit';
import postFilterReducer from './slices/postFilterSlice';

const store = configureStore({
  reducer: {
    postFilter: postFilterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
