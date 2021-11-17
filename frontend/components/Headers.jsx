import { PlusCircleIcon } from "@heroicons/react/solid";
import { PlusIcon, TrashIcon } from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import * as ctabActions from "../store/modules/ctab";
import * as apiActions from "../store/modules/api";
import HeaderOpt from "./HeaderOpt";

const Headers = () => {
  const dispatch = useDispatch();
  const headerData = useSelector((state) => state.api.request.headers);
  const ctabData = useSelector((state) => state.ctab.datas.headers);
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
  const handleDelete = (idx) => {
    let filtered = headerData.filter((data) => data.seq !== idx && typeof data.seq === Number);

    dispatch(apiActions.deleteHeaderDatas(filtered));
    // window.location.reload();
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
        {/* {ctabData.length > 0 &&
          ctabData.map((h, index) => (
            <div key={index} className={Object.keys(h).length <= 0 ? "hidden" : ""}>
              <div className="border-t border-gray-200 w-full bg-gray-100">
                <div className="flex flex-wrap overflow-hidden h-[30px] ">
                  <div className="overflow-hidden my-2 px-2 w-[4%] border-r border-gray-300">
                    <div className="mx-auto flex justify-center"></div>
                  </div>

                  <div className="overflow-hidden my-2 px-2 w-[31%] border-r border-gray-300">
                    <div className="mx-auto ml-2">
                      <p className="text-sm  font-bold text-gray-500">{Object.keys(h)[index]}</p>
                    </div>
                  </div>

                  <div className="overflow-hidden my-2 px-2 w-[31%] border-r border-gray-300">
                    <div className="mx-auto ml-2">
                      <p className="text-sm  font-bold text-gray-500">
                        {Object.values(h)[index] && Object.values(h)[index].length >= 50
                          ? `${Object.values(h)[index].slice(0, 50)}...`
                          : Object.values(h)[index]}
                      </p>
                    </div>
                  </div>

                  <div className="overflow-auto my-2 px-2 w-[31%] border-r border-gray-300">
                    <div className="mx-auto ml-2">
                      <p className="text-sm font-bold">...</p>
                    </div>
                  </div>
                  <div className="mx-auto justify-center"></div>
                </div>
              </div>
            </div>
          ))} */}
        {headerData ? (
          headerData.map((rows, index) => (
            <HeaderOpt key={index} seq={rows.seq} headers={rows} index={index} saved={rows.saved} />
          ))
        ) : (
          <HeaderOpt />
        )}
      </div>
    </div>
  );
};

export default Headers;
