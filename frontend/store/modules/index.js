import { combineReducers } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { persistReducer } from "redux-persist";
import user from "./user";
import storageSession from "redux-persist/lib/storage/session";
//  새로고침 시 store 초기화 방지 작업 진행중
import api from "./api";
import project from "./project";
import page from "./page";
import seq from "./seq";
import current from "./current";
import process from "./process";
import "semantic-ui-css/semantic.min.css";

const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };
    default: {
      const combineReducer = combineReducers({
        user,
        api,
        project,
        page,
        seq,
        current,
        process,
      });
      return combineReducer(state, action);
    }
  }
};

const persistConfig = {
  key: "root",
  storage: storageSession,
  whitelist: ["user", "seq", "project", "current", "page", "process"],
};

export default persistReducer(persistConfig, rootReducer);
