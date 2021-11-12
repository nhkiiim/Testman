import { createSlice } from "@reduxjs/toolkit";

const initialState = {  
  request:{
    payload:{},
    params:{},
    authorization:{},
    headers:{},
    body:{},
    settings:{},
  }

};

const requestSlice = createSlice({
  name: "api",
  initialState,
  reducers: {
    setPayloadState: (state, action) => {
      const payload = action.payload;

      state.request.payload = payload;
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
    }
  },
});

export const { setPayloadState, setParamsState, setAuthorizationState, setHeadersState, setBodyState, setSettingsState } = requestSlice.actions;
export default requestSlice.reducer;
