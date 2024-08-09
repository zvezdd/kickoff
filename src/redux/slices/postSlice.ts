import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

interface CounterState {
  value: number
}

const initialState: CounterState = {
  value: 0,
}

export const counterSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    }
  },
})

export const { increment } = counterSlice.actions


export default counterSlice.reducer