import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface serviceI {
  name?: string;
  startTime?: string;
  endTime?: string;
  id?: number | null;
  description?: string | any | null;
  btnType?: "edit" | "add";
}

const serviceSlice = createSlice({
  name: "service",
  initialState: {
    name: "",
    startTime: new Date().toISOString(),
    endTime: new Date().toISOString(),
    id: null,
    description: "",
    btnType: "add",
  } as serviceI,
  reducers: {
    setService: (state, action: PayloadAction<serviceI>) => {
      state.name = action.payload.name;
      state.startTime = action.payload.startTime;
      state.endTime = action.payload.endTime;
      state.description = action.payload.description;
      state.id = action.payload.id;
      state.btnType = action.payload.btnType;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setStartTime: (state, action) => {
      state.startTime = action.payload;
    },
    setEndTime: (state, action) => {
      state.endTime = action.payload;
    },
    setDiscriptionService: (state, action) => {
      state.description = action.payload;
    },
  },
});

export const {
  setService,
  setName,
  setStartTime,
  setEndTime,
  setDiscriptionService,
} = serviceSlice.actions;

export default serviceSlice.reducer;
