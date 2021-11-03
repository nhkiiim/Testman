import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { signUp, logIn, logOut, loadUser } from "../actions/user";

const initialState = {
  user: {
    id: "",
    password: "",
    email: "",
  },
  isLoggedIn: false,
  logInError: "",
  signUpError: "",
  signUpDone: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signUp.pending, (state, action) => {
      console.log("pending");
    });
  },
});
