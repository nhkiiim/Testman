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
import { CookiesProvider } from "react-cookie";
import { positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const options = {
  timeout: 5000,
  position: positions.BOTTOM_LEFT,
};

axios.defaults.baseURL = "http://15.165.250.204:8080";
axios.defaults.withCredentials = true;
const progress = new ProgressBar({
  size: 4,
  color: "#5e00a3",
  className: "z-50",
  delay: 250,
});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);
const store = createStore(rootReducer);
const persistor = persistStore(store);

function MyApp({ Component, pageProps }) {
  return (
    <CookiesProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AlertProvider template={AlertTemplate} {...options}>
            <Component {...pageProps} />
          </AlertProvider>
        </PersistGate>
      </Provider>
    </CookiesProvider>
  );
}

export default wrapper.withRedux(MyApp);
