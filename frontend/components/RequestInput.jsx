import React, { useCallback, useEffect, useState } from "react";
import { FaCaretRight, FaCaretDown, FaToggleOn, FaToggleOff } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { InformationCircleIcon } from "@heroicons/react/outline";
import * as apiActions from "../store/modules/api";
import * as ctabActions from "../store/modules/ctab";
import * as statActions from "../store/modules/teststat";
import { LightBulbIcon } from "@heroicons/react/solid";

const RequestInput = (props) => {
  const dispatch = useDispatch();
  const ctab = useSelector((state) => state.ctab);
  // console.log(ctab);
  const selector = useSelector((state) => state.api);
  // console.log(selector);

  const handleUriChange = (e) => {
    setInputUri(e.target.value);
    dispatch(apiActions.setPathState(inputUri));
  };
  const [loopVal, setLoopVal] = useState(0);
  const [threadVal, setThreadVal] = useState(0);

  const { tabs, handleSubmit, url } = props;
  // console.log(selector.request);
  const [inputUri, setInputUri] = useState(ctab.address);
  const [testBtn, setTestBtn] = useState("api");
  const handleThreadChange = (e) => {
    setThreadVal(e.target.value);
  };
  const handleLoopChange = (e) => {
    setLoopVal(e.target.value);
  };
  const clickTestBtn = () => {
    // console.log(testBtn);
    if (testBtn === "api") {
      setTestBtn("load");
      dispatch(statActions.setStat("load"));
    } else {
      setTestBtn("api");
      dispatch(statActions.setStat("api"));
    }
  };
  const [payload, setPayload] = useState("GET");
  // console.log(payload);

  const handlePayload = (e) => {
    setPayload(e.target.value);
  };

  useEffect(() => {
    dispatch(apiActions.setHttpMethods(payload));
    dispatch(apiActions.setPathState(inputUri));
    dispatch(apiActions.setLoopState(loopVal));
    dispatch(apiActions.setThreadState(threadVal));
    console.log(loopVal, threadVal);
    console.log(testBtn);
  }, [inputUri, payload, loopVal, threadVal, testBtn]);
  if (ctab !== undefined) {
    return (
      <div className="">
        <div className=" text-gray-500 pb-[10px] border-b border-gray-200  pt-[10px]">
          <div className="flex justify-between">
            <div className="flex mt-1">
              <LightBulbIcon className="h-6 text-yellow-400" />
              {testBtn === "api" ? (
                <>
                  <p className="text-sm pt-1 ml-2">REST API를 이곳에서 테스트해보세요 !</p>
                </>
              ) : (
                <>
                  <p className="text-sm pt-1 ml-2">
                    {threadVal} 명의 사용자가 동시에 해당 API 호출을 {loopVal} 번 반복하면 어떤 일이
                    일어날 지 알아볼까요 ?
                  </p>
                </>
              )}
              {/* <p className="text-sm pt-1 ml-2">
                {threadVal} 명의 사용자가 동시에 해당 API 호출을 {loopVal} 번 반복하면 어떤 일이
                일어날 지 알아볼까요 ?
              </p> */}
            </div>
            <div className="inline-flex shadow-md" onClick={clickTestBtn}>
              <button
                className={
                  testBtn === "load"
                    ? "w-20 h-7  transition-colors duration-1000 bg-gray-200 mr-[-1px] rounded-sm"
                    : "w-20 h-7   transition-colors duration-1000 bg-yellow-400 text-white mr-[-1px] rounded-sm cursor-default"
                }
              >
                API
              </button>
              <button
                className={
                  testBtn === "api"
                    ? "w-20 h-7  transition-colors duration-1000 bg-gray-200 mr-[-1px] rounded-sm"
                    : "w-20 h-7   transition-colors duration-1000 bg-yellow-400 text-white mr-[-1px] rounded-sm cursor-default"
                }
              >
                LOAD
              </button>
            </div>
          </div>

          <div className={testBtn === "api" ? "hidden" : "mt-3 ml-1"}>
            <hr className="mt-3 mb-3" />
            <div className="mt-2"></div>
            <div className="flex mt-3">
              <div>
                <div className="flex">
                  <p className="mr-3">Thread</p>
                  <div
                    data-tip={`이건 ${threadVal}번 ...?  쓰레드에요`}
                    className="tooltip tooltip-right mb-3"
                  >
                    <InformationCircleIcon className="h-5 mt-[2px]" />
                  </div>
                </div>
                <div className="flex mt-[-10px]">
                  <progress
                    className="progress progress-error w-[400px] mt-4 mr-2"
                    value={threadVal}
                    max="100"
                  />
                  <input
                    type="text"
                    placeholder="0"
                    className="input input-bordered bg-gray-50 h-6 mt-2 w-16 pl-[17px] pt-1"
                    onChange={handleThreadChange}
                  />
                </div>
              </div>
              <div className="ml-16">
                <div className="flex">
                  <p className="mr-3">Loop</p>
                  <div
                    data-tip={`이건 ${loopVal}번 ...?  루프에요`}
                    className="tooltip tooltip-right mb-3"
                  >
                    <InformationCircleIcon className="h-5 mt-[2px]" />
                  </div>
                </div>

                <div className="flex mt-[-10px]">
                  <progress
                    className="progress progress-error w-[400px] mt-4 mr-2"
                    value={loopVal}
                    max="100"
                  />
                  <input
                    type="text"
                    placeholder="0"
                    className="input input-bordered bg-gray-50 h-6 mt-2 w-16 pl-[17px] pt-1"
                    onChange={handleLoopChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-3">
          <div className="flex">
            <select
              onChange={handlePayload}
              defaultValue="GET"
              className="bg-gray-50 border border-gray-300 p-[12px] pr-[50px] rounded-sm"
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
              className="border-r border-b border-gray-300 bg-gray-50 p-[8px] w-[243px] border-t rounded-sm"
              disabled
            />
            <input
              type="text"
              placeholder="Type Path here !"
              className="border-r border-b border-gray-300 bg-gray-50 p-[8px] w-[722px]  border-t rounded-sm pl-3"
              onKeyUp={handleUriChange}
            />

            <button
              className="flex bg-purple-500 bg-opacity-80 text-white p-[14px] ml-[8px] rounded pl-[15px] pr-[18px] cursor-pointer text-sm "
              onClick={handleSubmit}
            >
              SEND
              <FaCaretDown className="ml-[10px] mt-[2px]" />
            </button>
          </div>
        </div>
      </div>
    );
  } else return null;
};

export default RequestInput;
