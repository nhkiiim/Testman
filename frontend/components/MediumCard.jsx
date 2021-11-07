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

  useEffect(() => {
    dateForm();
  }, [date]);
  const dateForm = () => {
    setDate(createDate.slice(0, 11));
  };

  return (
    <>
      <div className="mb-8 cursor-pointer hover:scale-105 transform transition duration-300 ease-out shadow-md rounded-sm sm:mx-2 md:mx-3 bg-white">
        {title === "" ? (
          <div
            className="w-[372px] pt-3 px-2 h-80 mx-auto "
            onClick={() => {
              setShowModal(true);
            }}
          >
            <div className="mx-1/2 my-1/2">
              <PlusCircleIcon className="w-12 text-purple-400" />
            </div>
          </div>
        ) : (
          <>
            {/* <div className="w-[372px] pt-3 px-2 h-80 mx-auto ">
            <h3 className="text-1xl">No.{no}</h3>
            <h3 className="mt-3 text-1xl">Name : {name}</h3>
            <h3 className="mt-3 text-1xl">URL : {url}</h3>
            <h3 className="mt-3 text-1xl">설명 : {description}</h3>
          </div> */}
            {/* <img className="w-full bg-gray-200" src="${bg}" /> */}
            <div className="relative h-[312px] bg-gray-200 ">
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
          </>
        )}
      </div>

      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Add Project</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-3 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <XCircleIcon className="w-8 text-purple-500 opacity-20 hover:opacity-100" />
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <form className="flex flex-col w-[350px]" method="POST" action="#">
                    <div className="mb-6 pt-3 rounded bg-gray-200">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-0 ml-3"
                        htmlFor="Name"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="Name"
                        className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
                      />
                    </div>
                    <div className="mb-6 pt-3 rounded bg-gray-200">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-0 ml-3"
                        htmlFor="URL"
                      >
                        URL
                      </label>
                      <input
                        type="text"
                        id="URL"
                        className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
                      />
                    </div>
                    <div className="mb-6 pt-3 rounded bg-gray-200">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-0 ml-3"
                        htmlFor="Description"
                      >
                        Description
                      </label>
                      <textarea
                        type="text"
                        id="Description"
                        className=" resize-none overflow-auto bg-gray-200 rounded w-full h-40 text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
                      />
                    </div>
                  </form>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-between p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-purple-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    SAVE
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default MediumCard;
