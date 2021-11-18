import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import * as loadActions from "../store/modules/load";
import LoadGraphSummary from "./LoadGraphSummary";
import LoadTabSummary from "./LoadTabSummary";

const LoadResult = () => {
  const sumdata = useSelector((state) => state.load.loadResult);
  console.log(sumdata);
  return (
    <div>
      <div className="flex mt-4">
        <div className="border-t mt-4 w-[1196px] justify-center mx-auto pt-4">
          <div className={sumdata.length === 0 ? "hidden" : "border"}>
            <p>Result Summary Chart</p>
            <LoadTabSummary />
          </div>
          <LoadGraphSummary />
        </div>
      </div>
    </div>
  );
};

export default LoadResult;
