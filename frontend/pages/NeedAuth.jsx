import React from "react";
import Image from "next/image";
import img from "../img/404.png";
import router from "next/router";
const NeedAuth = () => {
  return (
    <div className="mx-auto  px-16 mt-60">
      <section className="mt-12">
        <div className="h-[100vh] mt-24">
          <div className="mx-auto align-middle ml-4  md:ml-[300px] xl:ml-[620px]">
            <h1 className="font-bold text-2xl md:text-3xl">앗 ! 회원만 사용 가능한 서비스에요.</h1>
            <p className="text-gray-600 text-lg mt-3 md:ml-[140px] lg:ml-[50px] ">
              가입 후 TESTSMAN을 마음껏 이용해보세요 !
            </p>{" "}
          </div>
          <div className="relative h-80 mx-auto justify-center mt-12">
            <Image src={img} layout="fill" objectFit="contain" />
          </div>
          <div className="ml-[790px] mt-8">
            <p
              className="cursor-pointer text-lg w-16 text-gray-600 hover:text-indigo-500 hover:scale-110 font-bold transform transition duration-300 ease-out  rounded-sm"
              onClick={() => {
                router.push("/SignUp");
              }}
            >
              가입하기
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NeedAuth;
