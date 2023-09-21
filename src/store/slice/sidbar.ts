import { createSlice } from '@reduxjs/toolkit';

const sideBarSlice = createSlice({
  name: 'sidebar',
  initialState: {
    isSidebarOpen:false
  },
  reducers: {
    setIsSidebarToggle: (state, action) => {
      state.isSidebarOpen = action.payload
    }
  },
});

export const {setIsSidebarToggle} = sideBarSlice.actions;

export default sideBarSlice.reducer;