import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  request: {
    payload: {
      httpMethod: "GET",
    },
    params: [],
    authorization: {},
    headers: [
      {
        seq: 0,
        headerKey: "",
        headerValue: "",
        headerDescription: "",
        saved: false,
      },
    ],
    body: {},
    settings: {},
    uri: "",
  },
  list: [],
};

const requestSlice = createSlice({
  name: "api",
  initialState,
  reducers: {
    setPayloadState: (state, action) => {
      const payload = action.payload;

      state.request.payload.httpMethod = payload.httpMethod;
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
    setAuthorizationState: (state, action) => {
      const authorization = action.payload;

      state.request.authorization = authorization;
    },
    setHeadersState: (state, action) => {
      const headers = action.payload;

      state.request.headers = headers;
    },
    setBodyState: (state, action) => {
      const body = action.payload;

      state.request.body = body;
    },
    setSettingsState: (state, action) => {
      const settings = action.payload;

      state.request.settings = settings;
    },
    setUriState: (state, action) => {
      const uri = action.payload;
      state.request.uri = action.payload;
    },
  },
});

export const {
  setPayloadState,
  setParamsState,
  setAuthorizationState,
  setHeadersState,
  setBodyState,
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
} = requestSlice.actions;
export default requestSlice.reducer;
