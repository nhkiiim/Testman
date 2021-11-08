import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: 0,
};

const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    setPageState: (state, action) => {
      state.category = action.payload.category;
    },
  },
});

export const { setPageState } = pageSlice.actions;
export default pageSlice.reducer;
