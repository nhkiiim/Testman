import React, { useState } from "react";
import Image from "next/image";
import img from "../img/icon2.png";
import load from "../img/loading.gif";
import Typical from "react-typical";
import SyncLoader from "react-spinners/SyncLoader";

const UnSended = ({ onLoading }) => {
  return (
    <div className="h-[100%]  bg-custom-100">
      {onLoading ? (
        <>
          <div className="w-full flex mx-auto justify-center items-center mt-14">
            <h1 className="font-bold text-2xl">
              <Typical
                steps={[
                  "분석 정보를 받아오는 중입니다.. 🤖",
                  2000,
                  "조금만 기다려주시겠어요 ? 👀",
                  2000,
                  "거의 다 되어갑니다.. ! 🔥",
                  2000,
                  "삐..삐빅.. ",
                  2000,
                ]}
                wrapper="p"
                loop={Infinity}
              />
            </h1>
          </div>
          <div className="relative h-[360px] mx-auto justify-center mt-12">
            <Image src={load} layout="fill" objectFit="contain" />
          </div>
        </>
      ) : (
        <>
          <div className="w-full flex mx-auto justify-center items-center pt-16">
            <h1 className="font-bold text-2xl">URL을 입력해보세요.</h1>
          </div>
          <div className="relative h-72 mx-auto justify-center mt-16">
            <Image src={img} layout="fill" objectFit="contain" />
          </div>
        </>
      )}

      <div className="w-full flex mx-auto justify-center items-center mt-7">
        <p className="text-gray-600">
          TESTSMAN은 Google PageSpeed Insight API를 활용하고 있습니다.
        </p>
      </div>
    </div>
  );
};

export default UnSended;
