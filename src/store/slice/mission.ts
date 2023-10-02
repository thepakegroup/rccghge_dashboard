import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface serviceI{
  title?: string;
  id?: number | null;
  description?: string;
  category: string;
  btnType?: 'edit' | 'add';
}

const missionSlice = createSlice({
  name: 'mission',
  initialState: {
    title: "",
    category: "all",
    id: null,
    description:"",
    btnType: "add",
  } as serviceI,
  reducers: {
    setMission: (state, action:PayloadAction<serviceI>) => {
      state.title = action.payload.title
      state.category = action.payload.category
      state.description = action.payload.description
      state.id = action.payload.id
      state.btnType = action.payload.btnType
    },
    setTitle: (state, action) => {
      state.title = action.payload
    },
    setCategory: (state, action) => {
      state.category = action.payload
    },
    setDiscription: (state, action) => {
      state.description = action.payload
    },
  },
});

export const {
  setMission,
  setTitle,
  setCategory,
  setDiscription
} = missionSlice.actions;

export default missionSlice.reducer;