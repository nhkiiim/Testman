import React, { useCallback, useEffect, useState } from "react";
import { UserCircleIcon } from "@heroicons/react/solid";
import Image from "next/image";
import icon from "../img/icon.png";
import { useRouter } from "next/dist/client/router";
import ProjectLists from "./ProjectLists";
import { useDispatch, useSelector } from "react-redux";
import ProjectListsDt from "./ProjectListsDt";
import * as pageAction from "../store/modules/page";
import { LogoutIcon } from "@heroicons/react/solid";
import { useCookies } from "react-cookie";

const Header2 = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [show, setShow] = useState(false);
  const [project, setproject] = useState(false);
  const [profile, setProfile] = useState(false);
  const [dtProject, setDtProject] = useState(false);
  const [noPjt, setNoPjt] = useState(false);

  const uid = useSelector((state) => state.user.user.userId);
  const cPage = useSelector((state) => state.page.category);

  // console.log(uid);
  const pjtList = useSelector((state) => state.project[0]);
  const pjt = useSelector((state) => state.project);

  useEffect(() => {
    pjtList[0]?.seq === undefined ? setNoPjt(true) : setNoPjt(false);
  }, [pjtList[0]]);

  const handlerSelect = (value) => {
    if (value === 1) {
      dispatch(pageAction.setPageState(value));
      setDtProject(!dtProject);
    } else if (value == 2) {
      dispatch(pageAction.setPageState(value));
      setDtProject(false);
      router.push("/Performance");
    } else if (value == 0) {
      dispatch(pageAction.setPageState(value));
      setDtProject(false);
      router.push("/MyPage");
    }
  };
  return (
    <>
      <div
        className={
          show
            ? "w-full h-full  z-40  transform  translate-x-0 fixed"
            : "   w-full h-full fixed z-40  transform -translate-x-full"
        }
      >
        <div
          className="bg-gray-800 opacity-50 inset-0 fixed w-full h-full"
          onClick={() => setShow(!show)}
        />
        <div className="w-64  absolute left-0 z-40 top-0 bg-white shadow flex-col justify-between transition duration-150 ease-in-out h-full">
          <div className="flex flex-col justify-between h-full">
            <div className="px-6 pt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="relative flex items-center h-12 w-12 cursor-pointer my-auto">
                    <Image src={icon} layout="fill" objectFit="contain" objectPosition="left" />
                  </div>
                  <p className="text-bold md:text2xl text-base pl-3 text-gray-800">TESTSMAN</p>
                </div>
                <div id="cross" className=" text-gray-800" onClick={() => setShow(!show)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-x"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    strokeWidth={1}
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <line x1={18} y1={6} x2={6} y2={18} />
                    <line x1={6} y1={6} x2={18} y2={18} />
                  </svg>
                </div>
              </div>
              <ul className="f-m-m border-t-2 border-indigo-500 mt-2">
                <a>
                  <li className="text-white pt-8">
                    <div className="flex items-center">
                      <div className="md:w-6 md:h-6 w-5 h-5">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none">
                          <path
                            d="M7.16667 3H3.83333C3.3731 3 3 3.3731 3 3.83333V7.16667C3 7.6269 3.3731 8 3.83333 8H7.16667C7.6269 8 8 7.6269 8 7.16667V3.83333C8 3.3731 7.6269 3 7.16667 3Z"
                            stroke="#000000"
                            strokeWidth={1}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M7.16667 11.6667H3.83333C3.3731 11.6667 3 12.0398 3 12.5V15.8333C3 16.2936 3.3731 16.6667 3.83333 16.6667H7.16667C7.6269 16.6667 8 16.2936 8 15.8333V12.5C8 12.0398 7.6269 11.6667 7.16667 11.6667Z"
                            stroke="#000000"
                            strokeWidth={1}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M16.1667 11.6667H12.8333C12.3731 11.6667 12 12.0398 12 12.5V15.8334C12 16.2936 12.3731 16.6667 12.8333 16.6667H16.1667C16.6269 16.6667 17 16.2936 17 15.8334V12.5C17 12.0398 16.6269 11.6667 16.1667 11.6667Z"
                            stroke="#000000"
                            strokeWidth={1}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M16.1667 3H12.8333C12.3731 3 12 3.3731 12 3.83333V7.16667C12 7.6269 12.3731 8 12.8333 8H16.1667C16.6269 8 17 7.6269 17 7.16667V3.83333C17 3.3731 16.6269 3 16.1667 3Z"
                            stroke="#000000"
                            strokeWidth={1}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <p className="text-gray-700 ml-3 text-lg hover:text-indigo-700 cursor-pointer">
                        Dashboard
                      </p>
                    </div>
                  </li>
                </a>
                <a>
                  <li className={project ? "text-gray-800 pt-8" : "text-gray-800 pt-8"}>
                    <div className="flex items-center">
                      <div className="md:w-6 md:h-6 w-5 h-5">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none">
                          <path
                            d="M6.66667 13.3333L8.33334 8.33334L13.3333 6.66667L11.6667 11.6667L6.66667 13.3333Z"
                            stroke="currentColor"
                            strokeWidth={1}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z"
                            stroke="currentColor"
                            strokeWidth={1}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <p className="text-gray-800 ml-3 text-lg hover:text-indigo-700 cursor-pointer">
                        Performance
                      </p>
                    </div>
                  </li>
                </a>
                <a>
                  <li className="text-gray-700 pt-8">
                    <div className="flex items-center " onClick={() => setproject(!project)}>
                      <div className="flex items-center">
                        <div className="md:w-6 md:h-6 w-5 h-5">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" fill="none">
                            <path
                              d="M2.33333 4.83333H4.83333C5.05435 4.83333 5.26631 4.74554 5.42259 4.58926C5.57887 4.43298 5.66667 4.22101 5.66667 4V3.16667C5.66667 2.72464 5.84226 2.30072 6.15482 1.98816C6.46738 1.67559 6.89131 1.5 7.33333 1.5C7.77536 1.5 8.19928 1.67559 8.51184 1.98816C8.8244 2.30072 9 2.72464 9 3.16667V4C9 4.22101 9.0878 4.43298 9.24408 4.58926C9.40036 4.74554 9.61232 4.83333 9.83333 4.83333H12.3333C12.5543 4.83333 12.7663 4.92113 12.9226 5.07741C13.0789 5.23369 13.1667 5.44565 13.1667 5.66667V8.16667C13.1667 8.38768 13.2545 8.59964 13.4107 8.75592C13.567 8.9122 13.779 9 14 9H14.8333C15.2754 9 15.6993 9.17559 16.0118 9.48816C16.3244 9.80072 16.5 10.2246 16.5 10.6667C16.5 11.1087 16.3244 11.5326 16.0118 11.8452C15.6993 12.1577 15.2754 12.3333 14.8333 12.3333H14C13.779 12.3333 13.567 12.4211 13.4107 12.5774C13.2545 12.7337 13.1667 12.9457 13.1667 13.1667V15.6667C13.1667 15.8877 13.0789 16.0996 12.9226 16.2559C12.7663 16.4122 12.5543 16.5 12.3333 16.5H9.83333C9.61232 16.5 9.40036 16.4122 9.24408 16.2559C9.0878 16.0996 9 15.8877 9 15.6667V14.8333C9 14.3913 8.8244 13.9674 8.51184 13.6548C8.19928 13.3423 7.77536 13.1667 7.33333 13.1667C6.89131 13.1667 6.46738 13.3423 6.15482 13.6548C5.84226 13.9674 5.66667 14.3913 5.66667 14.8333V15.6667C5.66667 15.8877 5.57887 16.0996 5.42259 16.2559C5.26631 16.4122 5.05435 16.5 4.83333 16.5H2.33333C2.11232 16.5 1.90036 16.4122 1.74408 16.2559C1.5878 16.0996 1.5 15.8877 1.5 15.6667V13.1667C1.5 12.9457 1.5878 12.7337 1.74408 12.5774C1.90036 12.4211 2.11232 12.3333 2.33333 12.3333H3.16667C3.60869 12.3333 4.03262 12.1577 4.34518 11.8452C4.65774 11.5326 4.83333 11.1087 4.83333 10.6667C4.83333 10.2246 4.65774 9.80072 4.34518 9.48816C4.03262 9.17559 3.60869 9 3.16667 9H2.33333C2.11232 9 1.90036 8.9122 1.74408 8.75592C1.5878 8.59964 1.5 8.38768 1.5 8.16667V5.66667C1.5 5.44565 1.5878 5.23369 1.74408 5.07741C1.90036 4.92113 2.11232 4.83333 2.33333 4.83333"
                              stroke="currentColor"
                              strokeWidth={1}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <p
                          className={
                            project
                              ? "text-indigo-700 ml-3 text-lg cursor-pointer"
                              : "text-gray-700 ml-3 text-lg hover:text-indigo-700 cursor-pointer"
                          }
                        >
                          Projects
                        </p>
                      </div>
                      <div>
                        {project ? (
                          <div className="ml-4">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="icon icon-tabler icon-tabler-chevron-up"
                              width={14}
                              height={14}
                              viewBox="0 0 24 24"
                              strokeWidth={1}
                              stroke="currentColor"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                              <polyline points="6 15 12 9 18 15" />
                            </svg>
                          </div>
                        ) : (
                          <div className="ml-4">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="icon icon-tabler icon-tabler-chevron-down"
                              width={14}
                              height={14}
                              viewBox="0 0 24 24"
                              strokeWidth={1}
                              stroke="currentColor"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                              <polyline points="6 9 12 15 18 9" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>
                    {project ? (
                      <div className="pt-4 ">
                        {pjtList?.map(({ seq, title }) => {
                          return (
                            <>
                              <ProjectLists key={seq} name={title} select={project} />
                            </>
                          );
                        })}
                      </div>
                    ) : (
                      ""
                    )}
                  </li>
                </a>
              </ul>
            </div>
            <div className="w-full">
              <div className="flex justify-center mb-4 w-full px-6"></div>
              <div className="border-t border-gray-300">
                <div className="w-full flex items-center justify-between px-6 pt-2 pb-3">
                  <div className="flex items-center">
                    <UserCircleIcon className="h-10 text-indigo-500" />
                    <p className=" text-gray-800 text-base leading-4 ml-2">{uid}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile End */}
      <nav className="w-full mx-auto bg-white shadow">
        <div className="container px-6 justify-between h-16 flex items-center lg:items-stretch mx-auto">
          <div className="h-full flex items-center">
            <div
              className="mr-10 flex items-center cursor-pointer"
              onClick={() => {
                dispatch(pageAction.setPageState(0));
                router.push("/MyPage");
              }}
            >
              <div className="relative flex items-center h-16 w-16 cursor-pointer my-auto">
                <Image src={icon} layout="fill" objectFit="contain" objectPosition="left" />
              </div>
              <h3 className="text-base text-gray-800 font-bold tracking-normal leading-tight ml-3 hidden lg:block pb-8">
                TESTSMAN
              </h3>
            </div>
            <ul className="pr-12 xl:flex items-center h-full hidden">
              <li
                className={
                  cPage == 0
                    ? "cursor-pointer h-full flex items-center text-sm text-indigo-700 tracking-normal border-b-2 border-indigo-700"
                    : "cursor-pointer h-full flex items-center text-sm text-gray-800  tracking-normal"
                }
                onClick={() => {
                  handlerSelect(0);
                }}
              >
                <div className="md:w-6 md:h-6 w-5 h-5 mr-1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M7.16667 3H3.83333C3.3731 3 3 3.3731 3 3.83333V7.16667C3 7.6269 3.3731 8 3.83333 8H7.16667C7.6269 8 8 7.6269 8 7.16667V3.83333C8 3.3731 7.6269 3 7.16667 3Z"
                      stroke={cPage == 0 ? "#667EEA" : "#000000"}
                      strokeWidth={1}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7.16667 11.6667H3.83333C3.3731 11.6667 3 12.0398 3 12.5V15.8333C3 16.2936 3.3731 16.6667 3.83333 16.6667H7.16667C7.6269 16.6667 8 16.2936 8 15.8333V12.5C8 12.0398 7.6269 11.6667 7.16667 11.6667Z"
                      stroke={cPage == 0 ? "#667EEA" : "#000000"}
                      strokeWidth={1}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16.1667 11.6667H12.8333C12.3731 11.6667 12 12.0398 12 12.5V15.8334C12 16.2936 12.3731 16.6667 12.8333 16.6667H16.1667C16.6269 16.6667 17 16.2936 17 15.8334V12.5C17 12.0398 16.6269 11.6667 16.1667 11.6667Z"
                      stroke={cPage == 0 ? "#667EEA" : "#000000"}
                      strokeWidth={1}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16.1667 3H12.8333C12.3731 3 12 3.3731 12 3.83333V7.16667C12 7.6269 12.3731 8 12.8333 8H16.1667C16.6269 8 17 7.6269 17 7.16667V3.83333C17 3.3731 16.6269 3 16.1667 3Z"
                      stroke={cPage == 0 ? "#667EEA" : "#000000"}
                      strokeWidth={1}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                Dashboard
              </li>
              <li
                className={
                  cPage == 2
                    ? "cursor-pointer h-full flex items-center text-sm text-indigo-700 tracking-normal border-b-2 border-indigo-700 ml-8"
                    : "cursor-pointer h-full flex items-center text-sm text-gry-800 ml-8 tracking-normal"
                }
                onClick={() => handlerSelect(2)}
              >
                <div className="md:w-6 md:h-6 w-5 h-5 mr-1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M6.66667 13.3333L8.33334 8.33334L13.3333 6.66667L11.6667 11.6667L6.66667 13.3333Z"
                      stroke={cPage == 2 ? "#667EEA" : "#000000"}
                      strokeWidth={1}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z"
                      stroke={cPage == 2 ? "#667EEA" : "#000000"}
                      strokeWidth={1}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                Performance
              </li>
              <li
                className={
                  noPjt
                    ? "hidden"
                    : cPage === 1
                    ? "cursor-pointer h-full flex items-center text-sm text-indigo-700 tracking-normal border-b-2 border-indigo-700 ml-8"
                    : "cursor-pointer h-full flex items-center text-sm text-gry-800 ml-8 tracking-normal"
                }
                onClick={() => handlerSelect(1)}
              >
                <div className="md:w-6 md:h-6 w-5 h-5 mr-1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" fill="none">
                    <path
                      d="M2.33333 4.83333H4.83333C5.05435 4.83333 5.26631 4.74554 5.42259 4.58926C5.57887 4.43298 5.66667 4.22101 5.66667 4V3.16667C5.66667 2.72464 5.84226 2.30072 6.15482 1.98816C6.46738 1.67559 6.89131 1.5 7.33333 1.5C7.77536 1.5 8.19928 1.67559 8.51184 1.98816C8.8244 2.30072 9 2.72464 9 3.16667V4C9 4.22101 9.0878 4.43298 9.24408 4.58926C9.40036 4.74554 9.61232 4.83333 9.83333 4.83333H12.3333C12.5543 4.83333 12.7663 4.92113 12.9226 5.07741C13.0789 5.23369 13.1667 5.44565 13.1667 5.66667V8.16667C13.1667 8.38768 13.2545 8.59964 13.4107 8.75592C13.567 8.9122 13.779 9 14 9H14.8333C15.2754 9 15.6993 9.17559 16.0118 9.48816C16.3244 9.80072 16.5 10.2246 16.5 10.6667C16.5 11.1087 16.3244 11.5326 16.0118 11.8452C15.6993 12.1577 15.2754 12.3333 14.8333 12.3333H14C13.779 12.3333 13.567 12.4211 13.4107 12.5774C13.2545 12.7337 13.1667 12.9457 13.1667 13.1667V15.6667C13.1667 15.8877 13.0789 16.0996 12.9226 16.2559C12.7663 16.4122 12.5543 16.5 12.3333 16.5H9.83333C9.61232 16.5 9.40036 16.4122 9.24408 16.2559C9.0878 16.0996 9 15.8877 9 15.6667V14.8333C9 14.3913 8.8244 13.9674 8.51184 13.6548C8.19928 13.3423 7.77536 13.1667 7.33333 13.1667C6.89131 13.1667 6.46738 13.3423 6.15482 13.6548C5.84226 13.9674 5.66667 14.3913 5.66667 14.8333V15.6667C5.66667 15.8877 5.57887 16.0996 5.42259 16.2559C5.26631 16.4122 5.05435 16.5 4.83333 16.5H2.33333C2.11232 16.5 1.90036 16.4122 1.74408 16.2559C1.5878 16.0996 1.5 15.8877 1.5 15.6667V13.1667C1.5 12.9457 1.5878 12.7337 1.74408 12.5774C1.90036 12.4211 2.11232 12.3333 2.33333 12.3333H3.16667C3.60869 12.3333 4.03262 12.1577 4.34518 11.8452C4.65774 11.5326 4.83333 11.1087 4.83333 10.6667C4.83333 10.2246 4.65774 9.80072 4.34518 9.48816C4.03262 9.17559 3.60869 9 3.16667 9H2.33333C2.11232 9 1.90036 8.9122 1.74408 8.75592C1.5878 8.59964 1.5 8.38768 1.5 8.16667V5.66667C1.5 5.44565 1.5878 5.23369 1.74408 5.07741C1.90036 4.92113 2.11232 4.83333 2.33333 4.83333"
                      stroke={cPage == 1 ? "#667EEA" : "#000000"}
                      strokeWidth={1}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                Projects
                <div className={dtProject ? "h-[110px] mt-[182px] z-40 flex ml-[-80px]" : "hidden"}>
                  {dtProject ? (
                    <div className="p-2 w-44 border-r  bg-white relative rounded  shadow  cursor-default  overflow-y-scroll">
                      <ul className="w-full">
                        {pjtList?.map(({ seq, title }) => (
                          <ProjectListsDt key={seq} seq={seq} title={title} />
                        ))}
                      </ul>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </li>
            </ul>
          </div>
          <div className="h-full xl:flex items-center justify-end hidden">
            <div className="w-full h-full flex items-center">
              <div className="w-full h-full flex">
                <div
                  aria-haspopup="true"
                  className="cursor-pointer w-full flex items-center justify-end relative"
                  onClick={() => setProfile(!profile)}
                >
                  {profile ? (
                    <ul className="p-2 w-40 border-r bg-white absolute rounded z-40 left-0 shadow mt-52 ">
                      <li className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none">
                        <div className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-user"
                            width={20}
                            height={20}
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <circle cx={12} cy={7} r={4} />
                            <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                          </svg>
                          <span className="ml-2">My Profile</span>
                        </div>
                      </li>
                      <li className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2 py-2 hover:text-indigo-700 flex items-center focus:text-indigo-700 focus:outline-none">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-settings"
                          width={20}
                          height={20}
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" />
                          <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <circle cx={12} cy={12} r={3} />
                        </svg>
                        <span className="ml-2">Account Settings</span>
                      </li>
                      <li
                        className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2 py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none flex items-center"
                        onClick={() => {
                          sessionStorage.removeItem("persist:root");
                          removeCookie("token");
                          document.location.href = "/Login";
                        }}
                      >
                        <LogoutIcon className="h-4 ml-1" />
                        <span className="ml-2">Log Out</span>
                      </li>
                    </ul>
                  ) : (
                    ""
                  )}
                  <UserCircleIcon className="h-10" />
                  <p className="text-gray-800 text-sm ml-2">{uid}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="visible xl:hidden flex items-center relative">
            <svg
              onClick={() => setShow(!show)}
              aria-label="Main Menu"
              aria-haspopup="true"
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-menu"
              width={32}
              height={32}
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#2c3e50"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <line x1={4} y1={8} x2={20} y2={8} />
              <line x1={4} y1={16} x2={20} y2={16} />
            </svg>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header2;
