import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tabs: [],
};

const tabSlice = createSlice({
  name: "tab",
  initialState,
  reducers: {
    setTabs: (state, action) => {
      state.tabs = [...state.tabs, action.payload];
    },
    getAllTabs: (state, action) => {
      state.tabs = action.payload;
    },
  },
});

export const { setTabs, getAllTabs } = tabSlice.actions;
export default tabSlice.reducer;
