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
    pushTabs: (state, action) => {
      [...state.tabs, state.tabs.push(action.payload)];
    },
  },
});

export const { setTabs, getAllTabs, pushTabs } = tabSlice.actions;
export default tabSlice.reducer;
