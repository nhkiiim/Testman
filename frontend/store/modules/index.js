import { combineReducers } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import user from "./user";
import api from "./api";

const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };
    default: {
      const combineReducer = combineReducers({
        user,
        api,
      });
      return combineReducer(state, action);
    }
  }
};

export default rootReducer;
