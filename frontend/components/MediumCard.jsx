import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/dist/client/router";
import axios from "axios";
import { PlusCircleIcon } from "@heroicons/react/solid";
import { XCircleIcon } from "@heroicons/react/solid";
import bg from "../img/bg.png";
import { useDispatch } from "react-redux";
import * as currentActions from "../store/modules/current";
import Aos from "aos";
import "aos/dist/aos.css";

// import { useSelector } from "react-redux";
const MediumCard = ({ seq, title, url, description, img, createDate }) => {
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState(createDate);
  const router = useRouter();
  const [titleCategory, setTitleCategory] = useState(4);
  const dispatch = useDispatch();
  const data = {
    seq: seq,
    title: title,
    url: url,
    description: description,
    img: img,
    createDate: createDate,
  };
  // console.log(data);
  // console.log(seq);

  useEffect(() => {
    dateForm();
    Aos.init({ duration: 1000 });
  }, [date]);
  const dateForm = () => {
    setDate(createDate.slice(0, 11));
  };

  const pageRouting = () => {
    dispatch(currentActions.setCurrentProject(data));
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
        // data-aos="fade-zoom-in"
        className="mb-8 cursor-pointer hover:scale-105 transform transition duration-500 ease-out shadow-md rounded-sm sm:mx-2 md:mx-3 bg-white"
        onClick={pageRouting}
      >
        {/* <img className="w-full bg-gray-200" src="${bg}" /> */}
        <div className="relative h-[330px] sm:h-[340px] md:h-[240px] lg:h-[260px] xl:h-[280px] bg-custom-100 ">
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
