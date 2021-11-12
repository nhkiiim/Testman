import "tailwindcss/tailwind.css";
import ProgressBar from "@badrap/bar-of-progress";
import Router from "next/router";
import { wrapper } from "../store/configureStore";
import axios from "axios";
import { Provider, useSelector } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { createStore } from "redux";
import rootReducer from "../store/modules";
import { useEffect, useState } from "react";
import { getCookie } from "../util/cookie";
import NeedAuth from "./NeedAuth";

axios.defaults.baseURL = "http://www.testsman.com:8080";
axios.defaults.withCredentials = true;
const progress = new ProgressBar({
  size: 4,
  color: "#5e00a3",
  className: "z-50",
  delay: 150,
});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);
const store = createStore(rootReducer);
const persistor = persistStore(store);

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}

export default wrapper.withRedux(MyApp);
