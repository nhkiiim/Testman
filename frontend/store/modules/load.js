import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loadResult: [],
};

const loadSlice = createSlice({
  name: "load",
  initialState,
  reducers: {
    addLoadResults: (state, action) => {
      state.loadResult.push(action.payload);
    },
  },
});

export const { addLoadResults } = loadSlice.actions;
export default loadSlice.reducer;
