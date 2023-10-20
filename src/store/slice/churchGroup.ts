import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface groupI {
  name: string;
  category: string;
  description: string;
  id?: number | null;
  action?: "add" | "edit";
  banner?: any;
  groupImg?: File | null;
  groupImgName?: string;
}

const groupSlice = createSlice({
  name: "group",
  initialState: {
    name: "",
    category: "All",
    description: "",
    id: null,
    action: "add",
    groupImg: null,
    groupImgName: "",
  } as groupI,
  reducers: {
    setGroupInfo: (state, action: PayloadAction<groupI>) => {
      state.name = action.payload.name;
      state.category = action.payload.category;
      state.description = action.payload.description;
      state.id = action.payload.id;
      state.groupImg = action.payload.groupImg;
      state.groupImgName = action.payload.groupImgName;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setCatgeory: (state, action) => {
      state.category = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setAction: (state, action) => {
      state.action = action.payload;
    },
    setGroupImg: (state, action) => {
      state.groupImg = action.payload;
    },
    setGroupImgName: (state, action) => {
      state.groupImgName = action.payload;
    },
  },
});

export const {
  setGroupInfo,
  setName,
  setDescription,
  setCatgeory,
  setAction,
  setGroupImg,
  setGroupImgName,
} = groupSlice.actions;

export default groupSlice.reducer;
