import React, { useEffect, useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/solid";
import { useDispatch } from "react-redux";
import {
  setParamKey,
  setParamsState,
  setPayloadState,
  setParamDatas,
  fetchParamDatas,
} from "../store/modules/api";
import { useSelector } from "react-redux";

const ParamsOption = () => {
  const dispatch = useDispatch();
  const thisParam = useSelector((state) => state.api.request.params);
  const tmp = useSelector((state) => state.api.tmpParams);
  const [tableCnt, setTableCnt] = useState([0]);
  const [paramData, setParamData] = useState(thisParam);
  const [inputParam, setInputParam] = useState({
    paramKey: "",
    paramValue: "",
    paramDescription: "",
  });

  console.log(paramData);
  console.log(thisParam);
  console.log(tmp);
  useEffect(() => {
    dispatch(setParamDatas(inputParam));
  }, [inputParam]);

  const [params, setParams] = useState([
    {
      paramKey: "",
      paramValue: "",
      paramDescription: "",
    },
  ]);

  const clickPlusBtn = () => {
    const cntList = [...tableCnt];
    const counter = cntList.slice(-1)[0] + 1;
    cntList.push(counter);
    setTableCnt(cntList);

    setInputParam({
      paramKey: "",
      paramValue: "",
      paramDescription: "",
    });
    setParams(() => {
      return [
        {
          paramKey: "",
          paramValue: "",
          paramDescription: "",
        },
      ];
    });
    dispatch(fetchParamDatas(tmp));
    // dispatch(
    //   setParamsState([
    //     {
    //       paramKey: "",
    //       paramValue: "",
    //       paramDescription: "",
    //     },
    //   ])
    // );
  };

  const handleParam = (index) => (e) => {
    // const { value, name } = e.target;
    const {
      target: { name, value },
    } = e;
    setInputParam((inputParam) => ({
      ...inputParam,
      [name]: value,
    }));

    // setParams(params.map((params, idx) => (idx == index ? { ...params, [name]: value } : params)));
    // dispatch(setParamsState(params));
  };

  console.log(inputParam);

  return (
    <div className="mt-5 ml-2">
      Quary Params
      <table className="border w-[82%]  border-gray-300 mt-2">
        <thead>
          <tr>
            <th>
              <div>
                <button onClick={clickPlusBtn} className="mt-2">
                  <PlusCircleIcon className="w-5 text-indigo-500" />
                </button>
              </div>
            </th>
            <th>key</th>
            <th>value</th>
            <th>description</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {tableCnt &&
            tableCnt.map((item, i) => (
              <tr key={i}>
                <th>
                  {/* <input type="checkbox" name="paramCheckbox" onChange={handleParam(i)} /> */}
                </th>
                <th>
                  <input
                    type="text"
                    name="paramKey"
                    value={
                      paramData[i] && paramData[i].paramKey !== ""
                        ? paramData[i].paramKey
                        : inputParam.paramKey
                    }
                    className="w-[100%] border"
                    onChange={handleParam(i)}
                  />
                </th>
                <th>
                  <input
                    type="text"
                    name="paramValue"
                    className="w-[100%] border"
                    onChange={handleParam(i)}
                  />
                </th>
                <th>
                  <input
                    type="text"
                    name="paramDescription"
                    className="w-[100%] border"
                    onChange={handleParam(i)}
                  />
                </th>
              </tr>
            ))}
          <tr></tr>
        </tbody>
      </table>
    </div>
  );
};

export default ParamsOption;
