import React from "react";
import ReactJson from "react-json-view";
import { useSelector } from "react-redux";

const Result = () => {
  const result = useSelector((state) => state.apiresult.result);
  return (
    <div className="flex">
      <div className="mt-8 w-full">
        <hr className="mx-auto w-[1200px] " />
        <div className="mt-5 ">
          <div className="mx-auto w-[1197px] h-[400px] justify-center border-2 overflow-auto mt-2">
            <p>API TEST RESULTS</p>
            <ReactJson src={result} />
          </div>
        </div>

        <div></div>
      </div>
    </div>
  );
};

export default Result;
