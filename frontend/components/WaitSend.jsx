import React, { useState } from "react";
import Image from "next/image";
import img from "../img/icon2.png";
import load from "../img/loading.gif";
import loadimg from "../img/loadimg.gif";
import Typical from "react-typical";
import SyncLoader from "react-spinners/SyncLoader";

const WaitSend = () => {
  return (
    <div className="h-[550px] flex bg-white">
      <div className="w-[1183px] border justify-center mx-auto mt-12">
        <div className="flex mx-auto justify-center items-center mt-14 ">
          <h1 className="font-bold text-2xl">
            <Typical
              steps={["API 테스트 및 부하 테스트를 진행해주세요 ! ", 2000]}
              wrapper="p"
              loop={Infinity}
            />
          </h1>
        </div>
        <div className="relative h-[360px] mx-auto justify-center mt-12">
          <Image src={loadimg} layout="fill" objectFit="contain" />
        </div>
      </div>
    </div>
  );
};

export default WaitSend;
