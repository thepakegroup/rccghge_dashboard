import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { EnumMember } from 'typescript';

interface modalI{
  isModalOpen: boolean;
  type?:"modify" | "delete"
}

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isModalOpen: false,
    type:'modify'
  } as modalI,
  reducers: {
    setModalToggle: (state, action:PayloadAction<modalI>) => {
      state.isModalOpen = action.payload.isModalOpen
      state.type = action.payload.type
    }
  },
});

export const {setModalToggle} = modalSlice.actions;

export default modalSlice.reducer;