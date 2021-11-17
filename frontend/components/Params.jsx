import { PlusCircleIcon } from "@heroicons/react/solid";
import { PlusIcon } from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import * as ctabActions from "../store/modules/ctab";
import * as apiActions from "../store/modules/api";
import ParamOpt from "./ParamOpt";

const Params = () => {
  const dispatch = useDispatch();
  const paramData = useSelector((state) => state.api.request.params);
  const ctabData = useSelector((state) => state.ctab.datas.params);
  // console.log(ctb);
  // console.log("paramData", paramData);

  const rawData = {
    seq: Math.random(0, 10) * 10,
    paramKey: "",
    paramValue: "",
    paramDescription: "",
  };
  useEffect(() => {}, [paramData]);

  const handleAddRow = () => {
    dispatch(apiActions.setParamDatas(rawData));
  };
  return (
    <div className="mt-5 ">
      Query Params
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
        {paramData ? (
          paramData.map((rows, index) => (
            <ParamOpt key={index} seq={rows.seq} params={rows} index={index} saved={rows.saved} />
          ))
        ) : (
          <ParamOpt />
        )}
      </div>
    </div>
  );
};

export default Params;
