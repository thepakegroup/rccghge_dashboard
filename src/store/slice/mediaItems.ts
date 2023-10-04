import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface itemI{
  items: number[];
  file: File | null;
  fileName: string;
  id: number | null | string;
}

const itemsSlice = createSlice({
  name: 'items',
  initialState: {
    items: [],
    file: null,
    fileName:"",
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
    setFileName: (state, action) => {
      state.fileName = action.payload
    },
    setEditMediaId: (state, action: PayloadAction<number| string>) => {
      state.id = action.payload
    }
  },
});

export const {
  setItems,
  removeItem,
  clearItems,
  setMediaFile,
  setEditMediaId,
  setFileName
} = itemsSlice.actions;

export default itemsSlice.reducer;