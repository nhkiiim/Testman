import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  address: null,
  collectionSeq: null,
  headers: null,
  httpMethod: null,
  params: null,
  path: null,
  seq: 0,
  workspaceSeq: 0,
};

const ctabSlice = createSlice({
  name: "ctab",
  initialState,
  reducers: {
    setCtabs: (state, action) => {
      const { address, collectionSeq, headers, httpMethod, params, path, seq, workspaceSeq } =
        action.payload;
      (state.address = address),
        (state.collectionSeq = collectionSeq),
        (state.headers = headers),
        (state.httpMethod = httpMethod),
        (state.params = params),
        (state.path = path),
        (state.seq = seq),
        (state.workspaceSeq = workspaceSeq);
    },
    setCurl: (state, action) => {
      state.path = action.payload;
    },
    setHttpMethods: (state, action) => {
      state.httpMethod = action.payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    setHeaders: (state, action) => {
      state.headers = action.payload;
    },
    setParams: (state, action) => {
      state.params = action.payload;
    },
  },
});

export const { setCtabs, setCurl, setHttpMethods, setAddress, setHeaders, setParams } =
  ctabSlice.actions;
export default ctabSlice.reducer;
