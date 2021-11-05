import { combineReducers } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { persistReducer } from "redux-persist";
import user from "./user";
import storageSession from "redux-persist/lib/storage/session";
//  새로고침 시 store 초기화 방지 작업 진행중

const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };
    default: {
      const combineReducer = combineReducers({
        user,
      });
      return combineReducer(state, action);
    }
  }
};

const persistConfig = {
  key: "root",
  storage: storageSession,
  whitelist: ["user"],
};

export default persistReducer(persistConfig, rootReducer);
