import React, { useCallback, useEffect, useState } from "react";
import { TrashIcon } from "@heroicons/react/solid";
import { useDispatch, useSelector } from "react-redux";
import * as apiActions from "../store/modules/api";
import { SaveAsIcon } from "@heroicons/react/solid";

const ParamOpt = ({ seq, params, index, saved }) => {
  const paramData = useSelector((state) => state.api.request.params);
  const dataIndex = useSelector((state) => state.api.request.params[index]);
  const dispatch = useDispatch();
  const [inputObj, setInputObj] = useState(dataIndex);
  const { paramKey, paramValue, paramDescription } = inputObj;
  const [save, setSave] = useState(false);
  const [d, setD] = useState([]);
  useEffect(() => {
    cals();
  }, []);
  // console.log(Object.keys(params));
  // console.log(params);
  const hasValue = Object.values(params);
  const hasKey = Object.keys(params);
  // console.log(hasKey[0], hasValue[0]);

  const cals = () => {
    let tmp = [];
    for (let i = 0; i < hasKey.length; i++) {
      tmp.push({
        key: hasKey[i],
        value: hasValue[i],
      });
    }
    return setD(tmp);
  };
  // console.log(d);
  const fetchData = (idx) => {
    setSave(true);
    let datas = {
      seq: seq,
      paramKey: paramKey,
      paramValue: paramValue,
      paramDescription: paramDescription,
      saved: true,
    };

    let filtered = paramData.filter((data) => data.seq !== idx);
    dispatch(apiActions.deleteParamDatas(filtered));
    dispatch(apiActions.saveParamDatas(datas));
    // window.location.reload();
  };

  // console.log(dataIndex);
  const handleDelete = (idx) => {
    let filtered = paramData.filter((data) => data.seq !== idx);

    dispatch(apiActions.deleteParamDatas(filtered));
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
                id="paramKey"
                className={
                  saved
                    ? "h-[20px] w-[100%] mb-1 pt-2 bg-gray-100 outline-none"
                    : "h-[20px] w-[100%] mb-1 pt-2 bg-gray-50 outline-none"
                }
                placeholder="KEY"
                onChange={handleKeyChange}
              />
            </div>
          </div>

          <div className="w-full overflow-hidden xl:my-2 xl:px-2 xl:w-[31%] border-r border-gray-300">
            <div className="mx-auto ">
              <div className="mx-auto w-[360px] pl-2 ">
                <input
                  id="paramValue"
                  className={
                    saved
                      ? "h-[20px] w-[100%] mb-1 pt-2 bg-gray-100 outline-none"
                      : "h-[20px] w-[100%] mb-1 pt-2 bg-gray-50 outline-none"
                  }
                  placeholder="VALUE"
                  onChange={handleKeyChange}
                />
              </div>
            </div>
          </div>

          <div className="w-full overflow-hidden xl:my-2 xl:px-2 xl:w-[31%] border-r border-gray-300">
            <div className="mx-auto ">
              <div className="mx-auto w-[360px] pl-2 ">
                <input
                  id="paramDescription"
                  className={
                    saved
                      ? "h-[20px] w-[100%] mb-1 pt-2 bg-gray-100 outline-none"
                      : "h-[20px] w-[100%] mb-1 pt-2 bg-gray-50 outline-none"
                  }
                  placeholder="DESCRIPTION"
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

export default ParamOpt;
