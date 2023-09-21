import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface toastI{
  isToast: boolean;
  title: string;
  info: string;
}

const toastSlice = createSlice({
  name: 'toast',
  initialState: {
    isToast: false,
    title: "",
    info:""
  } as toastI,
  reducers: {
    setToast: (state, action:PayloadAction<toastI>) => {
      state.isToast = action.payload.isToast
      state.title = action.payload.title
      state.info = action.payload.info
    }
  },
});

export const {setToast} = toastSlice.actions;

export default toastSlice.reducer;