import React, { useEffect, useState } from "react";

const HistoryList = ({index, method, url}) => {
    const getColor = { 
        "GET": "text-green-600",
        "POST": "text-purple-600",
        "PATCH": "text-yellow-600",
        "PUT":"text-blue-600",
        "DELETE":"text-red-600"

      }

    return (
        <div className="w-[372px] pt-3 h-10 ">
        <div className="text-1xl">
            <span className={getColor[method]}>
                {method} 
            </span>
            <span className="px-[10px]">
                {url}
            </span>
        </div>
        </div>
    );
};

export default HistoryList;