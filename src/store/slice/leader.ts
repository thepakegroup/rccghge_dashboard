import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface leaderI{
  name: string;
  title: string;
  qualification: string;
  position: string;
  description: string
  fullStory: string;
  leaderImg?: File | null;
  leaderImgName?: string;
  id?: number | null;
  action?:'add' | 'edit';
}

const leaderSlice = createSlice({
  name: 'content',
  initialState: {
    name: "",
    title: "",
    qualification: "",
    position:"",
    description: "",
    leaderImg: null,
    leaderImgName:'',
    fullStory: "",
    id: null,
    action:'add'
  } as leaderI,
  reducers: {
    setLeaderInfo: (state, action:PayloadAction<leaderI>) => {
      state.name = action.payload.name
      state.title = action.payload.title
      state.position = action.payload.position
      state.qualification = action.payload.qualification
      state.description = action.payload.description
      state.fullStory = action.payload.fullStory
      state.id = action.payload.id
      state.leaderImg = action.payload.leaderImg
      state.leaderImgName = action.payload.leaderImgName
    },
    setName: (state, action) => {
      state.name = action.payload
    },
    setTitle: (state, action) => {
      state.title = action.payload
    },
    setQualification: (state, action) => {
      state.qualification = action.payload
    },
    setPosition: (state, action) => {
      state.position = action.payload
    },
    setDescription: (state, action) => {
      state.description = action.payload
    },
    setFullStory: (state, action) => {
      state.fullStory = action.payload
    },
    setAction:(state, action) => {
      state.action = action.payload
    },
    setLeaderImg: (state, action) => {
      state.leaderImg = action.payload
    },
    setLeaderImgName: (state, action) => {
      state.leaderImgName = action.payload
    }
  },
});

export const {
  setLeaderInfo,
  setName,
  setDescription,
  setFullStory,
  setPosition,
  setQualification,
  setTitle,
  setAction,
  setLeaderImg,
  setLeaderImgName
} = leaderSlice.actions;

export default leaderSlice.reducer;