import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface groupI{
  name: string;
  category: string;
  description: string
  id?: number | null;
  action?:'add' | 'edit';
}

const groupSlice = createSlice({
  name: 'group',
  initialState: {
    name: "",
    category:"All",
    description: "",
    id: null,
    action:'add'
  } as groupI,
  reducers: {
    setGroupInfo: (state, action:PayloadAction<groupI>) => {
      state.name = action.payload.name
      state.category = action.payload.category
      state.description = action.payload.description
      state.id = action.payload.id
    },
    setName: (state, action) => {
      state.name = action.payload
    },
    setCatgeory: (state, action) => {
      state.category = action.payload
    },
    setDescription: (state, action) => {
      state.description = action.payload
    },
    setAction:(state, action) => {
      state.action = action.payload
    },
  },
});

export const {
  setGroupInfo,
  setName,
  setDescription,
  setCatgeory,
  setAction
} = groupSlice.actions;

export default groupSlice.reducer;