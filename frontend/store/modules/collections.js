import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
};

const collectionsSlice = createSlice({
  name: "collections",
  initialState,
  reducers: {
    setCollections: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { setCollections } = collectionsSlice.actions;
export default collectionsSlice.reducer;
