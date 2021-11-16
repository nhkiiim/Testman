import React, { useEffect, useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/solid";

const BodyOption = () => {
  const [bodyOption, setBodyOption] = useState("none");

  const handleBodyOption = (e) => {
    setBodyOption(e.target.value);
  };

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
    const copied = params.slice();
    setParams(() => {
      return [
        ...params.slice(0, index),
        {
          ...copied[index],
          [name]: value,
        },
        ...params.slice(index + 1),
      ];
    });
  };

  const [uploadFile, setUploadFile] = useState("");

  const handleUploadFile = (e) => {
    setUploadFile(e.targe.files);
  };

  return (
    <div className="mt-5 ml-5">
      <form>
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
          <label className="mr-5 inline-flex">
            <input
              type="radio"
              name="bodyOption"
              value="binary"
              onChange={handleBodyOption}
              checked={bodyOption == "binary"}
              className="mt-1 mr-1"
            />
            <p className="text-sm text-gray-600">binary</p>
          </label>
        </fieldset>
      </form>
      {(function () {
        switch (bodyOption) {
          case "none":
            return (
              <div className="border-t mt-2">
                <p className="mt-3 mx-[35%] text-gray-500">This request does not have a body</p>
              </div>
            );
          case "formData":
            return (
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
                    <button onClick={clickPlusBtn} className="lg:ml-[5%] xl:ml-[28%]">
                      <PlusCircleIcon className="w-5 text-purple-400" />
                    </button>
                  </tr>
                </tbody>
              </table>
            );
          case "formUrlencoded":
            return (
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
                    <button onClick={clickPlusBtn} className="lg:ml-[5%] xl:ml-[28%]">
                      <PlusCircleIcon className="w-5 text-purple-400" />
                    </button>
                  </tr>
                </tbody>
              </table>
            );
          case "binary":
            return (
              <div className="mt-2 border-t">
                <label className="input-file-button" htmlFor="input-file">
                  <p className="mt-2 border w-[85px] pl-2 rounded-md bg-gray-100 text-sm text-gray-600 cursor-pointer">
                    Select File
                  </p>
                </label>
                <input
                  type="file"
                  id="input-file"
                  style={{ display: "none" }}
                  onChange={handleUploadFile}
                />
              </div>
            );
        }
      })()}
    </div>
  );
};

export default BodyOption;
