import React from "react";
import Typical from "react-typical";
import Image from "next/image";
import load from "../img/loadimg.gif";
const TestLoading = () => {
  return (
    <div>
      <div className="w-full flex mx-auto justify-center items-center mt-14">
        <h1 className="font-bold text-2xl">
          <Typical
            steps={[
              "Analysis results are being loaded..",
              2000,
              "How about waiting a little bit ? ",
              2000,
              "Almost Done.. !",
              2000,
              "Bee..Beeep.. ",
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
    </div>
  );
};

export default TestLoading;
