import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stat: "api",
};

const teststatSlice = createSlice({
  name: "teststat",
  initialState,
  reducers: {
    setStat: (state, action) => {
      state.stat = action.payload;
    },
  },
});

export const { setStat } = teststatSlice.actions;
export default teststatSlice.reducer;
