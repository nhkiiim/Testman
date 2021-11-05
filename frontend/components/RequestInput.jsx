import React, { useState } from "react";
import { FaCaretRight, FaCaretDown, FaToggleOn, FaToggleOff } from "react-icons/fa";
import { useDispatch } from "react-redux";
const RequestInput = (props) => {
  const { tabs, handleURLChange, handleSubmit } = props;
  const [testBtn, setTestBtn] = useState(true);
  const clickTestBtn = () => {
    console.log(testBtn);
    if (testBtn) {
      return setTestBtn(false);
    } else {
      return setTestBtn(true);
    }
  };
  const handlePayload = (e) => {
    const { value, name } = e.target;
    setPayload({
      ...payload,
      [name]: value,
    });
    return useDispatch(setPayloadState(payload));
  };
  if (tabs !== undefined) {
    return (
      <div>
        <div className="grid grid-cols-2 text-gray-500 pb-[10px] border-b border-gray-200 pl-[15px] pr-[15px] pt-[10px]">
          <div className="flex">
            <FaCaretRight />
            <span className="text-xs font-normal ml-[10px]">{tabs.name}</span>
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
        <div className="m-[10px]">
          <div className="flex">
            <select
              onChange={handlePayload}
              defaultValue="GET"
              className="bg-gray-200 border border-gray-300 p-[12px] pr-[50px] rounded-sm"
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
              onChange={handleURLChange}
              className="border-r border-b border-gray-300 bg-gray-200 p-[8px] w-[60%] border-t rounded-sm"
            />
            <button className="flex bg-blue-500 text-white p-[12px] ml-[10px] rounded pl-[15px] pr-[20px] cursor-pointer text-sm ">
              SEND
              <FaCaretDown className="ml-[10px] mt-[2px]" />
            </button>
            <button className="flex bg-gray-300 border-0 p-[12px] ml-[10px] rounded pl-[15px] pr-[20px] cursor-pointer text-sm">
              SAVE
              <FaCaretDown className="ml-[10px] mt-[2px]" />
            </button>
          </div>
        </div>
      </div>
    );
  } else return null;
};

export default RequestInput;
