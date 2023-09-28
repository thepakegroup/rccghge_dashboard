import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface contentI{
  content?: string;
  title?: string;
  header?: string;
  id?: number | null;
  btnType?: 'edit' | 'add';
  section?:string
}

const contentSlice = createSlice({
  name: 'content',
  initialState: {
    content: "",
    title: "",
    header: "",
    id: 0,
    btnType: "add",
    section:""
  } as contentI,
  reducers: {
    setContent: (state, action:PayloadAction<contentI>) => {
      state.title = action.payload.title
      state.content = action.payload.content
      state.header = action.payload.header
      state.id = action.payload.id
      state.btnType = action.payload.btnType
    },
    setTitle: (state, action) => {
      state.title = action.payload
    },
    setDescription: (state, action) => {
      state.content = action.payload
    },
    setHeader: (state, action) => {
      state.header = action.payload
    },
    setDeleteFunc: (state, action) => {
      state.section = action.payload
    }
  },
});

export const {setContent,setDeleteFunc,setHeader,setDescription,setTitle} = contentSlice.actions;

export default contentSlice.reducer;