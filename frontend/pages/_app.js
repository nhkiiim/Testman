import "tailwindcss/tailwind.css";
import ProgressBar from "@badrap/bar-of-progress";
import Router from "next/router";
import { wrapper } from "../store/configureStore";
import axios from "axios";

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

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default wrapper.withRedux(MyApp);
