import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  response: [],
};

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    fetchHistoryState: (state, action) => {
      state.response = action.payload;
    },
  },
});

export const { fetchHistoryState } = historySlice.actions;
export default historySlice.reducer;
