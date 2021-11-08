import React, { useCallback, useEffect, useState } from "react";
import MediumCard from "../components/MediumCard";
import Aos from "aos";
import "aos/dist/aos.css";
import Header2 from "../components/Header2";
import { useSelector } from "react-redux";
import { useRouter } from "next/dist/client/router";
import axios from "axios";
import { useDispatch } from "react-redux";
import * as projectActions from "../store/modules/project";
import ClickNHold from "react-click-n-hold";
import { XIcon } from "@heroicons/react/solid";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import AnimatedProgressProvider from "../components/Modals/AnimatedProgressProvider";
import { easeQuadInOut } from "d3-ease";
import NoneData from "../components/NoneData";
import withAuth from "../HOC/withAuth";

const MyPage = () => {
  const router = useRouter();
  const [addObj, setAddObj] = useState({
    title: "",
    url: "",
    description: "",
    img: null,
  });

  const { title, url, description, img } = addObj;
  const [workspaces, setWorkSpaces] = useState([]);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [tempSeq, setTempSeq] = useState();
  const [dataNone, setDataNone] = useState(false);
  const token = useSelector((state) => state.user.token);
  const uid = useSelector((state) => state.user.user.userId);
  const dispatch = useDispatch();

  // console.log(upjt[0]);
  useEffect(() => {
    getFetchData();
    Aos.init({ duration: 1000 });
  }, []);
  const getFetchData = async () => {
    await axios({
      method: "get",
      url: "/api/workspaces",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setWorkSpaces(res.data.response.workspaceDtoList);
        dispatch(projectActions.setProject(res.data.response.workspaceDtoList));
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 404) {
          setDataNone(true);
          dispatch(projectActions.setProject(undefined));
        }
        // console.log(dataNone);
      });
  };
  // console.log(workspaces);
  const changeHandler = useCallback(async (e) => {
    const {
      target: { id, value },
    } = e;
    setAddObj((addObj) => ({
      ...addObj,
      [id]: value,
    }));
  });

  const handlerStart = (e) => {
    console.log("START");
  };

  const handlerClickNHold = (seq) => {
    // console.log("Click and Hold");
    setShowAlertModal(true);
    // console.log(seq);
    setTempSeq(seq);
  };

  const handlerEnd = (seq, enough) => {
    console.log("END");
    console.log(enough ? "click released after enough time" : "click released too soon");
  };

  const fetchDeletePjt = async (value) => {
    axios({
      method: "delete",
      url: "/api/workspaces/" + value,
    })
      .then(() => {
        console.log("삭제완료");
        setTempSeq();
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlerCloseBtn = () => {
    setShowAlertModal(false);
  };

  const handlerDelete = (value) => {
    setShowAlertModal(false);
    fetchDeletePjt(value);
  };

  const handlerAdd = () => {
    setShowAddModal(true);
  };

  const handlerAddSubmit = useCallback(async (e) => {
    await axios({
      method: "post",
      url: "/api/workspaces",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        title: title,
        url: url,
        description: description,
        img: null,
      },
    })
      .then((res) => {
        console.log(res.data);
        setShowAddModal(false);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return (
    <div className="bg-gray-200 h-[100%] ">
      {/* <Header /> */}
      <Header2 />
      <main className="max-w-7xl mx-auto px-16 sm:px-32 bg-gray-200  ">
        <section className="mt-5">
          <div className="flex justify-between">
            <h2 className="text-2xl font-semibold py-8 items-center md:mx-2 ">
              {uid}'s Project List
            </h2>
            <button
              className="bg-indigo-600  text-white  rounded  md:mx-3 h-[45px] w-[80px] cursor-pointer mt-7"
              onClick={handlerAdd}
            >
              ADD
            </button>
          </div>
          {dataNone ? (
            <NoneData />
          ) : (
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8 ">
              <>
                {workspaces?.map(({ seq, title, url, description, img, createDate }) => (
                  <ClickNHold
                    time={1.5}
                    onStart={handlerStart}
                    onClickNHold={() => handlerClickNHold(seq)}
                    onEnd={handlerEnd}
                  >
                    <MediumCard
                      key={seq}
                      seq={seq}
                      title={title}
                      url={url}
                      description={description}
                      img={img}
                      createDate={createDate}
                    />
                  </ClickNHold>
                ))}
              </>
            </div>
          )}
        </section>
      </main>
      {showAlertModal ? (
        <>
          <div
            data-aos="fade-zoom-in"
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none h-[400px]">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">I'm Ready For Delete !</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-3 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={handlerCloseBtn}
                  >
                    <XIcon className="w-7 ml-16 text-indigo-600  " />
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div style={{ width: 120, height: 120 }} className="mx-auto py-5">
                    <AnimatedProgressProvider
                      valueStart={0}
                      valueEnd={100}
                      duration={1.4}
                      easingFunction={easeQuadInOut}
                    >
                      {(value) => {
                        const roundedValue = Math.round(value);
                        return (
                          <CircularProgressbar
                            value={value}
                            text={`${roundedValue}%`}
                            styles={buildStyles({ pathTransition: "none" })}
                          />
                        );
                      }}
                    </AnimatedProgressProvider>
                  </div>
                  <div className="ml-[130px] justify-center mt-10">
                    <p className="text-gray-500 text-sm">삭제할 준비가 끝났어요.</p>
                    <p className="text-gray-500 ml-4 text-sm">정말 삭제할까요 ?</p>
                  </div>
                  <div className="flex justify-between">
                    <button
                      className="bg-transparent text-gray-500  rounded  md:mx-3 h-[45px] w-[80px] cursor-pointer mt-7 opacity-30 hover:opacity-80 transition duration-300 ease-out"
                      onClick={handlerCloseBtn}
                    >
                      CLOSE
                    </button>
                    <button
                      className="bg-transparent  text-red-600  rounded  md:mx-3 h-[45px] w-[80px] cursor-pointer mt-7 opacity-30 hover:opacity-80 transition duration-300 ease-out"
                      onClick={() => handlerDelete(tempSeq)}
                    >
                      DELETE
                    </button>
                  </div>
                </div>
                {/*footer*/}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      {showAddModal ? (
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
                    onClick={() => setShowAddModal(false)}
                  >
                    <XIcon className="w-8 text-indigo-500 opacity-20 hover:opacity-100" />
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <form className="flex flex-col w-[350px]">
                    <div className="mb-6 pt-3 rounded bg-gray-200">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-0 ml-3"
                        htmlFor="Name"
                      >
                        Title
                      </label>
                      <input
                        type="text"
                        id="title"
                        className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
                        onChange={changeHandler}
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
                        id="url"
                        className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
                        onChange={changeHandler}
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
                        id="description"
                        className=" resize-none overflow-auto bg-gray-200 rounded w-full h-40 text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
                        onChange={changeHandler}
                      />
                    </div>
                  </form>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-between p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowAddModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-indigo-600 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                    onClick={handlerAddSubmit}
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
    </div>
  );
};

export default withAuth(MyPage);
