import Head from "next/head";
import Header from "../components/Header";
import Login from "./Login";
import Image from "next/image";
import m1 from "../img/m1.png";
import m2 from "../img/m2.png";
import m3 from "../img/m3.png";
import { ChevronDoubleDownIcon } from "@heroicons/react/solid";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { useRouter } from "next/dist/client/router";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  return (
    <div className="">
      <Head>
        <title>TESTMAN</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section>
        <div>
          <div data-aos="" className="relative h-full mt-[-50px]">
            <Image src={m1} objectFit="cover" layout="responsive" />
            <div className="flex">
              <div className="animate-bounce flex z-50 mx-auto mt-[-7%] align-middle justify-center">
                <ChevronDoubleDownIcon className="h-9" />
              </div>
            </div>
          </div>
          <div className="relative w-full mt-[30px]">
            <Image src={m2} objectFit="fill" layout="responsive" />
          </div>
          <div className="relative h-full mt-[25px] ">
            <Image src={m3} objectFit="fill" layout="responsive" />
            <div className="flex mb-[30px] z-50">
              <div className="mx-auto mb-[35px]">
                <button
                  class="btn btn-wide btn-netural glass bg-white text-black text-lg font-bold cursor-pointer hover:bg-black hover:text-white"
                  onClick={() => {
                    router.push("/Login");
                  }}
                >
                  시작하기
                </button>
              </div>
            </div>
            <br />
            <br />
            <br />
          </div>
        </div>
      </section>
    </div>
  );
}
