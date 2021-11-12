import { createSlice } from "@reduxjs/toolkit";

const initialState = {  
  tabIndex: 0,
  tabs:[]

};

const tabSlice = createSlice({
  name: "tab",
  initialState,
  reducers: {
    setTabIndexState: (state, action) => {
      console.log('setTabIndexState', action.payload)
      state.tabIndex = action.payload;
    },
    setTabs: (state, action) => {
      state.tabs = action.payload
    }
  },
});

export const { setTabIndexState, setTabs } = tabSlice.actions;
export default tabSlice.reducer;