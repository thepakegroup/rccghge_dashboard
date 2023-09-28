import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface testimonyI{
  id: number;
}

const testimonySlice = createSlice({
  name: 'testimony',
  initialState: {
    id:0,
  } as testimonyI,
  reducers: {
    setTestimonyId: (state, action: PayloadAction<number>) => {
      state.id = action.payload
    }
  },
});

export const {setTestimonyId} = testimonySlice.actions;

export default testimonySlice.reducer;