import { combineReducers } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import user from "./user";
// import { persistReducer } from "redux-persist";
// import storageSession from "redux-persist/lib/storage/session";
//  새로고침 시 store 초기화 방지 작업 진행중
// const persistConfig = {
//   key: "root",
//   storage,
//   whiteList: ["user"],
// };

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

export default rootReducer;
