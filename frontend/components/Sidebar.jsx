import React, { useCallback, useEffect, useState } from "react";
import Aos from "aos";
import { DotsHorizontalIcon } from "@heroicons/react/solid";
import { FaPlus } from "react-icons/fa";
import CollectionsList from "../components/CollectionsList";
import HistoryList from "../components/HistoryList";
import axios from "axios";
import { useSelector } from "react-redux";
import router from "next/router";
import * as historyAction from "../store/modules/history";
import { useDispatch } from "react-redux";
import * as collectionAction from "../store/modules/collections";

const Sidebar = ({ current }) => {
  const cseq = useSelector((state) => state.current.seq);
  const [tabIndex, setTabIndex] = useState(1);
  const [historyData, setHistoryData] = useState([]);
  const colList = useSelector((state) => state.collections.list);
  console.log(cseq);
  console.log(colList);
  const dispatch = useDispatch();
  const hisData = useSelector((state) => state.history.response);
  console.log(hisData);
  useEffect(() => {
    getHistoryData();
    getCollectionList();
  }, [cseq]);
  const handleTabChange = (index) => {
    console.log(index);
    setTabIndex(index);
  };
  const token = useSelector((state) => state.user.token);
  const [collectionList, setCollectionList] = useState([]);

  const getHistoryData = useCallback(async () => {
    await axios({
      method: "GET",
      url: "/api/histories/list/" + cseq,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res.data.response.historyList);
        dispatch(historyAction.fetchHistoryState(res.data.response.historyList));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const getCollectionList = useCallback(async () => {
    await axios({
      method: "GET",
      url: "/api/collections/" + cseq,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res.data.response.collectionList);
        dispatch(collectionAction.setCollections(res.data.response.collectionList));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className=" border-r-2 h-[100%] w-[300px] overflow-x-hidden fixed z-10 p-1.5">
      <div className="">
        {/* 사이드바 메뉴 */}
        <div className="mt-3 mx-10">
          <span
            className={
              tabIndex === 0
                ? "pr-5 pb-2 text-black border-b-2 border-indigo-400  pl-5 cursor-pointer"
                : "pr-5 pb-2 text-gray-400 pl-5 cursor-pointer"
            }
            onClick={() => handleTabChange(0)}
          >
            History
          </span>
          <span
            className={
              tabIndex === 1
                ? "pr-5 pb-2 text-black border-b-2 border-indigo-400  pl-5 cursor-pointer"
                : "pr-5 pb-2 text-gray-400 pl-5 cursor-pointer"
            }
            onClick={() => handleTabChange(1)}
          >
            Collections
          </span>
        </div>
        {/* sidebar contents */}
        <div className="mt-6 ml-0 ">
          {tabIndex === 1 ? (
            <>
              {colList?.map((data, index) => (
                <CollectionsList data={data} key={index} current={current} />
              ))}
            </>
          ) : (
            <>
              {hisData?.map((data, index) => (
                <>
                  <HistoryList data={data} key={index} />
                </>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
