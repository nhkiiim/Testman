import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  request: {
    address: null,
    httpMethod: "GET",
    params: [],
    authorization: {},
    headers: [],
    body: [],
    settings: {},
    path: null,
    loop: 0,
    thread: 0,
    contentType: "",
  },
  list: [],
  subPath: "",
  mergePath: "",
};

const requestSlice = createSlice({
  name: "api",
  initialState,
  reducers: {
    resetAllDatas: (state, action) => {
      state = action.payload;
    },
    setContentType: (state, action) => {
      state.request.contentType = action.payload;
    },
    setHttpMethods: (state, action) => {
      state.request.httpMethod = action.payload;
    },
    setAddress: (state, action) => {
      state.request.address = action.payload;
    },
    setLoopState: (state, action) => {
      state.request.loop = action.payload;
    },
    setThreadState: (state, action) => {
      state.request.thread = action.payload;
    },
    deleteAllParams: (state, action) => {
      state.request.params = action.payload;
    },
    resetParamDatas: (state, action) => {
      state.request.params = [action.payload];
    },
    setParamsState: (state, action) => {
      state.request.params = [...state.request.params, action.payload];
    },
    setParamDatas: (state, action) => {
      [...state.request.params, state.request.params.push(action.payload)];
    },
    saveParamDatas: (state, action) => {
      [...state.request.params, state.request.params.unshift(action.payload)];
    },
    deleteParamDatas: (state, action) => {
      state.request.params = action.payload;
    },
    fetchParamDatas: (state, action) => {
      state.request.params.push(action.payload);
    },
    setHeaderDatas: (state, action) => {
      [...state.request.headers, state.request.headers.push(action.payload)];
    },
    saveHeaderDatas: (state, action) => {
      [...state.request.headers, state.request.headers.unshift(action.payload)];
    },
    deleteHeaderDatas: (state, action) => {
      state.request.headers = action.payload;
    },
    resetHeaderDatas: (state, action) => {
      state.request.headers = [action.payload];
    },
    setBodyDatas: (state, action) => {
      [...state.request.body, state.request.body.push(action.payload)];
    },
    saveBodyDatas: (state, action) => {
      [...state.request.body, state.request.body.unshift(action.payload)];
    },
    deleteBodyDatas: (state, action) => {
      state.request.body = action.payload;
    },
    resetBodyDatas: (state, action) => {
      state.request.body = [action.payload];
    },
    setAuthorizationState: (state, action) => {
      const authorization = action.payload;

      state.request.authorization = authorization;
    },
    setHeadersState: (state, action) => {
      const headers = action.payload;

      state.request.headers = headers;
    },
    setSettingsState: (state, action) => {
      const settings = action.payload;

      state.request.settings = settings;
    },
    setPathState: (state, action) => {
      state.request.path = action.payload;
    },
    setSubPathState: (state, action) => {
      state.subPath = action.payload;
    },
    setMergePathState: (state, action) => {
      state.mergePath = action.payload;
    }
  },
});

export const {
  resetAllDatas,
  setPathState,
  setPayloadState,
  setParamsState,
  setAuthorizationState,
  setSettingsState,
  setUriState,
  setParamDatas,
  fetchParamDatas,
  deleteParamDatas,
  saveParamDatas,
  setHeaderDatas,
  saveHeaderDatas,
  deleteHeaderDatas,
  resetParamDatas,
  deleteAllParams,
  setLoopState,
  setThreadState,
  resetHeaderDatas,
  setBodyDatas,
  saveBodyDatas,
  deleteBodyDatas,
  resetBodyDatas,
  setHttpMethods,
  setAddress,
  setContentType,
  setSubPathState,
  setMergePathState,
} = requestSlice.actions;
export default requestSlice.reducer;
