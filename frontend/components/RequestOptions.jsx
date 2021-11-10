import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PlusCircleIcon } from "@heroicons/react/solid";
import AuthKey from "./AuthKey";
import HeadersOption from "./HeadersOption";
import BodyOption from "./BodyOption";
import SettingsOption from "./SettingsOption";
import { setParamsState, setPayloadState } from "../store/modules/api";

const RequestOptions = (props) => {
  const dispatch = useDispatch()
  const inputObj = useSelector(({ api }) => api);
  const { requestTabIndex } = props;
  const [tableCnt, setTableCnt] = useState([0]);
  const clickPlusBtn = () => {
    const cntList = [...tableCnt];
    const counter = cntList.slice(-1)[0] + 1;
    cntList.push(counter);
    setTableCnt(cntList);
    setParams(() => {
      return [
        ...params,
        {
          paramCheckbox: 'off',
          paramKey: "",
          paramValue: "",
          paramDescription: "",
        },
      ];
    });
  };
  const handleParam = (index) => (e) => {
    const { value, name } = e.target;
    setParams(
      params.map((params, idx) => idx==index? { ...params, [name]: value } : params))
    dispatch(setParamsState(params));
  };
  const [params, setParams] = useState([
    {
      paramCheckbox: "off",
      paramKey: "",
      paramValue: "",
      paramDescription: "",
    },
  ]);
  const render = () => {
    switch (requestTabIndex) {
      case 0:
        return (
          <div className="mt-5 ml-2">
            Quary Params
            <table className="border w-[84%]  border-gray-300 mt-2">
              <thead>
                <tr>
                  <th></th>
                  <th>key</th>
                  <th>value</th>
                  <th>description</th>
                </tr>
              </thead>
              <tbody>
                {tableCnt &&
                  tableCnt.map((item, i) => (
                    <tr key={i} onChange={handleParam(i)}>
                      <th>
                        <input type="checkbox" name="paramCheckbox" />
                      </th>
                      <th>
                        <input type="text" name="paramKey" className="w-[100%] border" />
                      </th>
                      <th>
                        <input type="text" name="paramValue" className="w-[100%] border" />
                      </th>
                      <th>
                        <input type="text" name="paramDescription" className="w-[100%] border" />
                      </th>
                    </tr>
                  ))}
                <tr>
                  <div>
                    <button onClick={clickPlusBtn} className="lg:ml-[5%] xl:ml-[28%]">
                      <PlusCircleIcon className="w-5 text-indigo-500" />
                    </button>
                  </div>
                </tr>
              </tbody>
            </table>
          </div>
        );
      case 1:
        return (
          <div>
            <AuthKey />
          </div>
        );
      case 2:
        return (
          <div>
            <HeadersOption />
          </div>
        );
      case 3:
        return (
          <div>
            <BodyOption />
          </div>
        );
      case 4:
        return <SettingsOption />;
    }
  };
  // console.log(requestTabIndex);
  return <div>{render()}</div>;
};

export default RequestOptions;
