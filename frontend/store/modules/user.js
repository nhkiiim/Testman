import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    userId: "",
    email: "",
  },
  token: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserState: (state, action) => {
      state.user.userId = action.payload.userId;
      state.user.email = action.payload.email;
    },
    setUserToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { setUserState, setUserToken } = userSlice.actions;
export default userSlice.reducer;
