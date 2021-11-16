import { PlusCircleIcon } from "@heroicons/react/solid";
import { PlusIcon } from "@heroicons/react/solid";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import * as apiActions from "../store/modules/api";
import HeaderOpt from "./HeaderOpt";

const Headers = () => {
  const dispatch = useDispatch();
  const headerData = useSelector((state) => state.api.request.headers);
  console.log(headerData);

  const rawData = {
    seq: Math.random(0, 10) * 10,
    headerKey: "",
    headerValue: "",
    headerDescription: "",
  };

  const handleAddRow = () => {
    dispatch(apiActions.setHeaderDatas(rawData));
  };
  return (
    <div className="mt-5 ">
      Headers
      <div className="border border-gray-300 mt-3 w-full">
        <div className="flex flex-wrap overflow-hidden h-[30px] ">
          <div className="overflow-hidden my-2 px-2 w-[4%] border-r border-gray-300">
            <div className="mx-auto flex justify-center" onClick={handleAddRow}>
              <PlusIcon className="w-5 text-gray-500" />
            </div>
          </div>

          <div className="overflow-hidden my-2 px-2 w-[31%] border-r border-gray-300">
            <div className="mx-auto ml-2">
              <p className="text-sm font-bold">KEY</p>
            </div>
          </div>

          <div className="overflow-hidden my-2 px-2 w-[31%] border-r border-gray-300">
            <div className="mx-auto ml-2">
              <p className="text-sm font-bold">VALUE</p>
            </div>
          </div>

          <div className="overflow-hidden my-2 px-2 w-[31%] border-r border-gray-300">
            <div className="mx-auto ml-2">
              <p className="text-sm font-bold">DESCRIPTION</p>
            </div>
          </div>
        </div>
        {headerData.map((rows, index) => (
          <HeaderOpt
            key={rows.seq}
            seq={rows.seq}
            headers={rows}
            index={index}
            saved={rows.saved}
          />
        ))}
      </div>
    </div>
  );
};

export default Headers;
