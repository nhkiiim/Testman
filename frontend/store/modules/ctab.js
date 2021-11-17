import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  datas: {
    address: null,
    collectionSeq: null,
    headers: [],
    httpMethod: null,
    params: [],
    path: null,
    body: [],
    seq: 0,
    workspaceSeq: 0,
    loop: 0,
    thread: 0,
  },
};

const ctabSlice = createSlice({
  name: "ctab",
  initialState,
  reducers: {
    resetParamDatas: (state, action) => {
      state.datas.params = [action.payload];
    },
    setLoopState: (state, action) => {
      state.datas.loop = action.payload;
    },
    setThreadState: (state, action) => {
      state.datas.thread = action.payload;
    },
    setCtabs: (state, action) => {
      state.datas = action.payload;
    },
    setCurl: (state, action) => {
      state.datas.path = action.payload;
    },
    setHttpMethods: (state, action) => {
      state.datas.httpMethod = action.payload;
    },
    setAddress: (state, action) => {
      state.datas.address = action.payload;
    },
    setParamDatas: (state, action) => {
      [...state.datas.params, state.datas.params.push(action.payload)];
    },
    saveParamDatas: (state, action) => {
      [...state.datas.params, state.datas.params.unshift(action.payload)];
    },
    deleteParamDatas: (state, action) => {
      state.datas.params = action.payload;
    },
    resetHeaderDatas: (state, action) => {
      state.datas.params = [action.payload];
    },
    fetchParamDatas: (state, action) => {
      state.datas.params.push(action.payload);
    },
    setHeaderDatas: (state, action) => {
      [...state.datas.headers, state.datas.headers.push(action.payload)];
    },
    saveHeaderDatas: (state, action) => {
      [...state.datas.headers, state.datas.headers.unshift(action.payload)];
    },
    deleteHeaderDatas: (state, action) => {
      state.datas.headers = action.payload;
    },
    resetHeaderDatas: (state, action) => {
      state.datas.headers = [action.payload];
    },
    setBodyDatas: (state, action) => {
      [...state.datas.body, state.datas.body.push(action.payload)];
    },
    saveBodyDatas: (state, action) => {
      [...state.datas.body, state.datas.body.unshift(action.payload)];
    },
    deleteBodyDatas: (state, action) => {
      state.datas.body = action.payload;
    },
    resetBodyDatas: (state, action) => {
      state.datas.body = [action.payload];
    },
  },
});

export const {
  setCtabs,
  setCurl,
  setHttpMethods,
  setParamDatas,
  saveParamDatas,
  setHeaderDatas,
  saveHeaderDatas,
  deleteHeaderDatas,
  resetParamDatas,
  setAddress,
  setHeaders,
  setParams,
  resetHeaderDatas,
  setBodyDatas,
  saveBodyDatas,
  deleteBodyDatas,
  resetBodyDatas,
  setLoopState,
  setThreadState,
  deleteParamDatas,
} = ctabSlice.actions;
export default ctabSlice.reducer;
