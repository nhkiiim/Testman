import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import logger from "redux-logger";

import rootReducer from "../slices";

const isDev = process.env.NODE_ENV === "development";

const createStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: isDev,
  });
  return store;
};

const wrapper = createWrapper(createStore, {
  debug: isDev,
});

export default wrapper;
