import React, { useEffect, useState } from "react";
import { TrashIcon } from "@heroicons/react/solid";
import { useDispatch, useSelector } from "react-redux";
import * as apiActions from "../store/modules/api";
import { SaveAsIcon } from "@heroicons/react/solid";

const BodyOpt = ({ seq, body, index, saved }) => {
  const bodyData = useSelector((state) => state.api.request.body);
  const dataIndex = useSelector((state) => state.api.request.body[index]);
  const dispatch = useDispatch();
  const [inputObj, setInputObj] = useState(dataIndex);
  const { bodyKey, bodyValue, bodyDescription } = inputObj;
  const [save, setSave] = useState(false);

  const fetchData = (idx) => {
    setSave(true);
    let datas = {
      seq: seq,
      bodyKey: bodyKey,
      bodyValue: bodyValue,
      bodyDescription: bodyDescription,
      saved: true,
    };

    let filtered = bodyData.filter((data) => data.seq !== idx);
    dispatch(apiActions.deleteBodyDatas(filtered));
    dispatch(apiActions.saveBodyDatas(datas));
    // window.location.reload();
  };

  // console.log(dataIndex);
  const handleDelete = (idx) => {
    let filtered = bodyData.filter((data) => data.seq !== idx);

    dispatch(apiActions.deleteBodyDatas(filtered));
  };

  const handleKeyChange = (e) => {
    const {
      target: { id, value },
    } = e;
    setInputObj((inputObj) => ({
      ...inputObj,
      [id]: value,
    }));
  };

  return (
    <div className="">
      <div
        className={
          saved
            ? "border-t border-gray-200  w-[100%] bg-gray-100"
            : "border-t border-gray-200  w-[100%] bg-gray-50"
        }
      >
        <div className="flex flex-wrap overflow-hidden ">
          <div className="overflow-hidden my-2 px-2 w-[4%] border-r border-gray-300">
            <div onClick={() => fetchData(seq)}>
              <SaveAsIcon
                className={saved ? "w-5 mt-1 ml-[8px] text-indigo-600" : "w-5 mt-1 ml-[8px]"}
              />
            </div>
          </div>

          <div className="w-full overflow-hidden xl:my-2 xl:px-2 xl:w-[31%] border-r border-gray-300">
            <div className="mx-auto w-[360px] pl-2 ">
              <input
                id="bodyKey"
                className={
                  saved
                    ? "h-[20px] w-[100%] mb-1 pt-2 bg-gray-100 outline-none"
                    : "h-[20px] w-[100%] mb-1 pt-2 bg-gray-50 outline-none"
                }
                placeholder="KEY"
                value={bodyKey ? bodyKey : ""}
                onChange={handleKeyChange}
              />
            </div>
          </div>

          <div className="w-full overflow-hidden xl:my-2 xl:px-2 xl:w-[31%] border-r border-gray-300">
            <div className="mx-auto ">
              <div className="mx-auto w-[360px] pl-2 ">
                <input
                  id="bodyValue"
                  className={
                    saved
                      ? "h-[20px] w-[100%] mb-1 pt-2 bg-gray-100 outline-none"
                      : "h-[20px] w-[100%] mb-1 pt-2 bg-gray-50 outline-none"
                  }
                  placeholder="VALUE"
                  value={bodyValue}
                  onChange={handleKeyChange}
                />
              </div>
            </div>
          </div>

          <div className="w-full overflow-hidden xl:my-2 xl:px-2 xl:w-[31%] border-r border-gray-300">
            <div className="mx-auto ">
              <div className="mx-auto w-[360px] pl-2 ">
                <input
                  id="bodyDescription"
                  className={
                    saved
                      ? "h-[20px] w-[100%] mb-1 pt-2 bg-gray-100 outline-none"
                      : "h-[20px] w-[100%] mb-1 pt-2 bg-gray-50 outline-none"
                  }
                  placeholder="DESCRIPTION"
                  value={bodyDescription}
                  onChange={handleKeyChange}
                />
              </div>
            </div>
          </div>
          <div className="mx-auto flex justify-center">
            <div className="mx-auto justify-center" onClick={() => handleDelete(seq)}>
              <TrashIcon className="w-5 ml-[3px] mt-3 text-gray-500 " />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BodyOpt;
