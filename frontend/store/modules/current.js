import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  seq: 0,
  userId: "",
  title: "",
  url: "",
  description: "",
  img: null,
  createDate: "",
};

const currentSlice = createSlice({
  name: "current",
  initialState,
  reducers: {
    setCurrentProject: (state, action) => {
      const { seq, userId, title, url, description, img, createDate } = action.payload;
      (state.seq = seq),
        (state.userId = userId),
        (state.title = title),
        (state.url = url),
        (state.description = description),
        (state.img = img),
        (state.createDate = createDate);
    },
  },
});

export const { setCurrentProject } = currentSlice.actions;
export default currentSlice.reducer;
