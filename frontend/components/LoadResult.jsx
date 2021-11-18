import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoadTabTable from "./LoadTabTable";

const LoadResult = () => {
  const sumdata = useSelector((state) => state.load.loadResult);
  const [datas, setDatas] = useState(sumdata);
  console.log(datas);
  useEffect(() => {
    setDatas(sumdata);
  });

  return (
    <div>
      <div className="flex mt-4">
        <div className="border-t mt-4 w-[1196px] justify-center mx-auto pt-4">
          <div className={datas.length === 0 ? "hidden" : "border"}>
            <p>Result Summary Chart</p>
            <LoadTabTable datas={datas} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadResult;
