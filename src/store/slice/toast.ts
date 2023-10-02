import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface toastI{
  isToast: boolean;
  title: string;
  info?: string;
  type?:'delete' | 'update' | 'add'
}

const toastSlice = createSlice({
  name: 'toast',
  initialState: {
    isToast: false,
    title: "",
    info: "",
    type:"add"
  } as toastI,
  reducers: {
    setToast: (state, action:PayloadAction<toastI>) => {
      state.isToast = action.payload.isToast
      state.title = action.payload.title
      state.info = action.payload.info
      state.type = action.payload.type
    }
  },
});

export const {setToast} = toastSlice.actions;

export default toastSlice.reducer;