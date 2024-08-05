import { configureStore } from '@reduxjs/redux';
import postsReducer from './postsSlice';

const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});

export default store;
