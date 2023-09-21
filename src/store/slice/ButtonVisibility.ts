import { createSlice } from '@reduxjs/toolkit';

const buttonVisibilitySlice = createSlice({
  name: 'button',
  initialState: {
    isButtonViible:true
  },
  reducers: {
    setButtonVisibility: (state, action) => {
      state.isButtonViible = action.payload
    }
  },
});

export const {setButtonVisibility} = buttonVisibilitySlice.actions;

export default buttonVisibilitySlice.reducer;