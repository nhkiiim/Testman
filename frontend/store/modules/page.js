import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: 0,
};

const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    setPageState: (state, action) => {
      const category = action.payload;
      state.category = category;
    },
  },
});

export const { setPageState } = pageSlice.actions;
export default pageSlice.reducer;
