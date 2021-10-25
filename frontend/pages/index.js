import Head from "next/head";
import Header from "../components/Header";
import Login from "./Login";

export default function Home() {
  return (
    <div className="">
      <Head>
        <title>TESTMAN</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Login />
    </div>
  );
}
