import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  school: '',
};

const postFilterSlice = createSlice({
  name: 'postFilter',
  initialState,
  reducers: {
    setSchoolFilter(state, action) {
      state.school = action.payload;
    },
    clearFilters(state) {
      state.school = '';
    },
  },
});

export const { setSchoolFilter, clearFilters } = postFilterSlice.actions;

export default postFilterSlice.reducer;
