import { createSlice } from "@reduxjs/toolkit";

const initialState = {  
  request:{
    payload:{
      httpMethod:"GET"
    },
    params:{},
    authorization:{},
    headers:{},
    body:{},
    settings:{},
    uri:""
  }

};

const requestSlice = createSlice({
  name: "api",
  initialState,
  reducers: {
    setPayloadState: (state, action) => {
      const payload = action.payload;

      state.request.payload.httpMethod = payload.httpMethod;
    },
    setParamsState: (state, action) => {
      const params = action.payload;

      state.request.params = params;
    },
    setAuthorizationState: (state, action) => {
      const authorization = action.payload;

      state.request.authorization = authorization;
    },
    setHeadersState: (state, action) => {
      const headers = action.payload;

      state.request.headers = headers
    },
    setBodyState: (state, action) => {
      const body = action.payload;

      state.request.body = body
    },
    setSettingsState: (state, action) => {
      const settings = action.payload;

      state.request.settings = settings
    },
    setUriState: (state, action) => {
      const uri = action.payload;
      state.request.uri = action.payload
    }
  },
});

export const { setPayloadState, setParamsState, setAuthorizationState, setHeadersState, setBodyState, setSettingsState, setUriState } = requestSlice.actions;
export default requestSlice.reducer;
