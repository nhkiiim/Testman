import React, { useEffect, useState } from "react";
import { FaCaretRight, FaCaretDown, FaToggleOn, FaToggleOff } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import * as apiActions from "../store/modules/api";
import * as ctabActions from "../store/modules/ctab";

const RequestInput = (props) => {
  const dispatch = useDispatch();
  const ctab = useSelector((state) => state.ctab);
  console.log(ctab);
  const selector = useSelector((state) => state.api);
  const handleUriChange = (e) => {
    setInputUri(e.target.value);
    dispatch(ctabActions.setCurl(inputUri));
    dispatch(apiActions.setUriState(inputUri));
  };

  const { tabs, handleSubmit, url } = props;
  // console.log(selector.request);
  const [inputUri, setInputUri] = useState(ctab.address);
  const [testBtn, setTestBtn] = useState(false);
  const clickTestBtn = () => {
    console.log(testBtn);
    if (testBtn) {
      return setTestBtn(false);
    } else {
      return setTestBtn(true);
    }
  };
  const [payload, setPayload] = useState("GET");
  // console.log(payload);

  const handlePayload = (e) => {
    setPayload(e.target.value);
  };

  // const getCollectionList = useCallback(async () => {
  //   await axios({
  //     method: "GET",
  //     url: "/api/collections/" + current.seq,
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //     .then((res) => {
  //       console.log(res.data.response.collectionList);
  //       dispatch(collectionAction.setCollections(res.data.response.collectionList));
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  useEffect(() => {
    dispatch(apiActions.setPayloadState(payload));
    dispatch(ctabActions.setHttpMethods(payload));
    dispatch(ctabActions.setCurl(inputUri));
    dispatch(apiActions.setUriState(inputUri));
  }, [inputUri, payload]);
  if (ctab !== undefined) {
    return (
      <div className="w-full  ">
        <div className="flex justify-between text-gray-500 pb-[10px] border-b border-gray-200  pt-[10px]">
          <div className="flex">
            <FaCaretRight className="mt-[1px]" />
            <span className="text-xs font-normal ml-[10px]">
              {ctab.path ? ctab.path : "UNTITLED"}
            </span>
          </div>
          <div className=" inline-flex ml-[45%]">
            <p
              className={
                !testBtn
                  ? "text-xs font-normal mr-2  pt-1 border-b-2 border-indigo-500"
                  : "text-xs font-normal mr-2  pt-1"
              }
            >
              API TEST
            </p>
            <button onClick={clickTestBtn} className=" mt-[-1px]">
              {testBtn ? (
                <FaToggleOn className="h-6 w-10 text-indigo-400" />
              ) : (
                <FaToggleOff className="h-6 w-10 text-indigo-400  " />
              )}
            </button>
            <p
              className={
                testBtn
                  ? "text-xs font-normal ml-2  pt-1 border-b-2 border-indigo-500"
                  : "text-xs font-normal ml-2 pt-1 "
              }
            >
              LOAD TEST
            </p>
          </div>
        </div>
        <div className="mt-3">
          <div className="flex">
            <select
              onChange={handlePayload}
              defaultValue="GET"
              className="bg-gray-200 border border-gray-300 p-[12px] pr-[50px] rounded-sm"
              name="httpMethod"
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PATCH">PATCH</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
            </select>
            <input
              type="text"
              placeholder=""
              value={url}
              className="border-r border-b border-gray-300 bg-gray-200 p-[8px] w-[243px] border-t rounded-sm"
              disabled
            />
            <input
              type="text"
              placeholder="Type Query here !"
              className="border-r border-b border-gray-300 bg-gray-200 p-[8px] w-[722px]  border-t rounded-sm pl-3"
              onKeyUp={handleUriChange}
            />

            <button
              className="flex bg-blue-500 text-white p-[14px] ml-[8px] rounded pl-[15px] pr-[18px] cursor-pointer text-sm "
              onClick={handleSubmit}
            >
              SEND
              <FaCaretDown className="ml-[10px] mt-[2px]" />
            </button>
            {/* <button
              className="flex bg-gray-300 border-0 p-[14px] ml-[8px] rounded pl-[15px] pr-[18px] cursor-pointer text-sm"
              onClick={() => props.clickSaveBtn}
            >
              SAVE
              <FaCaretDown className="ml-[10px] mt-[2px]" />
            </button> */}
          </div>
        </div>
      </div>
    );
  } else return null;
};

export default RequestInput;
