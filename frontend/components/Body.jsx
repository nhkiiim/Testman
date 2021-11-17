import { PlusCircleIcon } from "@heroicons/react/solid";
import { PlusIcon } from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import * as apiActions from "../store/modules/api";
import BodyOpt from "./BodyOpt";

const Body = () => {
  const dispatch = useDispatch();
  const bodyData = useSelector((state) => state.api.request.body);
  const ctabData = useSelector((state) => state.ctab.datas.body);
  const ctype = useSelector((state) => state.api.request.contentType);

  const [bodyOption, setBodyOption] = useState("none");
  useEffect(() => {
    // console.log(bodyOption);
    console.log(ctype);
  });

  const handleBodyOption = (e) => {
    setBodyOption(e.target.value);
    console.log(e.target.value);
    switch (e.target.value) {
      case "none":
        return dispatch(apiActions.setContentType(null));
      case "formData":
        return dispatch(apiActions.setContentType("multipart/form-data"));
      case "formUrlencoded":
        return dispatch(apiActions.setContentType("application/x-www-form-urlencoded"));
    }
  };

  const rawData = {
    seq: Math.random(0, 10) * 10,
    bodyKey: "",
    bodyValue: "",
    bodyDescription: "",
  };

  const handleAddRow = () => {
    dispatch(apiActions.setBodyDatas(rawData));
  };
  return (
    <div className="mt-5 ">
      <div className="flex">
        <p>Body</p>
        <form className="mt-[-3px] ml-4">
          <fieldset className="flex">
            <label className="mr-5 inline-flex">
              <input
                type="radio"
                name="bodyOption"
                value="none"
                onChange={handleBodyOption}
                checked={bodyOption == "none"}
                className="mt-1 mr-1"
              />
              <p className="text-sm text-gray-600">none</p>
            </label>
            <label className="mr-5 inline-flex">
              <input
                type="radio"
                name="bodyOption"
                value="formData"
                onChange={handleBodyOption}
                checked={bodyOption == "formData"}
                className="mt-1 mr-1"
              />
              <p className="text-sm text-gray-600">form-data</p>
            </label>
            <label className="mr-5 inline-flex">
              <input
                type="radio"
                name="bodyOption"
                value="formUrlencoded"
                onChange={handleBodyOption}
                checked={bodyOption == "formUrlencoded"}
                className="mt-1 mr-1"
              />
              <p className="text-sm text-gray-600">x-www-form-urlencoded</p>
            </label>
          </fieldset>
        </form>
      </div>
      {ctype ? (
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
          {bodyData ? (
            bodyData.map((rows, index) => (
              <BodyOpt key={index} seq={rows.seq} body={rows} index={index} saved={rows.saved} />
            ))
          ) : (
            <BodyOpt />
          )}
        </div>
      ) : (
        <>
          <p className="text-gray-500 text-sm mt-3">This request does not have a body !</p>
        </>
      )}
    </div>
  );
};

export default Body;
