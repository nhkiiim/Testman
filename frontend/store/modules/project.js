import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    seq: 0,
    userId: "",
    title: "",
    url: "",
    description: "",
    img: null,
    createDate: "",
  },
];
const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setProject: (state, action) => {
      return [action.payload];
    },
  },
});
export const { setProject } = projectSlice.actions;
export default projectSlice.reducer;
