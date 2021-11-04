import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    id: "",
    password: "",
    email: "",
  },
  token: {
    accessToken: null,
    refreshToken: null,
    accessTokenExpiresIn: 0,
  },
  isLoggedIn: false,
  logInError: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserState: (state, action) => {
      const {
        user: { id, password, email },
        token: { accessToken, refreshToken, accessTokenExpiresIn },
        isLoggedIn,
        logInError,
      } = action.payload;
      state.user.id = id;
      state.user.password = password;
      state.user.email = email;
      (state.token.accessToken = accessToken),
        (state.token.refreshToken = refreshToken),
        (state.token.accessTokenExpiresIn = accessTokenExpiresIn),
        (state.isLoggedIn = isLoggedIn);
      state.logInError = logInError;
    },
  },
});

export const { setUserState } = userSlice.actions;
export default userSlice.reducer;
