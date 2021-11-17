import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  result: {},
};

const apiresultSlice = createSlice({
  name: "apiresult",
  initialState,
  reducers: {
    setResultState: (state, action) => {
      state.result = action.payload;
    },
  },
});

export const { setResultState } = apiresultSlice.actions;
export default apiresultSlice.reducer;
