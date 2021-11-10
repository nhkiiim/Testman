import React, { useCallback, useEffect, useState } from "react";
import Aos from "aos";
import { DotsHorizontalIcon } from "@heroicons/react/solid";
import { FaPlus } from "react-icons/fa";
import CollectionsList from "../components/CollectionsList";
import HistoryList from "../components/HistoryList";
import axios from "axios";
import { useSelector } from "react-redux";
import router from "next/router";
const Sidebar = (props) => {
  const [tabs] = useState(["History", "Collections"]);
  const [tabIndex, setTabIndex] = useState(1);
  const handleTabChange = (index) => {
    setTabIndex(index);
  };
  const token = useSelector((state) => state.user.token);
  useEffect(async () => {
    if (token === "") {
      router.push("/Login")
    } else {
      getHistoryData(props.no)
      getCollectionsData(props.no)
    }
    Aos.init({ duration: 1000 });
  }, []);
  const [historyData, setHistoryData] = useState([]);
  const getHistoryData = async(no) => {
    await axios({
      method: "get",
      url: `/api/histories/list/${no}`,
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then((res) => {
        console.log('getHistoryData', res.data.response)
        setHistoryData(res.data.response)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  const [collectionsData, setCollectionsData] = useState([])
  const [collectionsDataNone, setCollectionsDataNone] = useState(false);
  const getCollectionsData = async(no) => {
    await axios({
      mehtod:"get",
      url: `/api/collections/${no}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        console.log('getCollectionsData', res.data.response)
        setCollectionsData(res.data.response)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  return (
    <div className=" border-r-2 h-[100%] w-[300px] overflow-x-hidden fixed z-10 p-1.5">
      <div className="">
        {/* 사이드바 메뉴 */}
        <div className="mt-3 mx-10">
          {tabs.map((tab, index) => {
            return (
              <span
                onClick={() => handleTabChange(index)}
                className={
                  index === tabIndex
                    ? "pr-5 pb-2 text-black border-b-2 border-indigo-400  pl-5 cursor-pointer"
                    : "pr-5 pb-2 text-gray-400 pl-5 cursor-pointer"
                }
              >
                {tab}
              </span>
            );
          })}
        </div>
        {/* sidebar contents */}
        <div className="mt-6 ml-0 ">
          {tabIndex === 1 ? (
            <>
              <div className className="flex justify-between ">
                <div className="flex cursor-pointer ml-3">
                  <FaPlus className="text-indigo-500 text-lg " />
                  <span className="text-indigo-500 text-sm ml-2 ">New Collection</span>
                </div>
                <div className="mr-4 cursor-pointer">
                  <DotsHorizontalIcon className="w-5 text-gray-500" />
                </div>
              </div>
              <CollectionsList />
            </>
          ) : (
            <>
              
              <HistoryList historyData={historyData}/>
              
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
