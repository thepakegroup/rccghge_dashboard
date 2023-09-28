import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface itemI{
  items: number[];
  file: any;
  id: number | null;
}

const itemsSlice = createSlice({
  name: 'items',
  initialState: {
    items: [],
    file: File,
    id:null,
  } as itemI,
  reducers: {
    setItems: (state, action:PayloadAction<number>) => {
      state.items.push(action.payload)
    },
    removeItem: (state, action: PayloadAction<number>) => {
      const items = state.items.filter(item => item !== action.payload)

      state.items = items
    },
    clearItems: (state) => {
      state.items = []
    },
    setMediaFile: (state, action) => {
      state.file = action.payload
    },
    setEditMediaId: (state, action: PayloadAction<number>) => {
      state.id = action.payload
    }
  },
});

export const {setItems,removeItem,clearItems,setMediaFile,setEditMediaId} = itemsSlice.actions;

export default itemsSlice.reducer;