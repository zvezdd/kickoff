import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slices/userSlice'

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
})