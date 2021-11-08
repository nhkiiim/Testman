import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/dist/client/router";
import axios from "axios";
import { PlusCircleIcon } from "@heroicons/react/solid";
import { XCircleIcon } from "@heroicons/react/solid";
import bg from "../img/bg.png";

// import { useSelector } from "react-redux";
const MediumCard = ({ seq, title, url, description, img, createDate }) => {
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState(createDate);
  const router = useRouter();
  const [titleCategory, setTitleCategory] = useState(4);
  // console.log(seq);

  useEffect(() => {
    dateForm();
  }, [date]);
  const dateForm = () => {
    setDate(createDate.slice(0, 11));
  };

  const pageRouting = () => {
    router.push({
      pathname: "/TestPage",
      query: {
        no: seq,
      },
    });
  };

  return (
    <>
      <div
        className="mb-8 cursor-pointer hover:scale-105 transform transition duration-300 ease-out shadow-md rounded-sm sm:mx-2 md:mx-3 bg-white"
        onClick={pageRouting}
      >
        {/* <img className="w-full bg-gray-200" src="${bg}" /> */}
        <div className="relative h-[248px] sm:h-[310px] md:h-[250px] lg:h-[310px] xl:h-[312px] bg-gray-200 ">
          <Image src={bg} layout="fill" objectFit="contain" />
        </div>
        <div className="py-2 px-4 w-full flex justify-between bg-indigo-700">
          <p className="text-sm text-white font-semibold tracking-wide">{title}</p>
          <p className="text-sm text-white font-semibold tracking-wide">{date}</p>
        </div>
        <div className="bg-white px-3  lg:px-6 py-4 rounded-bl-3xl rounded-br-3xl">
          <h1 className="text-lg text-gray-900 font-semibold tracking-wider">{url}</h1>
          <p className="text-gray-700 text-sm  lg:text-base  lg:leading-8 pr-4 tracking-wide mt-2">
            {description}
          </p>
        </div>
      </div>
    </>
  );
};

export default MediumCard;
