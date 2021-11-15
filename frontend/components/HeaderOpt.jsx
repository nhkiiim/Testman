import React, { useEffect, useState } from "react";
import { TrashIcon } from "@heroicons/react/solid";
import { useDispatch, useSelector } from "react-redux";
import * as apiActions from "../store/modules/api";
import { SaveAsIcon } from "@heroicons/react/solid";

const HeaderOpt = ({ seq, headers, index, saved }) => {
  const headerData = useSelector((state) => state.api.request.headers);
  const dataIndex = useSelector((state) => state.api.request.headers[index]);
  const dispatch = useDispatch();
  const [inputObj, setInputObj] = useState(dataIndex);
  const { headerKey, headerValue, headerDescription } = inputObj;
  const [save, setSave] = useState(false);

  const fetchData = (idx) => {
    setSave(true);
    let datas = {
      seq: seq,
      headerKey: headerKey,
      headerValue: headerValue,
      headerDescription: headerDescription,
      saved: true,
    };

    let filtered = headerData.filter((data) => data.seq !== idx);
    dispatch(apiActions.deleteHeaderDatas(filtered));
    dispatch(apiActions.saveHeaderDatas(datas));
    // window.location.reload();
  };

  console.log(dataIndex);
  const handleDelete = (idx) => {
    let filtered = headerData.filter((data) => data.seq !== idx);

    dispatch(apiActions.deleteHeaderDatas(filtered));
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
      <div className="border-t border-gray-200  w-[100%] bg-gray-100">
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
                id="headerKey"
                className="h-[20px] w-[100%] mb-1 pt-2 bg-gray-100 outline-none"
                placeholder="KEY"
                value={headerKey}
                onChange={handleKeyChange}
              />
            </div>
          </div>

          <div className="w-full overflow-hidden xl:my-2 xl:px-2 xl:w-[31%] border-r border-gray-300">
            <div className="mx-auto ">
              <div className="mx-auto w-[360px] pl-2 ">
                <input
                  id="headerValue"
                  className="h-[20px] w-[100%] mb-1 pt-2 bg-gray-100 outline-none"
                  placeholder="VALUE"
                  value={headerValue}
                  onChange={handleKeyChange}
                />
              </div>
            </div>
          </div>

          <div className="w-full overflow-hidden xl:my-2 xl:px-2 xl:w-[31%] border-r border-gray-300">
            <div className="mx-auto ">
              <div className="mx-auto w-[360px] pl-2 ">
                <input
                  id="headerDescription"
                  className="h-[20px] w-[100%] mb-1 pt-2 bg-gray-100 outline-none"
                  placeholder="DESCRIPTION"
                  value={headerDescription}
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

export default HeaderOpt;
