import React, { useEffect, useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/solid";
import { useDispatch } from "react-redux";
import { setHeadersState } from "../store/modules/api";

const HeadersOption = () => {
  const dispatch = useDispatch();
  const [tableCnt, setTableCnt] = useState([0]);

  const [params, setParams] = useState([
    {
      paramCheckbox: false,
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
    setParams(() => {
      return [
        ...params,
        {
          paramCheckbox: false,
          paramKey: "",
          paramValue: "",
          paramDescription: "",
        },
      ];
    });
  };

  const handleParam = (index) => (e) => {
    const { value, name } = e.target;
    setParams(params.map((params, idx) => (idx == index ? { ...params, [name]: value } : params)));
    dispatch(setHeadersState(params));
  };

  return (
    <div className="mt-5 ml-2">
      Headers
      <table className="border w-[82%]  border-gray-300 mt-2">
        <thead>
          <tr>
            <th>
              {" "}
              <div className="">
                <button onClick={clickPlusBtn} className="mt-2">
                  <PlusCircleIcon className="w-5 text-indigo-500" />
                </button>
              </div>
            </th>
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
          <tr></tr>
        </tbody>
      </table>
    </div>
  );
};

export default HeadersOption;
