import React from "react";
import Image from "next/image";
import img from "../img/404.png";
const NoneData = () => {
  return (
    <div className="h-[100%] mt-32 bg-transparent">
      <div className="relative h-80 mx-auto justify-center">
        <Image src={img} layout="fill" objectFit="contain" />
      </div>
      <div className="w-full flex mx-auto justify-center items-center">
        <h1 className="font-bold text-2xl">앗 ! 생성된 프로젝트가 없어요.</h1>
      </div>
      <p className="text-gray-600 mt-1 w-full flex mx-auto justify-center items-center">
        우측 상단의 ADD 버튼을 통해 프로젝트를 등록해보세요 !
      </p>
    </div>
  );
};

export default NoneData;
