import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  seq: 0,
};

const seqSlice = createSlice({
  name: "seq",
  initialState,
  reducers: {
    setSeqState: (state, action) => {
      state.seq = action.payload;
    },
  },
});

export const { setSeqState } = seqSlice.actions;
export default seqSlice.reducer;
