import React, { useEffect, useState } from "react";

const HistoryList = ({ index, method, url }) => {
  const getColor = {
    GET: "text-green-600 mr-[24px] text-sm",
    POST: "text-purple-600 mr-[14px] text-sm",
    PATCH: "text-yellow-600 mr-[6px] text-sm",
    PUT: "text-blue-600 mr-[23px] text-sm",
    DELETE: "text-red-600 text-sm",
  };

  return (
    <div className="pt-2 h-10 w-full border-t">
      <div className="text-1xl ml-3">
        <span className={getColor[method]}>{method}</span>
        <span className="px-[10px] text-gray-600">{url}</span>
      </div>
    </div>
  );
};

export default HistoryList;
